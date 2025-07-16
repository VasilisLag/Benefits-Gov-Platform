<template>
  <div class="govgr-field govgr-field--error input-wrapper">
    <fieldset class="govgr-fieldset" aria-describedby="radio-country">
      <legend role="heading" aria-level="1" class="govgr-fieldset__legend">
        <span class="govgr-heading-l">
          {{ question }}
        </span>
      </legend>
      <p class="govgr-hint govgr-mt-3 hints">Μπορείτε να επιλέξετε μόνο μία επιλογή.</p>
      <p class="govgr-error-message hints govgr-mb-6">
        <span class="govgr-visually-hidden">Λάθος:</span>
        Πρέπει να επιλέξετε μια απάντηση
      </p>
      <div class="govgr-radios govgr-mt-3">
        <div class="govgr-radios__item" v-for="(option, index) in options" :key="index">
          <label class="govgr-label govgr-radios__label">
            {{ option }}
            <input
              class="govgr-radios__input"
              type="radio"
              :value="option"
              v-model="selectedOption"
              :id="option"
              :name="question"
              @change="onChange(selectedOption)"
            />
          </label>
        </div>
      </div>
    </fieldset>
    <!-- <label class="govgr-note" v-html="note"></label> -->
  </div>
</template>

<script>
export default {
  name: 'RadiobuttonElement',
  props: {
    question: String,
    options: Array,
    answer: {
      type: String,
      default: null
    },
    note: String
  },
  data() {
    return {
      selectedOption: this.answer || null
    };
  },
  watch: {
    answer(newAnswer) {
      this.selectedOption = newAnswer;
    }
  },
  methods: {
    onChange(value) {
      this.$emit('onAnswerChange', value);
    }
  },
  mounted() {
    this.$emit('onAnswerChange', this.selectedOption);
  }
};
</script>

<style scoped>

.govgr-field {
  margin-bottom: 1.5rem;
}


.govgr-fieldset__legend {
  margin-bottom: 1rem;
  text-align: left;
  font-weight: bold;
}

.govgr-radios__item {
  margin-bottom: 1rem;
  margin-left: 2rem;
  display: flex;
}

.govgr-radios__input {
  margin-right: 0.25rem;
}

.govgr-label {
  display: inline-flex;
  align-items: center;
}

.govgr-note {
  margin-top: 1rem;
}

.hints {
  text-align: left;
}

.input-wrapper {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

</style>