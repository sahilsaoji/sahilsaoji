import { useState } from 'react';
import { motion } from 'framer-motion';
import './AnimatedImage.css';

const easeOut = [0.22, 1, 0.36, 1] as const;

interface AnimatedImageProps {
  src: string;
  alt: string;
  className?: string;
  onClick?: () => void;
  index?: number;
}

export function AnimatedImage({ src, alt, className = '', onClick, index = 0 }: AnimatedImageProps) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <motion.div
      className={`animated-image ${className}`}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.5,
        delay: index * 0.05,
        ease: easeOut
      }}
      whileHover={{ scale: 1.02 }}
      onClick={onClick}
    >
      {!loaded && !error && <div className="image-skeleton" />}
      <motion.img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
        initial={{ opacity: 0 }}
        animate={{ opacity: loaded ? 1 : 0 }}
        transition={{ duration: 0.4 }}
      />
      {error && <div className="image-error">Failed to load</div>}
    </motion.div>
  );
}
