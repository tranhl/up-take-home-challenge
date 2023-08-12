import { Card, Input, FormControl, FormLabel, Typography } from "@mui/joy";
import { useFormikContext } from "formik";
import { FormValues } from "./types";
import * as calculators from "../../common/calculators";

const INFLATION_RATE_IN_BASIS_POINTS = 250;

export function Results() {
  const { values, dirty, isValid } = useFormikContext<FormValues>();

  const { finalBalance, interestEarned } = calculators.termDeposit({
    startingBalance: values.startingBalance,
    interestRateInBasisPoints: values.interestRate * 100,
    investmentTermInMonths: values.investmentTermInMonths,
    payoutFrequency: values.payoutFrequency,
  });

  const interestEarnedAtPresentValue = calculators.presentValue(
    interestEarned,
    INFLATION_RATE_IN_BASIS_POINTS,
    values.investmentTermInMonths / 12,
  );

  const hasErrors = dirty && !isValid;

  return (
    <Card>
      <Typography level="h1">Result</Typography>
      <FormControl>
        <FormLabel>Final balance</FormLabel>
        <Input
          readOnly
          startDecorator="$"
          value={hasErrors ? 0 : Math.round(finalBalance)}
        />
      </FormControl>

      <FormControl>
        <FormLabel>Interest earned</FormLabel>
        <Input
          readOnly
          startDecorator="$"
          value={hasErrors ? 0 : Math.round(interestEarned)}
        />
      </FormControl>

      <FormControl>
        <FormLabel>Interest present value</FormLabel>
        <Input
          readOnly
          startDecorator="$"
          value={hasErrors ? 0 : Math.round(interestEarnedAtPresentValue)}
        />
      </FormControl>
    </Card>
  );
}
