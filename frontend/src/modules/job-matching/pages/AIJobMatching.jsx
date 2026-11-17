// import { useState, useEffect } from "react";

// function AIJobMatching() {
//   const [skills, setSkills] = useState("");
//   const [jobs, setJobs] = useState([]);
//   const [results, setResults] = useState([]);

//   useEffect(() => {
//     const savedJobs = JSON.parse(localStorage.getItem("jobs") || "[]");
//     setJobs(savedJobs);
//   }, []);

//   const findMatches = (e) => {
//     e.preventDefault();

//     const studentSkills = skills
//       .toLowerCase()
//       .split(",")
//       .map(skill => skill.trim())
//       .filter(Boolean);

//     const matchedJobs = jobs.map(job => {
//       const requiredSkills = (job.skills || "")
//         .toLowerCase()
//         .split(",")
//         .map(skill => skill.trim())
//         .filter(Boolean);

//       const matched = requiredSkills.filter(skill =>
//         studentSkills.includes(skill)
//       );

//       const percentage = requiredSkills.length
//         ? Math.round((matched.length / requiredSkills.length) * 100)
//         : 0;

//       return {
//         ...job,
//         matchedSkills: matched,
//         percentage
//       };
//     });

//     setResults(matchedJobs.sort(
//       (a, b) => b.percentage - a.percentage
//     ));
//   };

//   return (
//     <div className="container py-5">
//       <h2 className="mb-2">AI Job Matching</h2>
//       <p className="text-muted">
//         Find jobs that match your technical skills.
//       </p>

//       <form onSubmit={findMatches} className="card p-4 shadow-sm mb-4">
//         <label className="form-label fw-bold">
//           Enter Your Skills
//         </label>

//         <input
//           className="form-control mb-3"
//           placeholder="React, JavaScript, HTML, CSS"
//           value={skills}
//           onChange={e => setSkills(e.target.value)}
//           required
//         />

//         <button className="btn btn-primary">
//           Find Matching Jobs
//         </button>
//       </form>

//       <h4>Matching Results</h4>

//       {results.length === 0 ? (
//         <p className="text-muted">
//           Enter your skills and click Find Matching Jobs.
//           Make sure employers have posted jobs.
//         </p>
//       ) : (
//         results.map(job => (
//           <div className="card p-3 mb-3" key={job.id}>
//             <h5>{job.title}</h5>
//             <p>{job.company} | {job.location}</p>

//             <p>
//               <strong>Required Skills:</strong> {job.skills}
//             </p>

//             <p>
//               <strong>Your Matching Skills:</strong>{" "}
//               {job.matchedSkills.join(", ") || "None"}
//             </p>

//             <div className="progress mb-2" style={{ height: "20px" }}>
//               <div
//                 className="progress-bar"
//                 style={{ width: `${job.percentage}%` }}
//               >
//                 {job.percentage}%
//               </div>
//             </div>

//             <small className="text-muted">
//               Skill Match Percentage
//             </small>
//           </div>
//         ))
//       )}
//     </div>
//   );
// }

// export default AIJobMatching;


import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../../App.css";

function AIJobMatching() {
  const [skills, setSkills] = useState("");
  const [jobs, setJobs] = useState([]);
  const [results, setResults] = useState([]);

  useEffect(() => {
    const savedJobs = JSON.parse(localStorage.getItem("jobs") || "[]");
    setJobs(savedJobs);
  }, []);

  const findMatches = (e) => {
    e.preventDefault();

    const studentSkills = skills
      .toLowerCase()
      .split(",")
      .map((skill) => skill.trim())
      .filter(Boolean);

    const matchedJobs = jobs.map((job) => {
      const requiredSkills = (job.skills || "")
        .toLowerCase()
        .split(",")
        .map((skill) => skill.trim())
        .filter(Boolean);

      const matched = requiredSkills.filter((skill) =>
        studentSkills.includes(skill)
      );

      const percentage = requiredSkills.length
        ? Math.round((matched.length / requiredSkills.length) * 100)
        : 0;

      return {
        ...job,
        matchedSkills: matched,
        percentage,
      };
    });

    setResults(matchedJobs.sort((a, b) => b.percentage - a.percentage));
  };

  return (
    <main className="portal-module-page">
      <div className="module-page-heading">
        <div>
          <span className="portal-eyebrow">CAREER DISCOVERY</span>
          <h1>AI Job Matching</h1>
          <p>Discover opportunities that align with your technical skills.</p>
        </div>
        <Link to="/job-recommendations" className="portal-button portal-button-secondary">
          View Recommendations
        </Link>
      </div>

      <section className="matching-search-panel portal-panel">
        <div className="matching-search-copy">
          <span className="portal-eyebrow">SKILL-BASED MATCHING</span>
          <h2>Find your next opportunity</h2>
          <p>Enter your skills separated by commas. We’ll compare them with the skills listed in employer job postings.</p>
        </div>

        <form onSubmit={findMatches} className="portal-form">
          <div className="portal-form-group">
            <label htmlFor="candidate-skills">Your technical skills</label>
            <input
              id="candidate-skills"
              className="portal-input"
              placeholder="e.g. React, JavaScript, HTML, CSS"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              required
            />
            <small>Separate each skill with a comma.</small>
          </div>
          <button type="submit" className="portal-button">
            Find Matching Jobs
          </button>
        </form>
      </section>

      <section className="portal-content-section">
        <div className="section-heading-row">
          <div>
            <h2>Matching results</h2>
            <p>Jobs are sorted by the percentage of required skills you match.</p>
          </div>
          {results.length > 0 && (
            <span className="portal-result-count">{results.length} jobs found</span>
          )}
        </div>

        {results.length === 0 ? (
          <div className="portal-empty-state">
            <div className="empty-state-icon">✦</div>
            <h3>{jobs.length === 0 ? "No jobs posted yet" : "Ready to find your match?"}</h3>
            <p>
              {jobs.length === 0
                ? "Employer job postings will appear here once they are available."
                : "Enter your skills above and select Find Matching Jobs to see your results."}
            </p>
            {jobs.length === 0 && (
              <Link to="/job-posting" className="portal-text-link">Explore job posting</Link>
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
                      <p>{job.company} <span>•</span> {job.location}</p>
                    </div>
                    <div className="match-score-circle" aria-label={`${job.percentage}% skill match`}>
                      <strong>{job.percentage}%</strong>
                      <span>match</span>
                    </div>
                  </div>

                  <div className="matching-job-details">
                    <p><strong>Required skills</strong>{job.skills || "Not specified"}</p>
                    <p><strong>Your matching skills</strong>{job.matchedSkills.join(", ") || "None"}</p>
                  </div>

                  <div className="match-progress-track" role="progressbar" aria-valuenow={job.percentage} aria-valuemin="0" aria-valuemax="100">
                    <div className="match-progress-fill" style={{ width: `${job.percentage}%` }} />
                  </div>
                  <small className="match-progress-caption">Skill match percentage</small>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default AIJobMatching;
