import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useLang } from '../context/LangContext';
import { projects } from '../data/projects';
import type { Project } from '../data/projects';
import './Projects.css';

/* Modal */
const Modal = ({ project, onClose }: { project: Project; onClose: () => void }) => {
  const { lang } = useLang();
  const title = lang === 'pt' ? project.titlePT : project.titleEN;
  const desc = lang === 'pt' ? project.descriptionPT : project.descriptionEN;

  return (
    <motion.div
      className="modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="modal-box"
        initial={{ opacity: 0, scale: 0.92, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 40 }}
        transition={{ duration: 0.35, ease: [0.16,1,0.3,1] }}
        onClick={e => e.stopPropagation()}
      >
        <button className="modal-close" onClick={onClose} data-cursor="">✕</button>

        <div className="modal-top">
          <span className="pc-category">{project.category}</span>
          {project.status === 'wip' && (
            <span className="pc-wip">{lang === 'pt' ? 'Em desenvolvimento' : 'Work In Progress'}</span>
          )}
        </div>

        <h2 className="modal-title">{title}</h2>
        <p className="modal-desc">{desc}</p>

        <div className="modal-tech">
          <span className="modal-label">{lang === 'pt' ? 'Tecnologias' : 'Technologies'}</span>
          <div className="modal-chips">
            {project.tech.map(t => (
              <span key={t} className="chip">{t}</span>
            ))}
          </div>
        </div>

        <div className="modal-actions">
          <a href={project.deploy} target="_blank" rel="noopener noreferrer"
             className="pc-link primary" data-cursor="LIVE">
            {lang === 'pt' ? 'Ver ao vivo' : 'Live preview'} ↗
          </a>
          <a href={project.repo} target="_blank" rel="noopener noreferrer"
             className="pc-link secondary" data-cursor="CODE">
            {lang === 'pt' ? 'Ver código' : 'View code'} ↗
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
};

/* Project row */
const ProjectRow = ({ project, index, onClick }: { project: Project; index: number; onClick: () => void }) => {
  const { lang } = useLang();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const title = lang === 'pt' ? project.titlePT : project.titleEN;

  return (
    <motion.div
      ref={ref}
      className="project-row"
      initial={{ opacity: 0, x: -30 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.16,1,0.3,1] }}
      onClick={onClick}
      data-cursor="VIEW"
      whileHover={{ x: 8 }}
    >
      <span className="row-num">0{index + 1}</span>
      <div className="row-info">
        <span className="row-title">{title}</span>
        <span className="row-cat">{project.category}</span>
      </div>
      <div className="row-tech">
        {project.tech.slice(0, 3).map(t => (
          <span key={t} className="pc-tag">{t}</span>
        ))}
      </div>
      {project.status === 'wip' && (
        <span className="pc-wip">WIP</span>
      )}
      <span className="row-arrow">→</span>
    </motion.div>
  );
};

const categories = ['All', 'Landing Page', 'Website', 'Web App', 'Portfolio'];

const Projects = () => {
  const { lang } = useLang();
  const [selected, setSelected] = useState<Project | null>(null);
  const [filter, setFilter] = useState('All');

  const filtered = filter === 'All' ? projects : projects.filter(p => p.category === filter);

  return (
    <div className="projects-page">
      <div className="projects-hero">
        <motion.p
          className="hero-pre"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <span className="accent-dot" />
          {lang === 'pt' ? 'O meu trabalho' : 'My work'}
        </motion.p>
        <motion.h1
          className="projects-title"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7, ease: [0.16,1,0.3,1] }}
        >
          {lang === 'pt' ? 'Todos os\n' : 'All\n'}
          <span>{lang === 'pt' ? 'Projectos' : 'Projects'}</span>
        </motion.h1>
      </div>

      {/* Filter */}
      <div className="filter-bar">
        {categories.map(c => (
          <button
            key={c}
            className={`filter-btn ${filter === c ? 'active' : ''}`}
            onClick={() => setFilter(c)}
            data-cursor=""
          >
            {lang === 'pt' && c === 'All' ? 'Todos' : c}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="projects-list">
        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {filtered.map((p, i) => (
              <ProjectRow key={p.id} project={p} index={i} onClick={() => setSelected(p)} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected && <Modal project={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </div>
  );
};

export default Projects;
