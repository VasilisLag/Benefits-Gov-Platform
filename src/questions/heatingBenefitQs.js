const questions = [
  {
    key: "submittedTaxDeclaration",
    question: "Έχετε υποβάλει δήλωση φορολογίας εισοδήματος το τρέχον έτος;",
    options: ["Ναι", "Όχι"],
    category: "radio",
    required: true,
    tag: "demography",
    answer: null,
    benefits: ["heatingBenefit"]
  },
  {
    key: "residesInGreece",
    question: "Διαμένετε μόνιμα στην Ελλάδα;",
    options: ["Ναι", "Όχι"],
    category: "radio",
    required: true,
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
    benefits: ["heatingBenefit"]
  },
  {
    key: "income",
    question: "Ποιο είναι το συνολικό ετήσιο οικογενειακό εισόδημά σας σε ευρώ;",
    category: "textbox",
    required: true,
    tag: "income",
    answer: null,
    benefits: ["heatingBenefit"]
  },
  {
    key: "isBusinessOwner",
    question: "Ασκείτε επιχειρηματική δραστηριότητα;",
    options: ["Ναι", "Όχι"],
    category: "radio",
    required: true,
    tag: "income",
    answer: null,
    benefits: ["heatingBenefit"]
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
    benefits: ["heatingBenefit"]
  },
  {
    key: "propertyValue",
    question: "Ποια είναι η συνολική αντικειμενική αξία της ακίνητης περιουσίας σας (βάσει ΕΝ.Φ.Ι.Α. 2024) σε ευρώ;",
    category: "textbox",
    note: `
      <details class="govgr-details">
        <summary class="govgr-details__summary"> Βοήθεια</summary>
        <div class="govgr-details__content">
          <p class="govgr-body" style = text-align:left;> 
            Αυτό αφορά τη συνολική αξία της περιουσίας του αιτούντος, του/της συζύγου ή μέρους συμφώνου συμβίωσης και εξαρτώμενων τέκνων.
          </p>
        </div>
      </details>
    `,
    required: true,
    tag: "assets",
    answer: null,
    benefits: ["heatingBenefit"]
  },
  {
    key: "maritalStatus",
    question: "Ποιά είναι η οικογενειακή σας κατάσταση;",
    options: ["Άγαμος/η", "Έγγαμος/η - Σύμφωνο συμβίωσης", "Μονογονέας"],
    category: "dropdown",
    required: true,
    tag: "household",
    answer: null,
    benefits: ["heatingBenefit"]
  },
  {
    key: "dependentChildren",
    question: `Πόσα παιδιά έχετε ως εξαρτώμενα μέλη;`,
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
      </details>`,
    required: true,
    tag: "household",
    answer: null,
    benefits: ["heatingBenefit"]
  },
  {
    key: "area",
    question: "Ποιός είναι ο τόπος διαμονής σας;",
    category: "geo-dropdown",
    required: true,
    tag: "household",
    answer: null,
    benefits: ["heatingBenefit"]
  },
  {
    key: "heatingSource",
    question: "Ποιός είναι η πηγή θέρμανσης για την οποία επιθυμείτε επιδότηση;",
    category: "dropdown",
    options: ["Ηλεκτρικό Ρεύμα", "Φυσικό Αέριο", "Πετρέλαιο/Φωτιστικό Πετρέλαιο/Υγραέριο", "Βιομάζα (Πέλετ)","Τηλεθέρμανση/Καυσόξυλα"],
    required: true,
    tag: "household",
    answer: null,
    benefits: ["heatingBenefit"]
  },
];

export default questions;
