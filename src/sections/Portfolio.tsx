import { motion } from 'framer-motion';
import './Portfolio.css';

const easeOut = [0.22, 1, 0.36, 1] as const;

interface PortfolioSectionProps {
  onNavigate: (section: 'home' | 'portfolio' | 'art') => void;
  isActive: boolean;
}

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
    period: "2024 - Present",
    description: "UI platform features for Workday's core product. AI integration across the user experience.",
    technologies: ["TypeScript", "React", "Java"],
    highlight: true
  },
  {
    company: "SVIG.ai",
    role: "Co-Founder",
    period: "2024 - Present",
    description: "Enterprise AI consulting. Helping organizations navigate and thrive in the AI era.",
    technologies: ["AI Strategy", "Consulting"],
    link: "https://svig.ai",
    highlight: true
  },
  {
    company: "Founta",
    role: "Co-Founder & Engineer",
    period: "2023 - 2024",
    description: "AI-powered platform for corporate event planning. Making coworkers friends again.",
    technologies: ["React", "TypeScript", "AI"],
    link: "https://founta.ai",
    highlight: true
  },
  {
    company: "Cisco",
    role: "Software Engineer Intern",
    period: "Summer 2023",
    description: "Certificate renewal automation. AWS pipeline for proxy rotation notifications.",
    technologies: ["Bash", "AWS", "Python"]
  },
  {
    company: "ASKA",
    role: "Flight Software Engineer Intern",
    period: "Summer 2022",
    description: "Testing software for the first flying car prototype. Showroom simulation updates.",
    technologies: ["C#", "RS485", "Embedded"],
    highlight: true
  }
];

const UpArrow = () => (
  <svg viewBox="0 0 100 50" className="up-arrow">
    <motion.path
      d="M 50 45 L 50 15"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <motion.path
      d="M 35 25 L 50 10 L 65 25"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export function PortfolioSection({ onNavigate, isActive }: PortfolioSectionProps) {
  return (
    <div className="portfolio-section">
      <motion.button
        className="back-nav"
        onClick={() => onNavigate('home')}
        whileHover={{ y: -5 }}
      >
        <UpArrow />
        <span>Home</span>
      </motion.button>

      <div className="portfolio-content">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isActive ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: easeOut }}
        >
          Portfolio
        </motion.h2>

        <motion.p
          className="portfolio-intro"
          initial={{ opacity: 0 }}
          animate={isActive ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Building products with human-centered design
        </motion.p>

        <div className="experience-list">
          {experiences.map((exp, index) => (
            <motion.div
              key={`${exp.company}-${exp.period}`}
              className={`experience-card ${exp.highlight ? 'highlight' : ''}`}
              initial={{ opacity: 0, y: 20 }}
              animate={isActive ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 + index * 0.08, ease: easeOut }}
            >
              <div className="exp-header">
                <div>
                  <h3>
                    {exp.link ? (
                      <a href={exp.link} target="_blank" rel="noopener noreferrer">
                        {exp.company} <span className="arrow">↗</span>
                      </a>
                    ) : exp.company}
                  </h3>
                  <span className="exp-role">{exp.role}</span>
                </div>
                <span className="exp-period">{exp.period}</span>
              </div>
              <p className="exp-desc">{exp.description}</p>
              {exp.technologies && (
                <div className="exp-tech">
                  {exp.technologies.map(t => <span key={t}>{t}</span>)}
                </div>
              )}
            </motion.div>
          ))}
        </div>

        <motion.div
          className="portfolio-footer"
          initial={{ opacity: 0 }}
          animate={isActive ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
        >
          <a href="mailto:sahil.saoji@gmail.com">sahil.saoji@gmail.com</a>
        </motion.div>
      </div>
    </div>
  );
}
