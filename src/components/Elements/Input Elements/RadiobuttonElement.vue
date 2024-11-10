<template>
  <div>
    <label v-html="question"></label>
    <div v-for="option in options" :key="option">
      <input 
        type="radio" 
        v-model="selectedOption" 
        :value="option" 
        @change="onChange(selectedOption)" 
        :id="option"
      />
      <label :for="option">{{ option }}</label>
    </div>
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
    }
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
