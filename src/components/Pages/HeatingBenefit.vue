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
import allQuestions from '@/questions/heatingBenefitQs.js';
import { calcHeatingBenefit } from '@/utils/calcBenefits.js';
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
    const questionOrder = [
      'submittedTaxDeclaration',
      'residesInGreece',
      'income',
      'isBusinessOwner',
      'businessIncome',
      'propertyValue',
      'maritalStatus',
      'dependentChildren',
      'area',
      'heatingSource'
    ];
    return {
      title: 'Προσομοίωση Αξιολόγησης Επιδόματος Θέρμανσης',
      questions: questionOrder.map(key => allQuestions.find(q => q.key === key)),
      currentQuestionIndex: 0,
      currentOption: null,
      results: null,
      summaryResults: [],
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
    submitAnswers() {
      if (this.currentQuestion) {
        this.currentQuestion.answer = this.currentOption;
      }
      const answers = {};
      this.questions.forEach(q => { answers[q.key] = q.answer; });
      const submittedTaxDeclaration = answers['submittedTaxDeclaration'] === 'Ναι';
      const residesInGreece =  answers['residesInGreece'] === 'Ναι';
      const income = parseFloat(answers['income']);
      const isBusinessOwner = answers['isBusinessOwner'] === 'Ναι';
      const businessIncome = isBusinessOwner ? parseFloat(answers['businessIncome']) : 0;
      const propertyValue = parseFloat(answers['propertyValue']);
      const isMarried = answers['maritalStatus'] === 'Έγγαμος/η - Σύμφωνο συμβίωσης';
      const isSingleParent = answers['maritalStatus'] === 'Μονογονέας';
      const dependentChildren = parseInt(answers['dependentChildren']);
      const area = answers['area'];
      const heatingSource = answers['heatingSource'];

      this.results = calcHeatingBenefit(
        submittedTaxDeclaration,
        residesInGreece,
        income,
        isBusinessOwner,
        businessIncome,
        propertyValue,
        isMarried,
        isSingleParent,
        dependentChildren,
        area,
        heatingSource
      )


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
</style>
