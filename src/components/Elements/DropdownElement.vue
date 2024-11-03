<template>
  <div>
    <label>{{ question }}</label>
    <select @change="onChange($event.target.value)">
      <option v-for="option in options" :key="option" :value="option">{{ option }}</option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'DropdownElement',
  props: {
    question: String,
    options: Array,
  },
  mounted() {
    this.$emit('onAnswerChange', this.options[0]);
  },
  methods: {
    onChange(value) {
      this.$emit('onAnswerChange', value);
    },
  },
};
</script>
