import { Card, Input, FormControl, FormLabel } from "@mui/joy";
import { useFormikContext } from "formik";
import { FormValues } from "./types";
import { calculateInterest } from "../../utils/calculateInterest";

export function Results() {
  const { values, dirty, isValid } = useFormikContext<FormValues>();
  const { finalBalance, interestEarned, interestEarnedAtPresentValue } =
    calculateInterest(values);

  const hasErrors = dirty && !isValid;

  return (
    <Card>
      <h1>Result</h1>
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
