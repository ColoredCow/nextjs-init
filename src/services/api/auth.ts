import api from "./index";

// Sign In API
export const signIn = async (email: string, password: string) => {
  const response = await api.post("/login", {
    email,
    password,
  });
  return response.data;
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
