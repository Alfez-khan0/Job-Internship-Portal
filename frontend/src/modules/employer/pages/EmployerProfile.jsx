import { useState, useEffect } from "react";

function EmployerProfile() {
  const [form, setForm] = useState({
    companyName: "",
    email: "",
    description: "",
    location: "",
    website: ""
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
    <div style={{ maxWidth: "650px", margin: "40px auto", padding: "25px" }}>
      <h2>Employer Profile</h2>
      <p>Create your company profile to recruit candidates.</p>

      <form onSubmit={handleSubmit}>
        <input className="form-control mb-3"
          name="companyName" placeholder="Company Name"
          value={form.companyName} onChange={handleChange} required />

        <input className="form-control mb-3"
          name="email" type="email" placeholder="Company Email"
          value={form.email} onChange={handleChange} required />

        <textarea className="form-control mb-3"
          name="description" placeholder="Company Description"
          value={form.description} onChange={handleChange} required />

        <input className="form-control mb-3"
          name="location" placeholder="Company Location"
          value={form.location} onChange={handleChange} required />

        <input className="form-control mb-3"
          name="website" placeholder="Company Website"
          value={form.website} onChange={handleChange} />

        <button className="btn btn-primary w-100">
          Save Employer Profile
        </button>
      </form>
    </div>
  );
}

export default EmployerProfile;