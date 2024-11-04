<template>
  <div class="question-form">
    <h2>{{ title }}</h2>
    <div class="questions-container">
      <slot></slot>
    </div>
    <div class="button-container">
      <div class="back-skip-container">
        <button @click="goBack" class="govgr-btn govgr-btn-warning nav-button back-button">Πίσω</button>
        <button @click="skipQuestion" class="govgr-btn govgr-btn-primary nav-button">Παράλειψη</button>
        <button @click="nextQuestion" class="govgr-btn govgr-btn-primary nav-button">Επόμενο</button>
      </div>
      <button @click="submitAnswers" class="govgr-btn govgr-btn-primary nav-button">Υποβολή Απαντήσεων</button>
    </div>

  </div>
</template>

<script>
export default {
  name: 'QuestionForm',
  props: {
    title: {
      type: String,
      required: true,
    },
  },
  methods: {
    submitAnswers() {
      this.$emit('submit'); 
    },
    goBack() {
      this.$emit('back');
    },
    skipQuestion() {
      this.$emit('skip');
    },
    nextQuestion() {
      this.$emit('next');
    },
  },
};
</script>

<style scoped>
.question-form {
  margin: 2rem 0;
  padding: 1.5rem;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
  background-color: #f9f9f9;
}

.questions-container {
  margin: 1.5rem 0;
}

.button-container {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.back-skip-container {
  display: flex;
  gap: 1rem;
}

.nav-button {
  font-size: 12px;
}

</style>
