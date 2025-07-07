<template>
  <div class="dropdown-element govgr-mb-12">
    <label class="question-label govgr-heading-l" v-html="question"></label>
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

.dropdown-element {
  text-align: left;
}

.question-label {
  display: block;
}

.govgr-input {
  width:40%;
  text-align: left;
}

</style>
