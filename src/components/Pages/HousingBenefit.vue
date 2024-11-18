<template>
  <div class="page">
    <HeaderElement />
    <NavElement />
    <main class="p-4">
      <div class="form-container">
        <QuestionForm 
          title="Επίδομα Στέγασης"
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
          v-if="results && isFormSummary"
          :eligible="results.eligible"
          :benefitAmount="results.benefitAmount"
          :message="results.message"
          :reasons="results.reasons"
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
import questions from '@/questions/housingBenefitQs.js';
import SummaryTable from '@/components/Elements/SummaryTable.vue';
import ResultsForm from '@/components/Elements/ResultsForm.vue';
import {calcHousingBenefit} from '@/utils/calcBenefits.js';

export default {
  name: 'HousingBenefit',
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
      results: null
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
    isResultsVisible() {
      return this.results;
    }
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
      this.results = this.calculateBenefits(this.answers);
    },
    calculateBenefits(answers) {
      // Προϋποθέσεις για επιλεξιμότητα
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
      const luxuryBelonging = answers[11] === "Όχι, δεν διαθέτω κάποιο από τα παραπάνω";

      return calcHousingBenefit(submittedTaxDeclaration, yearsInGreece, income, activeRent, rent, isSingleParent, dependentChildren,
                unprotectedChildren, hostedPersons, propertyValue, savings, luxuryBelonging);
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