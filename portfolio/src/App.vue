<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

// Reactive data
const isScrolled = ref(false)
const mobileMenuOpen = ref(false)
const currentRole = ref('')
const currentCodeLine = ref('')
const roles = [ 'Frontend Developer', 'UI/UX Designer', 'Tech Enthusiast', '3D Maker',]
const codeLines = [
  'npm create portfolio',
  'git init && git add .',
  'npm run dev',
  'const skills = ["Vue", "React", "Vite"]',
  'console.log("Hello World!")',
  'while(true) { innovate(); learn(); improve(); }'
]
let roleIndex = 0
let codeIndex = 0
let roleInterval: number | undefined
let codeInterval: number | undefined

// Interactive floating elements
const mousePosition = ref({ x: 0, y: 0 })
const floatingElements = ref<Array<{
  id: number
  x: number
  y: number
  vx: number
  vy: number
  size: number
  type: string
  icon: string
  color: string
  hovered: boolean
}>>([])
let elementId = 0

// Sample projects data
const projects = ref([
  {
    id: 1,
    title: "E-commerce Platform",
    description: "Plataforma de comercio electrónico moderna construida con Vue.js y TypeScript.",
    technologies: ["Vue.js", "TypeScript", "Tailwind CSS"],
    github: "https://github.com/tu-usuario/ecommerce-platform",
    demo: "https://demo-ecommerce.com",
    icon: "🛒"
  },
  {
    id: 2,
    title: "Task Management App",
    description: "Aplicación de gestión de tareas con drag & drop y colaboración en tiempo real.",
    technologies: ["React", "Node.js", "Socket.io"],
    github: "https://github.com/tu-usuario/task-manager",
    demo: "https://demo-tasks.com",
    icon: "📋"
  },
  {
    id: 3,
    title: "Weather Dashboard",
    description: "Dashboard meteorológico con visualizaciones interactivas y pronósticos detallados.",
    technologies: ["Vue.js", "Chart.js", "API Integration"],
    github: "https://github.com/tu-usuario/weather-dashboard",
    demo: "https://demo-weather.com",
    icon: "🌤️"
  },
  {
    id: 4,
    title: "Portfolio Website",
    description: "Sitio web personal con diseño responsive y animaciones fluidas.",
    technologies: ["Vue.js", "CSS3", "GSAP"],
    github: "https://github.com/tu-usuario/portfolio",
    demo: "https://tu-portfolio.com",
    icon: "💼"
  }
])

// Methods
const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
  mobileMenuOpen.value = false
}

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

// Typing animations
const typeRole = () => {
  const role = roles[roleIndex]
  if (!role) return
  
  let i = 0
  currentRole.value = ''
  
  const typeInterval = setInterval(() => {
    if (i < role.length) {
      currentRole.value += role[i]
      i++
    } else {
      clearInterval(typeInterval)
      setTimeout(() => {
        roleIndex = (roleIndex + 1) % roles.length
        typeRole()
      }, 2000)
    }
  }, 100)
}

const typeCode = () => {
  const code = codeLines[codeIndex]
  if (!code) return
  
  let i = 0
  currentCodeLine.value = ''
  
  const typeInterval = setInterval(() => {
    if (i < code.length) {
      currentCodeLine.value += code[i]
      i++
    } else {
      clearInterval(typeInterval)
      setTimeout(() => {
        codeIndex = (codeIndex + 1) % codeLines.length
        typeCode()
      }, 3000)
    }
  }, 50)
}

// Particle effects - Generate once and cache
const particleStyles = ref<Array<Record<string, string>>>([])

const generateParticleStyles = () => {
  const styles = []
  for (let i = 0; i < 50; i++) {
    const size = Math.random() * 4 + 1
    const left = Math.random() * 100
    const animationDelay = Math.random() * 20
    const animationDuration = Math.random() * 20 + 10
    
    styles.push({
      width: `${size}px`,
      height: `${size}px`,
      left: `${left}%`,
      animationDelay: `${animationDelay}s`,
      animationDuration: `${animationDuration}s`
    })
  }
  return styles
}

// Generate particle styles once on mount
onMounted(() => {
  particleStyles.value = generateParticleStyles()
})

// Avatar particle styles - Generate once and cache
const avatarParticleStyles = ref<Array<Record<string, string>>>([])

const generateAvatarParticleStyles = () => {
  const styles = []
  for (let i = 0; i < 8; i++) {
    const angle = (i * 45) % 360
    const radius = 60 + Math.random() * 20
    const x = Math.cos(angle * Math.PI / 180) * radius
    const y = Math.sin(angle * Math.PI / 180) * radius
    
    styles.push({
      transform: `translate(${x}px, ${y}px)`,
      animationDelay: `${i * 0.2}s`
    })
  }
  return styles
}

// Generate avatar particle styles once on mount
onMounted(() => {
  particleStyles.value = generateParticleStyles()
  avatarParticleStyles.value = generateAvatarParticleStyles()
})

// Floating elements functions
const createFloatingElements = () => {
  const elements = [
    { type: 'vue', icon: 'V', color: '#4fc08d' },
    { type: 'react', icon: 'R', color: '#61dafb' },
    { type: 'js', icon: 'JS', color: '#f7df1e' },
    { type: 'css', icon: 'CSS', color: '#1572b6' },
    { type: 'html', icon: 'HTML', color: '#e34f26' },
    { type: 'git', icon: 'Git', color: '#f05032' },
    { type: 'node', icon: 'Node', color: '#339933' },
    { type: 'api', icon: 'API', color: '#ff6b6b' }
  ]
  
  elements.forEach((element, index) => {
    floatingElements.value.push({
      id: elementId++,
      x: 100 + (index * 80) + Math.random() * 200,
      y: 150 + Math.random() * 200,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      size: 40 + Math.random() * 20,
      type: element.type,
      icon: element.icon,
      color: element.color,
      hovered: false
    })
  })
}

const updateFloatingElements = () => {
  floatingElements.value.forEach(element => {
    // Basic physics movement
    element.x += element.vx
    element.y += element.vy
    
    // Bounce off walls
    if (element.x <= element.size/2 || element.x >= 400 - element.size/2) {
      element.vx *= -1
      element.x = Math.max(element.size/2, Math.min(400 - element.size/2, element.x))
    }
    if (element.y <= element.size/2 || element.y >= 300 - element.size/2) {
      element.vy *= -1
      element.y = Math.max(element.size/2, Math.min(300 - element.size/2, element.y))
    }
    
    // Mouse interaction - repulsion effect
    const dx = mousePosition.value.x - element.x
    const dy = mousePosition.value.y - element.y
    const distance = Math.sqrt(dx * dx + dy * dy)
    const minDistance = 80
    
    if (distance < minDistance) {
      const force = (minDistance - distance) / minDistance
      const angle = Math.atan2(dy, dx)
      element.vx -= Math.cos(angle) * force * 0.02
      element.vy -= Math.sin(angle) * force * 0.02
      element.hovered = true
    } else {
      element.hovered = false
    }
    
    // Damping to prevent infinite acceleration
    element.vx *= 0.98
    element.vy *= 0.98
    
    // Limit velocity
    const maxSpeed = 2
    const speed = Math.sqrt(element.vx * element.vx + element.vy * element.vy)
    if (speed > maxSpeed) {
      element.vx = (element.vx / speed) * maxSpeed
      element.vy = (element.vy / speed) * maxSpeed
    }
  })
}

const handleMouseMove = (e: MouseEvent) => {
  const rect = document.querySelector('.hero-visual')?.getBoundingClientRect()
  if (rect) {
    mousePosition.value = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    }
  }
}


const startFloatingAnimation = () => {
  const animate = () => {
    updateFloatingElements()
    requestAnimationFrame(animate)
  }
  animate()
}

// Magnetic button effect
const addMagneticEffect = () => {
  const magneticBtns = document.querySelectorAll('.magnetic-btn')
  
  magneticBtns.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const mouseEvent = e as MouseEvent
      const rect = btn.getBoundingClientRect()
      const x = mouseEvent.clientX - rect.left - rect.width / 2
      const y = mouseEvent.clientY - rect.top - rect.height / 2
      
      const htmlElement = btn as HTMLElement
      htmlElement.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`
    })
    
    btn.addEventListener('mouseleave', () => {
      const htmlElement = btn as HTMLElement
      htmlElement.style.transform = 'translate(0px, 0px)'
    })
  })
}

// Lifecycle
onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  window.addEventListener('mousemove', handleMouseMove)
  
  // Create floating elements
  createFloatingElements()
  startFloatingAnimation()
  
  // Start typing animations
  setTimeout(() => {
    typeRole()
    typeCode()
  }, 1000)
  
  // Add magnetic effects
  setTimeout(() => {
    addMagneticEffect()
  }, 500)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('mousemove', handleMouseMove)
  if (roleInterval !== undefined) clearInterval(roleInterval)
  if (codeInterval !== undefined) clearInterval(codeInterval)
})
</script>

<template>
  <div id="app">
    <!-- Navigation -->
    <nav class="navbar" :class="{ 'navbar-scrolled': isScrolled }">
      <div class="nav-container">
        <div class="nav-logo">
          <span class="logo-text">Portfolio</span>
        </div>
        <ul class="nav-menu" :class="{ 'nav-menu-active': mobileMenuOpen }">
          <li class="nav-item">
            <a href="#home" @click="scrollToSection('home')" class="nav-link">Home</a>
          </li>
          <li class="nav-item">
            <a href="#about" @click="scrollToSection('about')" class="nav-link">About</a>
          </li>
          <li class="nav-item">
            <a href="#projects" @click="scrollToSection('projects')" class="nav-link">Projects</a>
          </li>
          <li class="nav-item">
            <a href="#contact" @click="scrollToSection('contact')" class="nav-link">Contact</a>
          </li>
        </ul>
        <div class="nav-toggle" @click="toggleMobileMenu">
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
        </div>
      </div>
    </nav>

    <!-- Home Section -->
    <section id="home" class="home-section">
      <!-- Animated Background -->
      <div class="animated-bg">
        <div class="bg-shapes">
          <div class="shape shape-1"></div>
          <div class="shape shape-2"></div>
          <div class="shape shape-3"></div>
          <div class="shape shape-4"></div>
          <div class="shape shape-5"></div>
        </div>
        <div class="particles">
          <div v-for="(style, i) in particleStyles" :key="i" class="particle" :style="style"></div>
        </div>
      </div>

      <div class="hero-content">
        <div class="hero-text">
          <div class="greeting-text">
            <span class="greeting">¡Hola! 👋</span>
          </div>
          <h1 class="hero-title">
            <span class="title-line typing-animation">Soy</span>
            <span class="title-name glitch-text" data-text="Rodrigo Frende">Rodrigo Frende</span>
            <div class="title-role-container">
              <span class="title-role typing-role">{{ currentRole }}</span>
              <span class="cursor">|</span>
            </div>
          </h1>
          <p class="hero-description">
            <span class="highlight-text">Desarrollador Frontend</span> apasionado por crear 
            <span class="highlight-text">experiencias digitales</span> que marquen la diferencia.
            Especializado en tecnologías modernas y diseño innovador.
          </p>
          <div class="hero-buttons">
            <button class="btn-primary magnetic-btn" @click="scrollToSection('projects')">
              <span class="btn-text">Ver Proyectos</span>
              <div class="btn-shine"></div>
            </button>
            <button class="btn-secondary magnetic-btn" @click="scrollToSection('contact')">
              <span class="btn-text">Contactar</span>
              <div class="btn-shine"></div>
            </button>
          </div>
        </div>
        
        <div class="hero-visual">
          <!-- Interactive Code Terminal -->
          <div class="code-terminal">
            <div class="terminal-header">
              <div class="terminal-buttons">
                <span class="btn-close"></span>
                <span class="btn-minimize"></span>
                <span class="btn-maximize"></span>
              </div>
              <span class="terminal-title">portfolio.js</span>
            </div>
            <div class="terminal-body">
              <div class="code-line">
                <span class="code-prompt">$</span>
                <span class="code-text typing-code">{{ currentCodeLine }}</span>
                <span class="cursor">|</span>
              </div>
            </div>
          </div>

          <!-- 3D Floating Elements -->
          <div class="floating-elements-3d">
            <div class="floating-cube cube-1">
              <div class="cube-face front">Vue</div>
              <div class="cube-face back">React</div>
              <div class="cube-face right">TS</div>
              <div class="cube-face left">JS</div>
              <div class="cube-face top">CSS</div>
              <div class="cube-face bottom">HTML</div>
            </div>
            <div class="floating-cube cube-2">
              <div class="cube-face front">API</div>
              <div class="cube-face back">DB</div>
              <div class="cube-face right">Node</div>
              <div class="cube-face left">Git</div>
              <div class="cube-face top">UX</div>
              <div class="cube-face bottom">UI</div>
            </div>
            <div class="floating-cube cube-3">
              <div class="cube-face front">Dev</div>
              <div class="cube-face back">Ops</div>
              <div class="cube-face right">Test</div>
              <div class="cube-face left">Build</div>
              <div class="cube-face top">Deploy</div>
              <div class="cube-face bottom">Monitor</div>
            </div>
            <div class="floating-cube cube-4">
              <div class="cube-face front">CI/CD</div>
              <div class="cube-face back">Azure</div>
              <div class="cube-face right">AWS</div>
              <div class="cube-face left">Docker</div>
              <div class="cube-face top">K8s</div>
              <div class="cube-face bottom">GitHub</div>
            </div>
          </div>

          <!-- Central Avatar with Glow Effect -->
          <div class="central-avatar">
            <div class="avatar-glow"></div>
            <div class="avatar-ring"></div>
            <div class="profile-avatar">
              <div class="avatar-content">
                <div class="avatar-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                  </svg>
                </div>
                <div class="avatar-particles">
                  <div v-for="(style, i) in avatarParticleStyles" :key="i" class="avatar-particle" :style="style"></div>
                </div>
              </div>
            </div>
          </div>

          <!-- Interactive Floating Elements -->
          <div class="floating-interactive-area" @mousemove="handleMouseMove">
            <!-- Floating Tech Elements -->
            <div class="floating-elements">
              <div 
                v-for="element in floatingElements" 
                :key="element.id"
                class="floating-element"
                :class="{ 'element-hovered': element.hovered }"
                :style="{ 
                  left: element.x + 'px', 
                  top: element.y + 'px',
                  width: element.size + 'px',
                  height: element.size + 'px',
                  '--element-color': element.color
                }"
                @mouseenter="element.hovered = true"
                @mouseleave="element.hovered = false"
              >
                <div class="element-content">
                  <span class="element-icon">{{ element.icon }}</span>
                </div>
                <div class="element-glow" v-if="element.hovered"></div>
              </div>
            </div>
            
            <!-- Mouse Cursor Effect -->
            <div 
              class="mouse-cursor-effect"
              :style="{ 
                left: mousePosition.x + 'px', 
                top: mousePosition.y + 'px' 
              }"
            ></div>
            
            <!-- Floating Particles -->
            <div class="floating-particles">
              <div 
                v-for="(style, i) in particleStyles" 
                :key="i"
                class="particle"
                :style="style"
              ></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Enhanced Scroll Indicator -->
      <div class="scroll-indicator">
        <div class="scroll-text">Scroll</div>
        <div class="scroll-arrow">
          <div class="arrow-line"></div>
          <div class="arrow-head"></div>
        </div>
      </div>
    </section>

    <!-- About Section -->
    <section id="about" class="about-section">
      <div class="container">
        <h2 class="section-title">Sobre Mí</h2>
        <div class="about-content">
          <div class="about-text">
            <div class="about-intro">
              <h3>Mi Historia</h3>
              <p>
                Soy un desarrollador frontend apasionado por crear experiencias digitales 
                que marquen la diferencia. Con más de X años de experiencia en el desarrollo 
                web, me especializo en tecnologías modernas como Vue.js, React, TypeScript 
                y diseño responsive.
              </p>
            </div>
            <div class="skills-grid">
              <div class="skill-category">
                <h4>Frontend</h4>
                <ul>
                  <li>Vue.js / React</li>
                  <li>TypeScript / JavaScript</li>
                  <li>HTML5 / CSS3</li>
                  <li>Tailwind CSS</li>
                </ul>
              </div>
              <div class="skill-category">
                <h4>Herramientas</h4>
                <ul>
                  <li>Git / GitHub</li>
                  <li>Vite / Webpack</li>
                  <li>Figma / Adobe XD</li>
                  <li>VS Code</li>
                </ul>
              </div>
            </div>
          </div>
          <div class="about-stats">
            <div class="stat-item">
              <div class="stat-number">50+</div>
              <div class="stat-label">Proyectos</div>
            </div>
            <div class="stat-item">
              <div class="stat-number">3+</div>
              <div class="stat-label">Años</div>
            </div>
            <div class="stat-item">
              <div class="stat-number">100%</div>
              <div class="stat-label">Dedicación</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Projects Section -->
    <section id="projects" class="projects-section">
      <div class="container">
        <h2 class="section-title">Mis Proyectos</h2>
        <div class="projects-grid">
          <div class="project-card" v-for="project in projects" :key="project.id">
            <div class="project-image">
              <div class="project-placeholder">
                <span class="project-icon">{{ project.icon }}</span>
              </div>
            </div>
            <div class="project-content">
              <h3 class="project-title">{{ project.title }}</h3>
              <p class="project-description">{{ project.description }}</p>
              <div class="project-tech">
                <span v-for="tech in project.technologies" :key="tech" class="tech-tag">
                  {{ tech }}
                </span>
              </div>
              <div class="project-links">
                <a :href="project.github" target="_blank" class="project-link">
                  <span>GitHub</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M7 17L17 7M17 7H7M17 7V17"/>
                  </svg>
                </a>
                <a v-if="project.demo" :href="project.demo" target="_blank" class="project-link">
                  <span>Demo</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M7 17L17 7M17 7H7M17 7V17"/>
                  </svg>
    </a>
  </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact Section -->
    <footer id="contact" class="contact-section">
      <div class="container">
        <h2 class="section-title">Contacto</h2>
        <div class="contact-content">
          <div class="contact-info">
            <h3>¡Trabajemos juntos!</h3>
            <p>
              Estoy siempre interesado en nuevos proyectos y oportunidades. 
              No dudes en contactarme si tienes alguna idea en mente.
            </p>
            <div class="contact-methods">
              <a href="mailto:tu-email@ejemplo.com" class="contact-method">
                <div class="method-icon">📧</div>
                <div class="method-info">
                  <span class="method-label">Email</span>
                  <span class="method-value">tu-email@ejemplo.com</span>
                </div>
              </a>
            </div>
          </div>
          <div class="social-links">
            <h3>Sígueme</h3>
            <div class="social-grid">
              <a href="https://github.com/tu-usuario" target="_blank" class="social-link">
                <div class="social-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </div>
                <span>GitHub</span>
              </a>
              <a href="https://linkedin.com/in/tu-perfil" target="_blank" class="social-link">
                <div class="social-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </div>
                <span>LinkedIn</span>
              </a>
              <a href="https://instagram.com/tu-perfil" target="_blank" class="social-link">
                <div class="social-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </div>
                <span>Instagram</span>
              </a>
            </div>
          </div>
        </div>
        <div class="footer-bottom">
          <p>&copy; 2024 Rodrigo Frende. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped>
/* Reset and base styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  line-height: 1.6;
  color: #333;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* Navigation */
.navbar {
  position: fixed;
  top: 0;
  width: 100%;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  z-index: 1000;
  transition: all 0.3s ease;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.navbar-scrolled {
  background: rgba(255, 255, 255, 0.98);
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70px;
}

.nav-logo .logo-text {
  font-size: 1.5rem;
  font-weight: 700;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.nav-menu {
  display: flex;
  list-style: none;
  gap: 2rem;
}

.nav-link {
  text-decoration: none;
  color: #333;
  font-weight: 500;
  transition: color 0.3s ease;
  position: relative;
}

.nav-link:hover {
  color: #667eea;
}

.nav-link::after {
  content: '';
  position: absolute;
  width: 0;
  height: 2px;
  bottom: -5px;
  left: 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  transition: width 0.3s ease;
}

.nav-link:hover::after {
  width: 100%;
}

.nav-toggle {
  display: none;
  flex-direction: column;
  cursor: pointer;
}

.bar {
  width: 25px;
  height: 3px;
  background: #333;
  margin: 3px 0;
  transition: 0.3s;
}

/* Home Section */
.home-section {
  min-height: 100vh;
  display: flex;
  align-items: center;
  background: linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%);
  color: white;
  position: relative;
  overflow: hidden;
}

/* Animated Background */
.animated-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}

.bg-shapes {
  position: absolute;
  width: 100%;
  height: 100%;
}

.shape {
  position: absolute;
  border-radius: 50%;
  background: linear-gradient(45deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1));
  animation: float-shape 20s infinite linear;
  will-change: transform;
  transform: translateZ(0);
}

.shape-1 {
  width: 300px;
  height: 300px;
  top: 10%;
  left: 10%;
  animation-delay: 0s;
}

.shape-2 {
  width: 200px;
  height: 200px;
  top: 60%;
  right: 20%;
  animation-delay: 5s;
}

.shape-3 {
  width: 150px;
  height: 150px;
  bottom: 20%;
  left: 30%;
  animation-delay: 10s;
}

.shape-4 {
  width: 250px;
  height: 250px;
  top: 30%;
  right: 10%;
  animation-delay: 15s;
}

.shape-5 {
  width: 180px;
  height: 180px;
  bottom: 40%;
  left: 60%;
  animation-delay: 8s;
}

.particles {
  position: absolute;
  width: 100%;
  height: 100%;
}

.particle {
  position: absolute;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 50%;
  animation: particle-float 20s infinite linear;
  will-change: transform, opacity;
  transform: translateZ(0);
}

.hero-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  position: relative;
  z-index: 2;
}

/* Greeting */
.greeting-text {
  margin-bottom: 1rem;
}

.greeting {
  font-size: 1.5rem;
  font-weight: 600;
  background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: greeting-bounce 2s ease-in-out infinite;
}

/* Hero Title */
.hero-title {
  font-size: 3.5rem;
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 1.5rem;
}

.title-line {
  display: block;
  font-size: 1.2rem;
  font-weight: 400;
  opacity: 0.9;
  margin-bottom: 0.5rem;
}

.title-name {
  display: block;
  font-size: 4rem;
  font-weight: 800;
  background: linear-gradient(45deg, #fff, #f0f0f0, #667eea);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  position: relative;
  margin: 0.5rem 0;
}

/* Glitch Effect */
.glitch-text {
  position: relative;
}

.glitch-text::before,
.glitch-text::after {
  content: attr(data-text);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.glitch-text::before {
  animation: glitch-1 0.5s infinite;
  color: #ff6b6b;
  z-index: -1;
}

.glitch-text::after {
  animation: glitch-2 0.5s infinite;
  color: #4ecdc4;
  z-index: -2;
}

.title-role-container {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.title-role {
  font-size: 1.5rem;
  font-weight: 400;
  opacity: 0.8;
  min-height: 1.5rem;
}

.cursor {
  animation: blink 1s infinite;
  font-size: 1.5rem;
  color: #667eea;
}

/* Hero Description */
.hero-description {
  font-size: 1.1rem;
  opacity: 0.9;
  margin-bottom: 2rem;
  line-height: 1.6;
}

.highlight-text {
  background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: 600;
}

/* Hero Buttons */
.hero-buttons {
  display: flex;
  gap: 1rem;
}

.btn-primary, .btn-secondary {
  padding: 15px 30px;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  display: inline-block;
  position: relative;
  overflow: hidden;
}

.btn-primary {
  background: linear-gradient(45deg, #667eea, #764ba2);
  color: white;
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
}

.btn-primary:hover {
  transform: translateY(-3px);
  box-shadow: 0 15px 35px rgba(102, 126, 234, 0.4);
}

.btn-secondary {
  background: transparent;
  color: white;
  border: 2px solid rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(10px);
}

.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.5);
  transform: translateY(-3px);
}

.btn-shine {
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s;
}

.btn-primary:hover .btn-shine,
.btn-secondary:hover .btn-shine {
  left: 100%;
}

/* Hero Visual */
.hero-visual {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 600px;
}

/* Code Terminal */
.code-terminal {
  position: absolute;
  top: 20px;
  right: 20px;
  width: 300px;
  background: rgba(0, 0, 0, 0.9);
  border-radius: 12px;
  backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  overflow: hidden;
  z-index: 10;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
}

.terminal-header {
  background: rgba(255, 255, 255, 0.1);
  padding: 8px 12px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.terminal-buttons {
  display: flex;
  gap: 4px;
}

.terminal-buttons span {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.btn-close { background: #ff5f56; }
.btn-minimize { background: #ffbd2e; }
.btn-maximize { background: #27ca3f; }

.terminal-title {
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.8rem;
  margin-left: 8px;
}

.terminal-body {
  padding: 12px;
  font-family: 'Courier New', monospace;
}

.code-line {
  display: flex;
  align-items: center;
  gap: 8px;
}

.code-prompt {
  color: #4ecdc4;
  font-weight: bold;
}

.code-text {
  color: #4ecdc4;
  font-size: 0.9rem;
  font-weight: 500;
  text-shadow: 0 0 10px rgba(78, 205, 196, 0.3);
}

/* 3D Floating Cubes */
.floating-elements-3d {
  position: absolute;
  width: 100%;
  height: 100%;
}

.floating-cube {
  position: absolute;
  width: 60px;
  height: 60px;
  transform-style: preserve-3d;
  animation: cube-rotate 10s infinite linear;
  will-change: transform;
  transform: translateZ(0);
}

.cube-1 {
  top: 15%;
  left: 5%;
  animation-delay: 0s;
}

.cube-2 {
  top: 70%;
  right: 5%;
  animation-delay: 0s;
}

.cube-3 {
  bottom: 20%;
  left: 10%;
  animation-delay: 0s;
}

.cube-4 {
  top: 50%;
  right: 20%;
  animation-delay: 0s;
}

.cube-face {
  position: absolute;
  width: 60px;
  height: 60px;
  background: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.7rem;
  font-weight: 600;
  backdrop-filter: blur(15px);
  color: white;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2);
}

.cube-face.front { transform: rotateY(0deg) translateZ(30px); }
.cube-face.back { transform: rotateY(180deg) translateZ(30px); }
.cube-face.right { transform: rotateY(90deg) translateZ(30px); }
.cube-face.left { transform: rotateY(-90deg) translateZ(30px); }
.cube-face.top { transform: rotateX(90deg) translateZ(30px); }
.cube-face.bottom { transform: rotateX(-90deg) translateZ(30px); }

/* Central Avatar */
.central-avatar {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.avatar-glow {
  position: absolute;
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, rgba(102, 126, 234, 0.3) 0%, transparent 70%);
  border-radius: 50%;
  animation: avatar-glow 3s ease-in-out infinite;
}

.avatar-ring {
  position: absolute;
  width: 250px;
  height: 250px;
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  animation: avatar-ring 4s linear infinite;
}

.profile-avatar {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background: linear-gradient(45deg, #667eea, #764ba2);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  animation: avatar-pulse 2s ease-in-out infinite;
  box-shadow: 0 0 30px rgba(102, 126, 234, 0.5);
  border: 3px solid rgba(255, 255, 255, 0.2);
}

.avatar-content {
  position: relative;
  z-index: 2;
}

.avatar-icon {
  width: 80px;
  height: 80px;
  color: white;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
}

.avatar-icon svg {
  width: 100%;
  height: 100%;
  stroke: currentColor;
  stroke-width: 2.5;
  fill: none;
  transition: all 0.3s ease;
}

.avatar-icon:hover svg {
  stroke-width: 3;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.4));
}

.avatar-particles {
  position: absolute;
  width: 100%;
  height: 100%;
}

.avatar-particle {
  position: absolute;
  width: 6px;
  height: 6px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 50%;
  animation: avatar-particle-float 3s ease-in-out infinite;
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
}

/* Interactive Floating Elements */
.floating-interactive-area {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
  pointer-events: none;
}

.floating-elements {
  position: absolute;
  width: 100%;
  height: 100%;
}

.floating-element {
  position: absolute;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05));
  backdrop-filter: blur(10px);
  border: 2px solid var(--element-color);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  transform: translate(-50%, -50%);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  pointer-events: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: element-float 6s ease-in-out infinite;
}

.floating-element:hover,
.element-hovered {
  transform: translate(-50%, -50%) scale(1.2);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.4), 0 0 20px var(--element-color);
  border-color: var(--element-color);
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.1));
}

.element-content {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 2;
}

.element-icon {
  font-size: 0.9rem;
  font-weight: 700;
  color: var(--element-color);
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
}

.floating-element:hover .element-icon {
  transform: scale(1.1);
  text-shadow: 0 0 10px var(--element-color);
}

.element-glow {
  position: absolute;
  top: -5px;
  left: -5px;
  right: -5px;
  bottom: -5px;
  border-radius: 50%;
  background: radial-gradient(circle, var(--element-color) 0%, transparent 70%);
  opacity: 0.3;
  animation: glow-pulse 2s ease-in-out infinite;
  z-index: 1;
}

/* Mouse Cursor Effect */
.mouse-cursor-effect {
  position: absolute;
  width: 60px;
  height: 60px;
  border: 2px solid rgba(78, 205, 196, 0.3);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
  animation: cursor-pulse 2s ease-in-out infinite;
  z-index: 10;
}

/* Floating Particles */
.floating-particles {
  position: absolute;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.particle {
  position: absolute;
  width: 4px;
  height: 4px;
  background: rgba(255, 255, 255, 0.6);
  border-radius: 50%;
  animation: particle-drift linear infinite;
}

/* Element-specific animations */
.floating-element:nth-child(1) { animation-delay: 0s; }
.floating-element:nth-child(2) { animation-delay: 0.5s; }
.floating-element:nth-child(3) { animation-delay: 1s; }
.floating-element:nth-child(4) { animation-delay: 1.5s; }
.floating-element:nth-child(5) { animation-delay: 2s; }
.floating-element:nth-child(6) { animation-delay: 2.5s; }
.floating-element:nth-child(7) { animation-delay: 3s; }
.floating-element:nth-child(8) { animation-delay: 3.5s; }

.floating-elements {
  position: absolute;
  width: 100%;
  height: 100%;
}

.floating-card {
  position: absolute;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  padding: 1rem;
  animation: float 6s ease-in-out infinite;
}

.card-1 {
  top: 10%;
  left: 10%;
  animation-delay: 0s;
}

.card-2 {
  top: 60%;
  right: 10%;
  animation-delay: 2s;
}

.card-3 {
  bottom: 20%;
  left: 20%;
  animation-delay: 4s;
}

.card-content {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.card-icon {
  font-size: 1.5rem;
}

.profile-placeholder {
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 3px solid rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  animation: pulse 2s ease-in-out infinite;
}

.profile-avatar {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background: linear-gradient(45deg, #fff, #f0f0f0);
  display: flex;
  align-items: center;
  justify-content: center;
}

.avatar-text {
  font-size: 3rem;
  font-weight: 700;
  color: #667eea;
}

/* Enhanced Scroll Indicator */
.scroll-indicator {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  z-index: 10;
}

.scroll-text {
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.7);
  font-weight: 500;
  letter-spacing: 2px;
  animation: scroll-text-pulse 2s ease-in-out infinite;
}

.scroll-arrow {
  position: relative;
  animation: scroll-bounce 2s infinite;
}

.arrow-line {
  width: 2px;
  height: 30px;
  background: linear-gradient(to bottom, rgba(255, 255, 255, 0.8), transparent);
}

.arrow-head {
  position: absolute;
  bottom: 0;
  left: -4px;
  width: 10px;
  height: 10px;
  border-right: 2px solid rgba(255, 255, 255, 0.8);
  border-bottom: 2px solid rgba(255, 255, 255, 0.8);
  transform: rotate(45deg);
}


/* Section Styles */
.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 3rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* About Section */
.about-section {
  padding: 5rem 0;
  background: #f8fafc;
}

.about-content {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 4rem;
  align-items: start;
}

.about-intro h3 {
  font-size: 1.8rem;
  margin-bottom: 1rem;
  color: #333;
}

.about-intro p {
  font-size: 1.1rem;
  line-height: 1.7;
  margin-bottom: 2rem;
  color: #666;
}

.skills-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

.skill-category h4 {
  font-size: 1.2rem;
  margin-bottom: 1rem;
  color: #333;
}

.skill-category ul {
  list-style: none;
}

.skill-category li {
  padding: 0.5rem 0;
  color: #666;
  border-bottom: 1px solid #e2e8f0;
}

.about-stats {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.stat-item {
  text-align: center;
  padding: 1.5rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

.stat-number {
  font-size: 2.5rem;
  font-weight: 700;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.stat-label {
  font-size: 1rem;
  color: #666;
  margin-top: 0.5rem;
}

/* Projects Section */
.projects-section {
  padding: 5rem 0;
  background: white;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.project-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  border: 1px solid #e2e8f0;
}

.project-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

.project-image {
  height: 200px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
}

.project-placeholder {
  text-align: center;
}

.project-icon {
  font-size: 3rem;
}

.project-content {
  padding: 1.5rem;
}

.project-title {
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #333;
}

.project-description {
  color: #666;
  margin-bottom: 1rem;
  line-height: 1.6;
}

.project-tech {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.tech-tag {
  background: #f1f5f9;
  color: #475569;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.875rem;
}

.project-links {
  display: flex;
  gap: 1rem;
}

.project-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #667eea;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
}

.project-link:hover {
  color: #764ba2;
}

/* Contact Section */
.contact-section {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 5rem 0 2rem;
}

.contact-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  margin-bottom: 3rem;
}

.contact-info h3 {
  font-size: 1.8rem;
  margin-bottom: 1rem;
}

.contact-info p {
  font-size: 1.1rem;
  opacity: 0.9;
  margin-bottom: 2rem;
  line-height: 1.6;
}

.contact-methods {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.contact-method {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  text-decoration: none;
  color: white;
  transition: all 0.3s ease;
}

.contact-method:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateX(5px);
}

.method-icon {
  font-size: 1.5rem;
}

.method-label {
  display: block;
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.method-value {
  display: block;
  opacity: 0.8;
}

.social-links h3 {
  font-size: 1.8rem;
  margin-bottom: 1rem;
}

.social-grid {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.social-link {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  text-decoration: none;
  color: white;
  transition: all 0.3s ease;
}

.social-link:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateX(5px);
}

.social-icon {
  width: 24px;
  height: 24px;
}

.footer-bottom {
  text-align: center;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  opacity: 0.8;
}

/* Animations */
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% { transform: translateX(-50%) translateY(0); }
  40% { transform: translateX(-50%) translateY(-10px); }
  60% { transform: translateX(-50%) translateY(-5px); }
}

/* New Revolutionary Animations */
@keyframes float-shape {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-30px) rotate(180deg); }
}

@keyframes particle-float {
  0% { 
    transform: translateY(100vh) translateX(0px); 
    opacity: 0; 
  }
  10% { 
    opacity: 1; 
  }
  90% { 
    opacity: 1; 
  }
  100% { 
    transform: translateY(-100px) translateX(100px); 
    opacity: 0; 
  }
}

@keyframes greeting-bounce {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-5px); }
}

@keyframes glitch-1 {
  0%, 100% { transform: translate(0); }
  20% { transform: translate(-2px, 2px); }
  40% { transform: translate(-2px, -2px); }
  60% { transform: translate(2px, 2px); }
  80% { transform: translate(2px, -2px); }
}

@keyframes glitch-2 {
  0%, 100% { transform: translate(0); }
  20% { transform: translate(2px, 2px); }
  40% { transform: translate(2px, -2px); }
  60% { transform: translate(-2px, 2px); }
  80% { transform: translate(-2px, -2px); }
}

@keyframes blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}

@keyframes cube-rotate {
  0% { transform: rotateX(0deg) rotateY(0deg); }
  100% { transform: rotateX(360deg) rotateY(360deg); }
}

@keyframes avatar-glow {
  0%, 100% { opacity: 0.3; transform: scale(1); }
  50% { opacity: 0.6; transform: scale(1.1); }
}

@keyframes avatar-ring {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@keyframes avatar-pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

@keyframes avatar-particle-float {
  0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.8; }
  50% { transform: translate(0, -20px) scale(1.2); opacity: 1; }
}

@keyframes element-float {
  0%, 100% { 
    transform: translate(-50%, -50%) translateY(0px); 
  }
  50% { 
    transform: translate(-50%, -50%) translateY(-10px); 
  }
}

@keyframes glow-pulse {
  0%, 100% { 
    opacity: 0.3; 
    transform: scale(1); 
  }
  50% { 
    opacity: 0.6; 
    transform: scale(1.1); 
  }
}

@keyframes cursor-pulse {
  0%, 100% { 
    transform: translate(-50%, -50%) scale(1); 
    opacity: 0.3; 
  }
  50% { 
    transform: translate(-50%, -50%) scale(1.2); 
    opacity: 0.6; 
  }
}

@keyframes particle-drift {
  0% { 
    transform: translateY(0px) translateX(0px); 
    opacity: 0; 
  }
  10% { 
    opacity: 1; 
  }
  90% { 
    opacity: 1; 
  }
  100% { 
    transform: translateY(-100px) translateX(50px); 
    opacity: 0; 
  }
}

@keyframes scroll-text-pulse {
  0%, 100% { opacity: 0.7; }
  50% { opacity: 1; }
}

@keyframes scroll-bounce {
  0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-10px); }
  60% { transform: translateY(-5px); }
}

/* Responsive Design */
@media (max-width: 768px) {
  .nav-menu {
    position: fixed;
    left: -100%;
    top: 70px;
    flex-direction: column;
    background-color: white;
    width: 100%;
    text-align: center;
    transition: 0.3s;
    box-shadow: 0 10px 27px rgba(0, 0, 0, 0.05);
    padding: 2rem 0;
  }

  .nav-menu-active {
    left: 0;
  }

  .nav-toggle {
    display: flex;
  }

  .hero-content {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 2rem;
  }

  .hero-title {
    font-size: 2.5rem;
  }

  .about-content {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .skills-grid {
    grid-template-columns: 1fr;
  }

  .contact-content {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .hero-buttons {
    justify-content: center;
  }

  .floating-elements-3d {
    display: block;
  }

  .floating-cube {
    width: 40px;
    height: 40px;
  }

  .cube-face {
    width: 40px;
    height: 40px;
    font-size: 0.6rem;
  }

  .cube-face.front { transform: rotateY(0deg) translateZ(20px); }
  .cube-face.back { transform: rotateY(180deg) translateZ(20px); }
  .cube-face.right { transform: rotateY(90deg) translateZ(20px); }
  .cube-face.left { transform: rotateY(-90deg) translateZ(20px); }
  .cube-face.top { transform: rotateX(90deg) translateZ(20px); }
  .cube-face.bottom { transform: rotateX(-90deg) translateZ(20px); }

  .cube-1 {
    top: 10%;
    left: 5%;
  }

  .cube-2 {
    top: 60%;
    right: 5%;
  }

  .cube-3 {
    bottom: 15%;
    left: 5%;
  }

  .cube-4 {
    top: 40%;
    right: 5%;
  }

  .code-terminal {
    width: 250px;
    top: 10px;
    right: 10px;
  }

  .profile-avatar {
    width: 150px;
    height: 150px;
  }

  .avatar-icon {
    width: 60px;
    height: 60px;
  }

  .avatar-glow {
    width: 200px;
    height: 200px;
  }

  .avatar-ring {
    width: 180px;
    height: 180px;
  }

  .floating-element {
    width: 35px !important;
    height: 35px !important;
  }

  .element-icon {
    font-size: 0.7rem;
  }

  .mouse-cursor-effect {
    width: 50px;
    height: 50px;
  }

  .particle {
    width: 3px;
    height: 3px;
  }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: 2rem;
  }

  .section-title {
    font-size: 2rem;
  }

  .projects-grid {
    grid-template-columns: 1fr;
  }

  .hero-buttons {
    flex-direction: column;
    align-items: center;
  }

  .btn-primary, .btn-secondary {
    width: 100%;
    max-width: 200px;
  }

  .floating-cube {
    width: 35px;
    height: 35px;
  }

  .cube-face {
    width: 35px;
    height: 35px;
    font-size: 0.5rem;
  }

  .cube-face.front { transform: rotateY(0deg) translateZ(17.5px); }
  .cube-face.back { transform: rotateY(180deg) translateZ(17.5px); }
  .cube-face.right { transform: rotateY(90deg) translateZ(17.5px); }
  .cube-face.left { transform: rotateY(-90deg) translateZ(17.5px); }
  .cube-face.top { transform: rotateX(90deg) translateZ(17.5px); }
  .cube-face.bottom { transform: rotateX(-90deg) translateZ(17.5px); }

  .cube-1 {
    top: 8%;
    left: 3%;
  }

  .cube-2 {
    top: 65%;
    right: 3%;
  }

  .cube-3 {
    bottom: 12%;
    left: 3%;
  }

  .cube-4 {
    top: 45%;
    right: 3%;
  }

  .floating-element {
    width: 30px !important;
    height: 30px !important;
  }

  .element-icon {
    font-size: 0.6rem;
  }

  .mouse-cursor-effect {
    width: 40px;
    height: 40px;
  }

  .particle {
    width: 2px;
    height: 2px;
  }
}
</style>
