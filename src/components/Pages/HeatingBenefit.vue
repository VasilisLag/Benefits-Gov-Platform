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
import allQuestions from '@/questions/heatingBenefitQs.js';
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
    const questionOrder = [
      'submittedTaxDeclaration',
      'residesInGreece',
      'income',
      'isBusinessOwner',
      'businessIncome',
      'propertyValue',
      'maritalStatus',
      'dependentChildren',
      'area',
      'heatingSource'
    ];
    return {
      title: 'Επίδομα Θέρμανσης',
      questions: questionOrder.map(key => allQuestions.find(q => q.key === key)),
      results: null,
      summaryResults: []
    };
  },
  methods: {
    handleAnswers(answers) {
      const submittedTaxDeclaration = answers['submittedTaxDeclaration'] === 'Ναι';
      const residesInGreece =  answers['residesInGreece'] === 'Ναι';
      const income = parseFloat(answers['income']);
      const isBusinessOwner = answers['isBusinessOwner'] === 'Ναι';
      const businessIncome = isBusinessOwner ? parseFloat(answers['businessIncome']) : 0;
      const propertyValue = parseFloat(answers['propertyValue']);
      const isMarried = answers['maritalStatus'] === 'Έγγαμος/η - Σύμφωνο συμβίωσης';
      const isSingleParent = answers['maritalStatus'] === 'Μονογονέας';
      const dependentChildren = parseInt(answers['dependentChildren']);
      const area = answers['area'];
      const heatingSource = answers['heatingSource'];

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
