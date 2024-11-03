<template>
  <div class="multiple-choice-question">
    <label class="question-label">{{ question }}</label>
    <div class="options-group">
      <button
        v-for="(option, index) in options"
        :key="index"
        :class="['option-button', { active: selectedOption === option }]"
        @click="selectOption(option)"
      >
        {{ option }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "MultiplechoiceElement",
  props: {
    question: {
      type: String,
      required: true,
    },
    options: {
      type: Array,
      required: true,
      default: () => ["Yes", "No"],
    },
    selectedOption: {
      type: String,
      default: null,
    },
  },
  methods: {
    selectOption(option) {
      this.$emit("onAnswerChange", option);
    },
  },
};
</script>

<style scoped>
.multiple-choice-question {
  margin: 1.5rem 0;
}

.question-label {
  font-weight: 600;
  margin-bottom: 0.75rem;
  display: block;
  font-size: 1.2rem;
  color: #333;
}

.options-group {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  justify-content: center;
}

.option-button {
  padding: 0.6rem 1.2rem;
  background-color: #f5f5f5;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s, transform 0.1s;
  font-size: 1rem;
}

.option-button:hover {
  background-color: #007bff;
  color: white;
}

.option-button.active {
  background-color: #0056b3;
  color: white;
  border-color: #004080;
}

.option-button:focus {
  outline: none;
  transform: scale(1.03);
}
</style>
