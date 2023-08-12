import {
  InterestCalculationInput,
  PayoutFrequency,
  presentValue,
  termDeposit,
} from "./calculators";

describe("termDeposit()", () => {
  test("should correctly calculate interest when payout is monthly", () => {
    const input: InterestCalculationInput = {
      startingBalance: 10000,
      interestRateInBasisPoints: 550,
      investmentTermInMonths: 5 * 12,
      payoutFrequency: PayoutFrequency.Monthly,
    };

    const result = termDeposit(input);

    expect(Math.round(result.finalBalance)).toBe(13157);
    expect(Math.round(result.interestEarned)).toBe(3157);
  });

  test("should correctly calculate interest when payout is quarterly", () => {
    const input: InterestCalculationInput = {
      startingBalance: 10000,
      interestRateInBasisPoints: 550,
      investmentTermInMonths: 5 * 12,
      payoutFrequency: PayoutFrequency.Quarterly,
    };

    const result = termDeposit(input);

    expect(Math.round(result.finalBalance)).toBe(13141);
    expect(Math.round(result.interestEarned)).toBe(3141);
  });

  test("should correctly calculate interest when payout is annually", () => {
    const input: InterestCalculationInput = {
      startingBalance: 10000,
      interestRateInBasisPoints: 550,
      investmentTermInMonths: 5 * 12,
      payoutFrequency: PayoutFrequency.Annually,
    };

    const result = termDeposit(input);

    expect(Math.round(result.finalBalance)).toBe(13070);
    expect(Math.round(result.interestEarned)).toBe(3070);
  });

  test("should correctly calculate interest when payout as at maturity", () => {
    const input: InterestCalculationInput = {
      startingBalance: 10000,
      interestRateInBasisPoints: 550,
      investmentTermInMonths: 5 * 12,
      payoutFrequency: PayoutFrequency.AtMaturity,
    };

    const result = termDeposit(input);

    expect(Math.round(result.finalBalance)).toBe(12750);
    expect(Math.round(result.interestEarned)).toBe(2750);
  });
});

describe("presentValue()", () => {
  test("should correctly calculate present value", () => {
    const result = presentValue(5000, 250, 5);

    expect(result.toFixed(2)).toBe("4419.27");
  });
});
