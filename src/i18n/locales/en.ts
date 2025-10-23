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
    headline: 'Frontend Developer with a passion for creating exceptional digital experiences',
    intro: 'I\'m Rodrigo, a Frontend Developer specialized in Vue.js, React, and TypeScript. My focus is on transforming complex ideas into intuitive and visually impactful interfaces that users truly enjoy using.',
    journey: {
      title: 'My Journey',
      text: 'With over 6 years of experience in web development, I\'ve worked in both software factories and product companies, covering very diverse projects with clients from different industries. From sports management platforms to 3D model e-commerce, this journey through all web technologies has taught me to adapt quickly. I\'m constantly learning and improving, always seeking new ways to solve problems and create better experiences.'
    },
    approach: {
      title: 'My Approach',
      text: 'I firmly believe in writing clean, maintainable, and performant code. I specialize in Vue.js and its ecosystem (Pinia, Vue Router, Vite), React, Firebase, and cloud platforms like AWS and Azure. I work with agile methodologies such as SCRUM, excel at building functional requirements, and have a critical eye for detecting potential issues before they become problems. Every project is an opportunity to learn something new and exceed expectations.'
    },
    value: {
      title: 'What I Bring to the Table',
      items: [
        'Modern web application development with Vue.js/React and TypeScript',
        'Deployment and integration with AWS, Azure, Firebase, and serverless architectures',
        'Responsive interface design with CSS3, Tailwind, and smooth animations',
        'Working with agile methodologies (SCRUM) and building functional requirements',
        'Performance optimization and accessibility best practices (a11y)',
        'Proactive error detection and critical architecture analysis',
        'Results-oriented mindset and attention to detail'
      ] as const
    },
    cv: {
      title: 'Resume',
      download: 'Download CV',
      spanish: 'Spanish',
      english: 'English'
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
