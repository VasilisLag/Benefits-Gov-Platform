<template>
  <div class="page">
    <HeaderElement />
    <NavElement />
    <main class="p-4">
      <div class="form-container">
        <QuestionForm 
          title="Επίδομα Θέρμανσης"
          :isLastQuestion="isLastQuestion"
          :isFirstQuestion="isFirstQuestion"
          :selectedOption="currentOption"
          :isQuestionRequired="isQuestionReq"
          :questionIndex="currentQuestionIndex"
          :numberOfQuestions="questions.length"
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
          :title="title"
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
import questions from '@/questions/heatingBenefitQs.js';
import SummaryTable from '@/components/Elements/SummaryTable.vue';
import ResultsForm from '@/components/Elements/ResultsForm.vue';
import {calcHeatingBenefit} from '@/utils/calcBenefits.js';

export default {
  name: 'ChildrenBenefit',
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
      results: null,
      title: "Επίδομα Θέρμανσης"
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
      const isBusinessOwner = answers[3] === "Ναι";
      const businessIncome = isBusinessOwner ? parseFloat(answers[4]) : 0;
      const propertyValue = parseFloat(answers[5]);
      const isMarried = answers[6] === "Έγγαμος/η - Σύμφωνο συμβίωσης";
      const isSingleParent = answers[6] === "Μονογονέας";
      const dependentChildren = parseInt(answers[7]);
      const area = answers[8];
      const heatingSource = answers[9];

      return calcHeatingBenefit(submittedTaxDeclaration, yearsInGreece, income, isBusinessOwner, businessIncome,
                            propertyValue, isMarried, isSingleParent, dependentChildren, area, heatingSource);
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