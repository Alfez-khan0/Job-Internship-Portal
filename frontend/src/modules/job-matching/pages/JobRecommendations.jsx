import { useState, useEffect } from "react";

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
      .map(s => s.trim())
      .filter(Boolean);

    const results = jobs.map(job => {
      const requiredSkills = (job.skills || "")
        .toLowerCase()
        .split(",")
        .map(s => s.trim())
        .filter(Boolean);

      const skillMatches = requiredSkills.filter(s =>
        studentSkills.includes(s)
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
        matchedSkills: skillMatches
      };
    });

    setRecommendations(
      results
        .filter(job => job.score > 0)
        .sort((a, b) => b.score - a.score)
    );

    setSearched(true);
  };

  return (
    <div className="container py-5">
      <h2>Job Recommendations</h2>
      <p className="text-muted">
        Get personalized job recommendations based on your profile.
      </p>

      <form onSubmit={getRecommendations}
        className="card p-4 shadow-sm mb-4">

        <label className="form-label fw-bold">
          Your Technical Skills
        </label>

        <input
          className="form-control mb-3"
          placeholder="React, JavaScript, Python"
          value={skills}
          onChange={e => setSkills(e.target.value)}
          required
        />

        <label className="form-label fw-bold">
          Your Qualification
        </label>

        <input
          className="form-control mb-3"
          placeholder="B.Tech, BCA, MCA, etc."
          value={qualification}
          onChange={e => setQualification(e.target.value)}
          required
        />

        <button className="btn btn-success">
          Get Recommendations
        </button>
      </form>

      <h4>Recommended Jobs</h4>

      {!searched ? (
        <p className="text-muted">
          Enter your details to see recommended jobs.
        </p>
      ) : recommendations.length === 0 ? (
        <div className="alert alert-warning">
          No matching recommendations found. Try different skills
          or qualifications.
        </div>
      ) : (
        recommendations.map(job => (
          <div className="card p-3 mb-3" key={job.id}>
            <h5>{job.title}</h5>
            <p>{job.company} | {job.location}</p>

            <p>
              <strong>Required Skills:</strong> {job.skills}
            </p>

            <p>
              <strong>Matched Skills:</strong>{" "}
              {job.matchedSkills.join(", ") || "None"}
            </p>

            <span className="badge bg-success align-self-start">
              Recommendation Score: {job.score}%
            </span>
          </div>
        ))
      )}
    </div>
  );
}

export default JobRecommendations;