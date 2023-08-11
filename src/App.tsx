import styled from "@emotion/styled";
import { TermDepositCalculatorPage } from "./pages/TermDepositCalculator";

const Root = styled.div({
  display: "flex",
  height: "100%",
  justifyContent: "center",
  alignItems: "center",
});

function App() {
  return (
    <Root>
      <TermDepositCalculatorPage />
    </Root>
  );
}

export default App;
