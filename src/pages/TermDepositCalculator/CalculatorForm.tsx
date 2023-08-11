import {
  Card,
  Input,
  Slider,
  Select,
  Option,
  FormControl,
  FormLabel,
} from "@mui/joy";
import { useFormikContext } from "formik";
import { FormValues } from "./types";
import { PayoutFrequency } from "../../utils/calculateInterest";

export function CalculatorForm() {
  const { values, handleChange, setFieldValue } =
    useFormikContext<FormValues>();

  return (
    <Card>
      <h1>Term Deposit Calculator</h1>

      <FormControl>
        <FormLabel>Starting balance</FormLabel>
        <Input
          name="startingBalance"
          startDecorator="$"
          value={values.startingBalance}
          onChange={handleChange}
        />
      </FormControl>

      <FormControl>
        <FormLabel>Interest rate</FormLabel>
        <Input
          name="interestRate"
          endDecorator="%"
          placeholder="2.5"
          value={values.interestRate}
          onChange={handleChange}
        />
      </FormControl>

      <FormControl>
        <FormLabel>Investment term</FormLabel>
        <Input
          readOnly
          value={
            values.investmentTermInMonths === 1
              ? "1 month"
              : `${values.investmentTermInMonths} months`
          }
        />
        <Slider
          name="investmentTermInMonths"
          step={1}
          min={1}
          max={60}
          value={values.investmentTermInMonths}
          onChange={handleChange}
        />
      </FormControl>

      <FormControl>
        <FormLabel>Interest paid</FormLabel>
        <Select
          name="payoutFrequency"
          value={values.payoutFrequency}
          onChange={(event, value) => setFieldValue("payoutFrequency", value)}
        >
          <Option value={PayoutFrequency.Monthly}>Monthly</Option>
          <Option value={PayoutFrequency.Quarterly}>Quarterly</Option>
          <Option value={PayoutFrequency.Annually}>Annually</Option>
          <Option value={PayoutFrequency.AtMaturity}>At maturity</Option>
        </Select>
      </FormControl>
    </Card>
  );
}
