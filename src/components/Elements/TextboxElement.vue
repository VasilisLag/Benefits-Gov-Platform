<template>
  <div>
    <label>{{ question }}</label>
    <input type="text" @input="onInput($event.target.value)" />
  </div>
</template>

<script>
export default {
  name: 'TextboxElement',
  props: {
    question: String,
  },
  methods: {
    onInput(value) {
      this.$emit('onAnswerChange', value);
    },
  },
};
</script>
