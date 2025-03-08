import { useState } from "react";
import { signUp } from "@/services/api/auth";
import { useRouter } from "next/router";
import { AxiosError } from "axios"; // Import AxiosError for better error handling

export default function SignUpForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await signUp(name, email, password, confirmPassword);
      alert("Registration successful! Please Verify You Email address.");
      router.push("/signin");
    } catch (err) {
      if (err instanceof AxiosError) {
        setError(err.response?.data?.message || "Sign Up failed");
      } else if (err instanceof Error) {
        setError(err.message || "Sign Up failed");
      } else {
        setError("Sign Up failed");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-lg p-8 rounded-lg w-full max-w-md">
      <h1 className="text-3xl font-bold text-center mb-6">Sign Up</h1>
      <form onSubmit={handleSignUp} className="space-y-4">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 border rounded"
          required
        />
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
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full p-3 border rounded"
          required
        />
        {error && <p className="text-red-500 text-center">{error}</p>}
        <button
          type="submit"
          className="w-full p-3 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          disabled={loading}
        >
          {loading ? "Signing Up..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
}
