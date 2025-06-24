const questions = [
  {
    id:0,
    question: "Έχετε υποβάλει δήλωση φορολογίας εισοδήματος το τρέχον έτος;",
    options: ["Ναι", "Όχι"],
    category: "radio",
    required: true,
    tag:"demography"
  },
  {
    id:1,
    question: "Διαμένετε μόνιμα στην Ελλάδα;",
    options: ["Ναι", "Όχι"],
    category: "radio",
    required: true,
    tag:"demography"
  },
  {
    id:2,
    question: "Ποιο είναι το συνολικό ετήσιο οικογενειακό εισόδημά σας σε ευρώ;",
    category: "textbox",
    required: true,
    tag:"income"
  },
  {
    id:3,
    question: "Ασκείτε επιχειρηματική δραστηριότητα;",
    options: ["Ναι", "Όχι"],
    category: "radio",
    required: true,
    tag:"income"
  },
  {
    id:4,
    question: "Εάν ασκείτε επιχειρηματική δραστηριότητα, ποια είναι τα συνολικά ακαθάριστα έσοδά σας από αυτή τη δραστηριότητα σε ευρώ;",
    category: "textbox",
    note: `
      <details class="govgr-details">
        <summary class="govgr-details__summary"> Έσοδα απο Επιχειρηματική Δραστηριότητα</summary>
        <div class="govgr-details__content">
          <p class="govgr-body" style = text-align:left;> 
            Αφορά τα συνολικά ακαθάριστα έσοδα του αιτούντος, του/της συζύγου ή μέρους συμφώνου συμβίωσης και των εξαρτώμενων τέκνων.
          </p>
        </div>
      </details>
    `,
     required: false,
    tag:"income"
  },
  {
    id:5,
    question: "Ποιά είναι η οικογενειακή σας κατάσταση;",
    options: ["Άγαμος/η", "Έγγαμος/η - Σύμφωνο συμβίωσης", "Μονογονέας"],
    category: "dropdown",
    required: true,
    tag:"household"
  },
  {
    id:6,
    question: `Πόσα παιδιά έχετε ως εξαρτώμενα μέλη;`,
    category: "textbox",
    note: `  
      <details class="govgr-details">
        <summary class="govgr-details__summary"> Εξαρτώμενα Τέκνα</summary>
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
    tag:"household"
  },
  {
    id:7,
    question: `Πόσα απροστάτευτα τέκνα έχετε στο νοικοκυριό σας;(αν έχετε)`,
    category: "textbox",
    note: `
      <details class="govgr-details">
        <summary class="govgr-details__summary"> Απροστάτευτα Τέκνα</summary>
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
    tag:"household"
  },
  {
    id:8,
    question: `Πόσα φιλοξενούμενα μέλη έχετε στο νοικοκυριό σας;(αν έχετε)`,
    category: "textbox",
    note: `
    `,
    required: false,
    tag:"household"
  },
  {
    id:9,
    question: "Ποιός είναι ο τόπος διαμονής σας;",
    category: "geo-dropdown",
    required: true,
    tag:"residence"
  },  
  {
    id:10,
    question: "Ποιός είναι η πηγή θέρμανσης που χρησιμοποιείτε;",
    category: "dropdown",
    options: ["Ηλεκτρικό Ρεύμα", "Φυσικό Αέριο", "Πετρέλαιο/Φωτιστικό Πετρέλαιο/Υγραέριο", "Βιομάζα (Πέλετ)","Τηλεθέρμανση/Καυσόξυλα"],
    required: true,
    tag:"household"
  },  
  {
    id:11,
    question: "Έχετε ενεργό μισθωτήριο συμβόλαιο για την κύρια κατοικία σας;",
    options: ["Ναι", "Όχι"],
    category: "radio",
    required: true,
    tag:"household"
  },
  {
    id:12,
    question: "Ποιο είναι το μηνιαίο ποσό ενοικίου που καταβάλλετε σε ευρώ;",
    category: "textbox",
    required: true,
    tag: "household",
  },
  {
    id:13,
    question: "Ποια είναι η συνολική αντικειμενική αξία της ακίνητης περιουσίας σας (βάσει ΕΝ.Φ.Ι.Α. 2024) σε ευρώ;",
    category: "textbox",
    note: `
      <details class="govgr-details">
        <summary class="govgr-details__summary"> Αντικειμενική Αξία Ακίνητης Περιουσίας</summary>
        <div class="govgr-details__content">
          <p class="govgr-body" style = text-align:left;> 
            Αυτό αφορά τη συνολική αξία της περιουσίας του αιτούντος, του/της συζύγου ή μέρους συμφώνου συμβίωσης και εξαρτώμενων τέκνων.
          </p>
        </div>
      </details>
    `,
    required: true,
    tag:"assets"
  },
  {
    id:14,
    question: "Ποιο είναι το συνολικό ποσό καταθέσεων, μετοχών, ομολόγων και λοιπών περιουσιακών στοιχείων σας σε ευρώ;",
    category: "textbox",
    note: `
      <details class="govgr-details">
        <summary class="govgr-details__summary"> Όριο Καταθέσεων</summary>
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
      </details>
    `,
    required: true,
    tag:"assets"
  },
  {
    id:15,
    question: "Ποια είναι η συνολική αντικειμενική δαπάνη των επιβατικών αυτοκινήτων σας (Ι.Χ./Μ.Χ.) σε ευρώ;",
    category: "textbox",
    note:`
      <details class="govgr-details">
        <summary class="govgr-details__summary"> Όριο Καταθέσεων</summary>
        <div class="govgr-details__content">
          <ul style="list-style-type: disc; padding-left:30px; text-align:left;">
            <li>Το ποσό υπολογίζεται βάσει της τελευταίας πράξης προσδιορισμού φόρου.</li>
            <li>Η αντικειμενική δαπάνη αφορά:
              <ul style="list-style-type: circle; padding-left:20px;">
                <li>Επιβατικά αυτοκίνητα Ιδιωτικής Χρήσης (Ι.Χ.).</li>
                <li>Επιβατικά αυτοκίνητα Μικτής Χρήσης (Μ.Χ.).</li>
              </ul>
            </li>
          </ul>
        </div>
      </details>`,
    required: true,
    tag:"assets"
  },
  {
    id:16,
    question: "Διαθέτετε κάποιο από τα παρακάτω στοιχεία πολυτελούς διαβίωσης;",
    options: [
      "Όχι, δεν διαθέτω κάποιο από τα παρακάτω",
      "Αμοιβές πληρωμάτων σκαφών αναψυχής",
      "Δαπάνες για δίδακτρα άνω των 1.500€ σε ιδιωτικά σχολεία",
      "Οικιακούς βοηθούς, οδηγούς ή δασκάλους",
    ],
    category: "radio",
    required: true,
    tag:"assets"
  },
  {
    id:17,
    question: "Υπάρχει μέλος ή μέλη στο νοικοκυριό σας που ανήκουν σε κάποια απο τις παρακάτω ευάλωτες κατηγορίες;",
    category: "radio",
    options: ["Όχι δεν υπάρχουν", "Αναπηρία 67% και άνω", "Χρειάζονται μηχανική υποστήριξη κατ' οίκον με ιατρικές συσκευές"],
    required: true,
    tag:"vulnerable"
  },  
  {
    id:18,
    question: "Ποιο είναι το συνολικό εισόδημα του νοικοκυριού σας για τους τελευταίους 6 μήνες σε ευρώ;",
    category: "textbox",
    required: true,
    note:`
      <details class="govgr-details">
        <summary class="govgr-details__summary"> Σημείωση</summary>
        <div class="govgr-details__content">
          <p class="govgr-body" style = text-align:left;> 
            Το εισόδημα αφορά όλα τα μέλη του νοικοκυριού, ενήλικα και ανήλικα.
          </p>
        </div>
      </details>
    `,
    tag:"income"
  },

];

  export default questions;