<template>
  <div class="page">
    <BenefitFormLayout
      title="Επίδομα Παιδιού (Α21)"
      :questions="questions"
      @submit-answers="handleAnswers"
      @clear-results="results = null"
    />

    <div class="form-container govgr-mb-12" v-if="results">
      <ResultsForm :results="summaryResults" />
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
import questions from '@/questions/childrenBenefitQs.js';
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
    return {
      title: 'Επίδομα Παιδιού (Α21)',
      questions,
      results: null,
      summaryResults: []
    };
  },
  methods: {
    handleAnswers(answers) {
      const submittedTaxDeclaration = answers[0] === 'Ναι';
      const residesInGreece = answers[1] === 'Ναι';
      const income = parseFloat(answers[2]);
      const isSingleParent = answers[3] === 'Ναι';
      const dependentChildren = parseInt(answers[4]);

      this.results = calcChildrenBenefit(
        submittedTaxDeclaration,
        income,
        dependentChildren,
        residesInGreece,
        isSingleParent
      )
      console.log('Results:', this.results);
      this.summaryResults = [
        {
          title: this.title,
          eligible: this.results.eligible,
          allowanceAmount: this.results.allowanceAmount || 0,
          reasons: this.results.reasons || [],
          message: this.results.message || '',
        }
      ];
      console.log('Summary Results:', this.summaryResults);
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