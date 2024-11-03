<template>
  <div>
    <HeaderElement />
    <NavElement />
    <main class="p-4">
      <div class="form-container">
        <QuestionForm title="Children Benefit Eligibility" @back="goBack" @skip="skipQuestion" @submit="handleSubmit">
          <InputElement
            v-if="currentQuestion"
            :question="currentQuestion.question"
            :options="currentQuestion.options"
            :category="currentQuestion.category"
            @onAnswerChange="handleAnswerChange"
          />
        </QuestionForm>
      </div>
    </main>
    <FooterElement />
  </div>
</template>

<script>
import HeaderElement from '@/components/Elements/HeaderElement.vue';
import NavElement from '@/components/Elements/NavElement.vue';
import FooterElement from '@/components/Elements/FooterElement.vue';
import InputElement from '@/components/Elements/InputElement.vue';
import QuestionForm from '@/components/Elements/QuestionForm.vue';
import questions from '@/questions/childrenBenefitQs.js'; 

export default {
  name: 'ChildrenBenefit',
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
      console.log("Selected Option:", selectedOption);
      this.answers[this.currentQuestionIndex] = selectedOption;
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
      console.log(questions)
      console.log("Calculating benefits based on responses...", this.answers);
    },
  },
};
</script>

<style scoped>
.form-container {
  width: 70%; /* Set width to 70% of the parent */
  margin: 0 auto; /* Center the container */
}
</style>