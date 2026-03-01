import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { PageTransition } from '../components/PageTransition';
import './Portfolio.css';

const easeOut = [0.22, 1, 0.36, 1] as const;

const UpArrowPath = () => (
  <svg viewBox="0 0 100 60" className="up-arrow">
    <motion.path
      d="M 50 55 Q 50 30, 50 15"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 0.6, ease: easeOut }}
    />
    <motion.path
      d="M 35 25 L 50 10 L 65 25"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, delay: 0.5 }}
    />
  </svg>
);

interface Experience {
  company: string;
  role: string;
  period: string;
  description: string;
  technologies?: string[];
  link?: string;
  highlight?: boolean;
}

const experiences: Experience[] = [
  {
    company: "Workday",
    role: "Software Development Engineer",
    period: "Sep 2024 - Present",
    description: "Developing UI platform features for Workday's core product on the Intelligent Experience Platform team. Building tools that help AI integration across the user experience.",
    technologies: ["TypeScript", "React", "Java"],
    highlight: true
  },
  {
    company: "SVIG.ai",
    role: "Co-Founder",
    period: "2024 - Present",
    description: "Co-founded Silicon Valley Intelligence Group, an enterprise AI consulting firm. Helping organizations navigate and thrive in the AI era with practical quick wins while building foundations for long-term success.",
    technologies: ["AI Strategy", "Product", "Consulting"],
    link: "https://svig.ai",
    highlight: true
  },
  {
    company: "Founta",
    role: "Co-Founder & Engineer",
    period: "2023 - 2024",
    description: "Built an AI-powered platform to simplify corporate event planning. Helped teams discover venues, book activities, and manage events in one place. Focused on making coworkers friends again.",
    technologies: ["React", "TypeScript", "AI"],
    link: "https://founta.ai",
    highlight: true
  },
  {
    company: "Workday",
    role: "Software Engineer Intern",
    period: "May 2024 - Aug 2024",
    description: "Built a mass action feature as a platform tool enabling bulk operations across Workday. Created user metrics dashboards for data-driven insights.",
    technologies: ["React", "SQL", "Python"]
  },
  {
    company: "Eagle Apps",
    role: "Founding Engineer",
    period: "Aug 2023 - Jul 2024",
    description: "Built a waitlist web application with Boston College's IT Department for the student body, streamlining campus resource management.",
    technologies: ["Full Stack", "Web Development"]
  },
  {
    company: "Cisco",
    role: "Software Engineer Intern",
    period: "May 2023 - Aug 2023",
    description: "Built a bash certificate renewal service for automated security maintenance. Developed an AWS pipeline to get notified of proxy rotations.",
    technologies: ["Bash", "AWS", "Python"]
  },
  {
    company: "ASKA",
    role: "Flight Software Engineer Intern",
    period: "May 2022 - Aug 2022",
    description: "Built testing software using RS485 for the battery, inverter, and other systems of the first flying car prototype. Contributed C# updates to the showroom simulation software.",
    technologies: ["C#", "RS485", "Embedded Systems"],
    highlight: true
  }
];

export function Portfolio() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp') navigate('/');
      if (e.key === 'ArrowRight') navigate('/art');
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate]);

  return (
    <PageTransition>
      <div className="portfolio-page">
        <Link to="/" className="up-nav">
          <UpArrowPath />
          <span>Home</span>
        </Link>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: easeOut }}
        >
          Portfolio
        </motion.h1>

        <motion.p
          className="portfolio-intro"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Building products with clean systems and human-centered design.
        </motion.p>

        <div className="experience-list">
          {experiences.map((exp, index) => (
            <motion.div
              key={`${exp.company}-${exp.period}`}
              className={`experience-card ${exp.highlight ? 'highlight' : ''}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1, ease: easeOut }}
            >
              <div className="experience-header">
                <div className="experience-title">
                  <h2>
                    {exp.link ? (
                      <a href={exp.link} target="_blank" rel="noopener noreferrer">
                        {exp.company}
                        <span className="external-icon">↗</span>
                      </a>
                    ) : (
                      exp.company
                    )}
                  </h2>
                  <span className="experience-role">{exp.role}</span>
                </div>
                <span className="experience-period">{exp.period}</span>
              </div>

              <p className="experience-description">{exp.description}</p>

              {exp.technologies && (
                <div className="experience-tech">
                  {exp.technologies.map((tech) => (
                    <span key={tech} className="tech-tag">{tech}</span>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </div>

        <motion.div
          className="portfolio-footer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <p>Want to work together?</p>
          <a href="mailto:sahil.saoji@gmail.com" className="contact-link">
            sahil.saoji@gmail.com
          </a>
        </motion.div>
      </div>
    </PageTransition>
  );
}
