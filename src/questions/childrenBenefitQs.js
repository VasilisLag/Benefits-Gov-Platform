const questions = [
  {
    key: "submittedTaxDeclaration",
    question: "Έχετε υποβάλει δήλωση φορολογίας εισοδήματος το τρέχον έτος;",
    options: [
      "Ναι",
      "Όχι"
    ],
    category: "radio",
    tag: "profile",
    answer: null,
    eligibility: {
      childrenBenefit: {
        type: "match",
        value: "Ναι",
        disqualifyReason: "Απαιτείται να έχει υποβληθεί φορολογική δήλωση."
      }
    }
  },
  {
    key: "residesInGreece",
    question: "Διαμένετε μόνιμα στην Ελλάδα;",
    options: [
      "Ναι",
      "Όχι"
    ],
    category: "radio",
    tag: "profile",
    answer: null,
    eligibility: {
      childrenBenefit: {
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
      childrenBenefit: {
        type: "formula",
        formulaKey: "childrenBenefitIncomeFormula", 
      }
    }
  },
  {
    key: "isSingleParent",
    question: "Είναι η οικογένειά σας μονογονεϊκή;",
    options: [
      "Ναι",
      "Όχι"
    ],
    category: "radio",
    tag: "family",
    answer: null,
    note: `
      <details class="govgr-details">
        <summary class="govgr-details__summary"> Βοήθεια</summary>
        <div class="govgr-details__content">
          <p class="govgr-body">
            <ul style="list-style-type: disc; padding-left:20px; text-align:left;">
              <li>Είστε υπεύθυνος/η επιμέλειας για τα εξαρτώμενα τέκνα.</li>
              <li>Υπάρχει σχετική δικαστική απόφαση για την επιμέλεια των τέκνων.</li>
            </ul>
          </p>
        </div>
      </details>`
  },
  {
    key: "dependentChildren",
    question: "Πόσα παιδιά έχετε ως εξαρτώμενα μέλη;",
    category: "textbox",
    tag: "family",
    answer: null,
    note: `  
      <details class="govgr-details">
        <summary class="govgr-details__summary"> Βοήθεια</summary>
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
              <li>Ορφανά τέκνα που αποτελούν ιδία οικογένεια (όταν έχει επέλθει θάνατος και των δύο γονέων)</li>
            </ul>
          </p>
        </div>
      </details>`
    ,
    eligibility: {
      childrenBenefit: {
        type: "range",
        min: 1,
        disqualifyReason: "Δεν έχετε δηλώσει εξαρτώμενα τέκνα."
      }
    }
  }
]

export default questions;