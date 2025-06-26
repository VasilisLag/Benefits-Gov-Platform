<template>
  <div class="page">
    <BenefitFormLayout
      title="Επίδομα Στέγασης"
      :questions="questions"
      @submit-answers="handleAnswers"
      @clear-results="results = null"
    />

    <div class="form-container govgr-mb-12" v-if="results">
      <ResultsForm :results="summaryResults" class = "govgr-mb-9"/>
      <ResultsAccordion
        :items="summaryResults.map(r => ({
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
import allQuestions from '@/questions/housingBenefitQs.js';
import ResultsAccordion from '@/components/Elements/ResultsAccordion.vue';
import { calcHousingBenefit } from '@/utils/calcBenefits.js';

export default {
  name: 'HousingBenefit',
  components: {
    BenefitFormLayout,
    ResultsForm,
    FooterElement,
    ResultsAccordion
  },
  data() {
    // Define the order of questions by key
    const questionOrder = [
      'submittedTaxDeclaration',
      'income',
      'activeRent',
      'rent',
      'isSingleParent',
      'dependentChildren',
      'unprotectedChildren',
      'hostedPersons',
      'propertyValue',
      'savings',
      'luxuryBelonging'
    ];
    // Build the questions array in the desired order
    const questions = questionOrder.map(key => allQuestions.find(q => q.key === key));
    return {
      title: 'Επίδομα Στέγασης',
      questions,
      results: null,
      summaryResults: []
    };
  },
  methods: {
    handleAnswers(answers) {
      // Access answers by key
      const submittedTaxDeclaration = answers['submittedTaxDeclaration'] === "Ναι";
      const income = parseFloat(answers['income']);
      const activeRent = answers['activeRent'] === "Ναι";
      const rent = parseFloat(answers['rent']);
      const isSingleParent = answers['isSingleParent'] === "Ναι";
      const dependentChildren = parseInt(answers['dependentChildren']) || 0;
      const unprotectedChildren = parseInt(answers['unprotectedChildren']) || 0;
      const hostedPersons = parseInt(answers['hostedPersons']) || 0;
      const propertyValue = parseFloat(answers['propertyValue']);
      const savings = parseFloat(answers['savings']);
      const luxuryBelonging = answers['luxuryBelonging'] === "Όχι, δεν διαθέτω κάποιο από τα παρακάτω";

      this.results = calcHousingBenefit(
        submittedTaxDeclaration,
        income,
        activeRent,
        rent,
        isSingleParent,
        dependentChildren,
        unprotectedChildren,
        hostedPersons,
        propertyValue,
        savings,
        luxuryBelonging
      );

      this.summaryResults = [
        {
          title: this.results.title,
          eligible: this.results.eligible,
          allowanceAmount: this.results.allowanceAmount || 0,
          reasons: this.results.reasons || [],
          message: this.results.message || '',
        }
      ];
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