import "./Courses.css";

export default function Courses() {
  const courses = [
    {
      id: 1,
      title: "Web Development Basics",
      description: "Learn HTML, CSS, and JavaScript to build modern websites.",
      progress: 75,
      status: "Ongoing"
    },
    {
      id: 2,
      title: "Data Structures & Algorithms",
      description: "Master problem-solving techniques with DSA.",
      progress: 40,
      status: "Ongoing"
    },
    {
      id: 3,
      title: "Artificial Intelligence",
      description: "Introduction to AI concepts and applications.",
      progress: 10,
      status: "Not Started"
    },
    {
      id: 4,
      title: "Database Management Systems",
      description: "Understand SQL and relational database design.",
      progress: 100,
      status: "Completed"
    }
  ];

  return (
    <div className="courses-page">
      <h1 className="courses-title">📘 My Courses</h1>
      <div className="courses-grid">
        {courses.map((course) => (
          <div className="course-card" key={course.id}>
            <h2>{course.title}</h2>
            <p>{course.description}</p>
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${course.progress}%` }}
              ></div>
            </div>
            <div className="course-footer">
              <span
                className={`status ${
                  course.status === "Completed"
                    ? "completed"
                    : course.status === "Ongoing"
                    ? "ongoing"
                    : "not-started"
                }`}
              >
                {course.status}
              </span>
              <button className="btn btn-primary">
                {course.status === "Completed" ? "Review" : "Continue"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
