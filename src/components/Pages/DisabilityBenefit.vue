<template>
  <div class="page">
    <HeaderElement />
    <NavElement />
    <main class="p-4">
      <div class="form-container">
        <QuestionForm title="Επίδομα Αναπηρίας (ΚΕΠΑ)" @back="goBack" @skip="skipQuestion" @next="nextQuestion" @submit="handleSubmit">
          <InputElement
            v-if="currentQuestion"
            ref="inputElement"
            :question="currentQuestion.question"
            :options="currentQuestion.options"
            :category="currentQuestion.category"
            @onAnswerChange="handleAnswerChange"
          />
        </QuestionForm>
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
import questions from '@/questions/childrenBenefitQs.js'; 

export default {
  name: 'DisabilityBenefit',
  components: {
    HeaderElement,
    NavElement,
    InputElement,
    QuestionForm,
    FooterElement,
  },
  data() {
    return {
      currentQuestionIndex: 0,
      questions: questions,
      currentOption: null,
      answers: []
    };
  },
  computed: {
    currentQuestion() {
      return this.questions[this.currentQuestionIndex];
    },
  },
  methods: {
    handleAnswerChange(selectedOption) {
      this.currentOption = selectedOption
      console.log("Selected Option:", selectedOption);
    },
    nextQuestion() {
      this.answers[this.currentQuestionIndex] = this.currentOption;
      this.$refs.inputElement.resetInput();
      this.currentQuestionIndex++;
      if (this.currentQuestionIndex >= this.questions.length) {
        this.calculateBenefits();
      }
    },
    goBack() {
      if (this.currentQuestionIndex > 0) {
        this.currentQuestionIndex--;
      }
    },
    skipQuestion() {
      if (this.currentQuestionIndex < this.questions.length) {
        this.currentQuestionIndex++;
      }
    },
    calculateBenefits() {
      console.log("Calculating benefits based on responses...", this.answers);
    },
  }
};
</script>

<style scoped>
.form-container {
  width: 70%;
  margin: 0 auto;
}

main {
  flex:1;
}

.page {
  display:flex;
  flex-direction: column;
  min-height: 100vh;
  overflow-y: scroll;
}

.footer {
  align-self:end;
}
</style>