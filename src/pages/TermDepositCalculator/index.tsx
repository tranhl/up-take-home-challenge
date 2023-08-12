import { Container, Grid } from "@mui/joy";
import { Form, Formik } from "formik";
import { PayoutFrequency } from "../../common/calculators";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { object, number } from "zod";
import { CalculatorForm } from "./CalculatorForm";
import { Results } from "./Results";

export function TermDepositCalculatorPage() {
  return (
    <Container maxWidth="lg">
      <Formik
        initialValues={{
          startingBalance: 10000,
          interestRate: 2.5,
          investmentTermInMonths: 12,
          payoutFrequency: PayoutFrequency.Monthly,
        }}
        validationSchema={toFormikValidationSchema(
          object({
            startingBalance: number({
              required_error: "Please enter a starting balance",
              invalid_type_error: "Starting balance must be a number",
            }).positive(),
            interestRate: number().positive(),
            investmentTermInMonths: number().positive().int(),
          }),
        )}
        onSubmit={() => {}}
      >
        <Form>
          <Grid container spacing={2}>
            <Grid xs={6}>
              <CalculatorForm />
            </Grid>

            <Grid xs={6}>
              <Results />
            </Grid>
          </Grid>
        </Form>
      </Formik>
    </Container>
  );
}
