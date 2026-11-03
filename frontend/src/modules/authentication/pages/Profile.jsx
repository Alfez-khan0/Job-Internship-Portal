
function Profile() {
  return (
    <div className="container py-5">
      <h2>Student Profile</h2>
      <p>Complete your professional profile.</p>

      <input className="form-control mb-3" placeholder="Full Name" />
      <input className="form-control mb-3" placeholder="Education" />
      <input className="form-control mb-3" placeholder="Technical Skills" />
      <input className="form-control mb-3" placeholder="Preferred Location" />

      <button className="btn btn-primary">
        Save Profile
      </button>
    </div>
  );
}

export default Profile;