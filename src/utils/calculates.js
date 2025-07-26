// Υπολογισμός ποσού για Ελάχιστο Εγγυημένο Εισόδημα (KEA)
export function calcKEABenefitAllowance(facts, eligible, reasons) {
  const title = "Ελάχιστο Εγγυημένο Εισόδημα";
  const income6m = parseFloat(facts.income6m);
  let adults = parseInt(facts.adults) || parseInt(facts.hostedPersons);
  let dependentChildren = parseInt(facts.dependentChildren);
  let unsupportedChildren = parseInt(facts.unsupportedChildren);
  let isSingleParent = facts.isSingleParent === "Ναι" || facts.maritalStatus === "Μονογονέας";

  if (isSingleParent && dependentChildren > 0) {
    dependentChildren -= 1;
    adults += 1;
  }
  const totalAdults = adults + unsupportedChildren;
  const totalChildren = dependentChildren;
  const baseAmount = 216;
  const guaranteedIncome = baseAmount + (totalAdults-1) * 108 + (totalChildren * 54);
  const incomeThreshold = 6 * Math.min(guaranteedIncome, 972);
  let allowanceAmount = 0;
  if (eligible && !isNaN(income6m)) {
    allowanceAmount = parseInt((incomeThreshold - income6m) / 6);
    if (allowanceAmount > 0) {
      return {
        title,
        eligible: true,
        allowanceAmount,
        message: `Εκτιμώμενο ποσό επιδότησης τον μήνα: <b>${allowanceAmount}€</b>`,
        reasons: []
      };
    }
    // If eligible but allowanceAmount <= 0, return object with 0 and explanatory message
    return {
      title,
      eligible: true,
      allowanceAmount: 0,
      message: `Δεν προκύπτει ποσό επιδότησης για τα δεδομένα που δηλώσατε.`,
      reasons: []
    };
  }
  // Always return an object, even if not eligible or missing data
  return {
    title,
    eligible: null,
    allowanceAmount: null,
    message: null,
    reasons: reasons
  };
}

// Υπολογισμός ποσού για Κοινωνικό Οικιακό Τιμολόγιο (KOT)
export function calcKOTBenefitAllowance(facts, eligible, reasons) {
  const title = "Κοινωνικό Οικιακό Τιμολόγιο";
  const keaEligible = facts.keaEligible;
  let allowanceAmount = null;
  if (keaEligible && eligible) {
    allowanceAmount = 0.075;
    return {
      title,
      eligible: true,
      allowanceAmount,
      message: `Είστε επιλέξιμος για το ΚΟΤ: <b>Κατηγορία Α</b>. Εκτιμώμενο ποσό επιδότησης κιλοβατώρας: ${allowanceAmount}€`,
      reasons: []
    };
  }
  if (eligible) {
    allowanceAmount = 0.045;
    return {
      title,
      eligible: true,
      allowanceAmount,
      message: `Είστε επιλέξιμος για το ΚΟΤ: <b>Κατηγορία Β</b>. Εκτιμώμενο ποσό επιδότησης κιλοβατώρας: ${allowanceAmount}€`,
      reasons: []
    };
  } else {
    return {
      title,
      eligible: null,
      allowanceAmount: null,
      message: null,
      reasons: reasons
    };
  }
}
import {getCoefficient} from '@/utils/calcCoefficient.js';

export function calcHeatingBenefitAllowance(facts, eligible, reasons) {
  const title = "Επίδομα Θέρμανσης";
  const dependentChildren = parseInt(facts.dependentChildren);
  const area = facts.area;
  const heatingSource = facts.heatingSource;

  let baseAmount = null;
  let coefficient = 1;
  if (typeof getCoefficient === 'function' && area) {
    coefficient = getCoefficient(area);
  }
  switch (heatingSource) {
    case "Ηλεκτρικό Ρεύμα":
      baseAmount = 380;
      break;
    case "Φυσικό Αέριο":
      baseAmount = 325;
      break;
    case "Πετρέλαιο/Φωτιστικό Πετρέλαιο/Υγραέριο":
      baseAmount = 300;
      break;
    case "Βιομάζα (Πέλετ)":
      baseAmount = 360;
      break;
    case "Τηλεθέρμανση/Καυσόξυλα":
      baseAmount = 350;
      break;
    default:
      baseAmount = 0;
  }
  let allowanceAmount = baseAmount * coefficient;
  allowanceAmount += allowanceAmount * 0.2 * dependentChildren;
  let limit = 800;
  if (coefficient >= 1) {
    allowanceAmount *= 1.25;
    limit = 1000;
  }
  if (coefficient >= 1.2) {
    allowanceAmount *= 1.25;
    limit = 1200;
  }
  allowanceAmount = Math.max(100, Math.min(allowanceAmount, limit)).toFixed(0);
  if (eligible) {
    return {
      title,
      eligible: true,
      allowanceAmount: allowanceAmount,
      message: `Εκτιμώμενο ποσό επιδότησης το μήνα: <b>${allowanceAmount}€</b>.`,
      reasons: []
    };
  } else {
    return {
      title,
      eligible: null,
      allowanceAmount: null,
      message: null,
      reasons: reasons
    };
  }
}
export function calcHousingBenefitAllowance(facts, eligible, reasons) {
  const title = "Επίδομα Στέγασης";
  const rent = parseFloat(facts.rent);
  const dependentChildren = parseInt(facts.dependentChildren);
  const unsupportedChildren = parseInt(facts.unsupportedChildren);
  const hostedPersons = parseInt(facts.hostedPersons);
  let isSingleParent = facts.isSingleParent === "Ναι" || facts.maritalStatus === "Μονογονέας";

  if (
    eligible &&
    !isNaN(rent)
  ) {
    const allowanceBase = 70;
    const allowanceThreshold = 210;
    const unsupported_increment = 70;
    const regular_increment = 35;
    let allowanceAmount = allowanceBase;
    allowanceAmount += unsupportedChildren * unsupported_increment;
    if (isSingleParent && dependentChildren > 0) {
      allowanceAmount += unsupported_increment + (dependentChildren - 1 + hostedPersons) * regular_increment;
    } else {
      allowanceAmount += (dependentChildren + hostedPersons) * regular_increment;
    }
    allowanceAmount = Math.min(Math.min(rent, allowanceAmount), allowanceThreshold);

    return {
      title,
      eligible: true,
      allowanceAmount: allowanceAmount,
      message: `Εκτιμώμενο ποσό επιδότησης το μήνα: <b>${allowanceAmount}€</b>`,
      reasons: []
    };
  }
  // Always return an object, even if not eligible or missing data
  return {
    title,
    eligible: null,
    allowanceAmount: null,
    message: null,
    reasons: reasons
  };
}
export function calcChildrenBenefitAllowance(facts, eligible, reasons)
{
  const title = "Επίδομα Παιδιού - Α21"
  const income = parseFloat(facts.income);
  const dependentChildren = parseInt(facts.dependentChildren);
  let isSingleParent = facts.isSingleParent === "Ναι" || facts.maritalStatus === "Μονογονέας";
  if (
    eligible &&
    income !== undefined && income !== null &&
    isSingleParent !== undefined && isSingleParent !== null &&
    dependentChildren !== undefined && dependentChildren !== null
  ) {
    let equivalenceScale = 1;
  
    if (!isSingleParent) {
      equivalenceScale += 1 / 2;
    }
    
    for (let i = 0; i < dependentChildren; i++) {
      if (isSingleParent && i === 0) {
        equivalenceScale += 1 / 2;
      } else {
        equivalenceScale += 1 / 4;
      }
    }

    const equivalentIncome = income / equivalenceScale;

    let incomeCategory;
    if (equivalentIncome <= 6000) {
      incomeCategory = "A";
    } else if (equivalentIncome <= 10000) {
      incomeCategory = "B";
    } else if (equivalentIncome <= 15000) {
      incomeCategory = "C";
    }

    let allowanceAmount = 0;
    switch (incomeCategory) {
      case "A":
        allowanceAmount = 70 * Math.min(dependentChildren, 2) + 140 * Math.max(dependentChildren - 2, 0);
        break;
      case "B":
        allowanceAmount = 42 * Math.min(dependentChildren, 2) + 84 * Math.max(dependentChildren - 2, 0);
        break;
      case "C":
        allowanceAmount = 28 * Math.min(dependentChildren, 2) + 56 * Math.max(dependentChildren - 2, 0);
        break;
    }

    return {
      title,
      eligible: true,
      allowanceAmount: allowanceAmount,
      message: `Εκτιμώμενο ποσό επιδότησης το μήνα: <b>${allowanceAmount}€</b>`,
      reasons: []
    };
  }

  // Always return an object, even if not eligible or missing data
  return {
    title,
    eligible: null,
    allowanceAmount: null,
    message: null,
    reasons: reasons
  };

}