import {
  Card,
  Input,
  Slider,
  Select,
  Option,
  FormLabel,
  Typography,
} from "@mui/joy";
import { useFormikContext } from "formik";
import { FormValues } from "./types";
import { PayoutFrequency } from "../../common/calculators";

export function CalculatorForm() {
  const { values, errors, handleChange, setFieldValue } =
    useFormikContext<FormValues>();

  return (
    <Card>
      <Typography level="h1">Term Deposit Calculator</Typography>

      <div>
        <label>Starting balance</label>
        <Input
          name="startingBalance"
          startDecorator="$"
          value={values.startingBalance}
          error={!!errors.startingBalance}
          onChange={(event) => {
            const value = Number.parseFloat(event.target.value);

            setFieldValue(
              "startingBalance",
              isNaN(value) ? event.target.value : value,
            );
          }}
        />
        {errors.startingBalance ?? <span>{errors.startingBalance}</span>}
      </div>

      <div>
        <FormLabel>Interest rate</FormLabel>
        <Input
          name="interestRate"
          type="number"
          endDecorator="%"
          placeholder="2.5"
          slotProps={{
            input: {
              step: "0.1",
            },
          }}
          value={values.interestRate}
          onChange={handleChange}
        />
      </div>

      <div>
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
      </div>

      <div>
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
      </div>
    </Card>
  );
}
