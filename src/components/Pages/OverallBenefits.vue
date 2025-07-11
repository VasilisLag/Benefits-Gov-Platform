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
import allQuestions from '@/questions/overallBenefitsQs.js';
import { questionsInfo } from '@/info/questionsInfo.js';
import {
  calcChildrenBenefit,
  calcHeatingBenefit,
  calcKEABenefit,
  calcKOTBenefit,
  calcHousingBenefit
} from '@/utils/calcBenefits.js';

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
      'unprotectedChildren',
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
      questions: questionOrder.map(key => allQuestions.find(q => q.key === key)),
      currentQuestionIndex: 0,
      currentOption: null,
      results: null,
      allResults: null,
      questionsInfo:  questionsInfo.filter(q => q.tag === "all").map(q => q)
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

      this.resChildren = this.calcChildren(answers);
      this.resHousing = this.calcHousing(answers);
      this.resHeating = this.calcHeating(answers);
      this.resKEA = this.calcKEA(answers);
      this.resKOT = this.calcKOT(answers, this.resKEA.eligible);
      const benefits = [
        this.resChildren,
        this.resHousing,
        this.resHeating,
        this.resKEA,
        this.resKOT
      ];
      console.log(benefits)
      this.allResults = benefits.map(benefit => ({
        title: benefit.title,
        eligible: benefit.eligible,
        allowanceAmount: benefit.allowanceAmount || 0,
        reasons: benefit.reasons || [],
        message: benefit.message || '',
      }));
      console.log(this.allResults)
    },
    calcChildren(ans) {
      // calcChildrenBenefit(submittedTaxDeclaration, income, dependentChildren, residesInGreece, isSingleParent)
      return calcChildrenBenefit(
        ans['submittedTaxDeclaration'] === "Ναι",
        parseFloat(ans['income']),
        parseInt(ans['dependentChildren']) || 0,
        ans['residesInGreece'] === "Ναι",
        ans['maritalStatus'] === "Μονογονέας"
      );
    },
    calcHousing(ans) {
      // calcHousingBenefit(submittedTaxDeclaration, income, activeRent, rent, isSingleParent, dependentChildren, unprotectedChildren, hostedPersons, propertyValue, savings, luxuryBelonging)
      return calcHousingBenefit(
        ans['submittedTaxDeclaration'] === "Ναι",
        parseFloat(ans['income']),
        ans['activeRent'] === "Ναι",
        parseFloat(ans['rent']),
        ans['maritalStatus'] === "Μονογονέας",
        parseInt(ans['dependentChildren']) || 0,
        parseInt(ans['unprotectedChildren']) || 0,
        parseInt(ans['hostedPersons']) || 0,
        parseFloat(ans['propertyValue']),
        parseFloat(ans['savings']),
        ans['luxuryBelonging'] === "Όχι, δεν διαθέτω κάποιο από τα παρακάτω"
      );
    },
    calcHeating(ans) {
      // calcHeatingBenefit(submittedTaxDeclaration, residesInGreece, income, isBusinessOwner, businessIncome, propertyValue, isMarried, isSingleParent, dependentChildren, area, heatingSource)
      return calcHeatingBenefit(
        ans['submittedTaxDeclaration'] === "Ναι",
        ans['residesInGreece'] === "Ναι",
        parseFloat(ans['income']),
        ans['isBusinessOwner'] === "Ναι",
        parseFloat(ans['businessIncome']),
        parseFloat(ans['propertyValue']),
        ans['maritalStatus'] === "Έγγαμος/η - Σύμφωνο συμβίωσης",
        ans['maritalStatus'] === "Μονογονέας",
        parseInt(ans['dependentChildren']) || 0,
        ans['area'],
        ans['heatingSource']
      );
    },
    calcKEA(ans) {
      // calcKEABenefit(residesInGreece, adults, dependentChildren, unsupportedChildren, isSingleParent, income, propertyValue, vehicleValue, savings, luxuryBelonging)
      return calcKEABenefit(
        ans['residesInGreece'] === "Ναι",
        (parseInt(ans['hostedPersons']) ? parseInt(ans['hostedPersons']) + 1 : 1),
        parseInt(ans['dependentChildren']) || 0,
        parseInt(ans['unsupportedChildren']) || 0,
        ans['maritalStatus'] === "Μονογονέας",
        parseFloat(ans['income6m']),
        parseFloat(ans['propertyValue']),
        parseFloat(ans['vehicleValue']),
        parseFloat(ans['savings']),
        ans['luxuryBelonging'] === "Όχι, δεν διαθέτω κάποιο από τα παρακάτω"
      );
    },
    calcKOT(ans, keaEligible) {
      // calcKOTBenefit(residesInGreece, adults, dependentChildren, unsupportedChildren, disabledPerson, lifesupportedPerson, income, propertyValue, luxuryBelonging, keaEligible)
      return calcKOTBenefit(
        ans['residesInGreece'] === "Ναι",
        (parseInt(ans['hostedPersons']) ? parseInt(ans['hostedPersons']) + 1 : 1),
        parseInt(ans['dependentChildren']),
        parseInt(ans['unsupportedChildren']),
        ans['vulnerableCategory'] === "Αναπηρία 67% και άνω",
        ans['vulnerableCategory'] === "Χρειάζονται μηχανική υποστήριξη κατ' οίκον με ιατρικές συσκευές",
        parseFloat(ans['income']),
        parseFloat(ans['propertyValue']),
        ans['luxuryBelonging'] === "Όχι, δεν διαθέτω κάποιο από τα παρακάτω",
        keaEligible
      );
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