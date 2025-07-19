export function childrenBenefitIncomeFormula(facts) {
    const inc = parseFloat(facts.income);
    const children = parseInt(facts.dependentChildren);
    const isSingleParent = facts.isSingleParent == "Ναι";
    if (
    facts.income === undefined || facts.income === null || facts.income === "" ||
    facts.dependentChildren === undefined || facts.dependentChildren === null || facts.dependentChildren === "" ||
    facts.isSingleParent === undefined || facts.isSingleParent === null || facts.isSingleParent === "" 
    ) {
        return {
            eligible:null
        };
    }
    // console.log("Income", inc)
    // console.log("Children", children)
    // console.log("Is Single Parent", isSingleParent)
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

    // console.log("Equivalent Scale:", equivalenceScale)


    const equivalentIncome = inc / equivalenceScale;
    return {
        eligible: equivalentIncome <= 15000,
        disqualifyReason: `Το εισόδημα σας (${equivalentIncome}€) ξεπερνάει το όριο του ισοδύναμου οικογενειακού εισοδήματος (15.000€)`
    }
}
