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
      title: 'Προσομοίωση Αξιολόγησης Ε.Ε.Ε και Κ.Ο.Τ.',
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
      questionsInfo: questionsInfo.filter(q => q.tag === "vulnerableBenefit").map(q => q)
    };
  },
  computed: {
    questions() {
      // Επιστρέφει το δυναμικά φιλτραρισμένο array
      return this.filteredQuestions;
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
      // Επιστρέφει μόνο ερωτήσεις που αφορούν επιδόματα που δεν έχουν αποκλειστεί
      const excluded = Object.entries(this.benefitEligibility)
        .filter(([, eligible]) => eligible === false)
        .map(([benefit]) => benefit);
      this.filteredQuestions = this.allQuestions.filter(q => {
        if (!q.benefitTags || q.benefitTags.length === 0) return true;
        // Αν όλες οι benefitTags της ερώτησης είναι αποκλεισμένες, κρύβεται
        return !q.benefitTags.every(tag => excluded.includes(tag));
      });
    },
    nextQuestion() {
      if (this.currentQuestion) {
        this.currentQuestion.answer = this.currentOption;
      }

      const keaResult = evaluateAll(this.questions, this.facts, 'kea');
      const kotResult = evaluateAll(this.questions, this.facts, 'kot');
      // console.log(keaResult)
      // console.log(kotResult)
      // console.log(this.facts)

      this.benefitEligibility.kea = keaResult.eligible;
      this.benefitEligibility.kot = kotResult.eligible;

      if (!keaResult.eligible && !kotResult.eligible) {
        this.keaResults = calcKEABenefitAllowance(this.facts, keaResult.eligible, keaResult.reasons);
        this.facts.keaEligible = this.keaResults.eligible;
        this.kotResults = calcKOTBenefitAllowance(this.facts, kotResult.eligible, kotResult.reasons);

        const benefits = [this.keaResults, this.kotResults];
        this.allResults = benefits.map(benefit => ({
          title: benefit.title,
          eligible: benefit.eligible,
          allowanceAmount: benefit.allowanceAmount || 0,
          reasons: benefit.reasons || [],
          message: benefit.message || '',
        }));
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
    },
    goToQuestion(index) {
      this.allResults = null;
      this.currentQuestionIndex = index;
      this.currentOption = this.questions[index]?.answer || null;
    },
    submitAnswers() {
      if (this.currentQuestion) {
        this.currentQuestion.answer = this.currentOption;
      }

      // Rule engine για KEA
      const keaResult = evaluateAll(this.questions, this.facts, 'kea');
      this.keaResults = calcKEABenefitAllowance(this.facts, keaResult.eligible, keaResult.reasons);
      this.benefitEligibility.kea = keaResult.eligible;
      console.log("KEA Result", keaResult)
      console.log("KEA Results", this.keaResults)
      // Rule engine για KOT
      const kotResult = evaluateAll(this.questions, this.facts, 'kot');
      // Pass KEA eligibility as facts.keaEligible for KOT allowance
      this.facts.keaEligible = this.keaResults.eligible;
      this.kotResults = calcKOTBenefitAllowance(this.facts, kotResult.eligible, kotResult.reasons);
      this.benefitEligibility.kot = kotResult.eligible;
            console.log("KOT Result", kotResult)
      console.log("KOT Results", this.kotResults)


      const benefits = [this.keaResults, this.kotResults];
      this.allResults = benefits.map(benefit => ({
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
    this.filteredQuestions.forEach(q => { q.answer = null; });
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