
// function Profile() {
//   return (
//     <div className="container py-5">
//       <h2>Student Profile</h2>
//       <p>Complete your professional profile.</p>

//       <input className="form-control mb-3" placeholder="Full Name" />
//       <input className="form-control mb-3" placeholder="Education" />
//       <input className="form-control mb-3" placeholder="Technical Skills" />
//       <input className="form-control mb-3" placeholder="Preferred Location" />

//       <button className="btn btn-primary">
//         Save Profile
//       </button>
//     </div>
//   );
// }

// export default Profile;

import { useState } from "react";
import { Link } from "react-router-dom";
import "../auth.css";
import "../../../App.css";

function Profile() {
  const [profile, setProfile] = useState({
    fullName: "",
    education: "",
    skills: "",
    location: "",
  });

  const handleChange = (e) => {
    setProfile((current) => ({
      ...current,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Connect this form to the existing profile API when its service contract is confirmed.
  };

  return (
    <div className="portal-page">
      <nav className="portal-navbar">
        <div className="portal-nav-inner">
          <Link className="portal-brand" to="/">
            Job &amp; Internship <span>Portal</span>
          </Link>
          <div className="portal-nav-links">
            <Link to="/">Home</Link>
            <Link to="/job-recommendations">Jobs</Link>
            <Link to="/mentor-matching">Mentors</Link>
            <Link className="active" to="/profile">Profile</Link>
          </div>
          <div className="portal-nav-actions">
            <Link className="portal-button portal-button-small" to="/login">Log in</Link>
          </div>
        </div>
      </nav>

      <main className="profile-page-content">
        <div className="profile-heading">
          <h1>Student Profile</h1>
          <p>Complete your professional profile to improve your job opportunities.</p>
        </div>

        <form className="profile-layout" onSubmit={handleSubmit}>
          <section className="profile-panel">
            <h2>PERSONAL &amp; EDUCATION DETAILS</h2>
            <div className="profile-form-grid">
              <div className="portal-form-group">
                <label htmlFor="profile-full-name">Full name</label>
                <input
                  id="profile-full-name"
                  className="portal-input"
                  name="fullName"
                  value={profile.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                />
              </div>
              <div className="portal-form-group">
                <label htmlFor="profile-education">Education</label>
                <input
                  id="profile-education"
                  className="portal-input"
                  name="education"
                  value={profile.education}
                  onChange={handleChange}
                  placeholder="e.g. B.Tech"
                />
              </div>
            </div>

            <div className="portal-form-group profile-skills-group">
              <label htmlFor="profile-skills">Technical skills</label>
              <input
                id="profile-skills"
                className="portal-input"
                name="skills"
                value={profile.skills}
                onChange={handleChange}
                placeholder="React, Node.js, MongoDB"
              />
              <small>Separate skills with commas.</small>
            </div>
          </section>

          <section className="profile-panel">
            <h2>JOB PREFERENCES</h2>
            <div className="portal-form-group">
              <label htmlFor="profile-location">Preferred location</label>
              <input
                id="profile-location"
                className="portal-input"
                name="location"
                value={profile.location}
                onChange={handleChange}
                placeholder="e.g. Jaipur, Remote"
              />
            </div>

            <div className="profile-info-box">
              <span className="profile-info-icon">✦</span>
              <div>
                <strong>Build a stronger profile</strong>
                <p>Add your education, technical skills and preferred location to help employers understand your interests.</p>
              </div>
            </div>

            <div className="profile-actions">
              <button type="submit" className="portal-button">Save profile</button>
              <Link to="/" className="portal-button portal-button-outline">Cancel</Link>
            </div>
          </section>
        </form>
      </main>
    </div>
  );
}

export default Profile;
