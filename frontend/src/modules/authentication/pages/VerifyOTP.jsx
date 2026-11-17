
// import { useState } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { verifyUserOTP } from '../../../services/authService';

// function VerifyOTP() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { email, userId } = location.state || {};
//   const [otp, setOtp] = useState('');
//   const [error, setError] = useState('');
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [isVerified, setIsVerified] = useState(false);

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     setError('');
//     setIsSubmitting(true);

//     try {
//       await verifyUserOTP({ userId, otp });
//       setIsVerified(true);
//     } catch (requestError) {
//       setError(
//         requestError.response?.data?.message ||
//         'Could not verify the code. Check that the backend is running.'
//       );
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="container min-vh-100 d-flex justify-content-center align-items-center">
//       <div className="card shadow p-4" style={{ width: '400px' }}>
//         <h3 className="text-center">Email Verification</h3>
//         <p className="text-muted text-center">
//           Verification for {email || 'your account'}
//         </p>

//         {error && <div className="alert alert-danger" role="alert">{error}</div>}

//         {isVerified ? (
//           <>
//             <div className="alert alert-success" role="status">
//               Email verified successfully. You can now log in.
//             </div>
//             <button className="btn btn-primary w-100" onClick={() => navigate('/login')}>
//               Go to Login
//             </button>
//           </>
//         ) : (
//           <form onSubmit={handleSubmit}>
//             <input
//               className="form-control mb-3"
//               placeholder="Enter 6-digit OTP"
//               inputMode="numeric"
//               autoComplete="one-time-code"
//               pattern="[0-9]{6}"
//               maxLength={6}
//               value={otp}
//               onChange={(event) => setOtp(event.target.value.replace(/\D/g, ''))}
//               required
//             />

//             <button
//               className="btn btn-primary w-100"
//               disabled={isSubmitting || !userId}
//             >
//               {isSubmitting ? 'Verifying...' : 'Verify OTP'}
//             </button>
//             {!userId && (
//               <p className="text-danger mt-3 mb-0" role="alert">
//                 Registration details are missing. Please register again.
//               </p>
//             )}
//           </form>
//         )}
//       </div>
//     </div>
//   );
// }

// export default VerifyOTP;

import "../auth.css";
import "../../../App.css";
import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { verifyUserOTP } from "../../../services/authService";

function VerifyOTP() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "your account";
  const userId = location.state?.userId || sessionStorage.getItem("pendingUserId");

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
      sessionStorage.removeItem("pendingUserId");
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
          <p>Enter the verification code sent to <strong>{email}</strong>.</p>
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
