import { evaluateEligibility } from './evaluateEligibility.js';

export function evaluateAll(questions, facts, benefitId) {
  const reasons = [];
  
  for (const question of questions) {
    const { eligible, reason } = evaluateEligibility(question, facts, benefitId);

    if (!eligible && reason) {
      reasons.push(reason);
    }
  }

  return {
    eligible: reasons.length === 0,
    reasons
  };
}