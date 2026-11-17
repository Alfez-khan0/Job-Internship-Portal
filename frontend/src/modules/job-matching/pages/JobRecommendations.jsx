// import { useState, useEffect } from "react";

// function JobRecommendations() {
//   const [jobs, setJobs] = useState([]);
//   const [skills, setSkills] = useState("");
//   const [qualification, setQualification] = useState("");
//   const [recommendations, setRecommendations] = useState([]);
//   const [searched, setSearched] = useState(false);

//   useEffect(() => {
//     const saved = JSON.parse(localStorage.getItem("jobs") || "[]");
//     setJobs(saved);
//   }, []);

//   const getRecommendations = (e) => {
//     e.preventDefault();

//     const studentSkills = skills.toLowerCase()
//       .split(",")
//       .map(s => s.trim())
//       .filter(Boolean);

//     const results = jobs.map(job => {
//       const requiredSkills = (job.skills || "")
//         .toLowerCase()
//         .split(",")
//         .map(s => s.trim())
//         .filter(Boolean);

//       const skillMatches = requiredSkills.filter(s =>
//         studentSkills.includes(s)
//       );

//       const skillScore = requiredSkills.length
//         ? (skillMatches.length / requiredSkills.length) * 70
//         : 0;

//       const qualificationMatch =
//         qualification.trim() &&
//         (job.qualification || "").toLowerCase()
//           .includes(qualification.toLowerCase());

//       const qualificationScore = qualificationMatch ? 30 : 0;

//       return {
//         ...job,
//         score: Math.round(skillScore + qualificationScore),
//         matchedSkills: skillMatches
//       };
//     });

//     setRecommendations(
//       results
//         .filter(job => job.score > 0)
//         .sort((a, b) => b.score - a.score)
//     );

//     setSearched(true);
//   };

//   return (
//     <div className="container py-5">
//       <h2>Job Recommendations</h2>
//       <p className="text-muted">
//         Get personalized job recommendations based on your profile.
//       </p>

//       <form onSubmit={getRecommendations}
//         className="card p-4 shadow-sm mb-4">

//         <label className="form-label fw-bold">
//           Your Technical Skills
//         </label>

//         <input
//           className="form-control mb-3"
//           placeholder="React, JavaScript, Python"
//           value={skills}
//           onChange={e => setSkills(e.target.value)}
//           required
//         />

//         <label className="form-label fw-bold">
//           Your Qualification
//         </label>

//         <input
//           className="form-control mb-3"
//           placeholder="B.Tech, BCA, MCA, etc."
//           value={qualification}
//           onChange={e => setQualification(e.target.value)}
//           required
//         />

//         <button className="btn btn-success">
//           Get Recommendations
//         </button>
//       </form>

//       <h4>Recommended Jobs</h4>

//       {!searched ? (
//         <p className="text-muted">
//           Enter your details to see recommended jobs.
//         </p>
//       ) : recommendations.length === 0 ? (
//         <div className="alert alert-warning">
//           No matching recommendations found. Try different skills
//           or qualifications.
//         </div>
//       ) : (
//         recommendations.map(job => (
//           <div className="card p-3 mb-3" key={job.id}>
//             <h5>{job.title}</h5>
//             <p>{job.company} | {job.location}</p>

//             <p>
//               <strong>Required Skills:</strong> {job.skills}
//             </p>

//             <p>
//               <strong>Matched Skills:</strong>{" "}
//               {job.matchedSkills.join(", ") || "None"}
//             </p>

//             <span className="badge bg-success align-self-start">
//               Recommendation Score: {job.score}%
//             </span>
//           </div>
//         ))
//       )}
//     </div>
//   );
// }

// export default JobRecommendations;

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../../App.css";

function JobRecommendations() {
  const [jobs, setJobs] = useState([]);
  const [skills, setSkills] = useState("");
  const [qualification, setQualification] = useState("");
  const [recommendations, setRecommendations] = useState([]);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("jobs") || "[]");
    setJobs(saved);
  }, []);

  const getRecommendations = (e) => {
    e.preventDefault();

    const studentSkills = skills.toLowerCase()
      .split(",")
      .map((skill) => skill.trim())
      .filter(Boolean);

    const results = jobs.map((job) => {
      const requiredSkills = (job.skills || "")
        .toLowerCase()
        .split(",")
        .map((skill) => skill.trim())
        .filter(Boolean);

      const skillMatches = requiredSkills.filter((skill) =>
        studentSkills.includes(skill)
      );

      const skillScore = requiredSkills.length
        ? (skillMatches.length / requiredSkills.length) * 70
        : 0;

      const qualificationMatch =
        qualification.trim() &&
        (job.qualification || "").toLowerCase()
          .includes(qualification.toLowerCase());

      const qualificationScore = qualificationMatch ? 30 : 0;

      return {
        ...job,
        score: Math.round(skillScore + qualificationScore),
        matchedSkills: skillMatches,
      };
    });

    setRecommendations(
      results
        .filter((job) => job.score > 0)
        .sort((a, b) => b.score - a.score)
    );

    setSearched(true);
  };

  return (
    <main className="portal-module-page">
      <div className="module-page-heading">
        <div>
          <span className="portal-eyebrow">PERSONALIZED CAREER DISCOVERY</span>
          <h1>Job Recommendations</h1>
          <p>Find opportunities based on your technical skills and qualification.</p>
        </div>
        <Link to="/ai-job-matching" className="portal-button portal-button-secondary">
          AI Job Matching
        </Link>
      </div>

      <section className="recommendation-layout">
        <div className="portal-panel recommendation-search-panel">
          <div className="panel-heading">
            <span className="portal-eyebrow">YOUR PROFILE</span>
            <h2>Tell us what you bring</h2>
            <p>Your details help rank available jobs by relevance.</p>
          </div>

          <form onSubmit={getRecommendations} className="portal-form">
            <div className="portal-form-group">
              <label htmlFor="recommendation-skills">Technical skills</label>
              <input
                id="recommendation-skills"
                className="portal-input"
                placeholder="React, JavaScript, Python"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                required
              />
              <small>Enter multiple skills separated by commas.</small>
            </div>

            <div className="portal-form-group">
              <label htmlFor="recommendation-qualification">Qualification</label>
              <input
                id="recommendation-qualification"
                className="portal-input"
                placeholder="B.Tech, BCA, MCA, etc."
                value={qualification}
                onChange={(e) => setQualification(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="portal-button">
              Get Recommendations
            </button>
          </form>
        </div>

        <aside className="portal-panel recommendation-info-panel">
          <div className="recommendation-info-icon">✦</div>
          <h3>How recommendations work</h3>
          <p>Each job receives a score based on how closely it matches your profile.</p>
          <div className="recommendation-weight">
            <div><strong>70%</strong><span>Technical skills</span></div>
            <div><strong>30%</strong><span>Qualification</span></div>
          </div>
          <p className="recommendation-note">Results with a score above zero are shown, with the highest score first.</p>
        </aside>
      </section>

      <section className="portal-content-section">
        <div className="section-heading-row">
          <div>
            <h2>Recommended jobs</h2>
            <p>Opportunities ranked by your profile match.</p>
          </div>
          {searched && recommendations.length > 0 && (
            <span className="portal-result-count">{recommendations.length} recommendations</span>
          )}
        </div>

        {!searched ? (
          <div className="portal-empty-state">
            <div className="empty-state-icon">✧</div>
            <h3>Your recommendations will appear here</h3>
            <p>Enter your skills and qualification to discover relevant job openings.</p>
          </div>
        ) : recommendations.length === 0 ? (
          <div className="portal-empty-state">
            <div className="empty-state-icon">⌕</div>
            <h3>No matching recommendations found</h3>
            <p>Try different skills or qualification details, or check back when more jobs are posted.</p>
            {jobs.length === 0 && (
              <Link to="/job-posting" className="portal-text-link">Explore job postings</Link>
            )}
          </div>
        ) : (
          <div className="matching-results-list">
            {recommendations.map((job) => (
              <article className="matching-job-card portal-panel" key={job.id}>
                <div className="matching-job-main">
                  <div className="matching-job-heading">
                    <div>
                      <h3>{job.title}</h3>
                      <p>{job.company} <span>•</span> {job.location}</p>
                    </div>
                    <div className="match-score-circle" aria-label={`Recommendation score ${job.score} percent`}>
                      <strong>{job.score}%</strong>
                      <span>score</span>
                    </div>
                  </div>

                  <div className="matching-job-details">
                    <p><strong>Required skills</strong>{job.skills || "Not specified"}</p>
                    <p><strong>Matched skills</strong>{job.matchedSkills.join(", ") || "None"}</p>
                    {job.qualification && (
                      <p><strong>Qualification</strong>{job.qualification}</p>
                    )}
                  </div>

                  <div className="match-progress-track" role="progressbar" aria-valuenow={job.score} aria-valuemin="0" aria-valuemax="100">
                    <div className="match-progress-fill" style={{ width: `${job.score}%` }} />
                  </div>
                  <small className="match-progress-caption">Recommendation score</small>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default JobRecommendations;
