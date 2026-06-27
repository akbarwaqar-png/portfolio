import { useState } from "react";
import { Link } from "react-router-dom";
import "./index.css";
import {
  Mail,
  Phone,
  MessageCircle,
  Globe
} from "lucide-react";

const experience = [
  {
    company: "MUFG Singapore",
    role: "Risk & Regulatory Specialist",
    year: "2025 – Present",
    details: [
      "Led MAS649 regulatory reporting implementation and UAT testing.",
      "Worked on risk, regulatory and data requirements.",
      "Supported reporting workflow design and project execution.",
    ],
  },
  {
    company: "Bank of America Singapore",
    role: "Vice President, Finance Control",
    year: "2022 – 2025",
    details: [
      "Enhanced front-office to back-office reconciliation accuracy.",
      "Worked on finance control, data quality and process improvement.",
      "Managed change requests, business analysis and stakeholder coordination.",
    ],
  },
  {
    company: "Regnology Singapore",
    role: "APAC Risk & Regulatory SME",
    year: "2019 – 2022",
    details: [
      "Designed MAS and HKMA regulatory reporting data models.",
      "Converted regulatory publications into business and technical requirements.",
      "Supported ECL model creation, UAT and regression testing.",
    ],
  },
  {
    company: "Deutsche Bank Singapore",
    role: "Senior Business Analyst / Project Lead",
    year: "2014 – 2019",
    details: [
      "Worked on Bank of England regulatory reporting requirements.",
      "Created logical data models for enterprise data warehouse implementation.",
      "Led UAT testing and stakeholder project meetings.",
    ],
  },
  {
    company: "OCBC Bank Singapore",
    role: "Business Analyst / Data Modelling",
    year: "2010 – 2014",
    details: [
      "Designed internal MIS balance sheet and P&L reporting requirements.",
      "Created data mart solutions for Malaysia business entity.",
      "Performed source data analysis, profiling and end-to-end data modelling.",
    ],
  },
];

const projects = [
  "Risk , Regulatory and Finance Control",
  "Banking Instruments and Products",
  "Data Engineering and Architecture",
  "AI Utilization",
];

function App() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="app">
      <nav className="navbar">
        <h2>Akbar Ali</h2>

        <div>
          <a href="#about">About</a>
          <a href="#experience">Experience</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
          <Link className="risk-model-link" to="/risk-models">
            Risk Models Built by Akbar
          </Link>
        </div>
      </nav>

      <section className="hero">
        <div className="hero-text">
          <p className="tag">
            Risk Modeling | Regulatory Reporting | Banking Technology
          </p>

          <h1>
            Building Risk, Finance & Regulatory Reporting Solutions for Global Banks
          </h1>

          <p>
            Banking professional with around 18 years of experience across MUFG,
            Bank of America, Regnology, Deutsche Bank, OCBC and Barclays.
          </p>

          <div className="buttons">
            <a href="/resume.pdf" className="primary">
              Download Resume
            </a>
            <a href="#contact" className="secondary">
              Contact Me
            </a>
          </div>
        </div>

        <div className="hero-photo">
          <img src="/profile.png" alt="Akbar Ali" />
        </div>
      </section>

      <section id="about" className="section">
        <h2>About Me</h2>
        <p>
          I am a banking professional specializing in Financial Risk, Regulatory
          Reporting, and Enterprise Data Architecture, with over 18 years of
          experience delivering enterprise solutions for leading global banks. I
          have successfully led large-scale risk, regulatory, and finance
          transformation initiatives by bridging business, data, and technology.
          My expertise lies in translating complex regulatory requirements into
          scalable data and reporting solutions that enhance compliance, improve
          data quality, and support strategic decision-making through modern
          technology.
        </p>
      </section>

      <section id="experience" className="section">
        <h2>Career and Project Timeline</h2>

        <div className="timeline">
          {experience.map((item, index) => (
            <div className="timeline-item" key={item.company}>
              <div className="timeline-header">
                <div>
                  <h3>{item.company}</h3>
                  <p>{item.role}</p>
                  <span>{item.year}</span>
                </div>

                <span
                  className="details-link"
                  onClick={() =>
                    setOpenIndex(openIndex === index ? null : index)
                  }
                >
                  {openIndex === index ? "Hide Details" : "View Details"}
                </span>
              </div>

              {openIndex === index && (
                <div className="details-box">
                  {item.details.map((detail) => (
                    <p key={detail}>• {detail}</p>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <section id="projects" className="section">
        <h2>Featured Skills</h2>
        <div className="grid">
          {projects.map((project) => (
            <Card
              key={project}
              title={project}
              text="Designed and delivered enterprise banking solutions covering business rules, data models, validation, testing and reporting."
            />
          ))}
        </div>
      </section>

      <section id="contact" className="section contact">
        <h2>Contact</h2>

        <div className="contact-list">
          <div className="contact-item">
            <Mail size={18} />
            <strong>Email</strong>
            <a href="mailto:akbar.waqar@gmail.com">
              akbar.waqar@gmail.com
            </a>
          </div>

          <div className="contact-item">
            <Phone size={18} />
            <strong>Mobile</strong>
            <a href="tel:+6583329830">
              +65 8332 9830
            </a>
          </div>

          <div className="contact-item">
            <MessageCircle size={18} />
            <strong>WhatsApp</strong>
            <a
              href="https://wa.me/6583329830"
              target="_blank"
              rel="noopener noreferrer"
            >
              Chat with me
            </a>
          </div>

          <div className="contact-item">
            <Globe size={18} />
            <strong>Website</strong>
            <a
              href="https://akbarali.me"
              target="_blank"
              rel="noopener noreferrer"
            >
              www.akbarali.me
            </a>
          </div>

          <div className="contact-item">
            <span className="linkedin-text">in</span>
            <strong>LinkedIn</strong>
            <a
              href="https://linkedin.com/in/YOUR-LINKEDIN"
              target="_blank"
              rel="noopener noreferrer"
            >
              View Profile
            </a>
          </div>
        </div>
      </section>

      <footer>
        © 2026 Akbar Ali. All rights reserved.
      </footer>
    </div>
  );
}

function Card({ title, text }) {
  return (
    <div className="card">
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  );
}

export default App;