import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Nav } from './components/Nav';
import { CustomCursor } from './components/CustomCursor';
import { Home } from './pages/Home';
import { Gallery } from './pages/Gallery';
import { Collection } from './pages/Collection';
import { About } from './pages/About';
import './App.css';

function App() {
  const location = useLocation();

  return (
    <div className="app">
      <CustomCursor />
      <Nav />
      <main>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/gallery/:slug" element={<Collection />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </AnimatePresence>
      </main>
      <footer className="footer">
        <p>© {new Date().getFullYear()} Sahil Saoji</p>
      </footer>
    </div>
  );
}

export default App;
