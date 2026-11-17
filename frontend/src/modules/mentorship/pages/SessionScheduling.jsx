// import { useState, useEffect } from "react";

// function SessionScheduling() {
//   const [mentors, setMentors] = useState([]);
//   const [sessions, setSessions] = useState([]);

//   const [form, setForm] = useState({
//     mentorId: "",
//     studentName: "",
//     email: "",
//     date: "",
//     time: "",
//     topic: ""
//   });

//   useEffect(() => {
//     const savedMentors = JSON.parse(
//       localStorage.getItem("mentors") || "[]"
//     );

//     const savedSessions = JSON.parse(
//       localStorage.getItem("sessions") || "[]"
//     );

//     const selected = JSON.parse(
//       localStorage.getItem("selectedMentor") || "null"
//     );

//     setMentors(savedMentors);
//     setSessions(savedSessions);

//     if (selected) {
//       setForm(prev => ({
//         ...prev,
//         mentorId: String(selected.id)
//       }));
//     }
//   }, []);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const mentor = mentors.find(
//       m => String(m.id) === form.mentorId
//     );

//     if (!mentor) {
//       alert("Please select a valid mentor.");
//       return;
//     }

//     const newSession = {
//       ...form,
//       mentorName: mentor.name,
//       id: Date.now(),
//       status: "Pending"
//     };

//     const updated = [...sessions, newSession];

//     setSessions(updated);

//     localStorage.setItem(
//       "sessions",
//       JSON.stringify(updated)
//     );

//     alert("Mentorship session booked successfully!");

//     setForm({
//       mentorId: "",
//       studentName: "",
//       email: "",
//       date: "",
//       time: "",
//       topic: ""
//     });

//     localStorage.removeItem("selectedMentor");
//   };

//   const today = new Date().toLocaleDateString("en-CA");

//   return (
//     <div className="container py-5">
//       <div className="card shadow p-4 mx-auto"
//         style={{ maxWidth: "700px" }}>

//         <h2 className="text-center">Session Scheduling</h2>

//         <p className="text-center text-muted">
//           Book a mentorship session with an experienced professional.
//         </p>

//         <form onSubmit={handleSubmit}>
//           <label className="form-label">Select Mentor</label>

//           <select
//             className="form-select mb-3"
//             name="mentorId"
//             value={form.mentorId}
//             onChange={handleChange}
//             required
//           >
//             <option value="">Choose Mentor</option>

//             {mentors.map(mentor => (
//               <option key={mentor.id} value={mentor.id}>
//                 {mentor.name} - {mentor.expertise}
//               </option>
//             ))}
//           </select>

//           <input
//             className="form-control mb-3"
//             name="studentName"
//             placeholder="Your Full Name"
//             value={form.studentName}
//             onChange={handleChange}
//             required
//           />

//           <input
//             className="form-control mb-3"
//             type="email"
//             name="email"
//             placeholder="Your Email"
//             value={form.email}
//             onChange={handleChange}
//             required
//           />

//           <label className="form-label">Session Date</label>

//           <input
//             className="form-control mb-3"
//             type="date"
//             name="date"
//             min={today}
//             value={form.date}
//             onChange={handleChange}
//             required
//           />

//           <label className="form-label">Session Time</label>

//           <input
//             className="form-control mb-3"
//             type="time"
//             name="time"
//             value={form.time}
//             onChange={handleChange}
//             required
//           />

//           <textarea
//             className="form-control mb-3"
//             name="topic"
//             placeholder="What would you like to discuss?"
//             value={form.topic}
//             onChange={handleChange}
//             required
//           />

//           <button className="btn btn-primary w-100">
//             Book Session
//           </button>
//         </form>
//       </div>

//       <div className="mt-5">
//         <h3>Scheduled Sessions ({sessions.length})</h3>

//         {sessions.length === 0 ? (
//           <p className="text-muted">
//             No sessions booked yet.
//           </p>
//         ) : (
//           sessions.map(session => (
//             <div className="card p-3 mb-3" key={session.id}>
//               <h5>{session.mentorName}</h5>
//               <p><b>Student:</b> {session.studentName}</p>
//               <p><b>Date:</b> {session.date}</p>
//               <p><b>Time:</b> {session.time}</p>
//               <p><b>Topic:</b> {session.topic}</p>
//               <p><b>Status:</b> {session.status}</p>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// }

// export default SessionScheduling;


import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../../App.css";

function SessionScheduling() {
  const [mentors, setMentors] = useState([]);
  const [sessions, setSessions] = useState([]);

  const [form, setForm] = useState({
    mentorId: "",
    studentName: "",
    email: "",
    date: "",
    time: "",
    topic: "",
  });

  useEffect(() => {
    const savedMentors = JSON.parse(localStorage.getItem("mentors") || "[]");
    const savedSessions = JSON.parse(localStorage.getItem("sessions") || "[]");
    const selected = JSON.parse(localStorage.getItem("selectedMentor") || "null");

    setMentors(savedMentors);
    setSessions(savedSessions);

    if (selected) {
      setForm((prev) => ({
        ...prev,
        mentorId: String(selected.id),
      }));
    }
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const mentor = mentors.find((m) => String(m.id) === form.mentorId);

    if (!mentor) {
      alert("Please select a valid mentor.");
      return;
    }

    const newSession = {
      ...form,
      mentorName: mentor.name,
      id: Date.now(),
      status: "Pending",
    };

    const updated = [...sessions, newSession];

    setSessions(updated);
    localStorage.setItem("sessions", JSON.stringify(updated));

    alert("Mentorship session booked successfully!");

    setForm({
      mentorId: "",
      studentName: "",
      email: "",
      date: "",
      time: "",
      topic: "",
    });

    localStorage.removeItem("selectedMentor");
  };

  const today = new Date().toLocaleDateString("en-CA");

  return (
    <main className="portal-module-page">
      <div className="module-page-heading">
        <div>
          <span className="portal-eyebrow">MENTORSHIP PROGRAM</span>
          <h1>Schedule a Session</h1>
          <p>Choose a mentor and book a time to discuss your learning and career goals.</p>
        </div>
        <Link to="/mentor-matching" className="portal-button portal-button-secondary">
          Find a Mentor
        </Link>
      </div>

      <section className="session-scheduling-layout">
        <div className="portal-panel session-booking-panel">
          <div className="panel-heading">
            <span className="portal-eyebrow">NEW BOOKING</span>
            <h2>Session details</h2>
            <p>Fill in your details and choose a suitable date and time.</p>
          </div>

          <form onSubmit={handleSubmit} className="portal-form">
            <div className="portal-form-group">
              <label htmlFor="session-mentor">Select mentor</label>
              <select
                id="session-mentor"
                className="portal-input"
                name="mentorId"
                value={form.mentorId}
                onChange={handleChange}
                required
              >
                <option value="">Choose a mentor</option>
                {mentors.map((mentor) => (
                  <option key={mentor.id} value={mentor.id}>
                    {mentor.name} - {mentor.expertise}
                  </option>
                ))}
              </select>
              {mentors.length === 0 && (
                <small>No mentors registered yet. Register a mentor before booking.</small>
              )}
            </div>

            <div className="portal-form-grid">
              <div className="portal-form-group">
                <label htmlFor="session-student-name">Your full name</label>
                <input
                  id="session-student-name"
                  className="portal-input"
                  name="studentName"
                  placeholder="Enter your name"
                  value={form.studentName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="portal-form-group">
                <label htmlFor="session-email">Email address</label>
                <input
                  id="session-email"
                  className="portal-input"
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="portal-form-group">
                <label htmlFor="session-date">Session date</label>
                <input
                  id="session-date"
                  className="portal-input"
                  type="date"
                  name="date"
                  min={today}
                  value={form.date}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="portal-form-group">
                <label htmlFor="session-time">Session time</label>
                <input
                  id="session-time"
                  className="portal-input"
                  type="time"
                  name="time"
                  value={form.time}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="portal-form-group portal-form-full">
                <label htmlFor="session-topic">Discussion topic</label>
                <textarea
                  id="session-topic"
                  className="portal-textarea"
                  name="topic"
                  placeholder="What would you like to discuss?"
                  value={form.topic}
                  onChange={handleChange}
                  required
                  rows="4"
                />
              </div>
            </div>

            <div className="portal-form-actions">
              <button type="submit" className="portal-button" disabled={mentors.length === 0}>
                Book Session
              </button>
            </div>
          </form>
        </div>

        <aside className="portal-panel session-booking-aside">
          <div className="mentor-feature-icon">◷</div>
          <span className="portal-eyebrow">MAKE IT COUNT</span>
          <h2>Prepare for your session</h2>
          <p>Think about the questions, skills or career challenges you want to discuss with your mentor.</p>
          <div className="session-aside-tip">
            <strong>Before booking</strong>
            <span>Choose a date from today onwards and provide a clear discussion topic.</span>
          </div>
        </aside>
      </section>

      <section className="portal-content-section">
        <div className="section-heading-row">
          <div>
            <h2>Scheduled sessions</h2>
            <p>Keep track of your mentorship bookings.</p>
          </div>
          <span className="portal-result-count">{sessions.length} sessions</span>
        </div>

        {sessions.length === 0 ? (
          <div className="portal-empty-state">
            <div className="empty-state-icon">◷</div>
            <h3>No sessions booked yet</h3>
            <p>Your booked mentorship sessions will appear here.</p>
            <Link to="/mentor-matching" className="portal-text-link">Find a mentor</Link>
          </div>
        ) : (
          <div className="session-list">
            {sessions.map((session) => (
              <article className="portal-panel session-card" key={session.id}>
                <div className="session-card-heading">
                  <div>
                    <span className="portal-eyebrow">MENTOR</span>
                    <h3>{session.mentorName}</h3>
                  </div>
                  <span className="status-pill">{session.status}</span>
                </div>
                <div className="session-card-details">
                  <p><strong>Student</strong>{session.studentName}</p>
                  <p><strong>Date</strong>{session.date}</p>
                  <p><strong>Time</strong>{session.time}</p>
                  <p><strong>Topic</strong>{session.topic}</p>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default SessionScheduling;
