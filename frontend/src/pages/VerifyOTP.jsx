
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { verifyUserOTP } from "../../../services/authService";

function VerifyOTP() {
  const navigate = useNavigate();

  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const userId = sessionStorage.getItem("pendingUserId");

    console.log("User ID:", userId);
    console.log("Entered OTP:", otp);

    if (!userId) {
      setError("User ID missing. Please register again.");
      return;
    }

    if (otp.length !== 6) {
      setError("Please enter a valid 6-digit OTP.");
      return;
    }

    setLoading(true);

    try {
      const data = await verifyUserOTP({
        userId,
        otp: otp.trim()
      });

      alert(data.message);

      sessionStorage.removeItem("pendingUserId");
      navigate("/login");

    } catch (err) {
      console.error("OTP Verification Error:", err.response?.data);

      setError(
        err.response?.data?.message ||
        "OTP verification failed. Please try again."
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container min-vh-100 d-flex justify-content-center align-items-center">
      <div className="card shadow p-4" style={{ width: "420px" }}>

        <h2 className="text-center mb-3">
          Verify Your Email
        </h2>

        <p className="text-center text-muted">
          Enter the 6-digit OTP sent to your email.
        </p>

        {error && (
          <div className="alert alert-danger">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>

          <input
            className="form-control mb-3 text-center"
            type="text"
            inputMode="numeric"
            maxLength={6}
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) =>
              setOtp(e.target.value.replace(/\D/g, ""))
            }
            required
          />

          <button
            className="btn btn-primary w-100"
            type="submit"
            disabled={loading || otp.length !== 6}
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>

        </form>

        <p className="text-center mt-3">
          Already verified? <Link to="/login">Login</Link>
        </p>

      </div>
    </div>
  );
}

export default VerifyOTP;
