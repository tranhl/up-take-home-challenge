import {
  InterestCalculationInput,
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

    const result = calculateInterest(input);

    expect(Math.round(result.finalBalance)).toBe(13157);
    expect(Math.round(result.interestEarned)).toBe(3157);
    expect(Math.round(result.interestEarnedAtPresentValue)).toBe(2790);
  });

  test("should correctly calculate interest when payout is quarterly", () => {
    const input: InterestCalculationInput = {
      startingBalance: 10000,
      interestRate: 5.5,
      investmentTermInMonths: 5 * 12,
      payoutFrequency: PayoutFrequency.Quarterly,
    };

    const result = calculateInterest(input);

    expect(Math.round(result.finalBalance)).toBe(13141);
    expect(Math.round(result.interestEarned)).toBe(3141);
    expect(Math.round(result.interestEarnedAtPresentValue)).toBe(2776);
  });

  test("should correctly calculate interest when payout is annually", () => {
    const input: InterestCalculationInput = {
      startingBalance: 10000,
      interestRate: 5.5,
      investmentTermInMonths: 5 * 12,
      payoutFrequency: PayoutFrequency.Annually,
    };

    const result = calculateInterest(input);

    expect(Math.round(result.finalBalance)).toBe(13070);
    expect(Math.round(result.interestEarned)).toBe(3070);
    expect(Math.round(result.interestEarnedAtPresentValue)).toBe(2713);
  });

  test("should correctly calculate interest when payout as at maturity", () => {
    const input: InterestCalculationInput = {
      startingBalance: 10000,
      interestRate: 5.5,
      investmentTermInMonths: 5 * 12,
      payoutFrequency: PayoutFrequency.AtMaturity,
    };

    const result = calculateInterest(input);

    expect(Math.round(result.finalBalance)).toBe(12750);
    expect(Math.round(result.interestEarned)).toBe(2750);
    expect(Math.round(result.interestEarnedAtPresentValue)).toBe(2431);
  });
});
