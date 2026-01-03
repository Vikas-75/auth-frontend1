import React, { useEffect, useState } from "react";
import Layout from "./components/Layout";
import "./styles/HomePage.css";

const HomePage = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const [activeTab, setActiveTab] = useState("employees");
  const [openFaq, setOpenFaq] = useState(null);
  const [stats, setStats] = useState({
    users: 0,
    teams: 0,
    tasks: 0,
    uptime: 0,
  });

  /* Animated Counters */
  useEffect(() => {
    let interval = setInterval(() => {
      setStats((prev) => ({
        users: prev.users < 1200 ? prev.users + 20 : 1200,
        teams: prev.teams < 150 ? prev.teams + 5 : 150,
        tasks: prev.tasks < 4500 ? prev.tasks + 50 : 4500,
        uptime: prev.uptime < 99 ? prev.uptime + 1 : 99,
      }));
    }, 40);

    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      title: "Profile Management",
      desc: "Manage personal details, roles, and permissions securely.",
      icon: "👤",
    },
    {
      title: "Task & Project Tracking",
      desc: "Track progress, deadlines, and responsibilities.",
      icon: "📌",
    },
    {
      title: "Team Messaging",
      desc: "Real-time messaging for seamless collaboration.",
      icon: "💬",
    },
    {
      title: "Smart Notifications",
      desc: "Instant alerts for tasks, approvals, and updates.",
      icon: "🔔",
    },
    {
      title: "Reports & Analytics",
      desc: "Actionable insights to boost productivity.",
      icon: "📊",
    },
    {
      title: "Secure Access",
      desc: "Role-based authentication with full control.",
      icon: "🔐",
    },
  ];

  const testimonials = [
    {
      name: "Alex Morgan",
      role: "HR Manager",
      text: "EMS Portal transformed how we manage employees.",
    },
    {
      name: "Sarah Johnson",
      role: "Project Lead",
      text: "Task tracking and communication is super smooth.",
    },
    {
      name: "David Lee",
      role: "CEO",
      text: "Reliable, secure, and highly scalable platform.",
    },
  ];

  return (
    <Layout user={user} onLogout={() => (window.location.href = "/")}>
      {/* ================= HERO ================= */}
      <section className="hero">
        <div className="hero-content">
          <h1>Employee Management Made Simple</h1>
          <p>
            A powerful platform to manage employees, tasks, communication,
            and performance — all in one place.
          </p>
          <div className="hero-actions">
            <button onClick={() => (window.location.href = "/signup")}>
              Get Started
            </button>
            <button className="outline">Request Demo</button>
          </div>
        </div>
      </section>

      {/* ================= STATS ================= */}
      <section className="stats">
        <div className="stat-card">
          <h2>{stats.users}+</h2>
          <p>Active Users</p>
        </div>
        <div className="stat-card">
          <h2>{stats.teams}+</h2>
          <p>Teams</p>
        </div>
        <div className="stat-card">
          <h2>{stats.tasks}+</h2>
          <p>Tasks Managed</p>
        </div>
        <div className="stat-card">
          <h2>{stats.uptime}%</h2>
          <p>System Uptime</p>
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="features">
        <h2>Platform Features</h2>
        <div className="feature-grid">
          {features.map((f, i) => (
            <div className="feature-box" key={i}>
              <span>{f.icon}</span>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= TABS ================= */}
      <section className="tabs">
        <h2>How EMS Helps You</h2>
        <div className="tab-buttons">
          <button onClick={() => setActiveTab("employees")} className={activeTab === "employees" ? "active" : ""}>Employees</button>
          <button onClick={() => setActiveTab("managers")} className={activeTab === "managers" ? "active" : ""}>Managers</button>
          <button onClick={() => setActiveTab("admins")} className={activeTab === "admins" ? "active" : ""}>Admins</button>
        </div>

        <div className="tab-content">
          {activeTab === "employees" && (
            <p>Employees can manage tasks, leaves, and communication easily.</p>
          )}
          {activeTab === "managers" && (
            <p>Managers can track performance, approve requests, and generate reports.</p>
          )}
          {activeTab === "admins" && (
            <p>Admins get full system control, security, and analytics.</p>
          )}
        </div>
      </section>

      {/* ================= TESTIMONIALS ================= */}
      <section className="testimonials">
        <h2>What Our Users Say</h2>
        <div className="testimonial-grid">
          {testimonials.map((t, i) => (
            <div className="testimonial" key={i}>
              <p>"{t.text}"</p>
              <h4>{t.name}</h4>
              <span>{t.role}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ================= FAQ ================= */}
      <section className="faq">
        <h2>Frequently Asked Questions</h2>
        {[
          {
            q: "Is EMS Portal secure?",
            a: "Yes, we use role-based access and encrypted authentication.",
          },
          {
            q: "Can I scale for large teams?",
            a: "Absolutely. EMS works for startups to enterprises.",
          },
          {
            q: "Is customer support available?",
            a: "Yes, 24/7 support is available.",
          },
        ].map((item, index) => (
          <div
            className={`faq-item ${openFaq === index ? "open" : ""}`}
            key={index}
          >
            <div
              className="faq-question"
              onClick={() => setOpenFaq(openFaq === index ? null : index)}
            >
              <h4>{item.q}</h4>
              <span>{openFaq === index ? "-" : "+"}</span>
            </div>
            <div className="faq-answer">
              <p>{item.a}</p>
            </div>
          </div>
        ))}
      </section>

      {/* ================= CTA ================= */}
      <section className="final-cta">
        <h2>Ready to boost your productivity?</h2>
        <p>Join thousands of teams already using EMS Portal.</p>
        <button onClick={() => (window.location.href = "/signup")}>
          Create Free Account
        </button>
      </section>
    </Layout>
  );
};

export default HomePage;
