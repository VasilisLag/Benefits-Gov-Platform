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
export function propertyThresholdFormula(facts) {
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
export function savingsThresholdFormula(facts) {
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
