import { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useLang } from '../context/LangContext';
import { useTypewriter } from '../hooks/useTypewriter';
import { projects } from '../data/projects';
import ProjectCard from '../components/ProjectCard';
import './Home.css';

/* ---------- Magnetic Button ---------- */
const MagBtn = ({ children, href, to, className, onClick }: any) => {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left - r.width / 2;
    const y = e.clientY - r.top - r.height / 2;
    el.style.transform = `translate(${x * 0.28}px, ${y * 0.28}px)`;
  };
  const onLeave = () => { if (ref.current) ref.current.style.transform = 'translate(0,0)'; };

  const inner = (
    <div ref={ref} className={`mag-btn ${className || ''}`}
      onMouseMove={onMove} onMouseLeave={onLeave}
    >{children}</div>
  );
  if (href) return <a href={href} target="_blank" rel="noopener noreferrer" data-cursor="">{inner}</a>;
  if (to) return <Link to={to} data-cursor="">{inner}</Link>;
  return <button onClick={onClick} data-cursor="" style={{ background: 'none', border: 'none' }}>{inner}</button>;
};

/* ---------- Particle background ---------- */
const ParticleBg = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    let W = canvas.width = window.innerWidth;
    let H = canvas.height = window.innerHeight;
    const MOUSE = { x: W / 2, y: H / 2 };

    const onResize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    const onMouse = (e: MouseEvent) => { MOUSE.x = e.clientX; MOUSE.y = e.clientY; };
    window.addEventListener('resize', onResize);
    window.addEventListener('mousemove', onMouse);

    const dots = Array.from({ length: 70 }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 1.4 + 0.4,
    }));

    let raf: number;
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      dots.forEach(d => {
        d.x += d.vx + (MOUSE.x - d.x) * 0.00008;
        d.y += d.vy + (MOUSE.y - d.y) * 0.00008;
        if (d.x < 0) d.x = W; if (d.x > W) d.x = 0;
        if (d.y < 0) d.y = H; if (d.y > H) d.y = 0;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(245,166,35,0.35)';
        ctx.fill();
      });
      dots.forEach((a, i) => {
        dots.slice(i + 1).forEach(b => {
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist < 130) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(245,166,35,${0.08 * (1 - dist / 130)})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        });
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMouse);
    };
  }, []);
  return <canvas ref={canvasRef} className="particle-canvas" />;
};

/* ---------- Skill chip ---------- */
const chips = ['HTML','CSS','JavaScript','TypeScript','React','Next.js','Node.js','TailwindCSS','Git','Figma','UI/UX','Vite'];

/* ---------- HOME PAGE ---------- */
const Home = () => {
  const { lang } = useLang();

  const rolesPT = ['Web Developer', 'Frontend Developer', 'UI/UX Enthusiast', 'React Developer'];
  const rolesEN = ['Web Developer', 'Frontend Developer', 'UI/UX Enthusiast', 'React Developer'];
  const typed = useTypewriter(lang === 'pt' ? rolesPT : rolesEN, 65, 1800);

  const featured = projects.filter(p => p.featured);

  /* parallax hero */
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.4], [0, -80]);

  /* about in-view */
  const aboutRef = useRef(null);
  const aboutInView = useInView(aboutRef, { once: true, margin: '-80px' });

  /* magnetic area for about section */
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);
  const onCardMove = (e: React.MouseEvent) => {
    const el = cardRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width - 0.5) * 12;
    const y = ((e.clientY - r.top) / r.height - 0.5) * -12;
    setTilt({ x, y });
  };
  const onCardLeave = () => setTilt({ x: 0, y: 0 });

  return (
    <div className="home">
      {/* ===== HERO ===== */}
      <section className="hero">
        <ParticleBg />
        <motion.div className="hero-content" style={{ y: heroY }}>
          <motion.p
            className="hero-pre"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <span className="accent-dot" />
            {lang === 'pt' ? 'Olá, eu sou' : "Hey, I'm"}
          </motion.p>

          <motion.h1
            className="hero-name"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.7, ease: [0.16,1,0.3,1] }}
          >
            David<br /><span>Vilela</span>
          </motion.h1>

          <motion.div
            className="hero-role"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <span className="role-text">{typed}</span>
            <span className="caret" />
          </motion.div>

          <motion.p
            className="hero-sub"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            {lang === 'pt'
              ? 'Focado em Frontend Development, UI/UX e experiências web modernas. Portugal 🇵🇹'
              : 'Focused on Frontend Development, UI/UX and modern web experiences. Portugal 🇵🇹'}
          </motion.p>

          <motion.div
            className="hero-ctas"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.05 }}
          >
            <MagBtn to="/projects" className="btn-primary">
              {lang === 'pt' ? 'Ver Projectos' : 'View Projects'}
              <span className="btn-arrow">→</span>
            </MagBtn>
            <MagBtn href="mailto:vileladavid112@gmail.com" className="btn-secondary">
              {lang === 'pt' ? 'Contactar' : 'Contact Me'}
            </MagBtn>
          </motion.div>
        </motion.div>

        <div className="hero-scroll-indicator">
          <div className="scroll-line" />
          <span>{lang === 'pt' ? 'scroll' : 'scroll'}</span>
        </div>
      </section>

      {/* ===== ABOUT ===== */}
      <section className="about" ref={aboutRef}>
        <div className="section-label">
          <span className="section-num">01</span>
          <span>{lang === 'pt' ? 'Sobre mim' : 'About me'}</span>
        </div>

        <div className="about-grid">
          <motion.div
            className="about-text"
            initial={{ opacity: 0, x: -40 }}
            animate={aboutInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16,1,0.3,1] }}
          >
            <h2 className="section-title">
              {lang === 'pt' ? (
                <>Web Developer<br /><span>Júnior</span></>
              ) : (
                <>Junior<br /><span>Web Developer</span></>
              )}
            </h2>
            <p className="about-body">
              {lang === 'pt'
                ? 'Sou um desenvolvedor web júnior apaixonado por criar interfaces modernas, responsivas e funcionais. Tenho trabalhado em websites e landing pages para empresas e projectos reais, com foco em design limpo, performance e experiência do utilizador.'
                : "I'm a junior web developer passionate about building modern, responsive and functional interfaces. I've worked on websites and landing pages for real companies and projects, focusing on clean design, performance and user experience."}
            </p>
            <p className="about-body">
              {lang === 'pt'
                ? 'Atualmente a aprofundar conhecimentos em React, TypeScript, Next.js e Arquitectura Frontend, com o objectivo de evoluir para full-stack development.'
                : 'Currently deepening my knowledge in React, TypeScript, Next.js and Frontend Architecture, aiming to grow into full-stack development.'}
            </p>
            <div className="currently">
              <span className="status-dot" />
              <span>{lang === 'pt' ? 'Disponível para projectos' : 'Available for projects'}</span>
            </div>
          </motion.div>

          <motion.div
            className="about-skills-card"
            ref={cardRef}
            style={{ transform: `perspective(900px) rotateY(${tilt.x}deg) rotateX(${tilt.y}deg)` }}
            onMouseMove={onCardMove}
            onMouseLeave={onCardLeave}
            initial={{ opacity: 0, x: 40 }}
            animate={aboutInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16,1,0.3,1] }}
          >
            <div className="card-header">
              <span className="card-dot red" /><span className="card-dot yellow" /><span className="card-dot green" />
              <span className="card-file">skills.ts</span>
            </div>
            <div className="chips-wrap">
              {chips.map((c, i) => (
                <motion.span
                  key={c}
                  className="chip"
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={aboutInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.3 + i * 0.04 }}
                  whileHover={{ scale: 1.08, y: -2 }}
                >{c}</motion.span>
              ))}
            </div>
            <div className="card-footer">
              <span className="mono-text">const dev = <span className="acc">"David Vilela"</span>;</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== FEATURED PROJECTS ===== */}
      <section className="featured">
        <div className="section-label">
          <span className="section-num">02</span>
          <span>{lang === 'pt' ? 'Projectos em Destaque' : 'Featured Projects'}</span>
        </div>
        <h2 className="section-title">
          {lang === 'pt' ? <>Selected<br /><span>Work</span></> : <>Selected<br /><span>Work</span></>}
        </h2>

        <div className="featured-grid">
          {featured.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} />
          ))}
        </div>

        <div className="see-all-wrap">
          <MagBtn to="/projects" className="btn-outline">
            {lang === 'pt' ? 'Ver todos os projectos' : 'See all projects'}
            <span className="btn-arrow">→</span>
          </MagBtn>
        </div>
      </section>

      {/* ===== CONTACT ===== */}
      <section className="contact" id="contact">
        <div className="section-label">
          <span className="section-num">03</span>
          <span>{lang === 'pt' ? 'Contacto' : 'Contact'}</span>
        </div>
        <motion.div
          className="contact-inner"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.16,1,0.3,1] }}
        >
          <h2 className="contact-title">
            {lang === 'pt' ? "Vamos trabalhar\njuntos?" : "Let's work\ntogether?"}
          </h2>
          <p className="contact-sub">
            {lang === 'pt'
              ? 'Estou disponível para freelance, colaborações ou oportunidades de emprego.'
              : "I'm open to freelance, collaborations or job opportunities."}
          </p>

          <div className="contact-links">
            <MagBtn href="mailto:vileladavid112@gmail.com" className="contact-btn" data-cursor="EMAIL">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16v16H4z" rx="2" /><polyline points="22,6 12,13 2,6" /></svg>
              vileladavid112@gmail.com
            </MagBtn>
            <MagBtn href="https://www.linkedin.com/in/davidvilelawebdev/" className="contact-btn">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
              LinkedIn
            </MagBtn>
            <MagBtn href="https://github.com/DavidVilela1" className="contact-btn">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"/></svg>
              GitHub
            </MagBtn>
          </div>
        </motion.div>
        <div className="footer-line">
          <span>© 2026 David Vilela</span>
          <span className="mono-small">Based in .pt | Available in .com</span>
        </div>
      </section>
    </div>
  );
};

export default Home;
