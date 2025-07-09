<template>
  <BenefitPageLayout :title="title">
    <template #form>
      <div class="govgr-layout-wrapper govgr-mt-6">
        <main>
          <div v-if="!isFormSummary">
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
import { calcKEABenefit, calcKOTBenefit } from '@/utils/calcBenefits.js';
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
      questions: questionOrder.map(key => allQuestions.find(q => q.key === key)),
      currentQuestionIndex: 0,
      currentOption: null,
      results: null,
      summaryResults: [],
      allResults: null,
      questionsInfo
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
    goToQuestion(index) {
      this.allResults = null;
      this.currentQuestionIndex = index;
      this.currentOption = this.questions[index]?.answer || null;
    },
    submitAnswers() {
      if (this.currentQuestion) {
        this.currentQuestion.answer = this.currentOption;
      }
      const answers = {};
      this.questions.forEach(q => { answers[q.key] = q.answer; });

      this.keaResults = this.calculateKEABenefits(answers);
      const aCatEligible = this.keaResults.eligible;
      this.kotResults = this.calculateKOTBenefits(answers, aCatEligible);
      const benefits = [this.keaResults, this.kotResults];
      console.log(this.keaResults)
      this.allResults = benefits.map(benefit => ({
        title: benefit.title,
        eligible: benefit.eligible,
        allowanceAmount: benefit.allowanceAmount || 0,
        reasons: benefit.reasons || [],
        message: benefit.message || '',
      }));
    },
    calculateKEABenefits(answers) {
      const residesInGreece = answers['residesInGreece'] === "Ναι";
      const adults = parseInt(answers['adults']);
      const dependentChildren = parseInt(answers['dependentChildren']) || 0;
      const unsupportedChildren = parseInt(answers['unsupportedChildren']) || 0;
      const isSingleParent = answers['isSingleParent'] === "Ναι";
      const income = parseFloat(answers['income6m']);
      const propertyValue = parseFloat(answers['propertyValue']);
      const vehicleValue = parseFloat(answers['vehicleValue']);
      const savings = parseFloat(answers['savings']);
      const luxuryBelonging = answers['luxuryBelonging'] === "Όχι, δεν διαθέτω κάποιο από τα παρακάτω";
      return calcKEABenefit(
        residesInGreece,
        adults,
        dependentChildren,
        unsupportedChildren,
        isSingleParent,
        income,
        propertyValue,
        vehicleValue,
        savings,
        luxuryBelonging
      );
    },
    calculateKOTBenefits(answers, aCatEligible) {
      const residesInGreece = answers['residesInGreece'] === "Ναι";
      const adults = parseInt(answers['adults']);
      const dependentChildren = parseInt(answers['dependentChildren']) || 0;
      const unsupportedChildren = parseInt(answers['unsupportedChildren']) || 0;
      const disabledPerson = answers['vulnerableCategory'] === "Αναπηρία 67% και άνω";
      const lifesupportedPerson = answers['vulnerableCategory'] === "Χρειάζονται μηχανική υποστήριξη κατ' οίκον με ιατρικές συσκευές";
      const income = parseFloat(answers['income']);
      const propertyValue = parseFloat(answers['propertyValue']);
      const luxuryBelonging = answers['luxuryBelonging'] === "Όχι, δεν διαθέτω κάποιο από τα παρακάτω";
      return calcKOTBenefit(
        residesInGreece,
        adults,
        dependentChildren,
        unsupportedChildren,
        disabledPerson,
        lifesupportedPerson,
        income,
        propertyValue,
        luxuryBelonging,
        aCatEligible
      );
    }
  }
};
</script>

<style scoped>
section {
  text-align:left;
}
</style>