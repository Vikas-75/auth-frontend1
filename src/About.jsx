import React, { useState } from "react";

import "./styles/About.css";

const About = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [activeFaq, setActiveFaq] = useState(null);

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <Layout user={user}>
      <div className="about-page">

        {/* ================= HERO SECTION ================= */}
        <section className="about-hero">
          <div className="hero-content">
            <h1>Employee Live Management System</h1>
            <p>
              A next-generation platform designed to simplify workforce
              operations, enhance productivity, and provide real-time insights.
            </p>
            <div className="hero-buttons">
              <button className="primary-btn">Get Started</button>
              <button className="secondary-btn">Learn More</button>
            </div>
          </div>

          <div className="hero-image">
            <img
              src="https://cdn-icons-png.flaticon.com/512/906/906175.png"
              alt="Team Work"
            />
          </div>
        </section>

        {/* ================= STATS ================= */}
        <section className="about-stats">
          <div className="stat-card">
            <h2>10K+</h2>
            <p>Employees Managed</p>
          </div>
          <div className="stat-card">
            <h2>500+</h2>
            <p>Organizations</p>
          </div>
          <div className="stat-card">
            <h2>99.9%</h2>
            <p>Uptime</p>
          </div>
          <div className="stat-card">
            <h2>24/7</h2>
            <p>Support</p>
          </div>
        </section>

        {/* ================= MISSION ================= */}
        <section className="about-section">
          <h2>Our Mission</h2>
          <p>
            Our mission is to empower organizations with a secure, scalable,
            and intuitive employee management platform that improves efficiency
            and transparency.
          </p>
        </section>

        {/* ================= FEATURES ================= */}
        <section className="about-features">
          <h2>What We Offer</h2>

          <div className="features-grid">
            <div className="feature-card">
              <img src="https://cdn-icons-png.flaticon.com/512/942/942748.png" />
              <h3>Employee Management</h3>
              <p>Centralized employee records with role-based control.</p>
            </div>

            <div className="feature-card">
              <img src="https://cdn-icons-png.flaticon.com/512/747/747376.png" />
              <h3>Leave Management</h3>
              <p>Apply, approve, and track leave requests seamlessly.</p>
            </div>

            <div className="feature-card">
              <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" />
              <h3>Role Security</h3>
              <p>Admin & Employee access with strict permissions.</p>
            </div>

            <div className="feature-card">
              <img src="https://cdn-icons-png.flaticon.com/512/1828/1828884.png" />
              <h3>Live Updates</h3>
              <p>Real-time notifications and system updates.</p>
            </div>
          </div>
        </section>

        {/* ================= TIMELINE ================= */}
        <section className="about-timeline">
          <h2>Our Journey</h2>

          <div className="timeline">
            <div className="timeline-item">
              <span>2022</span>
              <p>Idea & Concept Development</p>
            </div>
            <div className="timeline-item">
              <span>2023</span>
              <p>Core System & Authentication</p>
            </div>
            <div className="timeline-item">
              <span>2024</span>
              <p>Live Employee & Leave Management</p>
            </div>
            <div className="timeline-item">
              <span>2025</span>
              <p>Scalable Cloud Deployment</p>
            </div>
          </div>
        </section>

        {/* ================= TEAM ================= */}
        <section className="about-team">
          <h2>Meet Our Team</h2>

          <div className="team-grid">
            <div className="team-card">
              <img src="https://tse3.mm.bing.net/th/id/OIP.v0S0RoVHAZsy6TE91oFGdgHaE7?pid=Api&P=0&h=180" />
              <h3>Vikas Mali</h3>
              <p>Full Stack Developer</p>
            </div>

            <div className="team-card">
              <img src="https://tse3.mm.bing.net/th/id/OIP.WSuYDHIoL3fF7qwx801zhgHaE8?pid=Api&P=0&h=180" />
              <h3>Rahul Sharma</h3>
              <p>Backend Engineer</p>
            </div>

            <div className="team-card">
              <img src="https://tse1.mm.bing.net/th/id/OIP.F43pwxA1ZhqppONFqGH2QwHaHa?pid=Api&P=0&h=180" />
              <h3>Anjali Verma</h3>
              <p>UI/UX Designer</p>
            </div>
          </div>
        </section>

        {/* ================= FAQ ================= */}
        <section className="about-faq">
          <h2>Frequently Asked Questions</h2>

          {[ 
            {
              q: "Is this platform secure?",
              a: "Yes. We use role-based authentication and secure APIs.",
            },
            {
              q: "Can small teams use it?",
              a: "Absolutely. It scales from startups to enterprises.",
            },
            {
              q: "Is real-time data supported?",
              a: "Yes. Live updates ensure accurate information.",
            },
          ].map((faq, index) => (
            <div
              key={index}
              className={`faq-item ${activeFaq === index ? "active" : ""}`}
              onClick={() => toggleFaq(index)}
            >
              <h3>{faq.q}</h3>
              {activeFaq === index && <p>{faq.a}</p>}
            </div>
          ))}
        </section>

        {/* ================= CTA ================= */}
        <section className="about-cta">
          <h2>Ready to Transform Employee Management?</h2>
          <p>
            Join hundreds of organizations already using our platform.
          </p>
          <button className="btn">Start Now</button>
        </section>

      </div>
    </Layout>
  );
};

export default About;
