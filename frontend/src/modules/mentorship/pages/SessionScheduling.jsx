import { useState, useEffect } from "react";

function SessionScheduling() {
  const [mentors, setMentors] = useState([]);
  const [sessions, setSessions] = useState([]);

  const [form, setForm] = useState({
    mentorId: "",
    studentName: "",
    email: "",
    date: "",
    time: "",
    topic: ""
  });

  useEffect(() => {
    const savedMentors = JSON.parse(
      localStorage.getItem("mentors") || "[]"
    );

    const savedSessions = JSON.parse(
      localStorage.getItem("sessions") || "[]"
    );

    const selected = JSON.parse(
      localStorage.getItem("selectedMentor") || "null"
    );

    setMentors(savedMentors);
    setSessions(savedSessions);

    if (selected) {
      setForm(prev => ({
        ...prev,
        mentorId: String(selected.id)
      }));
    }
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const mentor = mentors.find(
      m => String(m.id) === form.mentorId
    );

    if (!mentor) {
      alert("Please select a valid mentor.");
      return;
    }

    const newSession = {
      ...form,
      mentorName: mentor.name,
      id: Date.now(),
      status: "Pending"
    };

    const updated = [...sessions, newSession];

    setSessions(updated);

    localStorage.setItem(
      "sessions",
      JSON.stringify(updated)
    );

    alert("Mentorship session booked successfully!");

    setForm({
      mentorId: "",
      studentName: "",
      email: "",
      date: "",
      time: "",
      topic: ""
    });

    localStorage.removeItem("selectedMentor");
  };

  const today = new Date().toLocaleDateString("en-CA");

  return (
    <div className="container py-5">
      <div className="card shadow p-4 mx-auto"
        style={{ maxWidth: "700px" }}>

        <h2 className="text-center">Session Scheduling</h2>

        <p className="text-center text-muted">
          Book a mentorship session with an experienced professional.
        </p>

        <form onSubmit={handleSubmit}>
          <label className="form-label">Select Mentor</label>

          <select
            className="form-select mb-3"
            name="mentorId"
            value={form.mentorId}
            onChange={handleChange}
            required
          >
            <option value="">Choose Mentor</option>

            {mentors.map(mentor => (
              <option key={mentor.id} value={mentor.id}>
                {mentor.name} - {mentor.expertise}
              </option>
            ))}
          </select>

          <input
            className="form-control mb-3"
            name="studentName"
            placeholder="Your Full Name"
            value={form.studentName}
            onChange={handleChange}
            required
          />

          <input
            className="form-control mb-3"
            type="email"
            name="email"
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <label className="form-label">Session Date</label>

          <input
            className="form-control mb-3"
            type="date"
            name="date"
            min={today}
            value={form.date}
            onChange={handleChange}
            required
          />

          <label className="form-label">Session Time</label>

          <input
            className="form-control mb-3"
            type="time"
            name="time"
            value={form.time}
            onChange={handleChange}
            required
          />

          <textarea
            className="form-control mb-3"
            name="topic"
            placeholder="What would you like to discuss?"
            value={form.topic}
            onChange={handleChange}
            required
          />

          <button className="btn btn-primary w-100">
            Book Session
          </button>
        </form>
      </div>

      <div className="mt-5">
        <h3>Scheduled Sessions ({sessions.length})</h3>

        {sessions.length === 0 ? (
          <p className="text-muted">
            No sessions booked yet.
          </p>
        ) : (
          sessions.map(session => (
            <div className="card p-3 mb-3" key={session.id}>
              <h5>{session.mentorName}</h5>
              <p><b>Student:</b> {session.studentName}</p>
              <p><b>Date:</b> {session.date}</p>
              <p><b>Time:</b> {session.time}</p>
              <p><b>Topic:</b> {session.topic}</p>
              <p><b>Status:</b> {session.status}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default SessionScheduling;