import { PayoutFrequency } from "../../common/calculators";

export type FormValues = {
  startingBalance: number;
  interestRate: number;
  investmentTermInMonths: number;
  payoutFrequency: PayoutFrequency;
};
