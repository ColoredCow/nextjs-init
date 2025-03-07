"use client";

import { useState } from "react";
import { signIn } from "@/services/api/auth";
import { useRouter } from "next/navigation";

export default function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await signIn(email, password);
      alert("Sign In successful!");
      router.push("/dashboard");
    } catch (err) {
      if (err instanceof Error) {
        const axiosError = err as any; // or use AxiosError from axios types
        setError(
          axiosError.response?.data?.message || err.message || "Sign In failed",
        );
      } else {
        setError("Sign In failed");
      }
    } finally {
      setLoading(false); // Move this inside the `finally` block to always stop loading
    }
  };

  return (
    <div className="bg-white shadow-lg p-8 rounded-lg w-full max-w-md">
      <h1 className="text-3xl font-bold text-center mb-6">Sign In</h1>
      <form onSubmit={handleSignIn} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 border rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 border rounded"
          required
        />
        {error && <p className="text-red-500 text-center">{error}</p>}
        <button
          type="submit"
          className="w-full p-3 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          disabled={loading}
        >
          {loading ? "Signing In..." : "Sign In"}
        </button>
      </form>
    </div>
  );
}
