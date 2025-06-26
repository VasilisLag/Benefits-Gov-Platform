<template>
  <div class="page">
    <BenefitFormLayout
      title="Κοινωνικό Οικιακό Τιμολόγιο - Ελάχιστο Εγγυημένο Εισόδημα"
      :questions="questions"
      @submit-answers="handleAnswers"
      @clear-results="clearResults"
    />

    <div class="form-container govgr-mb-12" v-if="allResults.length">
      <ResultsForm :results="allResults" class = "govgr-mb-9"/>
      <ResultsAccordion
        :items="allResults.map(r => ({
          title: r.title,
          content: r.eligible ? r.message : r.reasons
        }))"
      />
    </div>

    <FooterElement />
  </div>
</template>

<script>
import BenefitFormLayout from '@/components/Elements/Layouts/BenefitFormLayout.vue';
import ResultsForm from '@/components/Elements/ResultsForm.vue';
import FooterElement from '@/components/Elements/Page Elements/FooterElement.vue';
import ResultsAccordion from '@/components/Elements/ResultsAccordion.vue';
import allQuestions from '@/questions/vulnerableBenefitsQs.js';
import { calcKEABenefit, calcKOTBenefit } from '@/utils/calcBenefits.js';

export default {
  name: 'VulnerableBenefits',
  components: {
    BenefitFormLayout,
    ResultsForm,
    FooterElement,
    ResultsAccordion
  },
  data() {
    // Define the order of questions by key
    const questionOrder = [
      'residesInGreece',
      'adults',
      'dependentChildren',
      'unsupportedChildren',
      'isSingleParent',
      'vulnerableCategory',
      'income',
      'income6m',
      'propertyValue',
      'vehicleValue',
      'savings',
      'luxuryBelonging'
    ];
    // Build the questions array in the desired order
    const questions = questionOrder.map(key => allQuestions.find(q => q.key === key));
    return {
      questions,
      keaResults: null,
      kotResults: null,
      allResults: []
    };
  },
  methods: {
    handleAnswers(answers) {
      this.keaResults = this.calculateKEABenefits(answers);
      const aCatEligible = this.keaResults.eligible;
      this.kotResults = this.calculateKOTBenefits(answers, aCatEligible);
      const benefits = [this.keaResults, this.kotResults];
      console.log(this.keaResults)
      this.allResults = benefits.map(benefit => ({
        title: benefit.title,
        eligible: benefit.eligible,
        allowanceAmount: benefit.allowanceAmount || 0,
        reasons: benefit.reasons || [],
        message: benefit.message || '',
      }));
    },
    clearResults() {
      this.allResults = [];
    },
    calculateKEABenefits(answers) {
      const residesInGreece = answers['residesInGreece'] === "Ναι";
      const adults = parseInt(answers['adults']);
      const dependentChildren = parseInt(answers['dependentChildren']) || 0;
      const unsupportedChildren = parseInt(answers['unsupportedChildren']) || 0;
      const isSingleParent = answers['isSingleParent'] === "Ναι";
      const income = parseFloat(answers['income6m']);
      const propertyValue = parseFloat(answers['propertyValue']);
      const vehicleValue = parseFloat(answers['vehicleValue']);
      const savings = parseFloat(answers['savings']);
      const luxuryBelonging = answers['luxuryBelonging'] === "Όχι, δεν διαθέτω κάποιο από τα παρακάτω";
      return calcKEABenefit(
        residesInGreece,
        adults,
        dependentChildren,
        unsupportedChildren,
        isSingleParent,
        income,
        propertyValue,
        vehicleValue,
        savings,
        luxuryBelonging
      );
    },
    calculateKOTBenefits(answers, aCatEligible) {
      const residesInGreece = answers['residesInGreece'] === "Ναι";
      const adults = parseInt(answers['adults']);
      const dependentChildren = parseInt(answers['dependentChildren']) || 0;
      const unsupportedChildren = parseInt(answers['unsupportedChildren']) || 0;
      const disabledPerson = answers['vulnerableCategory'] === "Αναπηρία 67% και άνω";
      const lifesupportedPerson = answers['vulnerableCategory'] === "Χρειάζονται μηχανική υποστήριξη κατ' οίκον με ιατρικές συσκευές";
      const income = parseFloat(answers['income']);
      const propertyValue = parseFloat(answers['propertyValue']);
      const luxuryBelonging = answers['luxuryBelonging'] === "Όχι, δεν διαθέτω κάποιο από τα παρακάτω";
      return calcKOTBenefit(
        residesInGreece,
        adults,
        dependentChildren,
        unsupportedChildren,
        disabledPerson,
        lifesupportedPerson,
        income,
        propertyValue,
        luxuryBelonging,
        aCatEligible
      );
    }
  }
};
</script>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.form-container {
  width: 70%;
  margin: 0 auto;
}
</style>