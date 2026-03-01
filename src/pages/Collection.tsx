import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { collections } from '../data/photoData';
import { Lightbox } from '../components/Lightbox';
import { PageTransition } from '../components/PageTransition';
import { AnimatedImage } from '../components/AnimatedImage';
import './Collection.css';

const easeOut = [0.22, 1, 0.36, 1] as const;

export function Collection() {
  const { slug } = useParams<{ slug: string }>();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const collection = collections.find((c) => c.slug === slug);

  if (!collection) {
    return (
      <PageTransition>
        <div className="collection-page">
          <h1>Collection not found</h1>
          <Link to="/gallery">Back to Gallery</Link>
        </div>
      </PageTransition>
    );
  }

  const handlePrev = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex(
      lightboxIndex === 0 ? collection.photos.length - 1 : lightboxIndex - 1
    );
  };

  const handleNext = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex(
      lightboxIndex === collection.photos.length - 1 ? 0 : lightboxIndex + 1
    );
  };

  return (
    <PageTransition>
      <div className="collection-page">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link to="/art" className="back-link">
            <span className="back-arrow">←</span> Back to Art
          </Link>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: easeOut }}
        >
          {collection.name}
        </motion.h1>

        <motion.p
          className="photo-count"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {collection.photos.length} pieces
        </motion.p>

        <div className="photos-grid">
          {collection.photos.map((photo, index) => (
            <motion.div
              key={photo}
              className="photo-item"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.04, ease: easeOut }}
              onClick={() => setLightboxIndex(index)}
              whileHover={{ zIndex: 1 }}
            >
              <AnimatedImage
                src={`${import.meta.env.BASE_URL}photos/${photo}`}
                alt={`${collection.name} ${index + 1}`}
                index={index}
              />
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {lightboxIndex !== null && (
            <Lightbox
              photo={{
                filename: collection.photos[lightboxIndex],
                title: collection.name
              }}
              onClose={() => setLightboxIndex(null)}
              onPrev={handlePrev}
              onNext={handleNext}
            />
          )}
        </AnimatePresence>
      </div>
    </PageTransition>
  );
}
