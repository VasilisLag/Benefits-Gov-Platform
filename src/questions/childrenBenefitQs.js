const questions = [
  {
    question: "Έχετε υποβάλει δήλωση φορολογίας εισοδήματος το τρέχον έτος;",
    options: ["Ναι", "Όχι"],
    category: "multiple-choice",
    required: true
  },
  {
    question: "Διαμένετε μόνιμα στην Ελλάδα;",
    options: ["Ναι", "Όχι"],
    category: "multiple-choice",
    required: true
  },
  {
    question: "Πόσα χρόνια διαμένετε μόνιμα στην Ελλάδα;",
    category: "textbox",
    required: true
  },
  {
    question: "Ποιο είναι το συνολικό ετήσιο οικογενειακό εισόδημά σας σε ευρώ;",
    category: "textbox",
    required: true
  },
  {
    question: "Είναι η οικογένειά σας μονογονεϊκή;",
    options: ["Ναι", "Όχι"],
    category: "multiple-choice",
    note: `
      <ul style="list-style-type: disc; padding-left:30px; text-align:left;">
        <li>Εφόσον η οικογένειά σας είναι μονογονεϊκή, πρέπει να ισχύουν και οι εξής προϋποθέσεις:
          <ul style="list-style-type: circle; padding-left:20px;">
            <li>Είστε υπεύθυνος/η επιμέλειας για τα εξαρτώμενα τέκνα.</li>
            <li>Υπάρχει σχετική δικαστική απόφαση για την επιμέλεια των τέκνων.</li>
          </ul>
        </li>
      </ul><br>`,
    required: true
  },
  {
    question: `Πόσα παιδιά έχετε ως εξαρτώμενα μέλη;`,
    category: "textbox",
    note: `  
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
    </ul><br>`,
    required: true
  },
];

export default questions;
