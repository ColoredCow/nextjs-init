import { render, screen } from "@testing-library/react";
import LoginLinks from "@/app/LoginLinks";
import { useAuth } from "@/hooks/auth";

jest.mock("@/hooks/auth", () => ({
  useAuth: jest.fn(),
}));

describe("LoginLinks Component", () => {
  it("renders Dashboard link when user is authenticated", () => {
    useAuth.mockReturnValue({ user: { name: "John Doe" } });

    render(<LoginLinks />);

    expect(screen.getByText("Dashboard")).toBeInTheDocument();
    expect(screen.queryByText("Login")).not.toBeInTheDocument();
    expect(screen.queryByText("Register")).not.toBeInTheDocument();
  });

  it("renders Login and Register links when user is not authenticated", () => {
    useAuth.mockReturnValue({ user: null });

    render(<LoginLinks />);

    expect(screen.getByText("Login")).toBeInTheDocument();
    expect(screen.getByText("Register")).toBeInTheDocument();
    expect(screen.queryByText("Dashboard")).not.toBeInTheDocument();
  });
});
