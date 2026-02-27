import { motion } from 'framer-motion';
import { PageTransition } from '../components/PageTransition';
import './About.css';

export function About() {
  return (
    <PageTransition>
      <div className="about-page">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          About
        </motion.h1>

        <div className="about-content">
          <motion.div
            className="about-image"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <img src={`${import.meta.env.BASE_URL}photos/Glasses.jpg`} alt="Sahil Saoji" />
          </motion.div>

          <motion.div
            className="about-text"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2>Sahil Saoji</h2>
            <p>
              Photography has been my way of capturing moments and telling stories
              through a visual medium. I'm drawn to exploring color, light, and
              human connection in my work.
            </p>
            <p>
              My collections span various themes from portraits and landscapes to
              conceptual projects like "Bloody Moment" and "South Asian Hair" that
              explore identity and culture.
            </p>
            <p>
              When I'm not behind the camera, I work as a software engineer
              building products with clean systems and human-centered design.
            </p>

            <motion.div
              className="about-links"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <a
                href="https://github.com/sahilsaoji"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
              >
                <span className="link-text">GitHub</span>
                <span className="link-arrow">→</span>
              </a>
              <a
                href="https://linkedin.com/in/sahilsaoji"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
              >
                <span className="link-text">LinkedIn</span>
                <span className="link-arrow">→</span>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
}
