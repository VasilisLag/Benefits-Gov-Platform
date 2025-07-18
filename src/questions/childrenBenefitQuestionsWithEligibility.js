export default [
  {
    "key": "submittedTaxDeclaration",
    "question": "Έχετε υποβάλει δήλωση φορολογίας εισοδήματος το τρέχον έτος;",
    "options": [
      "Ναι",
      "Όχι"
    ],
    "category": "radio",
    "tag": "demography",
    "required": true,
    "answer": null,
    "eligibility": {
      "childrenBenefit": {
        "type": "match",
        "value": "Ναι",
        "disqualifyReason": "Απαιτείται να έχει υποβληθεί φορολογική δήλωση."
      }
    }
  },
  {
    "key": "residesInGreece",
    "question": "Διαμένετε μόνιμα στην Ελλάδα;",
    "options": [
      "Ναι",
      "Όχι"
    ],
    "category": "radio",
    "tag": "demography",
    "required": true,
    "answer": null,
    "eligibility": {
      "childrenBenefit": {
        "type": "match",
        "value": "Ναι",
        "disqualifyReason": "Απαιτείται μόνιμη κατοικία στην Ελλάδα."
      }
    }
  },
  {
    "key": "income",
    "question": "Ποιο είναι το συνολικό ετήσιο οικογενειακό εισόδημά σας σε ευρώ;",
    "category": "textbox",
    "tag": "income",
    "required": true,
    "answer": null,
    "eligibility": {
      "childrenBenefit": {
        "type": "formula",
        "condition": "facts => { const inc = parseFloat(facts.income); const children = parseInt(facts.dependentChildren || 0); return inc / (1 + children * 0.25) <= 15000; }",
        "disqualifyReason": "Το ισοδύναμο εισόδημα υπερβαίνει το όριο για το επίδομα παιδιού."
      }
    }
  },
  {
    "key": "isSingleParent",
    "question": "Είναι η οικογένειά σας μονογονεϊκή;",
    "options": [
      "Ναι",
      "Όχι"
    ],
    "category": "radio",
    "tag": "household",
    "required": true,
    "answer": null
  },
  {
    "key": "dependentChildren",
    "question": "Πόσα παιδιά έχετε ως εξαρτώμενα μέλη;",
    "category": "textbox",
    "tag": "household",
    "required": true,
    "answer": null,
    "eligibility": {
      "childrenBenefit": {
        "type": "range",
        "min": 1,
        "disqualifyReason": "Δεν έχετε δηλώσει εξαρτώμενα τέκνα."
      }
    }
  }
];