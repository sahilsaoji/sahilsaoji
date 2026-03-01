import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Nav.css';

export function Nav() {
  return (
    <motion.nav
      className="nav"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <NavLink to="/" className="nav-logo">
        <motion.span
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          SS
        </motion.span>
      </NavLink>
      <div className="nav-links">
        <NavLink to="/" end className="nav-link">
          <span>Home</span>
        </NavLink>
        <NavLink to="/portfolio" className="nav-link">
          <span>Portfolio</span>
        </NavLink>
        <NavLink to="/art" className="nav-link">
          <span>Art</span>
        </NavLink>
      </div>
    </motion.nav>
  );
}
