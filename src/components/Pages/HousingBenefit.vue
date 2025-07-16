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
              :questions="questions.map(q => q.question)"
              :answers="questions.map(q => q.answer)"
              @edit="goToQuestion"
            />
            <button class="govgr-btn govgr-btn-primary govgr-mt-6" @click="submitAnswers">
              Αξιολόγηση
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
import { calcHousingBenefit } from '@/utils/calcBenefits.js';
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
      'income',
      'activeRent',
      'rent',
      'isSingleParent',
      'dependentChildren',
      'unprotectedChildren',
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
        this.results = null;
      }
      this.currentQuestionIndex--;
      this.currentOption = this.questions[this.currentQuestionIndex]?.answer || null;
    },
    submitAnswers() {
      if (this.currentQuestion) {
        this.currentQuestion.answer = this.currentOption;
      }
      const answers = {};
      this.questions.forEach(q => { answers[q.key] = q.answer; });
      const submittedTaxDeclaration = answers['submittedTaxDeclaration'] === "Ναι";
      const income = parseFloat(answers['income']);
      const activeRent = answers['activeRent'] === "Ναι";
      const rent = parseFloat(answers['rent']);
      const isSingleParent = answers['isSingleParent'] === "Ναι";
      const dependentChildren = parseInt(answers['dependentChildren']) || 0;
      const unprotectedChildren = parseInt(answers['unprotectedChildren']) || 0;
      const hostedPersons = parseInt(answers['hostedPersons']) || 0;
      const propertyValue = parseFloat(answers['propertyValue']);
      const savings = parseFloat(answers['savings']);
      const luxuryBelonging = answers['luxuryBelonging'] === "Όχι, δεν διαθέτω κάποιο από τα παρακάτω";

      this.results = calcHousingBenefit(
        submittedTaxDeclaration,
        income,
        activeRent,
        rent,
        isSingleParent,
        dependentChildren,
        unprotectedChildren,
        hostedPersons,
        propertyValue,
        savings,
        luxuryBelonging
      );

      this.summaryResults = [
        {
          title: this.results.title,
          eligible: this.results.eligible,
          allowanceAmount: this.results.allowanceAmount || 0,
          reasons: this.results.reasons || [],
          message: this.results.message || '',
        }
      ];
    },
    goToQuestion(index) {
      this.results = null;
      this.currentQuestionIndex = index;
      this.currentOption = this.questions[index]?.answer || null;
    },
    beforeRouteLeave(to, from, next) {
      this.questions.forEach(q => { q.answer = null; });
      this.currentQuestionIndex = 0;
      this.currentOption = null;
      this.results = null;
      this.allResults = [];
      next();
    }
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
}
</style>