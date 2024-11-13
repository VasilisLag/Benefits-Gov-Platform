const questions = [
  {
    question: "Έχετε υποβάλει δήλωση φορολογίας εισοδήματος το τρέχον έτος;",
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
    question: "Ποιά είναι η οικογενειακή σας κατάσταση;",
    options: ["Άγαμος/η", "Έγγαμος/η - Σύμφωνο συμβίωσης", "Μονογονέας"],
    category: "dropdown",
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
      <li>Τέκνα που φοιτούν σε ανώτερη ή ανώτατη εκπαίδευση, έως το 24ο έτος</li>
      <li>Τέκνα με ποσοστό αναπηρίας 67% και άνω</li>
    </ul><br>`,
    required: true
  },
  {
    question: "Ποια είναι η συνολική αντικειμενική αξία της ακίνητης περιουσίας σας (βάσει ΕΝ.Φ.Ι.Α. 2023) σε ευρώ;",
    category: "textbox",
    note: `Αυτό αφορά τη συνολική αξία της περιουσίας του αιτούντος, του/της συζύγου ή μέρους συμφώνου συμβίωσης και εξαρτώμενων τέκνων.`,
    required: true
  },
  {
    question: "Ασκείτε επιχειρηματική δραστηριότητα;",
    options: ["Ναι", "Όχι"],
    category: "multiple-choice",
    required: true
  },
  {
    question: "Εάν ασκείτε επιχειρηματική δραστηριότητα, ποια είναι τα συνολικά ακαθάριστα έσοδά σας από αυτή τη δραστηριότητα σε ευρώ;",
    category: "textbox",
    note: `Αφορά τα συνολικά ακαθάριστα έσοδα του αιτούντος, του/της συζύγου ή μέρους συμφώνου συμβίωσης και των εξαρτώμενων τέκνων.`,
    required: false
  },
  {
    question: "Ποιός είναι ο Ταχυδρομικός Κώδικας της περιοχής που διαμένετε;",
    category: "textbox",
    required: true
  },
];

export default questions;
