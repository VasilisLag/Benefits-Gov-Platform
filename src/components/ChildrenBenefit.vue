<template>
  <div>
    <HeaderElement />
    <NavElement />
    <main class="p-4">
      <div>
        <QuestionForm title="Children Benefit Eligibility">
          <MultiplechoiceElement
            :question="exampleQuestion.question"
            :options="exampleQuestion.options"
            @onAnswerChange="handleAnswerChange"
          />
        </QuestionForm>
      </div>
    </main>
    <FooterElement />
  </div>
</template>

<script>
import HeaderElement from '@/components/Elements/HeaderElement.vue';
import NavElement from '@/components/Elements/NavElement.vue';
import FooterElement from '@/components/Elements/FooterElement.vue';
import MultiplechoiceElement from '@/components/Elements/MultiplechoiceElement.vue';
import QuestionForm from '@/components/Elements/QuestionForm.vue';

export default {
  name: 'ChildrenBenefit',
  components: {
    HeaderElement,
    NavElement,
    MultiplechoiceElement,
    QuestionForm,
    FooterElement,
  },
  data() {
    return {
      // Defining exampleQuestion inside the data function
      exampleQuestion: {
        question: "Do you have children under 18 years old?",
        options: ["Yes", "No", "Prefer not to say"],
      },
    };
  },
  methods: {
    handleAnswerChange(selectedOption) {
      console.log("Selected Option:", selectedOption);
      // Handle the answer selection
    },
  },
};
</script>

<style scoped>
section {
  margin: 4vw;
  text-align: left;
}
</style>
