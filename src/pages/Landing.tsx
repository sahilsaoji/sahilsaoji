import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { PageTransition } from '../components/PageTransition';
import './Landing.css';

const easeOut = [0.22, 1, 0.36, 1] as const;

// SVG paths for hand-drawn curved arrows
const LeftArrowPath = () => (
  <svg viewBox="0 0 200 100" className="curved-arrow left-arrow">
    <motion.path
      d="M 180 10 Q 100 10, 80 50 Q 60 90, 20 90"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 1, delay: 1.2, ease: easeOut }}
    />
    <motion.path
      d="M 35 75 L 20 90 L 40 95"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, delay: 2 }}
    />
  </svg>
);

const RightArrowPath = () => (
  <svg viewBox="0 0 200 100" className="curved-arrow right-arrow">
    <motion.path
      d="M 20 10 Q 100 10, 120 50 Q 140 90, 180 90"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 1, delay: 1.2, ease: easeOut }}
    />
    <motion.path
      d="M 165 75 L 180 90 L 160 95"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, delay: 2 }}
    />
  </svg>
);

export function Landing() {
  const navigate = useNavigate();

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') navigate('/portfolio');
      if (e.key === 'ArrowRight') navigate('/art');
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate]);

  return (
    <PageTransition>
      <div className="landing">
        <div className="landing-content">
          <motion.div
            className="landing-intro"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: easeOut }}
          >
            <motion.div
              className="landing-image"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2, ease: easeOut }}
            >
              <img src={`${import.meta.env.BASE_URL}photos/Glasses.jpg`} alt="Sahil Saoji" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: easeOut }}
            >
              Sahil Saoji
            </motion.h1>

            <motion.p
              className="landing-tagline"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              Engineer & Artist
            </motion.p>

            <motion.p
              className="landing-bio"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Boston College alum with a degree in Computer Science, minors in Finance and Studio Arts.
              Building products with human-centered design and telling stories through visual art.
            </motion.p>

            <motion.div
              className="landing-socials"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <a href="https://github.com/sahilsaoji" target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
              <span className="social-divider">·</span>
              <a href="https://linkedin.com/in/sahilsaoji" target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
              <span className="social-divider">·</span>
              <a href="mailto:sahil.saoji@gmail.com">
                Email
              </a>
            </motion.div>
          </motion.div>

          <div className="navigation-paths">
            <Link to="/portfolio" className="path-zone left-zone">
              <LeftArrowPath />
              <motion.div
                className="path-label"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 1.5 }}
              >
                <span className="label-title">Portfolio</span>
                <span className="label-sub">Software Engineering</span>
              </motion.div>
            </Link>

            <Link to="/art" className="path-zone right-zone">
              <RightArrowPath />
              <motion.div
                className="path-label"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 1.5 }}
              >
                <span className="label-title">Art</span>
                <span className="label-sub">Visual Works</span>
              </motion.div>
            </Link>
          </div>

          <motion.p
            className="nav-hint"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.2 }}
          >
            use ← → arrows or click to navigate
          </motion.p>
        </div>
      </div>
    </PageTransition>
  );
}
