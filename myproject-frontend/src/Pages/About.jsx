import React, { useEffect, useState } from "react";
import {
  Users,
  Brain,
  Target,
  GraduationCap,
  Sparkles,
  TrendingUp,
  Award,
  Zap,
} from "lucide-react";
import "../styles/About.css";

const About = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalScroll) * 100;
      setScrollProgress(progress);

      const sections = document.querySelectorAll(".about-section");
      const triggerBottom = window.innerHeight * 0.85;
      sections.forEach((section) => {
        const sectionTop = section.getBoundingClientRect().top;
        if (sectionTop < triggerBottom) section.classList.add("visible");
      });
    };

    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const stats = [
    { value: "10K+", label: "Students Guided", icon: Users },
    { value: "500+", label: "Expert Mentors", icon: Award },
    { value: "97%", label: "Career Satisfaction", icon: TrendingUp },
  ];

  const features = [
    {
      icon: Brain,
      title: "AI-Driven Insights",
      text: "Our advanced AI identifies your strengths, interests, and learning style for precise recommendations.",
      gradient: "from-blue-400 to-cyan-400",
    },
    {
      icon: Users,
      title: "1:1 Mentorship",
      text: "Connect with verified mentors who guide you through real-world challenges and career planning.",
      gradient: "from-cyan-400 to-teal-400",
    },
    {
      icon: GraduationCap,
      title: "Personalized Learning",
      text: "We curate resources and courses suited to your pace, goals, and field of interest.",
      gradient: "from-teal-400 to-blue-400",
    },
  ];

  const team = [
    {
      name: "Aashish Shrestha",
      role: "NLP Expert",
      img: "/A.png",
    },
    {
      name: "Keshav Thapa",
      role: "Full Stack Developer",
      img: "/K.png",
    },
    {
      name: "Bidhan K.C",
      role: "Backend Expert",
      img: "/B.png",
    },
  ];

  return (
    <div className="about-page">
      {/* Scroll Progress Bar */}
      <div 
        className="scroll-progress-bar"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Floating Cursor Effect */}
      <div
        className="floating-cursor"
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
        }}
      >
        <div className="cursor-glow" />
      </div>

      {/* HERO SECTION */}
      <section className="hero-section">
        {/* Animated Background */}
        <div className="hero-bg-container">
          <div className="hero-bg-orb hero-bg-orb-1" />
          <div className="hero-bg-orb hero-bg-orb-2" />
        </div>

        <div className="hero-content">
          <div className="hero-badge">
            <Sparkles className="hero-badge-icon" size={20} />
            <span className="hero-badge-text">Transforming Education</span>
          </div>

          <h1 className="hero-title">
            Empowering Students for the Future
          </h1>

          <p className="hero-subtitle">
            Student Guide leverages{" "}
            <span className="hero-highlight">AI</span>
            , mentorship, and tailored learning to help you discover your purpose,
            sharpen your skills, and achieve your dreams.
          </p>

          <div className="hero-buttons">
            <a href="/assessment" className="btn btn-primary">
              <span className="btn-content">
                Start AI Assessment
                <Zap size={20} className="btn-icon" />
              </span>
              <div className="btn-overlay" />
            </a>
            <a href="/mentors" className="btn btn-secondary">
              Browse Mentors
            </a>
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="about-section stats-section">
        <div className="stats-grid">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div key={i} className="stat-card">
                <div className="stat-card-overlay" />
                <div className="stat-card-content">
                  <Icon className="stat-icon" size={40} />
                  <h3 className="stat-value">{stat.value}</h3>
                  <p className="stat-label">{stat.label}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* FEATURES */}
      <section className="about-section features-section">
        <div className="section-header">
          <h2 className="section-title">Why Choose Student Guide</h2>
          <p className="section-subtitle">
            Experience the future of personalized education with our cutting-edge platform
          </p>
        </div>

        <div className="features-grid">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <div
                key={i}
                className="feature-card"
                style={{ animationDelay: `${i * 150}ms` }}
              >
                <div className={`feature-card-overlay gradient-${i}`} />
                
                <div className="feature-card-content">
                  <div className={`feature-icon-wrapper gradient-${i}`}>
                    <Icon className="feature-icon" size={32} />
                  </div>
                  <h3 className="feature-title">{feature.title}</h3>
                  <p className="feature-text">{feature.text}</p>
                </div>

                <div className="feature-corner" />
              </div>
            );
          })}
        </div>
      </section>

      {/* MISSION */}
      <section className="about-section mission-section">
        <div className="mission-content">
          <div className="mission-text">
            <div className="mission-badge">OUR MISSION</div>
            <h2 className="mission-title">
              Building the Next Generation of Leaders
            </h2>
            <p className="mission-description">
              We are redefining how students plan their futures — by using
              technology to personalize education. Our mission is to build a
              generation of learners who are confident, skilled, and career-ready.
            </p>
            <div className="mission-stats">
              <div className="mission-stat-card">
                <div className="mission-stat-value">100%</div>
                <div className="mission-stat-label">AI Accuracy</div>
              </div>
              <div className="mission-stat-card">
                <div className="mission-stat-value">24/7</div>
                <div className="mission-stat-label">Support</div>
              </div>
            </div>
          </div>

          <div className="mission-visual">
            <div className="mission-icon-container">
              <Target size={200} className="mission-icon" />
            </div>
            <div className="mission-icon-glow" />
          </div>
        </div>
      </section>

      {/* TEAM SECTION */}
      <section className="about-section team-section">
        <div className="section-header">
          <h2 className="section-title">Meet Our Team</h2>
          <p className="section-subtitle">
            Passionate experts dedicated to your success
          </p>
        </div>

        <div className="team-grid">
          {team.map((member, i) => (
            <div key={i} className="team-card">
              <div className="team-card-overlay" />
              
              <div className="team-card-content">
                <div className="team-member-image-wrapper">
                  <img
                    src={member.img}
                    alt={member.name}
                    className="team-member-image"
                  />
                  <div className="team-member-image-overlay" />
                </div>
                <h3 className="team-member-name">{member.name}</h3>
                <p className="team-member-role">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="cta-section">
        <div className="cta-bg" />
        <div className="cta-pattern" />
        
        <div className="cta-content">
          <h2 className="cta-title">Ready to Unlock Your Potential?</h2>
          <p className="cta-subtitle">
            Take your first AI-powered assessment and get matched with the perfect
            mentor today.
          </p>
          <a href="/assessment" className="btn btn-cta">
            Get Started Now
            <Sparkles className="btn-icon" size={24} />
          </a>
        </div>
      </section>
    </div>
  );
};

export default About;