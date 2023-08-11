import { PayoutFrequency } from "../../utils/calculateInterest";

export type FormValues = {
  startingBalance: number;
  interestRate: number;
  investmentTermInMonths: number;
  payoutFrequency: PayoutFrequency;
};
