<template>
  <div>
    <label class="question-label" v-html="question"></label>
    <input id="input-field" class="govgr-input" type="number" v-model.number="input" @input="onInput(input)" />
    <label v-html="note"> </label>
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
      input: this.inputValue || ""
    };
  },
watch: {
  input(newValue) {
    this.input = newValue;
    this.$emit('onAnswerChange', this.input);
  },
  inputValue(newValue) {
    if (newValue !== this.input) {
      this.input = newValue;
    }
  }
},
  methods: {
    onInput(value) {
      this.$emit('onAnswerChange', value);
    }
  },
  mounted() {
    this.$emit('onAnswerChange', this.input);
    console.log(this.input);
  }
};
</script>

<style scoped>
#input-field {
  display: block;
  margin: 1rem auto;
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
</style>