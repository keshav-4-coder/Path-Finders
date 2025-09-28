import React from "react";
import PropTypes from "prop-types";
import { Clock, Upload } from "lucide-react";

export default function MentorCard({ mentor, onBookClick }) {
  return (
    <div className="mentor-card">
      <h3 className="mentor-name">{mentor.fullName || mentor.name}</h3>
      <p className="mentor-expertise">{mentor.expertise}</p>
      <p className="mentor-available">Available: {mentor.available || "12 PM - 6 PM"}</p>

      {/* Optional uploaded files */}
      {mentor.file && (
        <p className="mentor-file">
          <Upload className="inline w-4 h-4 mr-1" /> {mentor.file.name}
        </p>
      )}
      {mentor.resume && (
        <p className="mentor-file">
          <Upload className="inline w-4 h-4 mr-1" /> {mentor.resume.name}
        </p>
      )}

      {/* Book Session Button */}
      <button onClick={() => onBookClick(mentor)} className="book-btn">
        <Clock className="inline w-4 h-4 mr-1" /> Book Session
      </button>
    </div>
  );
}

MentorCard.propTypes = {
  mentor: PropTypes.shape({
    fullName: PropTypes.string,
    name: PropTypes.string,
    expertise: PropTypes.string,
    available: PropTypes.string,
    file: PropTypes.object,
    resume: PropTypes.object,
  }).isRequired,
  onBookClick: PropTypes.func.isRequired,
};
