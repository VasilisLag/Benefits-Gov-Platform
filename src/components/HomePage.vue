<template>
  <div>
    <HeaderElement />
    <NavElement />
    <main class="p-4">
      <section>
        <h2 class="govgr-body-l govgr-mb-6 govgr-!-font-weight-bold">Καλωσορίσατε στην Πλατφόρμα Υπολογισμού Δικαιώματος Επιδόματος</h2>
        <p class="govgr-!-font-size-16">
          Αυτή η πλατφόρμα σας βοηθά να δείτε γρήγορα και εύκολα αν δικαιούστε επιδόματα όπως:
        </p>
        <ol class="govgr-list govgr-list--bullet govgr-!-font-size-16">
          <li>Επίδομα Ενοικίου</li>
          <li>Επίδομα Αναπηρίας (ΚΕΠΑ)</li>
          <li>Επίδομα Θέρμανσης</li>
          <li>Επίδομα Παιδιού (Α21)</li>
        </ol>
        <p>
          Η διαδικασία είναι απλή! Απαντήστε σε μερικές ερωτήσεις και θα δείτε αμέσως αν δικαιούστε κάποιο επίδομα.
        </p>
      </section>

      <section>
        <h2 class="govgr-body-l govgr-mb-6 govgr-!-font-weight-bold">Πώς Λειτουργεί η Πλατφόρμα</h2>
        <ol class="govgr-list govgr-list--number govgr-!-font-size-16">
          <li> Μεταβείτε στην καρτέλα "Αξιολόγηση" για να κάνετε μια προσομοίωση και να δείτε συνολικά για ποια επιδόματα μπορεί να είστε επιλέξιμοι.</li>
          <li> Αν θέλετε να ελέγξετε ένα συγκεκριμένο επίδομα, μπορείτε να επιλέξετε από τις παρακάτω επιλογές για περισσότερες πληροφορίες και να δείτε τα κριτήρια που ισχύουν:</li>
        </ol>
        <ExpandableSection
          title = "Επίδομα Στέγασης"
          briefDescription = "Το Επίδομα Στέγασης είναι προνοιακό πρόγραμμα επιδότησης ενοικίου για τα νοικοκυριά που μισθώνουν την κύρια κατοικία τους."
          moreInformation = "Το επίδομα στέγασης μπλα μπλα μπλα..."
        />
        <ExpandableSection
          title = "Επίδομα Θέρμανσης"
          briefDescription = "Το Επίδομα Στέγασης είναι προνοιακό πρόγραμμα επιδότησης ενοικίου για τα νοικοκυριά που μισθώνουν την κύρια κατοικία τους."
          moreInformation = "Το επίδομα στέγασης μπλα μπλα μπλα..."
        />
        <ExpandableSection
          title = "Επίδομα Παιδιού - Α21"
          briefDescription = "Το Επίδομα Στέγασης είναι προνοιακό πρόγραμμα επιδότησης ενοικίου για τα νοικοκυριά που μισθώνουν την κύρια κατοικία τους."
          moreInformation = "Το επίδομα στέγασης μπλα μπλα μπλα..."
        />
        <ExpandableSection
          title = "ΚΕΠΑ"
          briefDescription = "Το Επίδομα Στέγασης είναι προνοιακό πρόγραμμα επιδότησης ενοικίου για τα νοικοκυριά που μισθώνουν την κύρια κατοικία τους."
          moreInformation = "Το επίδομα στέγασης μπλα μπλα μπλα..."
        /> 
      </section>

      <section>
        <h2>Section 3 Heading</h2>
        <p>This is the content of the third section.</p>
      </section>
    </main>
  </div>
</template>

<script>
import HeaderElement from '@/components/Elements/HeaderElement.vue';
import NavElement from '@/components/Elements/NavElement.vue';
import ExpandableSection from '@/components/Elements/ExpandableSection.vue';

export default {
  name: 'HomePage',
  components: {
    HeaderElement,
    NavElement,
    ExpandableSection
  }
};
</script>

<style scoped>
section {
  margin: 4vw;
  text-align: left;
}
</style>
