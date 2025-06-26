<template>
  <div class="page">
    <HeaderElement />
    <NavElement />
    
    <div class="govgr-layout-wrapper govgr-mt-6">
      <div class="govgr-width-container" id="layout-wrapper">
        <div class="govgr-main-wrapper">

          <!-- 2/3 Ενότητα ερωτήσεων -->
          <main class="govgr-grid-column-two-thirds">
            <div class="govgr-breadcrumbs govgr-mb-12">
              <ol class="govgr-breadcrumbs__list">
                <li class="govgr-breadcrumbs__list-item">
                  <router-link class="govgr-breadcrumbs__link" to="/">Σχετικά</router-link>
                </li>
                <li class="govgr-breadcrumbs__list-item">
                  <span class="govgr-breadcrumbs__link" aria-current="page">{{ title }}</span>
                </li>
              </ol>
            </div>
            <QuestionForm 
              :title="title"
              :isLastQuestion="isLastQuestion"
              :isFirstQuestion="isFirstQuestion"
              :selectedOption="currentOption"
              :isQuestionRequired="isQuestionReq"
              :questionIndex="currentQuestionIndex"
              :numberOfQuestions="questions.length"
              :currentTag="currentTag"
              @back="goBack"
              @skip="skipQuestion"
              @next="nextQuestion"
              @submit="submitAnswers"
            >
              <InputElement
                v-if="currentQuestion"
                :question="currentQuestion.question"
                :key="currentQuestionIndex"
                :options="currentQuestion.options"
                :category="currentQuestion.category"
                :note="currentQuestion.note"
                :input="answer"
                :answer="answer"
                @onAnswerChange="handleAnswerChange"
              />
              <SummaryTable
                v-if="isFormSummary"
                :questions="questions.map(q => q.question)"
                :answers="questions.map(q => q.answer)"
                @edit="goToQuestion"
              />
            </QuestionForm>
          </main>
        </div>
      </div>
    </div>

  </div>
</template>


<script>
import HeaderElement from '@/components/Elements/Page Elements/HeaderElement.vue';
import NavElement from '@/components/Elements/Page Elements/NavElement.vue';
import InputElement from '@/components/Elements/InputElement.vue';
import QuestionForm from '@/components/Elements/QuestionForm.vue';
import SummaryTable from '@/components/Elements/SummaryTable.vue';

export default {
  name: 'BenefitFormLayout',
  props: {
    title: String,
    questions: Array
  },
  components: {
    HeaderElement,
    NavElement,
    InputElement,
    QuestionForm,
    SummaryTable
  },
  data() {
    return {
      currentQuestionIndex: 0,
      currentOption: null
    };
  },
  computed: {
    currentQuestion() {
      return this.questions[this.currentQuestionIndex];
    },
    isLastQuestion() {
      return this.currentQuestionIndex === this.questions.length;
    },
    isFirstQuestion() {
      return this.currentQuestionIndex === 0;
    },
    answer() {
      return this.questions[this.currentQuestionIndex]?.answer || null;
    },
    isFormSummary() {
      return this.currentQuestionIndex === this.questions.length;
    },
    isQuestionReq() {
      return this.currentQuestion?.required ?? false;
    },
    uniqueTags() {
      const tags = this.questions.map(q => q.tag);
      return [...new Set(tags)];
    },
    currentTag() {
      return this.questions[this.currentQuestionIndex]?.tag;
    }
  },
  methods: {
    handleAnswerChange(option) {
      this.currentOption = option;
    },
    nextQuestion() {
      if (this.currentQuestion) {
        this.currentQuestion.answer = this.currentOption;
      }
      this.currentQuestionIndex++;
      this.currentOption = this.questions[this.currentQuestionIndex]?.answer || null;
    },
    goBack() {
      if (this.currentQuestionIndex === this.questions.length) {
        this.$emit('clear-results');
      }
      this.currentQuestionIndex--;
      this.currentOption = this.questions[this.currentQuestionIndex]?.answer || null;
    },
    skipQuestion() {
      if (this.currentQuestion) {
        this.currentQuestion.answer = null;
      }
      this.currentQuestionIndex++;
      this.currentOption = this.questions[this.currentQuestionIndex]?.answer || null;
    },
    submitAnswers() {
      if (this.currentQuestion) {
        this.currentQuestion.answer = this.currentOption;
      }
      // Δημιουργία object απαντήσεων για το parent component
      const answers = {};
      this.questions.forEach(q => { answers[q.key] = q.answer; });
      this.$emit('submit-answers', answers);
    },
    formatTag(tag) {
      const map = {
        demography: 'Δημογραφικά',
        income: 'Εισόδημα',
        household: 'Οικογενειακή Κατάσταση',
        assets: 'Ακίνητα / Περιουσιακά Στοιχεία',
        vulnerable: 'Ευάλωτες Ομάδες',
        residence: 'Κατοικία'
      };
      return map[tag] || tag;
    },
    goToQuestion(index) {
      this.$emit('clear-results');
      this.currentQuestionIndex = index;
      this.currentOption = this.questions[index]?.answer || null;
    }
  }
};
</script>

<style scoped>

.page {
  display:flex;
  flex-direction: column;
  min-height: 100vh;
}

.govgr-main-wrapper{
  display: block;
}


.govgr-summary-list {
 
  margin-bottom:0;
}

main {
  flex: 1;
}

</style>
