<template>
  <BenefitPageLayout :title="title">
    <template #form>
      <div class="govgr-layout-wrapper govgr-mt-6">
        <main>
          <div v-if="!isFormSummary" class="question-layout">
            <!-- Φόρμα ερωτήσεων -->
            <div class="question-column-left">
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
              </QuestionForm>
            </div>

            <!-- Note (βοήθεια) -->
            <div class="question-column-right">
              <div class="note-box">
                <p v-if="currentQuestion?.note" v-html="currentQuestion.note" />
              </div>
            </div>
          </div>

          <div v-if="isFormSummary">
            <SummaryTable
              :questions="answeredQuestions.map(q => q.question)"
              :answers="answeredQuestions.map(q => q.answer)"
              @edit="goToQuestion"
            />
            <button class="govgr-btn govgr-btn-primary govgr-mt-6" @click="submitAnswers">
              Δείτε Αποτελέσματα
            </button>
            <div v-if="results" class="govgr-mt-9">
              <ResultsForm :results="summaryResults" class="govgr-mb-9" />
              <ResultsAccordion
                :items="summaryResults.map(r => ({
                  title: r.title,
                  content: r.eligible ? r.message : r.reasons,
                  eligible: r.eligible
                }))"
              />
            </div>
          </div>
        </main>
      </div>
    </template>
    <template #faq>
      <section data-section="q-and-a">
        <h2 class="govgr-heading-l">Συχνές Ερωτήσεις</h2>
        <ExpandableFAQ
          v-for="(question, index) in questionsInfo"
          :key="index"
          :question="question.prompt"
          :answer="question.answer"
        />
      </section>
    </template>
  </BenefitPageLayout>
</template>

<script>
import BenefitPageLayout from '@/components/Elements/Layouts/BenefitPageLayout.vue';
import QuestionForm from '@/components/Elements/QuestionForm.vue';
import InputElement from '@/components/Elements/InputElement.vue';
import SummaryTable from '@/components/Elements/SummaryTable.vue';
import ResultsForm from '@/components/Elements/ResultsForm.vue';
import ResultsAccordion from '@/components/Elements/ResultsAccordion.vue';
import ExpandableFAQ from '@/components/Elements/ExpandableFAQ.vue';
import allQuestions from '@/questions/housingBenefitQs.js';
import { evaluateAll } from '@/engine/evaluateAll.js';
import { calcHousingBenefitAllowance } from '@/utils/calculates.js';
import { questionsInfo } from '@/info/questionsInfo.js';

export default {
  name: 'HousingBenefit',
  components: {
    BenefitPageLayout,
    QuestionForm,
    InputElement,
    SummaryTable,
    ResultsForm,
    ResultsAccordion,
    ExpandableFAQ
  },
  data() {
    const questionOrder = [
      'submittedTaxDeclaration',
      'residesInGreece',
      'income',
      'activeRent',
      'rent',
      'isSingleParent',
      'dependentChildren',
      'unsupportedChildren',
      'hostedPersons',
      'propertyValue',
      'savings',
      'luxuryBelonging'
    ];
    return {
      title: 'Προσομοίωση Αξιολόγησης Επιδόματος Στέγασης',
      questions: questionOrder.map(key => allQuestions.find(q => q.key === key)),
      currentQuestionIndex: 0,
      currentOption: null,
      results: null,
      summaryResults: [],
      questionsInfo: questionsInfo.filter(q => q.tag === "housingBenefit").map(q => q)
    };
  },
  computed: {
    currentQuestion() {
      return this.questions[this.currentQuestionIndex];
    },
    answeredQuestions() {
      return this.questions.filter(q => q.answer !== null && q.answer !== undefined);
    },
    isLastQuestion() {
      return this.currentQuestionIndex === this.questions.length;
    },
    isFirstQuestion() {
      return this.currentQuestionIndex === 0;
    },
    answer() {
      return this.questions[this.currentQuestionIndex].answer;
    },
    isFormSummary() {
      return this.currentQuestionIndex === this.questions.length;
    },
    isQuestionReq() {
      return this.currentQuestion?.required ?? false;
    },
    currentTag() {
      return this.questions[this.currentQuestionIndex]?.tag;
    },
    facts() {
      const facts = {};
      this.questions.forEach(q => {
        if (q.answer !== null) facts[q.key] = q.answer;
      });
      return facts;
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
      const result = evaluateAll(this.questions, this.facts, "housingBenefit");
      
      if (!result.eligible && result.reasons.length > 0) {
        this.results = {
          title: "Επίδομα Στέγασης",
          eligible: false,
          reasons: result.reasons,
          allowanceAmount: 0,
          message: "Δεν είστε δικαιούχος για το Επίδομα Στέγασης",
        };
        this.summaryResults = [this.results];
        this.currentQuestionIndex = this.questions.length;
        return;
      }
      this.currentQuestionIndex++;
      this.currentOption = this.questions[this.currentQuestionIndex]?.answer || null;
    },
    goBack() {
      if (this.currentQuestionIndex === this.questions.length) {
        this.results = null;
      }
      this.currentQuestionIndex--;
      this.currentOption = this.questions[this.currentQuestionIndex]?.answer || null;
      this.clearAnswersFrom(this.currentQuestionIndex);
    },
    submitAnswers() {
      if (this.currentQuestion) {
        this.currentQuestion.answer = this.currentOption;
      }
      const result = evaluateAll(this.questions, this.facts, "housingBenefit");
      this.results = calcHousingBenefitAllowance(this.facts, result.eligible, result.reasons);
      this.summaryResults = [this.results];
    },
    goToQuestion(index) {
      this.results = null;
      this.currentQuestionIndex = index;
      this.currentOption = this.questions[index]?.answer || null;
      this.clearAnswersFrom(this.currentQuestionIndex);
    },
    clearAnswersFrom(index) {
      for (let i = index + 1; i < this.questions.length; i++) {
        this.questions[i].answer = null;
      }
    },
  },
  beforeRouteLeave(to, from, next) {
    this.questions.forEach(q => { q.answer = null; });
    this.currentQuestionIndex = 0;
    this.currentOption = null;
    this.results = null;
    this.summaryResults = [];
    next();
  }
};
</script>

<style scoped>
section {
  text-align:left;
}

.question-layout {
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;
}

.question-column-left {
  width: 66.66%;
}

.question-column-right {
  width: 33.33%;
  /* border-left: 1px solid #ccc; */
  padding: 1.5rem;
}

.note-box {
  font-size: 0.95rem;
  line-height: 1.5;
  margin-top: 2rem;
}
</style>