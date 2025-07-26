const questions = [
  // Φορολογική δήλωση
  {
    key: "submittedTaxDeclaration",
    question: "Έχετε υποβάλει δήλωση φορολογίας εισοδήματος το τρέχον έτος;",
    options: ["Ναι", "Όχι"],
    category: "radio",
    required: true,
    tag: "demography",
    answer: null,
    benefitTags: ["childrenBenefit", "heatingBenefit", "housingBenefit", "kea", "kot"],
    eligibility: {
      childrenBenefit: {
        type: "match",
        value: "Ναι",
        disqualifyReason: "Απαιτείται να έχει υποβληθεί φορολογική δήλωση."
      },
      heatingBenefit: {
        type: "match",
        value: "Ναι",
        disqualifyReason: "Απαιτείται να έχει υποβληθεί φορολογική δήλωση."
      },
      housingBenefit: {
        type: "match",
        value: "Ναι",
        disqualifyReason: "Απαιτείται να έχει υποβληθεί φορολογική δήλωση."
      },
      kea: {
        type: "match",
        value: "Ναι",
        disqualifyReason: "Απαιτείται να έχει υποβληθεί φορολογική δήλωση."
      },
    kot: {
        type: "match",
        value: "Ναι",
        disqualifyReason: "Απαιτείται να έχει υποβληθεί φορολογική δήλωση."
      }
    }
  },
  // Μόνιμη κατοικία στην Ελλάδα
  {
    key: "residesInGreece",
    question: "Διαμένετε μόνιμα στην Ελλάδα;",
    options: ["Ναι", "Όχι"],
    category: "radio",
    required: true,
    tag: "demography",
    answer: null,
    benefitTags: ["childrenBenefit", "heatingBenefit", "kot", "kea"],
    eligibility: {
      childrenBenefit: {
        type: "match",
        value: "Ναι",
        disqualifyReason: "Απαιτείται μόνιμη κατοικία στην Ελλάδα."
      },
      heatingBenefit: {
        type: "match",
        value: "Ναι",
        disqualifyReason: "Απαιτείται μόνιμη κατοικία στην Ελλάδα."
      },
      housingBenefit: {
        type: "match",
        value: "Ναι",
        disqualifyReason: "Απαιτείται μόνιμη κατοικία στην Ελλάδα."
      },
      kea: {
        type: "match",
        value: "Ναι",
        disqualifyReason: "Απαιτείται μόνιμη κατοικία στην Ελλάδα."
      },
      kot: {
        type: "match",
        value: "Ναι",
        disqualifyReason: "Απαιτείται μόνιμη κατοικία στην Ελλάδα."
      },

    },
    note: `
      <details class="govgr-details">
        <summary class="govgr-details__summary"> Βοήθεια </summary>
        <div class="govgr-details__content">
          <p class="govgr-body" style = text-align:left;>
            Πρέπει να διαμένετε στην Ελλάδα κατά τα τελευταία, 5 τουλάχιστον, έτη.
          </p>
        </div>
      </details>
    `
  },
  // Ετήσιο οικογενειακό εισόδημα
  {
    key: "income",
    question: "Ποιο είναι το συνολικό ετήσιο οικογενειακό εισόδημά σας σε ευρώ;",
    category: "textbox",
    required: true,
    tag: "income",
    answer: null,
    benefitTags: ["childrenBenefit", "heatingBenefit", "housingBenefit", "kot"],
    eligibility: {
      childrenBenefit: {
        type: "formula",
        formulaKey: "childrenBenefitIncomeFormula"
      },
      heatingBenefit: {
        type: "formula",
        formulaKey: "heatingIncomeThresholdFormula"
      },
      housingBenefit: {
        type: "formula",
        formulaKey: "housingIncomeThresholdFormula",
        disqualifyReason: "Το εισόδημά σας υπερβαίνει το επιτρεπτό όριο για το επίδομα στέγασης."
      },
      kot: {
        type: "formula",
        formulaKey: "kotIncomeThresholdFormula"
      }
    }
  },
  // Επιχειρηματική δραστηριότητα
  {
    key: "isBusinessOwner",
    question: "Ασκείτε επιχειρηματική δραστηριότητα;",
    options: ["Ναι", "Όχι"],
    category: "radio",
    required: true,
    tag: "income",
    answer: null,
    benefitTags: ["heatingBenefit"]
  },
  {
    key: "businessIncome",
    question: "Εάν ασκείτε επιχειρηματική δραστηριότητα, ποια είναι τα συνολικά ακαθάριστα έσοδά σας από αυτή τη δραστηριότητα σε ευρώ;",
    category: "textbox",
    note: `
      <details class="govgr-details">
        <summary class="govgr-details__summary"> Βοήθεια</summary>
        <div class="govgr-details__content">
          <p class="govgr-body" style = text-align:left;> 
            Αφορά τα συνολικά ακαθάριστα έσοδα του αιτούντος, του/της συζύγου ή μέρους συμφώνου συμβίωσης και των εξαρτώμενων τέκνων.
          </p>
        </div>
      </details>
    `,
    required: false,
    tag: "income",
    answer: null,
    benefitTags: ["heatingBenefit"],
    showIf: { key: "isBusinessOwner", value: "Ναι" },
    eligibility: {
      heatingBenefit: {
        type: "formula",
        formulaKey: "heatingBusinessIncomeFormula"
      }
    }
  },
  // Οικογενειακή κατάσταση
  {
    key: "maritalStatus",
    question: "Ποιά είναι η οικογενειακή σας κατάσταση;",
    options: ["Άγαμος/η", "Έγγαμος/η - Σύμφωνο συμβίωσης", "Μονογονέας"],
    category: "dropdown",
    required: true,
    tag: "household",
    answer: null,
    benefitTags: ["heatingBenefit", "childrenBenefit", "housingBenefit", "kea"]
  },
  // Εξαρτώμενα τέκνα
  {
    key: "dependentChildren",
    question: "Πόσα παιδιά έχετε ως εξαρτώμενα μέλη;",
    category: "textbox",
    required: true,
    tag: "household",
    answer: null,
    benefitTags: ["childrenBenefit", "heatingBenefit", "housingBenefit", "kea", "kot"],
    note: `
      <details class="govgr-details">
        <summary class="govgr-details__summary"> Βοήθεια</summary>
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
    eligibility: {
      childrenBenefit: {
        type: "range",
        min: 1,
        disqualifyReason: "Δεν έχετε δηλώσει εξαρτώμενα τέκνα."
      }
    }
  },
  // Απροστάτευτα τέκνα
  {
    key: "unsupportedChildren",
    question: "Πόσα απροστάτευτα τέκνα έχετε στο νοικοκυριό σας;(αν έχετε)",
    category: "textbox",
    required: false,
    tag: "household",
    answer: null,
    benefitTags: ["housingBenefit", "kea", "kot"],
    note: `
      <details class="govgr-details">
        <summary class="govgr-details__summary"> Βοήθεια</summary>
        <div class="govgr-details__content">
          <p class="govgr-body" style = text-align:left;> 
            Τα ανήλικα μέλη του νοικοκυριού που είναι 
            ορφανά και από τους δύο γονείς ή που κανείς γονέας δεν μπορεί να ασκήσει 
            τη γονική τους μέριμνα, λόγω ασθενείας, αναπηρίας, κράτησης ή στρατιωτικής θητείας και 
            που η επιμέλειά τους έχει ανατεθεί με δικαστική απόφαση σε μέλος του νοικοκυριού.
          </p>
        </div>
      </details>
    `
  },
  // Φιλοξενούμενα μέλη
  {
    key: "hostedPersons",
    question: "Πόσα φιλοξενούμενα μέλη έχετε στο νοικοκυριό σας;(αν έχετε)",
    category: "textbox",
    required: false,
    tag: "household",
    answer: null,
    benefitTags: ["housingBenefit", "kea", "kot"]
  },
  // Τόπος διαμονής
  {
    key: "area",
    question: "Ποιός είναι ο τόπος διαμονής σας;",
    category: "geo-dropdown",
    required: true,
    tag: "household",
    answer: null,
    benefitTags: ["heatingBenefit"]
  },
  // Πηγή θέρμανσης
  {
    key: "heatingSource",
    question: "Ποιός είναι η πηγή θέρμανσης για την οποία επιθυμείτε επιδότηση;",
    category: "dropdown",
    options: ["Ηλεκτρικό Ρεύμα", "Φυσικό Αέριο", "Πετρέλαιο/Φωτιστικό Πετρέλαιο/Υγραέριο", "Βιομάζα (Πέλετ)","Τηλεθέρμανση/Καυσόξυλα"],
    required: true,
    tag: "household",
    answer: null,
    benefitTags: ["heatingBenefit"]
  },
  // Ενεργό μισθωτήριο συμβόλαιο
  {
    key: "activeRent",
    question: "Έχετε ενεργό μισθωτήριο συμβόλαιο για την κύρια κατοικία σας;",
    options: ["Ναι", "Όχι"],
    category: "radio",
    required: true,
    tag: "household",
    answer: null,
    benefitTags: ["housingBenefit"],
    eligibility: {
      housingBenefit: {
        type: "match",
        value: "Ναι",
        disqualifyReason: "Απαιτείται ενεργό μισθωτήριο συμβόλαιο για την κύρια κατοικία."
      }
    }
  },
  // Μηνιαίο ποσό ενοικίου
  {
    key: "rent",
    question: "Ποιο είναι το μηνιαίο ποσό ενοικίου που καταβάλλετε σε ευρώ;",
    category: "textbox",
    required: true,
    tag: "household",
    answer: null,
    benefitTags: ["housingBenefit"]
  },
  // Αξία ακίνητης περιουσίας
  {
    key: "propertyValue",
    question: "Ποια είναι η συνολική αντικειμενική αξία της ακίνητης περιουσίας σας (βάσει ΕΝ.Φ.Ι.Α. 2024) σε ευρώ;",
    category: "textbox",
    required: true,
    tag: "assets",
    answer: null,
    benefitTags: ["heatingBenefit", "housingBenefit", "kea", "kot"],
    note: `
      <details class="govgr-details">
        <summary class="govgr-details__summary"> Βοήθεια</summary>
        <div class="govgr-details__content">
          <ul style="list-style-type: disc; padding-left:30px; text-align:left;">
            <li>Η συνολική φορολογητέα αξία αφορά όλα τα ακίνητα που ανήκουν στα μέλη του νοικοκυριού.</li>
            <li>Για μονοπρόσωπο νοικοκυριό, το όριο είναι 120.000€.</li>
            <li>Προσαυξάνεται κατά 15.000€ για κάθε πρόσθετο μέλος του νοικοκυριού έως τα 180.000€.</li>
          </ul>
        </div>
      </details>
    `,
    eligibility: {
      heatingBenefit: {
        type: "formula",
        formulaKey: "heatingPropertyThresholdFormula"
      },
      housingBenefit: {
        type: "formula",
        formulaKey: "housingPropertyThresholdFormula",
        disqualifyReason: "Η αξία της ακίνητης περιουσίας σας υπερβαίνει το επιτρεπτό όριο για το επίδομα στέγασης."
      },
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
  // Καταθέσεις, μετοχές, ομόλογα
  {
    key: "savings",
    question: "Ποιο είναι το συνολικό ποσό καταθέσεων, μετοχών, ομολόγων και λοιπών περιουσιακών στοιχείων σας σε ευρώ;",
    category: "textbox",
    required: true,
    tag: "assets",
    answer: null,
    benefitTags: ["housingBenefit", "kea"],
    note: `
      <details class="govgr-details">
        <summary class="govgr-details__summary"> Βοήθεια</summary>
        <div class="govgr-details__content">
          <ul style="list-style-type: disc; padding-left:30px; text-align:left;">
            <li>Συμπεριλαμβάνονται καταθέσεις, μετοχές και ομόλογα σε Ελλάδα και εξωτερικό.</li>
            <li>Για μονοπρόσωπο νοικοκυριό, το όριο είναι 7.000€.</li>
            <li>Προσαυξάνεται κατά 3.500€ για κάθε πρόσθετο μέλος του νοικοκυριού.</li>
          </ul>
        </div>
      </details>
    `,
    eligibility: {
      housingBenefit: {
        type: "formula",
        formulaKey: "housingSavingsThresholdFormula",
        disqualifyReason: "Οι καταθέσεις σας υπερβαίνουν το επιτρεπτό όριο για το επίδομα στέγασης."
      },
      kea: {
        type: "formula",
        formulaKey: "keaSavingsThresholdFormula"
      }
    }
  },
  // Αξία οχημάτων
  {
    key: "vehicleValue",
    question: "Ποια είναι η συνολική αντικειμενική δαπάνη των επιβατικών αυτοκινήτων σας (Ι.Χ./Μ.Χ.) σε ευρώ;",
    category: "textbox",
    required: true,
    tag: "assets",
    answer: null,
    benefitTags: ["kea"],
    note: `
      <details class="govgr-details">
        <summary class="govgr-details__summary"> Βοήθεια</summary>
        <div class="govgr-details__content">
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
        </div>
      </details>
    `,
    eligibility: {
      kea: {
        type: "formula",
        formulaKey: "keaVehicleThresholdFormula"
      }
    }
  },
  // Πολυτελή αγαθά
  {
    key: "luxuryBelonging",
    question: "Διαθέτετε κάποιο από τα παρακάτω στοιχεία που αποκλείουν το επίδομα;",
    options: [
      "Όχι, δεν διαθέτω κάποιο από τα παρακάτω",
      "Αμοιβές πληρωμάτων σκαφών αναψυχής",
      "Δαπάνες για δίδακτρα άνω των 1.500€ σε ιδιωτικά σχολεία",
      "Οικιακούς βοηθούς, οδηγούς ή δασκάλους",
    ],
    category: "radio",
    required: true,
    tag: "assets",
    answer: null,
    benefitTags: ["housingBenefit", "vulnerableBenefits"],
    eligibility: {
      housingBenefit: {
        type: "match",
        value: "Όχι, δεν διαθέτω κάποιο από τα παρακάτω",
        disqualifyReason: "Διαθέτετε αποκλειστικά περιουσιακά στοιχεία που αποκλείουν το επίδομα."
      },
      kea: {
        type: "match",
        value: "Όχι, δεν διαθέτω κάποιο από τα παρακάτω",
        disqualifyReason: "Αποκλείεστε από το Ελάχιστο Εγγυημένο Εισόδημα λόγω κατοχής πολυτελών αγαθών."
      },
      kot: {
        type: "match",
        value: "Όχι, δεν διαθέτω κάποιο από τα παρακάτω",
        disqualifyReason: "Αποκλείεστε από το Ελάχιστο Εγγυημένο Εισόδημα λόγω κατοχής πολυτελών αγαθών."
      },
    }
  },
  // Ευάλωτες κατηγορίες
  {
    key: "vulnerableCategory",
    question: "Υπάρχει μέλος ή μέλη στο νοικοκυριό σας που ανήκουν σε κάποια απο τις παρακάτω ευάλωτες κατηγορίες;",
    category: "radio",
    options: ["Όχι δεν υπάρχουν", "Αναπηρία 67% και άνω", "Χρειάζονται μηχανική υποστήριξη κατ' οίκον με ιατρικές συσκευές"],
    required: true,
    tag: "vulnerable",
    answer: null,
    benefitTags: ["kot"],
    note: `
      <details class="govgr-details">
        <summary class="govgr-details__summary"> Βοήθεια</summary>
        <div class="govgr-details__content">
          <ul style="list-style-type: disc; padding-left:30px; text-align:left;">
            <li>Εάν υπάρχει μέλος με αναπηρία 67% και άνω, τα εισοδηματικά όρια του νοικοκυριού αυξάνονται κατά <strong>8.000 ευρώ</strong>.</li>
            <li>Εάν υπάρχει μέλος που χρήζει μηναχικής υποστήριξης κατ' οίκον, τα εισοδηματικά όρια του νοικοκυριού αυξάνονται κατά <strong>15.000 ευρώ</strong>.</li>
          </ul>
        </div>
      </details>
    `
  },
  // Εισόδημα τελευταίων 6 μηνών
  {
    key: "income6m",
    question: "Ποιο είναι το συνολικό εισόδημα του νοικοκυριού σας για τους τελευταίους 6 μήνες σε ευρώ;",
    category: "textbox",
    required: true,
    tag: "income",
    answer: null,
    benefitTags: ["kea"],
    note: `
      <details class="govgr-details">
        <summary class="govgr-details__summary"> Βοήθεια</summary>
        <div class="govgr-details__content">
          <p class="govgr-body" style = text-align:left;> 
            Το εισόδημα αφορά όλα τα μέλη του νοικοκυριού, ενήλικα και ανήλικα.
          </p>
        </div>
      </details>
    `,
    eligibility: {
      kea: {
        type: "formula",
        formulaKey: "keaIncomeThresholdFormula"
      }
    }
  }
];

export default questions;