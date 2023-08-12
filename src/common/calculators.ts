import * as formulas from "./formulas";

export enum PayoutFrequency {
  Monthly = "Monthly",
  Quarterly = "Quarterly",
  Annually = "Annually",
  AtMaturity = "AtMaturity",
}

export type InterestCalculationInput = {
  startingBalance: number;
  interestRateInBasisPoints: number;
  investmentTermInMonths: number;
  payoutFrequency: PayoutFrequency;
};

export type InterestCalculationResult = {
  finalBalance: number;
  interestEarned: number;
};

/**
 * Calculate the final balance of a term deposit account.
 *
 * The calculator makes the following assumptions:
 * - All payment frequencies are of equal length.
 * - There are 365 days in a year.
 * - Balances are in dollar amounts, and in AUD.
 * - Inflation is a steady 2.5% for the purposes of calculating real interest value.
 *
 * @returns The final balance and the interest earned, unrounded.
 */
export function termDeposit({
  startingBalance,
  interestRateInBasisPoints,
  investmentTermInMonths,
  payoutFrequency,
}: InterestCalculationInput): InterestCalculationResult {
  if (!Number.isInteger(investmentTermInMonths) || investmentTermInMonths <= 0)
    throw new TypeError(
      "`investmentTermInYears` must be an integer greater than 0",
    );

  const compoundFrequency = getCompoundingFrequency(payoutFrequency);

  const finalBalance = compoundFrequency
    ? formulas.compoundInterest(
        startingBalance,
        interestRateInBasisPoints,
        compoundFrequency,
        investmentTermInMonths / 12,
      )
    : formulas.simpleInterest(
        startingBalance,
        interestRateInBasisPoints,
        investmentTermInMonths / 12,
      );

  const interestEarned = finalBalance - startingBalance;

  return {
    finalBalance,
    interestEarned,
  };
}

function getCompoundingFrequency(
  payoutFrequency: PayoutFrequency,
): number | undefined {
  switch (payoutFrequency) {
    case PayoutFrequency.Monthly:
      return 12;
    case PayoutFrequency.Quarterly:
      return 4;
    case PayoutFrequency.Annually:
      return 1;
    case PayoutFrequency.AtMaturity:
      return undefined;
  }
}

/**
 * Calculates the present value of a future amount.
 * Assumes that the rate is static across the investment term.
 *
 * @returns The present value.
 */
export function presentValue(
  futureValue: number,
  rateInBasisPoints: number,
  investmentTermInYears: number,
): number {
  const rate = rateInBasisPoints / 10000;

  return futureValue * (1 + rate) ** -investmentTermInYears;
}
