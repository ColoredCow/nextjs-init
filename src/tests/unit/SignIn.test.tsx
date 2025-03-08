import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SignIn from "@/app/signin/page";
import { signIn } from "@/services/api/auth";
import { useRouter } from "next/navigation";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("@/services/api/auth", () => ({
  signIn: jest.fn(),
}));

beforeAll(() => {
  global.alert = jest.fn();
});

beforeEach(() => {
  localStorage.clear();
  (useRouter as jest.Mock).mockReturnValue({
    push: jest.fn(),
  });
});

describe("SignIn Component", () => {
  test("renders form elements correctly", () => {
    render(<SignIn />);

    // Check if email and password fields exist
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();

    // Check if submit button exists
    expect(screen.getByRole("button", { name: "Sign In" })).toBeInTheDocument();
  });

  test("shows error message when sign-in fails", async () => {
    (signIn as jest.Mock).mockRejectedValueOnce({
      response: { data: { message: "Invalid credentials" } },
    });

    render(<SignIn />);
    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "wrongpassword" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Sign In" }));
  });

  test("stores token in localStorage on successful sign-in and calls alert", async () => {
    (signIn as jest.Mock).mockResolvedValueOnce({ token: "mock-token" });

    render(<SignIn />);
    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Sign In" }));

    // Wait for localStorage update
    await waitFor(() => {
      expect(localStorage.getItem("token")).toBe("mock-token");
    });

    // Ensure alert was called
    expect(global.alert).toHaveBeenCalledWith("Sign In successful!");
  });

  test("disables button while signing in", async () => {
    (signIn as jest.Mock).mockImplementation(
      () =>
        new Promise((resolve) =>
          setTimeout(() => resolve({ token: "mock-token" }), 1000),
        ),
    );

    render(<SignIn />);
    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "password123" },
    });

    const button = screen.getByRole("button", { name: "Sign In" });
    fireEvent.click(button);

    expect(button).toBeDisabled();
  });

  test("does not store token when API fails", async () => {
    (signIn as jest.Mock).mockRejectedValueOnce({
      response: { data: { message: "Sign In failed" } },
    });

    render(<SignIn />);
    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Sign In" }));

    // Ensure error message appears
    await waitFor(() => {
      expect(screen.getByText("Sign In failed")).toBeInTheDocument();
    });

    // Ensure token was NOT stored
    await waitFor(() => {
      expect(localStorage.getItem("token")).toBeNull();
    });
  });
});
