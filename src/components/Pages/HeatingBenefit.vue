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
                :note="currentQuestion.note"
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
                  eligible: r.eligible,
                  link: r.link
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
import allQuestions from '@/questions/heatingBenefitQs.js';
import { evaluateAll } from '@/engine/evaluateAll.js';
import { calcHeatingBenefitAllowance } from '@/utils/calculates.js';
import { questionsInfo } from '@/info/questionsInfo.js';

export default {
  name: 'HeatingBenefit',
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
      function questionsInitialize() {
        const tagOrder = [
          'profile',
          'family',
          'income',
          'housing',
          'assets',
          'special-needs'
        ];

        const grouped = {};
        tagOrder.forEach(tag => { grouped[tag] = []; });
        allQuestions.forEach(q => {
          if (tagOrder.includes(q.tag)) {
            grouped[q.tag].push(q);
          }
        });

        tagOrder.forEach(tag => {
          grouped[tag].sort((a, b) => {
            const aKnockout = a.eligibility ? Object.keys(a.eligibility).length : 0;
            const bKnockout = b.eligibility ? Object.keys(b.eligibility).length : 0;
            return bKnockout - aKnockout;
          });
        });

        let ordered = [];
        tagOrder.forEach(tag => {
          grouped[tag].forEach(q => {
            ordered.push(q);
          });
        });

        // Μαζική τοποθέτηση όλων των children (με showIf) ακριβώς μετά το parent, ανεξάρτητα από tag/grouping
        let parents = ordered.filter(q => ordered.some(child => child.showIf && child.showIf.key === q.key));
        parents.forEach(parent => {
          const children = ordered
            .map((item, idx) => ({ item, idx }))
            .filter(({ item }) => item.showIf && item.showIf.key === parent.key)
            .sort((a, b) => a.idx - b.idx)
            .map(({ item }) => item);
          if (children.length > 0) {
            children.forEach(child => {
              const idx = ordered.indexOf(child);
              if (idx !== -1) ordered.splice(idx, 1);
            });
            const parentIdx = ordered.indexOf(parent);
            ordered.splice(parentIdx + 1, 0, ...children);
          }
        });

        return ordered;
      }

      return {
        title: 'Αξιολόγηση Επιλεξιμότητας Επίδομα Θέρμανσης',
        allQuestions: questionsInitialize(),
        currentQuestionIndex: 0,
        currentOption: null,
        results: null,
        summaryResults: [],
        questionsInfo: questionsInfo.filter(q => q.tag === "heatingBenefit").map(q => q)
      };
    },
  computed: {
    questions() {
      // Δυναμικό filter με βάση showIf
      const facts = {};
      this.allQuestions.forEach(q => {
        if (q.answer !== undefined && q.answer !== null) facts[q.key] = q.answer;
      });
      return this.allQuestions.filter(q => {
        if (!q.showIf) return true;
        const { key, value } = q.showIf;
        return facts[key] === value;
      });
    },
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
      return this.questions[this.currentQuestionIndex]?.answer;
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
      this.allQuestions.forEach(q => {
        if (q.answer !== undefined && q.answer !== null) facts[q.key] = q.answer;
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
      const result = evaluateAll(this.questions, this.facts, "heatingBenefit");
      if (!result.eligible && result.reasons.length > 0) {
        this.results = {
          title: "Επίδομα Θέρμανσης",
          eligible: false,
          reasons: result.reasons,
          allowanceAmount: 0,
          message: "Δεν είστε δικαιούχος.",
          link: result.link
        };
        this.summaryResults = [this.results];
        this.currentQuestionIndex = this.questions.length;
        return;
      }
      this.currentQuestionIndex++;
      this.currentOption = this.questions[this.currentQuestionIndex]?.answer ?? null;
    },
    goBack() {
      if (this.currentQuestionIndex === this.questions.length) {
        this.results = null;
      }
      this.currentQuestionIndex--;
      this.currentOption = this.questions[this.currentQuestionIndex]?.answer ?? null;
      this.clearAnswersFrom(this.currentQuestionIndex);
    },
    submitAnswers() {
      if (this.currentQuestion) {
        this.currentQuestion.answer = this.currentOption;
      }
      const result = evaluateAll(this.questions, this.facts, "heatingBenefit");
      this.results = calcHeatingBenefitAllowance(this.facts, result.eligible, result.reasons);
      this.summaryResults = [this.results];
    },
    goToQuestion(index) {
      this.results = null;
      this.currentQuestionIndex = index;
      this.currentOption = this.questions[index]?.answer ?? null;
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
  },
  created() {
    // Αρχικό filtering (όλες οι ερωτήσεις ενεργές)
    console.log('Questions Order:', this.allQuestions.map(q => q.key));
  },
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
