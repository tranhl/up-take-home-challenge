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
  investmentTermInMonths: number;
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
  const {
    startingBalance,
    interestRate: interestRateAsNumber,
    investmentTermInMonths,
    payoutFrequency,
  } = inputs;

  if (!Number.isInteger(investmentTermInMonths) || investmentTermInMonths <= 0)
    throw new TypeError(
      "`investmentTermInYears` must be an integer greater than 0",
    );

  const interestRate = interestRateAsNumber / 100;
  const compoundFrequency = getCompoundingFrequency(payoutFrequency);

  const finalBalance = compoundFrequency
    ? calculateCompoundInterest(
        startingBalance,
        interestRate,
        compoundFrequency,
        investmentTermInMonths / 12,
      )
    : calculateSimpleInterest(
        startingBalance,
        interestRate,
        investmentTermInMonths / 12,
      );

  const interestEarned = finalBalance - startingBalance;
  const interestEarnedAtPresentValue =
    interestEarned *
    (1 + INFLATION_RATE / 100) ** -(investmentTermInMonths / 12);

  return {
    finalBalance: Math.round(finalBalance),
    interestEarned: Math.round(interestEarned),
    interestEarnedAtPresentValue: Math.round(interestEarnedAtPresentValue),
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

function calculateCompoundInterest(
  P: number,
  r: number,
  n: number,
  t: number,
): number {
  return P * Math.pow(1 + r / n, n * t);
}

function calculateSimpleInterest(P: number, r: number, t: number) {
  return P * (1 + r * t);
}
