export interface Project {
  id: string;
  titlePT: string;
  titleEN: string;
  descriptionPT: string;
  descriptionEN: string;
  tech: string[];
  repo: string;
  deploy: string;
  featured: boolean;
  status?: 'wip';
  category: string;
}

export const projects: Project[] = [
  {
    id: 'pdacademia-landing',
    titlePT: 'PDAcademia Landing Page',
    titleEN: 'PDAcademia Landing Page',
    descriptionPT: 'Landing page de alta conversão para a PDAcademia. Design clean e profissional com CTAs optimizados e responsividade completa.',
    descriptionEN: 'High-conversion landing page for PDAcademia. Clean, professional design with optimised CTAs and full responsiveness.',
    tech: ['React.js', 'TypeScript', 'CSS'],
    repo: 'https://github.com/DavidVilela1/landing-page-pdacademia',
    deploy: 'https://landing-page-pdacademia.vercel.app/',
    featured: true,
    category: 'Landing Page',
  },
  {
    id: 'pdacademia-campus',
    titlePT: 'Campus Online PDAcademia',
    titleEN: 'PDAcademia Online Campus',
    descriptionPT: 'Conceito frontend para plataforma educacional online. Dashboard moderna, sistema modular e UI escalável semelhante a plataformas LMS.',
    descriptionEN: 'Frontend concept for an online educational platform. Modern dashboard, modular system and scalable UI similar to LMS platforms.',
    tech: ['Next.js', 'TypeScript', 'TailwindCSS'],
    repo: 'https://github.com/DavidVilela1/pdacademia-campus',
    deploy: 'https://pdacademia-campus.vercel.app/',
    featured: true,
    status: 'wip',
    category: 'Web App',
  },
  {
    id: 'portfolio',
    titlePT: 'Portfolio Interativo',
    titleEN: 'Interactive Portfolio',
    descriptionPT: 'Portfolio pessoal para apresentar projectos, competências e evolução como developer. Design mobile-first optimizado para performance.',
    descriptionEN: 'Personal portfolio showcasing projects, skills and growth as a developer. Mobile-first design optimised for performance.',
    tech: ['React', 'TypeScript', 'Vite', 'Framer Motion'],
    repo: 'https://github.com/DavidVilela1/portfolio-davidvilela-webdev',
    deploy: 'https://davidvilela1.github.io/portfolio-davidvilela-webdev/',
    featured: true,
    category: 'Portfolio',
  },
  {
    id: 'pdauto',
    titlePT: 'PDAuto Website',
    titleEN: 'PDAuto Website',
    descriptionPT: 'Website institucional para a PDAuto. Design moderno e responsivo com interface optimizada para mobile e estrutura focada em conversão.',
    descriptionEN: 'Institutional website for PDAuto. Modern, responsive design with mobile-optimised interface and conversion-focused structure.',
    tech: ['React.js', 'CSS', 'JavaScript'],
    repo: 'https://github.com/DavidVilela1/pdauto-mockup',
    deploy: 'https://pdauto-mockup.vercel.app/',
    featured: false,
    category: 'Website',
  },
  {
    id: 'cafe-cheirinho',
    titlePT: 'Café com Cheirinho Studios',
    titleEN: 'Café com Cheirinho Studios',
    descriptionPT: 'Landing page para estúdio independente de videojogos. Visual criativo e imersivo com identidade focada em gaming.',
    descriptionEN: 'Landing page for an independent video game development studio. Creative, immersive visual with a gaming-focused identity.',
    tech: ['React.js', 'CSS', 'JavaScript'],
    repo: 'https://github.com/DavidVilela1/cafe-com-cheirinho',
    deploy: 'https://cafe-com-cheirinho.vercel.app/',
    featured: false,
    category: 'Landing Page',
  },
  {
    id: 'pdcompeticoes',
    titlePT: 'PDCompetições',
    titleEN: 'PDCompetições',
    descriptionPT: 'Landing page para equipa de automobilismo. Apresenta pilotos, staff e próximas competições com imagens animadas via Lottie.',
    descriptionEN: 'Landing page for a motorsport team. Showcases drivers, staff and upcoming competitions with Lottie-animated visuals.',
    tech: ['React.js', 'TypeScript', 'Lottie'],
    repo: 'https://github.com/DavidVilela1/pdcompeticoes-landing',
    deploy: 'https://pdcompeticoes-landing.vercel.app/',
    featured: false,
    status: 'wip',
    category: 'Landing Page',
  },
];
