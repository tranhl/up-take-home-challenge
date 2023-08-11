import App from "./App";
import { render, screen } from "@testing-library/react";

describe("<App />", () => {
  test("should render without error", () => {
    render(<App />);

    expect(screen.getByRole("heading")).toHaveTextContent(
      "Term Deposit Calculator",
    );
  });
});
