import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { CustomCursor } from './components/CustomCursor';
import { collections, standalonePhotos } from './data/photoData';
import { softwareProjects } from './data/softwareData';
import './App.css';

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

function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const [activeSection, setActiveSection] = useState('about');
  const [expandedCollection, setExpandedCollection] = useState<string | null>(null);
  const [showThesis, setShowThesis] = useState(false);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['about', 'software', 'portfolio'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="app" ref={containerRef}>
      <CustomCursor />

      {/* Navigation */}
      <nav className="nav">
        <span className="nav-logo">SS</span>
        <div className="nav-links">
          <button
            className={activeSection === 'about' ? 'active' : ''}
            onClick={() => scrollTo('about')}
          >
            About
          </button>
          <button
            className={activeSection === 'software' ? 'active' : ''}
            onClick={() => scrollTo('software')}
          >
            Front End Projects
          </button>
          <button
            className={activeSection === 'portfolio' ? 'active' : ''}
            onClick={() => scrollTo('portfolio')}
          >
            Art Portfolio
          </button>
        </div>
      </nav>

      {/* About / Hero */}
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
          <p className="hero-tagline">
            Engineer <span className="ampersand">&</span> Artist
          </p>
          <motion.p
            className="hero-bio"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Software Engineer at Workday.<br />
            Computer Science, Finance, and Studio Arts from Boston College.
          </motion.p>
        </motion.div>

        <ScatteredImage
          src={standalonePhotos[0]}
          style={{ top: '12%', right: '8%', width: '22vw', maxWidth: '320px' }}
          scrollYProgress={scrollYProgress}
          parallaxAmount={-120}
          rotation={3}
        />
        <ScatteredImage
          src={standalonePhotos[1]}
          style={{ bottom: '18%', left: '5%', width: '18vw', maxWidth: '260px' }}
          scrollYProgress={scrollYProgress}
          parallaxAmount={-80}
          rotation={-2}
        />
        <ScatteredImage
          src={standalonePhotos[2]}
          style={{ top: '35%', left: '12%', width: '12vw', maxWidth: '180px' }}
          scrollYProgress={scrollYProgress}
          parallaxAmount={-60}
          rotation={5}
        />
        <ScatteredImage
          src={standalonePhotos[3]}
          style={{ bottom: '30%', right: '15%', width: '14vw', maxWidth: '200px' }}
          scrollYProgress={scrollYProgress}
          parallaxAmount={-90}
          rotation={-4}
        />
        <ScatteredImage
          src={collections[0].cover}
          style={{ top: '60%', right: '5%', width: '10vw', maxWidth: '150px' }}
          scrollYProgress={scrollYProgress}
          parallaxAmount={-50}
          rotation={2}
        />
      </section>

      {/* Front End Projects */}
      <section id="software" className="software">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Front End Projects
        </motion.h2>

        <div className="projects-grid">
          {softwareProjects.map((project, i) => (
            <motion.div
              key={project.name}
              className="project-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              onClick={() => project.link && window.open(project.link, '_blank')}
              style={{ cursor: project.link ? 'pointer' : 'default' }}
            >
              <div className="project-image">
                <img
                  src={`${import.meta.env.BASE_URL}photos/${project.image}`}
                  alt={project.name}
                  loading="lazy"
                />
              </div>
              <div className="project-overlay">
                <h3 className="project-title">{project.name}</h3>
                <p className="project-description">{project.description}</p>
                {project.link && <span className="project-link-hint">Click to visit</span>}
              </div>
            </motion.div>
          ))}
        </div>

        <ScatteredImage
          src={standalonePhotos[4]}
          style={{ top: '5%', right: '3%', width: '14vw', maxWidth: '180px' }}
          scrollYProgress={scrollYProgress}
          parallaxAmount={-80}
          rotation={-3}
        />
        <ScatteredImage
          src={standalonePhotos[5]}
          style={{ bottom: '10%', right: '5%', width: '12vw', maxWidth: '160px' }}
          scrollYProgress={scrollYProgress}
          parallaxAmount={-60}
          rotation={4}
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

      {/* Contact */}
      <section className="contact">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2>Let's connect</h2>
          <p className="contact-subtitle">Love to chat about building, art, or if you just want me to take your picture</p>
          <div className="contact-links">
            <a href="mailto:sahil.saoji@gmail.com">Email</a>
            <a href="https://github.com/sahilsaoji" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href="https://linkedin.com/in/sahilsaoji" target="_blank" rel="noopener noreferrer">LinkedIn</a>
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

export default App;
