import React, { useState, useEffect } from "react";
import "./styles/Services.css";

const servicesData = [
  {
    id: 1,
    title: "Employee Management",
    icon: "👨‍💼",
    description:
      "Centralized employee profiles, roles, documents, and real-time tracking.",
    features: [
      "Employee Profiles",
      "Role Assignment",
      "Activity Monitoring",
      "HR Dashboard",
    ],
  },
  {
    id: 2,
    title: "Leave Management",
    icon: "📅",
    description:
      "Transparent leave application, approvals, and automated tracking.",
    features: [
      "Leave Requests",
      "Approval Workflow",
      "Holiday Calendar",
      "Leave Balance",
    ],
  },
  {
    id: 3,
    title: "Analytics & Reports",
    icon: "📊",
    description:
      "Data-driven insights to boost productivity and workforce planning.",
    features: [
      "Performance Reports",
      "Attendance Analytics",
      "Exportable Reports",
      "Live Charts",
    ],
  },
  {
    id: 4,
    title: "Secure Access",
    icon: "🔐",
    description:
      "Advanced role-based authentication and authorization system.",
    features: [
      "JWT Security",
      "Role-based Access",
      "Session Control",
      "Audit Logs",
    ],
  },
];

const countersData = [
  { label: "Organizations", value: 120 },
  { label: "Employees Managed", value: 8500 },
  { label: "Reports Generated", value: 24000 },
  { label: "Uptime %", value: 99.9 },
];

const Services = () => {
  const [activeService, setActiveService] = useState(servicesData[0]);
  const [openFAQ, setOpenFAQ] = useState(null);
  const [counts, setCounts] = useState(
    countersData.map(() => 0)
  );

  /* Animated Counters */
  useEffect(() => {
    countersData.forEach((counter, index) => {
      let start = 0;
      const end = counter.value;
      const increment = end / 100;

      const interval = setInterval(() => {
        start += increment;
        setCounts((prev) => {
          const newCounts = [...prev];
          newCounts[index] =
            start >= end ? end : Math.floor(start);
          return newCounts;
        });
        if (start >= end) clearInterval(interval);
      }, 20);
    });
  }, []);

  return (
    <div className="services-page">
      {/* HERO */}
      <section className="services-hero">
        <h1>Our Professional Services</h1>
        <p>
          Smart, secure, and scalable solutions designed for modern workforce
          management.
        </p>
        <button className="primary-btn">Get Started</button>
      </section>

      {/* COUNTERS */}
      <section className="services-counters">
        {countersData.map((item, index) => (
          <div className="counter-card" key={index}>
            <h2>{counts[index]}+</h2>
            <p>{item.label}</p>
          </div>
        ))}
      </section>

      {/* SERVICES TABS */}
      <section className="services-tabs">
        <h2>What We Offer</h2>

        <div className="tabs-container">
          <div className="tabs-list">
            {servicesData.map((service) => (
              <button
                key={service.id}
                className={
                  activeService.id === service.id
                    ? "tab active"
                    : "tab"
                }
                onClick={() => setActiveService(service)}
              >
                {service.icon} {service.title}
              </button>
            ))}
          </div>

          <div className="tab-content">
            <h3>{activeService.title}</h3>
            <p>{activeService.description}</p>

            <ul>
              {activeService.features.map((feature, idx) => (
                <li key={idx}>✔ {feature}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="services-process">
        <h2>How It Works</h2>
        <div className="process-steps">
          <div className="step">
            <span>1</span>
            <h4>Setup</h4>
            <p>Configure roles, permissions, and organization settings.</p>
          </div>
          <div className="step">
            <span>2</span>
            <h4>Manage</h4>
            <p>Track employees, leaves, tasks, and performance.</p>
          </div>
          <div className="step">
            <span>3</span>
            <h4>Analyze</h4>
            <p>Generate insights using real-time analytics.</p>
          </div>
          <div className="step">
            <span>4</span>
            <h4>Grow</h4>
            <p>Optimize workforce productivity and efficiency.</p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="services-faq">
        <h2>Frequently Asked Questions</h2>

        {[
          {
            q: "Is my data secure?",
            a: "Yes, we use industry-standard encryption and role-based access.",
          },
          {
            q: "Can I customize features?",
            a: "Absolutely! Modules can be enabled or disabled as needed.",
          },
          {
            q: "Does it support large teams?",
            a: "Yes, our system scales from small teams to enterprises.",
          },
        ].map((faq, index) => (
          <div
            className={`faq-item ${
              openFAQ === index ? "open" : ""
            }`}
            key={index}
          >
            <div
              className="faq-question"
              onClick={() =>
                setOpenFAQ(openFAQ === index ? null : index)
              }
            >
              <h4>{faq.q}</h4>
              <span>{openFAQ === index ? "−" : "+"}</span>
            </div>
            <div className="faq-answer">
              <p>{faq.a}</p>
            </div>
          </div>
        ))}
      </section>

      {/* CTA */}
      <section className="services-cta">
        <h2>Ready to Transform Your Workforce?</h2>
        <p>
          Start using Employee Live Management today and experience the
          difference.
        </p>
        <div className="cta-buttons">
          <button className="primary-btn">Request Demo</button>
          <button className="secondary-btn">Contact Sales</button>
        </div>
      </section>
    </div>
  );
};

export default Services;
