<template>
  <div class="page">
    <MainLayout>
      <main class="p-4">
        <section data-section="welcome">
          <h2 class="govgr-heading-l">Καλωσορίσατε στην Πλατφόρμα Υπολογισμού Παροχών</h2>
          <p class="govgr-!-font-size-19">
            Αυτή η πλατφόρμα σας βοηθά να δείτε εύκολα αν δικαιούστε παροχές όπως:
          </p>
          <ol class="govgr-list govgr-list--bullet govgr-!-font-size-19">
            <li>Επίδομα Παιδιού (Α21)</li>
            <li>Επίδομα Στέγασης</li>
            <li>Επίδομα Θέρμανσης</li>
            <li>Κοινωνικό Οικιακό Τιμολόγιο (ΚΟΤ)</li>
            <li>Ελάχιστο Εγγυημένο Εισόδημα (ΕΕΕ)</li>
          </ol>
        </section>
        <hr class="govgr-section-break govgr-section-break--visible"/>
        <section data-section="benefits">
          <h2 class="govgr-heading-l govgr-!-font-weight-bold">Πώς Λειτουργεί η Πλατφόρμα</h2>
          <ol class="govgr-list govgr-list--number govgr-!-font-size-19 govgr-mb-6">
            <li class = "govgr-mt-9 govgr-mb-6"> Μεταβείτε στην καρτέλα "Αξιολόγηση" για να κάνετε μια προσομοίωση και να δείτε συνολικά για ποιές παροχές μπορεί να είστε επιλέξιμοι.</li>
              <router-link :to="assessmentLink">
                <button class="govgr-btn govgr-btn-primary govgr-btn-cta govgr-mb-12">
                    Αξιολόγηση
                  <svg viewBox="0 0 24 24" 
                    class="govgr-svg-icon--arrow--right govgr-svg-icon"
                    focusable="false"
                    aria-hidden="true"> <path d="M8.5,2L6.1,4.3l7.6,7.7l-7.6,7.6L8.5,22l10-10L8.5,2z"/> 
                  </svg>
                </button>
              </router-link>
            <li> Αν θέλετε να ελέγξετε ένα συγκεκριμένο επίδομα, μπορείτε να επιλέξετε από τις παρακάτω επιλογές για περισσότερες πληροφορίες και να δείτε τα κριτήρια που ισχύουν:</li>
          </ol>
          <!-- <p>Για να ενημερωθείτε για τα επιδόματα, έχετε δύο επιλογές:</p>
          <ol class="govgr-list govgr-list--bullet govgr-!-font-size-16">
            <li><strong>Μέσω του Μενου Πλοήγησης</strong>: Επιλέξτε τον τίτλο του επιδόματος από το <strong>μενου πλοήγησης</strong> και δείτε άμεσα τις πληροφορίες και τις ενέργειες στην ίδια σελίδα.</li>
            <li><strong>Μέσω του Επεκταθέντος Τμήματος</strong>: Κάτω από τον τίτλο, πατήστε το <strong>"Μάθετε περισσότερα"</strong> για να ανοίξετε το επεκταθέν τμήμα με αναλυτικές πληροφορίες και επιλέξτε το κουμπί <strong>"Αξιολόγηση"</strong> για να προχωρήσετε σε ενέργειες.</li>
          </ol> -->
          <ExpandableSection class = "govgr-mb-6"
            v-for="(benefit, index) in benefits"
            :key="index"
            :title="benefit.title"
            :briefDescription="benefit.briefDescription"
            :moreInformation="benefit.moreInformation"
            :link="benefit.link"
          />
        </section>
        <hr class="govgr-section-break govgr-section-break--visible"/>
        <section data-section="q-and-a">
          <h2 class="govgr-heading-l">Συχνές Ερωτήσεις</h2>
          <QuestionElement
            v-for="(question, index) in questions"
            :key="index"
            :question="question.prompt"
            :answer = "question.answer"
          />
        </section>
      </main>
    </MainLayout>
  </div>
</template>

<script>
import ExpandableSection from '@/components/Elements/ExpandableSection.vue';
import QuestionElement from '@/components/Elements/QuestionElement.vue';
import MainLayout from '@/components/Elements/Layouts/MainLayout.vue';
import { benefitsInfo } from '@/info/benefitsInfo.js';
import {questionsInfo} from '@/info/questionsInfo.js';

export default {
  name: 'HomePage',
  components: {
    MainLayout,
    ExpandableSection,
    QuestionElement,
  },
  data() {
    return {
      benefits: benefitsInfo,
      questions: questionsInfo,
      assessmentLink: '/OverallBenefits',
    };
  },
};
</script>

<style scoped>
section {
  margin: 4vw;
  text-align: left;
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

ol li {
  margin: 1vh;
}

.govgr-btn:hover .govgr-svg-icon--arrow--right {
  transform: translateX(6px);
  transition: transform 0.3s ease;
}

.govgr-svg-icon--arrow--right {
  transition: transform 0.3s ease;
}

</style>
