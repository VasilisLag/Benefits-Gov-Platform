<template>
  <div>
    <label class="question-label" v-html="question"></label>
    <select class="govgr-input" v-model="selectedOption" @change="onChange(selectedOption)">
      <option v-for="option in options" :key="option" :value="option">
        {{ option }}
      </option>
    </select>
    <label v-html="note"> </label>
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
    },
    note: String
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

<style scoped>

.question-label {
  font-weight: 600;
  display: block;
  font-size: 1.2rem;
  color: #333;
}

.govgr-input {
  width:40%;
  margin:2rem 3rem 6rem 3rem;
}

</style>
