<template>
  <div class="question-form">
    <h2 id="benefit-title">{{ title }}</h2>

    <div class="progress-bar-container">
      <div
        class="progress-bar"
        :style="{ width: progressPercentage + '%' }"
      ></div>
    </div>
    <p class="progress-text" v-if="!isLastQuestion">
      Ερώτηση {{ questionIndex + 1 }} από {{ numberOfQuestions }}
    </p>
    
    <div class="questions-container">
      <slot></slot>
    </div>

    <div class="button-container">
      <div class="back-skip-container">
        <button @click="goBack" :disabled="isFirstQuestion" class="govgr-btn govgr-btn-warning nav-button back-button">Πίσω</button>
        <button @click="skipQuestion" :disabled="isLastQuestion || isQuestionRequired" class="govgr-btn govgr-btn-primary nav-button">Παράλειψη</button>
        <button @click="nextQuestion" :disabled="isLastQuestion || hasNotChosen" class="govgr-btn govgr-btn-primary nav-button">Επόμενο</button>
      </div>
      <button @click="submitAnswers" :disabled="!isLastQuestion" class="govgr-btn govgr-btn-primary nav-button">Υποβολή Απαντήσεων</button>
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
    isLastQuestion: {
      type: Boolean,
      required: true,
    },
    isFirstQuestion: {
      type: Boolean,
      required: true,
    },
    isQuestionRequired: {
      type: Boolean,
      default: false,
    },
    selectedOption: String,
    questionIndex: Number,
    numberOfQuestions: Number,
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
  computed: {
    hasNotChosen() {
      return this.selectedOption === null || this.selectedOption === '';
    },
    progressPercentage() {
      return ((this.questionIndex) / this.numberOfQuestions) * 100;
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
  display: flex;
  flex-direction: column;
  min-height: 350px;
}

.progress-bar-container {
  width: 100%;
  background-color: #e0e0e0;
  height: 10px;
  border-radius: 5px;
  margin: 10px 0;
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  background-color: #4caf50;
  transition: width 0.3s ease-in-out;
}

.progress-text {
  font-size: 14px;
  margin: 0 0 10px 0;
  text-align: center;
}

.questions-container {
  margin: 1.5rem 0;
  flex-grow: 1;
  overflow-y: auto;
}

.button-container {
  display: flex;
  justify-content: space-around;
  width: 100%;
}

.back-skip-container {
  display: flex;
  gap: 1rem;
}

.nav-button {
  font-size: 12px;
}

#benefit-title {
  font-size: 22px;
  font-weight: bold;
}

button:disabled {
  cursor: not-allowed;
  background-color: gray;
}

@media (max-width: 1023px) {
  .button-container {
    display: grid;
    grid-template-columns: 1fr;
    justify-items: center;
  }

  .question-form {
    height: 600px;
  }

  .nav-button {
    font-size: 10px;
  }
}

@media (max-width: 767px) {
  .question-form {
    height: 700px;
  }

  .back-skip-container {
    gap: 0;
  }

  .nav-button {
    font-size: 8px;
  }
}

@media (max-width: 424px) {
  .question-form {
    height: 800px;
  }

  .back-skip-container {
    display: grid;
    grid-template-columns: 1fr;
    justify-items: center;
  }

  .nav-button {
    margin-bottom: 8px;
  }
}
</style>
