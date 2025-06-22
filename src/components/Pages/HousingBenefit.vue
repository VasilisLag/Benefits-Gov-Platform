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

    <FooterElement class="footer" />
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
      const yearsInGreece = parseInt(answers[1]) >= 5;
      const income = parseFloat(answers[2]);
      const activeRent = answers[3] === "Ναι";
      const rent = parseFloat(answers[4]);
      const isSingleParent = answers[5] === "Ναι";
      const dependentChildren = parseInt(answers[6]) || 0;
      const unprotectedChildren = parseInt(answers[7]) || 0;
      const hostedPersons = parseInt(answers[8]) || 0;
      const propertyValue = parseFloat(answers[9]);
      const savings = parseFloat(answers[10]);
      const luxuryBelonging = answers[11] === "Όχι, δεν διαθέτω κάποιο από τα παρακάτω";

      this.results = calcHousingBenefit(
        submittedTaxDeclaration,
        yearsInGreece,
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

.footer {
  margin-top: 2rem;
  align-self: end;
}
</style>