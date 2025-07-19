import * as formulas from '@/utils/formulas.js';

export function evaluateEligibility(question, facts, benefitId) {
  const rule = question.eligibility?.[benefitId];
  if (!rule) return { eligible: true, reason: null };

  const value = facts[question.key];
  // console.log(rule.type)
  // console.log(rule)
  switch (rule.type) {
    case "match":
      // console.log(value, rule.value)
      // console.log(value !== undefined)
      // console.log(value !== undefined &&  value !== rule.value)
      return {
        eligible: value === null || value === undefined ? null: value === rule.value,
        reason: value !== undefined &&  value !== rule.value? rule.disqualifyReason : null
      };

    case "range":
      if (rule.min !== undefined && value < rule.min) {
        return { eligible: false, reason: rule.disqualifyReason };
      }
      if (rule.max !== undefined && value > rule.max) {
        return { eligible: false, reason: rule.disqualifyReason };
      }
      return { eligible: true, reason: null };

    case "formula":
      try {
        // console.log("Formula key", rule.formulaKey)
        // console.log("Formulas", formulas)
        const fn = formulas[rule.formulaKey];
        if (!fn) throw new Error("Formula not found: " + rule.formulaKey);
        const result = fn(facts);
        if (result.eligible === null) {
          return { eligible: null, reason: null };
        }
        return {
          eligible:result.eligible,
          reason: result.eligible ? null : result.disqualifyReason
        };
      } catch (e) {
        console.error("Error evaluating formula:", e);
        return { eligible: null, reason: null };
      }

    default:
      return { eligible: true, reason: null };
  }
}