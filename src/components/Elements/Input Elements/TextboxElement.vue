<template>
  <div>
    <label>{{ question }}</label>
    <input type="number" v-model.number="input" @input="onInput(input)" />
  </div>
</template>

<script>
export default {
  name: 'TextboxElement',
  props: {
    question: String,
    inputValue: { 
      type: [String, Number, null]
    }
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
