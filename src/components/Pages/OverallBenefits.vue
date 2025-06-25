<template>
  <div class="page">
    <BenefitFormLayout
      title="Συνολική Αξιολόγηση"
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
import questions from '@/questions/overallBenefitsQs.js';
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
    return {
      questions,
      resChildren: null,
      resHousing: null,
      resHeating: null,
      resKEA: null,
      resKot: null,
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
      this.resKOT = this.calcKOT(answers, this.resKEA.eligible);

      const benefits = [
        this.resChildren,
        this.resHousing,
        this.resHeating,
        this.resKEA,
        this.resKOT
      ]

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

    calcChildren(ans) {
      return calcChildrenBenefit(
        ans[0] === "Ναι",
        parseFloat(ans[2]),
        parseInt(ans[6]) || 0,
        ans[1] === "Ναι",
        ans[5] === "Μονογονέας"
      );
    },

    calcHousing(ans) {
      return calcHousingBenefit(
        ans[0] === "Ναι",
        parseFloat(ans[2]),
        ans[11] === "Ναι",
        parseFloat(ans[12]),
        ans[5] === "Μονογονέας",
        parseInt(ans[6]) || 0,
        parseInt(ans[7]) || 0,
        parseInt(ans[8]) || 0,
        parseFloat(ans[13]),
        parseFloat(ans[14]),
        ans[16] === "Όχι, δεν διαθέτω κάποιο από τα παρακάτω"
      );
    },

    calcHeating(ans) {
      return calcHeatingBenefit(
        ans[0] === "Ναι",
        ans[1] === "Ναι",
        parseFloat(ans[2]),
        ans[3] === "Ναι",
        ans[3] === "Ναι" ? parseFloat(ans[4]) : 0,
        parseFloat(ans[13]),
        ans[5] === "Έγγαμος/η - Σύμφωνο συμβίωσης",
        ans[5] === "Μονογονέας",
        parseInt(ans[6]),
        ans[9],
        ans[10]
      );
    },

    calcKEA(ans) {
      return calcKEABenefit(
        ans[1] === "Ναι",
        parseInt(ans[9]) + 1,
        parseInt(ans[7]),
        parseInt(ans[8]) || 0,
        ans[6] === "Μονογονέας",
        parseFloat(ans[19]),
        parseFloat(ans[14]),
        parseFloat(ans[16]),
        parseFloat(ans[15]),
        ans[17] === "Όχι, δεν διαθέτω κάποιο από τα παρακάτω"
      );
    },

    calcKOT(ans, keaEligible) {
      return calcKOTBenefit(
        ans[1] === "Ναι",
        parseInt(ans[9]) + 1,
        parseInt(ans[7]),
        parseInt(ans[8]) || 0,
        ans[18] === "Αναπηρία 67% και άνω",
        ans[18] === "Χρειάζονται μηχανική υποστήριξη κατ' οίκον με ιατρικές συσκευές",
        parseFloat(ans[3]),
        parseFloat(ans[14]),
        ans[17] === "Όχι, δεν διαθέτω κάποιο από τα παρακάτω",
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