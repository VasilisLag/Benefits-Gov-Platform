// Eligibility formulas for Heating Benefit
export function heatingIncomeThresholdFormula(facts) {
    const income = parseFloat(facts.income);
    const dependentChildren = parseInt(facts.dependentChildren);
    const maritalStatus = facts.maritalStatus;
    // Έλεγχος για undefined/null/NaN
    if (
      income === undefined || income === null || isNaN(income) ||
      dependentChildren === undefined || dependentChildren === null || isNaN(dependentChildren) ||
      maritalStatus === undefined || maritalStatus === null || maritalStatus === ""
    ) {
      return { eligible: null, disqualifyReason: null };
    }
    let threshold = 16000;
    if (maritalStatus === "Μονογονέας") {
        threshold = 29000;
    } else if (maritalStatus === "Έγγαμος/η - Σύμφωνο συμβίωσης") {
        threshold = 24000;
    }
    threshold += 5000 * dependentChildren;
    return {
        eligible: income <= threshold,
        disqualifyReason: `Το εισόδημά σας (${income?.toLocaleString('el-GR')}€) υπερβαίνει το όριο (${threshold?.toLocaleString('el-GR')}€) για το επίδομα θέρμανσης.`
    };
}

export function heatingBusinessIncomeFormula(facts) {
    const isBusinessOwner = facts.isBusinessOwner === "Ναι";
    const businessIncome = parseFloat(facts.businessIncome) || 0;
    const threshold = 80000;
    if (!isBusinessOwner) return { eligible: true, disqualifyReason: null };
    if (businessIncome === undefined || isNaN(businessIncome)) {
        return { eligible: null, disqualifyReason: null };
    }
    return {
        eligible: businessIncome <= threshold,
        disqualifyReason: `Τα έσοδα από επιχειρηματική δραστηριότητα (${businessIncome?.toLocaleString('el-GR')}€) υπερβαίνουν το όριο (${threshold?.toLocaleString('el-GR')}€).`
    };
}

export function heatingPropertyThresholdFormula(facts) {
    const propertyValue = parseFloat(facts.propertyValue);
    const maritalStatus = facts.maritalStatus;
    let threshold = 200000;
    if (maritalStatus === "Έγγαμος/η - Σύμφωνο συμβίωσης" || maritalStatus === "Μονογονέας") {
        threshold = 260000;
    }
    if (propertyValue === undefined || isNaN(propertyValue)) {
        return { eligible: null, disqualifyReason: null };
    }
    return {
        eligible: propertyValue <= threshold,
        disqualifyReason: `Η αξία της ακίνητης περιουσίας σας (${propertyValue?.toLocaleString('el-GR')}€) υπερβαίνει το όριο (${threshold?.toLocaleString('el-GR')}€) για το επίδομα θέρμανσης.`
    };
}
// Υπολογισμός εισοδηματικού ορίου για Επίδομα Στέγασης
export function housingIncomeThresholdFormula(facts) {
    const income = parseFloat(facts.income);
    const dependentChildren = parseInt(facts.dependentChildren);
    const unprotectedChildren = parseInt(facts.unprotectedChildren);
    const hostedPersons = parseInt(facts.hostedPersons);
    const isSingleParent = facts.isSingleParent === "Ναι";

    const maxHousingIncomeThreshold = 21000
    if(income > maxHousingIncomeThreshold)
        return { eligible: false, disqualifyReason: "Το εισόδημα σας είναι μεγαλύτερο απο το ανώτατο εισοδηματικό όριο (21.000€)" };

    if (
        income === undefined || isNaN(income) ||
        isNaN(dependentChildren) || isNaN(unprotectedChildren) || isNaN(hostedPersons)
    ) {
        return { eligible: null, disqualifyReason: null };
    }

    const incomeBase = 7000;
    const unsupported_increment = 7000;
    const regular_increment = 3500;
    let threshold = incomeBase;
    threshold += unprotectedChildren * unsupported_increment;
    if (isSingleParent && dependentChildren > 0) {
        threshold += unsupported_increment + (dependentChildren - 1 + hostedPersons) * regular_increment;
    } else {
        threshold += (dependentChildren + hostedPersons + 1) * regular_increment;
    }
    threshold = Math.min(threshold, maxHousingIncomeThreshold);

    const formattedIncome = income.toLocaleString('el-GR');
    const formattedThreshold = threshold.toLocaleString('el-GR');
    return {
        eligible: income <= threshold,
        disqualifyReason: `Το εισόδημά σας (${formattedIncome}€) υπερβαίνει το όριο (${formattedThreshold}€) για το επίδομα στέγασης.`
    };
}

// Υπολογισμός ορίου ακίνητης περιουσίας για Επίδομα Στέγασης
export function housingPropertyThresholdFormula(facts) {
    const propertyValue = parseFloat(facts.propertyValue);
    const dependentChildren = parseInt(facts.dependentChildren);
    const unprotectedChildren = parseInt(facts.unprotectedChildren);
    const hostedPersons = parseInt(facts.hostedPersons);

    if (
        propertyValue === undefined || isNaN(propertyValue) ||
        isNaN(dependentChildren) || isNaN(unprotectedChildren) || isNaN(hostedPersons)
    ) {
        return { eligible: null, disqualifyReason: null };
    }

    let threshold = Math.min(120000 + 15000 * (dependentChildren + unprotectedChildren + hostedPersons), 180000);
    const formattedValue = propertyValue.toLocaleString('el-GR');
    const formattedThreshold = threshold.toLocaleString('el-GR');
    return {
        eligible: propertyValue <= threshold,
        disqualifyReason: `Η αξία των ακινήτων σας (${formattedValue}€) υπερβαίνει το όριο (${formattedThreshold}€) για το επίδομα στέγασης.`
    };
}

// Υπολογισμός ορίου καταθέσεων για Επίδομα Στέγασης
export function housingSavingsThresholdFormula(facts) {
    const savings = parseFloat(facts.savings);
    const dependentChildren = parseInt(facts.dependentChildren) || 0;
    const unprotectedChildren = parseInt(facts.unprotectedChildren) || 0;
    const hostedPersons = parseInt(facts.hostedPersons) || 0;
    const isSingleParent = facts.isSingleParent === "Ναι";

    if (
        savings === undefined || isNaN(savings) ||
        isNaN(dependentChildren) || isNaN(unprotectedChildren) || isNaN(hostedPersons)
    ) {
        return { eligible: null, disqualifyReason: null };
    }

    const base = 7000;
    const unsupported_increment = 7000;
    const regular_increment = 3500;
    let threshold = base;
    threshold += unprotectedChildren * unsupported_increment;
    if (isSingleParent && dependentChildren > 0) {
        threshold += unsupported_increment + (dependentChildren - 1 + hostedPersons) * regular_increment;
    } else {
        threshold += (dependentChildren + hostedPersons + 1) * regular_increment;
    }
    threshold = Math.min(threshold, 21000);

    const formattedSavings = savings.toLocaleString('el-GR');
    const formattedThreshold = threshold.toLocaleString('el-GR');
    return {
        eligible: savings <= threshold,
        disqualifyReason: `Οι καταθέσεις σας (${formattedSavings}€) υπερβαίνουν το όριο (${formattedThreshold}€) για το επίδομα στέγασης.`
    };
}
export function childrenBenefitIncomeFormula(facts) {
    const inc = parseFloat(facts.income);
    const children = parseInt(facts.dependentChildren);
    const isSingleParent = facts.isSingleParent == "Ναι";
    if (
    facts.income === undefined || facts.income === null || facts.income === "" ||
    facts.dependentChildren === undefined || facts.dependentChildren === null || facts.dependentChildren === "" || facts.dependentChildren <= 0 ||
    facts.isSingleParent === undefined || facts.isSingleParent === null || facts.isSingleParent === "" 
    ) {
        return {
            eligible:null,
            disqualifyReason: null
        };
    }

    let equivalenceScale = 1;

    if (!isSingleParent) {
        equivalenceScale += 1 / 2;
    }

    for (let i = 0; i < children; i++) {
        if (isSingleParent && i === 0) {
        equivalenceScale += 1 / 2;
        } else {
        equivalenceScale += 1 / 4;
        }
    }


    const equivalentIncome = Math.ceil(inc / equivalenceScale);
    const formattedIncome = equivalentIncome.toLocaleString('el-GR');
    return {
        eligible: equivalentIncome <= 15000,
        disqualifyReason: `Το ισοδύναμο οικογενειακό εισόδημα σας (${formattedIncome}€) ξεπερνάει το όριο του ισοδύναμου οικογενειακού εισοδήματος (15.000€)`
    }
}

// KEA: Εισοδηματικό όριο 6μήνου
export function keaIncomeThresholdFormula(facts) {
  const income6m = parseFloat(facts.income6m);
  let adults = parseInt(facts.adults) || 0;
  let dependentChildren = parseInt(facts.dependentChildren) || 0;
  let unsupportedChildren = parseInt(facts.unsupportedChildren) || 0;
  let isSingleParent = facts.isSingleParent === "Ναι";

  // Αν μονογονεϊκή, προστίθεται ενήλικας
  if (isSingleParent && dependentChildren > 0) {
    dependentChildren -= 1;
    adults += 1;
  }
  const totalAdults = adults + unsupportedChildren;
  const totalChildren = dependentChildren;
  const baseAmount = 216;
  const guaranteedIncome = baseAmount + (totalAdults-1) * 108 + (totalChildren * 54);
  const threshold = 6 * Math.min(guaranteedIncome, 972);

  if (isNaN(income6m) || totalAdults < 1) {
    return { eligible: null, disqualifyReason: null };
  }
  return {
    eligible: income6m < threshold,
    disqualifyReason: `Το εισόδημα σας κατα τους τελευταίους 6 μήνες (${income6m?.toLocaleString('el-GR')}€) υπερβαίνει το εισοδηματικό όριο (${threshold?.toLocaleString('el-GR')}€).`
  };
}

// KEA: Ακίνητη περιουσία
export function keaPropertyThresholdFormula(facts) {
  const propertyValue = parseFloat(facts.propertyValue);
  let adults = parseInt(facts.adults) || 0;
  let dependentChildren = parseInt(facts.dependentChildren) || 0;
  let unsupportedChildren = parseInt(facts.unsupportedChildren) || 0;
  let isSingleParent = facts.isSingleParent === "Ναι";
  if (isSingleParent && dependentChildren > 0) {
    dependentChildren -= 1;
    adults += 1;
  }
  const totalAdults = adults + unsupportedChildren;
  const totalChildren = dependentChildren;
  let threshold = Math.min(150000, 90000 + (totalAdults + totalChildren - 1) * 15000);
  if (isNaN(propertyValue)) {
    return { eligible: null, disqualifyReason: null };
  }
  return {
    eligible: propertyValue <= threshold,
    disqualifyReason: `Η αξία των ακινήτων σας (${propertyValue?.toLocaleString('el-GR')}€) υπερβαίνει το όριο (${threshold?.toLocaleString('el-GR')}€).`
  };
}

// KEA: Οχήματα
export function keaVehicleThresholdFormula(facts) {
  const vehicleValue = parseFloat(facts.vehicleValue);
  const threshold = 6000;
  if (isNaN(vehicleValue)) {
    return { eligible: null, disqualifyReason: null };
  }
  return {
    eligible: vehicleValue <= threshold,
    disqualifyReason: `Η αντικειμενική δαπάνη των επιβατικών σας οχημάτων (${vehicleValue?.toLocaleString('el-GR')}€) υπερβαίνει το όριο (${threshold?.toLocaleString('el-GR')}€).`
  };
}

// KEA: Καταθέσεις
export function keaSavingsThresholdFormula(facts) {
  const savings = parseFloat(facts.savings);
  let adults = parseInt(facts.adults) || 0;
  let dependentChildren = parseInt(facts.dependentChildren) || 0;
  let unsupportedChildren = parseInt(facts.unsupportedChildren) || 0;
  let isSingleParent = facts.isSingleParent === "Ναι";
  if (isSingleParent && dependentChildren > 0) {
    dependentChildren -= 1;
    adults += 1;
  }
  const totalAdults = adults + unsupportedChildren;
  const totalChildren = dependentChildren;
  // Threshold logic from calcBenefits.js
  let threshold = 4800 + (totalAdults - 1) * 2400 + totalChildren * 1200;
  if (isNaN(savings)) {
    return { eligible: null, disqualifyReason: null };
  }
  return {
    eligible: savings <= threshold,
    disqualifyReason: `Η αξία των καταθέσεων σας (${savings?.toLocaleString('el-GR')}€) υπερβαίνει το όριο (${threshold?.toLocaleString('el-GR')}€).`
  };
}

// KOT: Εισοδηματικό όριο
export function kotIncomeThresholdFormula(facts) {
  const income = parseFloat(facts.income);
  let adults = parseInt(facts.adults) || 0;
  let dependentChildren = parseInt(facts.dependentChildren) || 0;
  let unsupportedChildren = parseInt(facts.unsupportedChildren) || 0;
  let vulnerableCategory = facts.vulnerableCategory;
  const totalAdults = adults;
  const totalChildren = dependentChildren + unsupportedChildren;
  let threshold = Math.min(9000 + (totalAdults - 1) * 4500 + totalChildren * 2250, 31500);
  if (vulnerableCategory === "Χρειάζονται μηχανική υποστήριξη κατ' οίκον με ιατρικές συσκευές") {
    threshold += 15000;
  } else if (vulnerableCategory === "Αναπηρία 67% και άνω") {
    threshold += 8000;
  }
  if (isNaN(income)) {
    return { eligible: null, disqualifyReason: null };
  }
  return {
    eligible: income < threshold,
    disqualifyReason: `Το εισόδημα σας (${income?.toLocaleString('el-GR')}€) υπερβαίνει το εισοδηματικό όριο (${threshold?.toLocaleString('el-GR')}€).`
  };
}

// KOT: Ακίνητη περιουσία
export function kotPropertyThresholdFormula(facts) {
  const propertyValue = parseFloat(facts.propertyValue);
  let adults = parseInt(facts.adults) || 0;
  let dependentChildren = parseInt(facts.dependentChildren) || 0;
  let unsupportedChildren = parseInt(facts.unsupportedChildren) || 0;
  const totalAdults = adults;
  const totalChildren = dependentChildren + unsupportedChildren;
  let threshold = Math.min(120000 + (totalAdults + totalChildren - 1) * 15000, 180000);
  if (isNaN(propertyValue)) {
    return { eligible: null, disqualifyReason: null };
  }
  return {
    eligible: propertyValue <= threshold,
    disqualifyReason: `Η αξία των ακινήτων σας (${propertyValue?.toLocaleString('el-GR')}€) υπερβαίνει το όριο (${threshold?.toLocaleString('el-GR')}€).`
  };
}
