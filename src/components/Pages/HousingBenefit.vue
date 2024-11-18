<template>
  <div class="page">
    <HeaderElement />
    <NavElement />
    <main class="p-4">
      <div class="form-container">
        <QuestionForm 
          title="Επίδομα Στέγασης"
          :isLastQuestion="isLastQuestion"
          :isFirstQuestion="isFirstQuestion"
          :selectedOption="currentOption"
          :isQuestionRequired="isQuestionReq"
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
          <SummaryTable v-if="isFormSummary"
            :questions="questions.map(q => q.question)"
            :answers="answers"
          />

        </QuestionForm>
        <ResultsForm 
          v-if="results && isFormSummary"
          :eligible="results.eligible"
          :benefitAmount="results.benefitAmount"
          :message="results.message"
          :reasons="results.reasons"
        />
      </div>
    </main>
    <FooterElement class="footer" />
  </div>
</template>

<script>
import HeaderElement from '@/components/Elements/Page Elements/HeaderElement.vue';
import NavElement from '@/components/Elements/Page Elements/NavElement.vue';
import FooterElement from '@/components/Elements/Page Elements/FooterElement.vue';
import InputElement from '@/components/Elements/InputElement.vue';
import QuestionForm from '@/components/Elements/QuestionForm.vue';
import questions from '@/questions/housingBenefitQs.js';
import SummaryTable from '@/components/Elements/SummaryTable.vue';
import ResultsForm from '@/components/Elements/ResultsForm.vue';

export default {
  name: 'HousingBenefit',
  components: {
    HeaderElement,
    NavElement,
    InputElement,
    QuestionForm,
    FooterElement,
    SummaryTable,
    ResultsForm
  },
  data() {
    return {
      currentQuestionIndex: 0,
      questions: questions,
      currentOption: null,
      answers: [], 
      results: null
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
      return this.answers[this.currentQuestionIndex];
    },
    isFormSummary() {
      return this.currentQuestionIndex === this.questions.length;
    },
    isQuestionReq() {
      if (this.currentQuestion != null){
        return this.currentQuestion.required
      }else {
        return false;
      }
    },
    isResultsVisible() {
      return this.results;
    }
  },
  methods: {
    handleAnswerChange(selectedOption) {
      this.currentOption = selectedOption;
    },
    nextQuestion() {
      this.answers[this.currentQuestionIndex++] = this.currentOption;
      this.currentOption = this.answers[this.currentQuestionIndex] || null;   
    },
    goBack() {
      if(this.currentQuestionIndex === this.questions.length){
        this.results = null;
      }
      this.currentOption = this.answers[--this.currentQuestionIndex] || null;
    },
    skipQuestion() {
      this.answers[this.currentQuestionIndex++] = null;
      this.currentOption = this.answers[this.currentQuestionIndex] || null;
    },
    submitAnswers() {
      this.results = this.calculateBenefits(this.answers);
    },
    calculateBenefits(answers) {
      // Προϋποθέσεις για επιλεξιμότητα
      const submittedTaxDeclaration = answers[0] === "Ναι";
      const yearsInGreece = parseInt(answers[1]) >= 5;
      const income = parseFloat(answers[2]);
      const activeRent = answers[3] === "Ναι";
      const rent = parseFloat(answers[4]);
      const isSingleParent = answers[5] === "Ναι";
      const dependentChildren = parseInt(answers[6]) || 0;
      const unprotectedChildren = parseInt(answers[7]) || 0;
      const hostedPersons = parseInt(answers[8]) || 0;
      const propertyValue = parseFloat(answers[9]);
      const savings = parseFloat(answers[10]);
      const luxuryBelonging = answers[11] === "Όχι, δεν διαθέτω κάποιο από τα παραπάνω";

      const incomeBase = 7000;
      const allowanceBase = 70;
      const allowanceThreshold = 210;

      let propertyThreshold = Math.min(120000 + 15000 * (dependentChildren + unprotectedChildren + hostedPersons), 180000);
      let allowanceAmount;
      let incomeThreshold = this.calculateThreshold(incomeBase, dependentChildren, unprotectedChildren, hostedPersons, isSingleParent);
      const savingsThreshold = incomeThreshold;
      let reasons = [];

      incomeThreshold = Math.max(incomeThreshold, 21000);

      if(!submittedTaxDeclaration) {
        reasons.push("Δεν έχετε υποβάλλει φορολογική δήλωση για το προηγούμενο έτος.")
      }
      if(!yearsInGreece) {
        reasons.push("Πρέπει να διαμένετε στην Ελλάδα κατά τα τελευταία, 5 τουλάχιστον, έτη.");
      }
      if(!activeRent) {
        reasons.push("Πρέπει να έχετε ενεργό μισθωτήριο στο όνομα σας.");
      }
      if(!luxuryBelonging) {
        reasons.push("Αποκλείεστε απο το επίδομα Στέγασης λόγω κατοχής πολυτελών αγαθών.");
      }
      if(income > incomeThreshold){
        console.log(incomeThreshold)
        reasons.push(`Το εισόδημά σας(${income}€) υπερβαίνει το όριο (${incomeThreshold}€).`);
      }
      if(savings > savingsThreshold) {
        console.log(savingsThreshold)
        reasons.push(`Οι καταθέσεις σας(${savings}€) υπερβαίνουν το όριο (${savingsThreshold}€)`);
      }
      if(propertyValue > propertyThreshold) {
        console.log(propertyThreshold)
        reasons.push(`Η αξία των ακινήτων σας(${propertyValue}€) υπερβαίνει το όριο (${propertyThreshold}€)`);
      }

      if (reasons.length > 0) {
        return {
          reasons,
          eligible: false,
          allowanceAmount: 0,
          message: "Δεν είστε δικαιούχος για το επίδομα θέρμανσης."
        };
      }
      else {
        allowanceAmount = this.calculateAllowance(allowanceBase, dependentChildren, unprotectedChildren, hostedPersons, isSingleParent);
        allowanceAmount = Math.min(Math.min(rent,allowanceAmount),allowanceThreshold);

        return {
          reasons,
          eligible: true,
          allowanceAmount: allowanceAmount,
          message: `Είστε επιλέξιμος/η για το επίδομα. Εκτιμώμενο ποσό επιδόματος: <b>${allowanceAmount}€</b> το μήνα.`,
        };
      } 
    },
    calculateThreshold(base, dependentChildren, unprotectedChildren, hostedPersons, singleParent = false) {
      const unsupported_increment = 7000;
      const regular_increment = 3500;
      let threshold = base;
      threshold += unprotectedChildren * unsupported_increment;
      if (singleParent && dependentChildren > 0) {
        threshold += unsupported_increment + (dependentChildren - 1 + hostedPersons) * regular_increment;
      } 
      else {
          threshold += (dependentChildren + hostedPersons) * regular_increment;
      }
      return threshold;
    },
    calculateAllowance(base, dependentChildren, unprotectedChildren, hostedPersons, singleParent = false) {
      const unsupported_increment = 70;
      const regular_increment = 35;
      let allowance = base;
      allowance += unprotectedChildren * unsupported_increment;
      if (singleParent && dependentChildren > 0) {
        allowance += unsupported_increment + (dependentChildren - 1 + hostedPersons) * regular_increment;
      }
      else {
        allowance += (dependentChildren + hostedPersons) * 35;
      }
      return allowance;
    }

  }
};
</script>

<style scoped>
.form-container {
  width: 80%;
  margin: 0 auto;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

main {
  flex:1;
}

.page {
  display:flex;
  flex-direction: column;
  min-height: 100vh;
}

.footer {
  align-self:end;
}
</style>