export enum PaymentFrequency {
  Monthly = "Monthly",
  Quarterly = "Quarterly",
  Annually = "Annually",
  AtMaturity = "AtMaturity",
}

export type InterestCalculationInput = {
  startingBalance: number;
  interestRate: number;
  investmentTermInMonths: number;
  paymentFrequency: PaymentFrequency;
};

export type InterestCalculationResult = {
  finalBalance: number;
  interestEarned: number;
  interestEarnedAtPresentValue: number;
};

/**
 * Calculate interest based on the compound interest formula.
 * Allows adjustment of the interest payment frequency.
 */
export function calculateInterest(
  inputs: InterestCalculationInput,
): InterestCalculationResult {
  return {
    finalBalance: inputs.startingBalance,
    interestEarned: 0,
    interestEarnedAtPresentValue: 0,
  };
}
