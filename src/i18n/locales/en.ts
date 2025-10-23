const en = {
  nav: {
    home: 'Home',
    about: 'About',
    projects: 'Projects',
    contact: 'Contact'
  },
  hero: {
    badge: 'Available for Projects',
    greeting: 'Hi, I\'m Rodrigo —',
    title: 'Frontend Developer',
    titleAccent: 'who creates',
    titleHighlight: 'memorable experiences',
    cta: {
      viewWork: 'See My Work',
      letsTalk: 'Let\'s Talk'
    },
    stats: {
      experience: {
        number: '6+',
        label: 'Years Experience'
      },
      projects: {
        number: '50+',
        label: 'Projects Delivered'
      },
      satisfaction: {
        number: '100%',
        label: 'Client Satisfaction'
      }
    },
    poweredBy: 'Powered by',
    scrollToExplore: 'Scroll to explore'
  },
  about: {
    title: 'About Me',
    myStory: 'My Story',
    intro: 'I\'m a frontend developer passionate about creating digital experiences that make a difference. With over X years of experience in web development, I specialize in modern technologies like Vue.js, React, TypeScript and responsive design.',
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
        title: 'Tools',
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
        label: 'Projects'
      },
      years: {
        number: '3+',
        label: 'Years'
      },
      dedication: {
        number: '100%',
        label: 'Dedication'
      }
    }
  },
  projects: {
    title: 'My Projects',
    items: [
      {
        title: 'E-commerce Platform',
        description: 'Modern e-commerce platform built with Vue.js and TypeScript.',
        technologies: ['Vue.js', 'TypeScript', 'Tailwind CSS'] as const
      },
      {
        title: 'Task Management App',
        description: 'Task management application with drag & drop and real-time collaboration.',
        technologies: ['React', 'Node.js', 'Socket.io'] as const
      },
      {
        title: 'Weather Dashboard',
        description: 'Weather dashboard with interactive visualizations and detailed forecasts.',
        technologies: ['Vue.js', 'Chart.js', 'API Integration'] as const
      },
      {
        title: 'Portfolio Website',
        description: 'Personal website with responsive design and smooth animations.',
        technologies: ['Vue.js', 'CSS3', 'GSAP'] as const
      }
    ] as const,
    links: {
      github: 'GitHub',
      demo: 'Demo'
    }
  },
  contact: {
    title: 'Contact',
    heading: 'Let\'s work together!',
    description: 'I\'m always interested in new projects and opportunities. Don\'t hesitate to contact me if you have any ideas in mind.',
    email: {
      label: 'Email',
      value: "{'rodrigo.frende@gmail.com'}"
    },
    social: {
      title: 'My Networks',
      github: 'GitHub',
      linkedin: 'LinkedIn',
      instagram: 'Instagram'
    },
    footer: {
      rights: 'Rodrigo Frende. All rights reserved.'
    }
  },
  ui: {
    scrollToTop: 'Back to top'
  }
} as const

export default en
