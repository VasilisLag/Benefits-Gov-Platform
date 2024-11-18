<template>
  <div class="page">
    <HeaderElement />
    <NavElement />
    <main class="p-4">
      <div class="form-container">
        <QuestionForm 
          title="Συνολική Αξιολόγηση"
          :isLastQuestion="isLastQuestion"
          :isFirstQuestion="isFirstQuestion"
          :selectedOption="currentOption"
          :isQuestionRequired="isQuestionReq"
          @back="goBack"
          @skip="skipQuestion"
          @next="nextQuestion"
          @submit="submitAnswers"
        >
          <InputElement
            v-if="currentQuestion"
            :question="currentQuestion.question"
            :key="currentQuestionIndex"
            :options="currentQuestion.options"
            :category="currentQuestion.category"
            :note="currentQuestion.note"
            :input="answer"
            :answer="answer"
            @onAnswerChange="handleAnswerChange"
          />
          <SummaryTable v-if="isFormSummary"
            :questions="questions.map(q => q.question)"
            :answers="answers"
          />

        </QuestionForm>
        <ResultsForm 
          v-if="resultsChildren && isFormSummary"
          :eligible="resultsChildren.eligible"
          :benefitAmount="resultsChildren.benefitAmount"
          :message="resultsChildren.message"
          :reasons="resultsChildren.reasons"
        />
        <ResultsForm 
          v-if="resultsHousing && isFormSummary"
          :eligible="resultsHousing.eligible"
          :benefitAmount="resultsHousing.allowanceAmount"
          :message="resultsHousing.message"
          :reasons="resultsHousing.reasons"
        />
        <ResultsForm 
          v-if="resultsHeating && isFormSummary"
          :eligible="resultsHeating.eligible"
          :benefitAmount="resultsHeating.allowanceAmount"
          :message="resultsHeating.message"
          :reasons="resultsHeating.reasons"
        />
        <ResultsForm 
          v-if="resultsKEA && isFormSummary"
          :eligible="resultsKEA.eligible"
          :benefitAmount="resultsKEA.allowanceAmount"
          :message="resultsKEA.message"
          :reasons="resultsKEA.reasons"
        />
        <ResultsForm 
          v-if="resultsKOT && isFormSummary"
          :eligible="resultsKOT.eligible"
          :benefitAmount="resultsKOT.allowanceAmount"
          :message="resultsKOT.message"
          :reasons="resultsKOT.reasons"
        />
      </div>
    </main>
    <FooterElement class="footer" />
  </div>
</template>

<script>
import HeaderElement from '@/components/Elements/Page Elements/HeaderElement.vue';
import NavElement from '@/components/Elements/Page Elements/NavElement.vue';
import FooterElement from '@/components/Elements/Page Elements/FooterElement.vue';
import InputElement from '@/components/Elements/InputElement.vue';
import QuestionForm from '@/components/Elements/QuestionForm.vue';
import questions from '@/questions/overallBenefitsQs.js';
import SummaryTable from '@/components/Elements/SummaryTable.vue';
import ResultsForm from '@/components/Elements/ResultsForm.vue';
import {calcChildrenBenefit} from '@/utils/calcBenefits.js';
import {calcHeatingBenefit} from '@/utils/calcBenefits.js';
import {calcKEABenefit} from '@/utils/calcBenefits.js';
import {calcKOTBenefit} from '@/utils/calcBenefits.js';
import {calcHousingBenefit} from '@/utils/calcBenefits.js';

export default {
  name: 'OverallBenefits',
  components: {
    HeaderElement,
    NavElement,
    InputElement,
    QuestionForm,
    FooterElement,
    SummaryTable,
    ResultsForm
  },
  data() {
    return {
      currentQuestionIndex: 0,
      questions: questions,
      currentOption: null,
      answers: [], 
      resultsChildren: null,
      resultsHousing: null,
      resultsHeating: null,
      resultsKEA: null,
      resultsKOT: null
    };
  },
  computed: {
    currentQuestion() {
      return this.questions[this.currentQuestionIndex];
    },
    isLastQuestion() {
      return this.currentQuestionIndex === this.questions.length;
    },
    isFirstQuestion() {
      return this.currentQuestionIndex === 0;
    },
    answer() {
      return this.answers[this.currentQuestionIndex];
    },
    isFormSummary() {
      return this.currentQuestionIndex === this.questions.length;
    },
    isQuestionReq() {
      if (this.currentQuestion != null){
        return this.currentQuestion.required
      }else {
        return false;
      }
    },
  },
  methods: {
    handleAnswerChange(selectedOption) {
      this.currentOption = selectedOption;
    },
    nextQuestion() {
      this.answers[this.currentQuestionIndex++] = this.currentOption;
      this.currentOption = this.answers[this.currentQuestionIndex] || null;   
    },
    goBack() {
      if(this.currentQuestionIndex === this.questions.length){
        this.results = null;
      }
      this.currentOption = this.answers[--this.currentQuestionIndex] || null;
    },
    skipQuestion() {
      this.answers[this.currentQuestionIndex++] = null;
      this.currentOption = this.answers[this.currentQuestionIndex] || null;
    },
    submitAnswers() {
      this.resultsChildren = this.calcChildren(this.answers);
      this.resultsHousing = this.calcHousing(this.answers);
      this.resultsHeating = this.calcHeating(this.answers);
      this.resultsKEA = this.calcKEA(this.answers);
      const keaEligible = this.resultsKEA.eligible;
      this.resultsKOT = this.calcKOT(this.answers, keaEligible);
    },
    calcChildren(answers){
      // Προϋποθέσεις για επιλεξιμότητα
      const submittedTaxDeclaration = answers[0] === "Ναι";
      const residesInGreece = answers[1] === "Ναι";
      const yearsInGreece = parseInt(answers[2]) >= 5;
      const income = parseFloat(answers[3]);
      const isSingleParent = answers[6] === "Μονογονέας";
      const dependentChildren = parseInt(answers[7]) || 0;

      return calcChildrenBenefit(submittedTaxDeclaration, income, dependentChildren, residesInGreece,
              yearsInGreece, isSingleParent);
    },
    calcHousing(answers){
      // Προϋποθέσεις για επιλεξιμότητα
      const submittedTaxDeclaration = answers[0] === "Ναι";
      const yearsInGreece = parseInt(answers[2]) >= 5;
      const income = parseFloat(answers[3]);
      const activeRent = answers[12] === "Ναι";
      const rent = parseFloat(answers[13]);
      const isSingleParent = answers[6] === "Μονογονέας";
      const dependentChildren = parseInt(answers[7]) || 0;
      const unprotectedChildren = parseInt(answers[8]) || 0;
      const hostedPersons = parseInt(answers[9]) || 0;
      const propertyValue = parseFloat(answers[14]);
      const savings = parseFloat(answers[15]);
      const luxuryBelonging = answers[17] === "Όχι, δεν διαθέτω κάποιο από τα παρακάτω";

      return calcHousingBenefit(submittedTaxDeclaration, yearsInGreece, income, activeRent, rent, isSingleParent, dependentChildren,
                unprotectedChildren, hostedPersons, propertyValue, savings, luxuryBelonging);
    },
    calcHeating(answers){
      // Προϋποθέσεις για επιλεξιμότητα
      const submittedTaxDeclaration = answers[0] === "Ναι";
      const yearsInGreece = parseInt(answers[2]) >= 5;
      const income = parseFloat(answers[3]);
      const isBusinessOwner = answers[4] === "Ναι";
      const businessIncome = isBusinessOwner ? parseFloat(answers[5]) : 0;
      const propertyValue = parseFloat(answers[14]);
      const isMarried = answers[6] === "Έγγαμος/η - Σύμφωνο συμβίωσης";
      const isSingleParent = answers[6] === "Μονογονέας";
      const dependentChildren = parseInt(answers[7]);
      const area = answers[10];
      const heatingSource = answers[11];

      return calcHeatingBenefit(submittedTaxDeclaration, yearsInGreece, income, isBusinessOwner, businessIncome,
                            propertyValue, isMarried, isSingleParent, dependentChildren, area, heatingSource);
    },
    calcKEA(answers){
      const residesInGreece = answers[1] === "Ναι";
      let adults = parseInt(answers[9] + 1);
      let dependentChildren = parseInt(answers[7]);
      const unsupportedChildren = parseInt(answers[8]) || 0;
      const isSingleParent = answers[6] === "Μονογονέας";
      const income = parseFloat(answers[3]);
      const propertyValue = parseFloat(answers[14]);
      const vehicleValue = parseFloat(answers[16]);
      const savings = parseFloat(answers[15]);
      const luxuryBelonging = answers[17] === "Όχι, δεν διαθέτω κάποιο από τα παρακάτω";
      
      return calcKEABenefit(residesInGreece, adults, dependentChildren, unsupportedChildren,
        isSingleParent, income, propertyValue, vehicleValue, savings, luxuryBelonging);
    },
    calcKOT(answers, keaEligible){
      const residesInGreece = answers[1] === "Ναι";
      let adults = parseInt(answers[9] + 1);
      let dependentChildren = parseInt(answers[7]);
      const unsupportedChildren = parseInt(answers[8]) || 0;
      const disabledPerson = answers[18] === "Ναι";
      const lifesupportedPerson = answers[19] === "Ναι";
      const income = parseFloat(answers[3]);
      const propertyValue = parseFloat(answers[14]);
      const luxuryBelonging = answers[17] === "Όχι, δεν διαθέτω κάποιο από τα παρακάτω";

      return calcKOTBenefit(residesInGreece, adults, dependentChildren, unsupportedChildren, disabledPerson,
        lifesupportedPerson, income, propertyValue, luxuryBelonging, keaEligible);
    }
    
  }
};
</script>

<style scoped>
.form-container {
  width: 80%;
  margin: 0 auto;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

main {
  flex:1;
}

.page {
  display:flex;
  flex-direction: column;
  min-height: 100vh;
}

.footer {
  align-self:end;
}
</style>