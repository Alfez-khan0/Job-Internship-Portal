import { useState, useEffect } from "react";

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
      .map(skill => skill.trim())
      .filter(Boolean);

    const matchedJobs = jobs.map(job => {
      const requiredSkills = (job.skills || "")
        .toLowerCase()
        .split(",")
        .map(skill => skill.trim())
        .filter(Boolean);

      const matched = requiredSkills.filter(skill =>
        studentSkills.includes(skill)
      );

      const percentage = requiredSkills.length
        ? Math.round((matched.length / requiredSkills.length) * 100)
        : 0;

      return {
        ...job,
        matchedSkills: matched,
        percentage
      };
    });

    setResults(matchedJobs.sort(
      (a, b) => b.percentage - a.percentage
    ));
  };

  return (
    <div className="container py-5">
      <h2 className="mb-2">AI Job Matching</h2>
      <p className="text-muted">
        Find jobs that match your technical skills.
      </p>

      <form onSubmit={findMatches} className="card p-4 shadow-sm mb-4">
        <label className="form-label fw-bold">
          Enter Your Skills
        </label>

        <input
          className="form-control mb-3"
          placeholder="React, JavaScript, HTML, CSS"
          value={skills}
          onChange={e => setSkills(e.target.value)}
          required
        />

        <button className="btn btn-primary">
          Find Matching Jobs
        </button>
      </form>

      <h4>Matching Results</h4>

      {results.length === 0 ? (
        <p className="text-muted">
          Enter your skills and click Find Matching Jobs.
          Make sure employers have posted jobs.
        </p>
      ) : (
        results.map(job => (
          <div className="card p-3 mb-3" key={job.id}>
            <h5>{job.title}</h5>
            <p>{job.company} | {job.location}</p>

            <p>
              <strong>Required Skills:</strong> {job.skills}
            </p>

            <p>
              <strong>Your Matching Skills:</strong>{" "}
              {job.matchedSkills.join(", ") || "None"}
            </p>

            <div className="progress mb-2" style={{ height: "20px" }}>
              <div
                className="progress-bar"
                style={{ width: `${job.percentage}%` }}
              >
                {job.percentage}%
              </div>
            </div>

            <small className="text-muted">
              Skill Match Percentage
            </small>
          </div>
        ))
      )}
    </div>
  );
}

export default AIJobMatching;