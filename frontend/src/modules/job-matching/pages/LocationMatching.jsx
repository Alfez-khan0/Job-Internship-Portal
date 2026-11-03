import { useState, useEffect } from "react";

function LocationMatching() {
  const [jobs, setJobs] = useState([]);
  const [location, setLocation] = useState("");
  const [remoteOnly, setRemoteOnly] = useState(false);
  const [results, setResults] = useState([]);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("jobs") || "[]");
    setJobs(saved);
  }, []);

  const searchJobs = (e) => {
    e.preventDefault();

    const filtered = jobs.filter(job => {
      const jobLocation = (job.location || "").toLowerCase();

      if (remoteOnly) {
        return jobLocation.includes("remote");
      }

      return jobLocation.includes(location.toLowerCase().trim());
    });

    setResults(filtered);
    setSearched(true);
  };

  return (
    <div className="container py-5">
      <h2>Location Matching</h2>

      <p className="text-muted">
        Discover job opportunities in your preferred location.
      </p>

      <form onSubmit={searchJobs} className="card p-4 shadow-sm mb-4">

        <label className="form-label fw-bold">
          Preferred City / State
        </label>

        <input
          className="form-control mb-3"
          placeholder="Example: Jaipur, Rajasthan"
          value={location}
          onChange={e => setLocation(e.target.value)}
          disabled={remoteOnly}
          required={!remoteOnly}
        />

        <div className="form-check mb-3">
          <input
            className="form-check-input"
            type="checkbox"
            checked={remoteOnly}
            onChange={e => setRemoteOnly(e.target.checked)}
            id="remote"
          />

          <label className="form-check-label" htmlFor="remote">
            Show only remote jobs
          </label>
        </div>

        <button className="btn btn-primary">
          Search Jobs
        </button>
      </form>

      <h4>Available Jobs</h4>

      {!searched ? (
        <p className="text-muted">
          Enter your preferred location to find jobs.
        </p>
      ) : results.length === 0 ? (
        <div className="alert alert-warning">
          No jobs found for this location.
        </div>
      ) : (
        results.map(job => (
          <div className="card p-3 mb-3" key={job.id}>
            <h5>{job.title}</h5>
            <p><strong>Company:</strong> {job.company}</p>
            <p><strong>Location:</strong> {job.location}</p>
            <p><strong>Salary:</strong> {job.salary}</p>
            <p><strong>Skills:</strong> {job.skills}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default LocationMatching;