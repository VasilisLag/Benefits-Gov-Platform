<template>
  <div class="page">
    <HeaderElement />
    <NavElement />
    <main class="p-4">
      <div class="form-container">
        <QuestionForm 
          title="Επίδομα ΚΟΤ - ΚΕΑ"
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
          v-if="resultsKEA && isFormSummary"
          :eligible="resultsKEA.eligible"
          :benefitAmount="resultsKEA.benefitAmount"
          :message="resultsKEA.message"
          :reasons="resultsKEA.reasons"
        />
        <ResultsForm 
          v-if="resultsKOT && isFormSummary"
          :eligible="resultsKOT.eligible"
          :benefitAmount="resultsKOT.benefitAmount"
          :message="resultsKOT.message"
          :reasons="resultsKOT.reasons"
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
import questions from '@/questions/vulnerableBenefitsQs.js';
import SummaryTable from '@/components/Elements/SummaryTable.vue';
import ResultsForm from '@/components/Elements/ResultsForm.vue';

export default {
  name: 'VulnerableBenefits',
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
      resultsKEA: null,
      resultsKOT: null
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
        this.resultsKEA = null;
        this.resultsKOT = null;
      }
      this.currentOption = this.answers[--this.currentQuestionIndex] || null;
    },
    skipQuestion() {
      this.answers[this.currentQuestionIndex++] = null;
      this.currentOption = this.answers[this.currentQuestionIndex] || null;
    },
    submitAnswers() {
      this.resultsKEA = this.calculateKEABenefits(this.answers);
      const aCatEligible = this.resultsKEA.eligible;
      this.resultsKOT = this.calculateKOTBenefits(this.answers, aCatEligible);
    },
    calculateKEABenefits(answers) {
      const residesInGreece = answers[0] === "Ναι";
      let adults = parseInt(answers[1]);
      let dependentChildren = parseInt(answers[2]);
      const unsupportedChildren = parseInt(answers[3]);
      const isSingleParent = answers[4] === "Ναι";
      const income = parseFloat(answers[7]);
      const propertyValue = parseFloat(answers[8]);
      const vehicleValue = parseFloat(answers[9]);
      const savings = parseFloat(answers[10]);
      const luxuryBelonging = answers[11] === "Όχι, δεν διαθέτω κάποιο από τα παραπάνω";
      console.log(answers)
      let reasons = [];
      const vehicleThreshold = 6000;
      let incomeThreshold = 0;
      let propertyThreshold = 90000;
      let baseAmount = 216;
      let depositThreshold;

      if (isSingleParent && dependentChildren > 0) {
        dependentChildren -= 1;
        adults += 1;
      }

      const totalAdults = adults + unsupportedChildren;
      const totalChildren = dependentChildren;
      const guaranteedIncome = baseAmount + (totalAdults-1) * 108 + (totalChildren * 54);

      incomeThreshold = 6 * Math.min(guaranteedIncome, 972);
      propertyThreshold += Math.min(150000, propertyThreshold + (totalAdults + dependentChildren - 1) * 15000);
      depositThreshold = this.calculateDepositThreshold(totalAdults, totalChildren);
      console.log(incomeThreshold)
      console.log(income)
      
      if(!residesInGreece) {
        reasons.push("Πρέπει να διαμένετε στην Ελλάδα για να δικαιούστε το επίδομα.");
      }
      if(income >= incomeThreshold) {
        reasons.push("Το εισόδημα σας (" + income + ") υπερβαίνει το εισοδηματικό όριο (" + incomeThreshold + ").")
      }
      if(propertyValue > propertyThreshold) {
        reasons.push("Η αξία των ακινήτων σας (" + propertyValue + ") υπερβαίνει το όριο (" + propertyThreshold + ").")
      }
      if(vehicleValue > vehicleThreshold) {
        reasons.push("Η αντικειμενική δαπάνη των επιβατικών σας οχημάτων (" + vehicleValue + ") υπερβαίνει το όριο (" + vehicleThreshold + ").")
      }
      if(savings > depositThreshold) {
        reasons.push("Η αντικειμενική δαπάνη των επιβατικών σας οχημάτων (" + vehicleValue + ") υπερβαίνει το όριο (" + vehicleThreshold + ").")
      }
      if(!luxuryBelonging) {
        reasons.push("Αποκλείεστε λόγω κατοχής πολυτελών αγαθών.")
      }

      if (reasons.length > 0) {
        return {
          reasons,
          eligible: false,
          allowanceAmount: 0,
          message: `Δεν είστε δικαιούχος για το ΚΕΑ.`,
        };
      }
      else {
        const allowanceAmount = parseInt((incomeThreshold - income) / 6);
        return {
          reasons,
          eligible: true,
          message: `Είστε επιλέξιμος/η για το ΚΕΑ: <b>${allowanceAmount} ευρώ τον μήνα</b>`,
          allowanceAmount: allowanceAmount,
        };
      }
      
    },
    calculateKOTBenefits(answers, aCatEligible) {
      if (aCatEligible) {
        return {
          eligible: true,
          allowanceAmount: 0,
          message: `Είστε επιλέξιμος για το ΚΟΤ: <b>Κατηγορία Α</b>.`
        };
      }

      const residesInGreece = answers[0] === "Ναι";
      let adults = parseInt(answers[1]);
      let dependentChildren = parseInt(answers[2]);
      const unsupportedChildren = parseInt(answers[3]);
      const income = parseFloat(answers[5]);
      const propertyValue = parseFloat(answers[6]);
      const disabledPerson = answers[9] === "Ναι";
      const lifesupportedPerson = answers[10] === "Ναι";
      const luxuryBelonging = answers[11] === "Όχι, δεν διαθέτω κάποιο από τα παραπάνω";

      let reasons = [];

      const totalAdults = adults;
      const totalChildren = dependentChildren + unsupportedChildren;

      let incomeThreshold = Math.min(9000 + (totalAdults - 1) * 4500 + totalChildren * 2250, 31500);
      incomeThreshold += lifesupportedPerson? 15000: (disabledPerson? 8000 : 0)
      let propertyThreshold = Math.min(120000 + (totalAdults + totalChildren - 1) * 15000, 180000);

      if(!residesInGreece) {
        reasons.push("Πρέπει να διαμένετε στην Ελλάδα για να δικαιούστε το επίδομα.");
      }
      if(income >= incomeThreshold) {
        reasons.push("Το εισόδημα σας ({income}) υπερβαίνει το εισοδηματικό όριο ({incomeThreshold}).")
      }
      if(propertyValue > propertyThreshold) {
        reasons.push("Η αξία των ακινήτων σας ({propertyValue}) υπερβαίνει το όριο ({propertyThreshold}).")
      }
      if(!luxuryBelonging) {
        reasons.push("Αποκλείεστε λόγω κατοχής πολυτελών αγαθών.")
      }

      if (reasons.length > 0) {
        return {
          reasons,
          eligible: false,
          allowanceAmount: 0,
          message: `Δεν είστε δικαιούχος για το ΚΟΤ.`
        };
      }
      else {
        return {
          reasons,
          eligible: true,
          message:`Είστε επιλέξιμος/η για το ΚΟΤ: <b>Κατηγορια Β</b>`,
        };
      }
    },
    calculateDepositThreshold(totalAdults, totalChildren) {
      let threshold = 0;

      const depositLimits = [
        { adults: 1, children: 0, limit: 4800 },
        { adults: 2, children: 0, limit: 7200 },
        { adults: 1, children: 1, limit: 7200 },
        { adults: 2, children: 1, limit: 8400 },
        { adults: 1, children: 2, limit: 8400 },
        { adults: 3, children: 0, limit: 9600 },
        { adults: 2, children: 2, limit: 9600 },
        { adults: 1, children: 3, limit: 9600 },
        { adults: 3, children: 1, limit: 10800 },
        { adults: 2, children: 3, limit: 10800 },
        { adults: 1, children: 4, limit: 10800 },
        { adults: 4, children: 0, limit: 12000 },
        { adults: 2, children: 4, limit: 12000 },
        { adults: 1, children: 5, limit: 12000 },
        { adults: 4, children: 1, limit: 13200 },
        { adults: 2, children: 5, limit: 13200 },
        { adults: 1, children: 6, limit: 13200 },
        { adults: 5, children: 0, limit: 14400 },
        { adults: 2, children: 6, limit: 14400 },
        { adults: 1, children: 7, limit: 14400 },
      ];

      const matchedLimit = depositLimits.find(
        (entry) => entry.adults === totalAdults && entry.children === totalChildren
      );

      threshold = matchedLimit ? matchedLimit.limit : 0;
      return threshold;
    },
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