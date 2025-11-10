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
    rotatingPhrases: [
      'memorable experiences',
      'scalable applications',
      'pixel-perfect interfaces',
      'innovative solutions'
    ] as const,
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
        label: 'Innovator'
      }
    },
    poweredBy: 'Powered by',
    scrollToExplore: 'Scroll to explore'
  },
  about: {
    title: 'About Me',
    headline: 'Building exceptional web experiences',
    intro: 'I transform complex ideas into intuitive and visually impactful interfaces that users truly enjoy.',
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
        'Performance optimization and accessibility best practices',
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
    headline: 'Standout projects',
    subtitle: 'A selection of projects that reflect my focus on quality and performance. Many were born to solve real-world daily problems.',
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
      demo: 'Live Demo'
    },
    badges: {
      featured: 'Featured',
      stable: 'Stable',
      improving: 'Improving',
      wip: 'WIP'
    },
    descriptions: {
      1: 'Simplify your sports team management with a platform that centralizes schedules, players, and events. Allows multiple teams to manage their information independently, with real-time statistics and tracking.',
      2: 'Complete tool designed to manage women\'s football teams. Simplifies attendance tracking, training and match organization, player performance monitoring, and results in a simple and efficient way.',
      3: 'Specialized store to discover and purchase quality 3D models. Browse organized catalogs, filter by categories, and download files ready to print. Ideal for designers, makers, and 3D printing enthusiasts.',
      4: 'Discover unique color palettes inspired by your favorite Pokémon. Creative tool that extracts color schemes directly from official sprites, helping designers and artists find inspiration for their projects.',
      5: 'Collection of ready-to-use, well-documented interface components. Speed up your frontend development with proven, accessible, and customizable elements. Ideal for teams seeking consistency and speed.',
      6: 'Make every achievement count with a visual counter that celebrates your goals. Set personal objectives, track your progress, and enjoy festive animations when you reach important milestones. Perfect for motivation and celebration.',
      7: 'Find information about any movie quickly and intuitively. Instant searches, complete details, and smooth navigation. An experience designed for movie lovers who want to explore and discover new titles effortlessly.',
      8: 'Run live raffles with overlays and animations crafted for streaming. Manage participants with weighted chances, pick multiple winners instantly, and keep everything persisted to resume the event anytime.'
    }
  },
  contact: {
    title: 'Contact',
    headline: 'Let\'s connect and create together',
    subtitle: 'I\'m available to collaborate on new projects and opportunities.',
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
      rights: 'Made with 💖 by Rodrigo Frende'
    }
  },
  ui: {
    scrollToTop: 'Back to top'
  }
} as const

export default en
