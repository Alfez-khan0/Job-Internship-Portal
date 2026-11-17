// import { useState, useEffect } from "react";

// function MentorMatching() {
//   const [mentors, setMentors] = useState([]);
//   const [skills, setSkills] = useState("");
//   const [results, setResults] = useState([]);
//   const [searched, setSearched] = useState(false);

//   useEffect(() => {
//     const saved = JSON.parse(
//       localStorage.getItem("mentors") || "[]"
//     );

//     setMentors(saved);
//   }, []);

//   const findMentors = (e) => {
//     e.preventDefault();

//     const studentSkills = skills.toLowerCase()
//       .split(",")
//       .map(s => s.trim())
//       .filter(Boolean);

//     const matched = mentors.map(mentor => {
//       const mentorSkills = (mentor.skills || "")
//         .toLowerCase()
//         .split(",")
//         .map(s => s.trim())
//         .filter(Boolean);

//       const common = studentSkills.filter(skill =>
//         mentorSkills.includes(skill)
//       );

//       const score = studentSkills.length
//         ? Math.round((common.length / studentSkills.length) * 100)
//         : 0;

//       return {
//         ...mentor,
//         commonSkills: common,
//         score
//       };
//     });

//     setResults(
//       matched.sort((a, b) => b.score - a.score)
//     );

//     setSearched(true);
//   };

//   return (
//     <div className="container py-5">
//       <h2>Mentor Matching</h2>

//       <p className="text-muted">
//         Find experienced mentors based on your skills and interests.
//       </p>

//       <form onSubmit={findMentors} className="card p-4 shadow-sm mb-4">
//         <label className="form-label fw-bold">
//           Enter Your Skills
//         </label>

//         <input
//           className="form-control mb-3"
//           placeholder="React, JavaScript, Python"
//           value={skills}
//           onChange={e => setSkills(e.target.value)}
//           required
//         />

//         <button className="btn btn-success">
//           Find My Mentor
//         </button>
//       </form>

//       <h4>Available Mentors ({mentors.length})</h4>

//       {!searched ? (
//         <p className="text-muted">
//           Enter your skills to find suitable mentors.
//         </p>
//       ) : results.length === 0 ? (
//         <div className="alert alert-warning">
//           No mentors registered yet. Please register a mentor first.
//         </div>
//       ) : (
//         results.map(mentor => (
//           <div className="card p-3 mb-3" key={mentor.id}>
//             <h5>{mentor.name}</h5>

//             <p><b>Expertise:</b> {mentor.expertise}</p>
//             <p><b>Experience:</b> {mentor.experience} years</p>
//             <p><b>Skills:</b> {mentor.skills}</p>
//             <p><b>Availability:</b> {mentor.availability}</p>

//             <p>
//               <b>Matching Skills:</b>{" "}
//               {mentor.commonSkills.join(", ") || "None"}
//             </p>

//             <div className="progress mb-2">
//               <div
//                 className="progress-bar bg-success"
//                 style={{ width: `${mentor.score}%` }}
//               >
//                 {mentor.score}%
//               </div>
//             </div>

//             <button
//               className="btn btn-primary"
//               onClick={() => {
//                 localStorage.setItem(
//                   "selectedMentor",
//                   JSON.stringify(mentor)
//                 );
//                 window.location.href = "/session-scheduling";
//               }}
//             >
//               Book Mentorship Session
//             </button>
//           </div>
//         ))
//       )}
//     </div>
//   );
// }

// export default MentorMatching;


import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../../App.css";

function MentorMatching() {
  const [mentors, setMentors] = useState([]);
  const [skills, setSkills] = useState("");
  const [results, setResults] = useState([]);
  const [searched, setSearched] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("mentors") || "[]");
    setMentors(saved);
  }, []);

  const findMentors = (e) => {
    e.preventDefault();

    const studentSkills = skills.toLowerCase()
      .split(",")
      .map((skill) => skill.trim())
      .filter(Boolean);

    const matched = mentors.map((mentor) => {
      const mentorSkills = (mentor.skills || "")
        .toLowerCase()
        .split(",")
        .map((skill) => skill.trim())
        .filter(Boolean);

      const common = studentSkills.filter((skill) =>
        mentorSkills.includes(skill)
      );

      const score = studentSkills.length
        ? Math.round((common.length / studentSkills.length) * 100)
        : 0;

      return {
        ...mentor,
        commonSkills: common,
        score,
      };
    });

    setResults(matched.sort((a, b) => b.score - a.score));
    setSearched(true);
  };

  const bookSession = (mentor) => {
    localStorage.setItem("selectedMentor", JSON.stringify(mentor));
    navigate("/session-scheduling");
  };

  return (
    <main className="portal-module-page">
      <div className="module-page-heading">
        <div>
          <span className="portal-eyebrow">CAREER GUIDANCE</span>
          <h1>Find Your Mentor</h1>
          <p>Connect with experienced professionals who share your skills and interests.</p>
        </div>
        <Link to="/mentor-registration" className="portal-button portal-button-secondary">
          Become a Mentor
        </Link>
      </div>

      <section className="portal-panel mentor-search-panel">
        <div className="panel-heading">
          <span className="portal-eyebrow">SKILL-BASED DISCOVERY</span>
          <h2>What would you like to learn?</h2>
          <p>Enter your skills separated by commas to find mentors with relevant expertise.</p>
        </div>

        <form onSubmit={findMentors} className="portal-form">
          <div className="portal-form-group">
            <label htmlFor="mentor-search-skills">Your skills and interests</label>
            <input
              id="mentor-search-skills"
              className="portal-input"
              placeholder="React, JavaScript, Python"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              required
            />
            <small>Example: React, JavaScript, Python</small>
          </div>
          <button type="submit" className="portal-button">
            Find My Mentor
          </button>
        </form>
      </section>

      <section className="portal-content-section">
        <div className="section-heading-row">
          <div>
            <h2>Available mentors</h2>
            <p>Explore registered mentors and their skill compatibility.</p>
          </div>
          <span className="portal-result-count">{mentors.length} mentors available</span>
        </div>

        {!searched ? (
          <div className="portal-empty-state">
            <div className="empty-state-icon">✦</div>
            <h3>Find guidance for your next step</h3>
            <p>Enter your skills above to see mentors ranked by matching skills.</p>
          </div>
        ) : results.length === 0 ? (
          <div className="portal-empty-state">
            <div className="empty-state-icon">⌕</div>
            <h3>No mentors registered yet</h3>
            <p>There are no mentor profiles available at the moment. You can register as a mentor or check again later.</p>
            <Link to="/mentor-registration" className="portal-text-link">Register as a mentor</Link>
          </div>
        ) : (
          <div className="mentor-results-grid">
            {results.map((mentor) => (
              <article className="portal-panel mentor-result-card" key={mentor.id}>
                <div className="mentor-result-top">
                  <div className="mentor-avatar">
                    {(mentor.name || "M").trim().charAt(0).toUpperCase()}
                  </div>
                  <div className="mentor-match-score">
                    <strong>{mentor.score}%</strong>
                    <span>skill match</span>
                  </div>
                </div>

                <h3>{mentor.name}</h3>
                <p className="mentor-expertise">{mentor.expertise}</p>

                <div className="mentor-result-details">
                  <p><strong>Experience</strong>{mentor.experience} years</p>
                  <p><strong>Skills</strong>{mentor.skills || "Not specified"}</p>
                  <p><strong>Availability</strong>{mentor.availability || "Not specified"}</p>
                  <p><strong>Matching skills</strong>{mentor.commonSkills.join(", ") || "None"}</p>
                </div>

                <div className="match-progress-track" role="progressbar" aria-valuenow={mentor.score} aria-valuemin="0" aria-valuemax="100">
                  <div className="match-progress-fill" style={{ width: `${mentor.score}%` }} />
                </div>

                <button
                  type="button"
                  className="portal-button mentor-book-button"
                  onClick={() => bookSession(mentor)}
                >
                  Book Mentorship Session
                </button>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default MentorMatching;
