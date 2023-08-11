const INFLATION_RATE = 2.5;

export enum PayoutFrequency {
  Monthly = "Monthly",
  Quarterly = "Quarterly",
  Annually = "Annually",
  AtMaturity = "AtMaturity",
}

export type InterestCalculationInput = {
  startingBalance: number;
  interestRate: number;
  investmentTermInYears: number;
  payoutFrequency: PayoutFrequency;
};

export type InterestCalculationResult = {
  finalBalance: number;
  interestEarned: number;
  interestEarnedAtPresentValue: number;
};

/**
 * Calculate interest based on the compound interest formula.
 * Resulting values will be rounded to the nearest dollar.
 *
 * The calculator makes the following assumptions:
 * - All payment frequencies are of equal length.
 * - There are 365 days in a year.
 * - Balances are in dollar amounts, and in AUD.
 * - Inflation is a steady 2.5% for the purposes of calculating real interest value.
 */
export function calculateInterest(
  inputs: InterestCalculationInput,
): InterestCalculationResult {
  const { startingBalance, interestRate, investmentTermInYears } = inputs;

  if (!Number.isInteger(investmentTermInYears) || investmentTermInYears <= 0)
    throw new TypeError(
      "`investmentTermInYears` must be an integer greater than 0",
    );

  const paymentFrequencyAsNumber = 12;

  const finalBalance =
    startingBalance *
    (1 + interestRate / 100 / paymentFrequencyAsNumber) **
      (paymentFrequencyAsNumber * investmentTermInYears);
  const interestEarned = finalBalance - startingBalance;
  const interestEarnedAtPresentValue =
    interestEarned * (1 + INFLATION_RATE / 100) ** -investmentTermInYears;

  return {
    finalBalance: Math.round(finalBalance),
    interestEarned: Math.round(interestEarned),
    interestEarnedAtPresentValue: Math.round(interestEarnedAtPresentValue),
  };
}
