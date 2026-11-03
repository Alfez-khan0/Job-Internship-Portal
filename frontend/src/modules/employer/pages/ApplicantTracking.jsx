import { useState, useEffect } from "react";

function ApplicantTracking() {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(
      localStorage.getItem("applications") || "[]"
    );
    setApplications(saved);
  }, []);

  const updateStatus = (id, status) => {
    const updated = applications.map(app =>
      app.id === id ? { ...app, status } : app
    );

    setApplications(updated);
    localStorage.setItem("applications", JSON.stringify(updated));
  };

  return (
    <div style={{ maxWidth: "1000px", margin: "40px auto", padding: "25px" }}>
      <h2>Applicant Tracking</h2>
      <p>Manage candidates who applied for your jobs.</p>

      <h5>Total Applications: {applications.length}</h5>

      {applications.length === 0 ? (
        <div className="alert alert-info">
          No applications received yet.
          Applications will appear here when students apply for your jobs.
        </div>
      ) : (
        applications.map(app => (
          <div key={app.id} className="card p-3 mb-3">
            <h5>{app.studentName}</h5>

            <p><b>Email:</b> {app.email}</p>
            <p><b>Job:</b> {app.jobTitle}</p>
            <p><b>Skills:</b> {app.skills}</p>
            <p>
              <b>Status:</b> {app.status || "Pending"}
            </p>

            <div className="d-flex gap-2 flex-wrap">
              <button
                className="btn btn-success"
                onClick={() => updateStatus(app.id, "Shortlisted")}
              >
                Shortlist
              </button>

              <button
                className="btn btn-primary"
                onClick={() => updateStatus(app.id, "Accepted")}
              >
                Accept
              </button>

              <button
                className="btn btn-danger"
                onClick={() => updateStatus(app.id, "Rejected")}
              >
                Reject
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default ApplicantTracking;