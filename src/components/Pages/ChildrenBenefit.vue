<template>
  <div class="page">
    <HeaderElement />
    <NavElement />
    <main class="p-4">
      <div class="form-container">
        <QuestionForm 
          title="Επίδομα Παιδιού Α21"
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
import questions from '@/questions/childrenBenefitQs.js';
import SummaryTable from '@/components/Elements/SummaryTable.vue';
import ResultsForm from '@/components/Elements/ResultsForm.vue';

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
      if (this.currentOption !== null && this.currentQuestionIndex !=5) {
        this.answers[this.currentQuestionIndex++] = this.currentOption;
      }
      else if (this.currentOption !== null && this.currentQuestionIndex === 5) {
        if(this.currentOption === "Όχι"){
          this.answers[5] = this.currentOption;
          this.answers[6] = this.answers[7] = null;
          this.currentQuestionIndex = this.questions.length;
        } 
        else {
          this.answers[this.currentQuestionIndex++] = this.currentOption;
        }
      }

      this.currentOption = this.answers[this.currentQuestionIndex] || null;
      
    },
    goBack() {
      if(this.currentQuestionIndex === this.questions.length) {
        if(this.answers[5] === "Όχι"){
          this.currentQuestionIndex = 5;
          this.currentOption =  this.answers[this.currentQuestionIndex];
        }
        else {
          this.currentOption = this.answers[--this.currentQuestionIndex] || null;
        }
        this.results = null;
      }
      else if (this.currentQuestionIndex > 0) {
        this.currentOption = this.answers[--this.currentQuestionIndex] || null;
      }
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
      const income = parseFloat(answers[1]);
      const dependentChildren = parseInt(answers[2]);
      const residesInGreece = answers[3] === "Ελλάδα";
      const yearsInGreece = parseInt(answers[4]) >= 5;
      const isSingleParent = answers[5] === "Ναι";
      const custody = answers[6] === "Ναι";
      const judicialDecision = answers[7] === "Ναι";

      let reasons = [];
      if(!submittedTaxDeclaration)
        reasons.push("Δεν έχετε υποβάλλει φορολογική δήλωση για το προηγούμενο έτος.")
      if(!residesInGreece)
        reasons.push("Πρέπει να διαμένετε στην Ελλάδα για να δικαιούστε το επίδομα παιδιού.")
      if(!yearsInGreece)
        reasons.push("Πρέπει να διαμένετε στην Ελλάδα κατά τα τελευταία, 5 τουλάχιστον, έτη.")
      if(isSingleParent && (!custody || !judicialDecision))
        reasons.push("Η οικογένεια είναι μονογονεϊκή, παρόλα αυτά δεν υπάρχει απόφαση που να αποδεικνύει την επιμέλεια του/των παιδιών.")
      if(dependentChildren === 0)
        reasons.push("Ο αριθμός των εξαρτώμενων μελών είναι 0.")
      // Έλεγχος επιλεξιμότητας
      if (reasons.length > 0) {
        return {
          reasons,
          eligible: false,
          benefitAmount: 0,
          message: "Δεν είστε δικαιούχος.",
        };
      }

      // Υπολογισμός κλίμακας ισοδυναμίας
      let equivalenceScale = 1; // Πρώτος γονέας
      
      if (!isSingleParent) {
        equivalenceScale += 1 / 2; // Στάθμιση δεύτερου γονέα για μη μονογονεϊκές οικογένειες
      }
      
      // Εφαρμογή στάθμισης για τα παιδιά
      for (let i = 0; i < dependentChildren; i++) {
        if (isSingleParent && i === 0) {
          equivalenceScale += 1 / 2; // Στάθμιση 1/2 για το πρώτο παιδί μονογονεϊκής οικογένειας
        } else {
          equivalenceScale += 1 / 4; // Στάθμιση 1/4 για τα υπόλοιπα παιδιά
        }
      }

      // Υπολογισμός ισοδύναμου εισοδήματος
      const equivalentIncome = income / equivalenceScale;

      // Κατηγοριοποίηση του ισοδύναμου εισοδήματος
      let incomeCategory;
      if (equivalentIncome <= 6000) {
        incomeCategory = "A";
      } else if (equivalentIncome <= 10000) {
        incomeCategory = "B";
      } else if (equivalentIncome <= 15000) {
        incomeCategory = "C";
      } else {
        reasons.push("Το εισόδημά σας υπερβαίνει τα όρια για το επίδομα.")
        return {
          reasons,
          eligible: false,
          benefitAmount: 0,
          message: "Δεν είστε δικαιούχος.",
        };
      }

      // Υπολογισμός ποσού επιδόματος βάσει κατηγορίας και αριθμού εξαρτώμενων τέκνων
      let benefitAmount = 0;
      switch (incomeCategory) {
        case "A":
          benefitAmount = 70 * Math.min(dependentChildren, 2) + 140 * Math.max(dependentChildren - 2, 0);
          break;
        case "B":
          benefitAmount = 42 * Math.min(dependentChildren, 2) + 84 * Math.max(dependentChildren - 2, 0);
          break;
        case "C":
          benefitAmount = 28 * Math.min(dependentChildren, 2) + 56 * Math.max(dependentChildren - 2, 0);
          break;
    }

      return {
        reasons,
        eligible: true,
        benefitAmount: benefitAmount,
        message: `Είστε επιλέξιμος/η για το επίδομα. Εκτιμώμενο ποσό επιδόματος: <b>€${benefitAmount}</b> το μήνα.`,
      };
    }

  }
};
</script>

<style scoped>
.form-container {
  width: 70%;
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