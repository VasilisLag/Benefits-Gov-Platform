<template>
  <div class="page">
    <HeaderElement />
    <NavElement />
    <main class="p-4">
      <div class="form-container">
        <QuestionForm 
          title="Κοινωνικό Οικιακό Τιμολόγιο - Ελάχιστο Εγγυημένο Εισόδημα"
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
          v-if="resultsKEA && isFormSummary"
          :eligible="resultsKEA.eligible"
          :benefitAmount="resultsKEA.benefitAmount"
          :message="resultsKEA.message"
          :reasons="resultsKEA.reasons"
        />
        <ResultsForm 
          v-if="resultsKOT && isFormSummary"
          :eligible="resultsKOT.eligible"
          :benefitAmount="resultsKOT.benefitAmount"
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
import questions from '@/questions/vulnerableBenefitsQs.js';
import SummaryTable from '@/components/Elements/SummaryTable.vue';
import ResultsForm from '@/components/Elements/ResultsForm.vue';
import {calcKEABenefit} from '@/utils/calcBenefits.js';
import {calcKOTBenefit} from '@/utils/calcBenefits.js';

export default {
  name: 'VulnerableBenefits',
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
        this.resultsKEA = null;
        this.resultsKOT = null;
      }
      this.currentOption = this.answers[--this.currentQuestionIndex] || null;
    },
    skipQuestion() {
      this.answers[this.currentQuestionIndex++] = null;
      this.currentOption = this.answers[this.currentQuestionIndex] || null;
    },
    submitAnswers() {
      this.resultsKEA = this.calculateKEABenefits(this.answers);
      const aCatEligible = this.resultsKEA.eligible;
      this.resultsKOT = this.calculateKOTBenefits(this.answers, aCatEligible);
    },
    calculateKEABenefits(answers) {
      const residesInGreece = answers[0] === "Ναι";
      let adults = parseInt(answers[1]);
      let dependentChildren = parseInt(answers[2]);
      const unsupportedChildren = parseInt(answers[3]);
      const isSingleParent = answers[4] === "Ναι";
      const income = parseFloat(answers[8]);
      const propertyValue = parseFloat(answers[9]);
      const vehicleValue = parseFloat(answers[10]);
      const savings = parseFloat(answers[11]);
      const luxuryBelonging = answers[12] === "Όχι, δεν διαθέτω κάποιο από τα παρακάτω";
      
      return calcKEABenefit(residesInGreece, adults, dependentChildren, unsupportedChildren,
        isSingleParent, income, propertyValue, vehicleValue, savings, luxuryBelonging);
    },
    calculateKOTBenefits(answers, aCatEligible) {

      const residesInGreece = answers[0] === "Ναι";
      let adults = parseInt(answers[1]);
      let dependentChildren = parseInt(answers[2]);
      const unsupportedChildren = parseInt(answers[3]);
      const disabledPerson = answers[5] === "Ναι";
      const lifesupportedPerson = answers[6] === "Ναι";
      const income = parseFloat(answers[7]);
      const propertyValue = parseFloat(answers[9]);
      const luxuryBelonging = answers[12] === "Όχι, δεν διαθέτω κάποιο από τα παρακάτω";

      return calcKOTBenefit(residesInGreece, adults, dependentChildren, unsupportedChildren, disabledPerson,
        lifesupportedPerson, income, propertyValue, luxuryBelonging, aCatEligible);
    },
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