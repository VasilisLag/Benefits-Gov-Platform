const questions = [
  {
    question: "Έχετε υποβάλει δήλωση φορολογίας εισοδήματος το τρέχον έτος;",
    options: ["Ναι", "Όχι"],
    category: "radio",
    required: true,
    tag:"demography"
  },
  {
    question: "Διαμένετε μόνιμα στην Ελλάδα;",
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
    question: "Είναι η οικογένειά σας μονογονεϊκή;",
    options: ["Ναι", "Όχι"],
    category: "radio",
    note: `
    <details class="govgr-details">
      <summary class="govgr-details__summary"> Προϋποθέσεις για Μονογονεϊκή οικογένεια</summary>
      <div class="govgr-details__content">
        <p class="govgr-body">
            <ul style="list-style-type: disc; padding-left:20px; text-align:left;">
              <li>Είστε υπεύθυνος/η επιμέλειας για τα εξαρτώμενα τέκνα.</li>
              <li>Υπάρχει σχετική δικαστική απόφαση για την επιμέλεια των τέκνων.</li>
            </ul>
        </p>
      </div>
    </details>`,
    required: true,
    tag: "household"
  },
  {
    question: `Πόσα παιδιά έχετε ως εξαρτώμενα μέλη;`,
    category: "textbox",
    note: `  
    <details class="govgr-details">
      <summary class="govgr-details__summary"> Εξαρτώμενα Μέλη</summary>
      <div class="govgr-details__content">
        <p class="govgr-body">
          <ul style="list-style-type: disc; padding-left:30px; text-align:left;">
            <li>Τέκνα από γάμο, φυσικά, θετά ή αναγνωρισμένα, εφόσον είναι άγαμα και:
              <ul style="list-style-type: circle; padding-left:20px;">
                <li>δεν υπερβαίνουν το 18ο έτος της ηλικίας τους</li>
                <li>το 19ο έτος, αν φοιτούν στη μέση εκπαίδευση</li>
              </ul>
            </li>
            <li>Τέκνα που φοιτούν σε ανώτερη ή ανώτατη εκπαίδευση, στο «Μεταλυκειακό έτος – Τάξη Μαθητείας» των ΕΠΑ.Λ. ή σε ΙΕΚ, έως το 24ο έτος</li>
            <li>Τέκνα με ποσοστό αναπηρίας 67% και άνω</li>
            <li>Ορφανά τέκνα που αποτελούν ιδία οικογένεια (όταν έχει επέλθει θάνατος και των δύο γονέων</li>
          </ul>
        </p>
      </div>
    </details>`,
    required: true,
    tag:"household"
  },
];

export default questions;
