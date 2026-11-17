// import { useState, useEffect } from "react";

// function JobPosting() {
//   const [jobs, setJobs] = useState([]);

//   const [form, setForm] = useState({
//     title: "",
//     company: "",
//     location: "",
//     salary: "",
//     skills: "",
//     qualification: "",
//     description: ""
//   });

//   useEffect(() => {
//     const saved = JSON.parse(localStorage.getItem("jobs") || "[]");
//     setJobs(saved);
//   }, []);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const newJob = {
//       ...form,
//       id: Date.now(),
//       postedAt: new Date().toLocaleDateString()
//     };

//     const updated = [...jobs, newJob];

//     setJobs(updated);
//     localStorage.setItem("jobs", JSON.stringify(updated));

//     setForm({
//       title: "",
//       company: "",
//       location: "",
//       salary: "",
//       skills: "",
//       qualification: "",
//       description: ""
//     });

//     alert("Job posted successfully!");
//   };

//   const deleteJob = (id) => {
//     const updated = jobs.filter(job => job.id !== id);
//     setJobs(updated);
//     localStorage.setItem("jobs", JSON.stringify(updated));
//   };

//   return (
//     <div style={{ maxWidth: "850px", margin: "40px auto", padding: "25px" }}>
//       <h2>Job Posting</h2>
//       <p>Create and manage job vacancies.</p>

//       <form onSubmit={handleSubmit}>
//         <input className="form-control mb-3"
//           name="title" placeholder="Job Title"
//           value={form.title} onChange={handleChange} required />

//         <input className="form-control mb-3"
//           name="company" placeholder="Company Name"
//           value={form.company} onChange={handleChange} required />

//         <input className="form-control mb-3"
//           name="location" placeholder="Job Location"
//           value={form.location} onChange={handleChange} required />

//         <input className="form-control mb-3"
//           name="salary" placeholder="Salary / Package"
//           value={form.salary} onChange={handleChange} required />

//         <input className="form-control mb-3"
//           name="skills" placeholder="Required Skills (e.g. React, Node.js)"
//           value={form.skills} onChange={handleChange} required />

//         <input className="form-control mb-3"
//           name="qualification" placeholder="Required Qualification"
//           value={form.qualification} onChange={handleChange} required />

//         <textarea className="form-control mb-3"
//           name="description" placeholder="Job Description"
//           value={form.description} onChange={handleChange} required />

//         <button className="btn btn-success w-100">
//           Publish Job
//         </button>
//       </form>

//       <hr />

//       <h3>Posted Jobs ({jobs.length})</h3>

//       {jobs.length === 0 ? (
//         <p>No jobs posted yet.</p>
//       ) : (
//         jobs.map(job => (
//           <div key={job.id} className="card p-3 mb-3">
//             <h5>{job.title}</h5>
//             <p><b>Company:</b> {job.company}</p>
//             <p><b>Location:</b> {job.location}</p>
//             <p><b>Salary:</b> {job.salary}</p>
//             <p><b>Skills:</b> {job.skills}</p>
//             <p><b>Qualification:</b> {job.qualification}</p>
//             <p>{job.description}</p>

//             <button
//               className="btn btn-danger"
//               onClick={() => deleteJob(job.id)}
//             >
//               Delete Job
//             </button>
//           </div>
//         ))
//       )}
//     </div>
//   );
// }

// export default JobPosting;

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../../App.css";

function JobPosting() {
  const [jobs, setJobs] = useState([]);

  const [form, setForm] = useState({
    title: "",
    company: "",
    location: "",
    salary: "",
    skills: "",
    qualification: "",
    description: "",
  });

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("jobs") || "[]");
    setJobs(saved);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newJob = {
      ...form,
      id: Date.now(),
      postedAt: new Date().toLocaleDateString(),
    };

    const updated = [...jobs, newJob];
    setJobs(updated);
    localStorage.setItem("jobs", JSON.stringify(updated));

    setForm({
      title: "",
      company: "",
      location: "",
      salary: "",
      skills: "",
      qualification: "",
      description: "",
    });

    alert("Job posted successfully!");
  };

  const deleteJob = (id) => {
    const updated = jobs.filter((job) => job.id !== id);
    setJobs(updated);
    localStorage.setItem("jobs", JSON.stringify(updated));
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
            <Link className="active" to="/job-posting">Job Posting</Link>
            <Link to="/applicant-tracking">Applicants</Link>
            <Link to="/employer-profile">Employer Profile</Link>
          </div>
          <div className="portal-nav-actions">
            <Link className="nav-login" to="/profile">Profile</Link>
          </div>
        </div>
      </nav>

      <main className="portal-module-page">
        <div className="module-page-heading">
          <div>
            <h1>Job Posting</h1>
            <p>Create and manage job vacancies for your company.</p>
          </div>
          <span className="status-pill status-open">{jobs.length} jobs posted</span>
        </div>

        <div className="job-posting-layout">
          <form className="portal-panel job-posting-form" onSubmit={handleSubmit}>
            <h2>Job details</h2>

            <div className="portal-form-grid">
              <div className="portal-form-group">
                <label htmlFor="job-title">Job title</label>
                <input
                  id="job-title"
                  className="portal-input"
                  name="title"
                  placeholder="e.g. Frontend Developer"
                  value={form.title}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="portal-form-group">
                <label htmlFor="job-company">Company name</label>
                <input
                  id="job-company"
                  className="portal-input"
                  name="company"
                  placeholder="Enter company name"
                  value={form.company}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="portal-form-group">
                <label htmlFor="job-location">Location</label>
                <input
                  id="job-location"
                  className="portal-input"
                  name="location"
                  placeholder="City or Remote"
                  value={form.location}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="portal-form-group">
                <label htmlFor="job-salary">Salary / Package</label>
                <input
                  id="job-salary"
                  className="portal-input"
                  name="salary"
                  placeholder="e.g. 5-7 LPA"
                  value={form.salary}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="portal-form-group">
                <label htmlFor="job-skills">Required skills</label>
                <input
                  id="job-skills"
                  className="portal-input"
                  name="skills"
                  placeholder="React, Node.js, JavaScript"
                  value={form.skills}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="portal-form-group">
                <label htmlFor="job-qualification">Required qualification</label>
                <input
                  id="job-qualification"
                  className="portal-input"
                  name="qualification"
                  placeholder="e.g. B.Tech / equivalent"
                  value={form.qualification}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="portal-form-group portal-form-full">
                <label htmlFor="job-description">Job description</label>
                <textarea
                  id="job-description"
                  className="portal-input portal-textarea"
                  name="description"
                  placeholder="Describe the role and responsibilities"
                  value={form.description}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="portal-form-actions">
              <button className="portal-button" type="submit">Publish job</button>
            </div>
          </form>

          <section className="portal-panel posted-jobs-panel">
            <h2>Posted jobs <span>{jobs.length}</span></h2>

            {jobs.length === 0 ? (
              <div className="portal-empty-state compact">
                <h3>No jobs posted yet</h3>
                <p>Your published vacancies will appear here.</p>
              </div>
            ) : (
              jobs.map((job) => (
                <article className="posted-job-card" key={job.id}>
                  <div className="posted-job-heading">
                    <h3>{job.title}</h3>
                    <span className="status-pill status-open">Published</span>
                  </div>
                  <p><strong>Company:</strong> {job.company}</p>
                  <p><strong>Location:</strong> {job.location}</p>
                  <p><strong>Salary:</strong> {job.salary}</p>
                  <p><strong>Skills:</strong> {job.skills}</p>
                  <p><strong>Qualification:</strong> {job.qualification}</p>
                  <p>{job.description}</p>
                  <small>Posted: {job.postedAt}</small>
                  <div className="portal-form-actions">
                    <button
                      className="portal-button button-danger"
                      type="button"
                      onClick={() => deleteJob(job.id)}
                    >
                      Delete job
                    </button>
                  </div>
                </article>
              ))
            )}
          </section>
        </div>
      </main>
    </div>
  );
}

export default JobPosting;

