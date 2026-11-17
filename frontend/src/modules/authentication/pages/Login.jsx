
// import { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';

// function Login() {
//   const navigate = useNavigate();

//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     navigate('/profile');
//   };

//   return (
//     <div className="container min-vh-100 d-flex justify-content-center align-items-center">
//       <div className="card shadow p-4" style={{ width: '420px' }}>

//         <h2 className="text-center mb-2">Welcome Back!</h2>

//         <p className="text-center text-muted">
//           Login to your account
//         </p>

//         <form onSubmit={handleSubmit}>
//           <input
//             className="form-control mb-3"
//             type="email"
//             placeholder="Email Address"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />

//           <input
//             className="form-control mb-3"
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />

//           <button className="btn btn-primary w-100">
//             Login
//           </button>
//         </form>

//         <p className="text-center mt-3 mb-0">
//           New user? <Link to="/register">Create Account</Link>
//         </p>

//       </div>
//     </div>
//   );
// }

// export default Login;

import "../auth.css";
import "../../../App.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../../services/authService";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await loginUser({ email, password });
      navigate("/profile");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed.");
    } finally {
      setLoading(false);
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

      <main className="auth-card auth-card-login">
        <div className="auth-tabs">
          <Link className="auth-tab active" to="/login">Login</Link>
          <Link className="auth-tab" to="/register">Sign up</Link>
        </div>

        <div className="auth-title">
          <h1>Welcome back</h1>
          <p>Login to your Job &amp; Internship Portal account.</p>
        </div>

        {error && <div className="portal-alert portal-alert-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="portal-form-group">
            <label htmlFor="login-email">Email</label>
            <input
              id="login-email"
              className="portal-input"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="portal-form-group">
            <label htmlFor="login-password">Password</label>
            <input
              id="login-password"
              className="portal-input"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button className="portal-button portal-button-full" type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Log in"}
          </button>
        </form>

        <p className="auth-bottom-text">
          New to the platform? <Link to="/register">Create an account</Link>
        </p>
      </main>
    </div>
  );
}

export default Login;
