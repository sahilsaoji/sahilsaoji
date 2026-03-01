import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { softwareProjects, experiences } from '../data/softwareData';
import './ProjectsSite.css';

function FloatingText({ children, scrollYProgress, offset = 0, direction = 1 }: {
  children: React.ReactNode;
  scrollYProgress: any;
  offset?: number;
  direction?: number;
}) {
  const y = useTransform(scrollYProgress, [0, 1], [offset, offset + direction * 50]);
  const smoothY = useSpring(y, { stiffness: 100, damping: 30 });

  return (
    <motion.span style={{ y: smoothY, display: 'inline-block' }}>
      {children}
    </motion.span>
  );
}

export default function ProjectsSite() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const [activeSection, setActiveSection] = useState('about');
  const [showThesis, setShowThesis] = useState(false);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    document.title = 'Sahil Saoji | Projects';
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['about', 'software', 'experience'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="projects-site" ref={containerRef}>
      {/* Navigation */}
      <nav className="nav">
        <span className="nav-logo">SS</span>
        <div className="nav-links">
          <button
            className={activeSection === 'about' ? 'active' : ''}
            onClick={() => scrollTo('about')}
          >
            About
          </button>
          <button
            className={activeSection === 'software' ? 'active' : ''}
            onClick={() => scrollTo('software')}
          >
            Front End Projects
          </button>
          <button
            className={activeSection === 'experience' ? 'active' : ''}
            onClick={() => scrollTo('experience')}
          >
            Experience
          </button>
        </div>
      </nav>

      {/* About / Hero */}
      <section id="about" className="hero">
        <motion.div
          className="hero-content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h1>
            <FloatingText scrollYProgress={scrollYProgress} offset={0} direction={-1}>
              Sahil
            </FloatingText>
            <br />
            <FloatingText scrollYProgress={scrollYProgress} offset={10} direction={1}>
              Saoji
            </FloatingText>
          </h1>
          <p className="hero-tagline">Engineer</p>
          <motion.p
            className="hero-bio"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Software Engineer at Workday<br />
            Computer Science, Finance, and Studio Arts from Boston College
          </motion.p>
        </motion.div>
      </section>

      {/* Front End Projects */}
      <section id="software" className="software">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Front End Projects
        </motion.h2>

        <div className="projects-grid">
          {softwareProjects.map((project, i) => (
            <motion.div
              key={project.name}
              className="project-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              onClick={() => project.link && window.open(project.link, '_blank')}
              style={{ cursor: project.link ? 'pointer' : 'default' }}
            >
              <div className="project-image">
                <img
                  src={`${import.meta.env.BASE_URL}photos/${project.image}`}
                  alt={project.name}
                  loading="lazy"
                />
              </div>
              <div className="project-overlay">
                <h3 className="project-title">{project.name}</h3>
                <p className="project-description">{project.description}</p>
                {project.link && <span className="project-link-hint">Click to visit</span>}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Experience */}
      <section id="experience" className="experience">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Experience
        </motion.h2>

        <div className="experience-list">
          {experiences.map((exp, i) => (
            <motion.div
              key={exp.company}
              className="experience-item"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="exp-main">
                <span className="exp-company">{exp.company}</span>
                <span className="exp-role">{exp.role}</span>
              </div>
              <span className="exp-period">{exp.period}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* About & Contact */}
      <section className="about-contact">
        <motion.div
          className="about-section"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2>About Me</h2>
          <div className="about-text">
            <p>I build things that matter.</p>
            <p>I'm Sahil, a Software Engineer at Workday with a background in Computer Science and Finance from Boston College. I've co-founded startups, built products from zero to production, and worked across the stack from flight software to web applications.</p>
            <p>I care about clean code, thoughtful design, and building tools that help people. Whether it's an AI assistant for students, a platform for corporate events, or enterprise software at scale, I approach every project with the same mindset: make it work, make it elegant, make it useful.</p>
            <p>I'm always interested in new challenges and collaborations.</p>
            <p className="other-half-link">
              <a href="/art">Want to see my other half?</a>
            </p>
          </div>
        </motion.div>

        <motion.div
          className="contact-section"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h2>Let's Connect</h2>
          <p className="contact-subtitle">Open to new opportunities and collaborations</p>
          <div className="contact-links">
            <a href="mailto:sahil.saoji@gmail.com">Email</a>
            <a href="https://github.com/sahilsaoji" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href="https://linkedin.com/in/sahilsaoji" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          </div>
        </motion.div>
      </section>

      <footer>
        <p>© {new Date().getFullYear()} Sahil Saoji</p>
        <a href="/art" className="site-switch-link">View Art →</a>
        <button
          className="easter-egg-link"
          onClick={() => setShowThesis(!showThesis)}
        >
          hey thanks for scrolling this far down
        </button>
        {showThesis && (
          <motion.div
            className="artist-thesis"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.5 }}
          >
            <h3>Artist Thesis</h3>
            <p>
              I make work about people because that is where everything begins for me. Whether I am photographing someone, listening to their story, or building something they might one day use, I am always drawn to the human side of things. I care about emotions, personal histories, and the small details that reveal who someone really is.
            </p>
            <p>
              I know it sounds a little pretentious to call myself an artist instead of just a photographer, but I use that word because I like building full pieces, not only taking photos. I am interested in projects that hold a story together. I like creating work that has layers, texture, and structure, something that feels built rather than captured in a single moment.
            </p>
            <p>
              My background in front-end work shows up in how I think about art as well. I like building platforms, shaping experiences, and making things that support people in practical and emotional ways. I want my work to feel approachable and helpful, almost like a product someone can step into and understand themselves through.
            </p>
            <p>
              Overall, my practice lives at the intersection of storytelling, culture, and human connection. I am trying to make images and experiences that reflect where people come from, what they carry, and how they move forward.
            </p>
          </motion.div>
        )}
      </footer>
    </div>
  );
}
