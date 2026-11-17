// import { useState, useEffect } from "react";

// function ApplicantTracking() {
//   const [applications, setApplications] = useState([]);

//   useEffect(() => {
//     const saved = JSON.parse(
//       localStorage.getItem("applications") || "[]"
//     );
//     setApplications(saved);
//   }, []);

//   const updateStatus = (id, status) => {
//     const updated = applications.map(app =>
//       app.id === id ? { ...app, status } : app
//     );

//     setApplications(updated);
//     localStorage.setItem("applications", JSON.stringify(updated));
//   };

//   return (
//     <div style={{ maxWidth: "1000px", margin: "40px auto", padding: "25px" }}>
//       <h2>Applicant Tracking</h2>
//       <p>Manage candidates who applied for your jobs.</p>

//       <h5>Total Applications: {applications.length}</h5>

//       {applications.length === 0 ? (
//         <div className="alert alert-info">
//           No applications received yet.
//           Applications will appear here when students apply for your jobs.
//         </div>
//       ) : (
//         applications.map(app => (
//           <div key={app.id} className="card p-3 mb-3">
//             <h5>{app.studentName}</h5>

//             <p><b>Email:</b> {app.email}</p>
//             <p><b>Job:</b> {app.jobTitle}</p>
//             <p><b>Skills:</b> {app.skills}</p>
//             <p>
//               <b>Status:</b> {app.status || "Pending"}
//             </p>

//             <div className="d-flex gap-2 flex-wrap">
//               <button
//                 className="btn btn-success"
//                 onClick={() => updateStatus(app.id, "Shortlisted")}
//               >
//                 Shortlist
//               </button>

//               <button
//                 className="btn btn-primary"
//                 onClick={() => updateStatus(app.id, "Accepted")}
//               >
//                 Accept
//               </button>

//               <button
//                 className="btn btn-danger"
//                 onClick={() => updateStatus(app.id, "Rejected")}
//               >
//                 Reject
//               </button>
//             </div>
//           </div>
//         ))
//       )}
//     </div>
//   );
// }

// export default ApplicantTracking;


// import "./App.css";


import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../../App.css";

function ApplicantTracking() {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("applications") || "[]");
    setApplications(saved);
  }, []);

  const updateStatus = (id, status) => {
    const updated = applications.map((app) =>
      app.id === id ? { ...app, status } : app
    );

    setApplications(updated);
    localStorage.setItem("applications", JSON.stringify(updated));
  };

  const countStatus = (status) =>
    applications.filter((app) => (app.status || "Pending") === status).length;

  return (
    <div className="portal-page">
      <nav className="portal-navbar">
        <div className="portal-nav-inner">
          <Link className="portal-brand" to="/">
            Job &amp; Internship <span>Portal</span>
          </Link>
          <div className="portal-nav-links">
            <Link to="/">Home</Link>
            <Link to="/job-posting">Job Posting</Link>
            <Link className="active" to="/applicant-tracking">Applicants</Link>
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
            <h1>Applicant Tracking</h1>
            <p>Review candidates and manage their application status.</p>
          </div>
          <span className="status-pill status-open">
            {applications.length} total applications
          </span>
        </div>

        <section className="tracking-stats">
          <div className="tracking-stat">
            <strong>{applications.length}</strong>
            <span>Total applications</span>
          </div>
          <div className="tracking-stat stat-shortlisted">
            <strong>{countStatus("Shortlisted")}</strong>
            <span>Shortlisted</span>
          </div>
          <div className="tracking-stat stat-accepted">
            <strong>{countStatus("Accepted")}</strong>
            <span>Accepted</span>
          </div>
          <div className="tracking-stat stat-rejected">
            <strong>{countStatus("Rejected")}</strong>
            <span>Rejected</span>
          </div>
        </section>

        <section className="portal-panel tracking-panel">
          <h2>Candidate applications</h2>

          {applications.length === 0 ? (
            <div className="portal-empty-state">
              <h3>No applications received yet</h3>
              <p>
                Applications will appear here when students apply for your jobs.
              </p>
            </div>
          ) : (
            applications.map((app) => {
              const status = app.status || "Pending";

              return (
                <article className="tracking-row" key={app.id}>
                  <div className="tracking-candidate">
                    <strong>{app.studentName || "Candidate"}</strong>
                    <span>{app.email}</span>
                  </div>

                  <div>
                    <span className="tracking-mobile-label">Job / Skills</span>
                    <div className="tracking-candidate">
                      <strong>{app.jobTitle || "Job application"}</strong>
                      <span>{app.skills || "Skills not provided"}</span>
                    </div>
                  </div>

                  <div>
                    <span className="tracking-mobile-label">Status</span>
                    <span className={`status-pill status-${status.toLowerCase()}`}>
                      {status}
                    </span>
                  </div>

                  <div className="tracking-actions">
                    <button
                      type="button"
                      className="portal-button button-warning"
                      onClick={() => updateStatus(app.id, "Shortlisted")}
                    >
                      Shortlist
                    </button>
                    <button
                      type="button"
                      className="portal-button"
                      onClick={() => updateStatus(app.id, "Accepted")}
                    >
                      Accept
                    </button>
                    <button
                      type="button"
                      className="portal-button button-danger"
                      onClick={() => updateStatus(app.id, "Rejected")}
                    >
                      Reject
                    </button>
                  </div>
                </article>
              );
            })
          )}
        </section>
      </main>
    </div>
  );
}

export default ApplicantTracking;
