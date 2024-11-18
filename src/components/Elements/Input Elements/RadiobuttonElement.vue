<template>
  <div class="options-radio">
    <label class="question-label" v-html="question"></label>
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
    <label v-html="note"> </label>
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

.question-label {
  font-weight: 600;
  margin-bottom: 0.75rem;
  display: block;
  font-size: 1.2rem;
  color: #333;
}

.options-radio {
  display: flex;
  flex-direction:column;
  align-items: center;
  margin-bottom: 0.5rem;
}

input[type="radio"] {
  margin-right: 0.5rem; /* Space between the radio button and its label */
}

label {
  font-size: 1rem;
  color: #333;
  text-align: left; /* Ensure text is left-aligned */
}

</style>
