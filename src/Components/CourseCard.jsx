import React from "react";
import PropTypes from "prop-types";
import "./CourseCard.css";

export default function CourseCard({ title, description, link }) {
  return (
    <div className="course-card">
      <h3 className="course-title">{title}</h3>
      <p className="course-description">{description}</p>
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="course-link-btn"
      >
        Enroll / View Course
      </a>
    </div>
  );
}

CourseCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};
