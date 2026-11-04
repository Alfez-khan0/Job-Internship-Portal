
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  getUserProfile,
  updateUserProfile,
  logoutUser
} from "../../../services/authService";

function Profile() {
  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    fullName: "",
    email: "",
    phone: "",
    location: "",
    education: "",
    qualification: "",
    skills: ""
  });

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getUserProfile();
        const user = data.user;

        setProfile({
          fullName: user.fullName || "",
          email: user.email || "",
          role: user.role || "",
          phone: user.profile?.phone || "",
          location: user.profile?.location || "",
          education: user.profile?.education || "",
          qualification: user.profile?.qualification || "",
          skills: (user.profile?.skills || []).join(", ")
        });
      } catch (err) {
        setError(
          err.response?.data?.message || "Unable to load profile."
        );

        if (err.response?.status === 401) {
          logoutUser();
          navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      const data = await updateUserProfile({
        phone: profile.phone,
        location: profile.location,
        education: profile.education,
        qualification: profile.qualification,
        skills: profile.skills.split(",").map(s => s.trim()).filter(Boolean)
      });

      setMessage(data.message);
    } catch (err) {
      setError(
        err.response?.data?.message || "Profile update failed."
      );
    }
  };

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  if (loading) {
    return <div className="container py-5">Loading profile...</div>;
  }

  return (
    <div className="container py-5">
      <div className="card shadow p-4 mx-auto" style={{ maxWidth: "650px" }}>
        <h2 className="text-center mb-4">My Profile</h2>

        {error && <div className="alert alert-danger">{error}</div>}
        {message && <div className="alert alert-success">{message}</div>}

        <form onSubmit={handleSubmit}>
          <label className="form-label">Full Name</label>
          <input className="form-control mb-3" value={profile.fullName} disabled />

          <label className="form-label">Email</label>
          <input className="form-control mb-3" value={profile.email} disabled />

          <label className="form-label">Account Type</label>
          <input className="form-control mb-3" value={profile.role} disabled />

          {["phone", "location", "education", "qualification", "skills"].map(field => (
            <div key={field}>
              <label className="form-label text-capitalize">{field}</label>
              <input
                className="form-control mb-3"
                name={field}
                value={profile[field]}
                onChange={handleChange}
              />
            </div>
          ))}

          <button className="btn btn-primary w-100">
            Save Profile
          </button>
        </form>

        <button className="btn btn-outline-danger w-100 mt-3" onClick={handleLogout}>
          Logout
        </button>

        <Link to="/" className="text-center mt-3">
          Back to Home
        </Link>
      </div>
    </div>
  );
}

export default Profile;
