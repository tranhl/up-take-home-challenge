import * as formulas from "./formulas";

describe("compoundInterest()", () => {
  test("should correctly calculate interest", () => {
    const result = formulas.compoundInterest(10000, 550, 12, 5);

    expect(result.toFixed(2)).toBe("13157.04");
  });
});

describe("simpleInterest()", () => {
  test("should correctly calculate interest", () => {
    const result = formulas.simpleInterest(10000, 550, 5);

    expect(result.toFixed(2)).toBe("12750.00");
  });
});
