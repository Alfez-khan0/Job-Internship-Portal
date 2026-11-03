import { useState, useEffect } from "react";

function JobPosting() {
  const [jobs, setJobs] = useState([]);

  const [form, setForm] = useState({
    title: "",
    company: "",
    location: "",
    salary: "",
    skills: "",
    qualification: "",
    description: ""
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
      postedAt: new Date().toLocaleDateString()
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
      description: ""
    });

    alert("Job posted successfully!");
  };

  const deleteJob = (id) => {
    const updated = jobs.filter(job => job.id !== id);
    setJobs(updated);
    localStorage.setItem("jobs", JSON.stringify(updated));
  };

  return (
    <div style={{ maxWidth: "850px", margin: "40px auto", padding: "25px" }}>
      <h2>Job Posting</h2>
      <p>Create and manage job vacancies.</p>

      <form onSubmit={handleSubmit}>
        <input className="form-control mb-3"
          name="title" placeholder="Job Title"
          value={form.title} onChange={handleChange} required />

        <input className="form-control mb-3"
          name="company" placeholder="Company Name"
          value={form.company} onChange={handleChange} required />

        <input className="form-control mb-3"
          name="location" placeholder="Job Location"
          value={form.location} onChange={handleChange} required />

        <input className="form-control mb-3"
          name="salary" placeholder="Salary / Package"
          value={form.salary} onChange={handleChange} required />

        <input className="form-control mb-3"
          name="skills" placeholder="Required Skills (e.g. React, Node.js)"
          value={form.skills} onChange={handleChange} required />

        <input className="form-control mb-3"
          name="qualification" placeholder="Required Qualification"
          value={form.qualification} onChange={handleChange} required />

        <textarea className="form-control mb-3"
          name="description" placeholder="Job Description"
          value={form.description} onChange={handleChange} required />

        <button className="btn btn-success w-100">
          Publish Job
        </button>
      </form>

      <hr />

      <h3>Posted Jobs ({jobs.length})</h3>

      {jobs.length === 0 ? (
        <p>No jobs posted yet.</p>
      ) : (
        jobs.map(job => (
          <div key={job.id} className="card p-3 mb-3">
            <h5>{job.title}</h5>
            <p><b>Company:</b> {job.company}</p>
            <p><b>Location:</b> {job.location}</p>
            <p><b>Salary:</b> {job.salary}</p>
            <p><b>Skills:</b> {job.skills}</p>
            <p><b>Qualification:</b> {job.qualification}</p>
            <p>{job.description}</p>

            <button
              className="btn btn-danger"
              onClick={() => deleteJob(job.id)}
            >
              Delete Job
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default JobPosting;
