<template>
  <div>
    <label>{{ question }}</label>
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
      selectedOption: this.answer || null // Initialize selectedOption with answer or null
    };
  },
  watch: {
    // Watch for changes in the 'answer' prop and update selectedOption accordingly
    answer(newAnswer) {
      this.selectedOption = newAnswer;
    }
  },
  methods: {
    onChange(value) {
      // Emit the selected value whenever a radio button is selected
      this.$emit('onAnswerChange', value);
    }
  },
  mounted() {
    // Emit the initial selected option when the component is mounted
    this.$emit('onAnswerChange', this.selectedOption);
  }
};
</script>
