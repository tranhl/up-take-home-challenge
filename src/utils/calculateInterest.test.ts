import {
  InterestCalculationInput,
  InterestCalculationResult,
  PayoutFrequency,
  calculateInterest,
} from "./calculateInterest";

describe("calculateInterest()", () => {
  test("should correctly calculate interest when frequency is monthly", () => {
    const input: InterestCalculationInput = {
      startingBalance: 10000,
      interestRate: 5.5,
      investmentTermInYears: 5,
      payoutFrequency: PayoutFrequency.Monthly,
    };

    const expected: InterestCalculationResult = {
      finalBalance: 13157,
      interestEarned: 3157,
      interestEarnedAtPresentValue: 2790,
    };

    expect(calculateInterest(input)).toStrictEqual(expected);
  });
});
