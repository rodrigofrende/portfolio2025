// Real projects data from GitHub repositories
export interface Project {
  id: number
  title: string
  description: string
  technologies: readonly string[]
  github: string
  demo?: string
  icon: string
  featured?: boolean
  wip?: boolean // Work in Progress
}

export const realProjects: readonly Project[] = [
  {
    id: 1,
    title: 'FURIA FC - Team Management',
    description: 'Plataforma completa para gestión de equipo de fútbol femenino con sistema de asistencia, calendario de eventos, estadísticas de jugadoras y resultados de partidos en tiempo real.',
    technologies: ['React', 'TypeScript', 'Firebase', 'Vite'] as const,
    github: 'https://github.com/rodrigofrende/furiaFC-Schecule',
    demo: 'https://furiafutbolclub.netlify.app',
    icon: '⚽',
    featured: true
  },
  {
    id: 2,
    title: 'RF3D Shop',
    description: 'E-commerce moderno para venta de modelos 3D con carrito de compras, sistema de filtros, y galería interactiva. Incluye gestión de productos y checkout completo.',
    technologies: ['Vue.js', 'Pinia', 'CSS3', 'JavaScript'] as const,
    github: 'https://github.com/rodrigofrende/rf3d-shop',
    demo: 'https://rf3d.netlify.app',
    icon: '🎨',
    featured: true
  },
  {
    id: 3,
    title: 'Poké Palette',
    description: 'Generador de paletas de colores inspiradas en Pokémon. Extrae colores dominantes de sprites oficiales y permite exportar en múltiples formatos (HEX, RGB, HSL).',
    technologies: ['React', 'PokeAPI', 'Canvas API', 'TypeScript'] as const,
    github: 'https://github.com/rodrigofrende/Poke-palette',
    demo: 'https://pokepalette.netlify.app/',
    icon: '🎮',
    wip: true
  },
  {
    id: 4,
    title: 'UI Storybook',
    description: 'Biblioteca de componentes UI reutilizables documentados con Storybook. Incluye botones, cards, modales, forms y más, con variantes y estados interactivos.',
    technologies: ['Storybook', 'React', 'TypeScript', 'CSS Modules'] as const,
    github: 'https://github.com/rodrigofrende/UI-Storybook',
    icon: '📚',
    wip: true
  },
  {
    id: 5,
    title: 'Confetti Counter',
    description: 'Contador interactivo con efectos de confetti celebratorios. Implementa animaciones canvas, persistencia local y sonidos personalizables para hitos específicos.',
    technologies: ['React', 'TypeScript', 'Web Audio API', 'Tailwind CSS'] as const,
    github: 'https://github.com/rodrigofrende/confettiCounter',
    demo: 'https://moneymetrics.netlify.app',
    icon: '🎉'
  }
] as const

// Función para obtener screenshot automático usando Microlink
export const getProjectScreenshot = (projectUrl?: string, fallback: string = ''): string => {
  if (!projectUrl || projectUrl === '#') return fallback
  
  // Microlink API - Screenshot gratuito
  return `https://api.microlink.io/?url=${encodeURIComponent(projectUrl)}&screenshot=true&meta=false&embed=screenshot.url`
}

// Función para obtener Open Graph image de GitHub
export const getGithubSocialImage = (githubUrl: string): string => {
  const match = githubUrl.match(/github\.com\/([^/]+)\/([^/]+)/)
  if (!match) return ''
  
  const [, owner, repo] = match
  // GitHub genera automáticamente estas imágenes
  return `https://opengraph.githubassets.com/1/${owner}/${repo}`
}

// Función para obtener la mejor imagen disponible
export const getBestProjectImage = (project: Project): string => {
  // Prioridad:
  // 1. Screenshot del demo (si existe)
  // 2. GitHub Social Card
  // 3. Placeholder con gradiente
  
  if (project.demo && project.demo !== '#') {
    return getProjectScreenshot(project.demo)
  }
  
  if (project.github) {
    return getGithubSocialImage(project.github)
  }
  
  // Fallback a gradiente basado en el ID
  const gradients = [
    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
  ] as const
  
  return gradients[project.id % gradients.length] || gradients[0]
}

export default realProjects

