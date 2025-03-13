import { render, screen, fireEvent } from "@testing-library/react";
import Page from "@/app/(auth)/register/page";
import { useAuth } from "@/hooks/auth";

jest.mock("@/hooks/auth", () => ({
  useAuth: jest.fn(),
}));

describe("Page Component", () => {
  let mockRegister;

  beforeEach(() => {
    mockRegister = jest.fn();
    useAuth.mockReturnValue({ register: mockRegister });
  });

  it("renders all input fields and the register button", () => {
    render(<Page />);

    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByLabelText("Confirm Password")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /register/i })
    ).toBeInTheDocument();
  });

  it("updates input fields on change", () => {
    render(<Page />);

    const nameInput = screen.getByLabelText(/name/i);
    fireEvent.change(nameInput, { target: { value: "John Doe" } });
    expect(nameInput.value).toBe("John Doe");

    const emailInput = screen.getByLabelText(/email/i);
    fireEvent.change(emailInput, { target: { value: "john@example.com" } });
    expect(emailInput.value).toBe("john@example.com");
  });

  it("calls register function on form submit", () => {
    render(<Page />);

    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "john@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "password123" },
    });
    fireEvent.change(screen.getByLabelText("Confirm Password"), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByRole("button", { name: /register/i }));

    expect(mockRegister).toHaveBeenCalledWith({
      name: "John Doe",
      email: "john@example.com",
      password: "password123",
      password_confirmation: "password123",
      setErrors: expect.any(Function),
    });
  });
});
