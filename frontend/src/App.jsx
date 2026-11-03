import { Routes, Route, Navigate } from 'react-router-dom';
import Home from "./pages/Home";

import Login from './modules/authentication/pages/Login.jsx';
import Register from './modules/authentication/pages/Register.jsx';
import VerifyOTP from './modules/authentication/pages/VerifyOTP.jsx';
import Profile from './modules/authentication/pages/Profile.jsx';
import EmployerProfile from "./modules/employer/pages/EmployerProfile";
import JobPosting from "./modules/employer/pages/JobPosting";
import ApplicantTracking from "./modules/employer/pages/ApplicantTracking";
import AIJobMatching from "./modules/job-matching/pages/AIJobMatching";
import JobRecommendations from "./modules/job-matching/pages/JobRecommendations";
import LocationMatching from "./modules/job-matching/pages/LocationMatching";
import MentorRegistration from "./modules/mentorship/pages/MentorRegistration";
import MentorMatching from "./modules/mentorship/pages/MentorMatching";
import SessionScheduling from "./modules/mentorship/pages/SessionScheduling";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/verify-otp" element={<VerifyOTP />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/employer-profile" element={<EmployerProfile />} />
<Route path="/job-posting" element={<JobPosting />} />
<Route path="/applicant-tracking" element={<ApplicantTracking />} />
<Route path="/ai-job-matching" element={<AIJobMatching />} />

<Route path="/job-recommendations" element={<JobRecommendations />} />

<Route path="/location-matching" element={<LocationMatching />} />
  <Route path="/mentor-registration" element={<MentorRegistration />} />

<Route path="/mentor-matching" element={<MentorMatching />} />

<Route path="/session-scheduling" element={<SessionScheduling />} /> 
    </Routes>
  );
}

export default App;