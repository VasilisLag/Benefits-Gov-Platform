const questions = [
  {
    key: "submittedTaxDeclaration",
    question: "Είστε υπόχρεος/η υποβολής φορολογικής δήλωσης;",
    options: ["Ναι", "Όχι"],
    category: "radio",
    tag: "profile",
    answer: null,
    eligibility: {
      heatingBenefit: {
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
      <p class="govgr-body" style = text-align:left;>
        Πρέπει να διαμένετε στην Ελλάδα κατά τα τελευταία, 5 τουλάχιστον, έτη.
      </p>
    `,
    tag: "profile",
    answer: null,
    eligibility: {
      heatingBenefit: {
        type: "match",
        value: "Ναι",
        disqualifyReason: "Απαιτείται μόνιμη κατοικία στην Ελλάδα."
      }
    }
  },
  {
    key: "income",
    question: "Ποιο είναι το συνολικό ετήσιο οικογενειακό εισόδημά σας σε ευρώ(βάσει της τελευταίας υποβληθείσας φορολογικής δήλωσης);",
    category: "textbox",
    tag: "income",
    answer: null,
    eligibility: {
      heatingBenefit: {
        type: "formula",
        formulaKey: "heatingIncomeThresholdFormula",
      }
    }
  },
  {
    key: "isBusinessOwner",
    question: "Ασκείτε επιχειρηματική δραστηριότητα;",
    options: ["Ναι", "Όχι"],
    category: "radio",
    tag: "income",
    answer: null,
  },
  {
    key: "businessIncome",
    question: "Ποια είναι τα συνολικά ακαθάριστα έσοδά σας από την επιχειρηματική δραστηριότητα σε ευρώ;",
    category: "textbox",
    note: `
      <p class="govgr-body" style = text-align:left;> 
        Αφορά τα συνολικά ακαθάριστα έσοδα του αιτούντος, του/της συζύγου ή μέρους συμφώνου συμβίωσης και των εξαρτώμενων τέκνων.
      </p>
    `,
    tag: "income",
    answer: null,
    showIf: { key: "isBusinessOwner", value: "Ναι" },
    eligibility: {
      heatingBenefit: {
        type: "formula",
        formulaKey: "heatingBusinessIncomeFormula",
      }
    }
  },
  {
    key: "propertyValue",
    question: "Ποια είναι η συνολική αντικειμενική αξία της ακίνητης περιουσίας σας (βάσει του πιο πρόσφατου ΕΝ.Φ.Ι.Α.) σε ευρώ;",
    category: "textbox",
    note: `
      <p class="govgr-body" style = text-align:left;> 
        Αυτό αφορά τη συνολική αξία της περιουσίας του αιτούντος, του/της συζύγου ή μέρους συμφώνου συμβίωσης και εξαρτώμενων τέκνων.
      </p>
    `,
    tag: "assets",
    answer: null,
    eligibility: {
      heatingBenefit: {
        type: "formula",
        formulaKey: "heatingPropertyThresholdFormula",
      }
    }
  },
  {
    key: "maritalStatus",
    question: "Ποιά είναι η οικογενειακή σας κατάσταση;",
    options: ["Άγαμος/η", "Έγγαμος/η - Σύμφωνο συμβίωσης", "Μονογονέας"],
    category: "dropdown",
    tag: "family",
    answer: null
  },
  {
    key: "dependentChildren",
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
        <li>Τέκνα που φοιτούν σε ανώτερη ή ανώτατη εκπαίδευση έως το 24ο έτος</li>
        <li>Τέκνα με ποσοστό αναπηρίας 67% και άνω</li>
        <li>Ορφανά τέκνα που αποτελούν ιδία οικογένεια</li>
      </ul>
    `,
    tag: "family",
    answer: null
  },
  {
    key: "area",
    question: "Ποιός είναι ο τόπος διαμονής σας;",
    category: "geo-dropdown",
    tag: "housing",
    answer: null
  },
  {
    key: "heatingSource",
    question: "Ποιός είναι η πηγή θέρμανσης για την οποία επιθυμείτε επιδότηση;",
    category: "dropdown",
    options: ["Ηλεκτρικό Ρεύμα", "Φυσικό Αέριο", "Πετρέλαιο/Φωτιστικό Πετρέλαιο/Υγραέριο", "Βιομάζα (Πέλετ)","Τηλεθέρμανση/Καυσόξυλα"],
    tag: "housing",
    answer: null
  },
];

export default questions;
