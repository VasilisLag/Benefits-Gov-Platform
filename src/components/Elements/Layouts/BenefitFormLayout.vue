<template>
  <div class="page">
    <HeaderElement />
    <NavElement />
    <main class="p-4">
      <div class="form-container govgr-mt-12">
        <QuestionForm 
          :title="title"
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
      </div>
    </main>
  </div>
</template>

<script>
import HeaderElement from '@/components/Elements/Page Elements/HeaderElement.vue';
import NavElement from '@/components/Elements/Page Elements/NavElement.vue';
import InputElement from '@/components/Elements/InputElement.vue';
import QuestionForm from '@/components/Elements/QuestionForm.vue';
import SummaryTable from '@/components/Elements/SummaryTable.vue';

export default {
  name: 'BenefitFormLayout',
  props: {
    title: String,
    questions: Array
  },
  components: {
    HeaderElement,
    NavElement,
    InputElement,
    QuestionForm,
    SummaryTable
  },
  data() {
    return {
      currentQuestionIndex: 0,
      currentOption: null,
      answers: []
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
      return this.currentQuestion?.required ?? false;
    }
  },
  methods: {
    handleAnswerChange(option) {
      this.currentOption = option;
    },
    nextQuestion() {
      this.answers[this.currentQuestionIndex++] = this.currentOption;
      this.currentOption = this.answers[this.currentQuestionIndex] || null;
    },
    goBack() {
      if (this.currentQuestionIndex === this.questions.length) {
        this.$emit('clear-results');
      }
      this.currentOption = this.answers[--this.currentQuestionIndex] || null;
    },
    skipQuestion() {
      this.answers[this.currentQuestionIndex++] = null;
      this.currentOption = this.answers[this.currentQuestionIndex] || null;
    },
    submitAnswers() {
      this.$emit('submit-answers', this.answers);
    }
  }
};
</script>

<style scoped>

.form-container {
  width: 70%;
  margin: 0 auto;
}

.page {
  display:flex;
  flex-direction: column;
  min-height: 100vh;
  overflow-y: scroll;
}

main {
  flex: 1;
}
</style>
