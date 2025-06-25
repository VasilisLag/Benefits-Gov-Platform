<template>
  <div class="page">
    <BenefitFormLayout
      title="Επίδομα Θέρμανσης"
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

    <FooterElement/>
  </div>
</template>

<script>
import BenefitFormLayout from '@/components/Elements/Layouts/BenefitFormLayout.vue';
import ResultsForm from '@/components/Elements/ResultsForm.vue';
import FooterElement from '@/components/Elements/Page Elements/FooterElement.vue';
import questions from '@/questions/heatingBenefitQs.js';
import ResultsAccordion from '@/components/Elements/ResultsAccordion.vue';
import { calcHeatingBenefit } from '@/utils/calcBenefits.js';

export default {
  name: 'HeatingBenefit',
  components: {
    BenefitFormLayout,
    ResultsForm,
    FooterElement,
    ResultsAccordion
  },
  data() {
    return {
      title: 'Επίδομα Θέρμανσης',
      questions,
      results: null,
      summaryResults: []
    };
  },
  methods: {
    handleAnswers(answers) {
      const submittedTaxDeclaration = answers[0] === 'Ναι';
      const residesInGreece =  answers[1] === 'Ναι';
      const income = parseFloat(answers[2]);
      const isBusinessOwner = answers[3] === 'Ναι';
      const businessIncome = isBusinessOwner ? parseFloat(answers[4]) : 0;
      const propertyValue = parseFloat(answers[5]);
      const isMarried = answers[6] === 'Έγγαμος/η - Σύμφωνο συμβίωσης';
      const isSingleParent = answers[6] === 'Μονογονέας';
      const dependentChildren = parseInt(answers[7]);
      const area = answers[8];
      const heatingSource = answers[9];

      this.results = calcHeatingBenefit(
        submittedTaxDeclaration,
        residesInGreece,
        income,
        isBusinessOwner,
        businessIncome,
        propertyValue,
        isMarried,
        isSingleParent,
        dependentChildren,
        area,
        heatingSource
      )


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
