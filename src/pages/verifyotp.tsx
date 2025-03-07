import { useState } from "react";
import { verifyOtp } from "@/services/api/auth";
import { useRouter } from "next/router";
import { AxiosError } from "axios";

export default function VerifyOtpForm() {
  const router = useRouter();
  const { email } = router.query;
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await verifyOtp(email as string, otp);
      alert("OTP verified! Please sign in.");
      router.push("/signin");
    } catch (err) {
      if (err instanceof AxiosError) {
        setError(err.response?.data?.message || "OTP verification failed");
      } else {
        setError("OTP verification failed");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-lg p-8 rounded-lg w-full max-w-md">
      <h1 className="text-3xl font-bold text-center mb-6">Verify OTP</h1>
      <form onSubmit={handleVerifyOtp} className="space-y-4">
        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="w-full p-3 border rounded"
          required
        />
        {error && <p className="text-red-500 text-center">{error}</p>}
        <button
          type="submit"
          className="w-full p-3 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          disabled={loading}
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </button>
      </form>
    </div>
  );
}
