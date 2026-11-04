
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { verifyUserOTP } from '../../../services/authService';

function VerifyOTP() {
  const navigate = useNavigate();
  const location = useLocation();
  const { email, userId } = location.state || {};
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      await verifyUserOTP({ userId, otp });
      setIsVerified(true);
    } catch (requestError) {
      setError(
        requestError.response?.data?.message ||
        'Could not verify the code. Check that the backend is running.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container min-vh-100 d-flex justify-content-center align-items-center">
      <div className="card shadow p-4" style={{ width: '400px' }}>
        <h3 className="text-center">Email Verification</h3>
        <p className="text-muted text-center">
          Verification for {email || 'your account'}
        </p>

        {error && <div className="alert alert-danger" role="alert">{error}</div>}

        {isVerified ? (
          <>
            <div className="alert alert-success" role="status">
              Email verified successfully. You can now log in.
            </div>
            <button className="btn btn-primary w-100" onClick={() => navigate('/login')}>
              Go to Login
            </button>
          </>
        ) : (
          <form onSubmit={handleSubmit}>
            <input
              className="form-control mb-3"
              placeholder="Enter 6-digit OTP"
              inputMode="numeric"
              autoComplete="one-time-code"
              pattern="[0-9]{6}"
              maxLength={6}
              value={otp}
              onChange={(event) => setOtp(event.target.value.replace(/\D/g, ''))}
              required
            />

            <button
              className="btn btn-primary w-100"
              disabled={isSubmitting || !userId}
            >
              {isSubmitting ? 'Verifying...' : 'Verify OTP'}
            </button>
            {!userId && (
              <p className="text-danger mt-3 mb-0" role="alert">
                Registration details are missing. Please register again.
              </p>
            )}
          </form>
        )}
      </div>
    </div>
  );
}

export default VerifyOTP;