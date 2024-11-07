<template>
  <div>
    <label>{{ question }}</label>
    <select v-model="selectedOption" @change="onChange(selectedOption)">
      <option v-for="option in options" :key="option" :value="option">
        {{ option }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'DropdownElement',
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
      selectedOption: this.answer || this.options[0]
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
    },
  },
  mounted() {
    this.$emit('onAnswerChange', this.selectedOption);
  }
};
</script>
