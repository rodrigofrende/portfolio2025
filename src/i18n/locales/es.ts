const es = {
  nav: {
    home: 'Inicio',
    about: 'Sobre Mí',
    projects: 'Proyectos',
    contact: 'Contacto'
  },
  hero: {
    badge: 'Disponible para Proyectos',
    greeting: 'Hola, soy Rodrigo —',
    title: 'Desarrollador Frontend',
    titleAccent: 'que crea',
    titleHighlight: 'experiencias memorables',
    cta: {
      viewWork: 'Ver Mi Trabajo',
      letsTalk: 'Hablemos'
    },
    stats: {
      experience: {
        number: '6+',
        label: 'Años de Experiencia'
      },
      projects: {
        number: '50+',
        label: 'Proyectos Entregados'
      },
      satisfaction: {
        number: '100%',
        label: 'Satisfacción del Cliente'
      }
    },
    poweredBy: 'Powered by',
    scrollToExplore: 'Desliza para explorar'
  },
  about: {
    title: 'Sobre Mí',
    myStory: 'Mi Historia',
    intro: 'Soy un desarrollador frontend apasionado por crear experiencias digitales que marquen la diferencia. Con más de X años de experiencia en desarrollo web, me especializo en tecnologías modernas como Vue.js, React, TypeScript y diseño responsive.',
    skills: {
      frontend: {
        title: 'Frontend',
        items: [
          'Vue.js / React',
          'TypeScript / JavaScript',
          'HTML5 / CSS3',
          'Tailwind CSS'
        ] as const
      },
      tools: {
        title: 'Herramientas',
        items: [
          'Git / GitHub',
          'Vite / Webpack',
          'Figma / Adobe XD',
          'VS Code'
        ] as const
      }
    },
    stats: {
      projects: {
        number: '50+',
        label: 'Proyectos'
      },
      years: {
        number: '3+',
        label: 'Años'
      },
      dedication: {
        number: '100%',
        label: 'Dedicación'
      }
    }
  },
  projects: {
    title: 'Mis Proyectos',
    items: [
      {
        title: 'Plataforma E-commerce',
        description: 'Plataforma de comercio electrónico moderna construida con Vue.js y TypeScript.',
        technologies: ['Vue.js', 'TypeScript', 'Tailwind CSS'] as const
      },
      {
        title: 'App de Gestión de Tareas',
        description: 'Aplicación de gestión de tareas con drag & drop y colaboración en tiempo real.',
        technologies: ['React', 'Node.js', 'Socket.io'] as const
      },
      {
        title: 'Dashboard Meteorológico',
        description: 'Dashboard meteorológico con visualizaciones interactivas y pronósticos detallados.',
        technologies: ['Vue.js', 'Chart.js', 'Integración API'] as const
      },
      {
        title: 'Sitio Web Portfolio',
        description: 'Sitio web personal con diseño responsive y animaciones fluidas.',
        technologies: ['Vue.js', 'CSS3', 'GSAP'] as const
      }
    ] as const,
    links: {
      github: 'GitHub',
      demo: 'Demo'
    }
  },
  contact: {
    title: 'Contacto',
    heading: '¡Trabajemos juntos!',
    description: 'Siempre estoy interesado en nuevos proyectos y oportunidades. No dudes en contactarme si tienes alguna idea en mente.',
    email: {
      label: 'Email',
      value: "{'rodrigo.frende@gmail.com'}"
    },
    social: {
      title: 'Mis Redes',
      github: 'GitHub',
      linkedin: 'LinkedIn',
      instagram: 'Instagram'
    },
    footer: {
      rights: 'Rodrigo Frende. Todos los derechos reservados.'
    }
  },
  ui: {
    scrollToTop: 'Volver arriba'
  }
} as const

export default es
