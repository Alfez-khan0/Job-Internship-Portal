import { useState, useEffect } from "react";

function MentorMatching() {
  const [mentors, setMentors] = useState([]);
  const [skills, setSkills] = useState("");
  const [results, setResults] = useState([]);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    const saved = JSON.parse(
      localStorage.getItem("mentors") || "[]"
    );

    setMentors(saved);
  }, []);

  const findMentors = (e) => {
    e.preventDefault();

    const studentSkills = skills.toLowerCase()
      .split(",")
      .map(s => s.trim())
      .filter(Boolean);

    const matched = mentors.map(mentor => {
      const mentorSkills = (mentor.skills || "")
        .toLowerCase()
        .split(",")
        .map(s => s.trim())
        .filter(Boolean);

      const common = studentSkills.filter(skill =>
        mentorSkills.includes(skill)
      );

      const score = studentSkills.length
        ? Math.round((common.length / studentSkills.length) * 100)
        : 0;

      return {
        ...mentor,
        commonSkills: common,
        score
      };
    });

    setResults(
      matched.sort((a, b) => b.score - a.score)
    );

    setSearched(true);
  };

  return (
    <div className="container py-5">
      <h2>Mentor Matching</h2>

      <p className="text-muted">
        Find experienced mentors based on your skills and interests.
      </p>

      <form onSubmit={findMentors} className="card p-4 shadow-sm mb-4">
        <label className="form-label fw-bold">
          Enter Your Skills
        </label>

        <input
          className="form-control mb-3"
          placeholder="React, JavaScript, Python"
          value={skills}
          onChange={e => setSkills(e.target.value)}
          required
        />

        <button className="btn btn-success">
          Find My Mentor
        </button>
      </form>

      <h4>Available Mentors ({mentors.length})</h4>

      {!searched ? (
        <p className="text-muted">
          Enter your skills to find suitable mentors.
        </p>
      ) : results.length === 0 ? (
        <div className="alert alert-warning">
          No mentors registered yet. Please register a mentor first.
        </div>
      ) : (
        results.map(mentor => (
          <div className="card p-3 mb-3" key={mentor.id}>
            <h5>{mentor.name}</h5>

            <p><b>Expertise:</b> {mentor.expertise}</p>
            <p><b>Experience:</b> {mentor.experience} years</p>
            <p><b>Skills:</b> {mentor.skills}</p>
            <p><b>Availability:</b> {mentor.availability}</p>

            <p>
              <b>Matching Skills:</b>{" "}
              {mentor.commonSkills.join(", ") || "None"}
            </p>

            <div className="progress mb-2">
              <div
                className="progress-bar bg-success"
                style={{ width: `${mentor.score}%` }}
              >
                {mentor.score}%
              </div>
            </div>

            <button
              className="btn btn-primary"
              onClick={() => {
                localStorage.setItem(
                  "selectedMentor",
                  JSON.stringify(mentor)
                );
                window.location.href = "/session-scheduling";
              }}
            >
              Book Mentorship Session
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default MentorMatching;