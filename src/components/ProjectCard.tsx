import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useLang } from '../context/LangContext';
import type { Project } from '../data/projects';
import './ProjectCard.css';

interface Props { project: Project; index: number; onClick?: () => void; }

const ProjectCard = ({ project, index, onClick }: Props) => {
  const { lang } = useLang();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  const title = lang === 'pt' ? project.titlePT : project.titleEN;
  const desc = lang === 'pt' ? project.descriptionPT : project.descriptionEN;

  return (
    <motion.div
      ref={ref}
      className="project-card"
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16,1,0.3,1] }}
      whileHover={{ y: -6 }}
      onClick={onClick}
      data-cursor={onClick ? 'VIEW' : ''}
    >
      <div className="card-glow" />

      <div className="pc-top">
        <span className="pc-category">{project.category}</span>
        {project.status === 'wip' && (
          <span className="pc-wip">{lang === 'pt' ? 'Em dev.' : 'WIP'}</span>
        )}
      </div>

      <h3 className="pc-title">{title}</h3>
      <p className="pc-desc">{desc}</p>

      <div className="pc-tech">
        {project.tech.map(t => (
          <span key={t} className="pc-tag">{t}</span>
        ))}
      </div>

      <div className="pc-links">
        <a href={project.deploy} target="_blank" rel="noopener noreferrer"
           className="pc-link primary" onClick={e => e.stopPropagation()} data-cursor="LIVE">
          {lang === 'pt' ? 'Ver demo' : 'Live demo'} ↗
        </a>
        <a href={project.repo} target="_blank" rel="noopener noreferrer"
           className="pc-link secondary" onClick={e => e.stopPropagation()} data-cursor="CODE">
          GitHub
        </a>
      </div>

      <div className="pc-number">0{index + 1}</div>
    </motion.div>
  );
};

export default ProjectCard;
