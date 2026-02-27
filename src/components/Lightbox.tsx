import { useEffect } from 'react';
import { motion } from 'framer-motion';
import './Lightbox.css';

interface LightboxProps {
  photo: {
    filename: string;
    title: string;
  };
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export function Lightbox({ photo, onClose, onPrev, onNext }: LightboxProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose, onPrev, onNext]);

  return (
    <motion.div
      className="lightbox"
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.button
        className="lightbox-close"
        onClick={onClose}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        ×
      </motion.button>

      <motion.button
        className="lightbox-nav lightbox-prev"
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        whileHover={{ scale: 1.1, x: -5 }}
        whileTap={{ scale: 0.95 }}
      >
        ‹
      </motion.button>

      <motion.div
        className="lightbox-content"
        onClick={(e) => e.stopPropagation()}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.img
          key={photo.filename}
          src={`/photos/${photo.filename}`}
          alt={photo.title}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        />
      </motion.div>

      <motion.button
        className="lightbox-nav lightbox-next"
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        whileHover={{ scale: 1.1, x: 5 }}
        whileTap={{ scale: 0.95 }}
      >
        ›
      </motion.button>

      <div className="lightbox-counter">
        Press ← → to navigate, ESC to close
      </div>
    </motion.div>
  );
}
