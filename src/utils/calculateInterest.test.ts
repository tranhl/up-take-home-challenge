import {
  InterestCalculationInput,
  InterestCalculationResult,
  PayoutFrequency,
  calculateInterest,
} from "./calculateInterest";

describe("calculateInterest()", () => {
  test("should correctly calculate interest when payout is monthly", () => {
    const input: InterestCalculationInput = {
      startingBalance: 10000,
      interestRate: 5.5,
      investmentTermInMonths: 5 * 12,
      payoutFrequency: PayoutFrequency.Monthly,
    };

    const expected: InterestCalculationResult = {
      finalBalance: 13157,
      interestEarned: 3157,
      interestEarnedAtPresentValue: 2790,
    };

    expect(calculateInterest(input)).toStrictEqual(expected);
  });

  test("should correctly calculate interest when payout as at maturity", () => {
    const input: InterestCalculationInput = {
      startingBalance: 10000,
      interestRate: 5.5,
      investmentTermInMonths: 5 * 12,
      payoutFrequency: PayoutFrequency.AtMaturity,
    };

    const expected: InterestCalculationResult = {
      finalBalance: 12750,
      interestEarned: 2750,
      interestEarnedAtPresentValue: 2431,
    };

    expect(calculateInterest(input)).toStrictEqual(expected);
  });
});
