
// import { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { registerUser } from '../../../services/authService';

// function Register() {
//   const navigate = useNavigate();

//   const [form, setForm] = useState({
//     name: '',
//     email: '',
//     password: '',
//     role: 'student'
//   });
//   const [error, setError] = useState('');
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setIsSubmitting(true);

//     try {
//       const result = await registerUser({
//         fullName: form.name,
//         email: form.email,
//         password: form.password,
//         role: form.role
//       });

//       navigate('/verify-otp', {
//         state: { email: form.email, userId: result.userId }
//       });
//     } catch (requestError) {
//       setError(
//         requestError.response?.data?.message ||
//         'Could not create your account. Check that the backend is running.'
//       );
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="container min-vh-100 d-flex justify-content-center align-items-center">
//       <div className="card shadow p-4" style={{ width: '420px' }}>
//         <h2 className="text-center mb-2">Create Account</h2>
//         <p className="text-center text-muted">
//           Join our Job & Internship Portal
//         </p>

//         {error && <div className="alert alert-danger" role="alert">{error}</div>}

//         <form onSubmit={handleSubmit}>
//           <input
//             className="form-control mb-3"
//             name="name"
//             placeholder="Full Name"
//             value={form.name}
//             onChange={handleChange}
//             required
//           />

//           <input
//             className="form-control mb-3"
//             type="email"
//             name="email"
//             placeholder="Email Address"
//             value={form.email}
//             onChange={handleChange}
//             required
//           />

//           <input
//             className="form-control mb-3"
//             type="password"
//             name="password"
//             placeholder="Password"
//             value={form.password}
//             onChange={handleChange}
//             minLength="8"
//             required
//           />

//           <select
//             className="form-select mb-3"
//             name="role"
//             value={form.role}
//             onChange={handleChange}
//           >
//             <option value="student">Student</option>
//             <option value="employer">Employer</option>
//             <option value="mentor">Mentor</option>
//           </select>

//           <button className="btn btn-primary w-100" disabled={isSubmitting}>
//             {isSubmitting ? 'Creating account...' : 'Create Account'}
//           </button>
//         </form>

//         <p className="text-center mt-3 mb-0">
//           Already registered? <Link to="/login">Login</Link>
//         </p>
//       </div>
//     </div>
//   );
// }

// export default Register;

import "../auth.css";
import "../../../App.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../../services/authService";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "student",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await registerUser({
        fullName: form.fullName.trim(),
        email: form.email.trim().toLowerCase(),
        password: form.password,
        role: form.role,
      });

      if (!data.userId) {
        throw new Error("User ID not received from server.");
      }

      sessionStorage.setItem("pendingUserId", data.userId);
      alert(data.message || "OTP sent successfully!");
      navigate("/verify-otp");
    } catch (err) {
      console.error("Registration Error:", err.response?.data || err.message);
      setError(
        err.response?.data?.message ||
        err.message ||
        "Registration failed. Please try again."
      );
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

      <main className="auth-card">
        <div className="auth-tabs">
          <Link className="auth-tab" to="/login">Login</Link>
          <Link className="auth-tab active" to="/register">Sign up</Link>
        </div>

        <div className="auth-title">
          <h1>Create your account</h1>
          <p>Join our Job &amp; Internship Portal.</p>
        </div>

        {error && <div className="portal-alert portal-alert-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="portal-form-group">
            <label htmlFor="register-name">Full name</label>
            <input
              id="register-name"
              type="text"
              className="portal-input"
              name="fullName"
              placeholder="Enter your full name"
              value={form.fullName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="portal-form-group">
            <label htmlFor="register-email">Email</label>
            <input
              id="register-email"
              type="email"
              className="portal-input"
              name="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="portal-form-group">
            <label htmlFor="register-password">Password</label>
            <input
              id="register-password"
              type="password"
              className="portal-input"
              name="password"
              placeholder="Minimum 6 characters"
              value={form.password}
              onChange={handleChange}
              minLength={6}
              required
            />
          </div>

          <fieldset className="role-fieldset">
            <legend>I am a</legend>
            <div className="role-options">
              {[
                { value: "student", label: "Candidate" },
                { value: "employer", label: "Employer" },
                { value: "mentor", label: "Mentor" },
              ].map((role) => (
                <label className={`role-option ${form.role === role.value ? "selected" : ""}`} key={role.value}>
                  <input
                    type="radio"
                    name="role"
                    value={role.value}
                    checked={form.role === role.value}
                    onChange={handleChange}
                  />
                  <span className="role-radio" />
                  {role.label}
                </label>
              ))}
            </div>
          </fieldset>

          <button type="submit" className="portal-button portal-button-full" disabled={loading}>
            {loading ? "Registering..." : "Create account"}
          </button>
        </form>

        <p className="auth-bottom-text">
          Already registered? <Link to="/login">Log in</Link>
        </p>
      </main>
    </div>
  );
}

export default Register;
