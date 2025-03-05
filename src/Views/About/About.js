import React from "react";
import { Link } from "react-router-dom";
import StickyNav from "../HomeScreen/StickyNav";
import Footer from "../HomeScreen/Footer";
import { ArrowLeft } from "lucide-react";
import "./About.css";

function About() {
  return (
    <div className="page-container">
      <StickyNav />
      <div className="page-content">
        <div className="content-container">
          <div className="back-link-wrapper">
            <Link to="/Home" className="back-link">
              <ArrowLeft size={20} />
              <span>Back to Directory</span>
            </Link>
          </div>
          <div className="content-box">
            <div className="content">
              <h1>About Community Directory</h1>
              <div className="content-section">
                <h3>Our Mission</h3>
                <p>
                  At AI Agents Directory, we're on a mission to simplify the complex world of AI agents. Our goal is to create a comprehensive, user-friendly platform that connects individuals and businesses with the most suitable AI agents for their specific needs.
                </p>
              </div>
              <div className="content-section">
                <h3>What We Do</h3>
                <p>
                  We curate and categorize a wide range of AI agents, from task-specific tools to general-purpose assistants. Our directory provides concise, straightforward information about each agent's capabilities, key features, and use cases, helping you make informed decisions quickly.
                </p>
              </div>
              <div className="content-section">
                <h3>Who We Serve</h3>
                <p>Our platform is designed for:</p>
                <ul className="service-list">
                  <li>Developers seeking AI solutions for their projects</li>
                  <li>Businesses looking to enhance their operations with AI</li>
                  <li>Researchers exploring the landscape of AI agents</li>
                  <li>Curious individuals interested in the potential of AI</li>
                </ul>
              </div>
              <div className="content-section">
                <h3>Our Vision</h3>
                <p>
                  We envision a future where AI agents are seamlessly integrated into daily life and work, enhancing human capabilities and driving innovation. By bridging the gap between AI developers and users, we aim to accelerate the adoption and understanding of AI technologies.
                </p>
              </div>
              <div className="content-section">
                <h3>Get in Touch</h3>
                <p>
                  We value your feedback and inquiries. Feel free to reach out to us:
                </p>
                <a href="mailto:subhash@panalinks.com" className="email-link">
                  subhash@panalinks.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default About;
