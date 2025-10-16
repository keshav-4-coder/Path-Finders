import React, { useState } from "react";
import { User, Mail, Briefcase, Heart, MapPin, Book, Code, BriefcaseIcon, Link } from "lucide-react";
import { jsPDF } from "jspdf";
import "../styles/Profile.css";

const Profile = () => {
  const [profile, setProfile] = useState({
    name: "Your Full Name",
    email: "email@example.com",
    occupation: "Your Occupation",
    interests: "Your Interests",
    location: "Your Location",
    bio: "A brief bio about yourself.",
    profilePicture: "./static/K.png",
    education: "Bachelor's in Computer Science, 2025",
    skills: "React, Django, JavaScript, Python, AI",
    experience: "Your expericence (2021-2023); Other Experience (2020-2021)",
    linkedin: "Your-linkedin-profile link",
    github: "Your-github-profile link",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [newProfilePicture, setNewProfilePicture] = useState(null);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewProfilePicture(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!profile.name.trim()) newErrors.name = "Name is required";
    if (!profile.email.trim() || !/\S+@\S+\.\S+/.test(profile.email)) {
      newErrors.email = "Valid email is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setProfile({
      ...profile,
      profilePicture: newProfilePicture || profile.profilePicture,
    });
    setIsEditing(false);
    alert("Profile saved successfully!");
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete your profile?")) {
      setProfile({
        name: "",
        email: "",
        occupation: "",
        interests: "",
        location: "",
        bio: "",
        education: "",
        skills: "",
        experience: "",
        linkedin: "",
        github: "",
        profilePicture: "",
      });
      setNewProfilePicture(null);
      setIsEditing(false);
      alert("Profile deleted!");
    }
  };

  const generateCV = () => {
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.setFont("helvetica", "bold");
    doc.text(profile.name, 20, 20);
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(`Email: ${profile.email}`, 20, 30);

    let y = 40;
    if (profile.occupation) {
      doc.text(`Occupation: ${profile.occupation}`, 20, y);
      y += 10;
    }
    if (profile.education) {
      doc.text(`Education: ${profile.education}`, 20, y);
      y += 10;
    }
    if (profile.skills) {
      doc.text(`Skills: ${profile.skills}`, 20, y);
      y += 10;
    }
    if (profile.experience) {
      doc.text(`Experience:`, 20, y);
      y += 10;
      profile.experience.split(";").forEach((exp, index) => {
        doc.text(`- ${exp.trim()}`, 25, y + index * 10);
      });
      y += profile.experience.split(";").length * 10;
    }
    if (profile.interests) {
      doc.text(`Interests: ${profile.interests}`, 20, y);
      y += 10;
    }
    if (profile.location) {
      doc.text(`Location: ${profile.location}`, 20, y);
      y += 10;
    }
    if (profile.linkedin) {
      doc.text(`LinkedIn: ${profile.linkedin}`, 20, y);
      y += 10;
    }
    if (profile.github) {
      doc.text(`GitHub: ${profile.github}`, 20, y);
      y += 10;
    }
    if (profile.bio) {
      doc.text(`Bio:`, 20, y);
      doc.setFontSize(10);
      doc.text(profile.bio, 20, y + 10, { maxWidth: 170 });
    }

    doc.save(`${profile.name || "Profile"}-CV.pdf`);
  };

  return (
    <div className="profile-container">
      {profile.name && profile.email ? (
        <div className="profile-card">
          <div className="profile-header">
            <div className="profile-pic-wrapper">
              <img
                src={newProfilePicture || profile.profilePicture}
                alt="Profile"
                className="profile-picture"
              />
              {isEditing && (
                <label className="upload-btn" aria-label="Upload profile picture">
                  Upload
                  <input type="file" accept="image/*" onChange={handleFileChange} />
                </label>
              )}
            </div>
            <h2>{profile.name}</h2>
            <div className="profile-email">{profile.email}</div>
          </div>

          <div className="profile-details">
            <h3>Profile Details</h3>
            <ul>
              <li>
                <span className="label">Name *</span>
                {isEditing ? (
                  <input
                    type="text"
                    name="name"
                    value={profile.name}
                    onChange={handleInputChange}
                    aria-label="Name"
                    required
                  />
                ) : (
                  <span>{profile.name}</span>
                )}
                <User size={16} />
              </li>
              {errors.name && <p className="error">{errors.name}</p>}
              <li>
                <span className="label">Email *</span>
                {isEditing ? (
                  <input
                    type="email"
                    name="email"
                    value={profile.email}
                    onChange={handleInputChange}
                    aria-label="Email"
                    required
                  />
                ) : (
                  <span>{profile.email}</span>
                )}
                <Mail size={16} />
              </li>
              {errors.email && <p className="error">{errors.email}</p>}
              <li>
                <span className="label">Occupation</span>
                {isEditing ? (
                  <input
                    type="text"
                    name="occupation"
                    value={profile.occupation}
                    onChange={handleInputChange}
                    aria-label="Occupation"
                  />
                ) : (
                  <span>{profile.occupation}</span>
                )}
                <Briefcase size={16} />
              </li>
              <li>
                <span className="label">Education</span>
                {isEditing ? (
                  <input
                    type="text"
                    name="education"
                    value={profile.education}
                    onChange={handleInputChange}
                    aria-label="Education"
                  />
                ) : (
                  <span>{profile.education}</span>
                )}
                <Book size={16} />
              </li>
              <li>
                <span className="label">Skills</span>
                {isEditing ? (
                  <input
                    type="text"
                    name="skills"
                    value={profile.skills}
                    onChange={handleInputChange}
                    aria-label="Skills"
                    placeholder="Comma-separated (e.g., React, JavaScript)"
                  />
                ) : (
                  <div className="skills-list">
                    {profile.skills.split(",").map((skill, index) => (
                      <span key={index} className="skill-tag">
                        {skill.trim()}
                      </span>
                    ))}
                  </div>
                )}
                <Code size={16} />
              </li>
              <li>
                <span className="label">Experience</span>
                {isEditing ? (
                  <textarea
                    name="experience"
                    value={profile.experience}
                    onChange={handleInputChange}
                    className="profile-bio-input"
                    aria-label="Experience"
                    placeholder="Separate entries with semicolons (e.g., Job Title at Company (Year); ...)"
                  />
                ) : (
                  <div className="experience-list">
                    {profile.experience.split(";").map((exp, index) => (
                      <div key={index} className="experience-item">
                        <p>{exp.trim()}</p>
                      </div>
                    ))}
                  </div>
                )}
                <BriefcaseIcon size={16} />
              </li>
              <li>
                <span className="label">Interests</span>
                {isEditing ? (
                  <input
                    type="text"
                    name="interests"
                    value={profile.interests}
                    onChange={handleInputChange}
                    aria-label="Interests"
                  />
                ) : (
                  <span>{profile.interests}</span>
                )}
                <Heart size={16} />
              </li>
              <li>
                <span className="label">Location</span>
                {isEditing ? (
                  <input
                    type="text"
                    name="location"
                    value={profile.location}
                    onChange={handleInputChange}
                    aria-label="Location"
                  />
                ) : (
                  <span>{profile.location}</span>
                )}
                <MapPin size={16} />
              </li>
              <li>
                <span className="label">LinkedIn</span>
                {isEditing ? (
                  <input
                    type="url"
                    name="linkedin"
                    value={profile.linkedin}
                    onChange={handleInputChange}
                    aria-label="LinkedIn URL"
                  />
                ) : (
                  <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
                    {profile.linkedin}
                  </a>
                )}
                <Link size={16} />
              </li>
              <li>
                <span className="label">GitHub</span>
                {isEditing ? (
                  <input
                    type="url"
                    name="github"
                    value={profile.github}
                    onChange={handleInputChange}
                    aria-label="GitHub URL"
                  />
                ) : (
                  <a href={profile.github} target="_blank" rel="noopener noreferrer">
                    {profile.github}
                  </a>
                )}
                <Link size={16} />
              </li>
            </ul>
            <h3>Bio</h3>
            {isEditing ? (
              <textarea
                className="profile-bio-input"
                name="bio"
                value={profile.bio}
                onChange={handleInputChange}
                aria-label="Bio"
              />
            ) : (
              <p>{profile.bio}</p>
            )}
          </div>

          <div className="profile-actions">
            <button
              className="btn btn-primary"
              onClick={isEditing ? handleSave : () => setIsEditing(true)}
              aria-label={isEditing ? "Save Profile" : "Edit Profile"}
            >
              {isEditing ? "Save Profile" : "Edit Profile"}
            </button>
            <button
              className="btn btn-download"
              onClick={generateCV}
              aria-label="Download CV"
            >
              Download CV
            </button>
            <button
              className="btn btn-danger"
              onClick={handleDelete}
              aria-label="Delete Profile"
            >
              Delete Profile
            </button>
          </div>
        </div>
      ) : (
        <div className="profile-card">
          <p className="profile-blank-msg">
            No profile data available.{" "}
            <span onClick={() => setIsEditing(true)}>Create a new profile</span> to
            get started!
          </p>
        </div>
      )}
    </div>
  );
};

export default Profile;