<template>
  <div>
    <MultiplechoiceElement v-if="isMultipleChoice" ref="inputComponent" :question="question" :options="options" @onAnswerChange="onAnswerChange" />
    <DropdownElement v-else-if="isDropdown" :question="question" :options="options" @onAnswerChange="onAnswerChange" />
    <RadioButtonElement v-else-if="isRadio" :question="question" :options="options" @onAnswerChange="onAnswerChange" />
    <TextboxElement v-else-if="isTextbox" :question="question" @onAnswerChange="onAnswerChange" />
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
  },
  components: {
    MultiplechoiceElement,
    DropdownElement,
    RadioButtonElement,
    TextboxElement,
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
    },
  },
  methods: {
    onAnswerChange(answer) {
      this.$emit('onAnswerChange', answer);
    },
    resetInput() {
        console.log("DogSHit");
        console.log(this.$refs.inputComponent);
        if (this.$refs.inputComponent && typeof this.$refs.inputComponent.resetOption === 'function') {
            this.$refs.inputComponent.resetOption();
            console.log("SHit");
        }
    },
  },
};
</script>
