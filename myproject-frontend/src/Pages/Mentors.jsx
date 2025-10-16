import React, { useState } from "react";
import { UserPlus, Search, Star, Calendar, Clock, Award, BookOpen, X } from "lucide-react";
import "../styles/Mentors.css";

export default function Mentors() {
  const [showForm, setShowForm] = useState(false);
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("name");
  const [bookingStep, setBookingStep] = useState(1);
  const [bookingData, setBookingData] = useState({
    date: "",
    time: "",
    topic: "",
    notes: "",
  });
  const [newMentor, setNewMentor] = useState({
    fullName: "",
    expertise: "",
    shortBio: "",
    education: "",
    email: "",
    experience: "",
  });

  const mentorsData = [
    // Academic Guidance
    {
      name: "Bidhan KC",
      expertise: "+2 Science Stream",
      category: "Academic Guidance",
      available: ["12:00 PM", "01:00 PM", "02:00 PM"],
      rating: 4.8,
      sessions: 127,
      experience: "5 years",
      bio: "Specialized in Physics and Chemistry guidance for +2 students",
    },
    {
      name: "Aashish Shrestha",
      expertise: "+2 Management Stream",
      category: "Academic Guidance",
      available: ["01:30 PM", "03:00 PM", "04:30 PM"],
      rating: 4.9,
      sessions: 98,
      experience: "4 years",
      bio: "Expert in Business Studies and Accountancy",
    },
    {
      name: "Priya Adhikari",
      expertise: "Mathematics for +2",
      category: "Academic Guidance",
      available: ["11:00 AM", "02:00 PM", "04:00 PM"],
      rating: 4.7,
      sessions: 105,
      experience: "4 years",
      bio: "Expert in calculus and algebra for high school students",
    },
    {
      name: "Nisha Bhandari",
      expertise: "Physics for +2",
      category: "Academic Guidance",
      available: ["10:30 AM", "01:00 PM", "03:30 PM"],
      rating: 4.8,
      sessions: 115,
      experience: "5 years",
      bio: "Expert in mechanics and electromagnetism for +2 students",
    },
    {
      name: "Kiran Gautam",
      expertise: "Chemistry for +2",
      category: "Academic Guidance",
      available: ["10:00 AM", "01:30 PM", "04:00 PM"],
      rating: 4.6,
      sessions: 100,
      experience: "4 years",
      bio: "Organic and inorganic chemistry expert for high school",
    },
    // Career & Skills
    {
      name: "Keshav Thapa",
      expertise: "Career & Motivation",
      category: "Career & Skills",
      available: ["12:00 PM", "01:00 PM", "02:30 PM"],
      rating: 4.7,
      sessions: 156,
      experience: "7 years",
      bio: "Life coach and career counselor helping students find their path",
    },
    {
      name: "Sujata Pandey",
      expertise: "Tech Career Pathways",
      category: "Career & Skills",
      available: ["03:00 PM", "04:00 PM", "05:00 PM"],
      rating: 4.9,
      sessions: 143,
      experience: "6 years",
      bio: "Tech industry veteran guiding students into tech careers",
    },
    {
      name: "Rina Maharjan",
      expertise: "Public Speaking",
      category: "Career & Skills",
      available: ["11:30 AM", "01:00 PM", "04:30 PM"],
      rating: 4.9,
      sessions: 110,
      experience: "5 years",
      bio: "Speech coach helping students excel in communication",
    },
    {
      name: "Pooja Rimal",
      expertise: "Graphic Design",
      category: "Career & Skills",
      available: ["11:00 AM", "02:00 PM", "04:30 PM"],
      rating: 4.9,
      sessions: 145,
      experience: "6 years",
      bio: "Creative designer teaching Adobe tools and branding",
    },
    {
      name: "Manisha Joshi",
      expertise: "Digital Marketing",
      category: "Career & Skills",
      available: ["10:30 AM", "02:00 PM", "03:30 PM"],
      rating: 4.8,
      sessions: 140,
      experience: "6 years",
      bio: "SEO and social media marketing specialist",
    },
    // Technology & Coding
    {
      name: "Ravi Sharma",
      expertise: "Frontend Development",
      category: "Technology & Coding",
      available: ["12:30 PM", "02:00 PM", "03:30 PM"],
      rating: 4.8,
      sessions: 189,
      experience: "8 years",
      bio: "Full-stack developer specializing in React and modern web tech",
    },
    {
      name: "Anjali Singh",
      expertise: "AI & Data Science",
      category: "Technology & Coding",
      available: ["01:00 PM", "03:00 PM", "04:30 PM"],
      rating: 5.0,
      sessions: 112,
      experience: "6 years",
      bio: "ML engineer helping students break into AI and data science",
    },
    {
      name: "Arjun Pokharel",
      expertise: "Backend Development",
      category: "Technology & Coding",
      available: ["01:00 PM", "03:00 PM", "05:30 PM"],
      rating: 4.7,
      sessions: 165,
      experience: "7 years",
      bio: "Node.js and Python expert for scalable backend systems",
    },
    {
      name: "Vikram Thakur",
      expertise: "Mobile App Development",
      category: "Technology & Coding",
      available: ["12:00 PM", "02:00 PM", "05:00 PM"],
      rating: 4.9,
      sessions: 175,
      experience: "8 years",
      bio: "Flutter and React Native developer for cross-platform apps",
    },
    {
      name: "Tara Poudel",
      expertise: "Blockchain Development",
      category: "Technology & Coding",
      available: ["12:30 PM", "03:30 PM", "05:30 PM"],
      rating: 4.9,
      sessions: 145,
      experience: "6 years",
      bio: "Smart contract and Ethereum development expert",
    },
  ];

  const categories = ["All", "Academic Guidance", "Career & Skills", "Technology & Coding"];

  const filteredMentors = mentorsData
    .filter((mentor) => {
      const matchesSearch =
        mentor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        mentor.expertise.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "All" || mentor.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "sessions") return b.sessions - a.sessions;
      return a.name.localeCompare(b.name);
    });

  const groupedMentors = filteredMentors.reduce((acc, mentor) => {
    if (!acc[mentor.category]) acc[mentor.category] = [];
    acc[mentor.category].push(mentor);
    return acc;
  }, {});

  const handleBooking = (mentor) => {
    setSelectedMentor(mentor);
    setBookingStep(1);
    setBookingData({ date: "", time: "", topic: "", notes: "" });
  };

  const handleBookingSubmit = () => {
    if (bookingData.date && bookingData.time && bookingData.topic) {
      alert(
        `✅ Session booked with ${selectedMentor.name}!\n\nDate: ${bookingData.date}\nTime: ${bookingData.time}\nTopic: ${bookingData.topic}\nNotes: ${bookingData.notes || "None"}`
      );
      setSelectedMentor(null);
      setBookingStep(1);
      setBookingData({ date: "", time: "", topic: "", notes: "" });
    } else {
      alert("⚠️ Please complete all required fields (Date, Time, Topic)");
    }
  };

  const handleAddMentor = () => {
    if (newMentor.fullName && newMentor.expertise && newMentor.email) {
      alert(
        `✅ ${newMentor.fullName} registered successfully! We'll review your application within 24 hours.`
      );
      setShowForm(false);
      setNewMentor({ fullName: "", expertise: "", shortBio: "", education: "", email: "", experience: "" });
    } else {
      alert("⚠️ Please fill in all required fields (Full Name, Expertise, Email)");
    }
  };

  return (
    <div className="mentors-page">
      {/* Header Section */}
      <div className="mentors-header">
        <div>
          <h1 className="mentors-title">🚀 Mentorship Hub</h1>
          <p className="mentors-subtitle">Connect with expert mentors to guide your journey</p>
        </div>
        <button onClick={() => setShowForm(true)} className="register-btn btn btn-primary">
          <UserPlus size={20} /> Register as Mentor
        </button>
      </div>

      {/* Search and Filter Section */}
      <div className="filter-section">
        <div className="search-box">
          <Search size={20} className="search-icon" />
          <input
            type="text"
            placeholder="Search mentors by name or expertise..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="filter-controls">
          <div className="category-filter">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`category-btn btn ${selectedCategory === cat ? "btn-primary" : "btn-outline"}`}
              >
                {cat}
              </button>
            ))}
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="sort-select"
          >
            <option value="name">Sort by Name</option>
            <option value="rating">Sort by Rating</option>
            <option value="sessions">Sort by Sessions</option>
          </select>
        </div>
      </div>

      {/* Stats Section */}
      <div className="stats-grid">
        <div className="stat-card">
          <Award size={24} className="stat-icon" />
          <div>
            <div className="stat-number">{mentorsData.length}</div>
            <div className="stat-label">Expert Mentors</div>
          </div>
        </div>
        <div className="stat-card">
          <BookOpen size={24} className="stat-icon" />
          <div>
            <div className="stat-number">500+</div>
            <div className="stat-label">Sessions Completed</div>
          </div>
        </div>
        <div className="stat-card">
          <Star size={24} className="stat-icon" />
          <div>
            <div className="stat-number">4.8</div>
            <div className="stat-label">Average Rating</div>
          </div>
        </div>
      </div>

      {/* Mentors Grid */}
      {Object.keys(groupedMentors).length > 0 ? (
        <div className="mentors-section">
          {Object.keys(groupedMentors).map((category) => (
            <div key={category} className="category-section">
              <h2 className="category-title">{category}</h2>
              <div className="mentors-grid">
                {groupedMentors[category].map((mentor) => (
                  <div key={mentor.name} className="mentor-card">
                    <div className="mentor-header">
                      <div className="mentor-avatar">
                        {mentor.name.split(" ").map((n) => n[0]).join("")}
                      </div>
                      <div className="mentor-rating">
                        <Star size={16} fill="cyan" color="cyan" />
                        <span>{mentor.rating}</span>
                      </div>
                    </div>

                    <h3 className="mentor-name">{mentor.name}</h3>
                    <p className="mentor-expertise">{mentor.expertise}</p>
                    <p className="mentor-bio">{mentor.bio}</p>

                    <div className="mentor-meta">
                      <div className="meta-item">
                        <Clock size={14} />
                        <span>{mentor.experience}</span>
                      </div>
                      <div className="meta-item">
                        <BookOpen size={14} />
                        <span>{mentor.sessions} sessions</span>
                      </div>
                    </div>

                    <div className="availability-section">
                      <div className="availability-label">Available Today:</div>
                      <div className="time-slots">
                        {mentor.available.slice(0, 3).map((time, i) => (
                          <span key={i} className="time-slot">{time}</span>
                        ))}
                      </div>
                    </div>

                    <button onClick={() => handleBooking(mentor)} className="book-btn btn btn-primary">
                      <Calendar size={16} /> Book Session
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-results">
          <Search size={48} />
          <p>No mentors found matching your criteria</p>
        </div>
      )}

      {/* Booking Modal */}
      {selectedMentor && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button onClick={() => setSelectedMentor(null)} className="close-btn">
              <X size={24} />
            </button>

            <h2 className="modal-title">Book Session with {selectedMentor.name}</h2>
            <p className="modal-subtitle">{selectedMentor.expertise}</p>

            <div className="progress-bar">
              <div className={`progress-step ${bookingStep >= 1 ? "active" : ""}`}>1</div>
              <div className={`progress-line ${bookingStep >= 2 ? "active" : ""}`}></div>
              <div className={`progress-step ${bookingStep >= 2 ? "active" : ""}`}>2</div>
              <div className={`progress-line ${bookingStep >= 3 ? "active" : ""}`}></div>
              <div className={`progress-step ${bookingStep >= 3 ? "active" : ""}`}>3</div>
            </div>

            {bookingStep === 1 && (
              <div className="form-group">
                <label className="form-label">Select Date *</label>
                <input
                  type="date"
                  value={bookingData.date}
                  onChange={(e) => setBookingData({ ...bookingData, date: e.target.value })}
                  className="form-input"
                  min={new Date().toISOString().split("T")[0]}
                />
                <button
                  onClick={() => bookingData.date && setBookingStep(2)}
                  className="next-btn btn btn-primary"
                  disabled={!bookingData.date}
                >
                  Next
                </button>
              </div>
            )}

            {bookingStep === 2 && (
              <div className="form-group">
                <label className="form-label">Select Time Slot *</label>
                <div className="time-slots-grid">
                  {selectedMentor.available.map((time, i) => (
                    <button
                      key={i}
                      onClick={() => setBookingData({ ...bookingData, time })}
                      className={`time-slot-btn btn ${bookingData.time === time ? "btn-primary" : "btn-outline"}`}
                    >
                      <Clock size={16} /> {time}
                    </button>
                  ))}
                </div>
                <div className="modal-btn-group">
                  <button onClick={() => setBookingStep(1)} className="back-btn btn btn-outline">
                    Back
                  </button>
                  <button
                    onClick={() => bookingData.time && setBookingStep(3)}
                    className="next-btn btn btn-primary"
                    disabled={!bookingData.time}
                  >
                    Next
                  </button>
                </div>
              </div>
            )}

            {bookingStep === 3 && (
              <div className="form-group">
                <label className="form-label">Session Topic *</label>
                <input
                  type="text"
                  value={bookingData.topic}
                  onChange={(e) => setBookingData({ ...bookingData, topic: e.target.value })}
                  className="form-input"
                  placeholder="e.g., Career guidance for CS degree"
                />

                <label className="form-label">Additional Notes (Optional)</label>
                <textarea
                  value={bookingData.notes}
                  onChange={(e) => setBookingData({ ...bookingData, notes: e.target.value })}
                  className="form-textarea"
                  placeholder="Any specific questions or topics you'd like to discuss..."
                />

                <div className="booking-summary">
                  <h4 className="summary-title">Booking Summary</h4>
                  <div className="summary-item">
                    <span>Mentor:</span>
                    <span>{selectedMentor.name}</span>
                  </div>
                  <div className="summary-item">
                    <span>Date:</span>
                    <span>{bookingData.date}</span>
                  </div>
                  <div className="summary-item">
                    <span>Time:</span>
                    <span>{bookingData.time}</span>
                  </div>
                  <div className="summary-item">
                    <span>Topic:</span>
                    <span>{bookingData.topic || "Not specified"}</span>
                  </div>
                </div>

                <div className="modal-btn-group">
                  <button onClick={() => setBookingStep(2)} className="back-btn btn btn-outline">
                    Back
                  </button>
                  <button
                    onClick={handleBookingSubmit}
                    className="confirm-btn btn btn-primary"
                    disabled={!bookingData.topic}
                  >
                    Confirm Booking
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Register Form Modal */}
      {showForm && (
        <div className="modal-overlay">
          <div className="modal-content register-modal">
            <button onClick={() => setShowForm(false)} className="close-btn">
              <X size={24} />
            </button>

            <h2 className="modal-title">
              <UserPlus size={28} /> Register as Mentor
            </h2>
            <p className="modal-subtitle">Share your expertise and help students succeed</p>

            <div className="form-group">
              <label className="form-label">Full Name *</label>
              <input
                type="text"
                value={newMentor.fullName}
                onChange={(e) => setNewMentor({ ...newMentor, fullName: e.target.value })}
                className="form-input"
                placeholder="Enter your full name"
              />

              <label className="form-label">Email Address *</label>
              <input
                type="email"
                value={newMentor.email}
                onChange={(e) => setNewMentor({ ...newMentor, email: e.target.value })}
                className="form-input"
                placeholder="your.email@example.com"
              />

              <label className="form-label">Area of Expertise *</label>
              <input
                type="text"
                value={newMentor.expertise}
                onChange={(e) => setNewMentor({ ...newMentor, expertise: e.target.value })}
                className="form-input"
                placeholder="e.g., Web Development, Career Counseling"
              />

              <label className="form-label">Years of Experience</label>
              <input
                type="text"
                value={newMentor.experience}
                onChange={(e) => setNewMentor({ ...newMentor, experience: e.target.value })}
                className="form-input"
                placeholder="e.g., 5 years"
              />

              <label className="form-label">Education Background</label>
              <input
                type="text"
                value={newMentor.education}
                onChange={(e) => setNewMentor({ ...newMentor, education: e.target.value })}
                className="form-input"
                placeholder="Your highest qualification"
              />

              <label className="form-label">Short Bio</label>
              <textarea
                value={newMentor.shortBio}
                onChange={(e) => setNewMentor({ ...newMentor, shortBio: e.target.value })}
                className="form-textarea"
                placeholder="Tell us about yourself and what you can offer to students..."
              />

              <button onClick={handleAddMentor} className="submit-btn btn btn-primary">
                Submit Application
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}