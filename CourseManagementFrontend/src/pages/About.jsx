import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <section className="about-section">
      <div className="container">
        <h2>About EduLearn</h2>
        <p className="about-text">
          EduLearn was built to make education accessible, engaging, and powerful for both learners and instructors.
          We connect students with curated courses, data driven progress tracking, and a modern learning experience.
        </p>
        <p className="about-text">
          Whether you are starting a new skill path or sharing your expertise as an instructor, our platform makes the journey simple, efficient, and goal oriented.
          Login to manage your dashboard or register to begin your next course in minutes.
        </p>
        <div className="cta-buttons" style={{ justifyContent: 'center', marginTop: '24px' }}>
          <Link to="/register" className="cta-button primary" style={{ marginRight: '12px' }}>
            Register Now
          </Link>
          <Link to="/login" className="cta-button secondary">
            Login
          </Link>
        </div>
      </div>
    </section>
  );
};

export default About;