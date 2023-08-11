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

  test("should correctly calculate interest when payout is quarterly", () => {
    const input: InterestCalculationInput = {
      startingBalance: 10000,
      interestRate: 5.5,
      investmentTermInMonths: 5 * 12,
      payoutFrequency: PayoutFrequency.Quarterly,
    };

    const expected: InterestCalculationResult = {
      finalBalance: 13141,
      interestEarned: 3141,
      interestEarnedAtPresentValue: 2776,
    };

    expect(calculateInterest(input)).toStrictEqual(expected);
  });

  test("should correctly calculate interest when payout is annually", () => {
    const input: InterestCalculationInput = {
      startingBalance: 10000,
      interestRate: 5.5,
      investmentTermInMonths: 5 * 12,
      payoutFrequency: PayoutFrequency.Annually,
    };

    const expected: InterestCalculationResult = {
      finalBalance: 13070,
      interestEarned: 3070,
      interestEarnedAtPresentValue: 2713,
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
