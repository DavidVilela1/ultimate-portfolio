import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useLang } from '../context/LangContext';
import './Navbar.css';

const Navbar = () => {
  const { lang, toggle } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [location]);

  const links = [
    { to: '/', labelPT: 'Home', labelEN: 'Home' },
    { to: '/projects', labelPT: 'Projectos', labelEN: 'Projects' },
  ];

  const contactLabel = lang === 'pt' ? 'Contacto' : 'Contact';

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <Link to="/" className="nav-logo" data-cursor="home">
        DV<span>.</span>
      </Link>

      <div className="nav-links">
        {links.map(l => (
          <Link
            key={l.to}
            to={l.to}
            className={`nav-link ${location.pathname === l.to ? 'active' : ''}`}
            data-cursor=""
          >
            {lang === 'pt' ? l.labelPT : l.labelEN}
          </Link>
        ))}
        <a href="#contact" className="nav-link" data-cursor="">{contactLabel}</a>
        <button className="lang-toggle" onClick={toggle} data-cursor={lang === 'pt' ? 'EN' : 'PT'}>
          <span className={lang === 'pt' ? 'active' : ''}>PT</span>
          <span className="sep">/</span>
          <span className={lang === 'en' ? 'active' : ''}>EN</span>
        </button>
      </div>

      <button className={`burger ${menuOpen ? 'open' : ''}`} onClick={() => setMenuOpen(o => !o)} data-cursor="">
        <span /><span /><span />
      </button>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
          >
            {links.map((l, i) => (
              <motion.div
                key={l.to}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.07 }}
              >
                <Link to={l.to} className="mobile-link" data-cursor="">
                  {lang === 'pt' ? l.labelPT : l.labelEN}
                </Link>
              </motion.div>
            ))}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.14 }}>
              <a href="#contact" className="mobile-link" data-cursor="">{contactLabel}</a>
            </motion.div>
            <button className="lang-toggle mobile-lang" onClick={toggle}>
              <span className={lang === 'pt' ? 'active' : ''}>PT</span>
              <span className="sep">/</span>
              <span className={lang === 'en' ? 'active' : ''}>EN</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
