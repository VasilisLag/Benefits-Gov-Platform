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
            <div v-if="allResults" class="govgr-mt-9">
              <ResultsForm :results="allResults" class="govgr-mb-9" />
              <ResultsAccordion
                :items="allResults.map(r => ({
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
import allQuestions from '@/questions/vulnerableBenefitsQs.js';
import { calcKEABenefitAllowance, calcKOTBenefitAllowance } from '@/utils/calculates.js';
import { evaluateAll } from '@/engine/evaluateAll.js';
import { questionsInfo } from '@/info/questionsInfo.js';

export default {
  name: 'VulnerableBenefits',
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
      'adults',
      'dependentChildren',
      'unsupportedChildren',
      'isSingleParent',
      'vulnerableCategory',
      'income',
      'income6m',
      'propertyValue',
      'vehicleValue',
      'savings',
      'luxuryBelonging'
    ];
    return {
      title: 'Αξιολόγηση Επιλεξιμότητας Ε.Ε.Ε και Κ.Ο.Τ.',
      allQuestions: questionOrder.map(key => allQuestions.find(q => q.key === key)),
      filteredQuestions: [],
      currentQuestionIndex: 0,
      currentOption: null,
      results: null,
      summaryResults: [],
      allResults: null,
      benefitEligibility: {
        kea: null,
        kot: null
      },
      questionsInfo: questionsInfo.filter(q => q.tag === "vulnerableBenefit").map(q => q),
      benefits: [
        {
          key: 'kea',
          title: 'Ελάχιστο Εγγυημένο Εισόδημα',
          evaluate: (questions, facts) => evaluateAll(questions, facts, 'kea'),
          calculate: calcKEABenefitAllowance
        },
        {
          key: 'kot',
          title: 'Κοινωνικό Οικιακό Τιμολόγιο',
          evaluate: (questions, facts) => evaluateAll(questions, facts, 'kot'),
          calculate: calcKOTBenefitAllowance
        }
        // Προσθέτεις εδώ νέα επιδόματα π.χ. { key: 'housing', ... }
      ],
    };
  },
  computed: {
    questions() {
      return this.filteredQuestions;
    },
    answeredQuestions() {
      return this.questions.filter(q => q.answer !== null && q.answer !== undefined);
    },
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
    filterQuestions() {
      // Φιλτράρει μόνο τις ερωτήσεις που απομένουν να απαντηθούν (από το currentQuestionIndex και μετά)
      const excluded = Object.entries(this.benefitEligibility)
        .filter(([, eligible]) => eligible === false)
        .map(([benefit]) => benefit);
      console.log('Excluded Benefits:', excluded);
      // Κρατάμε τις ήδη απαντημένες ερωτήσεις όπως είναι
      const answered = this.allQuestions.slice(0, this.currentQuestionIndex);
      // Φιλτράρουμε μόνο τις επόμενες ερωτήσεις
      const remaining = this.allQuestions.slice(this.currentQuestionIndex).filter(q => {
        if (!q.benefitTags || q.benefitTags.length === 0) return true;
        return !q.benefitTags.every(tag => excluded.includes(tag));
      });

      this.allQuestions.forEach(q => {
        if (
          q.benefitTags &&
          q.benefitTags.length > 0 &&
          q.benefitTags.every(tag => excluded.includes(tag)) &&
          q.answer === undefined
        ) {
          q.answer = null;
        }
     });
      console.log('Remaining Questions:', remaining);
      this.filteredQuestions = [...answered, ...remaining];
      console.log('Filtered Questions:', this.filteredQuestions);

      if (remaining.length === 0) {
        this.currentQuestionIndex = this.filteredQuestions.length;
      }
    },
    nextQuestion() {
      if (this.currentQuestion) {
        this.currentQuestion.answer = this.currentOption;
      }

      // Υπολογισμός eligibility για όλα τα επιδόματα
      this.benefitEligibility = {};
      let resultsArr = [];
      let facts = this.facts;

      this.benefits.forEach(benefit => {
        const result = benefit.evaluate(this.questions, facts);
        this.benefitEligibility[benefit.key] = result.eligible;
        facts[`${benefit.key}Eligible`] = result.eligible;
        const calcResult = benefit.calculate(facts, result.eligible, result.reasons);
        resultsArr.push(calcResult);
      });

      // Αν κανένα επίδομα δεν είναι eligible, δείξε τα αποτελέσματα
      if (Object.values(this.benefitEligibility).every(e => !e)) {
        this.allResults = resultsArr.map(benefit => ({
          title: benefit.title,
          eligible: benefit.eligible,
          allowanceAmount: benefit.allowanceAmount || 0,
          reasons: benefit.reasons || [],
          message: benefit.message || '',
        }));
        this.currentQuestionIndex = this.questions.length;
        return;
      }

      // Προχώρα στο επόμενο index και κάνε skip τα excluded
      do {
        this.currentQuestionIndex++;
        const q = this.allQuestions[this.currentQuestionIndex];
        const excluded = Object.entries(this.benefitEligibility)
          .filter(([, eligible]) => eligible === false)
          .map(([benefit]) => benefit);
        if (
          !q ||
          !q.benefitTags ||
          q.benefitTags.length === 0 ||
          !q.benefitTags.every(tag => excluded.includes(tag))
        ) {
          break;
        }
        // Αν είναι excluded, δώσε τιμή null και συνέχισε
        q.answer = null;
      } while (this.currentQuestionIndex < this.allQuestions.length);

      this.filterQuestions();

      if (this.currentQuestionIndex > this.questions.length) {
        this.currentQuestionIndex = this.questions.length;
      }

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
    goToQuestion(index) {
      this.allResults = null;
      this.currentQuestionIndex = index;
      this.currentOption = this.questions[index]?.answer || null;
      this.clearAnswersFrom(this.currentQuestionIndex);
    },
    clearAnswersFrom(index) {
      for (let i = index + 1; i < this.questions.length; i++) {
        this.questions[i].answer = null;
      }
    },
    submitAnswers() {
      let facts = this.facts;
      this.benefitEligibility = {};
      let resultsArr = [];

      this.benefits.forEach(benefit => {
        const result = benefit.evaluate(this.questions, facts);
        this.benefitEligibility[benefit.key] = result.eligible;
        facts[`${benefit.key}Eligible`] = result.eligible;
        const calcResult = benefit.calculate(facts, result.eligible, result.reasons);
        resultsArr.push(calcResult);
      });

      this.allResults = resultsArr.map(benefit => ({
        title: benefit.title,
        eligible: benefit.eligible,
        allowanceAmount: benefit.allowanceAmount || 0,
        reasons: benefit.reasons || [],
        message: benefit.message || '',
      }));
    },
  },
  created() {
    // Αρχικό filtering (όλα τα επιδόματα ενεργά)
    this.filteredQuestions = [...this.allQuestions];
  },
  beforeRouteLeave(to, from, next) {
    this.allQuestions.forEach(q => { q.answer = null; });
    this.currentQuestionIndex = 0;
    this.currentOption = null;
    this.results = null;
    this.allResults = [];
    this.benefitEligibility = { kea: null, kot: null };
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
}
</style>