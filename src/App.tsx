import {
  Card,
  Container,
  Input,
  Slider,
  Select,
  Option,
  FormControl,
  FormLabel,
  Grid,
} from "@mui/joy";
import styled from "@emotion/styled";
import { useFormik } from "formik";
import { PayoutFrequency, calculateInterest } from "./utils/calculateInterest";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { object, number } from "zod";

const Root = styled.div({
  display: "flex",
  height: "100%",
  justifyContent: "center",
  alignItems: "center",
});

function App() {
  const formik = useFormik({
    initialValues: {
      startingBalance: 10000,
      interestRate: 2.5,
      investmentTermInMonths: 12,
      payoutFrequency: PayoutFrequency.Monthly,
    },
    validationSchema: toFormikValidationSchema(
      object({
        startingBalance: number().positive(),
        interestRate: number().positive(),
        investmentTermInMonths: number().positive().int(),
      }),
    ),
    onSubmit: () => {},
  });

  const { values, handleChange, setFieldValue } = formik;
  const { finalBalance, interestEarned, interestEarnedAtPresentValue } =
    calculateInterest(values);

  return (
    <Root>
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          <Grid xs={6}>
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
                  onChange={(event, value) =>
                    setFieldValue("payoutFrequency", value)
                  }
                >
                  <Option value={PayoutFrequency.Monthly}>Monthly</Option>
                  <Option value={PayoutFrequency.Quarterly}>Quarterly</Option>
                  <Option value={PayoutFrequency.Annually}>Annually</Option>
                  <Option value={PayoutFrequency.AtMaturity}>
                    At maturity
                  </Option>
                </Select>
              </FormControl>
            </Card>
          </Grid>

          <Grid xs={6}>
            <Card>
              <h1>Result</h1>
              <FormControl>
                <FormLabel>Final balance</FormLabel>
                <Input
                  readOnly
                  startDecorator="$"
                  value={Math.round(finalBalance)}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Interest earned</FormLabel>
                <Input
                  readOnly
                  startDecorator="$"
                  value={Math.round(interestEarned)}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Interest present value</FormLabel>
                <Input
                  readOnly
                  startDecorator="$"
                  value={Math.round(interestEarnedAtPresentValue)}
                />
              </FormControl>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Root>
  );
}

export default App;
