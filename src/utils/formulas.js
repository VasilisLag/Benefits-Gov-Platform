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
