export function evaluateEligibility(question, facts, benefitId) {
  const rule = question.eligibility?.[benefitId];
  if (!rule) return { eligible: true, reason: null };

  const value = facts[question.key];

  switch (rule.type) {
    case "match":
      return {
        eligible: value === rule.value,
        reason: value !== rule.value ? rule.disqualifyReason : null
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
        const fn = eval("(" + rule.condition + ")");
        const eligible = fn(facts);
        return {
          eligible,
          reason: eligible ? null : rule.disqualifyReason
        };
      } catch (e) {
        console.error("Error evaluating formula:", e);
        return { eligible: true, reason: null };
      }

    default:
      return { eligible: true, reason: null };
  }
}