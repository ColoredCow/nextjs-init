import { render, screen } from "@testing-library/react";
import Button from "../Button";

describe("Button Component", () => {
  test("renders button with correct text", () => {
    render(<Button variant="primary">Click Me</Button>);
    expect(screen.getByText("Click Me")).toBeInTheDocument();
  });

  test("applies primary styles", () => {
    render(<Button variant="primary">Primary Button</Button>);
    const button = screen.getByText("Primary Button");
    expect(button).toHaveClass("bg-primary-500");
  });
});