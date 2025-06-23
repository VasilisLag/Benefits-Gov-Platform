<template>
  <div class="page">
    <BenefitFormLayout
      title="Συνολική Αξιολόγηση"
      :questions="questions"
      @submit-answers="handleAnswers"
      @clear-results="clearResults"
    />

    <div
      v-for="(res, index) in allResults"
      :key="index"
      class="form-container govgr-mb-12"
    >
      <ResultsForm
        :title="res.title"
        :eligible="res.result.eligible"
        :benefitAmount="res.result.benefitAmount || res.result.allowanceAmount"
        :message="res.result.message"
        :reasons="res.result.reasons"
      />
    </div>

    <FooterElement />
  </div>
</template>

<script>
import BenefitFormLayout from '@/components/Elements/Layouts/BenefitFormLayout.vue';
import ResultsForm from '@/components/Elements/ResultsForm.vue';
import FooterElement from '@/components/Elements/Page Elements/FooterElement.vue';
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
    FooterElement
  },
  data() {
    return {
      questions,
      allResults: []
    };
  },
  methods: {
    clearResults() {
      this.allResults = [];
    },
    handleAnswers(answers) {
      const resChildren = this.calcChildren(answers);
      const resHousing = this.calcHousing(answers);
      const resHeating = this.calcHeating(answers);
      const resKEA = this.calcKEA(answers);
      const resKOT = this.calcKOT(answers, resKEA.eligible);

      this.allResults = [
        { title: 'Επίδομα Παιδιού (Α21)', result: resChildren },
        { title: 'Επίδομα Στέγασης', result: resHousing },
        { title: 'Επίδομα Θέρμανσης', result: resHeating },
        { title: 'Ελάχιστο Εγγυημένο Εισόδημα', result: resKEA },
        { title: 'Κοινωνικό Οικιακό Τιμολόγιο', result: resKOT }
      ];
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