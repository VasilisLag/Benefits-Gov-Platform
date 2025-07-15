const questions = [
  {
    key: "residesInGreece",
    question: "Διαμένετε μόνιμα στην Ελλάδα;",
    options: ["Ναι", "Όχι"],
    category: "radio",
    required: true,
    tag: "demography",
    answer: null,
    benefits: ["vulnerableBenefits"]
  },
  {
    key: "adults",
    question: "Πόσοι ενήλικες μένετε στο νοικοκυριό σας;",
    category: "textbox",
    required: true,
    tag: "household",
    answer: null,
    benefits: ["vulnerableBenefits"]
  },
  {
    key: "dependentChildren",
    question: "Πόσα ανήλικα μέλη έχετε ως εξαρτώμενα;",
    category: "textbox",
    required: false,
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
    tag: "household",
    answer: null,
    benefits: ["vulnerableBenefits"]
  },
  {
    key: "unsupportedChildren",
    question: `Πόσα απροστάτευτα τέκνα έχετε στο νοικοκυριό σας;`,
    placeholder: "Αριθμός τέκνων",
    category: "textbox",
    note:`
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
    required: false,
    tag: "household",
    answer: null,
    benefits: ["vulnerableBenefits"]
  },
  {
    key: "isSingleParent",
    question: "Είστε μονογονεϊκή οικογένεια;",
    options: ["Ναι", "Όχι"],
    category: "radio",
    required: true,
    tag: "household",
    answer: null,
    benefits: ["vulnerableBenefits"]
  },
  {
    key: "vulnerableCategory",
    question: "Υπάρχει μέλος ή μέλη στο νοικοκυριό σας που ανήκουν σε κάποια απο τις παρακάτω ευάλωτες κατηγορίες;",
    category: "radio",
    options: ["Όχι δεν υπάρχουν", "Αναπηρία 67% και άνω", "Χρειάζονται μηχανική υποστήριξη κατ' οίκον με ιατρικές συσκευές"],
    required: true,
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
    `,
    tag: "vulnerable",
    answer: null,
    benefits: ["vulnerableBenefits"]
  },
  {
    key: "income",
    question: "Ποιο είναι το συνολικό ετήσιο εισόδημά όλων των μελών του νοικοκυριού;",
    category: "textbox",
    required: true,
    tag: "income",
    answer: null,
    benefits: ["vulnerableBenefits"]
  },
  {
    key: "income6m",
    question: "Ποιο είναι το συνολικό εισόδημα του νοικοκυριού σας για τους τελευταίους 6 μήνες σε ευρώ;",
    category: "textbox",
    required: true,
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
    tag: "income",
    answer: null,
    benefits: ["vulnerableBenefits"]
  },
  {
    key: "propertyValue",
    question: "Ποια είναι η συνολική φορολογητέα αξία της ακίνητης περιουσίας σας σε ευρώ;",
    category: "textbox",
    note: `
      <details class="govgr-details">
        <summary class="govgr-details__summary"> Βοήθεια</summary>
        <div class="govgr-details__content">
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
        </div>
      </details>`,
    required: true,
    tag: "assets",
    answer: null,
    benefits: ["vulnerableBenefits"]
  },
  {
    key: "vehicleValue",
    question: "Ποια είναι η συνολική αντικειμενική δαπάνη των επιβατικών αυτοκινήτων σας (Ι.Χ./Μ.Χ.) σε ευρώ;",
    category: "textbox",
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
      </details>`,
    required: true,
    tag: "assets",
    answer: null,
    benefits: ["vulnerableBenefits"]
  },
  {
    key: "savings",
    question: "Ποια είναι η συνολική αξία των καταθέσεων, μετοχών, ομολόγων κ.τ.λ. του νοικοκυριού σας σε ευρώ;",
    category: "textbox",
    note: `
      <details class="govgr-details">
        <summary class="govgr-details__summary"> Βοήθεια</summary>
        <div class="govgr-details__content">
          <ul style="list-style-type: disc; padding-left:30px; text-align:left;">
            <li>Οι πληροφορίες αντλούνται από την τελευταία πράξη προσδιορισμού φόρου.</li>
            <li>Η συνολική αξία περιλαμβάνει:
              <ul style="list-style-type: circle; padding-left:20px;">
                <li>Τόκους καταθέσεων των μελών του νοικοκυριού.</li>
                <li>Αξία μετοχών, ομολόγων και άλλων χρηματοοικονομικών προϊόντων.</li>
              </ul>
            </li>
          </ul>
        </div>
      </details>`,
    required: true,
    tag: "assets",
    answer: null,
    benefits: ["vulnerableBenefits"]
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
    required: true,
    tag: "assets",
    answer: null,
    benefits: ["vulnerableBenefits"]
  },
];

export default questions;
