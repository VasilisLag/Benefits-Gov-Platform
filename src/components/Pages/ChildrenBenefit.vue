<template>
  <div class="page">
    <BenefitFormLayout
      title="Επίδομα Παιδιού (Α21)"
      :questions="questions"
      @submit-answers="handleAnswers"
      @clear-results="results = null"
    />

    <div class="form-container govgr-mb-12" v-if="results">
      <ResultsForm
        :title="title"
        :eligible="results.eligible"
        :benefitAmount="results.benefitAmount"
        :message="results.message"
        :reasons="results.reasons"
      />
    </div>

    <FooterElement class="footer" />
  </div>
</template>

<script>
import BenefitFormLayout from '@/components/Elements/Layouts/BenefitFormLayout.vue';
import ResultsForm from '@/components/Elements/ResultsForm.vue';
import FooterElement from '@/components/Elements/Page Elements/FooterElement.vue';
import questions from '@/questions/childrenBenefitQs.js';
import { calcChildrenBenefit } from '@/utils/calcBenefits.js';

export default {
  name: 'ChildrenBenefit',
  components: {
    BenefitFormLayout,
    ResultsForm,
    FooterElement
  },
  data() {
    return {
      title: 'Επίδομα Παιδιού (Α21)',
      questions,
      results: null
    };
  },
  methods: {
    handleAnswers(answers) {
      const submittedTaxDeclaration = answers[0] === 'Ναι';
      const residesInGreece = answers[1] === 'Ναι';
      const yearsInGreece = parseInt(answers[2]) >= 5;
      const income = parseFloat(answers[3]);
      const isSingleParent = answers[4] === 'Ναι';
      const dependentChildren = parseInt(answers[5]);

      this.results = calcChildrenBenefit(
        submittedTaxDeclaration,
        income,
        dependentChildren,
        residesInGreece,
        yearsInGreece,
        isSingleParent
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

.footer {
  margin-top: 2rem;
  align-self: end;
}
</style>