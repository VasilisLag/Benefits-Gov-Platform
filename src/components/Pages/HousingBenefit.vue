<template>
  <div class="page">
    <BenefitFormLayout
      title="Επίδομα Στέγασης"
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

    <FooterElement />
  </div>
</template>

<script>
import BenefitFormLayout from '@/components/Elements/Layouts/BenefitFormLayout.vue';
import ResultsForm from '@/components/Elements/ResultsForm.vue';
import FooterElement from '@/components/Elements/Page Elements/FooterElement.vue';
import questions from '@/questions/housingBenefitQs.js';
import { calcHousingBenefit } from '@/utils/calcBenefits.js';

export default {
  name: 'HousingBenefit',
  components: {
    BenefitFormLayout,
    ResultsForm,
    FooterElement
  },
  data() {
    return {
      title: 'Επίδομα Στέγασης',
      questions,
      results: null
    };
  },
  methods: {
    handleAnswers(answers) {
      const submittedTaxDeclaration = answers[0] === "Ναι";
      const income = parseFloat(answers[1]);
      const activeRent = answers[2] === "Ναι";
      const rent = parseFloat(answers[3]);
      const isSingleParent = answers[4] === "Ναι";
      const dependentChildren = parseInt(answers[5]) || 0;
      const unprotectedChildren = parseInt(answers[6]) || 0;
      const hostedPersons = parseInt(answers[7]) || 0;
      const propertyValue = parseFloat(answers[8]);
      const savings = parseFloat(answers[9]);
      const luxuryBelonging = answers[10] === "Όχι, δεν διαθέτω κάποιο από τα παρακάτω";

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