import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Link } from 'react-router-dom';
import { collections, standalonePhotos } from '../data/photoData';
import './ArtSite.css';

function FloatingText({ children, scrollYProgress, offset = 0, direction = 1 }: {
  children: React.ReactNode;
  scrollYProgress: any;
  offset?: number;
  direction?: number;
}) {
  const y = useTransform(scrollYProgress, [0, 1], [offset, offset + direction * 50]);
  const smoothY = useSpring(y, { stiffness: 100, damping: 30 });

  return (
    <motion.span style={{ y: smoothY, display: 'inline-block' }}>
      {children}
    </motion.span>
  );
}

function ScatteredImage({ src, style, scrollYProgress, parallaxAmount = -100, rotation = 0 }: {
  src: string;
  style: React.CSSProperties;
  scrollYProgress: any;
  parallaxAmount?: number;
  rotation?: number;
}) {
  const y = useTransform(scrollYProgress, [0, 1], [0, parallaxAmount]);
  const smoothY = useSpring(y, { stiffness: 30, damping: 15, mass: 1.2 });
  const rotate = useTransform(scrollYProgress, [0, 1], [0, rotation]);
  const smoothRotate = useSpring(rotate, { stiffness: 30, damping: 15 });

  return (
    <motion.div
      className="scattered-image"
      style={{ ...style, y: smoothY, rotate: smoothRotate }}
      initial={{ opacity: 0, scale: 0.85, y: 40 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.8,
        type: "spring",
        stiffness: 80,
        damping: 12
      }}
      whileHover={{ scale: 1.03, transition: { duration: 0.3 } }}
    >
      <img src={`${import.meta.env.BASE_URL}photos/${src}`} alt="" loading="lazy" />
    </motion.div>
  );
}

export default function ArtSite() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const [expandedCollection, setExpandedCollection] = useState<string | null>(null);
  const [showThesis, setShowThesis] = useState(false);

  useEffect(() => {
    document.title = 'Sahil Saoji | Art';
  }, []);

  return (
    <div className="art-site" ref={containerRef}>
      {/* Hero */}
      <section id="about" className="hero">
        <motion.div
          className="hero-content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h1>
            <FloatingText scrollYProgress={scrollYProgress} offset={0} direction={-1}>
              Sahil
            </FloatingText>
            <br />
            <FloatingText scrollYProgress={scrollYProgress} offset={10} direction={1}>
              Saoji
            </FloatingText>
          </h1>
          <p className="hero-tagline">Art</p>
        </motion.div>

        <ScatteredImage
          src={standalonePhotos[0]}
          style={{ top: '5%', right: '3%', width: '18vw', maxWidth: '260px' }}
          scrollYProgress={scrollYProgress}
          parallaxAmount={-120}
          rotation={3}
        />
        <ScatteredImage
          src={standalonePhotos[1]}
          style={{ bottom: '5%', left: '2%', width: '16vw', maxWidth: '230px' }}
          scrollYProgress={scrollYProgress}
          parallaxAmount={-80}
          rotation={-2}
        />
        <ScatteredImage
          src={standalonePhotos[2]}
          style={{ top: '20%', left: '5%', width: '12vw', maxWidth: '170px' }}
          scrollYProgress={scrollYProgress}
          parallaxAmount={-60}
          rotation={5}
        />
        <ScatteredImage
          src={standalonePhotos[3]}
          style={{ bottom: '25%', right: '2%', width: '14vw', maxWidth: '190px' }}
          scrollYProgress={scrollYProgress}
          parallaxAmount={-90}
          rotation={-4}
        />
        <ScatteredImage
          src={standalonePhotos[4]}
          style={{ top: '50%', right: '5%', width: '10vw', maxWidth: '140px' }}
          scrollYProgress={scrollYProgress}
          parallaxAmount={-50}
          rotation={2}
        />
        <ScatteredImage
          src={standalonePhotos[5]}
          style={{ top: '38%', left: '3%', width: '11vw', maxWidth: '150px' }}
          scrollYProgress={scrollYProgress}
          parallaxAmount={-70}
          rotation={-3}
        />
        <ScatteredImage
          src={collections[0].cover}
          style={{ bottom: '45%', right: '8%', width: '9vw', maxWidth: '130px' }}
          scrollYProgress={scrollYProgress}
          parallaxAmount={-40}
          rotation={4}
        />
        <ScatteredImage
          src={collections[1].cover}
          style={{ top: '68%', left: '8%', width: '10vw', maxWidth: '140px' }}
          scrollYProgress={scrollYProgress}
          parallaxAmount={-55}
          rotation={-2}
        />
      </section>

      {/* Art Portfolio */}
      <section id="portfolio" className="portfolio">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Art Portfolio
        </motion.h2>

        <div className="collections-list">
          {collections.map((collection) => (
            <motion.div
              key={collection.slug}
              className={`collection-folder ${expandedCollection === collection.slug ? 'expanded' : ''}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <button
                className="collection-header"
                onClick={() => setExpandedCollection(
                  expandedCollection === collection.slug ? null : collection.slug
                )}
              >
                <span className="collection-name">{collection.name}</span>
                <span className="collection-count">{collection.photos.length}</span>
                <span className="collection-toggle">
                  {expandedCollection === collection.slug ? '−' : '+'}
                </span>
              </button>

              {expandedCollection === collection.slug && (
                <motion.div
                  className="collection-grid"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  transition={{ duration: 0.4 }}
                >
                  {collection.photos.map((photo, i) => (
                    <motion.div
                      key={photo}
                      className="gallery-item"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: i * 0.05 }}
                    >
                      <img
                        src={`${import.meta.env.BASE_URL}photos/${photo}`}
                        alt={`${collection.name} ${i + 1}`}
                        loading="lazy"
                      />
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        <ScatteredImage
          src={collections[3].cover}
          style={{ top: '5%', right: '3%', width: '18vw', maxWidth: '250px' }}
          scrollYProgress={scrollYProgress}
          parallaxAmount={-80}
          rotation={-4}
        />
        <ScatteredImage
          src={collections[4].cover}
          style={{ top: '40%', right: '8%', width: '12vw', maxWidth: '170px' }}
          scrollYProgress={scrollYProgress}
          parallaxAmount={-60}
          rotation={5}
        />
        <ScatteredImage
          src={standalonePhotos[6]}
          style={{ bottom: '10%', right: '5%', width: '15vw', maxWidth: '210px' }}
          scrollYProgress={scrollYProgress}
          parallaxAmount={-70}
          rotation={-3}
        />
      </section>

      {/* About & Contact */}
      <section className="about-contact">
        <motion.div
          className="about-section"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2>About Me</h2>
          <div className="about-text">
            <p>I make work about people, because that's where everything begins for me.</p>
            <p>I'm Sahil, a photographer and artist with a Studio Art minor from Boston College. I've shot proms, headshots, club photos, studio portraits, and built installations within larger exhibits. Every project comes back to the same thing: the emotions, personal histories, and small details that quietly reveal who someone is.</p>
            <p>I think of myself as an artist rather than just a photographer because I'm drawn to work that feels built. Pieces with layers, texture, and structure that hold a story together. My background in front-end development shapes this too. I think about art the way I think about products: as experiences people can step into and understand themselves through.</p>
            <p>I'm always open to new work. If something's on your mind, let's make it together.</p>
            <p className="other-half-link">
              <a href="/projects">Want to see my other half?</a>
            </p>
          </div>
        </motion.div>

        <motion.div
          className="contact-section"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h2>Let's Connect</h2>
          <p className="contact-subtitle">Based in the Bay Area. Open to taking portraits.</p>
          <div className="contact-links">
            <a href="mailto:sahil.saoji@gmail.com">Email</a>
            <a href="https://www.instagram.com/saojipics/" target="_blank" rel="noopener noreferrer">Instagram</a>
          </div>
        </motion.div>

        <ScatteredImage
          src={collections[5].cover}
          style={{ top: '15%', left: '8%', width: '14vw', maxWidth: '190px' }}
          scrollYProgress={scrollYProgress}
          parallaxAmount={-50}
          rotation={4}
        />
        <ScatteredImage
          src={collections[6].cover}
          style={{ bottom: '20%', right: '10%', width: '12vw', maxWidth: '160px' }}
          scrollYProgress={scrollYProgress}
          parallaxAmount={-40}
          rotation={-3}
        />
      </section>

      <footer>
        <p>© {new Date().getFullYear()} Sahil Saoji</p>
        <Link to="/projects" className="site-switch-link">View Projects →</Link>
        <button
          className="easter-egg-link"
          onClick={() => setShowThesis(!showThesis)}
        >
          hey thanks for scrolling this far down
        </button>
        {showThesis && (
          <motion.div
            className="artist-thesis"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.5 }}
          >
            <h3>Artist Thesis</h3>
            <p>
              I make work about people because that is where everything begins for me. Whether I am photographing someone, listening to their story, or building something they might one day use, I am always drawn to the human side of things. I care about emotions, personal histories, and the small details that reveal who someone really is.
            </p>
            <p>
              I know it sounds a little pretentious to call myself an artist instead of just a photographer, but I use that word because I like building full pieces, not only taking photos. I am interested in projects that hold a story together. I like creating work that has layers, texture, and structure, something that feels built rather than captured in a single moment.
            </p>
            <p>
              My background in front-end work shows up in how I think about art as well. I like building platforms, shaping experiences, and making things that support people in practical and emotional ways. I want my work to feel approachable and helpful, almost like a product someone can step into and understand themselves through.
            </p>
            <p>
              Overall, my practice lives at the intersection of storytelling, culture, and human connection. I am trying to make images and experiences that reflect where people come from, what they carry, and how they move forward.
            </p>
          </motion.div>
        )}
      </footer>
    </div>
  );
}
