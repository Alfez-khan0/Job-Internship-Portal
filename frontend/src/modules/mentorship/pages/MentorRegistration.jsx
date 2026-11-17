// import { useState } from "react";

// function MentorRegistration() {
//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     expertise: "",
//     experience: "",
//     skills: "",
//     availability: ""
//   });

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const mentors = JSON.parse(
//       localStorage.getItem("mentors") || "[]"
//     );

//     const newMentor = {
//       ...form,
//       id: Date.now()
//     };

//     mentors.push(newMentor);

//     localStorage.setItem("mentors", JSON.stringify(mentors));

//     alert("Mentor registered successfully!");

//     setForm({
//       name: "",
//       email: "",
//       expertise: "",
//       experience: "",
//       skills: "",
//       availability: ""
//     });
//   };

//   return (
//     <div className="container py-5">
//       <div className="card shadow p-4 mx-auto" style={{ maxWidth: "650px" }}>
//         <h2 className="text-center mb-2">Mentor Registration</h2>

//         <p className="text-center text-muted">
//           Register yourself as an industry mentor.
//         </p>

//         <form onSubmit={handleSubmit}>
//           <input
//             className="form-control mb-3"
//             name="name"
//             placeholder="Full Name"
//             value={form.name}
//             onChange={handleChange}
//             required
//           />

//           <input
//             className="form-control mb-3"
//             type="email"
//             name="email"
//             placeholder="Email Address"
//             value={form.email}
//             onChange={handleChange}
//             required
//           />

//           <input
//             className="form-control mb-3"
//             name="expertise"
//             placeholder="Area of Expertise"
//             value={form.expertise}
//             onChange={handleChange}
//             required
//           />

//           <input
//             className="form-control mb-3"
//             type="number"
//             min="0"
//             name="experience"
//             placeholder="Years of Experience"
//             value={form.experience}
//             onChange={handleChange}
//             required
//           />

//           <input
//             className="form-control mb-3"
//             name="skills"
//             placeholder="Skills (React, Python, Java)"
//             value={form.skills}
//             onChange={handleChange}
//             required
//           />

//           <select
//             className="form-select mb-3"
//             name="availability"
//             value={form.availability}
//             onChange={handleChange}
//             required
//           >
//             <option value="">Select Availability</option>
//             <option value="Weekdays">Weekdays</option>
//             <option value="Weekends">Weekends</option>
//             <option value="Flexible">Flexible</option>
//           </select>

//           <button className="btn btn-primary w-100">
//             Register as Mentor
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default MentorRegistration;


import { useState } from "react";
import { Link } from "react-router-dom";
import "../../../App.css";

function MentorRegistration() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    expertise: "",
    experience: "",
    skills: "",
    availability: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const mentors = JSON.parse(localStorage.getItem("mentors") || "[]");

    const newMentor = {
      ...form,
      id: Date.now(),
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
      availability: "",
    });
  };

  return (
    <main className="portal-module-page">
      <div className="module-page-heading">
        <div>
          <span className="portal-eyebrow">MENTORSHIP COMMUNITY</span>
          <h1>Become a Mentor</h1>
          <p>Share your industry experience and help students grow their careers.</p>
        </div>
        <Link to="/mentor-matching" className="portal-button portal-button-secondary">
          Find a Mentor
        </Link>
      </div>

      <section className="mentor-registration-layout">
        <aside className="portal-panel mentor-registration-intro">
          <div className="mentor-feature-icon">✦</div>
          <span className="portal-eyebrow">MAKE AN IMPACT</span>
          <h2>Guide the next generation</h2>
          <p>Register your expertise and availability so students can discover and connect with you.</p>
          <ul className="mentor-benefit-list">
            <li>Share practical industry knowledge</li>
            <li>Support students with career guidance</li>
            <li>Help learners build relevant skills</li>
          </ul>
        </aside>

        <section className="portal-panel mentor-registration-form-panel">
          <div className="panel-heading">
            <h2>Mentor details</h2>
            <p>Complete the information below to create your mentor profile.</p>
          </div>

          <form onSubmit={handleSubmit} className="portal-form">
            <div className="portal-form-grid">
              <div className="portal-form-group">
                <label htmlFor="mentor-name">Full name</label>
                <input
                  id="mentor-name"
                  className="portal-input"
                  name="name"
                  placeholder="Enter your full name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="portal-form-group">
                <label htmlFor="mentor-email">Email address</label>
                <input
                  id="mentor-email"
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
                <label htmlFor="mentor-expertise">Area of expertise</label>
                <input
                  id="mentor-expertise"
                  className="portal-input"
                  name="expertise"
                  placeholder="e.g. Software Development"
                  value={form.expertise}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="portal-form-group">
                <label htmlFor="mentor-experience">Years of experience</label>
                <input
                  id="mentor-experience"
                  className="portal-input"
                  type="number"
                  min="0"
                  name="experience"
                  placeholder="e.g. 5"
                  value={form.experience}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="portal-form-group portal-form-full">
                <label htmlFor="mentor-skills">Skills</label>
                <input
                  id="mentor-skills"
                  className="portal-input"
                  name="skills"
                  placeholder="React, Python, Java"
                  value={form.skills}
                  onChange={handleChange}
                  required
                />
                <small>Separate skills with commas.</small>
              </div>

              <div className="portal-form-group portal-form-full">
                <label htmlFor="mentor-availability">Availability</label>
                <select
                  id="mentor-availability"
                  className="portal-input"
                  name="availability"
                  value={form.availability}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select your availability</option>
                  <option value="Weekdays">Weekdays</option>
                  <option value="Weekends">Weekends</option>
                  <option value="Flexible">Flexible</option>
                </select>
              </div>
            </div>

            <div className="portal-form-actions">
              <button type="submit" className="portal-button">
                Register as Mentor
              </button>
            </div>
          </form>
        </section>
      </section>
    </main>
  );
}

export default MentorRegistration;
