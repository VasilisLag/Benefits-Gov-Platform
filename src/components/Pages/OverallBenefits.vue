<template>
  <div class="page">
    <BenefitFormLayout
      title="Συνολική Αξιολόγηση"
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
import allQuestions from '@/questions/overallBenefitsQs.js';
import {
  calcChildrenBenefit,
  calcHeatingBenefit,
  calcKEABenefit,
  calcKOTBenefit,
  calcHousingBenefit
} from '@/utils/calcBenefits.js';

export default {
  name: 'OverallBenefits',
  components: {
    BenefitFormLayout,
    ResultsForm,
    FooterElement,
    ResultsAccordion
  },
  data() {
    // Explicit order of questions as in allQuestions
    const questionOrder = [
      'submittedTaxDeclaration',
      'residesInGreece',
      'income',
      'income6m',
      'isBusinessOwner',
      'businessIncome',
      'maritalStatus',
      'dependentChildren',
      'unprotectedChildren',
      'hostedPersons',
      'area',
      'heatingSource',
      'activeRent',
      'rent',
      'propertyValue',
      'savings',
      'vehicleValue',
      'luxuryBelonging',
      'vulnerableCategory',
    ];
    const questions = questionOrder.map(key => allQuestions.find(q => q.key === key));
    return {
      questions,
      resChildren: null,
      resHousing: null,
      resHeating: null,
      resKEA: null,
      resKOT: null,
      allResults: []
    };
  },
  methods: {
    clearResults() {
      this.allResults = [];
    },
    handleAnswers(answers) {
      this.resChildren = this.calcChildren(answers);
      this.resHousing = this.calcHousing(answers);
      this.resHeating = this.calcHeating(answers);
      this.resKEA = this.calcKEA(answers);
      console.log(this.resKea)
      this.resKOT = this.calcKOT(answers, this.resKEA.eligible);
      const benefits = [
        this.resChildren,
        this.resHousing,
        this.resHeating,
        this.resKEA,
        this.resKOT
      ];
      this.allResults = benefits.map(benefit => ({
        title: benefit.title,
        eligible: benefit.eligible,
        allowanceAmount: benefit.allowanceAmount || 0,
        reasons: benefit.reasons || [],
        message: benefit.message || '',
      }));
    },
    calcChildren(ans) {
      // calcChildrenBenefit(submittedTaxDeclaration, income, dependentChildren, residesInGreece, isSingleParent)
      return calcChildrenBenefit(
        ans['submittedTaxDeclaration'] === "Ναι",
        parseFloat(ans['income']),
        parseInt(ans['dependentChildren']) || 0,
        ans['residesInGreece'] === "Ναι",
        ans['maritalStatus'] === "Μονογονέας"
      );
    },
    calcHousing(ans) {
      // calcHousingBenefit(submittedTaxDeclaration, income, activeRent, rent, isSingleParent, dependentChildren, unprotectedChildren, hostedPersons, propertyValue, savings, luxuryBelonging)
      return calcHousingBenefit(
        ans['submittedTaxDeclaration'] === "Ναι",
        parseFloat(ans['income']),
        ans['activeRent'] === "Ναι",
        parseFloat(ans['rent']),
        ans['maritalStatus'] === "Μονογονέας",
        parseInt(ans['dependentChildren']) || 0,
        parseInt(ans['unprotectedChildren']) || 0,
        parseInt(ans['hostedPersons']) || 0,
        parseFloat(ans['propertyValue']),
        parseFloat(ans['savings']),
        ans['luxuryBelonging'] === "Όχι, δεν διαθέτω κάποιο από τα παρακάτω"
      );
    },
    calcHeating(ans) {
      // calcHeatingBenefit(submittedTaxDeclaration, residesInGreece, income, isBusinessOwner, businessIncome, propertyValue, isMarried, isSingleParent, dependentChildren, area, heatingSource)
      return calcHeatingBenefit(
        ans['submittedTaxDeclaration'] === "Ναι",
        ans['residesInGreece'] === "Ναι",
        parseFloat(ans['income']),
        ans['isBusinessOwner'] === "Ναι",
        parseFloat(ans['businessIncome']),
        parseFloat(ans['propertyValue']),
        ans['maritalStatus'] === "Έγγαμος/η - Σύμφωνο συμβίωσης",
        ans['maritalStatus'] === "Μονογονέας",
        parseInt(ans['dependentChildren']) || 0,
        ans['area'],
        ans['heatingSource']
      );
    },
    calcKEA(ans) {
      // calcKEABenefit(residesInGreece, adults, dependentChildren, unsupportedChildren, isSingleParent, income, propertyValue, vehicleValue, savings, luxuryBelonging)
      return calcKEABenefit(
        ans['residesInGreece'] === "Ναι",
        (parseInt(ans['hostedPersons']) ? parseInt(ans['hostedPersons']) + 1 : 1),
        parseInt(ans['dependentChildren']) || 0,
        parseInt(ans['unsupportedChildren']) || 0,
        ans['maritalStatus'] === "Μονογονέας",
        parseFloat(ans['income6m']),
        parseFloat(ans['propertyValue']),
        parseFloat(ans['vehicleValue']),
        parseFloat(ans['savings']),
        ans['luxuryBelonging'] === "Όχι, δεν διαθέτω κάποιο από τα παρακάτω"
      );
    },
    calcKOT(ans, keaEligible) {
      // calcKOTBenefit(residesInGreece, adults, dependentChildren, unsupportedChildren, disabledPerson, lifesupportedPerson, income, propertyValue, luxuryBelonging, keaEligible)
      return calcKOTBenefit(
        ans['residesInGreece'] === "Ναι",
        (parseInt(ans['hostedPersons']) ? parseInt(ans['hostedPersons']) + 1 : 1),
        parseInt(ans['dependentChildren']),
        parseInt(ans['unsupportedChildren']),
        ans['vulnerableCategory'] === "Αναπηρία 67% και άνω",
        ans['vulnerableCategory'] === "Χρειάζονται μηχανική υποστήριξη κατ' οίκον με ιατρικές συσκευές",
        parseFloat(ans['income']),
        parseFloat(ans['propertyValue']),
        ans['luxuryBelonging'] === "Όχι, δεν διαθέτω κάποιο από τα παρακάτω",
        keaEligible
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