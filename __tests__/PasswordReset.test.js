import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import PasswordReset from "@/app/(auth)/password-reset/[token]/page";
import { useAuth } from "@/hooks/auth";
import { useSearchParams } from "next/navigation";

jest.mock("@/hooks/auth", () => ({
  useAuth: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  useSearchParams: jest.fn(),
}));

describe("PasswordReset Component", () => {
  let mockResetPassword, mockSearchParams;

  beforeEach(() => {
    mockResetPassword = jest.fn();
    mockSearchParams = { get: jest.fn(() => "test@example.com") };

    useAuth.mockReturnValue({ resetPassword: mockResetPassword });
    useSearchParams.mockReturnValue(mockSearchParams);
  });

  it("renders all input fields and the Reset Password button", () => {
    render(<PasswordReset />);

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /reset password/i })
    ).toBeInTheDocument();
  });

  it("updates input values on change", () => {
    render(<PasswordReset />);

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText("Password");
    const confirmPasswordInput = screen.getByLabelText(/confirm password/i);

    fireEvent.change(emailInput, { target: { value: "user@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.change(confirmPasswordInput, {
      target: { value: "password123" },
    });

    expect(emailInput.value).toBe("user@example.com");
    expect(passwordInput.value).toBe("password123");
    expect(confirmPasswordInput.value).toBe("password123");
  });

  it("calls resetPassword function on form submit", async () => {
    render(<PasswordReset />);

    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "password123" },
    });
    fireEvent.change(screen.getByLabelText(/confirm password/i), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByRole("button", { name: /reset password/i }));

    await waitFor(() =>
      expect(mockResetPassword).toHaveBeenCalledWith({
        email: "test@example.com",
        password: "password123",
        password_confirmation: "password123",
        setErrors: expect.any(Function),
        setStatus: expect.any(Function),
      })
    );
  });
});
