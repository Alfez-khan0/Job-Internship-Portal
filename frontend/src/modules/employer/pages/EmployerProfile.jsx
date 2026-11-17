// import { useState, useEffect } from "react";

// function EmployerProfile() {
//   const [form, setForm] = useState({
//     companyName: "",
//     email: "",
//     description: "",
//     location: "",
//     website: ""
//   });

//   useEffect(() => {
//     const saved = localStorage.getItem("employerProfile");
//     if (saved) setForm(JSON.parse(saved));
//   }, []);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     localStorage.setItem("employerProfile", JSON.stringify(form));
//     alert("Employer profile saved successfully!");
//   };

//   return (
//     <div style={{ maxWidth: "650px", margin: "40px auto", padding: "25px" }}>
//       <h2>Employer Profile</h2>
//       <p>Create your company profile to recruit candidates.</p>

//       <form onSubmit={handleSubmit}>
//         <input className="form-control mb-3"
//           name="companyName" placeholder="Company Name"
//           value={form.companyName} onChange={handleChange} required />

//         <input className="form-control mb-3"
//           name="email" type="email" placeholder="Company Email"
//           value={form.email} onChange={handleChange} required />

//         <textarea className="form-control mb-3"
//           name="description" placeholder="Company Description"
//           value={form.description} onChange={handleChange} required />

//         <input className="form-control mb-3"
//           name="location" placeholder="Company Location"
//           value={form.location} onChange={handleChange} required />

//         <input className="form-control mb-3"
//           name="website" placeholder="Company Website"
//           value={form.website} onChange={handleChange} />

//         <button className="btn btn-primary w-100">
//           Save Employer Profile
//         </button>
//       </form>
//     </div>
//   );
// }

// export default EmployerProfile;

import { useState, useEffect } from "react";
import "../../../App.css";

function EmployerProfile() {
  const [form, setForm] = useState({
    companyName: "",
    email: "",
    description: "",
    location: "",
    website: "",
  });

  useEffect(() => {
    const saved = localStorage.getItem("employerProfile");
    if (saved) setForm(JSON.parse(saved));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("employerProfile", JSON.stringify(form));
    alert("Employer profile saved successfully!");
  };

  return (
    <div className="portal-page">
      <nav className="portal-navbar">
        <div className="portal-nav-inner">
          <a className="portal-brand" href="/">Job &amp; Internship <span>Portal</span></a>
          <div className="portal-nav-links">
            <a href="/">Home</a>
            <a href="/job-posting">Job Posting</a>
            <a href="/applicant-tracking">Applicants</a>
          </div>
          <div className="portal-nav-actions">
            <a className="nav-login" href="/profile">Profile</a>
          </div>
        </div>
      </nav>

      <main className="portal-module-page">
        <div className="module-page-heading">
          <div>
            <h1>Employer Profile</h1>
            <p>Create and manage your company profile to attract the right candidates.</p>
          </div>
        </div>

        <form className="portal-panel employer-form" onSubmit={handleSubmit}>
          <div className="employer-logo-column">
            <div className="logo-placeholder">
              <span>Company</span>
              <span>Profile</span>
            </div>
            <span className="muted-inline">Company information</span>
          </div>

          <div className="employer-fields">
            <h2>Company details</h2>

            <div className="portal-form-group">
              <label htmlFor="companyName">Company name</label>
              <input
                id="companyName"
                className="portal-input"
                name="companyName"
                placeholder="Enter company name"
                value={form.companyName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="portal-form-group">
              <label htmlFor="email">Company email</label>
              <input
                id="email"
                className="portal-input"
                name="email"
                type="email"
                placeholder="Enter company email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="portal-form-group">
              <label htmlFor="location">Company location</label>
              <input
                id="location"
                className="portal-input"
                name="location"
                placeholder="City, State"
                value={form.location}
                onChange={handleChange}
                required
              />
            </div>

            <div className="portal-form-group">
              <label htmlFor="website">Company website <span className="muted-inline">(optional)</span></label>
              <input
                id="website"
                className="portal-input"
                name="website"
                type="url"
                placeholder="https://example.com"
                value={form.website}
                onChange={handleChange}
              />
            </div>

            <div className="portal-form-group">
              <label htmlFor="description">Company description</label>
              <textarea
                id="description"
                className="portal-input portal-textarea"
                name="description"
                placeholder="Tell candidates about your company"
                value={form.description}
                onChange={handleChange}
                required
              />
            </div>

            <div className="portal-form-actions">
              <button className="portal-button" type="submit">Save employer profile</button>
              <button
                className="portal-button portal-button-outline"
                type="button"
                onClick={() => setForm({
                  companyName: "",
                  email: "",
                  description: "",
                  location: "",
                  website: "",
                })}
              >
                Clear form
              </button>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
}

export default EmployerProfile;
