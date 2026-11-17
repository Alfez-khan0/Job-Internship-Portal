
// import { Link } from "react-router-dom";

// function Home() {
//   const modules = [
//     {
//       title: "Authentication",
//       description: "Manage your account and student profile.",
//       color: "primary",
//       features: [
//         { name: "Login", path: "/login" },
//         { name: "Sign Up", path: "/register" },
//         { name: "OTP Verification", path: "/verify-otp" },
//         { name: "Profile Creation", path: "/profile" },
//       ],
//     },
//     {
//       title: "Employer / Recruiter",
//       description: "Create job opportunities and manage applicants.",
//       color: "success",
//       features: [
//         { name: "Employer Profile", path: "/employer-profile" },
//         { name: "Job Posting", path: "/job-posting" },
//         { name: "Applicant Tracking", path: "/applicant-tracking" },
//       ],
//     },
//     {
//       title: "AI Job Matching",
//       description: "Discover jobs based on skills and preferences.",
//       color: "info",
//       features: [
//         { name: "AI Job Matching", path: "/ai-job-matching" },
//         { name: "Job Recommendations", path: "/job-recommendations" },
//         { name: "Location Matching", path: "/location-matching" },
//       ],
//     },
//     {
//       title: "Mentorship",
//       description: "Connect with mentors and schedule sessions.",
//       color: "warning",
//       features: [
//         { name: "Mentor Registration", path: "/mentor-registration" },
//         { name: "Mentor Matching", path: "/mentor-matching" },
//         { name: "Session Scheduling", path: "/session-scheduling" },
//       ],
//     },
//   ];

//   return (
//     <>
//       {/* Navigation Bar */}
//       <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
//         <div className="container">
//           <Link className="navbar-brand fw-bold" to="/">
//             JobPortal
//           </Link>

//           <button
//             className="navbar-toggler"
//             type="button"
//             data-bs-toggle="collapse"
//             data-bs-target="#mainNavbar"
//             aria-controls="mainNavbar"
//             aria-expanded="false"
//             aria-label="Toggle navigation"
//           >
//             <span className="navbar-toggler-icon"></span>
//           </button>

//           <div className="collapse navbar-collapse" id="mainNavbar">
//             <ul className="navbar-nav ms-auto">
//               <li className="nav-item">
//                 <Link className="nav-link" to="/">
//                   Home
//                 </Link>
//               </li>

//               {modules.map((module, index) => (
//                 <li className="nav-item dropdown" key={index}>
//                   <a
//                     className="nav-link dropdown-toggle"
//                     href="#"
//                     role="button"
//                     data-bs-toggle="dropdown"
//                     aria-expanded="false"
//                   >
//                     {module.title}
//                   </a>

//                   <ul className="dropdown-menu">
//                     {module.features.map((feature, featureIndex) => (
//                       <li key={featureIndex}>
//                         <Link className="dropdown-item" to={feature.path}>
//                           {feature.name}
//                         </Link>
//                       </li>
//                     ))}
//                   </ul>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>
//       </nav>

//       {/* Hero Section */}
//       <section className="bg-primary text-white text-center py-5">
//         <div className="container py-4">
//           <h1 className="display-4 fw-bold">
//             Welcome to Job & Internship Portal
//           </h1>

//           <p className="lead mt-3">
//             Find opportunities, connect with employers, discover your perfect
//             job match, and grow your career with expert mentorship.
//           </p>

//           <Link to="/job-recommendations" className="btn btn-light btn-lg mt-3">
//             Explore Opportunities
//           </Link>
//         </div>
//       </section>

//       {/* Module Cards */}
//       <section className="container py-5">
//         <div className="text-center mb-5">
//           <h2 className="fw-bold">Explore Our Modules</h2>
//           <p className="text-muted">
//             Access all the features of your Job & Internship Portal in one place.
//           </p>
//         </div>

//         <div className="row g-4">
//           {modules.map((module, index) => (
//             <div className="col-md-6 col-lg-3" key={index}>
//               <div className="card h-100 shadow-sm border-0">
//                 <div className={`card-header bg-${module.color} text-white`}>
//                   <h5 className="mb-0">{module.title}</h5>
//                 </div>

//                 <div className="card-body">
//                   <p className="text-muted">{module.description}</p>

//                   <ul className="list-group list-group-flush">
//                     {module.features.map((feature, featureIndex) => (
//                       <li className="list-group-item px-0" key={featureIndex}>
//                         <Link
//                           to={feature.path}
//                           className="text-decoration-none"
//                         >
//                           {feature.name} →
//                         </Link>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="bg-dark text-white text-center py-3">
//         <p className="mb-0">
//           © {new Date().getFullYear()} Job & Internship Portal. All Rights Reserved.
//         </p>
//       </footer>
//     </>
//   );
// }

// export default Home;


import { Link } from "react-router-dom";
import "../App.css";

function Home() {
  const modules = [
    {
      title: "Authentication",
      description: "Manage your account and student profile.",
      color: "primary",
      features: [
        { name: "Login", path: "/login" },
        { name: "Sign Up", path: "/register" },
        { name: "OTP Verification", path: "/verify-otp" },
        { name: "Profile Creation", path: "/profile" },
      ],
    },
    {
      title: "Employer / Recruiter",
      description: "Create job opportunities and manage applicants.",
      color: "teal",
      features: [
        { name: "Employer Profile", path: "/employer-profile" },
        { name: "Job Posting", path: "/job-posting" },
        { name: "Applicant Tracking", path: "/applicant-tracking" },
      ],
    },
    {
      title: "AI Job Matching",
      description: "Discover jobs based on skills and preferences.",
      color: "primary",
      features: [
        { name: "AI Job Matching", path: "/ai-job-matching" },
        { name: "Job Recommendations", path: "/job-recommendations" },
        { name: "Location Matching", path: "/location-matching" },
      ],
    },
    {
      title: "Mentorship",
      description: "Connect with mentors and schedule sessions.",
      color: "teal",
      features: [
        { name: "Mentor Registration", path: "/mentor-registration" },
        { name: "Mentor Matching", path: "/mentor-matching" },
        { name: "Session Scheduling", path: "/session-scheduling" },
      ],
    },
  ];

  return (
    <div className="portal-page">
      <nav className="portal-navbar">
        <div className="portal-nav-inner">
          <Link className="portal-brand" to="/">
            Job &amp; Internship <span>Portal</span>
          </Link>

          <div className="portal-nav-links">
            <Link className="active" to="/">Home</Link>
            <Link to="/job-recommendations">Jobs</Link>
            <Link to="/mentor-matching">Mentors</Link>
            <a href="#about">About</a>
          </div>

          <div className="portal-nav-actions">
            <Link className="nav-login" to="/login">Log in</Link>
            <Link className="portal-button portal-button-small" to="/register">
              Sign up
            </Link>
          </div>
        </div>
      </nav>

      <main>
        <section className="portal-hero">
          <div className="portal-hero-content">
            <h1>Find the Right Opportunity. Build Your Future.</h1>
            <p>
              Find internships and jobs, connect with employers, discover
              opportunities matched to your skills, and grow with expert
              mentorship—all in one place.
            </p>
            <div className="portal-hero-actions">
              <Link to="/job-recommendations" className="portal-button portal-button-light">
                Explore Opportunities
              </Link>
              <Link to="/register" className="portal-button portal-button-outline-light">
                Create an Account
              </Link>
            </div>
          </div>
        </section>

        <section className="portal-content">
          <div className="section-heading">
            <h2>Explore Our Modules</h2>
            <p>Access the tools and services available on your Job &amp; Internship Portal.</p>
          </div>

          <div className="module-grid">
            {modules.map((module) => (
              <article
                className={`module-card ${module.color === "teal" ? "module-teal" : ""}`}
                key={module.title}
              >
                <h3>{module.title}</h3>
                <p className="module-description">{module.description}</p>
                <ul>
                  {module.features.map((feature) => (
                    <li key={feature.path}>
                      <span>›</span>
                      <Link to={feature.path}>{feature.name}</Link>
                    </li>
                  ))}
                </ul>
                <Link className="module-open" to={module.features[0].path}>
                  Explore module →
                </Link>
              </article>
            ))}
          </div>

          <section className="how-section" id="about">
            <h3>How It Works</h3>
            <div className="how-grid">
              <div>Create your account</div>
              <div>Build your profile</div>
              <div>Discover opportunities</div>
              <div>Connect and grow</div>
            </div>
          </section>
        </section>
      </main>

      <footer className="portal-footer">
        © {new Date().getFullYear()} Job &amp; Internship Portal. All Rights Reserved.
      </footer>
    </div>
  );
}

export default Home;
