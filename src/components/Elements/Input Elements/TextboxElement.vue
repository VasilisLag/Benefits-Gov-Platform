<template>
  <div>
    <label class="question-label" v-html="question"></label>
    <input 
      id="input-field" 
      class="govgr-input" 
      type="text" 
      v-model="formattedInput" 
      @input="onInput($event.target.value)" 
    />
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
  width: 30%;
  max-height: 2rem;
}

.question-label {
  font-weight: 600;
  margin-bottom: 0.75rem;
  display: block;
  font-size: 1.2rem;
  color: #333;
}

.govgr-input {
  margin: 2rem auto 4rem auto;
}
</style>