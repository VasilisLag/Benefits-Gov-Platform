<template>
  <div>
    <label>{{ question }}</label>
    <div v-for="option in options" :key="option">
      <input type="radio" :value="option" @change="onChange(option)" />
      {{ option }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'RadiobuttonElement',
  props: {
    question: String,
    options: Array,
  },
  methods: {
    onChange(value) {
      this.$emit('onAnswerChange', value);
    },
  },
};
</script>
