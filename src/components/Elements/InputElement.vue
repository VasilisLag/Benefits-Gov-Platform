<template>
  <div>
    <MultiplechoiceElement 
      v-if="isMultipleChoice" 
      :question="question" 
      :note="note"
      :options="options" 
      :answer="answer"
      @onAnswerChange="onAnswerChange"
    />
    <DropdownElement 
      v-else-if="isDropdown" 
      :question="question" 
      :note="note"
      :options="options" 
      :answer="answer"
      @onAnswerChange="onAnswerChange"
    />
    <RadioButtonElement 
      v-else-if="isRadio" 
      :question="question" 
      :options="options" 
      :note="note"
      :answer="answer"
      @onAnswerChange="onAnswerChange"
    />
    <TextboxElement 
      v-else-if="isTextbox" 
      :question="question" 
      :answer="answer"
      :note="note"
      :inputValue="input"
      @onAnswerChange="onAnswerChange"
    />
  </div>
</template>

<script>
import MultiplechoiceElement from './Input Elements/MultiplechoiceElement.vue';
import DropdownElement from './Input Elements/DropdownElement.vue';
import RadioButtonElement from './Input Elements/RadiobuttonElement.vue';
import TextboxElement from './Input Elements/TextboxElement.vue';

export default {
  name: 'InputElement',
  props: {
    question: String,
    options: Array,
    category: String,
    answer: {
      type: [String, Array, Number, null],
      default: null
    },
    input: {
      type: [String, Number, null],
      default: null
    },
    note: String
  },
  components: {
    MultiplechoiceElement,
    DropdownElement,
    RadioButtonElement,
    TextboxElement
  },
  computed: {
    isMultipleChoice() {
      return this.category === 'multiple-choice';
    },
    isDropdown() {
      return this.category === 'dropdown';
    },
    isRadio() {
      return this.category === 'radio';
    },
    isTextbox() {
      return this.category === 'textbox';
    }
  },
  methods: {
    onAnswerChange(answer) {
      this.$emit('onAnswerChange', answer);
    }
  }
};
</script>