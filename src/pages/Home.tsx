import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { collections, standalonePhotos } from '../data/photoData';
import { PageTransition } from '../components/PageTransition';
import { AnimatedImage } from '../components/AnimatedImage';
import './Home.css';

const easeOut = [0.22, 1, 0.36, 1] as const;

export function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <PageTransition>
      <div className="home">
        <motion.section
          ref={heroRef}
          className="hero"
          style={{ y: heroY, opacity: heroOpacity, scale: heroScale }}
        >
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: easeOut }}
          >
            Sahil Saoji
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: easeOut }}
          >
            Photography
          </motion.p>
          <motion.div
            className="scroll-indicator"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            <motion.span
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              ↓
            </motion.span>
          </motion.div>
        </motion.section>

        <section className="featured">
          <motion.div
            className="masonry-grid"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ staggerChildren: 0.08, delayChildren: 0.2 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            {collections.map((collection, index) => (
              <motion.div
                key={collection.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.08, ease: easeOut }}
                viewport={{ once: true }}
              >
                <Link
                  to={`/gallery/${collection.slug}`}
                  className="grid-item collection-preview"
                >
                  <AnimatedImage
                    src={`${import.meta.env.BASE_URL}photos/${collection.cover}`}
                    alt={collection.name}
                    index={index}
                  />
                  <motion.div
                    className="item-overlay"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <span className="item-title">{collection.name}</span>
                    <span className="item-count">{collection.photos.length} photos</span>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
            {standalonePhotos.map((photo, index) => (
              <motion.div
                key={photo}
                className="grid-item standalone"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: (collections.length + index) * 0.08, ease: easeOut }}
                viewport={{ once: true }}
              >
                <AnimatedImage
                  src={`${import.meta.env.BASE_URL}photos/${photo}`}
                  alt={photo.replace(/\.[^/.]+$/, '')}
                  index={collections.length + index}
                />
              </motion.div>
            ))}
          </motion.div>
        </section>
      </div>
    </PageTransition>
  );
}
