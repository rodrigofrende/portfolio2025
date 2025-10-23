<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import HeroSection from './components/HeroSection.vue'
import CustomCursor from './components/CustomCursor.vue'
import ScrollReveal from './components/ScrollReveal.vue'
import ModernHeader from './components/ModernHeader.vue'
import ScrollToTop from './components/ScrollToTop.vue'
import { realProjects, getBestProjectImage } from './data/projects'

const { t, locale } = useI18n()

// Reactive data
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

// Modern particle field
const particleField = ref<HTMLElement>()
const mousePosition = ref({ x: 0, y: 0 })
const fieldWidth = ref(400)
const fieldHeight = ref(400)

// Floating text elements
const floatingTexts = ref<Array<{
  id: number
  x: number
  y: number
  text: string
  type: string
  opacity: number
  scale: number
  originalX: number
  originalY: number
}>>([])

// Tech tags
const techTags = ref<Array<{
  id: number
  x: number
  y: number
  name: string
  opacity: number
}>>([])

// Typing animation
const typingText = ref('')
const typingIndex = ref(0)
const typingSpeed = ref(100)
const typingMessages = [
  'Desarrollador Frontend',
  'Especialista en Vue.js',
  'Diseñador de Interfaces',
  'Creador de Experiencias Digitales'
]

let textId = 0
let tagId = 0

// Tech stack data moved to HeroSection component

// Real projects data from GitHub repos
const projects = computed(() => {
  return realProjects.map((project) => ({
    ...project,
    // Generate automatic screenshot URL
    imageUrl: getBestProjectImage(project)
  }))
})

// About value items - handle i18n array properly
const valueItems = computed(() => {
  try {
    // Try to get the items directly as an array
    const items = t('about.value.items') as unknown
    if (Array.isArray(items)) {
      return items
    }
    // Fallback: return hardcoded messages based on current locale
    const currentLocale = locale.value || 'es'
    const messages = currentLocale === 'es' ? [
      'Desarrollo de aplicaciones web modernas con Vue.js/React y TypeScript',
      'Despliegue e integración con AWS, Azure, Firebase y arquitecturas serverless',
      'Diseño de interfaces responsivas con CSS3, Tailwind y animaciones fluidas',
      'Trabajo con metodologías ágiles (SCRUM) y armado de requisitos funcionales',
      'Optimización de rendimiento y mejores prácticas de accesibilidad (a11y)',
      'Detección proactiva de errores y análisis crítico de arquitectura',
      'Mentalidad orientada a resultados y atención al detalle'
    ] : [
      'Modern web application development with Vue.js/React and TypeScript',
      'Deployment and integration with AWS, Azure, Firebase, and serverless architectures',
      'Responsive interface design with CSS3, Tailwind, and smooth animations',
      'Working with agile methodologies (SCRUM) and building functional requirements',
      'Performance optimization and accessibility best practices (a11y)',
      'Proactive error detection and critical architecture analysis',
      'Results-oriented mindset and attention to detail'
    ]
    return messages
  } catch (error) {
    console.error('Error loading value items:', error)
    return []
  }
})

// Navigation methods moved to ModernHeader component

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
  for (let i = 0; i < 15; i++) {
    const size = Math.random() * 4 + 2
    const left = Math.random() * 100
    const top = Math.random() * 100
    const animationDelay = Math.random() * 10
    const animationDuration = 15 + Math.random() * 10
    
    styles.push({
      width: `${size}px`,
      height: `${size}px`,
      left: `${left}%`,
      top: `${top}%`,
      animationDelay: `${animationDelay}s`,
      animationDuration: `${animationDuration}s`
    })
  }
  return styles
}

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

// Text field functions
const createFloatingTexts = () => {
  const texts = [
    { text: 'Vue.js', type: 'framework' },
    { text: 'TypeScript', type: 'language' },
    { text: 'CSS3', type: 'style' },
    { text: 'HTML5', type: 'markup' },
    { text: 'JavaScript', type: 'language' },
    { text: 'Node.js', type: 'framework' },
    { text: 'Git', type: 'tool' },
    { text: 'API', type: 'concept' }
  ]
  
  texts.forEach((textData, index) => {
    const x = 50 + (index * 80) % 300
    const y = 100 + Math.random() * 200
    
    floatingTexts.value.push({
      id: textId++,
      x,
      y,
      originalX: x,
      originalY: y,
      text: textData.text,
      type: textData.type,
      opacity: Math.random() * 0.7 + 0.3,
      scale: 1
    })
  })
}

const createTechTags = () => {
  const tags = ['Frontend', 'Backend', 'Full Stack', 'Mobile', 'Web', 'Desktop', 'Cloud', 'DevOps']
  
  tags.forEach((tagName) => {
    const x = Math.random() * fieldWidth.value
    const y = Math.random() * fieldHeight.value
    
    techTags.value.push({
      id: tagId++,
      x,
      y,
      name: tagName,
      opacity: Math.random() * 0.5 + 0.2
    })
  })
}

const updateFloatingTexts = () => {
  floatingTexts.value.forEach(textElement => {
    // Mouse interaction - subtle attraction
    const dx = mousePosition.value.x - textElement.x
    const dy = mousePosition.value.y - textElement.y
    const distance = Math.sqrt(dx * dx + dy * dy)
    
    if (distance < 100) {
      const force = (100 - distance) / 100
      const angle = Math.atan2(dy, dx)
      
      // Subtle movement towards mouse
      textElement.x += Math.cos(angle) * force * 0.3
      textElement.y += Math.sin(angle) * force * 0.3
      
      // Increase opacity and scale when near mouse
      textElement.opacity = Math.min(1, textElement.opacity + force * 0.2)
      textElement.scale = Math.min(1.2, textElement.scale + force * 0.1)
    } else {
      // Return to original position slowly
      textElement.x += (textElement.originalX - textElement.x) * 0.01
      textElement.y += (textElement.originalY - textElement.y) * 0.01
      
      // Reset opacity and scale
      textElement.opacity = Math.max(0.3, textElement.opacity - 0.01)
      textElement.scale = Math.max(1, textElement.scale - 0.01)
    }
    
    // Keep texts within bounds
    textElement.x = Math.max(0, Math.min(fieldWidth.value, textElement.x))
    textElement.y = Math.max(0, Math.min(fieldHeight.value, textElement.y))
  })
}

const updateTechTags = () => {
  techTags.value.forEach(tag => {
    // Random floating movement
    tag.x += (Math.random() - 0.5) * 0.2
    tag.y += (Math.random() - 0.5) * 0.2
    
    // Keep tags within bounds
    tag.x = Math.max(0, Math.min(fieldWidth.value, tag.x))
    tag.y = Math.max(0, Math.min(fieldHeight.value, tag.y))
    
    // Subtle opacity animation
    tag.opacity += (Math.random() - 0.5) * 0.02
    tag.opacity = Math.max(0.2, Math.min(0.7, tag.opacity))
  })
}


const handleMouseMove = (e: MouseEvent) => {
  const rect = particleField.value?.getBoundingClientRect()
  if (rect) {
    mousePosition.value = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    }
  }
}

const startTypingAnimation = () => {
  let currentMessageIndex = 0
  
  const typeNextMessage = () => {
    const message = typingMessages[currentMessageIndex]
    if (message) {
      typingText.value = ''
      typingIndex.value = 0
      
      const typeChar = () => {
        if (typingIndex.value < message.length) {
          typingText.value += message[typingIndex.value]
          typingIndex.value++
          setTimeout(typeChar, typingSpeed.value)
        } else {
          // Wait before next message
          setTimeout(() => {
            currentMessageIndex = (currentMessageIndex + 1) % typingMessages.length
            typeNextMessage()
          }, 2000)
        }
      }
      
      typeChar()
    }
  }
  
  typeNextMessage()
}

const startAnimation = () => {
  const animate = () => {
    updateFloatingTexts()
    updateTechTags()
    requestAnimationFrame(animate)
  }
  animate()
}

// getTechIcon function moved to HeroSection component



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
  window.addEventListener('mousemove', handleMouseMove)
  
  // Generate particle styles once
  particleStyles.value = generateParticleStyles()
  avatarParticleStyles.value = generateAvatarParticleStyles()
  
  // Create animated text field
  createFloatingTexts()
  createTechTags()
  startTypingAnimation()
  startAnimation()
  
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
  window.removeEventListener('mousemove', handleMouseMove)
  if (roleInterval !== undefined) clearInterval(roleInterval)
  if (codeInterval !== undefined) clearInterval(codeInterval)
})
</script>

<template>
  <div id="app">
    <!-- Custom Cursor -->
    <CustomCursor />
    
    <!-- Modern Header -->
    <ModernHeader />

    <!-- New Hero Section -->
    <HeroSection id="home" />

    <!-- Terminal Transition Element -->
    <div class="terminal-transition">
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
    </div>

    <!-- About Section -->
    <ScrollReveal :delay="100">
      <section id="about" class="about-section">
        <div class="container">
          <h2 class="section-title">{{ t('about.title') }}</h2>
          
          <div class="about-grid">
            <!-- Left Column: Introduction & Story -->
            <div class="about-main">
              <p class="about-headline">{{ t('about.headline') }}</p>
              <p class="about-intro">{{ t('about.intro') }}</p>

              <!-- Journey Card -->
              <div class="about-card">
                <div class="card-icon">🚀</div>
                <h3 class="card-title">{{ t('about.journey.title') }}</h3>
                <p class="card-text">{{ t('about.journey.text') }}</p>
              </div>

              <!-- Approach Card -->
              <div class="about-card">
                <div class="card-icon">💡</div>
                <h3 class="card-title">{{ t('about.approach.title') }}</h3>
                <p class="card-text">{{ t('about.approach.text') }}</p>
              </div>
            </div>

            <!-- Right Column: Skills & CV -->
            <div class="about-sidebar">
              <!-- Value Proposition Card -->
              <div class="value-card">
                <h3 class="value-title">{{ t('about.value.title') }}</h3>
                <ul class="value-list">
                  <li v-for="(item, index) in valueItems" :key="index" class="value-item">
                    <svg class="check-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    <span>{{ item }}</span>
                  </li>
                </ul>
              </div>

              <!-- CV Download Card -->
              <div class="cv-card">
                <div class="cv-header">
                  <svg class="cv-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                    <polyline points="14 2 14 8 20 8"/>
                    <line x1="16" y1="13" x2="8" y2="13"/>
                    <line x1="16" y1="17" x2="8" y2="17"/>
                    <polyline points="10 9 9 9 8 9"/>
                  </svg>
                  <h3 class="cv-title">{{ t('about.cv.title') }}</h3>
                </div>
                <p class="cv-description">{{ t('about.cv.download') }}</p>
                <div class="cv-buttons">
                  <a 
                    href="/CV2025-ES.pdf" 
                    download="Rodrigo_Frende_CV_ES.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="cv-button cv-button-primary"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                      <polyline points="7 10 12 15 17 10"/>
                      <line x1="12" y1="15" x2="12" y2="3"/>
                    </svg>
                    <span>{{ t('about.cv.spanish') }}</span>
                  </a>
                  <a 
                    href="/CV2025-EN.pdf" 
                    download="Rodrigo_Frende_CV_EN.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="cv-button cv-button-secondary"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                      <polyline points="7 10 12 15 17 10"/>
                      <line x1="12" y1="15" x2="12" y2="3"/>
                    </svg>
                    <span>{{ t('about.cv.english') }}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </ScrollReveal>

    <!-- Projects Section -->
    <ScrollReveal :delay="150">
      <section id="projects" class="projects-section">
        <div class="container">
          <h2 class="section-title">{{ t('projects.title') }}</h2>
        <div class="projects-grid">
          <div class="project-card" v-for="project in projects" :key="project.id">
            <div class="project-image-wrapper">
              <img 
                v-if="project.imageUrl && !project.imageUrl.startsWith('linear-gradient')"
                :src="project.imageUrl" 
                :alt="`${project.title} preview`"
                class="project-screenshot"
                loading="lazy"
                @error="(e) => (e.target as HTMLImageElement).style.display = 'none'"
              />
              <div 
                v-else
                class="project-image-fallback"
                :style="{ background: project.imageUrl }"
              >
                <span class="project-icon">{{ project.icon }}</span>
              </div>
              <!-- Featured Badge -->
              <div v-if="project.featured && !project.wip" class="project-featured-badge">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
                <span>Featured</span>
              </div>
              <!-- Work in Progress Badge -->
              <div v-if="project.wip" class="project-wip-badge">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12 6 12 12 16 14"/>
                </svg>
                <span>Work in Progress</span>
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
                <a :href="project.github" target="_blank" rel="noopener noreferrer" class="project-link">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  <span>GitHub</span>
                </a>
                <a v-if="project.demo && project.demo !== '#'" :href="project.demo" target="_blank" rel="noopener noreferrer" class="project-link project-link-primary">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                    <polyline points="15 3 21 3 21 9"/>
                    <line x1="10" y1="14" x2="21" y2="3"/>
                  </svg>
                  <span>Live Demo</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    </ScrollReveal>

    <!-- Contact Section -->
    <ScrollReveal :delay="200">
      <footer id="contact" class="contact-section">
        <div class="container">
          <h2 class="section-title">{{ t('contact.title') }}</h2>
        <div class="contact-content">
          <div class="contact-info">
            <h3>{{ t('contact.heading') }}</h3>
            <p>{{ t('contact.description') }}</p>
            <div class="contact-methods">
              <a href="mailto:rodrigo.frende@gmail.com" class="contact-method">
                <div class="method-icon">📧</div>
                <div class="method-info">
                  <span class="method-label">{{ t('contact.email.label') }}</span>
                  <span class="method-value">{{ t('contact.email.value') }}</span>
                </div>
              </a>
            </div>
          </div>
          <div class="social-links">
            <h3>{{ t('contact.social.title') }}</h3>
            <div class="social-grid">
              <a href="https://github.com/rodrigofrende" target="_blank" class="social-link">
                <div class="social-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </div>
                <span>{{ t('contact.social.github') }}</span>
              </a>
              <a href="https://linkedin.com/in/rodrigofrende" target="_blank" class="social-link">
                <div class="social-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </div>
                <span>{{ t('contact.social.linkedin') }}</span>
              </a>
              <a href="https://instagram.com/rf.3d.prints" target="_blank" class="social-link">
                <div class="social-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </div>
                <span>{{ t('contact.social.instagram') }}</span>
              </a>
            </div>
          </div>
        </div>
        <div class="footer-bottom">
          <p>&copy; {{ new Date().getFullYear() }} {{ t('contact.footer.rights') }}</p>
        </div>
      </div>
    </footer>
    </ScrollReveal>

    <!-- Scroll to Top Button -->
    <ScrollToTop />
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

/* Old navigation styles removed - using ModernHeader component */

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
  max-width: 1600px;
  margin: 0 auto;
  margin-top: 100px;
  padding: 0 60px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6rem;
  align-items: center;
  justify-items: stretch;
  position: relative;
  z-index: 2;
  min-height: 90vh;
  width: 100%;
  max-width: 100vw;
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
  font-size: 3rem;
  font-weight: 700;
  line-height: 1.1;
  margin-bottom: 1.5rem;
  animation: title-fade-in 1s ease-out;
  width: 100%;
}

.title-line {
  display: block;
  font-size: 1.1rem;
  font-weight: 400;
  opacity: 0.9;
  margin-bottom: 0.5rem;
  width: 100%;
}

.title-name {
  display: block;
  font-size: 3.2rem;
  font-weight: 800;
  background: linear-gradient(45deg, #fff, #f0f0f0, #667eea);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  position: relative;
  margin: 0.5rem 0;
  width: 100%;
  word-wrap: break-word;
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
  font-size: 0.85rem;
  color: #58a6ff;
  font-weight: 400;
  text-shadow: 0 0 8px rgba(88, 166, 255, 0.5);
}

/* Hero Description */
.hero-description {
  font-size: 1.1rem;
  opacity: 0.9;
  margin-bottom: 2rem;
  line-height: 1.6;
  animation: description-fade-in 1.2s ease-out 0.3s both;
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
  animation: buttons-fade-in 1.5s ease-out 0.6s both;
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

/* Hero Text */
.hero-text {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  height: 100%;
  padding: 3rem 2rem;
  max-width: none;
}

/* Hero Visual */
.hero-visual {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 2rem;
  min-height: 500px;
}

/* Terminal Transition Element */
.terminal-transition {
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 2;
  width: 100%;
  background: linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%);
  padding: 2rem 0;
}

/* Code Terminal */
.code-terminal {
  position: relative;
  width: 650px;
  height: 220px;
  flex-shrink: 0;
  background: #1a1a1a;
  border-radius: 18px;
  overflow: hidden;
  z-index: 10;
  box-shadow: 
    0 16px 64px rgba(0, 0, 0, 0.5),
    0 0 0 1px rgba(255, 255, 255, 0.15),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  font-family: 'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', monospace;
  transition: all 0.3s ease;
  margin: 0 auto;
}

.code-terminal:hover {
  transform: translateY(-6px);
  box-shadow: 
    0 20px 60px rgba(0, 0, 0, 0.6),
    0 0 0 1px rgba(255, 255, 255, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.15);
}

.terminal-header {
  background: linear-gradient(to bottom, #2d2d2d, #1a1a1a);
  padding: 12px 16px;
  display: flex;
  align-items: center;
  gap: 12px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  position: relative;
}

.terminal-header::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(to right, transparent, rgba(255, 255, 255, 0.2), transparent);
}

.terminal-buttons {
  display: flex;
  gap: 6px;
}

.terminal-buttons span {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  position: relative;
  transition: all 0.2s ease;
  cursor: pointer;
}

.terminal-buttons span:hover {
  transform: scale(1.1);
}

.btn-close { 
  background: #ff5f56; 
  box-shadow: 0 0 0 1px rgba(255, 95, 86, 0.3);
}

.btn-minimize { 
  background: #ffbd2e; 
  box-shadow: 0 0 0 1px rgba(255, 189, 46, 0.3);
}

.btn-maximize { 
  background: #27ca3f; 
  box-shadow: 0 0 0 1px rgba(39, 202, 63, 0.3);
}

.terminal-title {
  color: #ffffff;
  font-size: 0.9rem;
  font-weight: 500;
  margin-left: 12px;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
  letter-spacing: 0.5px;
}

.terminal-body {
  padding: 24px;
  background: #0d1117;
  height: calc(100% - 48px);
  position: relative;
  display: flex;
  align-items: center;
}

.terminal-body::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(to right, transparent, rgba(255, 255, 255, 0.1), transparent);
}

.code-line {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 1rem;
  line-height: 1.5;
}

.code-prompt {
  color: #58a6ff;
  font-weight: 600;
  font-size: 1.1rem;
  text-shadow: 0 0 8px rgba(88, 166, 255, 0.3);
}

.code-text {
  color: #f0f6fc;
  font-size: 1rem;
  font-weight: 400;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
  letter-spacing: 0.3px;
}

/* Tech Showcase */
.tech-showcase {
  position: relative;
  width: 100%;
  max-width: 600px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 24px;
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 3.5rem;
  box-shadow: 0 12px 48px rgba(0, 0, 0, 0.3);
  animation: showcase-fade-in 1s ease-out;
  margin: 0 auto;
  height: fit-content;
}

.showcase-header {
  text-align: center;
  margin-bottom: 2rem;
}

.showcase-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: white;
  margin-bottom: 0.5rem;
  background: linear-gradient(45deg, #667eea, #764ba2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.showcase-subtitle {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
  font-weight: 400;
}

.tech-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  margin-bottom: 2rem;
  justify-items: center;
  align-items: stretch;
  width: 100%;
}

.tech-item {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  padding: 0.9rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
  animation: tech-item-slide-in 0.6s ease-out var(--delay);
  animation-fill-mode: both;
  width: 100%;
  max-width: 100px;
  min-height: 85px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: center;
  position: relative;
}

.tech-item:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
}

.tech-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.75rem;
  position: relative;
}

.tech-icon {
  display: flex;
  justify-content: center;
  flex: 1;
}

.icon-wrapper {
  width: 28px;
  height: 28px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 0.8rem;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.tech-svg-icon {
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.tech-svg-icon svg {
  width: 100%;
  height: 100%;
  fill: currentColor;
  transition: all 0.3s ease;
}

.icon-text {
  font-weight: 700;
  font-size: 0.9rem;
  color: white;
}

.icon-wrapper.framework {
  background: linear-gradient(45deg, #4f46e5, #7c3aed);
  color: white;
}

.icon-wrapper.language {
  background: linear-gradient(45deg, #f59e0b, #f97316);
  color: white;
}

.icon-wrapper.style {
  background: linear-gradient(45deg, #ec4899, #be185d);
  color: white;
}

.icon-wrapper.backend {
  background: linear-gradient(45deg, #10b981, #059669);
  color: white;
}

.icon-wrapper.cloud {
  background: linear-gradient(45deg, #3b82f6, #1d4ed8);
  color: white;
}

.icon-wrapper.tool {
  background: linear-gradient(45deg, #8b5cf6, #7c3aed);
  color: white;
}

.icon-wrapper.design {
  background: linear-gradient(45deg, #f59e0b, #d97706);
  color: white;
}

/* Level Indicator Bars */
.level-indicator {
  position: absolute;
  top: 6px;
  right: 6px;
  width: 10px;
  height: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

.level-bars {
  display: flex;
  flex-direction: column;
  gap: 1px;
  width: 100%;
  height: 100%;
}

.bar {
  height: 4px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 1px;
  transition: all 0.3s ease;
  width: 100%;
}

.bar-1 { height: 4px; }
.bar-2 { height: 4px; }
.bar-3 { height: 4px; }

/* Dynamic bar filling based on level - Expert (90%+) */
.level-bars[style*="--level: 90%"] .bar-1,
.level-bars[style*="--level: 90%"] .bar-2,
.level-bars[style*="--level: 90%"] .bar-3,
.level-bars[style*="--level: 92%"] .bar-1,
.level-bars[style*="--level: 92%"] .bar-2,
.level-bars[style*="--level: 92%"] .bar-3,
.level-bars[style*="--level: 95%"] .bar-1,
.level-bars[style*="--level: 95%"] .bar-2,
.level-bars[style*="--level: 95%"] .bar-3 { 
  background: rgba(255, 255, 255, 0.9); 
}

/* Advanced (80-89%) */
.level-bars[style*="--level: 80%"] .bar-1,
.level-bars[style*="--level: 80%"] .bar-2,
.level-bars[style*="--level: 80%"] .bar-3,
.level-bars[style*="--level: 82%"] .bar-1,
.level-bars[style*="--level: 82%"] .bar-2,
.level-bars[style*="--level: 82%"] .bar-3,
.level-bars[style*="--level: 85%"] .bar-1,
.level-bars[style*="--level: 85%"] .bar-2,
.level-bars[style*="--level: 85%"] .bar-3,
.level-bars[style*="--level: 88%"] .bar-1,
.level-bars[style*="--level: 88%"] .bar-2,
.level-bars[style*="--level: 88%"] .bar-3 { 
  background: rgba(255, 255, 255, 0.8); 
}

/* Intermediate (70-79%) */
.level-bars[style*="--level: 70%"] .bar-1,
.level-bars[style*="--level: 70%"] .bar-2,
.level-bars[style*="--level: 72%"] .bar-1,
.level-bars[style*="--level: 72%"] .bar-2,
.level-bars[style*="--level: 75%"] .bar-1,
.level-bars[style*="--level: 75%"] .bar-2 { 
  background: rgba(255, 255, 255, 0.7); 
}

.tech-info {
  text-align: center;
  margin-bottom: 0;
}

.tech-name {
  display: block;
  color: white;
  font-weight: 600;
  font-size: 0.75rem;
  margin-bottom: 0.25rem;
}

.tech-level {
  display: block;
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.75rem;
  font-weight: 400;
}

.tech-progress {
  height: 4px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 2px;
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  background: linear-gradient(90deg, #667eea, #764ba2);
  border-radius: 2px;
  width: var(--progress);
  transition: width 1s ease-out;
  animation: progress-fill 1.5s ease-out var(--delay);
  animation-fill-mode: both;
}



.stat-card {
  flex: 1;
  text-align: center;
  padding: 1rem 0.5rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}

.stat-card:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: translateY(-2px);
}

.stat-icon {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}

.stat-value {
  display: block;
  color: white;
  font-weight: 600;
  font-size: 0.9rem;
  margin-bottom: 0.25rem;
}

.stat-label {
  display: block;
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.75rem;
  font-weight: 400;
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
/* Animated Text Field */
.text-field {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
  pointer-events: auto;
  cursor: none;
}

.floating-texts {
  position: absolute;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.floating-text {
  position: absolute;
  color: rgba(255, 255, 255, var(--text-opacity));
  font-size: 1.2rem;
  font-weight: 600;
  transform: translate(-50%, -50%) scale(var(--text-scale));
  transition: all 0.3s ease;
  pointer-events: none;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
  animation: text-float 6s ease-in-out infinite;
}

/* Text type variations */
.floating-text.framework {
  color: rgba(0, 212, 255, var(--text-opacity));
}

.floating-text.language {
  color: rgba(124, 58, 237, var(--text-opacity));
}

.floating-text.style {
  color: rgba(236, 72, 153, var(--text-opacity));
}

.floating-text.markup {
  color: rgba(16, 185, 129, var(--text-opacity));
}

.floating-text.tool {
  color: rgba(245, 158, 11, var(--text-opacity));
}

.floating-text.concept {
  color: rgba(239, 68, 68, var(--text-opacity));
}

/* Typing Animation */
.typing-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
}

.typing-text {
  font-size: 1.5rem;
  color: rgba(255, 255, 255, 0.9);
  text-align: center;
  font-weight: 700;
}

.typing-content {
  text-shadow: 0 0 20px rgba(255, 255, 255, 0.8);
}

.typing-cursor {
  animation: cursor-blink 1s infinite;
  color: rgba(0, 212, 255, 0.8);
}

/* Tech Tags */
.tech-tags {
  position: absolute;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.tech-tag {
  position: absolute;
  color: rgba(255, 255, 255, var(--tag-opacity));
  font-size: 0.8rem;
  font-weight: 500;
  transform: translate(-50%, -50%);
  pointer-events: none;
  animation: tag-float 8s ease-in-out infinite;
}

/* Text Animations */
@keyframes text-float {
  0%, 100% { 
    transform: translate(-50%, -50%) scale(var(--text-scale)) translateY(0px);
  }
  50% { 
    transform: translate(-50%, -50%) scale(var(--text-scale)) translateY(-5px);
  }
}

@keyframes cursor-blink {
  0%, 50% { 
    opacity: 1;
  }
  51%, 100% { 
    opacity: 0;
  }
}

@keyframes tag-float {
  0%, 100% { 
    transform: translate(-50%, -50%) translateY(0px);
  }
  50% { 
    transform: translate(-50%, -50%) translateY(-3px);
  }
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
  background: linear-gradient(180deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%);
  position: relative;
  overflow: hidden;
}

.about-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, rgba(102, 126, 234, 0.5), transparent);
}

.about-section::after {
  content: '';
  position: absolute;
  top: 10%;
  right: -10%;
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, rgba(102, 126, 234, 0.15) 0%, transparent 70%);
  border-radius: 50%;
  filter: blur(60px);
  pointer-events: none;
}

.about-section .container {
  position: relative;
  z-index: 1;
}

.about-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2.5rem;
  margin-top: 3rem;
  max-width: 900px;
  margin-left: auto;
  margin-right: auto;
}

/* Left Column */
.about-main {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.about-headline {
  font-size: clamp(1.75rem, 4vw, 2.5rem);
  font-weight: 700;
  line-height: 1.3;
  background: linear-gradient(135deg, #a78bfa 0%, #ec4899 50%, #667eea 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 1rem;
  animation: gradient-shift 8s ease infinite;
  background-size: 200% 200%;
}

@keyframes gradient-shift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

.about-intro {
  font-size: 1.125rem;
  line-height: 1.8;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 1.5rem;
}

.about-card {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
}

.about-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 40px rgba(102, 126, 234, 0.3);
  border-color: rgba(167, 139, 250, 0.4);
  background: rgba(255, 255, 255, 0.08);
}

.card-icon {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  filter: drop-shadow(0 4px 8px rgba(167, 139, 250, 0.5));
  display: inline-block;
}

.card-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 1rem;
}

.card-text {
  font-size: 1.0625rem;
  line-height: 1.8;
  color: rgba(255, 255, 255, 0.75);
}

/* Right Sidebar */
.about-sidebar {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

/* Value Card */
.value-card {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  transition: all 0.4s ease;
}

.value-card:hover {
  box-shadow: 0 12px 40px rgba(102, 126, 234, 0.3);
  border-color: rgba(167, 139, 250, 0.4);
  background: rgba(255, 255, 255, 0.08);
  transform: translateY(-4px);
}

.value-title {
  font-size: 1.375rem;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.value-title::before {
  content: '✨';
  font-size: 1.5rem;
  filter: drop-shadow(0 2px 6px rgba(167, 139, 250, 0.6));
}

.value-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 1.125rem;
}

.value-item {
  display: flex;
  align-items: flex-start;
  gap: 0.875rem;
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.85);
  line-height: 1.7;
  transition: all 0.3s ease;
  padding: 0.5rem 0;
}

.value-item:hover {
  color: rgba(255, 255, 255, 1);
  transform: translateX(4px);
}

.check-icon {
  flex-shrink: 0;
  color: #a78bfa;
  margin-top: 3px;
  filter: drop-shadow(0 2px 4px rgba(167, 139, 250, 0.4));
}

/* CV Download Card */
.cv-card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 20px;
  padding: 2rem;
  color: white;
  box-shadow: 0 12px 40px rgba(102, 126, 234, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.4s ease;
}

.cv-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 16px 48px rgba(102, 126, 234, 0.5);
}

.cv-header {
  display: flex;
  align-items: center;
  gap: 0.875rem;
  margin-bottom: 1.125rem;
}

.cv-icon {
  flex-shrink: 0;
  filter: drop-shadow(0 2px 6px rgba(255, 255, 255, 0.3));
}

.cv-title {
  font-size: 1.375rem;
  font-weight: 700;
  color: white;
}

.cv-description {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.95);
  margin-bottom: 1.75rem;
  line-height: 1.7;
}

.cv-buttons {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.cv-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.625rem;
  padding: 1rem 1.25rem;
  border-radius: 12px;
  font-weight: 600;
  font-size: 0.9375rem;
  text-decoration: none;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: 2px solid transparent;
}

.cv-button svg {
  flex-shrink: 0;
  width: 20px;
  height: 20px;
}

.cv-button-primary {
  background: white;
  color: #667eea;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.cv-button-primary:hover {
  background: #f8fafc;
  transform: translateY(-3px) scale(1.02);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
}

.cv-button-secondary {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border-color: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(10px);
}

.cv-button-secondary:hover {
  background: rgba(255, 255, 255, 0.3);
  border-color: rgba(255, 255, 255, 0.6);
  transform: translateY(-3px) scale(1.02);
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
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid #e2e8f0;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.project-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(102, 126, 234, 0.15);
  border-color: rgba(102, 126, 234, 0.3);
}

/* Project Image Wrapper */
.project-image-wrapper {
  position: relative;
  height: 240px;
  overflow: hidden;
  background: #f8fafc;
}

.project-screenshot {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.project-card:hover .project-screenshot {
  transform: scale(1.05);
}

.project-image-fallback {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.project-icon {
  font-size: 3.5rem;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));
}

/* Featured Badge */
.project-featured-badge {
  position: absolute;
  top: 12px;
  right: 12px;
  background: linear-gradient(135deg, #ffd700 0%, #ffed4e 100%);
  color: #1a202c;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 6px;
  box-shadow: 0 4px 12px rgba(255, 215, 0, 0.4);
  z-index: 10;
}

.project-featured-badge svg {
  width: 14px;
  height: 14px;
}

/* Work in Progress Badge */
.project-wip-badge {
  position: absolute;
  top: 12px;
  right: 12px;
  background: linear-gradient(135deg, #f59e0b 0%, #f97316 100%);
  color: white;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 6px;
  box-shadow: 0 4px 12px rgba(245, 158, 11, 0.4);
  z-index: 10;
  animation: pulse-wip 2s ease-in-out infinite;
}

.project-wip-badge svg {
  width: 14px;
  height: 14px;
  animation: rotate-clock 2s linear infinite;
}

@keyframes pulse-wip {
  0%, 100% {
    box-shadow: 0 4px 12px rgba(245, 158, 11, 0.4);
  }
  50% {
    box-shadow: 0 4px 16px rgba(245, 158, 11, 0.6);
  }
}

@keyframes rotate-clock {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.project-content {
  padding: 1.75rem;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.project-title {
  font-size: 1.4rem;
  font-weight: 700;
  margin-bottom: 0.75rem;
  color: #1a202c;
  line-height: 1.3;
}

.project-description {
  color: #64748b;
  margin-bottom: 1.25rem;
  line-height: 1.7;
  font-size: 0.9375rem;
  flex: 1;
}

.project-tech {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.25rem;
}

.tech-tag {
  background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%);
  color: #475569;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.875rem;
}

.project-links {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.project-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.625rem 1.125rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.875rem;
  transition: all 0.3s ease;
  border: 1px solid #e2e8f0;
  background: white;
  color: #475569;
}

.project-link:hover {
  background: #f8fafc;
  border-color: #cbd5e1;
  transform: translateY(-2px);
}

.project-link svg {
  flex-shrink: 0;
}

.project-link-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-color: transparent;
}

.project-link-primary:hover {
  background: linear-gradient(135deg, #5568d3 0%, #653a8b 100%);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
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

/* Tech Showcase Animations */
@keyframes showcase-fade-in {
  0% { 
    opacity: 0; 
    transform: translateY(20px); 
  }
  100% { 
    opacity: 1; 
    transform: translateY(0); 
  }
}

@keyframes tech-item-slide-in {
  0% { 
    opacity: 0; 
    transform: translateX(-20px); 
  }
  100% { 
    opacity: 1; 
    transform: translateX(0); 
  }
}

@keyframes progress-fill {
  0% { 
    width: 0%; 
  }
  100% { 
    width: var(--progress); 
  }
}

/* Enhanced Animations */
@keyframes title-fade-in {
  0% { 
    opacity: 0; 
    transform: translateY(30px); 
  }
  100% { 
    opacity: 1; 
    transform: translateY(0); 
  }
}

@keyframes description-fade-in {
  0% { 
    opacity: 0; 
    transform: translateY(20px); 
  }
  100% { 
    opacity: 0.9; 
    transform: translateY(0); 
  }
}

@keyframes buttons-fade-in {
  0% { 
    opacity: 0; 
    transform: translateY(20px); 
  }
  100% { 
    opacity: 1; 
    transform: translateY(0); 
  }
}

/* Responsive Design */
@media (max-width: 1400px) {
  .hero-content {
    max-width: 1400px;
    padding: 0 40px;
    gap: 5rem;
  }
  
  .tech-showcase {
    max-width: 550px;
    padding: 3rem;
  }
  
  .tech-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 1.25rem;
  }
  
  .tech-item {
    max-width: 90px;
    min-height: 80px;
  }
}

@media (max-width: 1200px) {
  .hero-content {
    max-width: 1200px;
    padding: 0 30px;
    gap: 4rem;
  }
  
  .tech-showcase {
    max-width: 500px;
    padding: 2.5rem;
  }
  
  .tech-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
  }
  
  .tech-item {
    max-width: 85px;
    min-height: 75px;
  }
  
  .code-terminal {
    width: 600px;
    height: 200px;
  }
}

@media (max-width: 1024px) {
  .hero-content {
    gap: 4rem;
    min-height: 75vh;
    padding: 0 25px;
  }
  
  .hero-title {
    font-size: 3rem;
  }
  
  .title-name {
    font-size: 3.5rem;
  }

  .tech-showcase {
    max-width: 420px;
    padding: 2.25rem;
  }
  
  .tech-grid {
    gap: 1rem;
  }
  
  .tech-item {
    max-width: 100px;
    min-height: 90px;
    padding: 0.8rem;
  }
  
  .code-terminal {
    width: 550px;
    height: 180px;
  }

}

/* Desktop - 2 column layout for about section */
@media (min-width: 1024px) {
  .about-grid {
    grid-template-columns: 1.4fr 1fr;
    gap: 3rem;
    max-width: 1200px;
  }

  .about-headline {
    text-align: left;
  }

  .about-intro {
    text-align: left;
  }
}

@media (max-width: 768px) {
  /* Mobile navigation handled by ModernHeader component */

  .hero-content {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 4rem;
    padding: 3rem 20px;
    min-height: auto;
    align-items: center;
  }

  .hero-text {
    order: 1;
    align-items: center;
    max-width: 100%;
    text-align: center;
    justify-content: center;
    padding: 2rem 1rem;
  }

  .hero-visual {
    order: 2;
    min-height: auto;
    justify-content: center;
    padding: 1rem 0;
  }

  .tech-showcase {
    width: 100%;
    max-width: 500px;
    padding: 2rem;
    margin: 0 auto;
  }

  .code-terminal {
    width: 100%;
    max-width: 450px;
    height: 170px;
    margin: 0 auto;
  }

  .tech-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.25rem;
    justify-items: center;
  }

  .tech-item {
    max-width: 110px;
    min-height: 100px;
    padding: 1rem;
  }



  .stat-card {
    padding: 1rem 0.5rem;
  }

  .hero-title {
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }

  .title-name {
    font-size: 3rem;
  }

  .title-line {
    font-size: 1rem;
  }

  .title-role {
    font-size: 1.2rem;
  }

  .hero-description {
    font-size: 1rem;
    margin-bottom: 2rem;
    text-align: center;
    max-width: 100%;
    margin-left: auto;
    margin-right: auto;
  }

  .about-section {
    padding: 3.5rem 0;
  }

  .about-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
    margin-top: 2rem;
  }

  .about-headline {
    font-size: clamp(1.5rem, 5vw, 2rem);
    text-align: center;
  }

  .about-intro {
    text-align: center;
    font-size: 1.0625rem;
  }

  .about-sidebar {
    position: static;
  }

  .about-card {
    padding: 1.5rem;
  }

  .card-icon {
    font-size: 2.25rem;
  }

  .card-title {
    font-size: 1.375rem;
  }

  .card-text {
    font-size: 1rem;
  }

  .value-card,
  .cv-card {
    padding: 1.75rem;
  }

  .value-title {
    font-size: 1.25rem;
  }

  .value-item {
    font-size: 0.9375rem;
  }

  .cv-buttons {
    grid-template-columns: 1fr;
    gap: 0.875rem;
  }

  .cv-button {
    padding: 1rem 1.25rem;
    font-size: 1rem;
  }

  .cv-button svg {
    width: 20px;
    height: 20px;
  }

  .contact-content {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .hero-buttons {
    justify-content: center;
    flex-direction: column;
    gap: 1rem;
    align-items: center;
    width: 100%;
    max-width: 300px;
    margin: 0 auto;
  }

  .btn-primary, .btn-secondary {
    width: 100%;
    max-width: 280px;
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

@media (max-width: 600px) {
  .hero-content {
    padding: 2rem 20px;
    gap: 3rem;
    justify-content: center;
    align-items: center;
  }
  
  .hero-text {
    text-align: center;
    align-items: center;
    justify-content: center;
    padding: 1.5rem 1rem;
  }
  
  .hero-title {
    text-align: center;
    width: 100%;
  }
  
  .title-line {
    text-align: center;
  }
  
  .title-name {
    text-align: center;
  }
  
  .title-role-container {
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .hero-content {
    padding: 2rem 15px;
    gap: 3rem;
  }

  .about-section {
    padding: 2.5rem 0;
  }

  .about-grid {
    gap: 1.5rem;
    margin-top: 1.5rem;
  }

  .about-headline {
    font-size: clamp(1.375rem, 5vw, 1.75rem);
  }

  .about-intro {
    font-size: 1rem;
  }

  .about-card,
  .value-card,
  .cv-card {
    padding: 1.25rem;
  }

  .card-title {
    font-size: 1.25rem;
  }

  .card-text {
    font-size: 0.9375rem;
  }

  .value-title {
    font-size: 1.125rem;
  }

  .value-item {
    font-size: 0.875rem;
    gap: 0.625rem;
  }

  .cv-title {
    font-size: 1.125rem;
  }

  .cv-description {
    font-size: 0.9375rem;
  }

  .cv-button {
    padding: 0.875rem 1rem;
    font-size: 0.9375rem;
  }

  .hero-title {
    font-size: 2.2rem;
    margin-bottom: 1rem;
  }

  .title-name {
    font-size: 2.8rem;
  }

  .title-line {
    font-size: 1rem;
  }

  .title-role {
    font-size: 1.1rem;
  }

  .hero-description {
    font-size: 1rem;
    margin-bottom: 2rem;
    text-align: center;
    max-width: 100%;
    margin-left: auto;
    margin-right: auto;
  }

  .section-title {
    font-size: 2rem;
  }

  .projects-grid {
    grid-template-columns: 1fr;
  }

  .hero-visual {
    min-height: 400px;
    padding: 1.5rem 0;
  }

  .tech-showcase {
    padding: 1.5rem;
    max-width: 380px;
  }

  .code-terminal {
    max-width: 320px;
    height: 140px;
  }

  .terminal-body {
    padding: 18px;
    height: calc(100% - 48px);
  }

  .code-line {
    font-size: 0.9rem;
    gap: 10px;
  }

  .code-prompt {
    font-size: 1rem;
  }

  .code-text {
    font-size: 0.9rem;
  }

  .tech-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }

  .tech-item {
    max-width: 95px;
    min-height: 85px;
    padding: 0.8rem;
  }


  .stat-card {
    padding: 0.75rem 0.5rem;
  }

  .btn-primary, .btn-secondary {
    width: 100%;
    max-width: 280px;
    padding: 14px 28px;
    font-size: 0.95rem;
    margin: 0 auto;
  }

  .greeting {
    font-size: 1.2rem;
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

