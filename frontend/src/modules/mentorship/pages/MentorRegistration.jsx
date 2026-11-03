import { useState } from "react";

function MentorRegistration() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    expertise: "",
    experience: "",
    skills: "",
    availability: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const mentors = JSON.parse(
      localStorage.getItem("mentors") || "[]"
    );

    const newMentor = {
      ...form,
      id: Date.now()
    };

    mentors.push(newMentor);

    localStorage.setItem("mentors", JSON.stringify(mentors));

    alert("Mentor registered successfully!");

    setForm({
      name: "",
      email: "",
      expertise: "",
      experience: "",
      skills: "",
      availability: ""
    });
  };

  return (
    <div className="container py-5">
      <div className="card shadow p-4 mx-auto" style={{ maxWidth: "650px" }}>
        <h2 className="text-center mb-2">Mentor Registration</h2>

        <p className="text-center text-muted">
          Register yourself as an industry mentor.
        </p>

        <form onSubmit={handleSubmit}>
          <input
            className="form-control mb-3"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <input
            className="form-control mb-3"
            type="email"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            className="form-control mb-3"
            name="expertise"
            placeholder="Area of Expertise"
            value={form.expertise}
            onChange={handleChange}
            required
          />

          <input
            className="form-control mb-3"
            type="number"
            min="0"
            name="experience"
            placeholder="Years of Experience"
            value={form.experience}
            onChange={handleChange}
            required
          />

          <input
            className="form-control mb-3"
            name="skills"
            placeholder="Skills (React, Python, Java)"
            value={form.skills}
            onChange={handleChange}
            required
          />

          <select
            className="form-select mb-3"
            name="availability"
            value={form.availability}
            onChange={handleChange}
            required
          >
            <option value="">Select Availability</option>
            <option value="Weekdays">Weekdays</option>
            <option value="Weekends">Weekends</option>
            <option value="Flexible">Flexible</option>
          </select>

          <button className="btn btn-primary w-100">
            Register as Mentor
          </button>
        </form>
      </div>
    </div>
  );
}

export default MentorRegistration;