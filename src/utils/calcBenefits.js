import {getCoefficient} from '@/utils/calcCoefficient.js';

export function calcHeatingBenefit(submittedTaxDeclaration, yearsInGreece, income, isBusinessOwner, businessIncome,
  propertyValue, isMarried, isSingleParent, dependentChildren, area, heatingSource) {

    const coefficient = getCoefficient(area);
    let baseAmount = null;      
    let reasons = [];

    // Έλεγχοι για επιλεξιμότητα
    if (!submittedTaxDeclaration) {
      reasons.push("Δεν έχετε υποβάλει φορολογική δήλωση για το προηγούμενο έτος.");
    }
    if (!yearsInGreece) {
      reasons.push("Πρέπει να διαμένετε στην Ελλάδα κατά τα τελευταία, 5 τουλάχιστον, έτη.");
    }

    // Έλεγχος εισοδηματικών κριτηρίων
    let incomeThreshold = 16000;
    if (isSingleParent) {
      incomeThreshold = 29000;
    } else if (isMarried) {
      incomeThreshold = 24000;
    }
    incomeThreshold += 5000 * dependentChildren;
    const businessThreshold = 80000;

    if (income > incomeThreshold) {
      reasons.push("Το εισόδημά σας(" + income + "€) υπερβαίνει τα επιτρεπόμενα όρια(" + incomeThreshold + "€) για το επίδομα θέρμανσης.");
    }

    // Έλεγχος περιουσιακών κριτηρίων
    let propertyThreshold = isMarried || isSingleParent ? 260000 : 200000;
    if (propertyValue > propertyThreshold) {
      reasons.push("Η αξία της ακίνητης περιουσίας σας(" + propertyValue + "€) υπερβαίνει τα όρια(" + propertyThreshold + "€) για το επίδομα.");
    }

    // Έλεγχος εισοδήματος από επιχειρηματική δραστηριότητα
    if (isBusinessOwner && businessIncome > businessThreshold) {
      reasons.push("Τα έσοδα σας από επιχειρηματική δραστηριότητα(" + businessIncome + "€) υπερβαίνουν το επιτρεπόμενο όριο(" + businessThreshold + "€).");
    }

    // Έλεγχος αν υπάρχει κάποιος λόγος αποκλεισμού
    if (reasons.length > 0) {
      return {
        reasons,
        eligible: false,
        allowanceAmount: 0,
        message: "Δεν είστε δικαιούχος για το επίδομα θέρμανσης."
      };
    }

    switch(heatingSource) {
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
    }

    
    // Βασικό ποσό επιδόματος βάσει περιοχής
    let allowanceAmount = baseAmount * coefficient;

    // Προσαύξηση για εξαρτώμενα τέκνα
    allowanceAmount += allowanceAmount * 0.2 * dependentChildren;
    let limit = 800;
    // Έλεγχος για επιπλέον προσαύξηση περιοχών με δυσμενείς συνθήκες (συντελεστής >= 1)
    if (coefficient >= 1) {
      allowanceAmount *= 1.25;
      limit = 1000;
    }

    if (coefficient >= 1.2) {
      allowanceAmount *= 1.25;
      limit = 1200
    }

    allowanceAmount = Math.max(100, Math.min(allowanceAmount, limit));

    // Εφαρμογή ορίων επιδόματος
    

    return {
      reasons,
      eligible: true,
      allowanceAmount: allowanceAmount.toFixed(2),
      message: `Είστε επιλέξιμος/η για το επίδομα θέρμανσης. Εκτιμώμενο ποσό επιδόματος: <b>${allowanceAmount.toFixed(2)}€</b>.`
    };
}

export function calcHousingBenefit(submittedTaxDeclaration, yearsInGreece, income, activeRent, rent, isSingleParent, 
  dependentChildren, unprotectedChildren, hostedPersons, propertyValue, savings, luxuryBelonging) 
{
  const incomeBase = 7000;
  const allowanceBase = 70;
  const allowanceThreshold = 210;

  let propertyThreshold = Math.min(120000 + 15000 * (dependentChildren + unprotectedChildren + hostedPersons), 180000);
  let allowanceAmount;
  let incomeThreshold = calculateThreshold(incomeBase, dependentChildren, unprotectedChildren, hostedPersons, isSingleParent);
  const savingsThreshold = incomeThreshold;
  let reasons = [];

  incomeThreshold = Math.max(incomeThreshold, 21000);

  if(!submittedTaxDeclaration) {
    reasons.push("Δεν έχετε υποβάλλει φορολογική δήλωση για το προηγούμενο έτος.")
  }
  if(!yearsInGreece) {
    reasons.push("Πρέπει να διαμένετε στην Ελλάδα κατά τα τελευταία, 5 τουλάχιστον, έτη.");
  }
  if(!activeRent) {
    reasons.push("Πρέπει να έχετε ενεργό μισθωτήριο στο όνομα σας.");
  }
  if(!luxuryBelonging) {
    reasons.push("Αποκλείεστε απο το επίδομα Στέγασης λόγω κατοχής πολυτελών αγαθών.");
  }
  if(income > incomeThreshold){
    console.log(incomeThreshold)
    reasons.push(`Το εισόδημά σας(${income}€) υπερβαίνει το όριο (${incomeThreshold}€).`);
  }
  if(savings > savingsThreshold) {
    console.log(savingsThreshold)
    reasons.push(`Οι καταθέσεις σας(${savings}€) υπερβαίνουν το όριο (${savingsThreshold}€)`);
  }
  if(propertyValue > propertyThreshold) {
    console.log(propertyThreshold)
    reasons.push(`Η αξία των ακινήτων σας(${propertyValue}€) υπερβαίνει το όριο (${propertyThreshold}€)`);
  }

  if (reasons.length > 0) {
    return {
      reasons,
      eligible: false,
      allowanceAmount: 0,
      message: "Δεν είστε δικαιούχος για το επίδομα θέρμανσης."
    };
  }
  else {
    allowanceAmount = calculateAllowance(allowanceBase, dependentChildren, unprotectedChildren, hostedPersons, isSingleParent);
    allowanceAmount = Math.min(Math.min(rent,allowanceAmount),allowanceThreshold);

    return {
      reasons,
      eligible: true,
      allowanceAmount: allowanceAmount,
      message: `Είστε επιλέξιμος/η για το επίδομα. Εκτιμώμενο ποσό επιδόματος: <b>${allowanceAmount}€</b> το μήνα.`,
    };
  }
}

export function calculateThreshold(base, dependentChildren, unprotectedChildren, hostedPersons, singleParent = false) {
  const unsupported_increment = 7000;
  const regular_increment = 3500;
  let threshold = base;
  threshold += unprotectedChildren * unsupported_increment;
  if (singleParent && dependentChildren > 0) {
    threshold += unsupported_increment + (dependentChildren - 1 + hostedPersons) * regular_increment;
  } 
  else {
      threshold += (dependentChildren + hostedPersons) * regular_increment;
  }
  return threshold;
}

export function calculateAllowance(base, dependentChildren, unprotectedChildren, hostedPersons, singleParent = false) {
  const unsupported_increment = 70;
  const regular_increment = 35;
  let allowance = base;
  allowance += unprotectedChildren * unsupported_increment;
  if (singleParent && dependentChildren > 0) {
    allowance += unsupported_increment + (dependentChildren - 1 + hostedPersons) * regular_increment;
  }
  else {
    allowance += (dependentChildren + hostedPersons) * 35;
  }
  return allowance;
}

export function calcChildrenBenefit(submittedTaxDeclaration, income, dependentChildren, residesInGreece, yearsInGreece,
  isSingleParent, custody, judicialDecision)
{
  let reasons = [];
  if(!submittedTaxDeclaration)
    reasons.push("Δεν έχετε υποβάλλει φορολογική δήλωση για το προηγούμενο έτος.")
  if(!residesInGreece)
    reasons.push("Πρέπει να διαμένετε στην Ελλάδα για να δικαιούστε το επίδομα παιδιού.")
  if(!yearsInGreece)
    reasons.push("Πρέπει να διαμένετε στην Ελλάδα κατά τα τελευταία, 5 τουλάχιστον, έτη.")
  if(isSingleParent && (!custody || !judicialDecision))
    reasons.push("Η οικογένεια είναι μονογονεϊκή, παρόλα αυτά δεν υπάρχει απόφαση που να αποδεικνύει την επιμέλεια του/των παιδιών.")
  if(dependentChildren === 0)
    reasons.push("Ο αριθμός των εξαρτώμενων μελών είναι 0.")
  // Έλεγχος επιλεξιμότητας
  if (reasons.length > 0) {
    return {
      reasons,
      eligible: false,
      benefitAmount: 0,
      message: "Δεν είστε δικαιούχος.",
    };
  }

  // Υπολογισμός κλίμακας ισοδυναμίας
  let equivalenceScale = 1; // Πρώτος γονέας
  
  if (!isSingleParent) {
    equivalenceScale += 1 / 2; // Στάθμιση δεύτερου γονέα για μη μονογονεϊκές οικογένειες
  }
  
  // Εφαρμογή στάθμισης για τα παιδιά
  for (let i = 0; i < dependentChildren; i++) {
    if (isSingleParent && i === 0) {
      equivalenceScale += 1 / 2; // Στάθμιση 1/2 για το πρώτο παιδί μονογονεϊκής οικογένειας
    } else {
      equivalenceScale += 1 / 4; // Στάθμιση 1/4 για τα υπόλοιπα παιδιά
    }
  }

  // Υπολογισμός ισοδύναμου εισοδήματος
  const equivalentIncome = income / equivalenceScale;

  // Κατηγοριοποίηση του ισοδύναμου εισοδήματος
  let incomeCategory;
  if (equivalentIncome <= 6000) {
    incomeCategory = "A";
  } else if (equivalentIncome <= 10000) {
    incomeCategory = "B";
  } else if (equivalentIncome <= 15000) {
    incomeCategory = "C";
  } else {
    reasons.push(`Το ισοδύναμο εισόδημά σας(${equivalentIncome}€) υπερβαίνει τα όρια για το επίδομα(15000€).`)
    return {
      reasons,
      eligible: false,
      benefitAmount: 0,
      message: "Δεν είστε δικαιούχος.",
    };
  }

  // Υπολογισμός ποσού επιδόματος βάσει κατηγορίας και αριθμού εξαρτώμενων τέκνων
  let benefitAmount = 0;
  switch (incomeCategory) {
    case "A":
      benefitAmount = 70 * Math.min(dependentChildren, 2) + 140 * Math.max(dependentChildren - 2, 0);
      break;
    case "B":
      benefitAmount = 42 * Math.min(dependentChildren, 2) + 84 * Math.max(dependentChildren - 2, 0);
      break;
    case "C":
      benefitAmount = 28 * Math.min(dependentChildren, 2) + 56 * Math.max(dependentChildren - 2, 0);
      break;
  }

  return {
    reasons,
    eligible: true,
    benefitAmount: benefitAmount,
    message: `Είστε επιλέξιμος/η για το επίδομα. Εκτιμώμενο ποσό επιδόματος: <b>${benefitAmount}€</b> το μήνα.`,
  };
}

export function calcKEABenefit(residesInGreece, adults, dependentChildren, unsupportedChildren, isSingleParent, income,
  propertyValue, vehicleValue, savings, luxuryBelonging)
{
  let reasons = [];
  const vehicleThreshold = 6000;
  let incomeThreshold = 0;
  let propertyThreshold = 90000;
  let baseAmount = 216;
  let depositThreshold;

  if (isSingleParent && dependentChildren > 0) {
    dependentChildren -= 1;
    adults += 1;
  }

  const totalAdults = adults + unsupportedChildren;
  const totalChildren = dependentChildren;
  const guaranteedIncome = baseAmount + (totalAdults-1) * 108 + (totalChildren * 54);

  incomeThreshold = 6 * Math.min(guaranteedIncome, 972);
  propertyThreshold = Math.min(150000, propertyThreshold + (totalAdults + dependentChildren - 1) * 15000);
  depositThreshold = calculateDepositThreshold(totalAdults, totalChildren);
  
  if(!residesInGreece) {
    reasons.push("Πρέπει να διαμένετε στην Ελλάδα για να δικαιούστε το επίδομα.");
  }
  if(income >= incomeThreshold) {
    reasons.push("Το εισόδημα σας (" + income + "€) υπερβαίνει το εισοδηματικό όριο (" + incomeThreshold + "€).")
  }
  if(propertyValue > propertyThreshold) {
    reasons.push("Η αξία των ακινήτων σας (" + propertyValue + "€) υπερβαίνει το όριο (" + propertyThreshold + "€).")
  }
  if(vehicleValue > vehicleThreshold) {
    reasons.push("Η αντικειμενική δαπάνη των επιβατικών σας οχημάτων (" + vehicleValue + ") υπερβαίνει το όριο (" + vehicleThreshold + "€).")
  }
  if(savings > depositThreshold) {
    reasons.push("Η αξία των καταθέσεων σας (" + savings + "€) υπερβαίνει το όριο (" + depositThreshold + "€).")
  }
  if(!luxuryBelonging) {
    reasons.push("Αποκλείεστε λόγω κατοχής πολυτελών αγαθών.")
  }

  if (reasons.length > 0) {
    return {
      reasons,
      eligible: false,
      allowanceAmount: 0,
      message: `Δεν είστε δικαιούχος για το ΚΕΑ.`,
    };
  }
  else {
    const allowanceAmount = parseInt((incomeThreshold - income) / 6);
    return {
      reasons,
      eligible: true,
      message: `Είστε επιλέξιμος/η για το ΚΕΑ: <b>${allowanceAmount}€ τον μήνα</b>`,
      allowanceAmount: allowanceAmount,
    };
  }
}

export function calcKOTBenefit(residesInGreece, adults, dependentChildren, unsupportedChildren, disabledPerson, lifesupportedPerson,
  income, propertyValue, luxuryBelonging, keaEligible)
{
  if (keaEligible) {
    return {
      eligible: true,
      allowanceAmount: 4.5,
      message: `Είστε επιλέξιμος για το ΚΟΤ: <b>Κατηγορία Α</b>.`
    };
  }

  let reasons = [];

  const totalAdults = adults;
  const totalChildren = dependentChildren + unsupportedChildren;

  let incomeThreshold = Math.min(9000 + (totalAdults - 1) * 4500 + totalChildren * 2250, 31500);
  incomeThreshold += lifesupportedPerson? 15000: (disabledPerson? 8000 : 0)
  let propertyThreshold = Math.min(120000 + (totalAdults + totalChildren - 1) * 15000, 180000);

  if(!residesInGreece) {
    reasons.push("Πρέπει να διαμένετε στην Ελλάδα για να δικαιούστε το επίδομα.");
  }
  if(income >= incomeThreshold) {
    reasons.push("Το εισόδημα σας (" + income + "€) υπερβαίνει το εισοδηματικό όριο (" + incomeThreshold + "€).")
  }
  if(propertyValue > propertyThreshold) {
    reasons.push("Η αξία των ακινήτων σας (" + propertyValue + "€) υπερβαίνει το όριο (" + propertyThreshold + "€).")
  }
  if(!luxuryBelonging) {
    reasons.push("Αποκλείεστε λόγω κατοχής πολυτελών αγαθών.")
  }

  if (reasons.length > 0) {
    return {
      reasons,
      eligible: false,
      allowanceAmount: 0,
      message: `Δεν είστε δικαιούχος για το ΚΟΤ.`
    };
  }
  else {
    return {
      reasons,
      eligible: true,
      message:`Είστε επιλέξιμος/η για το ΚΟΤ: <b>Κατηγορια Β</b>`,
    };
  }
}

export function calculateDepositThreshold(totalAdults, totalChildren) {
  let threshold = 0;

  const depositLimits = [
    { adults: 1, children: 0, limit: 4800 },
    { adults: 2, children: 0, limit: 7200 },
    { adults: 1, children: 1, limit: 7200 },
    { adults: 2, children: 1, limit: 8400 },
    { adults: 1, children: 2, limit: 8400 },
    { adults: 3, children: 0, limit: 9600 },
    { adults: 2, children: 2, limit: 9600 },
    { adults: 1, children: 3, limit: 9600 },
    { adults: 3, children: 1, limit: 10800 },
    { adults: 2, children: 3, limit: 10800 },
    { adults: 1, children: 4, limit: 10800 },
    { adults: 4, children: 0, limit: 12000 },
    { adults: 2, children: 4, limit: 12000 },
    { adults: 1, children: 5, limit: 12000 },
    { adults: 4, children: 1, limit: 13200 },
    { adults: 2, children: 5, limit: 13200 },
    { adults: 1, children: 6, limit: 13200 },
    { adults: 5, children: 0, limit: 14400 },
    { adults: 2, children: 6, limit: 14400 },
    { adults: 1, children: 7, limit: 14400 },
  ];

  const matchedLimit = depositLimits.find(
    (entry) => entry.adults === totalAdults && entry.children === totalChildren
  );

  threshold = matchedLimit ? matchedLimit.limit : 0;
  return threshold;
}