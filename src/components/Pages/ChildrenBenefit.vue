<template>
  <div class="page">
    <BenefitFormLayout
      title="Επίδομα Παιδιού (Α21)"
      :questions="questions"
      @submit-answers="handleAnswers"
      @clear-results="results = null"
    />

    <div class="form-container govgr-mb-12" v-if="results">
      <ResultsForm :results="summaryResults"  class = "govgr-mb-9"/>
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
import allQuestions from '@/questions/childrenBenefitQs.js';
import ResultsAccordion from '@/components/Elements/ResultsAccordion.vue';
import { calcChildrenBenefit } from '@/utils/calcBenefits.js';

export default {
  name: 'ChildrenBenefit',
  components: {
    BenefitFormLayout,
    ResultsForm,
    FooterElement,
    ResultsAccordion
  },
  data() {
    const questionOrder = [
      'submittedTaxDeclaration',
      'residesInGreece',
      'income',
      'isSingleParent',
      'dependentChildren'
    ];
    return {
      title: 'Επίδομα Παιδιού (Α21)',
      questions: questionOrder.map(key => allQuestions.find(q => q.key === key)),
      results: null,
      summaryResults: []
    };
  },
  methods: {
    handleAnswers(answers) {
      const submittedTaxDeclaration = answers['submittedTaxDeclaration'] === 'Ναι';
      const residesInGreece = answers['residesInGreece'] === 'Ναι';
      const income = parseFloat(answers['income']);
      const isSingleParent = answers['isSingleParent'] === 'Ναι';
      const dependentChildren = parseInt(answers['dependentChildren']);

      this.results = calcChildrenBenefit(
        submittedTaxDeclaration,
        income,
        dependentChildren,
        residesInGreece,
        isSingleParent
      )
      console.log(this.results)
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