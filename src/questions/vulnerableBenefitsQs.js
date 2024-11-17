const questions = [
  {
    question: "Διαμένετε μόνιμα στην Ελλάδα;",
    options: ["Ναι", "Όχι"],
    category: "multiple-choice",
    required: true
  },
  {
    question: "Πόσοι ενήλικες μένετε στο νοικοκυριό σας;",
    category: "textbox",
    required: true,
  },
  {
    question: "Πόσα ανήλικα μέλη έχετε ως εξαρτώμενα;",
    category: "textbox",
    required: true,
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
    </ul>`
  },
  {
    question: `Πόσα απροστάτευτα τέκνα έχετε στο νοικοκυριό σας;`,
    placeholder: "Αριθμός τέκνων",
    category: "textbox",
    note: `
      <p>Σημείωση:</p>
      <p> 
          <b>Απροστάτευτα τέκνα</b>: τα ανήλικα μέλη του νοικοκυριού που είναι 
          ορφανά και από τους δύο γονείς ή που κανείς γονέας δεν μπορεί να ασκήσει 
          τη γονική τους μέριμνα, λόγω ασθενείας, αναπηρίας, κράτησης ή στρατιωτικής θητείας και 
          που η επιμέλειά τους έχει ανατεθεί με δικαστική απόφαση σε μέλος του νοικοκυριού.
      </p>
    `,
    required: true,
  },
  {
    question: "Είστε μονογονεϊκή οικογένεια;",
    options: ["Ναι", "Όχι"],
    category: "multiple-choice",
    required: true
  },
  {
    question: "Στο νοικοκυριό σας υπάρχει μέλος ή μέλη με αναπηρία 67% και άνω;",
    options: ["Ναι", "Όχι"],
    category: "multiple-choice",
    note: `
      <p><strong>Σημείωση:</strong></p>
      <ul style="list-style-type: disc; padding-left:30px; text-align:left;">
        <li>Η αναπηρία πρέπει να είναι πιστοποιημένη με ποσοστό 67% και άνω.</li>
        <li>Εάν ισχύει, τα εισοδηματικά όρια του νοικοκυριού αυξάνονται κατά <strong>8.000 ευρώ</strong>.</li>
      </ul>
    `,
    required: true,
  },
  {
    question: "Στο νοικοκυριό σας υπάρχει μέλος ή μέλη που χρειάζονται μηχανική υποστήριξη κατ' οίκον με ιατρικές συσκευές;",
    options: ["Ναι", "Όχι"],
    category: "multiple-choice",
    note: `
      <p><strong>Σημείωση:</strong></p>
      <ul style="list-style-type: disc; padding-left:30px; text-align:left;">
        <li>Αφορά μέλη που χρειάζονται μηχανική υποστήριξη κατ' οίκον, κρίσιμη για τη ζωή τους.</li>
        <li>Εάν ισχύει, τα εισοδηματικά όρια του νοικοκυριού αυξάνονται κατά <strong>15.000 ευρώ</strong>.</li>
      </ul>
    `,
    required: true,
  },  
  {
    question: "Ποιο είναι το συνολικό εισόδημα του νοικοκυριού σας για τους τελευταίους 6 μήνες σε ευρώ;",
    category: "textbox",
    required: true,
    note: "Το εισόδημα αφορά όλα τα μέλη του νοικοκυριού, ενήλικα και ανήλικα."
  },
  {
    question: "Ποια είναι η συνολική φορολογητέα αξία της ακίνητης περιουσίας σας σε ευρώ;",
    category: "textbox",
    note: `
      <ul style="list-style-type: disc; padding-left:30px; text-align:left;">
        <li>Η συνολική φορολογητέα αξία αφορά:
          <ul style="list-style-type: circle; padding-left:20px;">
            <li>Την ακίνητη περιουσία του αιτούντος.</li>
            <li>Την ακίνητη περιουσία του/της συζύγου ή μέρους συμφώνου συμβίωσης.</li>
            <li>Την ακίνητη περιουσία των εξαρτώμενων τέκνων.</li>
          </ul>
        </li>
        <li>Το ποσό δεν μπορεί να υπερβαίνει:
          <ul style="list-style-type: circle; padding-left:20px;">
            <li>90.000 ευρώ για μονοπρόσωπο νοικοκυριό.</li>
            <li>+15.000 ευρώ για κάθε πρόσθετο μέλος.</li>
            <li>Έως 150.000 ευρώ συνολικά.</li>
          </ul>
        </li>
      </ul><br>`,
    required: true
  },
  {
    question: "Ποια είναι η συνολική αντικειμενική δαπάνη των επιβατικών αυτοκινήτων σας (Ι.Χ./Μ.Χ.) σε ευρώ;",
    category: "textbox",
    note: `
      <ul style="list-style-type: disc; padding-left:30px; text-align:left;">
        <li>Το ποσό υπολογίζεται βάσει της τελευταίας πράξης προσδιορισμού φόρου.</li>
        <li>Η αντικειμενική δαπάνη αφορά:
          <ul style="list-style-type: circle; padding-left:20px;">
            <li>Επιβατικά αυτοκίνητα Ιδιωτικής Χρήσης (Ι.Χ.).</li>
            <li>Επιβατικά αυτοκίνητα Μικτής Χρήσης (Μ.Χ.).</li>
          </ul>
        </li>
        <li>Η συνολική αντικειμενική δαπάνη δεν μπορεί να υπερβαίνει το ποσό των 6.000 ευρώ.</li>
      </ul><br>`,
    required: true
  },
  {
    question: "Ποια είναι η συνολική αξία των καταθέσεων, μετοχών, ομολόγων κ.τ.λ. του νοικοκυριού σας σε ευρώ;",
    category: "textbox",
    note: `
      <ul style="list-style-type: disc; padding-left:30px; text-align:left;">
        <li>Οι πληροφορίες αντλούνται από την τελευταία πράξη προσδιορισμού φόρου.</li>
        <li>Η συνολική αξία περιλαμβάνει:
          <ul style="list-style-type: circle; padding-left:20px;">
            <li>Τόκους καταθέσεων των μελών του νοικοκυριού.</li>
            <li>Αξία μετοχών, ομολόγων και άλλων χρηματοοικονομικών προϊόντων.</li>
          </ul>
        </li>
      </ul><br>`,
    required: true
  },
  {
    question: "Διαθέτετε κάποιο από τα παρακάτω στοιχεία που αποκλείουν το επίδομα;",
    options: [
      "Όχι, δεν διαθέτω κάποιο από τα παραπάνω",
      "Αμοιβές πληρωμάτων σκαφών αναψυχής",
      "Δαπάνες για δίδακτρα σε ιδιωτικά σχολεία",
      "Οικιακούς βοηθούς, οδηγούς ή δασκάλους",
    ],
    category: "dropdown",
    required: true,
  },
];

export default questions;
