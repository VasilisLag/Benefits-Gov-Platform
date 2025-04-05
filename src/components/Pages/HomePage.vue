<template>
  <div class="page">
    <HeaderElement />
    <NavElement />
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

      <section data-section="benefits">
        <h2 class="govgr-body-l govgr-mb-6 govgr-!-font-weight-bold">Πώς Λειτουργεί η Πλατφόρμα</h2>
        <!-- <ol class="govgr-list govgr-list--number govgr-!-font-size-16">
          <li> Μεταβείτε στην καρτέλα "Αξιολόγηση" για να κάνετε μια προσομοίωση και να δείτε συνολικά για ποια επιδόματα μπορεί να είστε επιλέξιμοι.</li>
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
          title = "Επίδομα Παιδιού Α21"
          briefDescription = "Το Επίδομα Στέγασης είναι προνοιακό πρόγραμμα επιδότησης ενοικίου για τα νοικοκυριά που μισθώνουν την κύρια κατοικία τους."
          moreInformation = "
            Η διαδικασία αφορά στην υποβολή αίτησης για το επίδομα παιδιού και είναι αποκλειστικά ψηφιακή.
            </br>Η αίτηση για επίδομα παιδιού A21 υποβάλλεται κατ έτος άπαξ. Σε περίπτωση μεταβολής των στοιχείων της αίτησης, εντός του έτους ισχύος της, τροποποιείται από τον αιτούντα εντός μηνός, οπωσδήποτε όμως μέχρι την καταληκτική ημερομηνία υποβολής της για το συγκεκριμένο έτος.
            </br>Η ημερομηνία έναρξης υποβολής αίτησης κατ΄ έτος ορίζεται με απόφαση του Διοικητή του ΟΠΕΚΑ (αρχή Μαρτίου) και η καταληκτική ημερομηνία είναι η 15η Ιανουαρίου του επόμενου έτους.
            </br> </br>
            Δείτε πιο αναλυτικά στο Εθνικό Μητρώο Διοικητικών Διαδικασιών: 
            <a class='govgr-link govgr-!-font-size-16' href='https://mitos.gov.gr/index.php/%CE%94%CE%94:%CE%95%CF%80%CE%AF%CE%B4%CE%BF%CE%BC%CE%B1_%CF%80%CE%B1%CE%B9%CE%B4%CE%B9%CE%BF%CF%8D' rel='noreferrer noopener' target='_blank'>
              Επίδομα Παιδιού - ΜΙΤΟΣ
            </a>
            "
            link="/ChildrenBenefit"
        />
        <ExpandableSection
          title = "Επίδομα Στέγασης"
          briefDescription = "Το Επίδομα Στέγασης είναι προνοιακό πρόγραμμα επιδότησης ενοικίου για τα νοικοκυριά που μισθώνουν την κύρια κατοικία τους."
          moreInformation = "
            Η διαδικασία αφορά στην αίτηση για τη χορήγηση του επιδόματος στέγασης, ένα προνοιακό πρόγραμμα επιδότησης ενοικίου για τα νοικοκυριά που μισθώνουν την κύρια κατοικία τους.
            </br> </br> Δείτε πιο αναλυτικά στο Εθνικό Μητρώο Διοικητικών Διαδικασιών: 
            <a class='govgr-link govgr-!-font-size-16' href='https://mitos.gov.gr/index.php/%CE%94%CE%94:%CE%95%CF%80%CE%AF%CE%B4%CE%BF%CE%BC%CE%B1_%CE%A3%CF%84%CE%AD%CE%B3%CE%B1%CF%83%CE%B7%CF%82' rel='noreferrer noopener' target='_blank'>
              Επίδομα Στέγασης - ΜΙΤΟΣ
            </a>
          "
          link="/HousingBenefit"
        />
        <ExpandableSection
          title = "Επίδομα Θέρμανσης"
          briefDescription = "Το Επίδομα Θέρμανσης είναι προνοιακό πρόγραμμα επιδότησης θέρμανσης."
          moreInformation = "Απευθύνεται σε όσους καταναλώνουν για τη θέρμανσή τους:
          <ol class='govgr-list govgr-list--bullet govgr-!-font-size-16'>
            <li>ηλεκτρική ενέργεια και πληρούν τα κριτήρια χορήγησης με βάση την απόφαση <a class='govgr-link govgr-!-font-size-16' href='https://www.aade.gr/sites/default/files/2023-12/FEK-2023-Tefxos%20B-07253-21_12_2023.pdf' rel='noreferrer noopener' target='_blank'>ΥΠΕΝ/ΓρΥφΠΕΝ/135405/1603</a>.</li>
            <li>πετρέλαιο εσωτερικής καύσης θέρμανσης ή φυσικό αέριο ή υγραέριο ή καυσόξυλα ή βιομάζα (πέλετ) ή θερμική ενέργεια μέσω τηλεθέρμανσης 
            ή φωτιστικό πετρέλαιο (μπλε κηροζίνη) και πληρούν τα κριτήρια χορήγησης με βάση την απόφαση ΓΔΟΥ 125/27.10.2023 (ΦΕΚ Β' 6238).
            </li>
          </ol>
          </br> Δείτε πιο αναλυτικά στο Εθνικό Μητρώο Διοικητικών Διαδικασιών: 
          <a class='govgr-link govgr-!-font-size-16' href='https://mitos.gov.gr/index.php/%CE%94%CE%94:%CE%95%CF%80%CE%AF%CE%B4%CE%BF%CE%BC%CE%B1_%CE%9A%CE%B1%CF%84%CE%B1%CE%BD%CE%AC%CE%BB%CF%89%CF%83%CE%B7%CF%82_%CE%A0%CE%B5%CF%84%CF%81%CE%B5%CE%BB%CE%B1%CE%AF%CE%BF%CF%85_%CE%98%CE%AD%CF%81%CE%BC%CE%B1%CE%BD%CF%83%CE%B7%CF%82' rel='noreferrer noopener' target='_blank'>
              Επίδομα Θέρμανσης - ΜΙΤΟΣ
          </a>"
          link="/HeatingBenefit"
        />
        <ExpandableSection
          title = "Κοινωνικό Οικιακό Τιμολόγιο"
          briefDescription = "Η διαδικασία αφορά στην υποβολή αίτησης για αξιολόγηση και πιστοποίηση αναπηρίας από το Κέντρο Πιστοποίησης Αναπηρίας (ΚΕΠΑ)."
          moreInformation = "
          <ol class='govgr-list govgr-list--bullet govgr-!-font-size-16'>
            <li>Η κατηγορία ΚΟΤ Α, και</li>
            <li>Η κατηγορία ΚΟΤ Β</li>
          </ol>
                &nbsp &nbsp Για την ένταξη στο <b>ΚΟΤ Α</b> απαιτείται να υπάρχει εγκεκριμένη αίτηση ΚΕΑ (Κοινωνικό
                Εισόδημα Αλληλεγγύης) που να έχει εγκριθεί το τελευταίο δίμηνο (για αυτούς που έχουν
                εγκριθεί προ διμήνου απαιτείται επικαιροποίηση της αίτησης τους στο ΚΕΑ) <br>
                &nbsp &nbsp Για την ένταξη στο <b>ΚΟΤ Β</b> εξετάζονται εκ νέου τα προβλεπόμενα κριτήρια, ανεξάρτητα αν
                κάποιος κρίθηκε δικαιούχος του Κοινωνικού Μερίσματος 2017. Σημειώνουμε ότι
                λαμβάνονται υπόψη και τυχόν τροποποιητικές φορολογικές δηλώσεις εφόσον έχουν
                εκκαθαριστεί. Επίσης για τυχόν φιλοξενούμενα ενήλικα μέλη, απαιτείται συναίνεση που
                δίνεται ηλεκτρονικά όπως γινόταν και με το Κοινωνικό Μέρισμα.
            <br> <br>
            Δείτε πιο αναλυτικά στην επίσημη ιστοσελίδα του Gov: 
            <a class='govgr-link govgr-!-font-size-16' href='https://www.gov.gr/sdg/consumer-rights/connection-to-utilities/electricity/social-residential-tariff/' rel='noreferrer noopener' target='_blank'>
              Επίδομα KOT - GOV
            </a>
          "
          link="/VulnerableBenefits"
        /> 
        <ExpandableSection
          title = "Ελάχιστο Εγγυημένο Εισόδημα"
          briefDescription = "Το Ελάχιστο Εγγυημένο Εισόδημα είναι ένα προνοιακό πρόγραμμα που δίνεται σε περισσότερα από 200.000 ευάλωτα νοικοκυριά. 
                              Αποτελεί ένα αναγκαίο δίχτυ προστασίας για την αντιμετώπιση των συνεπειών της φτώχειας και την αποφυγή του κοινωνικού αποκλεισμού."
          moreInformation = "
                Σε τι συνίσταται;
                <ol class='govgr-list govgr-list--bullet govgr-!-font-size-16'>
                  <li>
                    Σε εισοδηματική ενίσχυση: το χρηματικό ποσό ενίσχυσης της ωφελούμενης μονάδας.
                  </li>
                  <li>
                    Σε συμπληρωματικές κοινωνικές υπηρεσίες, παροχές και αγαθά: διασύνδεση των μελών 
                    της ωφελούμενης μονάδας, εφόσον πληρούν τα κριτήρια ένταξης εκάστου προγράμματος.
                  </li>
                  <li>
                    Σε υπηρεσίες ενεργοποίησης: προώθηση των δικαιούχων, εφόσον δύνανται να εργαστούν, σε δράσεις που στοχεύουν στην ένταξη ή 
                    επανένταξή τους στην αγορά εργασίας.
                  </li>
                </ol>
            Δείτε πιο αναλυτικά στο Εθνικό Μητρώο Διοικητικών Διαδικασιών: 
            <a class='govgr-link govgr-!-font-size-16' href='https://mitos.gov.gr/index.php/%CE%94%CE%94:%CE%95%CE%BB%CE%AC%CF%87%CE%B9%CF%83%CF%84%CE%BF_%CE%B5%CE%B3%CE%B3%CF%85%CE%B7%CE%BC%CE%AD%CE%BD%CE%BF_%CE%B5%CE%B9%CF%83%CF%8C%CE%B4%CE%B7%CE%BC%CE%B1' rel='noreferrer noopener' target='_blank'>
              Ελάχιστο Εγγυημένο Εισόδημα - ΜΙΤΟΣ
            </a>
          "
          link="/VulnerableBenefits"
        /> 
      </section>

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
    <FooterElement/>
  </div>
</template>

<script>
import HeaderElement from '@/components/Elements/Page Elements/HeaderElement.vue';
import NavElement from '@/components/Elements/Page Elements/NavElement.vue';
import ExpandableSection from '@/components/Elements/ExpandableSection.vue';
import QuestionElement from '@/components/Elements/QuestionElement.vue';
import FooterElement from '@/components/Elements/Page Elements/FooterElement.vue';

export default {
  name: 'HomePage',
  components: {
    HeaderElement,
    NavElement,
    ExpandableSection,
    QuestionElement,
    FooterElement,
  }
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
