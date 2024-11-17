<template>
  <div class="page">
    <HeaderElement />
    <NavElement />
    <main class="p-4">
      <div class="form-container">
        <QuestionForm 
          title="Επίδομα Θέρμανσης"
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
import questions from '@/questions/heatingBenefitQs.js';
import SummaryTable from '@/components/Elements/SummaryTable.vue';
import ResultsForm from '@/components/Elements/ResultsForm.vue';
import {getCoefficient} from '@/utils/calcCoefficient.js';

export default {
  name: 'ChildrenBenefit',
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
      const area = answers[2];
      const heatingSource = answers[3];
      const income = parseFloat(answers[4]);
      const isMarried = answers[5] === "Έγγαμος/η - Σύμφωνο συμβίωσης";
      const isSingleParent = answers[5] === "Μονογονέας";
      const dependentChildren = parseInt(answers[6]);
      const propertyValue = parseFloat(answers[7]);
      const isBusinessOwner = answers[8] === "Ναι";
      const businessIncome = isBusinessOwner ? parseFloat(answers[9]) : 0;
      console.log(area);
      const coefficient = getCoefficient(area);
      console.log(coefficient)
      console.log(answers);

      let baseAmount = null;      
      let reasons = [];

      // Έλεγχοι για επιλεξιμότητα
      if (!submittedTaxDeclaration) {
        reasons.push("Δεν έχετε υποβάλει φορολογική δήλωση για το προηγούμενο έτος.");
      }
      if (!yearsInGreece) {
        reasons.push("Πρέπει να διαμένετε στην Ελλάδα κατά τα τελευταία, 5 τουλάχιστον, έτη.");
      }

      // Έλεγχος εισοδηματικών κριτηρίων
      let incomeThreshold = 16000;
      if (isSingleParent) {
        incomeThreshold = 29000;
      } else if (isMarried) {
        incomeThreshold = 24000;
      }
      incomeThreshold += 5000 * dependentChildren;

      if (income > incomeThreshold) {
        reasons.push("Το εισόδημά σας υπερβαίνει τα επιτρεπόμενα όρια για το επίδομα θέρμανσης.");
      }

      // Έλεγχος περιουσιακών κριτηρίων
      let propertyThreshold = isMarried || isSingleParent ? 260000 : 200000;
      if (propertyValue > propertyThreshold) {
        reasons.push("Η αξία της ακίνητης περιουσίας σας υπερβαίνει τα όρια για το επίδομα.");
      }

      // Έλεγχος εισοδήματος από επιχειρηματική δραστηριότητα
      if (isBusinessOwner && businessIncome > 80000) {
        reasons.push("Τα έσοδα από επιχειρηματική δραστηριότητα υπερβαίνουν το επιτρεπόμενο όριο.");
      }

      // Έλεγχος αν υπάρχει κάποιος λόγος αποκλεισμού
      if (reasons.length > 0) {
        return {
          reasons,
          eligible: false,
          allowanceAmount: 0,
          message: "Δεν είστε δικαιούχος για το επίδομα θέρμανσης."
        };
      }

      switch(heatingSource) {
        case "Ηλεκτρικό Ρεύμα":
          baseAmount = 380;
          break;
        case "Φυσικό Αέριο":
          baseAmount = 325;
          break;
        case "Πετρέλαιο/Φωτιστικό Πετρέλαιο/Υγραέριο":
          baseAmount = 300;
          break;
        case "Βιομάζα (Πέλετ)":
          baseAmount = 360;
          break;
        case "Τηλεθέρμανση/Καυσόξυλα":
          baseAmount = 350;
          break;
      }

      
      // Βασικό ποσό επιδόματος βάσει περιοχής
      let allowanceAmount = baseAmount * coefficient;

      // Προσαύξηση για εξαρτώμενα τέκνα
      allowanceAmount += allowanceAmount * 0.2 * dependentChildren;
      let limit = 800;
      // Έλεγχος για επιπλέον προσαύξηση περιοχών με δυσμενείς συνθήκες (συντελεστής >= 1)
      if (coefficient >= 1) {
        allowanceAmount *= 1.25;
        limit = 1000;
      }

      if (coefficient >= 1.2) {
        allowanceAmount *= 1.25;
        limit = 1200
      }

      allowanceAmount = Math.max(100, Math.min(allowanceAmount, limit));

      // Εφαρμογή ορίων επιδόματος
      

      return {
        reasons,
        eligible: true,
        allowanceAmount: allowanceAmount.toFixed(2),
        message: `Είστε επιλέξιμος/η για το επίδομα θέρμανσης. Εκτιμώμενο ποσό επιδόματος: <b>€${allowanceAmount.toFixed(2)}</b>.`
      };
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