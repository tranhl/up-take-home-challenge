/**
 * Calculates compound interest.
 *
 * @returns The principal sum plus compounded interest, unrounded.
 */
export function compoundInterest(
  principal: number,
  rateInBasisPoints: number,
  compoundingFrequency: number,
  termLengthInYears: number,
): number {
  const rate = rateInBasisPoints / 10000;

  return (
    principal *
    Math.pow(
      1 + rate / compoundingFrequency,
      compoundingFrequency * termLengthInYears,
    )
  );
}

/**
 * Calculates simple interest.
 *
 * @returns The principal sum plus interest, unrounded.
 */
export function simpleInterest(
  principal: number,
  rateInBasisPoints: number,
  termLengthInYears: number,
) {
  const rate = rateInBasisPoints / 10000;

  return principal * (1 + rate * termLengthInYears);
}
