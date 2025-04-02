import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ProfilePage from "../src/app/(app)/profile/page";
import { useAuth } from "@/hooks/auth";
import { showToast } from "@/components/ToastProvider";

jest.mock("@/hooks/auth");
jest.mock("@/components/ToastProvider", () => ({ showToast: jest.fn() }));

describe("ProfilePage", () => {
  let updateProfile, updatePassword;

  beforeEach(() => {
    updateProfile = jest.fn().mockResolvedValue({});
    updatePassword = jest.fn().mockResolvedValue({});

    useAuth.mockReturnValue({
      user: { name: "John Doe", email: "john@example.com" },
      updateProfile,
      updatePassword,
    });
  });

  test("renders profile page with user details", () => {
    render(<ProfilePage />);
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("john@example.com")).toBeInTheDocument();
  });

  test("updates profile successfully", async () => {
    render(<ProfilePage />);
    const input = screen.getByTestId("name");
    const saveButton = screen.getByTestId("save-profile");

    fireEvent.change(input, { target: { value: "Jane Doe" } });
    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(updateProfile).toHaveBeenCalledWith({
        name: "Jane Doe",
        email: "john@example.com",
        setErrors: expect.any(Function),
      });
      expect(showToast).toHaveBeenCalledWith(
        "Profile updated successfully!",
        "success"
      );
    });
  });

  test("updates password successfully", async () => {
    render(<ProfilePage />);
    fireEvent.change(screen.getByTestId("password"), {
      target: { value: "newpassword" },
    });
    fireEvent.change(screen.getByTestId("passwordConfirmation"), {
      target: { value: "newpassword" },
    });

    fireEvent.click(screen.getByTestId("update-password"));

    await waitFor(() => {
      expect(updatePassword).toHaveBeenCalledWith({
        password: "newpassword",
        password_confirmation: "newpassword",
        setErrors: expect.any(Function),
      });
      expect(showToast).toHaveBeenCalledWith(
        "Password updated successfully!",
        "success"
      );
    });
  });
});
