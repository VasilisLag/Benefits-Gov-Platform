const questions = [
  {
    question: "Έχετε υποβάλει δήλωση φορολογίας εισοδήματος το τρέχον έτος;",
    options: ["Ναι", "Όχι"],
    category: "radio",
    required: true,
    tag:"demography"
  },
  {
    question: "Ποιο είναι το συνολικό ετήσιο οικογενειακό εισόδημά σας σε ευρώ;",
    category: "textbox",
    required: true,
    tag:"income"
  },
  {
    question: "Έχετε ενεργό μισθωτήριο συμβόλαιο για την κύρια κατοικία σας;",
    options: ["Ναι", "Όχι"],
    category: "radio",
    required: true,
    tag:"household"
  },
  {
    question: "Ποιο είναι το μηνιαίο ποσό ενοικίου που καταβάλλετε σε ευρώ;",
    category: "textbox",
    required: true,
    tag: "household"
  },
  {
    question: "Είναι η οικογένειά σας μονογονεϊκή;",
    options: ["Ναι", "Όχι"],
    category: "radio",
    required: true,
    tag: "household"
  },
  {
    question: `Πόσα εξαρτώμενα τέκνα έχετε στο νοικοκυριό σας;(αν έχετε)`,
    category: "textbox",
    note: `
      <details class="govgr-details">
        <summary class="govgr-details__summary"> Εξαρτώμενα Τέκνα</summary>
        <div class="govgr-details__content">
            <ul style="list-style-type: disc; padding-left:30px; text-align:left;">
              <li>Τέκνα από γάμο, φυσικά, θετά ή αναγνωρισμένα, εφόσον είναι άγαμα και:
                <ul style="list-style-type: circle; padding-left:20px;">
                  <li>δεν υπερβαίνουν το 18ο έτος της ηλικίας τους</li>
                  <li>το 19ο έτος, αν φοιτούν στη μέση εκπαίδευση</li>
                </ul>
              </li>
              <li>Τέκνα που φοιτούν σε ανώτερη ή ανώτατη εκπαίδευση έως το 24ο έτος</li>
              <li>Τέκνα με ποσοστό αναπηρίας 67% και άνω</li>
              <li>Ορφανά τέκνα που αποτελούν ιδία οικογένεια</li>
            </ul>
        </div>
      </details>
    `,
    required: false,
    tag: "household"
  },
  {
    question: `Πόσα απροστάτευτα τέκνα έχετε στο νοικοκυριό σας;(αν έχετε)`,
    category: "textbox",
    note: `
      <details class="govgr-details">
        <summary class="govgr-details__summary"> Απροστάτευτα Τέκνα</summary>
        <div class="govgr-details__content">
          <p class="govgr-body" style = text-align:left;> 
            Τα ανήλικα μέλη του νοικοκυριού που είναι 
            ορφανά και από τους δύο γονείς ή που κανείς γονέας δεν μπορεί να ασκήσει 
            τη γονική τους μέριμνα, λόγω ασθενείας, αναπηρίας, κράτησης ή στρατιωτικής θητείας και 
            που η επιμέλειά τους έχει ανατεθεί με δικαστική απόφαση σε μέλος του νοικοκυριού.
          </p>
        </div>
      </details>
    `,
    required: false,
    tag: "household"
  },
  {
    question: `Πόσα φιλοξενούμενα μέλη έχετε στο νοικοκυριό σας;(αν έχετε)`,
    category: "textbox",
    required: false,
    tag: "household"
  },
  {
    question: "Ποια είναι η συνολική αντικειμενική αξία της ακίνητης περιουσίας σας (βάσει ΕΝ.Φ.Ι.Α. 2024) σε ευρώ;",
    category: "textbox",
    note: `
      <details class="govgr-details">
        <summary class="govgr-details__summary"> Όριο Φορολογητέας Αξίας</summary>
        <div class="govgr-details__content">
          <ul style="list-style-type: disc; padding-left:30px; text-align:left;">
            <li>Η συνολική φορολογητέα αξία αφορά όλα τα ακίνητα που ανήκουν στα μέλη του νοικοκυριού.</li>
            <li>Για μονοπρόσωπο νοικοκυριό, το όριο είναι 120.000€.</li>
            <li>Προσαυξάνεται κατά 15.000€ για κάθε πρόσθετο μέλος του νοικοκυριού έως τα 180.000€.</li>
          </ul>
        </div>
      </details>
    `,
    required: true,
    tag:"assets"
  },
  {
    question: "Ποιο είναι το συνολικό ποσό καταθέσεων, μετοχών, ομολόγων και λοιπών περιουσιακών στοιχείων σας σε ευρώ;",
    category: "textbox",
    note: `
      <details class="govgr-details">
        <summary class="govgr-details__summary"> Όριο Καταθέσεων</summary>
        <div class="govgr-details__content">
          <ul style="list-style-type: disc; padding-left:30px; text-align:left;">
            <li>Συμπεριλαμβάνονται καταθέσεις, μετοχές και ομόλογα σε Ελλάδα και εξωτερικό.</li>
            <li>Για μονοπρόσωπο νοικοκυριό, το όριο είναι 7.000€.</li>
            <li>Προσαυξάνεται κατά 3.500€ για κάθε πρόσθετο μέλος του νοικοκυριού.</li>
          </ul>
        </div>
      </details>
    `,
    required: true,
    tag:"assets"
  },
  {
    question: "Διαθέτετε κάποιο από τα παρακάτω στοιχεία που αποκλείουν το επίδομα;",
    options: [
      "Όχι, δεν διαθέτω κάποιο από τα παρακάτω",
      "Αμοιβές πληρωμάτων σκαφών αναψυχής",
      "Δαπάνες για δίδακτρα άνω των 1.500€ σε ιδιωτικά σχολεία",
      "Οικιακούς βοηθούς, οδηγούς ή δασκάλους",
    ],
    category: "radio",
    required: true,
    tag:"assets"
  },
];

export default questions;




