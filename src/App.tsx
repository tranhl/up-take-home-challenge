import { Card, Container } from "@mui/joy";
import styled from "@emotion/styled";

const Root = styled.div({
  display: "flex",
  height: "100%",
  justifyContent: "center",
  alignItems: "center",
});

function App() {
  return (
    <Root>
      <Container maxWidth="md">
        <Card>
          <h1>Term Deposit Calculator</h1>
        </Card>
      </Container>
    </Root>
  );
}

export default App;
