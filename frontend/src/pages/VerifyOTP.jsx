
// import { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { verifyUserOTP } from "../../../services/authService";

// function VerifyOTP() {
//   const navigate = useNavigate();

//   const [otp, setOtp] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");

//     const userId = sessionStorage.getItem("pendingUserId");

//     console.log("User ID:", userId);
//     console.log("Entered OTP:", otp);

//     if (!userId) {
//       setError("User ID missing. Please register again.");
//       return;
//     }

//     if (otp.length !== 6) {
//       setError("Please enter a valid 6-digit OTP.");
//       return;
//     }

//     setLoading(true);

//     try {
//       const data = await verifyUserOTP({
//         userId,
//         otp: otp.trim()
//       });

//       alert(data.message);

//       sessionStorage.removeItem("pendingUserId");
//       navigate("/login");

//     } catch (err) {
//       console.error("OTP Verification Error:", err.response?.data);

//       setError(
//         err.response?.data?.message ||
//         "OTP verification failed. Please try again."
//       );

//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="container min-vh-100 d-flex justify-content-center align-items-center">
//       <div className="card shadow p-4" style={{ width: "420px" }}>

//         <h2 className="text-center mb-3">
//           Verify Your Email
//         </h2>

//         <p className="text-center text-muted">
//           Enter the 6-digit OTP sent to your email.
//         </p>

//         {error && (
//           <div className="alert alert-danger">
//             {error}
//           </div>
//         )}

//         <form onSubmit={handleSubmit}>

//           <input
//             className="form-control mb-3 text-center"
//             type="text"
//             inputMode="numeric"
//             maxLength={6}
//             placeholder="Enter OTP"
//             value={otp}
//             onChange={(e) =>
//               setOtp(e.target.value.replace(/\D/g, ""))
//             }
//             required
//           />

//           <button
//             className="btn btn-primary w-100"
//             type="submit"
//             disabled={loading || otp.length !== 6}
//           >
//             {loading ? "Verifying..." : "Verify OTP"}
//           </button>

//         </form>

//         <p className="text-center mt-3">
//           Already verified? <Link to="/login">Login</Link>
//         </p>

//       </div>
//     </div>
//   );
// }

// export default VerifyOTP;


import "./App.css";
import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { verifyUserOTP } from "../../../services/authService";

function VerifyOTP() {
  const navigate = useNavigate();
  const location = useLocation();
  const { email, userId } = location.state || {};
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      await verifyUserOTP({ userId, otp });
      setIsVerified(true);
    } catch (requestError) {
      setError(
        requestError.response?.data?.message ||
        "Could not verify the code. Check that the backend is running."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="auth-page">
      <nav className="portal-navbar">
        <div className="portal-nav-inner">
          <Link className="portal-brand" to="/">Job &amp; Internship <span>Portal</span></Link>
          <div className="portal-nav-links">
            <Link to="/">Home</Link>
            <Link to="/job-recommendations">Jobs</Link>
            <Link to="/mentor-matching">Mentors</Link>
            <a href="/#about">About</a>
          </div>
          <div className="portal-nav-actions">
            <Link className="nav-login" to="/login">Log in</Link>
            <Link className="portal-button portal-button-small" to="/register">Sign up</Link>
          </div>
        </div>
      </nav>

      <main className="auth-card otp-card">
        <div className="otp-icon" aria-hidden="true">✉</div>
        <div className="auth-title">
          <h1>Verify your email</h1>
          <p>Verification code sent to <strong>{email || "your account"}</strong></p>
        </div>

        {error && <div className="portal-alert portal-alert-error" role="alert">{error}</div>}

        {isVerified ? (
          <>
            <div className="portal-alert portal-alert-success" role="status">
              Email verified successfully. You can now log in.
            </div>
            <button className="portal-button portal-button-full" onClick={() => navigate("/login")}>
              Go to Login
            </button>
          </>
        ) : (
          <form onSubmit={handleSubmit}>
            <label className="otp-label" htmlFor="otp-code">Enter verification code</label>
            <div className="otp-input-wrap">
              <input
                id="otp-code"
                className="otp-input"
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                pattern="[0-9]{6}"
                maxLength={6}
                value={otp}
                onChange={(event) => setOtp(event.target.value.replace(/\D/g, ""))}
                required
              />
              <div className="otp-digits" aria-hidden="true">
                {Array.from({ length: 6 }, (_, index) => (
                  <span className={otp[index] ? "filled" : ""} key={index}>
                    {otp[index] || ""}
                  </span>
                ))}
              </div>
            </div>

            <button
              className="portal-button portal-button-full"
              type="submit"
              disabled={isSubmitting || !userId || otp.length !== 6}
            >
              {isSubmitting ? "Verifying..." : "Verify"}
            </button>

            {!userId && (
              <p className="otp-error-note" role="alert">
                Registration details are missing. Please register again.
              </p>
            )}
          </form>
        )}
      </main>
    </div>
  );
}

export default VerifyOTP;
