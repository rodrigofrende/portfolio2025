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
    headline: 'Desarrollador Frontend con pasión por crear experiencias digitales excepcionales',
    intro: 'Soy Rodrigo, Frontend Developer especializado en Vue.js, React y TypeScript. Mi enfoque está en transformar ideas complejas en interfaces intuitivas y visualmente impactantes que los usuarios realmente disfrutan usar.',
    journey: {
      title: 'Mi Trayectoria',
      text: 'Con más de 6 años de experiencia en desarrollo web, he trabajado tanto en software factories como en empresas de producto, abarcando proyectos muy diversos con clientes de distintos rubros. Desde plataformas de gestión deportiva hasta e-commerce de modelos 3D, este recorrido por todas las tecnologías web me ha enseñado a adaptarme rápidamente. Estoy en constante aprendizaje y mejora, siempre buscando nuevas formas de resolver problemas y crear mejores experiencias.'
    },
    approach: {
      title: 'Mi Enfoque',
      text: 'Creo firmemente en escribir código limpio, mantenible y performante. Me especializo en Vue.js y su ecosistema (Pinia, Vue Router, Vite), React, Firebase, y plataformas cloud como AWS y Azure. Trabajo con metodologías ágiles estilo SCRUM, me destaco en el armado de requisitos funcionales y tengo un ojo crítico para detectar posibles errores antes de que se conviertan en problemas. Cada proyecto es una oportunidad para aprender algo nuevo y superar expectativas.'
    },
    value: {
      title: 'Qué Puedo Aportar',
      items: [
        'Desarrollo de aplicaciones web modernas con Vue.js/React y TypeScript',
        'Despliegue e integración con AWS, Azure, Firebase y arquitecturas serverless',
        'Diseño de interfaces responsivas con CSS3, Tailwind y animaciones fluidas',
        'Trabajo con metodologías ágiles (SCRUM) y armado de requisitos funcionales',
        'Optimización de rendimiento y mejores prácticas de accesibilidad (a11y)',
        'Detección proactiva de errores y análisis crítico de arquitectura',
        'Mentalidad orientada a resultados y atención al detalle'
      ] as const
    },
    cv: {
      title: 'Currículum',
      download: 'Descargar CV',
      spanish: 'Español',
      english: 'English'
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
