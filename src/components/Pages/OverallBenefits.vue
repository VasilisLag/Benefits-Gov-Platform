<template>
  <BenefitPageLayout :title="title">
    <template #form>
      <div class="govgr-layout-wrapper govgr-mt-6">
        <main>
          <div v-if="!isFormSummary" class="question-layout">
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
              :questionKeys="answeredQuestions.map(q => q.key)"
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
import allQuestions from '@/questions/overallBenefitsQs.js';
import { questionsInfo } from '@/info/questionsInfo.js';
import { evaluateAll } from '@/engine/evaluateAll.js';
import {
  calcChildrenBenefitAllowance,
  calcHeatingBenefitAllowance,
  calcKEABenefitAllowance,
  calcKOTBenefitAllowance,
  calcHousingBenefitAllowance
} from '@/utils/calculates.js';

export default {
  name: 'OverallBenefits',
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
      'income6m',
      'isBusinessOwner',
      'businessIncome',
      'maritalStatus',
      'dependentChildren',
      'unsupportedChildren',
      'hostedPersons',
      'area',
      'heatingSource',
      'activeRent',
      'rent',
      'propertyValue',
      'savings',
      'vehicleValue',
      'luxuryBelonging',
      'vulnerableCategory',
    ];
    return {
      title: 'Συνολική Προσομοίωση',
      allQuestions: questionOrder.map(key => allQuestions.find(q => q.key === key)),
      currentQuestionIndex: 0,
      currentOption: null,
      results: null,
      allResults: null,
      questionsInfo:  questionsInfo.filter(q => q.tag === "all").map(q => q),
      benefits: [
        {
          key: 'childrenBenefit',
          title: 'Επίδομα Παιδιού',
          evaluate: (questions, facts) => evaluateAll(questions, facts, 'childrenBenefit'),
          calculate: calcChildrenBenefitAllowance
        },
        {
          key: 'housingBenefit',
          title: 'Επίδομα Στέγασης',
          evaluate: (questions, facts) => evaluateAll(questions, facts, 'housingBenefit'),
          calculate: calcHousingBenefitAllowance
        },
        {
          key: 'heatingBenefit',
          title: 'Επίδομα Θέρμανσης',
          evaluate: (questions, facts) => evaluateAll(questions, facts, 'heatingBenefit'),
          calculate: calcHeatingBenefitAllowance
        },
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
      ],
      benefitEligibility: {},
      filteredQuestions: [],
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
      const excluded = Object.entries(this.benefitEligibility)
        .filter(([, eligible]) => eligible === false)
        .map(([benefit]) => benefit);

      console.log('Benefit eligibility:', this.benefitEligibility);

      const answered = this.allQuestions.slice(0, this.currentQuestionIndex);
      const remaining = this.allQuestions.slice(this.currentQuestionIndex).filter(q => {
        // Υποστήριξη showIf: αν υπάρχει, να εμφανίζεται μόνο αν ικανοποιείται η συνθήκη
        if (q.showIf) {
          const { key, value } = q.showIf;
          if (this.facts[key] !== value) return false;
        }
        const tags = q.benefitTags;
        if (!tags || tags.length === 0) return true;

        if (tags.every(tag => excluded.includes(tag))) return false;
        return true;
      });

      console.log('Answered questions:', answered.map(q => q.key));
      console.log('Upcoming questions:', remaining.map(q => q.key));

      this.allQuestions.forEach(q => {
        const tags = q.benefitTags;
        if (
          tags &&
          tags.length > 0 &&
          tags.every(tag => excluded.includes(tag)) &&
          q.answer === undefined
        ) {
          q.answer = null;
        }
      });

      this.filteredQuestions = [...answered, ...remaining];

      if (remaining.length === 0) {
        this.currentQuestionIndex = this.filteredQuestions.length;
      }
    },
    nextQuestion() {
      if (this.currentQuestion) {
        this.currentQuestion.answer = this.currentOption;
      }
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

      // Αν κανένα επίδομα δεν είναι eligible, δείξε τα αποτελέσματα και σταμάτα τη φόρμα
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

      // Προχώρα στο επόμενο index και κάνε skip τα excluded ή όσα κρύβονται από showIf
      do {
        this.currentQuestionIndex++;
        const q = this.allQuestions[this.currentQuestionIndex];
        const excluded = Object.entries(this.benefitEligibility)
          .filter(([, eligible]) => eligible === false)
          .map(([benefit]) => benefit);
        if (!q) break;
        // skip αν υπάρχει showIf και δεν ικανοποιείται
        if (q.showIf) {
          const { key, value } = q.showIf;
          if (this.facts[key] !== value) {
            q.answer = null;
            continue;
          }
        }
        const tags = q.benefitTags;
        // Αν δεν έχει benefitTags (γενική ερώτηση), σταμάτα εδώ
        if (!tags || tags.length === 0) break;
        // Αν ΟΛΑ τα benefitTags είναι στα excluded, skip (δώσε null και συνέχισε)
        if (tags.every(tag => excluded.includes(tag))) {
          q.answer = null;
          continue;
        }
        // Αν τουλάχιστον ένα benefitTag δεν είναι excluded και δεν έχει showIf που να το κρύβει, σταμάτα εδώ
        break;
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
      // Find previous answered question (visible)
      let prevIndex = -1;
      for (let i = this.currentQuestionIndex - 1; i >= 0; i--) {
        if (this.questions[i].answer !== null && this.questions[i].answer !== undefined) {
          prevIndex = i;
          break;
        }
      }
      if (prevIndex >= 0) {
        this.currentQuestionIndex = prevIndex;
        this.currentOption = this.questions[this.currentQuestionIndex]?.answer || null;
        this.clearAnswersFrom(this.currentQuestionIndex);
      }
    },
    goToQuestion(index) {
      // Accept either a key (string) or index (number)
      console.log(index)
      let idx = typeof index === 'string'
        ? this.questions.findIndex(q => q.key === index)
        : index;
      this.allResults = null;
      this.currentQuestionIndex = idx;
      this.currentOption = this.questions[idx]?.answer || null;
      this.clearAnswersFrom(this.currentQuestionIndex);
    },
    clearAnswersFrom(index) {
      for (let i = index + 1; i < this.questions.length; i++) {
        this.questions[i].answer = null;
      }
    },
    submitAnswers() {
      if (this.currentQuestion) {
        this.currentQuestion.answer = this.currentOption;
      }
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
    beforeRouteLeave(to, from, next) {
      this.allQuestions.forEach(q => { q.answer = null; });
      this.currentQuestionIndex = 0;
      this.currentOption = null;
      this.results = null;
      this.allResults = [];
      this.benefitEligibility = {};
      next();
    }
  },
  created() {
    // Αρχικό filtering (όλα τα επιδόματα ενεργά)
    this.filteredQuestions = [...this.allQuestions];
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