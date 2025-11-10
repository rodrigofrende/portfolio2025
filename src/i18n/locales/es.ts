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
    rotatingPhrases: [
      'experiencias memorables',
      'aplicaciones escalables',
      'interfaces pixel-perfect',
      'soluciones innovadoras'
    ] as const,
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
        label: 'Innovador'
      }
    },
    poweredBy: 'Powered by',
    scrollToExplore: 'Desliza para explorar'
  },
  about: {
    title: 'Sobre Mí',
    headline: 'Creando experiencias web excepcionales',
    intro: 'Transformo ideas complejas en interfaces intuitivas y visualmente impactantes que los usuarios realmente disfrutan usar.',
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
        'Optimización de rendimiento y mejores prácticas de accesibilidad',
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
    headline: 'Proyectos que destacan',
    subtitle: 'Una selección de proyectos que reflejan mi enfoque en calidad y performance. Muchos nacieron para resolver problemáticas reales del día a día.',
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
    },
    badges: {
      featured: 'Destacado',
      stable: 'Estable',
      improving: 'Mejorando',
      wip: 'En Progreso'
    },
    descriptions: {
      1: 'Simplifica la gestión de tu equipo deportivo con una plataforma que centraliza calendarios, jugadores y eventos. Permite que múltiples equipos gestionen su información de forma independiente, con estadísticas y seguimiento en tiempo real.',
      2: 'Herramienta completa diseñada para gestionar equipos de fútbol femenino. Facilita el control de asistencias, organización de entrenamientos y partidos, seguimiento del rendimiento de jugadoras y resultados de manera sencilla y eficiente.',
      3: 'Tienda especializada para descubrir y adquirir modelos 3D de calidad. Navega por catálogos organizados, filtra por categorías y descarga archivos listos para imprimir. Ideal para diseñadores, makers y entusiastas de la impresión 3D.',
      4: 'Descubre paletas de colores únicas inspiradas en tus Pokémon favoritos. Herramienta creativa que extrae esquemas de color directamente de los sprites oficiales, ayudando a diseñadores y artistas a encontrar inspiración para sus proyectos.',
      5: 'Colección de componentes de interfaz listos para usar y bien documentados. Acelera tu desarrollo frontend con elementos probados, accesibles y personalizables. Ideal para equipos que buscan consistencia y velocidad en sus proyectos.',
      6: 'Haz que cada logro cuente con un contador visual que celebra tus metas. Establece objetivos personales, sigue tu progreso y disfruta de animaciones festivas cuando alcanzas hitos importantes. Perfecto para motivar y celebrar éxitos.',
      7: 'Encuentra información de cualquier película de forma rápida e intuitiva. Búsquedas instantáneas, detalles completos y navegación fluida. Una experiencia diseñada para cinéfilos que quieren explorar y descubrir nuevos títulos sin complicaciones.',
      8: 'Organiza sorteos en vivo con overlays y animaciones pensados para streaming. Gestiona participantes con chances personalizadas, ejecuta múltiples ganadores y mantiene la información persistida para retomar el evento cuando quieras.'
    }
  },
  contact: {
    title: 'Contacto',
    headline: 'Conectemos y creemos juntos',
    subtitle: 'Estoy disponible para colaborar en nuevos proyectos y oportunidades.',
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
      rights: 'Hecho con 💖 by Rodrigo Frende'
    }
  },
  ui: {
    scrollToTop: 'Volver arriba'
  }
} as const

export default es
