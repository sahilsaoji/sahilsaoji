import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { collections } from '../data/photoData';
import { Lightbox } from '../components/Lightbox';
import './Art.css';

const easeOut = [0.22, 1, 0.36, 1] as const;

interface ArtSectionProps {
  onNavigate: (section: 'home' | 'portfolio' | 'art') => void;
  isActive: boolean;
}

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

export function ArtSection({ onNavigate, isActive }: ArtSectionProps) {
  const [selectedCollection, setSelectedCollection] = useState<number | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const currentCollection = selectedCollection !== null ? collections[selectedCollection] : null;

  return (
    <div className="art-section">
      <motion.button
        className="back-nav"
        onClick={() => onNavigate('home')}
        whileHover={{ y: -5 }}
      >
        <UpArrow />
        <span>Home</span>
      </motion.button>

      <div className="art-content">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isActive ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: easeOut }}
        >
          Art
        </motion.h2>

        <motion.p
          className="art-intro"
          initial={{ opacity: 0 }}
          animate={isActive ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Color, light, identity, and connection
        </motion.p>

        <AnimatePresence mode="wait">
          {selectedCollection === null ? (
            <motion.div
              key="grid"
              className="collections-grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {collections.map((collection, index) => (
                <motion.button
                  key={collection.slug}
                  className="collection-card"
                  onClick={() => setSelectedCollection(index)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isActive ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.15 + index * 0.06, ease: easeOut }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="collection-image">
                    <img
                      src={`${import.meta.env.BASE_URL}photos/${collection.cover}`}
                      alt={collection.name}
                      loading="lazy"
                    />
                  </div>
                  <div className="collection-info">
                    <span className="collection-name">{collection.name}</span>
                    <span className="collection-count">{collection.photos.length}</span>
                  </div>
                </motion.button>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="detail"
              className="collection-detail"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <button className="back-to-grid" onClick={() => setSelectedCollection(null)}>
                ← Back to collections
              </button>
              <h3>{currentCollection?.name}</h3>
              <div className="photos-grid">
                {currentCollection?.photos.map((photo, index) => (
                  <motion.button
                    key={photo}
                    className="photo-item"
                    onClick={() => setLightboxIndex(index)}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: index * 0.03 }}
                    whileHover={{ scale: 1.03 }}
                  >
                    <img
                      src={`${import.meta.env.BASE_URL}photos/${photo}`}
                      alt={`${currentCollection?.name} ${index + 1}`}
                      loading="lazy"
                    />
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {lightboxIndex !== null && currentCollection && (
          <Lightbox
            photo={{
              filename: currentCollection.photos[lightboxIndex],
              title: currentCollection.name
            }}
            onClose={() => setLightboxIndex(null)}
            onPrev={() => setLightboxIndex(
              lightboxIndex === 0 ? currentCollection.photos.length - 1 : lightboxIndex - 1
            )}
            onNext={() => setLightboxIndex(
              lightboxIndex === currentCollection.photos.length - 1 ? 0 : lightboxIndex + 1
            )}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
