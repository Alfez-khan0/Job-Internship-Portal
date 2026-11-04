
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
      // Send registration details to backend
      const data = await registerUser({
        fullName: form.fullName.trim(),
        email: form.email.trim().toLowerCase(),
        password: form.password,
        role: form.role,
      });

      // Check backend response
      if (!data.userId) {
        throw new Error("User ID not received from server.");
      }

      // Save user ID for OTP verification
      sessionStorage.setItem(
        "pendingUserId",
        data.userId
      );

      // Navigate to OTP verification page
      alert(data.message || "OTP sent successfully!");

      navigate("/verify-otp");

    } catch (err) {
      console.error(
        "Registration Error:",
        err.response?.data || err.message
      );

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
    <div className="container min-vh-100 d-flex justify-content-center align-items-center">

      <div
        className="card shadow p-4"
        style={{ width: "450px", maxWidth: "100%" }}
      >

        <h2 className="text-center mb-2">
          Create Account
        </h2>

        <p className="text-center text-muted mb-4">
          Join our Job & Internship Portal
        </p>

        {error && (
          <div className="alert alert-danger">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>

          {/* Full Name */}
          <div className="mb-3">
            <label className="form-label">
              Full Name
            </label>

            <input
              type="text"
              className="form-control"
              name="fullName"
              placeholder="Enter your full name"
              value={form.fullName}
              onChange={handleChange}
              required
            />
          </div>

          {/* Email */}
          <div className="mb-3">
            <label className="form-label">
              Email Address
            </label>

            <input
              type="email"
              className="form-control"
              name="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Password */}
          <div className="mb-3">
            <label className="form-label">
              Password
            </label>

            <input
              type="password"
              className="form-control"
              name="password"
              placeholder="Minimum 6 characters"
              value={form.password}
              onChange={handleChange}
              minLength={6}
              required
            />
          </div>

          {/* Role Selection */}
          <div className="mb-4">
            <label className="form-label">
              Register As
            </label>

            <select
              className="form-select"
              name="role"
              value={form.role}
              onChange={handleChange}
              required
            >
              <option value="student">
                Student
              </option>

              <option value="employer">
                Employer
              </option>

              <option value="mentor">
                Mentor
              </option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={loading}
          >
            {loading ? "Registering..." : "Create Account"}
          </button>

        </form>

        <p className="text-center mt-4 mb-0">
          Already have an account?{" "}
          <Link to="/login">
            Login
          </Link>
        </p>

      </div>

    </div>
  );
}

export default Register;
