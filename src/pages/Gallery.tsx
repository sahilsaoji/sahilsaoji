import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { collections } from '../data/photoData';
import { PageTransition } from '../components/PageTransition';
import { AnimatedImage } from '../components/AnimatedImage';
import './Gallery.css';

const easeOut = [0.22, 1, 0.36, 1] as const;

export function Gallery() {
  return (
    <PageTransition>
      <div className="gallery-page">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: easeOut }}
        >
          Gallery
        </motion.h1>
        <div className="collections-grid">
          {collections.map((collection, index) => (
            <motion.div
              key={collection.slug}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1, ease: easeOut }}
            >
              <Link to={`/gallery/${collection.slug}`} className="collection-card">
                <motion.div
                  className="collection-image"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.4, ease: easeOut }}
                >
                  <AnimatedImage
                    src={`/photos/${collection.cover}`}
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
                  <p>{collection.photos.length} photos</p>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </PageTransition>
  );
}
