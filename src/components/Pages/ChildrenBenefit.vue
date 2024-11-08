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
            :input="answer"
            :answer="answer"
            @onAnswerChange="handleAnswerChange"
          />
        </QuestionForm>
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

export default {
  name: 'ChildrenBenefit',
  components: {
    HeaderElement,
    NavElement,
    InputElement,
    QuestionForm,
    FooterElement,
  },
  data() {
    return {
      currentQuestionIndex: 0,
      questions: questions,
      currentOption: null,
      answers: [], 
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
    }
  },
  methods: {
    handleAnswerChange(selectedOption) {
      this.currentOption = selectedOption;
    },
    nextQuestion() {
      if (this.currentOption !== null) {
        this.answers[this.currentQuestionIndex++] = this.currentOption;
      }
      this.currentOption = this.answers[this.currentQuestionIndex] || null;
      
    },
    goBack() {
      if (this.currentQuestionIndex > 0) {
        this.currentOption = this.answers[--this.currentQuestionIndex] || null;
      }
    },
    skipQuestion() {
      this.answers[this.currentQuestionIndex++] = null;
      this.currentOption = this.answers[this.currentQuestionIndex] || null;
    },
    submitAnswers() {
      this.calculateBenefits(this.answers);
    },
    
    calculateBenefits(answers) {
    // Προϋποθέσεις για επιλεξιμότητα
    const submittedTaxDeclaration = answers[0] === "Ναι";
    const income = parseFloat(answers[1]);
    const dependentChildren = parseInt(answers[2]);
    const residesInGreece = answers[3] === "Ελλάδα";
    const yearsInGreece = parseInt(answers[4]) >= 5;
    //const residencyStatus = answers[5];
    const isSingleParent = answers[6] === "Ναι";
    const hasDisability = answers[7] === "Ναι";
    const custody = answers[8] === "Ναι";
    const custodyDisruption = answers[9] === "Όχι";
    //const judicialDecision = answers[10] === "Ναι" || answers[10] === "Όχι";
    console.log(answers);
    // Έλεγχος επιλεξιμότητας
    if (
      !submittedTaxDeclaration ||
      !residesInGreece ||
      !yearsInGreece ||
      !custody ||
      !custodyDisruption ||
      dependentChildren === 0
    ) {
      console.log("Δεν πληροίτε τις βασικές προϋποθέσεις για το επίδομα.");
      return {
        eligible: false,
        benefitAmount: 0,
        message: "Δεν πληροίτε τις βασικές προϋποθέσεις για το επίδομα.",
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
      console.log("Το εισόδημά σας υπερβαίνει τα όρια για το επίδομα.");
      return {
        eligible: false,
        benefitAmount: 0,
        message: "Το εισόδημά σας υπερβαίνει τα όρια για το επίδομα.",
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

    // Προσαύξηση λόγω αναπηρίας
    if (hasDisability) {
      benefitAmount += 50;
    }
    console.log(`Είστε επιλέξιμος/η για το επίδομα. Ποσό επιδόματος: €${benefitAmount} το μήνα.`);
    return {
      eligible: true,
      benefitAmount: benefitAmount,
      message: `Είστε επιλέξιμος/η για το επίδομα. Ποσό επιδόματος: €${benefitAmount} το μήνα.`,
    };
  }

  }
};
</script>

<style scoped>
.form-container {
  width: 70%;
  margin: 0 auto;
}

main {
  flex:1;
}

.page {
  display:flex;
  flex-direction: column;
  min-height: 100vh;
  overflow-y: scroll;
}

.footer {
  align-self:end;
}
</style>