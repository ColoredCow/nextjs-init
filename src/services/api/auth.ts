import { createCookie } from "../cookiesService";
import api from "./index";

const setAuthToken = (token: string | null) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
};

// Sign In API
export const signIn = async (email: string, password: string) => {
  const response = await api.post("/login", {
    email,
    password,
  });
  if (!response) return [];
  if (response.status === 200) {
    createCookie("token", response.data.access_token);
    setAuthToken(response.data.access_token);
    return response.data;
  }
};

// Sign Up API
export const signUp = async (
  name: string,
  email: string,
  password: string,
  confirmPassword: string,
) => {
  const response = await api.post("/register", {
    name,
    email,
    password,
    password_confirmation: confirmPassword,
  });
  return response.data;
};
