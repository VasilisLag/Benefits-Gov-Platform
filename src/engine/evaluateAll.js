import { evaluateEligibility } from './evaluateEligibility.js';

export function evaluateAll(questions, facts, benefitId) {
  const reasons = [];
  // let index = 1;
  
  for (const question of questions) {
    // console.log("Called from evaluate all - Index ", index, questions)
    const { eligible, reason } = evaluateEligibility(question, facts, benefitId);
    // console.log("Eligible - Index", index, eligible)
    // console.log("Reason - Index", index++, reason)
    if (!eligible && reason) {
      reasons.push(reason);
    }
  }

  return {
    eligible: reasons.length === 0,
    reasons
  };
}