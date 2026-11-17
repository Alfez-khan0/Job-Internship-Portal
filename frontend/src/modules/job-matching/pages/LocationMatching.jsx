// import { useState, useEffect } from "react";

// function LocationMatching() {
//   const [jobs, setJobs] = useState([]);
//   const [location, setLocation] = useState("");
//   const [remoteOnly, setRemoteOnly] = useState(false);
//   const [results, setResults] = useState([]);
//   const [searched, setSearched] = useState(false);

//   useEffect(() => {
//     const saved = JSON.parse(localStorage.getItem("jobs") || "[]");
//     setJobs(saved);
//   }, []);

//   const searchJobs = (e) => {
//     e.preventDefault();

//     const filtered = jobs.filter(job => {
//       const jobLocation = (job.location || "").toLowerCase();

//       if (remoteOnly) {
//         return jobLocation.includes("remote");
//       }

//       return jobLocation.includes(location.toLowerCase().trim());
//     });

//     setResults(filtered);
//     setSearched(true);
//   };

//   return (
//     <div className="container py-5">
//       <h2>Location Matching</h2>

//       <p className="text-muted">
//         Discover job opportunities in your preferred location.
//       </p>

//       <form onSubmit={searchJobs} className="card p-4 shadow-sm mb-4">

//         <label className="form-label fw-bold">
//           Preferred City / State
//         </label>

//         <input
//           className="form-control mb-3"
//           placeholder="Example: Jaipur, Rajasthan"
//           value={location}
//           onChange={e => setLocation(e.target.value)}
//           disabled={remoteOnly}
//           required={!remoteOnly}
//         />

//         <div className="form-check mb-3">
//           <input
//             className="form-check-input"
//             type="checkbox"
//             checked={remoteOnly}
//             onChange={e => setRemoteOnly(e.target.checked)}
//             id="remote"
//           />

//           <label className="form-check-label" htmlFor="remote">
//             Show only remote jobs
//           </label>
//         </div>

//         <button className="btn btn-primary">
//           Search Jobs
//         </button>
//       </form>

//       <h4>Available Jobs</h4>

//       {!searched ? (
//         <p className="text-muted">
//           Enter your preferred location to find jobs.
//         </p>
//       ) : results.length === 0 ? (
//         <div className="alert alert-warning">
//           No jobs found for this location.
//         </div>
//       ) : (
//         results.map(job => (
//           <div className="card p-3 mb-3" key={job.id}>
//             <h5>{job.title}</h5>
//             <p><strong>Company:</strong> {job.company}</p>
//             <p><strong>Location:</strong> {job.location}</p>
//             <p><strong>Salary:</strong> {job.salary}</p>
//             <p><strong>Skills:</strong> {job.skills}</p>
//           </div>
//         ))
//       )}
//     </div>
//   );
// }

// export default LocationMatching;


import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../../App.css";

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

    const filtered = jobs.filter((job) => {
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
    <main className="portal-module-page">
      <div className="module-page-heading">
        <div>
          <span className="portal-eyebrow">LOCATION-BASED SEARCH</span>
          <h1>Find Jobs Near Your Preferred Location</h1>
          <p>Explore opportunities by city or choose to view remote jobs only.</p>
        </div>
        <Link to="/job-recommendations" className="portal-button portal-button-secondary">
          Job Recommendations
        </Link>
      </div>

      <section className="location-layout">
        <div className="portal-panel location-search-panel">
          <div className="panel-heading">
            <span className="portal-eyebrow">SEARCH PREFERENCES</span>
            <h2>Where would you like to work?</h2>
            <p>Enter a city or state to find matching job postings.</p>
          </div>

          <form onSubmit={searchJobs} className="portal-form">
            <div className="portal-form-group">
              <label htmlFor="preferred-location">Preferred city / state</label>
              <input
                id="preferred-location"
                className="portal-input"
                placeholder="Example: Jaipur, Rajasthan"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                disabled={remoteOnly}
                required={!remoteOnly}
              />
            </div>

            <label className="location-checkbox-row" htmlFor="remote-only">
              <input
                id="remote-only"
                type="checkbox"
                checked={remoteOnly}
                onChange={(e) => setRemoteOnly(e.target.checked)}
              />
              <span>
                <strong>Show only remote jobs</strong>
                <small>Find opportunities marked as remote by employers.</small>
              </span>
            </label>

            <button type="submit" className="portal-button">
              Search Jobs
            </button>
          </form>
        </div>

        <aside className="portal-panel location-info-panel">
          <div className="location-illustration" aria-hidden="true">⌖</div>
          <h3>Work from where you thrive</h3>
          <p>Choose a location that suits your plans, or switch on remote-only search for location-independent opportunities.</p>
          <div className="location-tip">
            <strong>Search tip</strong>
            <span>Try a city name such as Jaipur, or a state name such as Rajasthan.</span>
          </div>
        </aside>
      </section>

      <section className="portal-content-section">
        <div className="section-heading-row">
          <div>
            <h2>Available jobs</h2>
            <p>
              {searched
                ? remoteOnly
                  ? "Showing jobs marked as remote."
                  : `Showing jobs matching “${location.trim()}”.`
                : "Search to see opportunities matching your location."}
            </p>
          </div>
          {searched && results.length > 0 && (
            <span className="portal-result-count">{results.length} jobs found</span>
          )}
        </div>

        {!searched ? (
          <div className="portal-empty-state">
            <div className="empty-state-icon">⌖</div>
            <h3>Your location-based results will appear here</h3>
            <p>Enter your preferred location or select remote-only search to get started.</p>
          </div>
        ) : results.length === 0 ? (
          <div className="portal-empty-state">
            <div className="empty-state-icon">⌕</div>
            <h3>No jobs found</h3>
            <p>There are currently no postings matching this location. Try another city or check remote opportunities.</p>
            {jobs.length === 0 && (
              <Link to="/job-posting" className="portal-text-link">Explore job postings</Link>
            )}
          </div>
        ) : (
          <div className="matching-results-list">
            {results.map((job) => (
              <article className="matching-job-card portal-panel" key={job.id}>
                <div className="matching-job-main">
                  <div className="matching-job-heading">
                    <div>
                      <h3>{job.title}</h3>
                      <p>{job.company}</p>
                    </div>
                    <span className="location-type-pill">
                      {(job.location || "").toLowerCase().includes("remote") ? "Remote" : "On-site"}
                    </span>
                  </div>

                  <div className="matching-job-details">
                    <p><strong>Location</strong>{job.location || "Not specified"}</p>
                    <p><strong>Salary</strong>{job.salary || "Not specified"}</p>
                    <p><strong>Skills</strong>{job.skills || "Not specified"}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default LocationMatching;
