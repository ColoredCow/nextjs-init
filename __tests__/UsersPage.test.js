import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import UsersPage from "../src/app/(app)/users/page";
import { useUserActions } from "@/hooks/user";
import { useAuth } from "@/hooks/auth";
import React from "react";

// Mock hooks
jest.mock("@/hooks/user");
jest.mock("@/hooks/auth");

const mockUsers = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    roles: [{ name: "Admin" }],
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    roles: [{ name: "User" }],
  },
];

const mockRoles = [
  { id: 1, name: "Admin" },
  { id: 2, name: "User" },
];

describe("UsersPage Component", () => {
  let mockFetchUsers, mockFetchRoles, mockUpdateUserRoles, mockDeleteUser;

  beforeEach(() => {
    mockFetchUsers = jest
      .fn()
      .mockResolvedValue({ data: mockUsers, last_page: 1 });
    mockFetchRoles = jest.fn().mockResolvedValue(mockRoles);
    mockUpdateUserRoles = jest.fn().mockResolvedValue({});
    mockDeleteUser = jest.fn().mockResolvedValue({});

    useUserActions.mockReturnValue({
      fetchUsers: mockFetchUsers,
      fetchRoles: mockFetchRoles,
      updateUserRoles: mockUpdateUserRoles,
      deleteUser: mockDeleteUser,
    });

    useAuth.mockReturnValue({ user: { id: 3, name: "Admin User" } });
  });

  test("renders user list and roles dropdown correctly", async () => {
    render(<UsersPage />);

    // Check loading state
    expect(screen.getByTestId("loading-users")).toBeInTheDocument();

    await waitFor(() => {
      expect(mockFetchUsers).toHaveBeenCalledTimes(1);
      expect(screen.queryByTestId("loading-users")).not.toBeInTheDocument();
    });

    // Verify user data
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Jane Smith")).toBeInTheDocument();

    // Verify role selects
    expect(screen.getByTestId("role-select-1")).toBeInTheDocument();
    expect(screen.getByTestId("role-select-2")).toBeInTheDocument();
  });

  test("updates user role and refreshes data", async () => {
    render(<UsersPage />);

    await waitFor(() => expect(mockFetchUsers).toHaveBeenCalledTimes(1));

    const roleSelect = await screen.findByTestId("role-select-2");
    fireEvent.change(roleSelect, { target: { value: "Admin" } });

    await waitFor(() => {
      expect(mockUpdateUserRoles).toHaveBeenCalledWith(2, ["Admin"]);
      expect(mockFetchUsers).toHaveBeenCalledTimes(2);
    });
  });

  test("deletes a user after confirmation", async () => {
    render(<UsersPage />);

    await waitFor(() => expect(mockFetchUsers).toHaveBeenCalledTimes(1));

    const deleteButton = await screen.findByTestId("delete-user-2");
    fireEvent.click(deleteButton);

    const confirmButton = await screen.findByText("Confirm");
    fireEvent.click(confirmButton);

    await waitFor(() => {
      expect(mockDeleteUser).toHaveBeenCalledWith(2);
      expect(mockFetchUsers).toHaveBeenCalledTimes(2);
    });
  });

  test("handles pagination with Next button", async () => {
    mockFetchUsers.mockResolvedValueOnce({ data: mockUsers, last_page: 2 });

    render(<UsersPage />);

    await waitFor(() => expect(mockFetchUsers).toHaveBeenCalledTimes(1));

    const nextButton = await screen.findByTestId("pagination-next");
    fireEvent.click(nextButton);

    await waitFor(() => expect(mockFetchUsers).toHaveBeenCalledWith(2));
  });
});
