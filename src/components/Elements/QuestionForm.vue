<template>
  <div class="question-form">
    <h2>{{ title }}</h2>
    <div class="questions-container">
      <slot></slot>
    </div>
    <div class="button-container">
      <div class="back-skip-container">
        <button @click="goBack" class="back-button">Πίσω</button>
        <button @click="skipQuestion" class="submit-button">Παράλειψη</button>
        <button @click="nextQuestion" class="submit-button">Επόμενο</button>
      </div>
      <button @click="submitAnswers" class="submit-button">Υποβολή Απαντήσεων</button>
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
  justify-content: space-between; /* Adjusted for spacing */
  width: 100%;
}

.back-skip-container {
  display: flex; /* Flex to align back and skip buttons */
  gap: 1rem; /* Space between the buttons */
}

.back-button,
.submit-button {
  padding: 0.6rem 1.2rem;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

.back-button {
  background-color: #f5f5f5;
  color: #333;
}

.back-button:hover {
  background-color: #e0e0e0;
}

.submit-button {
  background-color: #007bff;
  color: white;
}

.submit-button:hover {
  background-color: #0056b3;
}
</style>
