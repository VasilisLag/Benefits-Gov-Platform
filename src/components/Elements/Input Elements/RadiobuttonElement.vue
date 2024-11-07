<template>
  <div>
    <label>{{ question }}</label>
    <div v-for="option in options" :key="option">
      <input type="radio" v-model="selectedOption" :value="option" @change="onChange(option)" />
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
  data() {
    return {
      selectedOption: null,
    };
  },
  methods: {
    onChange(value) {
      this.$emit('onAnswerChange', value);
    },
  },
};
</script>
