<template>
  <div class="input-container">
    <label class="question-label govgr-heading-l" v-html="question"></label>
    <p class="govgr-error-message govgr-mt-6">
      <span class="govgr-visually-hidden">Λάθος:</span> Πρέπει να συμπληρώσετε το πεδίο. 
    </p>
    <div class="govgr-field">
      <label class="govgr-label">
        <input 
          id="input-field" 
          class="govgr-input" 
          type="text" 
          v-model="formattedInput" 
          @input="onInput($event.target.value)" 
        />
      </label>
    </div>
    <label v-html="note"></label>
  </div>
</template>

<script>
export default {
  name: 'TextboxElement',
  props: {
    question: String,
    inputValue: { 
      type: [String, Number, null]
    },
    note: String
  },
  data() {
    return {
      input: this.inputValue || "",
      formattedInput: this.formatNumber(this.inputValue || ""),
    };
  },
  watch: {
    input(newValue) {
      if (newValue < 0) {
        this.input = 0; // Reset to 0 if the value is negative
      }
      this.formattedInput = this.formatNumber(this.input); // Update formatted input
      this.$emit('onAnswerChange', this.input);
    },
    inputValue(newValue) {
      if (newValue !== this.input) {
        this.input = newValue;
        this.formattedInput = this.formatNumber(newValue);
      }
    }
  },
  methods: {
    onInput(value) {
      // Remove any formatting to process raw input
      const rawValue = value.replace(/\./g, "");

      // Ensure only numbers are allowed and no negatives
      const numericValue = Math.max(Number(rawValue) || 0, 0);

      // Update the input and emit the raw number
      this.input = numericValue;
      this.formattedInput = this.formatNumber(numericValue);
      this.$emit('onAnswerChange', this.input);
    },
    formatNumber(value) {
      if (value === null || value === undefined || value === "") return "";
      return value
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, "."); // Add thousands separator
    }
  },
  mounted() {
    this.$emit('onAnswerChange', this.input);
  }
};
</script>

<style scoped>
#input-field {
  display: block;
  width: 50%;
}

.input-container{
  text-align: left;
}

.question-label {
  color: #333;
}

</style>