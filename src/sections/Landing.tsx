import { motion } from 'framer-motion';
import './Landing.css';

const easeOut = [0.22, 1, 0.36, 1] as const;

interface LandingSectionProps {
  onNavigate: (section: 'home' | 'portfolio' | 'art') => void;
}

const LeftArrowPath = () => (
  <svg viewBox="0 0 200 100" className="curved-arrow">
    <motion.path
      d="M 180 10 Q 100 10, 80 50 Q 60 90, 20 90"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 1.2, delay: 0.8, ease: easeOut }}
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
      transition={{ duration: 0.3, delay: 1.8 }}
    />
  </svg>
);

const RightArrowPath = () => (
  <svg viewBox="0 0 200 100" className="curved-arrow">
    <motion.path
      d="M 20 10 Q 100 10, 120 50 Q 140 90, 180 90"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 1.2, delay: 0.8, ease: easeOut }}
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
      transition={{ duration: 0.3, delay: 1.8 }}
    />
  </svg>
);

export function LandingSection({ onNavigate }: LandingSectionProps) {
  return (
    <div className="landing">
      <div className="landing-content">
        <motion.div
          className="landing-image"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: easeOut }}
        >
          <img src={`${import.meta.env.BASE_URL}photos/Glasses.jpg`} alt="Sahil Saoji" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: easeOut }}
        >
          Sahil Saoji
        </motion.h1>

        <motion.p
          className="landing-tagline"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Engineer & Artist
        </motion.p>

        <motion.p
          className="landing-bio"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          Boston College · CS + Finance + Studio Arts
        </motion.p>

        <motion.div
          className="landing-socials"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <a href="https://github.com/sahilsaoji" target="_blank" rel="noopener noreferrer">GitHub</a>
          <span>·</span>
          <a href="https://linkedin.com/in/sahilsaoji" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <span>·</span>
          <a href="mailto:sahil.saoji@gmail.com">Email</a>
        </motion.div>

        <div className="navigation-paths">
          <motion.button
            className="path-zone left-zone"
            onClick={() => onNavigate('portfolio')}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            whileHover={{ x: -10, y: 5 }}
          >
            <LeftArrowPath />
            <div className="path-label">
              <span className="label-title">Portfolio</span>
              <span className="label-sub">Software</span>
            </div>
          </motion.button>

          <motion.button
            className="path-zone right-zone"
            onClick={() => onNavigate('art')}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            whileHover={{ x: 10, y: 5 }}
          >
            <RightArrowPath />
            <div className="path-label">
              <span className="label-title">Art</span>
              <span className="label-sub">Visual</span>
            </div>
          </motion.button>
        </div>

        <motion.p
          className="nav-hint"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          scroll or use arrow keys
        </motion.p>
      </div>
    </div>
  );
}
