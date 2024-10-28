<template>
  <div class="question-form">
    <h2>{{ title }}</h2>
    <div class="questions-container">
      <slot></slot>
    </div>
    <button @click="submitAnswers" class="submit-button">Submit Answers</button>
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
      // Logic for handling the form submission
      this.$emit('submit'); // Emit an event to notify parent component
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

.submit-button {
  padding: 0.6rem 1.2rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

.submit-button:hover {
  background-color: #0056b3;
}
</style>
