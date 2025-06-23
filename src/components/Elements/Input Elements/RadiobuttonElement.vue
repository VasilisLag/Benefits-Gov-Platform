<template>
  <div class="govgr-field">
    <fieldset class="govgr-fieldset" aria-describedby="radio-country">
      <legend role="heading" aria-level="1" class="govgr-fieldset__legend govgr-heading-lg">
        {{ question }}
      </legend>
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
              @change="onChange(selectedOption)"
            />
          </label>
        </div>
      </div>
    </fieldset>
    <label class="govgr-note" v-html="note"></label>
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
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
  text-align: left;
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
  font-size: 0.875rem;
  color: #666;
}

</style>