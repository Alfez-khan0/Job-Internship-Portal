
import { useNavigate, useLocation } from 'react-router-dom';

function VerifyOTP() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="container min-vh-100 d-flex justify-content-center align-items-center">
      <div className="card shadow p-4" style={{ width: '400px' }}>
        <h3 className="text-center">Email Verification</h3>
        <p className="text-muted text-center">
          Verification for {location.state?.email || 'your account'}
        </p>

        <input
          className="form-control mb-3"
          placeholder="Enter 6-digit OTP"
          maxLength="6"
        />

        <button
          className="btn btn-primary w-100"
          onClick={() => navigate('/profile')}
        >
          Continue
        </button>
      </div>
    </div>
  );
}

export default VerifyOTP;