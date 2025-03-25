import { renderHook, act } from "@testing-library/react";
import { useAuth } from "@/hooks/auth";
import axios from "@/lib/axios";
import useSWR from "swr";

jest.mock("swr");
jest.mock("@/lib/axios", () => ({
  post: jest.fn(),
  put: jest.fn(),
  get: jest.fn(),
}));
jest.mock("next/navigation", () => ({
  useRouter: jest.fn().mockReturnValue({ push: jest.fn() }),
  useParams: jest.fn().mockReturnValue({ token: "mockToken" }),
}));

describe("useAuth Hook", () => {
  let mutate;

  beforeEach(() => {
    jest.clearAllMocks();
    delete window.location;
    window.location = { pathname: "/" };
    mutate = jest.fn();
    useSWR.mockReturnValue({ data: null, error: null, mutate });
  });

  test("should return user data", async () => {
    useSWR.mockReturnValue({ data: { name: "John Doe" }, error: null, mutate });

    const { result } = renderHook(() => useAuth());
    expect(result.current.user).toEqual({ name: "John Doe" });
  });

  test("register should call API and mutate on success", async () => {
    axios.post.mockResolvedValue({});
    const { result } = renderHook(() => useAuth());

    await act(async () => {
      await result.current.register({
        setErrors: jest.fn(),
        name: "John",
        email: "john@example.com",
      });
    });

    expect(axios.post).toHaveBeenCalledWith("/register", {
      name: "John",
      email: "john@example.com",
    });
    expect(mutate).toHaveBeenCalled();
  });

  test("login should call API and mutate on success", async () => {
    axios.post.mockResolvedValue({});
    const { result } = renderHook(() => useAuth());

    await act(async () => {
      await result.current.login({
        setErrors: jest.fn(),
        setStatus: jest.fn(),
        email: "john@example.com",
        password: "password",
      });
    });

    expect(axios.post).toHaveBeenCalledWith("/login", {
      email: "john@example.com",
      password: "password",
    });
    expect(mutate).toHaveBeenCalled();
  });

  test("forgotPassword should call API and set status on success", async () => {
    const setStatus = jest.fn();
    axios.post.mockResolvedValue({
      data: { status: "Password reset link sent" },
    });

    const { result } = renderHook(() => useAuth());

    await act(async () => {
      await result.current.forgotPassword({
        setErrors: jest.fn(),
        setStatus,
        email: "john@example.com",
      });
    });

    expect(axios.post).toHaveBeenCalledWith("/forgot-password", {
      email: "john@example.com",
    });
    expect(setStatus).toHaveBeenCalledWith("Password reset link sent");
  });

  test("resetPassword should call API and navigate on success", async () => {
    const mockRouter = require("next/navigation").useRouter();
    axios.post.mockResolvedValue({
      data: { status: "Password reset successful" },
    });

    const { result } = renderHook(() => useAuth());

    await act(async () => {
      await result.current.resetPassword({
        setErrors: jest.fn(),
        setStatus: jest.fn(),
        password: "newpassword",
        password_confirmation: "newpassword",
      });
    });

    expect(axios.post).toHaveBeenCalledWith("/reset-password", {
      token: "mockToken",
      password: "newpassword",
      password_confirmation: "newpassword",
    });
    expect(mockRouter.push).toHaveBeenCalledWith(
      "/login?reset=" + btoa("Password reset successful")
    );
  });

  test("updateProfile should call API on success", async () => {
    axios.put.mockResolvedValue({});
    const { result } = renderHook(() => useAuth());

    await act(async () => {
      await result.current.updateProfile({
        name: "John Doe",
        email: "john@example.com",
        setErrors: jest.fn(),
      });
    });

    expect(axios.put).toHaveBeenCalledWith("/api/profile", {
      name: "John Doe",
      email: "john@example.com",
    });
  });

  test("updatePassword should call API on success", async () => {
    axios.put.mockResolvedValue({ data: { message: "Password updated" } });

    const { result } = renderHook(() => useAuth());
    const setErrors = jest.fn();

    await act(async () => {
      await result.current.updatePassword({
        password: "newpassword",
        password_confirmation: "newpassword",
        setErrors,
      });
    });

    expect(axios.put).toHaveBeenCalledWith("/api/profile/password", {
      password: "newpassword",
      password_confirmation: "newpassword",
    });
    expect(setErrors).toHaveBeenCalledWith([]);
  });

  test("resendEmailVerification should call API and set status on success", async () => {
    const setStatus = jest.fn();
    axios.post.mockResolvedValue({
      data: { status: "Verification email sent" },
    });

    const { result } = renderHook(() => useAuth());

    await act(async () => {
      await result.current.resendEmailVerification({ setStatus });
    });

    expect(axios.post).toHaveBeenCalledWith("/email/verification-notification");
    expect(setStatus).toHaveBeenCalledWith("Verification email sent");
  });

  test("logout should call API and mutate on success", async () => {
    axios.post.mockResolvedValue({});
    const mockRouter = require("next/navigation").useRouter();
    const { result } = renderHook(() => useAuth());

    await act(async () => {
      await result.current.logout();
    });

    expect(axios.post).toHaveBeenCalledWith("/logout");
    expect(mutate).toHaveBeenCalled();
    expect(window.location.pathname).toBe("/login");
  });
});
