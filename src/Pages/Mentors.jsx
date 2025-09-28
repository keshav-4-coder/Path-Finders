import React, { useState } from "react";
import "./Mentors.css";
import {
  Calendar,
  Clock,
  UserPlus,
  Upload,
  CheckCircle2,
} from "lucide-react";

export default function Mentors() {
  const defaultMentors = [
    {
      name: "Keshav Thapa",
      expertise: "+2 Student Guidance",
      available: ["12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30"],
    },
    {
      name: "Aashish Shrestha",
      expertise: "+2 Student Guidance",
      available: ["12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30"],
    },
    {
      name: "Bidhankc",
      expertise: "+2 Student Guidance",
      available: ["12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30"],
    },
  ];

  const [mentors, setMentors] = useState(defaultMentors);
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [booking, setBooking] = useState({ date: "", time: "" });
  const [confirmed, setConfirmed] = useState(false);

  const [newMentor, setNewMentor] = useState({
    fullName: "",
    expertise: "",
    shortBio: "",
    education: "",
    email: "",
    linkedin: "",
    whatsapp: "",
    github: "",
    story: "",
  });
  const [file, setFile] = useState(null);
  const [resume, setResume] = useState(null);

  const handleProfileUpload = (e) => setFile(e.target.files[0]);
  const handleResumeUpload = (e) => setResume(e.target.files[0]);

  const handleAddMentor = () => {
    if (newMentor.fullName && newMentor.expertise) {
      setMentors([
        ...mentors,
        {
          ...newMentor,
          available: ["12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30"],
          file,
          resume,
        },
      ]);
      setNewMentor({
        fullName: "",
        expertise: "",
        shortBio: "",
        education: "",
        email: "",
        linkedin: "",
        whatsapp: "",
        github: "",
        story: "",
      });
      setFile(null);
      setResume(null);
      alert("Mentor profile registered successfully!");
    }
  };

  const handleBooking = () => {
    if (selectedMentor && booking.date && booking.time) {
      // Remove booked slot
      const updatedMentors = mentors.map((m) =>
        m.name === selectedMentor.name
          ? { ...m, available: m.available.filter((t) => t !== booking.time) }
          : m
      );
      setMentors(updatedMentors);
      setConfirmed(true);
      setTimeout(() => setConfirmed(false), 5000);
    }
  };

  return (
    <div className="mentors-root">
      <h1 className="mentors-title">🚀 Mentorship Hub</h1>

      <div className="mentors-container">
        {/* Available Mentors */}
        <div className="mentors-list-section">
          <h2 className="section-title">Available Mentors</h2>
          <div className="mentors-grid">
            {mentors.map((mentor, idx) => (
              <div key={idx} className="mentor-card">
                {mentor.file && (
                  <img
                    src={URL.createObjectURL(mentor.file)}
                    alt="Profile"
                    className="mentor-profile-pic"
                  />
                )}
                <h3 className="mentor-name">{mentor.fullName || mentor.name}</h3>
                <p className="mentor-expertise">{mentor.expertise}</p>
                <p className="mentor-available">
                  Available Slots: {mentor.available.join(", ")}
                </p>
                <button
                  onClick={() => setSelectedMentor(mentor)}
                  className="book-btn"
                >
                  Book Session
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Register as Mentor */}
        <div className="register-section">
          <h2 className="section-title">
            <UserPlus /> Register as a Mentor
          </h2>
          <div className="upload-card">
            <input
              type="text"
              placeholder="Full Name"
              value={newMentor.fullName}
              onChange={(e) => setNewMentor({ ...newMentor, fullName: e.target.value })}
              className="upload-input"
            />
            <input
              type="text"
              placeholder="Expertise"
              value={newMentor.expertise}
              onChange={(e) => setNewMentor({ ...newMentor, expertise: e.target.value })}
              className="upload-input"
            />
            <textarea
              placeholder="Short Bio"
              value={newMentor.shortBio}
              onChange={(e) => setNewMentor({ ...newMentor, shortBio: e.target.value })}
              className="upload-textarea"
            />
            <input
              type="text"
              placeholder="Education Level"
              value={newMentor.education}
              onChange={(e) => setNewMentor({ ...newMentor, education: e.target.value })}
              className="upload-input"
            />
            <input
              type="email"
              placeholder="Email"
              value={newMentor.email}
              onChange={(e) => setNewMentor({ ...newMentor, email: e.target.value })}
              className="upload-input"
            />
            <input
              type="text"
              placeholder="LinkedIn URL"
              value={newMentor.linkedin}
              onChange={(e) => setNewMentor({ ...newMentor, linkedin: e.target.value })}
              className="upload-input"
            />
            <input
              type="text"
              placeholder="WhatsApp Number"
              value={newMentor.whatsapp}
              onChange={(e) => setNewMentor({ ...newMentor, whatsapp: e.target.value })}
              className="upload-input"
            />
            <input
              type="text"
              placeholder="GitHub URL"
              value={newMentor.github}
              onChange={(e) => setNewMentor({ ...newMentor, github: e.target.value })}
              className="upload-input"
            />
            <textarea
              placeholder="Your Short Story"
              value={newMentor.story}
              onChange={(e) => setNewMentor({ ...newMentor, story: e.target.value })}
              className="upload-textarea"
            />
            <label className="upload-label">
              <Upload /> Upload Profile Picture
              <input type="file" onChange={handleProfileUpload} className="hidden" />
            </label>
            <label className="upload-label">
              <Upload /> Upload Resume
              <input type="file" onChange={handleResumeUpload} className="hidden" />
            </label>
            <button onClick={handleAddMentor} className="upload-btn">
              Register Mentor
            </button>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {selectedMentor && (
        <div className="booking-modal">
          <div className="booking-box">
            <h2 className="booking-title">
              <Calendar /> Book {selectedMentor.fullName || selectedMentor.name}
            </h2>
            <p className="booking-subtitle">{selectedMentor.expertise}</p>
            <input
              type="date"
              value={booking.date}
              onChange={(e) => setBooking({ ...booking, date: e.target.value })}
              className="booking-input"
            />
            <select
              value={booking.time}
              onChange={(e) => setBooking({ ...booking, time: e.target.value })}
              className="booking-input"
            >
              <option value="">Select Time</option>
              {selectedMentor.available.map((slot, idx) => (
                <option key={idx} value={slot}>
                  {slot}
                </option>
              ))}
            </select>
            <div className="booking-actions">
              <button onClick={handleBooking} className="confirm-btn">
                <Clock /> Confirm Booking
              </button>
              <button onClick={() => setSelectedMentor(null)} className="cancel-btn">
                Cancel
              </button>
            </div>
            {confirmed && (
              <div className="confirmed-msg">
                <CheckCircle2 /> Booking Confirmed!
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
