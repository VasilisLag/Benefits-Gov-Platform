<template>
  <div class="page">
    <BenefitFormLayout
      title="Κοινωνικό Οικιακό Τιμολόγιο - Ελάχιστο Εγγυημένο Εισόδημα"
      :questions="questions"
      @submit-answers="handleAnswers"
      @clear-results="clearResults"
    />

    <div class="form-container govgr-mb-12" v-if="allResults.length">
      <ResultsForm :results="allResults" />
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
import questions from '@/questions/vulnerableBenefitsQs.js';
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
      
      const benefits = [this.keaResults, this.kotResults]

      this.allResults = benefits.map(benefit => {

        return {
          title: benefit.title,
          eligible: benefit.eligible,
          allowanceAmount: benefit.allowanceAmount || 0,
          reasons: benefit.reasons || [],
          message: benefit.message || '',
        };
      });

    },
    clearResults() {
      this.allResults = [];
    },
    calculateKEABenefits(answers) {
      const residesInGreece = answers[0] === "Ναι";
      const adults = parseInt(answers[1]);
      const dependentChildren = parseInt(answers[2]) || 0;
      const unsupportedChildren = parseInt(answers[3]) || 0;
      const isSingleParent = answers[4] === "Ναι";
      const income = parseFloat(answers[7]);
      const propertyValue = parseFloat(answers[8]);
      const vehicleValue = parseFloat(answers[9]);
      const savings = parseFloat(answers[10]);
      const luxuryBelonging = answers[11] === "Όχι, δεν διαθέτω κάποιο από τα παρακάτω";

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
      const residesInGreece = answers[0] === "Ναι";
      const adults = parseInt(answers[1]);
      const dependentChildren = parseInt(answers[2]) || 0;
      const unsupportedChildren = parseInt(answers[3]) || 0;
      const disabledPerson = answers[5] === "Αναπηρία 67% και άνω";
      const lifesupportedPerson = answers[5] === "Χρειάζονται μηχανική υποστήριξη κατ' οίκον με ιατρικές συσκευές";
      const income = parseFloat(answers[6]);
      const propertyValue = parseFloat(answers[8]);
      const luxuryBelonging = answers[11] === "Όχι, δεν διαθέτω κάποιο από τα παρακάτω";

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