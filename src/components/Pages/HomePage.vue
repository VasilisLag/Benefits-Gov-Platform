<template>
  <div class="page">
    <MainLayout>
      <main class="p-4">
        <section data-section="welcome">
          <h2 class="govgr-body-l govgr-mb-6 govgr-!-font-weight-bold">Καλωσορίσατε στην Πλατφόρμα Υπολογισμού Παροχών</h2>
          <p class="govgr-!-font-size-16">
            Αυτή η πλατφόρμα σας βοηθά να δείτε εύκολα αν δικαιούστε παροχές όπως:
          </p>
          <ol class="govgr-list govgr-list--bullet govgr-!-font-size-16">
            <li>Επίδομα Παιδιού (Α21)</li>
            <li>Επίδομα Στέγασης</li>
            <li>Επίδομα Θέρμανσης</li>
            <li>Κοινωνικό Οικιακό Τιμολόγιο (ΚΟΤ)</li>
            <li>Ελάχιστο Εγγυημένο Εισόδημα (ΕΕΕ)</li>
          </ol>
        </section>
        <hr class="govgr-section-break govgr-section-break--visible"/>
        <section data-section="benefits">
          <h2 class="govgr-body-l govgr-mb-6 govgr-!-font-weight-bold">Πώς Λειτουργεί η Πλατφόρμα</h2>
          <!-- <ol class="govgr-list govgr-list--number govgr-!-font-size-16">
            <li> Μεταβείτε στην καρτέλα "Αξιολόγηση" για να κάνετε μια προσομοίωση και να δείτε συνολικά για ποιές παροχές μπορεί να είστε επιλέξιμοι.</li>
              <button class="govgr-btn govgr-btn-primary govgr-mt-3" >
                <router-link to="/OverallBenefits">Αξιολόγηση</router-link>
              </button>
            <li> Αν θέλετε να ελέγξετε ένα συγκεκριμένο επίδομα, μπορείτε να επιλέξετε από τις παρακάτω επιλογές για περισσότερες πληροφορίες και να δείτε τα κριτήρια που ισχύουν:</li>
          </ol> -->
          <p>Για να ενημερωθείτε για τα επιδόματα, έχετε δύο επιλογές:</p>
          <ol class="govgr-list govgr-list--bullet govgr-!-font-size-16">
            <li><strong>Μέσω του Μενου Πλοήγησης</strong>: Επιλέξτε τον τίτλο του επιδόματος από το <strong>μενου πλοήγησης</strong> και δείτε άμεσα τις πληροφορίες και τις ενέργειες στην ίδια σελίδα.</li>
            <li><strong>Μέσω του Επεκταθέντος Τμήματος</strong>: Κάτω από τον τίτλο, πατήστε το <strong>"Μάθετε περισσότερα"</strong> για να ανοίξετε το επεκταθέν τμήμα με αναλυτικές πληροφορίες και επιλέξτε το κουμπί <strong>"Αξιολόγηση"</strong> για να προχωρήσετε σε ενέργειες.</li>
          </ol>
          <ExpandableSection
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
          <h2 class="govgr-body-l govgr-mb-6 govgr-!-font-weight-bold">Συχνές Ερωτήσεις</h2>
          <QuestionElement
            question = "Πώς μπορώ να μάθω αν δικαιούμαι κάποιο επίδομα;"
            answer = "Μπορείτε να χρησιμοποιήσετε το εργαλείο προσομοίωσης στην πλατφόρμα για να ελέγξετε αν πληροίτε τα κριτήρια για τα επιδόματα που σας ενδιαφέρουν."
          />
          <QuestionElement
            question = "Είναι οι πληροφορίες που παρέχω ασφαλείς;"
            answer = "Ναι, η πλατφόρμα δεν αποθηκεύει προσωπικά δεδομένα. Όλες οι πληροφορίες χρησιμοποιούνται μόνο για να γίνει ο υπολογισμός των δικαιωμάτων σας."
          />
          <QuestionElement
            question = "Τι κάνω αν δικαιούμαι ένα επίδομα;"
            answer = "Αφού μάθετε αν δικαιούστε κάποιο επίδομα, μπορείτε να ακολουθήσετε τις οδηγίες και να υποβάλετε αίτηση μέσω των επίσημων ιστοσελίδων του κράτους."
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

</style>
