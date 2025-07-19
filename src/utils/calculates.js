export function calcChildrenBenefitAllowance(facts, eligible, reasons)
{
  const title = "Επίδομα Παιδιού - Α21"
  const income = parseFloat(facts.income);
  const dependentChildren = parseInt(facts.dependentChildren);
  const isSingleParent = facts.isSingleParent == "Ναι";
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

  else if(!eligible){
    return {
        title,
        eligible: null,
        allowanceAmount:null,
        message: null,
        reasons: reasons
    }
  }

}