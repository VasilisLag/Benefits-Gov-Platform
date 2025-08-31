const questions = [
  {
    key: "submittedTaxDeclaration",
    question: "Είστε υπόχρεος/η υποβολής φορολογικής δήλωσης;",
    options: [
      "Ναι",
      "Όχι"
    ],
    category: "radio",
    tag: "profile",
    answer: null,
    eligibility: {
      kea: {
        type: "match",
        value: "Ναι",
        disqualifyReason: "Απαιτείται να έχει υποβληθεί φορολογική δήλωση."
      },
      kot: {
        type: "match",
        value: "Ναι",
        disqualifyReason: "Απαιτείται να έχει υποβληθεί φορολογική δήλωση."
      },
    }
  },
  {
    key: "residesInGreece",
    question: "Διαμένετε μόνιμα στην Ελλάδα;",
    options: ["Ναι", "Όχι"],
    category: "radio",
    tag: "profile",
    answer: null,
    benefitTags: ["kea", "kot"],
    eligibility: {
      kea: {
        type: "match",
        value: "Ναι",
        disqualifyReason: "Απαιτείται μόνιμη κατοικία στην Ελλάδα."
      },
      kot: {
        type: "match",
        value: "Ναι",
        disqualifyReason: "Απαιτείται μόνιμη κατοικία στην Ελλάδα."
      }
    }
  },
  {
    key: "adults",
    question: "Απο πόσα ενήλικα μέλη αποτελείται το νοικοκυριό σας;",
    category: "textbox",
    tag: "family",
    answer: null,
    benefitTags: ["kea", "kot"],
    eligibility: {
      kea: {
        type: "range",
        min: 1,
        disqualifyReason: "Πρέπει να υπάρχει τουλάχιστον ένας ενήλικας στο νοικοκυριό."
      },
      kot: {
        type: "range",
        min: 1,
        disqualifyReason: "Πρέπει να υπάρχει τουλάχιστον ένας ενήλικας στο νοικοκυριό."
      }
    }
  },
  {
    key: "dependentChildren",
    question: "Πόσα ανήλικα μέλη έχετε ως εξαρτώμενα;",
    category: "textbox",
    note: `  
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
    `,
    tag: "family",
    answer: null,
    benefitTags: ["kea", "kot"],
  },
  {
    key: "unsupportedChildren",
    question: `Πόσα απροστάτευτα τέκνα έχετε στο νοικοκυριό σας;`,
    placeholder: "Αριθμός τέκνων",
    category: "textbox",
    note:`
      <p class="govgr-body" style = text-align:left;> 
        Τα ανήλικα μέλη του νοικοκυριού που είναι 
        ορφανά και από τους δύο γονείς ή που κανείς γονέας δεν μπορεί να ασκήσει 
        τη γονική τους μέριμνα, λόγω ασθενείας, αναπηρίας, κράτησης ή στρατιωτικής θητείας και 
        που η επιμέλειά τους έχει ανατεθεί με δικαστική απόφαση σε μέλος του νοικοκυριού.
      </p>
    `,
    tag: "family",
    answer: null,
    benefitTags: ["kea", "kot"],
  },
  {
    key: "isSingleParent",
    question: "Είστε μονογονεϊκή οικογένεια;",
    options: ["Ναι", "Όχι"],
    category: "radio",
    tag: "family",
    answer: null,
    benefitTags: ["kea"],
  },
  {
    key: "vulnerableCategory",
    question: "Υπάρχει μέλος ή μέλη στο νοικοκυριό σας που ανήκουν σε κάποια απο τις παρακάτω ευάλωτες κατηγορίες;",
    category: "radio",
    options: ["Όχι δεν υπάρχουν", "Αναπηρία 67% και άνω", "Χρειάζονται μηχανική υποστήριξη κατ' οίκον με ιατρικές συσκευές"],
    note: `
      <ul style="list-style-type: disc; padding-left:30px; text-align:left;">
        <li>Εάν υπάρχει μέλος με αναπηρία 67% και άνω, τα εισοδηματικά όρια του νοικοκυριού αυξάνονται κατά <strong>8.000 ευρώ</strong>.</li>
        <li>Εάν υπάρχει μέλος που χρήζει μηναχικής υποστήριξης κατ' οίκον, τα εισοδηματικά όρια του νοικοκυριού αυξάνονται κατά <strong>15.000 ευρώ</strong>.</li>
      </ul>
    `,
    tag: "special-needs",
    answer: null,
    benefitTags: ["kot"],
  },
  {
    key: "income",
    question: "Ποιο είναι το συνολικό ετήσιο εισόδημά όλων των μελών του νοικοκυριού;",
    category: "textbox",
    tag: "income",
    answer: null,
    benefitTags: ["kot"],
    eligibility: {
      kot: {
        type: "formula",
        formulaKey: "kotIncomeThresholdFormula"
      }
    }
  },
  {
    key: "income6m",
    question: "Ποιο είναι το συνολικό εισόδημα του νοικοκυριού σας για τους τελευταίους 6 μήνες σε ευρώ;",
    category: "textbox",
    note: `
      <p class="govgr-body" style = text-align:left;> 
        Το εισόδημα αφορά όλα τα μέλη του νοικοκυριού, ενήλικα και ανήλικα.
      </p>
    `,
    tag: "income",
    answer: null,
    benefitTags: ["kea"],
    eligibility: {
      kea: {
        type: "formula",
        formulaKey: "keaIncomeThresholdFormula"
      }
    }
  },
  {
    key: "propertyValue",
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
      </ul>
    `,
    tag: "assets",
    answer: null,
    benefitTags: ["kea", "kot"],
    eligibility: {
      kea: {
        type: "formula",
        formulaKey: "keaPropertyThresholdFormula"
      },
      kot: {
        type: "formula",
        formulaKey: "kotPropertyThresholdFormula"
      }
    }
  },
  {
    key: "vehicleValue",
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
      </ul>
    `,
    tag: "assets",
    answer: null,
    benefitTags: ["kea"],
    eligibility: {
      kea: {
        type: "formula",
        formulaKey: "keaVehicleThresholdFormula"
      }
    }
  },
  {
    key: "savings",
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
      </ul>
    `,
    tag: "assets",
    answer: null,
    benefitTags: ["kea"],
    eligibility: {
      kea: {
        type: "formula",
        formulaKey: "keaSavingsThresholdFormula"
      }
    }
  },
  {
    key: "luxuryBelonging",
    question: "Διαθέτετε κάποιο από τα παρακάτω στοιχεία που αποκλείουν το επίδομα;",
    options: [
      "Όχι, δεν διαθέτω κάποιο από τα παρακάτω",
      "Αμοιβές πληρωμάτων σκαφών αναψυχής",
      "Δαπάνες για δίδακτρα σε ιδιωτικά σχολεία",
      "Οικιακούς βοηθούς, οδηγούς ή δασκάλους",
    ],
    category: "radio",
    tag: "assets",
    answer: null,
    benefitTags: ["kea", "kot"],
    eligibility: {
      kea: {
        type: "match",
        value: "Όχι, δεν διαθέτω κάποιο από τα παρακάτω",
        disqualifyReason: "Αποκλείεστε από το Ελάχιστο Εγγυημένο Εισόδημα λόγω κατοχής πολυτελών αγαθών."
      },
      kot: {
        type: "match",
        value: "Όχι, δεν διαθέτω κάποιο από τα παρακάτω",
        disqualifyReason: "Αποκλείεστε από το Κοινωνικό Οικιακό Τιμολόγιο λόγω κατοχής πολυτελών αγαθών."
      }
    }
  },
];

export default questions;
