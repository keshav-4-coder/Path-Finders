import { useState } from "react";
import "./Profile.css";

export default function Profile() {
  // Simulated authentication state
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // User profile state
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    course: "",
    year: "",
    interests: "",
    bio: "",
    profilePic: ""
  });

  // Handle input changes
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // Handle profile picture upload
  const handleProfilePicUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUser({ ...user, profilePic: URL.createObjectURL(file) });
    }
  };

  // Simulate login (demo only)
  const handleLogin = () => {
    setIsLoggedIn(true);
    setUser({
      ...user,
      name: "John Doe",
      email: "john.doe@studentguide.com"
    });
  };

  // Logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser({
      name: "",
      email: "",
      phone: "",
      course: "",
      year: "",
      interests: "",
      bio: "",
      profilePic: ""
    });
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        {!isLoggedIn ? (
          <div className="profile-blank">
            <p className="profile-blank-msg">
              Please <span onClick={handleLogin}>login</span> or sign up to set up your profile.
            </p>
          </div>
        ) : (
          <>
            <div className="profile-header">
              <div className="profile-pic-wrapper">
                <img
                  src={
                    user.profilePic
                      ? user.profilePic
                      : "https://cdn-icons-png.flaticon.com/512/847/847969.png"
                  }
                  alt="Profile"
                  className="profile-picture"
                />
                <label className="upload-btn">
                  Change
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleProfilePicUpload}
                  />
                </label>
              </div>
              <h2>{user.name || "Your Name"}</h2>
              <p className="profile-email">{user.email || "Your Email"}</p>
            </div>

            <div className="profile-details">
              <h3>Edit Profile</h3>
              <ul>
                <li>
                  <span>Name:</span>
                  <input
                    type="text"
                    name="name"
                    value={user.name}
                    onChange={handleChange}
                  />
                </li>
                <li>
                  <span>Email:</span>
                  <input
                    type="email"
                    name="email"
                    value={user.email}
                    onChange={handleChange}
                  />
                </li>
                <li>
                  <span>Phone:</span>
                  <input
                    type="text"
                    name="phone"
                    value={user.phone}
                    onChange={handleChange}
                  />
                </li>
                <li>
                  <span>Course:</span>
                  <input
                    type="text"
                    name="course"
                    value={user.course}
                    onChange={handleChange}
                  />
                </li>
                <li>
                  <span>Year:</span>
                  <input
                    type="text"
                    name="year"
                    value={user.year}
                    onChange={handleChange}
                  />
                </li>
                <li>
                  <span>Interests:</span>
                  <input
                    type="text"
                    name="interests"
                    value={user.interests}
                    onChange={handleChange}
                    placeholder="e.g. Coding, Sports, Music"
                  />
                </li>
              </ul>
              <textarea
                name="bio"
                value={user.bio}
                onChange={handleChange}
                placeholder="Write something about yourself..."
                className="profile-bio-input"
              />
            </div>

            <div className="profile-actions">
              <button className="btn btn-primary">Save Changes</button>
              <button className="btn btn-danger" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
