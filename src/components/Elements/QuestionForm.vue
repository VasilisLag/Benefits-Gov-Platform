<template>
  <div class="question-form">
    <a v-if="!isFirstQuestion" @click.prevent="goBack" class="govgr-back-link">
      <svg class="govgr-svg-icon govgr-svg-icon--caret govgr-svg-icon--left" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M18,22V2L6,12L18,22z" />
      </svg>
      Πίσω
    </a>

    <!-- <p v-if="currentTag" class="govgr-caption govgr-!-margin-bottom-2 govgr-!-margin-top-2 govgr-!-font-size-24" id="question-category">
      Κατηγορία: <strong>{{ formatTag(currentTag) }}</strong>
    </p> -->

    <div class="questions-container govgr-mt-6">
      <slot></slot>
    </div>

    <div class="govgr-mt-8">
      <button
        v-if="!isLastQuestion"
        @click="nextQuestion"
        :disabled="hasNotChosen"
        class="govgr-btn govgr-btn-primary"
      >
        Συνέχεια
      </button>

      <button
        v-if="isLastQuestion"
        @click="submitAnswers"
        class="govgr-btn govgr-btn-primary"
      >
        Αξιολόγηση
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'QuestionForm',
  props: {
    title: String,
    isLastQuestion: Boolean,
    isFirstQuestion: Boolean,
    isQuestionRequired: Boolean,
    selectedOption: String,
    questionIndex: Number,
    numberOfQuestions: Number,
    currentTag: String,
  },
  computed: {
    hasNotChosen() {
      return this.selectedOption === null || this.selectedOption === '';
    }
  },
  methods: {
    submitAnswers() {
      this.$emit('submit');
    },
    goBack() {
      this.$emit('back');
    },
    nextQuestion() {
      this.$emit('next');
    },
    formatTag(tag) {
      const map = {
        demography: 'Δημογραφικά',
        income: 'Εισόδημα',
        household: 'Οικογενειακή Κατάσταση',
        assets: 'Ακίνητα / Περιουσιακά Στοιχεία',
        vulnerable: 'Ευάλωτες Ομάδες',
        residence: 'Κατοικία'
      };
      return map[tag] || tag;
    }
  }
};
</script>

<style scoped>
#question-category {
  text-align: left;
}

.questions-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 320px;
  padding-bottom: 1rem;
}

</style>