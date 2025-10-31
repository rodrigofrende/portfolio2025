<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import HeroSection from './components/HeroSection.vue'
import CustomCursor from './components/CustomCursor.vue'
import ScrollReveal from './components/ScrollReveal.vue'
import ModernHeader from './components/ModernHeader.vue'
import ScrollToTop from './components/ScrollToTop.vue'
import AboutCarousel from './components/AboutCarousel.vue'
import { realProjects, getBestProjectImage } from './data/projects'

const { t } = useI18n()

// Reactive data
const currentRole = ref('')
const currentCodeLine = ref('')
const roles = [ 'Frontend Developer', 'UI/UX Designer', 'Tech Enthusiast', '3D Maker',]

// Terminal removed for performance
let roleIndex = 0
let codeIndex = 0
let roleInterval: number | undefined
let codeInterval: number | undefined

// Terminal typing removed

// About particles - generated once to avoid re-renders
const aboutParticles = ref<Array<{ left: string; delay: string; duration: string }>>([])

const generateAboutParticles = () => {
  const particles = []
  // Reduced from 15 to 6 for better performance
  for (let i = 0; i < 6; i++) {
    particles.push({
      left: `${10 + Math.random() * 80}%`,
      delay: `${Math.random() * 4}s`,
      duration: `${4 + Math.random() * 3}s`
    })
  }
  return particles
}

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
    // Use translated description from i18n
    description: t(`projects.descriptions.${project.id}` as any),
    // Generate automatic screenshot URL
    imageUrl: getBestProjectImage(project)
  }))
})

// Navigation methods moved to ModernHeader component

// Tech icon mapping function
const getTechIcon = (tech: string): string => {
  const iconMap: Record<string, string> = {
    // Frontend Frameworks
    'Vue.js': '💚',
    'React': '⚛️',
    'Angular': '🅰️',
    'Svelte': '🔥',
    
    // Languages
    'TypeScript': '💙',
    'JavaScript': '💛',
    'Python': '🐍',
    'Java': '☕',
    
    // Build Tools
    'Vite': '⚡',
    'Webpack': '📦',
    'Rollup': '📦',
    
    // State Management
    'Pinia': '🍍',
    'Redux': '🔄',
    'Vuex': '📦',
    
    // Styling
    'Tailwind CSS': '🎨',
    'CSS3': '🎨',
    'SASS': '🎨',
    'CSS Modules': '🎨',
    
    // Backend & Database
    'Firebase': '🔥',
    'Node.js': '🟢',
    'MongoDB': '🍃',
    
    // APIs & Services
    'PokeAPI': '🎮',
    'OMDb API': '🎬',
    'API Integration': '🔌',
    
    // Testing
    'Jest': '🃏',
    'Playwright': '🎭',
    'Vitest': '✅',
    
    // Tools & Libraries
    'Storybook': '📚',
    'Canvas API': '🖼️',
    'Web Audio API': '🔊',
    'Socket.io': '🔌',
    'Chart.js': '📊',
    'GSAP': '✨',
    
    // Default
    'default': '🔧'
  }
  
  return iconMap[tech] || '🔧'
}

// Get tech class name for styling
const getTechClass = (tech: string): string => {
  const normalizedTech = tech.toLowerCase().replace(/\s+/g, '-').replace(/\./g, '')
  
  // Map specific technologies to simplified class names
  const classMap: Record<string, string> = {
    'react': 'tech-react',
    'vuejs': 'tech-vue',
    'typescript': 'tech-typescript',
    'firebase': 'tech-firebase',
    'tailwind-css': 'tech-tailwind',
    'vite': 'tech-vite',
    'pinia': 'tech-pinia',
    'css3': 'tech-css',
    'css-modules': 'tech-css',
    'javascript': 'tech-javascript',
    'storybook': 'tech-storybook',
    'pokeapi': 'tech-api',
    'omdb-api': 'tech-api',
    'canvas-api': 'tech-api',
    'web-audio-api': 'tech-api',
    'api-integration': 'tech-api'
  }
  
  return classMap[normalizedTech] || 'tech-default'
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

// typeCode removed along with terminal component

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
  
  // Generate about particles once
  aboutParticles.value = generateAboutParticles()
  
  // Create animated text field
  createFloatingTexts()
  createTechTags()
  startTypingAnimation()
  startAnimation()
  
  // Start typing animations
  setTimeout(() => {
    typeRole()
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

    <!-- Terminal removed for performance -->

    <!-- About Section - Modern Design -->
    <ScrollReveal :delay="100">
      <section id="about" class="about-section">
        <!-- Animated Background -->
        <div class="about-background">
          <!-- Gradient orbs -->
          <div class="about-orb about-orb-1"></div>
          <div class="about-orb about-orb-2"></div>
          
          <!-- Floating particles -->
          <div class="about-particles">
            <div v-for="(particle, i) in aboutParticles" :key="i" class="about-particle" :style="{
              left: particle.left,
              animationDelay: particle.delay,
              animationDuration: particle.duration
            }"></div>
          </div>
        </div>
        
        <div class="container">
          <!-- Section Header - Simplified -->
          <div class="about-header">
            <div class="section-label">
              <span class="label-dot"></span>
              <span class="label-text">{{ t('about.title') }}</span>
              <span class="label-dot"></span>
            </div>
            <h2 class="section-title-modern">{{ t('about.headline') }}</h2>
            <p class="section-description">{{ t('about.intro') }}</p>
          </div>
          
          <!-- Interactive Carousel Component -->
          <AboutCarousel />
        </div>
      </section>
    </ScrollReveal>

    <!-- Projects Section -->
    <ScrollReveal :delay="150">
      <section id="projects" class="projects-section">
        <div class="container">
          <div class="about-header">
            <div class="section-label">
              <span class="label-dot"></span>
              <span class="label-text">{{ t('projects.title') }}</span>
              <span class="label-dot"></span>
            </div>
            <h2 class="section-title-modern">{{ t('projects.headline') }}</h2>
            <p class="section-description">{{ t('projects.subtitle') }}</p>
          </div>
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
              <!-- Badges Container -->
              <div class="project-badges">
                <!-- Featured Badge -->
                <div v-if="project.featured" class="project-badge project-featured-badge">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                  <span>{{ t('projects.badges.featured') }}</span>
                </div>
                
                <!-- Stable Badge -->
                <div v-if="project.stable" class="project-badge project-stable-badge">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  <span>{{ t('projects.badges.stable') }}</span>
                </div>
                
                <!-- Improving Badge -->
                <div v-if="project.improving" class="project-badge project-improving-badge">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="12" y1="19" x2="12" y2="5"/>
                    <polyline points="5 12 12 5 19 12"/>
                  </svg>
                  <span>{{ t('projects.badges.improving') }}</span>
                </div>
                
                <!-- Work in Progress Badge -->
                <div v-if="project.wip" class="project-badge project-wip-badge">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12 6 12 12 16 14"/>
                  </svg>
                  <span>{{ t('projects.badges.wip') }}</span>
                </div>
              </div>
            </div>
            <div class="project-content">
              <h3 class="project-title">{{ project.title }}</h3>
              <p class="project-description">{{ project.description }}</p>
              <div class="project-tech">
                <span v-for="tech in project.technologies" :key="tech" :class="['tech-tag', getTechClass(tech)]">
                  <span class="tech-icon">{{ getTechIcon(tech) }}</span>
                  <span class="tech-name">{{ tech }}</span>
                </span>
              </div>
              <div class="project-links">
                <a :href="project.github" target="_blank" rel="noopener noreferrer" class="project-link">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  <span>{{ t('projects.links.github') }}</span>
                </a>
                <a v-if="project.demo && project.demo !== '#'" :href="project.demo" target="_blank" rel="noopener noreferrer" class="project-link project-link-primary">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                    <polyline points="15 3 21 3 21 9"/>
                    <line x1="10" y1="14" x2="21" y2="3"/>
                  </svg>
                  <span>{{ t('projects.links.demo') }}</span>
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
          <div class="about-header">
            <div class="section-label">
              <span class="label-dot"></span>
              <span class="label-text">{{ t('contact.title') }}</span>
              <span class="label-dot"></span>
            </div>
            <h2 class="section-title-modern">{{ t('contact.headline') }}</h2>
            <p class="section-description">{{ t('contact.subtitle') }}</p>
          </div>
          <h3 class="contact-heading-full">{{ t('contact.heading') }}</h3>
          <div class="contact-grid">
            <a href="https://github.com/rodrigofrende" target="_blank" class="contact-method contact-card">
              <div class="method-icon">🐱</div>
              <div class="method-info">
                <span class="method-label">{{ t('contact.social.github') }}</span>
                <span class="method-value">github.com/rodrigofrende</span>
              </div>
            </a>
            <a href="https://linkedin.com/in/rodrigofrende" target="_blank" class="contact-method contact-card">
              <div class="method-icon">in</div>
              <div class="method-info">
                <span class="method-label">{{ t('contact.social.linkedin') }}</span>
                <span class="method-value">/in/rodrigofrende</span>
              </div>
            </a>
            <a href="https://instagram.com/rf.3d.prints" target="_blank" class="contact-method contact-card">
              <div class="method-icon">📸</div>
              <div class="method-info">
                <span class="method-label">{{ t('contact.social.instagram') }}</span>
                <span class="method-value">@rf.3d.prints</span>
              </div>
            </a>
            <a href="mailto:rodrigo.frende@gmail.com" class="contact-method contact-card">
              <div class="method-icon">📧</div>
              <div class="method-info">
                <span class="method-label">{{ t('contact.email.label') }}</span>
                <span class="method-value">{{ t('contact.email.value') }}</span>
              </div>
            </a>
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

<style>
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
  background: transparent;
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
  min-height: 400px;
  background: transparent;
  padding: 5rem 0;
  overflow: hidden;
}

/* Floating Particles */
.terminal-particles {
  position: absolute;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 50;
}

.terminal-particle {
  position: absolute;
  width: 4px;
  height: 4px;
  background: radial-gradient(circle, rgba(167, 139, 250, 0.7) 0%, rgba(167, 139, 250, 0.35) 50%, transparent 70%);
  border-radius: 50%;
  animation: particle-float-terminal 4s ease-in-out infinite;
  box-shadow: 0 0 10px rgba(167, 139, 250, 0.4);
  will-change: transform, opacity;
  transform: translateZ(0);
  backface-visibility: hidden;
}

@keyframes particle-float-terminal {
  0%, 100% {
    transform: translate(0, 0) scale(1) translateZ(0);
    opacity: 0.6;
  }
  50% {
    transform: translate(20px, -30px) scale(1.3) translateZ(0);
    opacity: 1;
  }
}

/* Connection Lines */
.connection-lines {
  position: absolute;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 50;
}

.line {
  position: absolute;
  background: linear-gradient(90deg, transparent, rgba(167, 139, 250, 0.3), transparent);
  height: 2px;
  animation: line-pulse 3s ease-in-out infinite;
  will-change: opacity, transform;
  transform: translateZ(0);
  backface-visibility: hidden;
}

.line-1 {
  top: 30%;
  left: 0;
  right: 0;
  animation-delay: 0s;
}

.line-2 {
  top: 50%;
  left: 0;
  right: 0;
  animation-delay: 1s;
  background: linear-gradient(90deg, transparent, rgba(167, 139, 250, 0.25), transparent);
}

.line-3 {
  top: 70%;
  left: 0;
  right: 0;
  animation-delay: 2s;
  background: linear-gradient(90deg, transparent, rgba(167, 139, 250, 0.2), transparent);
}

@keyframes line-pulse {
  0%, 100% {
    opacity: 0.3;
    transform: scaleX(0.8);
  }
  50% {
    opacity: 1;
    transform: scaleX(1);
  }
}

/* Code Terminal */
/* Mobile-first base */
.code-terminal {
  position: relative;
  width: 100%;
  max-width: 360px;
  height: 280px; /* mobile default */
  flex-shrink: 0;
  background: rgba(13, 17, 23, 0.9);
  border-radius: 20px;
  overflow: hidden;
  z-index: 100;
  display: flex; /* allow header/body layout without clipping */
  flex-direction: column;
  box-shadow: 
    0 20px 80px rgba(0, 0, 0, 0.4),
    0 0 0 1px rgba(167, 139, 250, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.05);
  font-family: 'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', 'Courier New', monospace;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  margin: 0 auto;
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
}

.code-terminal:hover {
  transform: translateY(-8px) scale(1.01);
  box-shadow: 
    0 30px 100px rgba(0, 0, 0, 0.5),
    0 0 0 1px rgba(167, 139, 250, 0.35),
    inset 0 1px 0 rgba(255, 255, 255, 0.08),
    0 0 60px rgba(167, 139, 250, 0.25);
}

/* Terminal Glow Effect */
.terminal-glow {
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(167, 139, 250, 0.12) 0%, transparent 70%);
  animation: glow-pulse 4s ease-in-out infinite;
  pointer-events: none;
  z-index: 0;
}

@keyframes glow-pulse {
  0%, 100% {
    opacity: 0.5;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.1);
  }
}

.terminal-header {
  background: linear-gradient(to bottom, rgba(45, 45, 45, 0.8), rgba(26, 26, 26, 0.8));
  padding: 14px 20px;
  display: flex;
  align-items: center;
  gap: 16px;
  border-bottom: 1px solid rgba(167, 139, 250, 0.15);
  position: relative;
  backdrop-filter: blur(10px);
  z-index: 1;
}

.terminal-header::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(to right, transparent, rgba(167, 139, 250, 0.3), transparent);
}

.terminal-buttons {
  display: flex;
  gap: 8px;
}

.terminal-buttons span {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  position: relative;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
}

.terminal-buttons span:hover {
  transform: scale(1.15);
  filter: brightness(1.2);
}

.btn-close { 
  background: linear-gradient(135deg, #ff5f56 0%, #e64a40 100%);
  box-shadow: 0 0 0 1px rgba(255, 95, 86, 0.3), 0 2px 8px rgba(255, 95, 86, 0.4);
}

.btn-minimize { 
  background: linear-gradient(135deg, #ffbd2e 0%, #e5a820 100%);
  box-shadow: 0 0 0 1px rgba(255, 189, 46, 0.3), 0 2px 8px rgba(255, 189, 46, 0.4);
}

.btn-maximize { 
  background: linear-gradient(135deg, #27ca3f 0%, #1fb333 100%);
  box-shadow: 0 0 0 1px rgba(39, 202, 63, 0.3), 0 2px 8px rgba(39, 202, 63, 0.4);
}

.terminal-title {
  color: #ffffff;
  font-size: 0.95rem;
  font-weight: 600;
  margin-left: auto;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.6);
  letter-spacing: 0.3px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.terminal-title::before {
  content: '📁';
  font-size: 1rem;
}

.terminal-status {
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 4px 12px;
  background: rgba(16, 185, 129, 0.15);
  border-radius: 12px;
  border: 1px solid rgba(16, 185, 129, 0.3);
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #10b981;
  box-shadow: 0 0 10px rgba(16, 185, 129, 0.6);
  animation: status-pulse 2s ease-in-out infinite;
}

@keyframes status-pulse {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.6;
    transform: scale(0.9);
  }
}

.status-text {
  color: #10b981;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.terminal-body {
  padding: 16px; /* tighter on mobile */
  background: rgba(13, 17, 23, 0.9);
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  z-index: 1;
  flex: 1 1 auto; /* fill available height under header */
  min-height: 0; /* prevent overflow from flex calculations */
  background-image:
    radial-gradient(circle at 20% 10%, rgba(88, 166, 255, 0.06), transparent 40%),
    radial-gradient(circle at 80% 90%, rgba(167, 139, 250, 0.06), transparent 40%),
    linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
  background-size:
    100% 100%,
    100% 100%,
    24px 24px,
    24px 24px;
  background-position:
    0 0,
    0 0,
    0 0,
    0 0;
}

.terminal-body::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(to right, transparent, rgba(167, 139, 250, 0.15), transparent);
}

.code-lines-container {
  display: flex;
  flex-direction: column;
  gap: 8px;
  /* Use variables for exact line height across breakpoints */
  --line-h: 24px;
  --lines: 5;
  --gap: 6px;
  height: calc(var(--line-h) * var(--lines) + var(--gap) * (var(--lines) - 1));
  overflow: hidden;
}

.code-line {
  display: flex;
  align-items: center;
  gap: 16px;
  font-size: 0.9rem; /* mobile base */
  line-height: 1.6;
  padding: 4px 0;
  min-height: var(--line-h); /* keep line height stable to avoid jumps */
  will-change: contents; /* hint for smoother text updates */
  transition: all 0.3s ease;
  overflow: hidden; /* avoid text spill */
}

.code-line-active {
  background: rgba(88, 166, 255, 0.08);
  /* visual left accent without affecting layout */
  box-shadow: inset 3px 0 0 0 #58a6ff;
}

.line-number {
  color: rgba(255, 255, 255, 0.3);
  font-size: 0.8rem;
  min-width: 18px;
  text-align: right;
  user-select: none;
}

/* Upscale terminal for larger screens (desktop-first adjustments on top of mobile base) */
@media (min-width: 1280px) {
  .code-terminal {
    max-width: 800px;
    height: 360px;
  }
  .terminal-body { padding: 24px; }
  .code-lines-container { --line-h: 28px; --gap: 8px; }
  .code-line { font-size: 0.95rem; }
}

@media (min-width: 1536px) {
  .code-terminal {
    max-width: 860px;
    height: 380px;
  }
}

.code-keyword {
  color: #ff7b72;
  font-weight: 600;
}

.code-variable {
  color: #79c0ff;
}

.code-operator {
  color: #ff7b72;
}

.code-string {
  color: #a5d6ff;
}

.code-punctuation {
  color: #c9d1d9;
}

.code-comment {
  opacity: 0.6;
}

.code-comment-text {
  color: #8b949e;
  font-style: italic;
}

.code-prompt {
  color: #58a6ff;
  font-weight: 700;
  font-size: 1.1rem;
  text-shadow: 0 0 10px rgba(88, 166, 255, 0.5);
}

.code-text {
  color: #f0f6fc;
  font-size: 0.95rem;
  font-weight: 400;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
  letter-spacing: 0.3px;
  white-space: pre; /* prevent wrapping while typing */
}

/* Terminal Footer */
.terminal-footer {
  display: flex;
  gap: 24px;
  padding-top: 16px;
  margin-top: 16px;
  border-top: 1px solid rgba(167, 139, 250, 0.1);
}

.footer-stat {
  display: flex;
  align-items: center;
  gap: 8px;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.8rem;
  font-weight: 500;
  padding: 6px 12px;
  background: rgba(167, 139, 250, 0.08);
  border-radius: 8px;
  border: 1px solid rgba(167, 139, 250, 0.12);
  transition: all 0.3s ease;
}

.footer-stat:hover {
  background: rgba(167, 139, 250, 0.12);
  border-color: rgba(167, 139, 250, 0.25);
  color: rgba(255, 255, 255, 0.9);
  transform: translateY(-2px);
}

.footer-stat svg {
  color: #a78bfa;
}

/* Decorative Elements */
.terminal-decoration {
  position: absolute;
  pointer-events: none;
  z-index: 50;
}

.terminal-decoration-1 {
  top: 10%;
  left: 10%;
  animation: float-decoration 6s ease-in-out infinite;
}

.terminal-decoration-2 {
  bottom: 15%;
  right: 10%;
  animation: float-decoration 8s ease-in-out infinite reverse;
}

@keyframes float-decoration {
  0%, 100% {
    transform: translate(0, 0) rotate(0deg);
  }
  50% {
    transform: translate(20px, -20px) rotate(180deg);
  }
}

.deco-circle {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 2px solid rgba(167, 139, 250, 0.15);
  background: radial-gradient(circle, rgba(167, 139, 250, 0.08) 0%, transparent 70%);
  animation: deco-pulse 3s ease-in-out infinite;
}

.deco-square {
  width: 60px;
  height: 60px;
  border-radius: 12px;
  border: 2px solid rgba(167, 139, 250, 0.2);
  background: linear-gradient(135deg, rgba(167, 139, 250, 0.08) 0%, transparent 100%);
  transform: rotate(45deg);
  animation: deco-rotate 8s linear infinite;
}

@keyframes deco-pulse {
  0%, 100% {
    opacity: 0.4;
    transform: scale(1);
  }
  50% {
    opacity: 0.8;
    transform: scale(1.1);
  }
}

@keyframes deco-rotate {
  0% {
    transform: rotate(45deg);
  }
  100% {
    transform: rotate(405deg);
  }
}

/* Tech Showcase */
.tech-showcase {
  position: relative;
  width: 100%;
  max-width: 600px;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 24px;
  backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.06);
  padding: 3.5rem;
  box-shadow: 0 12px 48px rgba(0, 0, 0, 0.25);
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
  background: rgba(255, 255, 255, 0.03);
  border-radius: 10px;
  padding: 0.9rem;
  border: 1px solid rgba(255, 255, 255, 0.06);
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
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(167, 139, 250, 0.25);
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(167, 139, 250, 0.15);
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
  background: rgba(255, 255, 255, 0.03);
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.06);
  transition: all 0.3s ease;
}

.stat-card:hover {
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(167, 139, 250, 0.25);
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(167, 139, 250, 0.15);
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

/* Animated Tech Tags - Background Animation */
.tech-tags {
  position: absolute;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.tech-tags .floating-tag {
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
  background: linear-gradient(135deg, #ffffff 0%, #a78bfa 50%, #c084fc 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 0 0 40px rgba(167, 139, 250, 0.3);
}

/* ===================================
   ABOUT SECTION - MODERN DESIGN
   =================================== */
.about-section {
  padding: 4rem 0;
  background: transparent;
  position: relative;
  overflow: hidden;
}

.about-section .container {
  position: relative;
  z-index: 2;
}

/* Animated Background */
.about-background {
  position: absolute;
  inset: 0;
  z-index: 0;
  overflow: hidden;
}

/* Gradient orbs - Subtle and unified */
.about-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(100px);
  opacity: 0.15;
  animation: float-orb-about 40s ease-in-out infinite;
  will-change: transform;
  pointer-events: none;
}

.about-orb-1 {
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, rgba(167, 139, 250, 0.25) 0%, transparent 70%);
  top: -10%;
  right: -5%;
  animation-delay: 0s;
}

.about-orb-2 {
  width: 380px;
  height: 380px;
  background: radial-gradient(circle, rgba(167, 139, 250, 0.2) 0%, transparent 70%);
  bottom: -10%;
  left: -5%;
  animation-delay: 15s;
}

@keyframes float-orb-about {
  0%, 100% {
    transform: translate(0, 0) scale(1);
  }
  33% {
    transform: translate(60px, -40px) scale(1.1);
  }
  66% {
    transform: translate(-40px, 40px) scale(0.95);
  }
}

/* Floating particles */
.about-particles {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 1;
  overflow: hidden;
}

.about-particle {
  position: absolute;
  bottom: 0;
  width: 3px;
  height: 3px;
  background: radial-gradient(circle, rgba(167, 139, 250, 0.9) 0%, rgba(102, 126, 234, 0.6) 40%, transparent 70%);
  border-radius: 50%;
  animation: particle-rise 6s ease-in infinite;
  box-shadow: 0 0 12px rgba(167, 139, 250, 0.6);
  will-change: transform, opacity;
  transform: translateZ(0);
  backface-visibility: hidden;
}

@keyframes particle-rise {
  0% {
    transform: translateY(0) scale(0.5) translateZ(0);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  80% {
    opacity: 0.8;
  }
  100% {
    transform: translateY(-200px) scale(1.5) translateZ(0);
    opacity: 0;
  }
}

/* Section Header */
.about-header {
  text-align: center;
  margin-bottom: 4rem;
  max-width: 900px;
  margin-left: auto;
  margin-right: auto;
}

.section-label {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.625rem 1.5rem;
  background: rgba(124, 58, 237, 0.1);
  border: 1px solid rgba(124, 58, 237, 0.3);
  border-radius: 50px;
  margin-bottom: 2rem;
  backdrop-filter: blur(10px);
}

.label-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: linear-gradient(135deg, #a78bfa 0%, #c084fc 100%);
  box-shadow: 0 0 12px rgba(167, 139, 250, 0.6);
  animation: pulse-dot 2s ease-in-out infinite;
}

@keyframes pulse-dot {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.6;
    transform: scale(1.2);
  }
}

.label-text {
  font-size: 0.875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: rgba(255, 255, 255, 0.9);
}

.section-title-modern {
  font-size: clamp(2.25rem, 5vw, 3.5rem);
  font-weight: 800;
  line-height: 1.2;
  background: linear-gradient(135deg, #ffffff 0%, #a78bfa 50%, #c084fc 100%);
  background-size: 200% 200%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: gradient-shift 8s ease infinite;
  margin-bottom: 1.5rem;
  text-shadow: 0 0 40px rgba(167, 139, 250, 0.3);
}

@keyframes gradient-shift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

.section-description {
  font-size: 1.1875rem;
  line-height: 1.8;
  color: rgba(255, 255, 255, 0.8);
  max-width: 750px;
  margin: 0 auto;
}

/* Main Grid - 2 Symmetric Columns */
.about-grid-modern {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.75rem;
  max-width: 1200px;
  margin: 0 auto;
}

/* Column Container */
.about-column {
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
}

/* Info Cards (Journey & Approach) */
.info-card {
  background: rgba(255, 255, 255, 0.03);
  border-radius: 20px;
  padding: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
  transition: all 0.3s ease;
  height: fit-content;
}

.info-card:hover {
  transform: translateY(-4px);
  border-color: rgba(167, 139, 250, 0.25);
  background: rgba(255, 255, 255, 0.05);
  box-shadow: 0 8px 30px rgba(167, 139, 250, 0.2);
}

.info-card-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.25rem;
}

.info-icon {
  font-size: 2rem;
  filter: drop-shadow(0 2px 8px rgba(167, 139, 250, 0.4));
}

.info-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #ffffff;
  line-height: 1.2;
}

.info-text {
  font-size: 1rem;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.8);
}

/* Skills Card */
.skills-card {
  background: rgba(255, 255, 255, 0.03);
  border-radius: 20px;
  padding: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
  transition: all 0.3s ease;
}

.skills-card:hover {
  transform: translateY(-4px);
  border-color: rgba(167, 139, 250, 0.25);
  background: rgba(255, 255, 255, 0.05);
  box-shadow: 0 8px 30px rgba(167, 139, 250, 0.2);
}

.skills-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.skills-icon {
  font-size: 1.5rem;
  filter: drop-shadow(0 2px 8px rgba(167, 139, 250, 0.4));
}

.skills-title {
  font-size: 1.375rem;
  font-weight: 700;
  color: #ffffff;
  line-height: 1.2;
}

.skills-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.skill-item {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 0.625rem 0.75rem;
  background: rgba(255, 255, 255, 0.02);
  border-radius: 8px;
  font-size: 0.9375rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.85);
  transition: all 0.2s ease;
}

.skill-item:hover {
  background: rgba(255, 255, 255, 0.05);
  transform: translateX(4px);
  color: rgba(255, 255, 255, 1);
}

.skill-check {
  flex-shrink: 0;
  color: #a78bfa;
  margin-top: 2px;
}

/* CV Card Compact */
.cv-card-compact {
  background: linear-gradient(135deg, #7c3aed 0%, #60a5fa 100%);
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 8px 30px rgba(124, 58, 237, 0.35);
  transition: all 0.3s ease;
}

.cv-card-compact:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 40px rgba(124, 58, 237, 0.45);
}

.cv-header-compact {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
  color: white;
}

.cv-header-compact svg {
  flex-shrink: 0;
}

.cv-header-compact h3 {
  font-size: 1.375rem;
  font-weight: 700;
  margin: 0;
}

.cv-desc-compact {
  font-size: 0.9375rem;
  color: rgba(255, 255, 255, 0.95);
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

.cv-buttons-compact {
  display: flex;
  gap: 0.75rem;
}

.cv-btn-compact {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.875rem 1rem;
  border-radius: 10px;
  font-weight: 600;
  font-size: 0.875rem;
  text-decoration: none;
  transition: all 0.3s ease;
}

.cv-btn-compact svg {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
}

.cv-btn-es {
  background: white;
  color: #7c3aed;
}

.cv-btn-es:hover {
  background: #f3f4f6;
  transform: translateY(-2px);
}

.cv-btn-en {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(10px);
}

.cv-btn-en:hover {
  background: rgba(255, 255, 255, 0.3);
  border-color: rgba(255, 255, 255, 0.5);
  transform: translateY(-2px);
}

/* Projects Section */
.projects-section {
  padding: 3.5rem 0;
  background: transparent;
  position: relative;
  overflow: hidden;
}

.projects-section::after {
  content: '';
  position: absolute;
  bottom: 10%;
  left: -10%;
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, rgba(167, 139, 250, 0.1) 0%, transparent 70%);
  border-radius: 50%;
  filter: blur(100px);
  opacity: 0.8;
  pointer-events: none;
  z-index: 0;
}

.projects-section .container {
  position: relative;
  z-index: 1;
}

/* Unify header spacing across all sections */
.about-section .about-header,
.projects-section .about-header,
.contact-section .about-header {
  margin-bottom: 3rem;
}

.about-section .section-description,
.projects-section .section-description,
.contact-section .section-description {
  margin-top: 0;
  margin-bottom: 0;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
}

.project-card {
  background: rgba(255, 255, 255, 0.03);
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid rgba(255, 255, 255, 0.06);
  height: 100%;
  display: flex;
  flex-direction: column;
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
}

.project-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 16px 48px rgba(167, 139, 250, 0.25);
  border-color: rgba(167, 139, 250, 0.3);
  background: rgba(255, 255, 255, 0.05);
}

/* Project Image Wrapper */
.project-image-wrapper {
  position: relative;
  height: 220px;
  overflow: hidden;
  background: rgba(0, 0, 0, 0.3);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.project-screenshot {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease, opacity 0.4s ease;
  opacity: 0.9;
}

.project-card:hover .project-screenshot {
  transform: scale(1.08);
  opacity: 1;
}

.project-image-fallback {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  position: relative;
}

.project-image-fallback::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.1) 0%, transparent 60%);
}

.project-icon {
  font-size: 4rem;
  filter: drop-shadow(0 6px 12px rgba(0, 0, 0, 0.4));
  position: relative;
  z-index: 1;
  animation: float-icon 3s ease-in-out infinite;
}

@keyframes float-icon {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

/* Badges Container */
.project-badges {
  position: absolute;
  top: 12px;
  right: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  z-index: 10;
}

/* Base Badge Styles */
.project-badge {
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 6px;
  backdrop-filter: blur(10px);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.project-badge:hover {
  transform: translateX(-4px);
}

.project-badge svg {
  width: 14px;
  height: 14px;
  flex-shrink: 0;
}

/* Featured Badge - Golden Yellow */
.project-featured-badge {
  background: linear-gradient(135deg, #ffd700 0%, #ffed4e 100%);
  color: #1a202c;
  box-shadow: 0 4px 12px rgba(255, 215, 0, 0.4);
}

.project-featured-badge:hover {
  box-shadow: 0 6px 16px rgba(255, 215, 0, 0.5);
}

/* Stable Badge - Green */
.project-stable-badge {
  background: linear-gradient(135deg, #10b981 0%, #34d399 100%);
  color: white;
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.4);
}

.project-stable-badge:hover {
  box-shadow: 0 6px 16px rgba(16, 185, 129, 0.5);
}

/* Improving Badge - Blue */
.project-improving-badge {
  background: linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%);
  color: white;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
  animation: pulse-improving 2s ease-in-out infinite;
}

.project-improving-badge:hover {
  box-shadow: 0 6px 16px rgba(59, 130, 246, 0.5);
}

.project-improving-badge svg {
  animation: bounce-arrow 2s ease-in-out infinite;
}

/* Work in Progress Badge - Orange */
.project-wip-badge {
  background: linear-gradient(135deg, #f59e0b 0%, #f97316 100%);
  color: white;
  box-shadow: 0 4px 12px rgba(245, 158, 11, 0.4);
  animation: pulse-wip 2s ease-in-out infinite;
}

.project-wip-badge:hover {
  box-shadow: 0 6px 16px rgba(245, 158, 11, 0.5);
}

.project-wip-badge svg {
  animation: rotate-clock 2s linear infinite;
}

/* Animations */
@keyframes pulse-wip {
  0%, 100% {
    box-shadow: 0 4px 12px rgba(245, 158, 11, 0.4);
  }
  50% {
    box-shadow: 0 4px 16px rgba(245, 158, 11, 0.6);
  }
}

@keyframes pulse-improving {
  0%, 100% {
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
  }
  50% {
    box-shadow: 0 4px 16px rgba(59, 130, 246, 0.6);
  }
}

@keyframes bounce-arrow {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-3px);
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
  padding: 2rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  text-align: center;
  gap: 1rem;
}

.project-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: #ffffff;
  line-height: 1.3;
  background: linear-gradient(135deg, #ffffff 0%, #e0e7ff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-align: center;
  width: 100%;
}

.project-description {
  color: rgba(255, 255, 255, 0.75);
  margin-bottom: 0.5rem;
  line-height: 1.7;
  font-size: 0.9375rem;
  flex: 1;
  min-height: 3.6em;
  text-align: center;
  width: 100%;
}

/* Tech Tags Container */
.project-card .project-tech,
.project-content .project-tech,
div.project-tech {
  display: flex !important;
  flex-direction: row !important;
  flex-wrap: wrap !important;
  align-items: center !important;
  justify-content: center !important;
  align-content: center !important;
  gap: 0.625rem !important;
  row-gap: 0.625rem !important;
  column-gap: 0.625rem !important;
  margin: 0 auto 1.25rem auto !important;
  width: 100% !important;
  min-height: 40px !important;
  max-height: none !important;
  height: auto !important;
  box-sizing: border-box !important;
  position: relative !important;
  z-index: 1 !important;
  padding: 0.25rem 0 !important;
}

/* Individual Tech Tag */
.project-card .project-content .project-tech .tech-tag,
.project-content .project-tech span.tech-tag,
.project-tech > span.tech-tag,
div.project-tech > span {
  /* Layout - NEVER ABSOLUTE! */
  display: inline-flex !important;
  flex-direction: row !important;
  align-items: center !important;
  justify-content: center !important;
  flex-shrink: 0 !important;
  flex-grow: 0 !important;
  flex-basis: auto !important;
  width: auto !important;
  max-width: fit-content !important;
  position: static !important;
  float: none !important;
  transform: none !important;
  
  /* Spacing */
  padding: 0.5rem 1rem !important;
  gap: 0.5rem !important;
  margin: 0 !important;
  
  /* Typography */
  font-size: 0.8125rem !important;
  font-weight: 600 !important;
  line-height: 1.3 !important;
  white-space: nowrap !important;
  letter-spacing: 0.02em !important;
  text-align: center !important;
  
  /* Visual */
  border-radius: 12px !important;
  backdrop-filter: blur(10px) !important;
  -webkit-backdrop-filter: blur(10px) !important;
  cursor: default !important;
  box-sizing: border-box !important;
  visibility: visible !important;
  opacity: 1 !important;
  
  /* Animation */
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1) !important;
}

.project-card .project-content .project-tech .tech-tag:hover,
.project-content .project-tech span.tech-tag:hover,
.project-tech > span.tech-tag:hover {
  transform: translateY(-3px) scale(1.03) !important;
  filter: brightness(1.15) !important;
}

/* Tech Icon */
.project-tech .tech-tag .tech-icon,
.project-tech span.tech-icon {
  display: inline-flex !important;
  align-items: center !important;
  justify-content: center !important;
  font-size: 1rem !important;
  line-height: 1 !important;
  flex-shrink: 0 !important;
  flex-grow: 0 !important;
  margin: 0 !important;
  padding: 0 !important;
  width: auto !important;
  height: 1rem !important;
  position: static !important;
  transform: none !important;
}

/* Tech Name */
.project-tech .tech-tag .tech-name,
.project-tech span.tech-name {
  display: inline-flex !important;
  align-items: center !important;
  line-height: 1.3 !important;
  margin: 0 !important;
  padding: 0 !important;
  font-weight: 600 !important;
  flex-shrink: 0 !important;
  flex-grow: 0 !important;
  position: static !important;
  transform: none !important;
}

/* React - Cyan */
.tech-react {
  background: linear-gradient(135deg, rgba(6, 182, 212, 0.15) 0%, rgba(34, 211, 238, 0.15) 100%);
  border: 1.5px solid rgba(6, 182, 212, 0.4);
  color: #22d3ee !important;
  box-shadow: 0 2px 8px rgba(6, 182, 212, 0.2);
}

.tech-react:hover {
  background: linear-gradient(135deg, rgba(6, 182, 212, 0.25) 0%, rgba(34, 211, 238, 0.25) 100%);
  border-color: rgba(6, 182, 212, 0.6);
  box-shadow: 0 4px 16px rgba(6, 182, 212, 0.35);
  color: #67e8f9 !important;
}

/* Vue - Green */
.tech-vue {
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(52, 211, 153, 0.15) 100%);
  border: 1.5px solid rgba(16, 185, 129, 0.4);
  color: #10b981 !important;
  box-shadow: 0 2px 8px rgba(16, 185, 129, 0.2);
}

.tech-vue:hover {
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.25) 0%, rgba(52, 211, 153, 0.25) 100%);
  border-color: rgba(16, 185, 129, 0.6);
  box-shadow: 0 4px 16px rgba(16, 185, 129, 0.35);
  color: #34d399 !important;
}

/* TypeScript - Blue */
.tech-typescript {
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.15) 0%, rgba(96, 165, 250, 0.15) 100%);
  border: 1.5px solid rgba(59, 130, 246, 0.4);
  color: #3b82f6 !important;
  box-shadow: 0 2px 8px rgba(59, 130, 246, 0.2);
}

.tech-typescript:hover {
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.25) 0%, rgba(96, 165, 250, 0.25) 100%);
  border-color: rgba(59, 130, 246, 0.6);
  box-shadow: 0 4px 16px rgba(59, 130, 246, 0.35);
  color: #60a5fa !important;
}

/* Firebase - Orange/Yellow */
.tech-firebase {
  background: linear-gradient(135deg, rgba(251, 146, 60, 0.15) 0%, rgba(251, 191, 36, 0.15) 100%);
  border: 1.5px solid rgba(251, 146, 60, 0.4);
  color: #fb923c !important;
  box-shadow: 0 2px 8px rgba(251, 146, 60, 0.2);
}

.tech-firebase:hover {
  background: linear-gradient(135deg, rgba(251, 146, 60, 0.25) 0%, rgba(251, 191, 36, 0.25) 100%);
  border-color: rgba(251, 146, 60, 0.6);
  box-shadow: 0 4px 16px rgba(251, 146, 60, 0.35);
  color: #fbbf24 !important;
}

/* Tailwind - Cyan/Teal */
.tech-tailwind {
  background: linear-gradient(135deg, rgba(6, 182, 212, 0.15) 0%, rgba(14, 165, 233, 0.15) 100%);
  border: 1.5px solid rgba(6, 182, 212, 0.4);
  color: #06b6d4 !important;
  box-shadow: 0 2px 8px rgba(6, 182, 212, 0.2);
}

.tech-tailwind:hover {
  background: linear-gradient(135deg, rgba(6, 182, 212, 0.25) 0%, rgba(14, 165, 233, 0.25) 100%);
  border-color: rgba(6, 182, 212, 0.6);
  box-shadow: 0 4px 16px rgba(6, 182, 212, 0.35);
  color: #22d3ee !important;
}

/* Vite - Purple/Pink */
.tech-vite {
  background: linear-gradient(135deg, rgba(168, 85, 247, 0.15) 0%, rgba(236, 72, 153, 0.15) 100%);
  border: 1.5px solid rgba(168, 85, 247, 0.4);
  color: #a855f7 !important;
  box-shadow: 0 2px 8px rgba(168, 85, 247, 0.2);
}

.tech-vite:hover {
  background: linear-gradient(135deg, rgba(168, 85, 247, 0.25) 0%, rgba(236, 72, 153, 0.25) 100%);
  border-color: rgba(168, 85, 247, 0.6);
  box-shadow: 0 4px 16px rgba(168, 85, 247, 0.35);
  color: #c084fc !important;
}

/* Pinia - Yellow */
.tech-pinia {
  background: linear-gradient(135deg, rgba(250, 204, 21, 0.15) 0%, rgba(234, 179, 8, 0.15) 100%);
  border: 1.5px solid rgba(250, 204, 21, 0.4);
  color: #facc15 !important;
  box-shadow: 0 2px 8px rgba(250, 204, 21, 0.2);
}

.tech-pinia:hover {
  background: linear-gradient(135deg, rgba(250, 204, 21, 0.25) 0%, rgba(234, 179, 8, 0.25) 100%);
  border-color: rgba(250, 204, 21, 0.6);
  box-shadow: 0 4px 16px rgba(250, 204, 21, 0.35);
  color: #fde047 !important;
}

/* CSS3 - Pink */
.tech-css {
  background: linear-gradient(135deg, rgba(236, 72, 153, 0.15) 0%, rgba(219, 39, 119, 0.15) 100%);
  border: 1.5px solid rgba(236, 72, 153, 0.4);
  color: #ec4899 !important;
  box-shadow: 0 2px 8px rgba(236, 72, 153, 0.2);
}

.tech-css:hover {
  background: linear-gradient(135deg, rgba(236, 72, 153, 0.25) 0%, rgba(219, 39, 119, 0.25) 100%);
  border-color: rgba(236, 72, 153, 0.6);
  box-shadow: 0 4px 16px rgba(236, 72, 153, 0.35);
  color: #f472b6 !important;
}

/* JavaScript - Yellow */
.tech-javascript {
  background: linear-gradient(135deg, rgba(250, 204, 21, 0.15) 0%, rgba(234, 179, 8, 0.15) 100%);
  border: 1.5px solid rgba(250, 204, 21, 0.4);
  color: #facc15 !important;
  box-shadow: 0 2px 8px rgba(250, 204, 21, 0.2);
}

.tech-javascript:hover {
  background: linear-gradient(135deg, rgba(250, 204, 21, 0.25) 0%, rgba(234, 179, 8, 0.25) 100%);
  border-color: rgba(250, 204, 21, 0.6);
  box-shadow: 0 4px 16px rgba(250, 204, 21, 0.35);
  color: #fde047 !important;
}

/* API - Purple */
.tech-api {
  background: linear-gradient(135deg, rgba(139, 92, 246, 0.15) 0%, rgba(124, 58, 237, 0.15) 100%);
  border: 1.5px solid rgba(139, 92, 246, 0.4);
  color: #8b5cf6 !important;
  box-shadow: 0 2px 8px rgba(139, 92, 246, 0.2);
}

.tech-api:hover {
  background: linear-gradient(135deg, rgba(139, 92, 246, 0.25) 0%, rgba(124, 58, 237, 0.25) 100%);
  border-color: rgba(139, 92, 246, 0.6);
  box-shadow: 0 4px 16px rgba(139, 92, 246, 0.35);
  color: #a78bfa !important;
}

/* Storybook - Pink/Red */
.tech-storybook {
  background: linear-gradient(135deg, rgba(244, 63, 94, 0.15) 0%, rgba(225, 29, 72, 0.15) 100%);
  border: 1.5px solid rgba(244, 63, 94, 0.4);
  color: #f43f5e !important;
  box-shadow: 0 2px 8px rgba(244, 63, 94, 0.2);
}

.tech-storybook:hover {
  background: linear-gradient(135deg, rgba(244, 63, 94, 0.25) 0%, rgba(225, 29, 72, 0.25) 100%);
  border-color: rgba(244, 63, 94, 0.6);
  box-shadow: 0 4px 16px rgba(244, 63, 94, 0.35);
  color: #fb7185 !important;
}

/* Default fallback for unknown techs */
.tech-default {
  background: linear-gradient(135deg, rgba(100, 116, 139, 0.15) 0%, rgba(71, 85, 105, 0.15) 100%);
  border: 1.5px solid rgba(100, 116, 139, 0.4);
  color: #64748b !important;
  box-shadow: 0 2px 8px rgba(100, 116, 139, 0.2);
}

.tech-default:hover {
  background: linear-gradient(135deg, rgba(100, 116, 139, 0.25) 0%, rgba(71, 85, 105, 0.25) 100%);
  border-color: rgba(100, 116, 139, 0.6);
  box-shadow: 0 4px 16px rgba(100, 116, 139, 0.35);
  color: #94a3b8 !important;
}

.project-links {
  display: flex;
  gap: 0.875rem;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  margin-top: auto;
  width: 100%;
}

.project-link {
  flex: 1;
  min-width: 120px;
  max-width: 180px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  border-radius: 10px;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.875rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid rgba(255, 255, 255, 0.15);
  background: rgba(255, 255, 255, 0.05);
  color: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
}

.project-link:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.3);
  transform: translateY(-3px);
  color: #ffffff;
}

.project-link svg {
  flex-shrink: 0;
  width: 16px;
  height: 16px;
}

.project-link-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-color: rgba(255, 255, 255, 0.2);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

.project-link-primary:hover {
  background: linear-gradient(135deg, #5568d3 0%, #653a8b 100%);
  transform: translateY(-3px) scale(1.02);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.5);
}

.project-link-secondary {
  flex: 0 1 auto;
}

/* Contact Section */
.contact-section {
  background: linear-gradient(
    135deg,
    rgba(167, 139, 250, 0.08) 0%,
    rgba(139, 92, 246, 0.12) 50%,
    rgba(167, 139, 250, 0.08) 100%
  );
  color: white;
  padding: 5rem 0 2rem;
  position: relative;
  overflow: hidden;
  border-top: 1px solid rgba(167, 139, 250, 0.15);
  box-shadow: 0 -20px 60px rgba(167, 139, 250, 0.1);
}

.contact-section .container {
  position: relative;
  z-index: 2;
}

.contact-heading-full {
  text-align: center;
  font-size: clamp(1.25rem, 2.5vw, 1.75rem);
  font-weight: 600;
  margin: 2rem 0 2rem;
  color: rgba(255, 255, 255, 0.9);
}

.contact-subtitle {
  text-align: center;
  margin-bottom: 0;
}

.contact-grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 1.5rem;
  margin-top: 2rem;
}

@media (min-width: 640px) {
  .contact-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .contact-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

/* Contact Section Background Effects */
.contact-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: -30%;
  width: 60%;
  height: 100%;
  background: radial-gradient(
    ellipse at center,
    rgba(167, 139, 250, 0.15) 0%,
    transparent 60%
  );
  filter: blur(80px);
  opacity: 0.6;
  z-index: 0;
}

.contact-section::after {
  content: '';
  position: absolute;
  top: 0;
  right: -30%;
  width: 60%;
  height: 100%;
  background: radial-gradient(
    ellipse at center,
    rgba(192, 132, 252, 0.12) 0%,
    transparent 60%
  );
  filter: blur(80px);
  opacity: 0.6;
  z-index: 0;
}

.contact-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  margin-bottom: 2.5rem;
}

.contact-info h3 {
  font-size: 1.75rem;
  font-weight: 700;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, #ffffff 0%, #a78bfa 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.contact-info p {
  font-size: 1.0625rem;
  opacity: 0.85;
  margin-bottom: 2rem;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.8);
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
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 20px;
  text-decoration: none;
  color: white;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  height: 100%;
}

.contact-method:hover {
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(167, 139, 250, 0.3);
  transform: translateY(-4px);
  box-shadow: 0 16px 48px rgba(167, 139, 250, 0.25);
}

.method-icon {
  font-size: 1.75rem;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  background: rgba(167, 139, 250, 0.1);
  border-radius: 12px;
  border: 1px solid rgba(167, 139, 250, 0.2);
}

.method-info {
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 0.25rem;
}

.method-label {
  display: block;
  font-weight: 600;
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.95);
}

.method-value {
  display: block;
  font-size: 0.875rem;
  opacity: 0.75;
  color: rgba(255, 255, 255, 0.7);
}

.social-links h3 {
  font-size: 1.75rem;
  font-weight: 700;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, #ffffff 0%, #a78bfa 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
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
  padding: 1.25rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  text-decoration: none;
  color: white;
  transition: all 0.3s ease;
  backdrop-filter: blur(20px);
}

.social-link:hover {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(167, 139, 250, 0.35);
  transform: translateX(5px);
  box-shadow: 0 4px 20px rgba(167, 139, 250, 0.25);
}

.social-icon {
  width: 24px;
  height: 24px;
}

.footer-bottom {
  text-align: center;
  padding-top: 2rem;
  margin-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
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
    width: 700px;
    height: 340px;
  }
  
  .terminal-footer {
    flex-wrap: wrap;
    gap: 16px;
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
    width: 650px;
    height: 320px;
  }
  
  .terminal-transition {
    min-height: 350px;
    padding: 4rem 0;
  }
  
  .code-lines-container {
    gap: 6px;
  }
  
  .terminal-footer {
    flex-wrap: wrap;
    gap: 12px;
  }

}

/* Desktop - 2 Column Symmetric Layout */
@media (min-width: 1024px) {
  .about-grid-modern {
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
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

  .terminal-transition {
    min-height: 320px;
    padding: 3rem 0;
  }

  .code-terminal {
    width: 100%;
    max-width: 500px;
    height: 310px;
    margin: 0 auto;
  }
  
  .terminal-body {
    padding: 20px;
  }
  
  .code-line {
    font-size: 0.85rem;
    gap: 12px;
  }
  
  .terminal-footer {
    flex-wrap: wrap;
    gap: 10px;
    padding-top: 12px;
    margin-top: 12px;
  }
  
  .footer-stat {
    font-size: 0.75rem;
    padding: 4px 8px;
  }
  
  .terminal-decoration {
    display: none;
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
    padding: 4rem 0;
  }

  .about-header {
    margin-bottom: 3.5rem;
  }

  .section-title-modern {
    font-size: clamp(2rem, 5vw, 2.75rem);
  }

  .section-description {
    font-size: 1.0625rem;
  }

  .about-grid-modern {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .about-column {
    gap: 1.5rem;
  }

  .info-card,
  .skills-card,
  .cv-card-compact {
    padding: 1.75rem;
  }

  .info-title {
    font-size: 1.375rem;
  }

  .info-text {
    font-size: 0.9375rem;
  }

  .skills-title {
    font-size: 1.25rem;
  }

  .skill-item {
    font-size: 0.875rem;
  }

  .cv-header-compact h3 {
    font-size: 1.25rem;
  }

  .projects-section {
    padding: 2.5rem 0;
  }

  .projects-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .project-image-wrapper {
    height: 200px;
  }

  .project-content {
    padding: 1.75rem;
    align-items: center;
    text-align: center;
  }

  .project-links {
    gap: 0.75rem;
    justify-content: center;
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

  /* remove stray absolute override on small layouts for terminal */

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
    padding: 3.5rem 0;
  }

  .about-header {
    margin-bottom: 3rem;
  }

  .section-label {
    padding: 0.5rem 1.25rem;
    font-size: 0.8125rem;
  }

  .section-title-modern {
    font-size: clamp(1.75rem, 5vw, 2.25rem);
  }

  .section-description {
    font-size: 1rem;
  }

  .about-grid-modern {
    grid-template-columns: 1fr;
    gap: 1.25rem;
  }

  .about-column {
    gap: 1.25rem;
  }

  .info-card,
  .skills-card,
  .cv-card-compact {
    padding: 1.5rem;
  }

  .info-icon {
    font-size: 1.75rem;
  }

  .info-title {
    font-size: 1.25rem;
  }

  .info-text {
    font-size: 0.875rem;
  }

  .skills-icon {
    font-size: 1.375rem;
  }

  .skills-title {
    font-size: 1.125rem;
  }

  .skill-item {
    font-size: 0.8125rem;
    padding: 0.5rem 0.625rem;
  }

  .cv-header-compact {
    gap: 0.75rem;
  }

  .cv-header-compact svg {
    width: 24px;
    height: 24px;
  }

  .cv-header-compact h3 {
    font-size: 1.125rem;
  }

  .cv-desc-compact {
    font-size: 0.875rem;
  }

  .cv-buttons-compact {
    flex-direction: column;
    gap: 0.625rem;
  }

  .cv-btn-compact {
    font-size: 0.8125rem;
    padding: 0.75rem 0.875rem;
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

  .projects-section {
    padding: 2rem 0;
  }

  .projects-grid {
    grid-template-columns: 1fr;
    gap: 1.75rem;
    margin-top: 2rem;
  }

  .project-card {
    max-width: 100%;
  }

  .project-image-wrapper {
    height: 200px;
  }

  .project-content {
    padding: 1.5rem;
    align-items: center;
    text-align: center;
  }

  .project-title {
    font-size: 1.25rem;
    text-align: center;
  }

  .project-description {
    font-size: 0.875rem;
    min-height: auto;
    text-align: center;
  }

  .project-tech {
    gap: 0.4rem;
    justify-content: center;
  }

  .tech-tag {
    font-size: 0.75rem;
    padding: 0.375rem 0.75rem;
    gap: 0.375rem;
  }
  
  .tech-icon {
    font-size: 0.875rem;
  }

  .project-links {
    flex-direction: column;
    gap: 0.625rem;
    justify-content: center;
    align-items: center;
  }

  .project-link {
    flex: 1 1 auto;
    width: 100%;
    max-width: 280px;
  }

  .hero-visual {
    min-height: 400px;
    padding: 1.5rem 0;
  }

  .tech-showcase {
    padding: 1.5rem;
    max-width: 380px;
  }

  .terminal-transition {
    min-height: 280px;
    padding: 2.5rem 0;
  }

  .code-terminal {
    max-width: 360px;
    height: 280px;
  }

  /* Smaller line height on very small devices */
  .code-lines-container {
    --line-h: 26px;
    --gap: 6px;
  }

  .terminal-header {
    padding: 10px 16px;
  }
  
  .terminal-title {
    font-size: 0.85rem;
  }
  
  .terminal-title::before {
    font-size: 0.9rem;
  }
  
  .terminal-status {
    display: none;
  }

  .terminal-body {
    padding: 16px;
    min-height: 180px;
  }
  
  .code-lines-container {
    gap: 6px;
  }

  .code-line {
    font-size: 0.8rem;
    gap: 10px;
  }

  .code-prompt {
    font-size: 0.95rem;
  }

  .code-text {
    font-size: 0.8rem;
  }
  
  .line-number {
    font-size: 0.75rem;
    min-width: 16px;
  }
  
  .terminal-footer {
    flex-direction: column;
    gap: 8px;
    padding-top: 10px;
    margin-top: 10px;
  }
  
  .footer-stat {
    font-size: 0.7rem;
    padding: 4px 8px;
    width: 100%;
    justify-content: center;
  }
  
  .terminal-particle {
    width: 3px;
    height: 3px;
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


