export default[
  {
    key: "submittedTaxDeclaration",
    question: "Έχετε υποβάλει δήλωση φορολογίας εισοδήματος το τρέχον έτος;",
    options: ["Ναι", "Όχι"],
    category: "radio",
    tag: "demography",
    answer: null,
    eligibility: {
      housingBenefit: {
        type: "match",
        value: "Ναι",
        disqualifyReason: "Απαιτείται να έχει υποβληθεί φορολογική δήλωση."
      }
    }
  },
  {
    key: "residesInGreece",
    question: "Διαμένετε μόνιμα στην Ελλάδα;",
    options: ["Ναι", "Όχι"],
    category: "radio",
    note: `
      <details class="govgr-details">
        <summary class="govgr-details__summary"> Βοήθεια </summary>
        <div class="govgr-details__content">
          <p class="govgr-body" style = text-align:left;>
            Πρέπει να διαμένετε στην Ελλάδα κατά τα τελευταία, 5 τουλάχιστον, έτη.
          </p>
        </div>
      </details>
    `,
    tag: "demography",
    answer: null,
    eligibility: {
      housingBenefit: {
        type: "match",
        value: "Ναι",
        disqualifyReason: "Απαιτείται μόνιμη κατοικία στην Ελλάδα."
      }
    }
  },
  {
    key: "income",
    question: "Ποιο είναι το συνολικό ετήσιο οικογενειακό εισόδημά σας σε ευρώ;",
    category: "textbox",
    tag: "income",
    answer: null,
    eligibility: {
      housingBenefit: {
        type: "formula",
        formulaKey: "housingIncomeThresholdFormula",
        disqualifyReason: "Το εισόδημά σας υπερβαίνει το επιτρεπτό όριο για το επίδομα στέγασης."
      }
    }
  },
  {
    key: "activeRent",
    question: "Έχετε ενεργό μισθωτήριο συμβόλαιο για την κύρια κατοικία σας;",
    options: ["Ναι", "Όχι"],
    category: "radio",
    tag: "household",
    answer: null,
    eligibility: {
      housingBenefit: {
        type: "match",
        value: "Ναι",
        disqualifyReason: "Απαιτείται ενεργό μισθωτήριο συμβόλαιο για την κύρια κατοικία."
      }
    }
  },
  {
    key: "rent",
    question: "Ποιο είναι το μηνιαίο ποσό ενοικίου που καταβάλλετε σε ευρώ;",
    category: "textbox",
    tag: "household",
    answer: null
  },
  {
    key: "isSingleParent",
    question: "Είναι η οικογένειά σας μονογονεϊκή;",
    options: ["Ναι", "Όχι"],
    category: "radio",
    tag: "household",
    answer: null
  },
  {
    key: "dependentChildren",
    question: `Πόσα εξαρτώμενα τέκνα έχετε στο νοικοκυριό σας;(αν έχετε)`,
    category: "textbox",
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
    tag: "household",
    answer: null
  },
  {
    key: "unsupportedChildren",
    question: `Πόσα απροστάτευτα τέκνα έχετε στο νοικοκυριό σας;(αν έχετε)` ,
    category: "textbox",
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
    `,
    tag: "household",
    answer: null
  },
  {
    key: "hostedPersons",
    question: `Πόσα φιλοξενούμενα μέλη έχετε στο νοικοκυριό σας;(αν έχετε)` ,
    category: "textbox",
    tag: "household",
    answer: null
  },
  {
    key: "propertyValue",
    question: "Ποια είναι η συνολική αντικειμενική αξία της ακίνητης περιουσίας σας (βάσει ΕΝ.Φ.Ι.Α. 2024) σε ευρώ;",
    category: "textbox",
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
    tag: "assets",
    answer: null
    ,
    eligibility: {
      housingBenefit: {
        type: "formula",
        formulaKey: "housingPropertyThresholdFormula",
        disqualifyReason: "Η αξία της ακίνητης περιουσίας σας υπερβαίνει το επιτρεπτό όριο για το επίδομα στέγασης."
      }
    }
  },
  {
    key: "savings",
    question: "Ποιο είναι το συνολικό ποσό καταθέσεων, μετοχών, ομολόγων και λοιπών περιουσιακών στοιχείων σας σε ευρώ;",
    category: "textbox",
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
    tag: "assets",
    answer: null
    ,
    eligibility: {
      housingBenefit: {
        type: "formula",
        formulaKey: "housingSavingsThresholdFormula",
        disqualifyReason: "Οι καταθέσεις σας υπερβαίνουν το επιτρεπτό όριο για το επίδομα στέγασης."
      }
    }
  },
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
    tag: "assets",
    answer: null,
    eligibility: {
      housingBenefit: {
        type: "match",
        value: "Όχι, δεν διαθέτω κάποιο από τα παρακάτω",
        disqualifyReason: "Διαθέτετε αποκλειστικά περιουσιακά στοιχεία που αποκλείουν το επίδομα."
      }
    }
  }
];