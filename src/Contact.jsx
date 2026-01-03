import React, { useState } from "react";
import "./styles/Contact.css";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:8080/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(text || "Failed to send message");
      }

      // Reset form and show success
      setSubmitted(true);
      setForm({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setSubmitted(false), 3000);
    } catch (err) {
      setError(err.message);
      console.error(err);
    }
  };

  return (
    <div className="contact-page">
      {/* HERO */}
      <section className="contact-hero">
        <h1>Contact EMS Portal</h1>
        <p>
          We’re here to help you with employee management, system support, and
          enterprise solutions.
        </p>
      </section>

      {/* INFO CARDS */}
      <section className="contact-info-cards">
        <div className="info-card">
          <span>📍</span>
          <h3>Office Location</h3>
          <p>EMS Portal HQ</p>
          <p>India</p>
        </div>

        <div className="info-card">
          <span>📧</span>
          <h3>Email Support</h3>
          <p>support@emsportal.com</p>
          <p>24/7 Support</p>
        </div>

        <div className="info-card">
          <span>📞</span>
          <h3>Phone</h3>
          <p>+91 98765 43210</p>
          <p>Mon – Fri</p>
        </div>
      </section>

      {/* FORM + DETAILS */}
      <section className="contact-main">
        <form className="contact-form" onSubmit={handleSubmit}>
          <h2>Send Us a Message</h2>

          <div className="form-group">
            <label>Your Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="John Doe"
              required
            />
          </div>

          <div className="form-group">
            <label>Your Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="john@email.com"
              required
            />
          </div>

          <div className="form-group">
            <label>Subject</label>
            <input
              type="text"
              name="subject"
              value={form.subject}
              onChange={handleChange}
              placeholder="Support / Business / Feedback"
              required
            />
          </div>

          <div className="form-group">
            <label>Message</label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Write your message here..."
              rows="6"
              required
            />
          </div>

          <button type="submit">Send Message</button>

          {submitted && (
            <div className="success-msg">
              ✅ Your message has been sent successfully!
            </div>
          )}

          {error && <div className="error-msg">⚠ {error}</div>}
        </form>

        <div className="contact-side">
          <h2>Why Contact Us?</h2>
          <ul>
            <li>✔ Enterprise-grade employee solutions</li>
            <li>✔ Secure & scalable platform</li>
            <li>✔ Fast customer support</li>
            <li>✔ Trusted by growing organizations</li>
          </ul>

          <div className="contact-hours">
            <h3>Working Hours</h3>
            <p>Monday – Friday</p>
            <p>9:00 AM – 6:00 PM</p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="contact-faq">
        <h2>Frequently Asked Questions</h2>

        <div className="faq-item">
          <h4>How long does support take?</h4>
          <p>We usually respond within 24 hours.</p>
        </div>

        <div className="faq-item">
          <h4>Do you offer enterprise plans?</h4>
          <p>Yes, contact us for custom pricing.</p>
        </div>

        <div className="faq-item">
          <h4>Is my data secure?</h4>
          <p>Absolutely. We use industry-grade security.</p>
        </div>
      </section>

      {/* CTA */}
      <section className="contact-cta">
        <h2>Let’s Build Something Great</h2>
        <p>Partner with EMS Portal today</p>
        <button>Get Started</button>
      </section>
    </div>
  );
};

export default Contact;
