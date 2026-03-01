import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { collections } from '../data/photoData';
import { PageTransition } from '../components/PageTransition';
import { AnimatedImage } from '../components/AnimatedImage';
import './Art.css';

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

export function Art() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp') navigate('/');
      if (e.key === 'ArrowLeft') navigate('/portfolio');
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate]);

  return (
    <PageTransition>
      <div className="art-page">
        <Link to="/" className="up-nav">
          <UpArrowPath />
          <span>Home</span>
        </Link>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: easeOut }}
        >
          Art
        </motion.h1>

        <motion.p
          className="art-intro"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Exploring color, light, identity, and human connection.
        </motion.p>

        <div className="collections-grid">
          {collections.map((collection, index) => (
            <motion.div
              key={collection.slug}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1, ease: easeOut }}
            >
              <Link to={`/art/${collection.slug}`} className="collection-card">
                <motion.div
                  className="collection-image"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.4, ease: easeOut }}
                >
                  <AnimatedImage
                    src={`${import.meta.env.BASE_URL}photos/${collection.cover}`}
                    alt={collection.name}
                    index={index}
                  />
                </motion.div>
                <motion.div
                  className="collection-info"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  <h2>{collection.name}</h2>
                  <p>{collection.photos.length} pieces</p>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </PageTransition>
  );
}
