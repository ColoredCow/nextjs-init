import { render, screen, fireEvent } from "@testing-library/react";
import Login from "@/app/(auth)/login/page";
import { useAuth } from "@/hooks/auth";
import { useRouter } from "next/navigation";

jest.mock("@/hooks/auth", () => ({
  useAuth: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("Login Component", () => {
  const mockLogin = jest.fn();
  const mockPush = jest.fn();

  beforeEach(() => {
    useAuth.mockReturnValue({ login: mockLogin });
    useRouter.mockReturnValue({ push: mockPush });
  });

  it("renders Login component correctly", () => {
    render(<Login />);

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/remember me/i)).toBeInTheDocument();
    expect(screen.getByText(/forgot your password\?/i)).toBeInTheDocument();
    expect(screen.getByText(/login/i)).toBeInTheDocument();
  });

  it("submits the form with correct data", () => {
    render(<Login />);

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "password" },
    });
    fireEvent.click(screen.getByLabelText(/remember me/i));
    fireEvent.click(screen.getByText(/login/i));

    expect(mockLogin).toHaveBeenCalledWith({
      email: "test@example.com",
      password: "password",
      remember: true,
      setErrors: expect.any(Function),
      setStatus: expect.any(Function),
    });
  });
});
