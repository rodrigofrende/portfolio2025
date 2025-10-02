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

// Tech stack data for showcase
const techStack = ref([
  { name: "Vue.js", icon: "V", level: "Expert", progress: 90, category: "framework" },
  { name: "TypeScript", icon: "TS", level: "Advanced", progress: 85, category: "language" },
  { name: "React", icon: "R", level: "Advanced", progress: 80, category: "framework" },
  { name: "JavaScript", icon: "JS", level: "Expert", progress: 95, category: "language" },
  { name: "CSS3", icon: "CSS", level: "Expert", progress: 90, category: "style" },
  { name: "Node.js", icon: "N", level: "Intermediate", progress: 70, category: "backend" },
  { name: "Tailwind", icon: "T", level: "Expert", progress: 88, category: "style" },
  { name: "Azure", icon: "A", level: "Intermediate", progress: 75, category: "cloud" },
  { name: "AWS", icon: "A", level: "Intermediate", progress: 72, category: "cloud" },
  { name: "Git", icon: "G", level: "Expert", progress: 92, category: "tool" },
  { name: "Figma", icon: "F", level: "Advanced", progress: 82, category: "design" },
  { name: "Vite", icon: "V", level: "Advanced", progress: 85, category: "tool" }
])

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

// Optimized SVG icons for tech stack
const getTechIcon = (techName: string) => {
  const icons: Record<string, string> = {
    'Vue.js': '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M24,1.61H14.06L12,5.16,9.94,1.61H0L12,22.39ZM12,14.08,5.16,2.23H9.59L12,6.41l2.41-4.18h4.43Z"/></svg>',
    'TypeScript': '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 27.72 27.72 0 0 0-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629 7.536 7.536 0 0 1 1.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z"/></svg>',
    'React': '<svg viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="2" fill="#61dafb"/><path d="M12 2c-2.5 0-4.8 1.2-6.2 3.2-1.4 2-1.4 4.6 0 6.6 1.4 2 3.7 3.2 6.2 3.2s4.8-1.2 6.2-3.2c1.4-2 1.4-4.6 0-6.6C16.8 3.2 14.5 2 12 2zm0 2c1.8 0 3.4 1 4.3 2.5.9 1.5.9 3.5 0 5-0.9 1.5-2.5 2.5-4.3 2.5s-3.4-1-4.3-2.5c-0.9-1.5-0.9-3.5 0-5C8.6 5 10.2 4 12 4z" fill="#61dafb"/><path d="M12 8c-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4zm0 2c1.1 0 2 0.9 2 2s-0.9 2-2 2-2-0.9-2-2 0.9-2 2-2z" fill="#61dafb"/></svg>',
    'JavaScript': '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z"/></svg>',
    'CSS3': '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z"/></svg>',
    'Node.js': '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M11.998,24c-0.321,0-0.641-0.084-0.922-0.247l-2.936-1.737c-0.438-0.245-0.224-0.332-0.080-0.383 c0.585-0.203,0.703-0.250,1.328-0.604c0.065-0.037,0.151-0.023,0.218,0.017l2.256,1.339c0.082,0.045,0.197,0.045,0.272,0l8.795-5.076 c0.082-0.047,0.134-0.141,0.134-0.238V6.921c0-0.099-0.053-0.192-0.137-0.242l-8.791-5.072c-0.081-0.047-0.189-0.047-0.271,0 L3.075,6.68C2.990,6.729,2.936,6.825,2.936,6.921v10.15c0,0.097,0.054,0.189,0.139,0.235l2.409,1.392 c1.307,0.654,2.108-0.116,2.108-0.89V7.787c0-0.142,0.114-0.253,0.256-0.253h1.115c0.139,0,0.255,0.112,0.255,0.253v10.021 c0,1.745-0.95,2.745-2.604,2.745c-0.508,0-0.909,0-2.026-0.551L2.28,18.675c-0.57-0.329-0.922-0.945-0.922-1.604V6.921 c0-0.659,0.353-1.275,0.922-1.603l8.795-5.082c0.557-0.315,1.296-0.315,1.848,0l8.794,5.082c0.570,0.329,0.924,0.944,0.924,1.603 v10.15c0,0.659-0.354,1.273-0.924,1.604l-8.794,5.078C12.643,23.916,12.324,24,11.998,24z M19.099,13.993 c0-1.9-1.284-2.406-3.987-2.763c-2.731-0.361-3.009-0.548-3.009-1.187c0-0.528,0.235-1.233,2.258-1.233 c1.807,0,2.473,0.389,2.747,1.607c0.024,0.115,0.129,0.199,0.247,0.199h1.141c0.071,0,0.138-0.031,0.186-0.081 c0.048-0.054,0.074-0.123,0.067-0.196c-0.177-2.098-1.571-3.076-4.388-3.076c-2.508,0-4.004,1.058-4.004,2.833 c0,1.925,1.488,2.457,3.895,2.695c2.88,0.282,3.103,0.703,3.103,1.269c0,0.983-0.789,1.402-2.642,1.402 c-2.327,0-2.839-0.584-3.011-1.742c-0.02-0.124-0.126-0.215-0.253-0.215h-1.137c-0.141,0-0.254,0.112-0.254,0.253 c0,1.482,0.806,3.248,4.655,3.248C17.501,17.007,19.099,15.91,19.099,13.993z"/></svg>',
    'Tailwind': '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z"/></svg>',
    'Azure': '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 4h18l-3 6h-12l3-6zM6 10h12l-3 6h-6l-3-6z" fill="#0078d4"/><path d="M9 16h6l-3 4h-6l3-4z" fill="#0078d4"/></svg>',
    'AWS': '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2c5.5 0 10 4.5 10 10s-4.5 10-10 10S2 17.5 2 12 6.5 2 12 2zm0 2c-4.4 0-8 3.6-8 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8z" fill="none" stroke="currentColor" stroke-width="0.8"/><text x="12" y="9" font-family="Arial, sans-serif" font-size="3.5" font-weight="bold" text-anchor="middle" fill="currentColor">aws</text><path d="M8 13c0.5-0.5 1.2-1 2-1s1.5 0.5 2 1" fill="none" stroke="#ff9900" stroke-width="1"/></svg>',
    'Git': '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M23.546 10.93L13.067.452c-.604-.603-1.582-.603-2.188 0L8.708 2.627l2.76 2.76c.645-.215 1.379-.07 1.889.441.516.515.658 1.258.438 1.9l2.658 2.66c.645-.223 1.387-.078 1.9.435.721.72.721 1.884 0 2.604-.719.719-1.881.719-2.6 0-.539-.541-.674-1.337-.404-1.996L12.86 8.955v6.525c.176.086.342.203.488.348.713.721.713 1.883 0 2.6-.719.721-1.889.721-2.609 0-.719-.719-.719-1.879 0-2.598.182-.18.387-.316.605-.406V8.835c-.218-.091-.423-.222-.6-.401-.545-.545-.676-1.342-.396-2.009L7.636 3.7.45 10.881c-.6.605-.6 1.584 0 2.189l10.48 10.477c.604.604 1.582.604 2.186 0l10.43-10.43c.605-.603.605-1.582 0-2.187"/></svg>',
    'Figma': '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M6 6h6v6H6V6zm6 0h6v6h-6V6zm-6 6h6v6H6v-6zm6 0h6v6h-6v-6z" fill="#f24e1e"/><path d="M12 6h6v6h-6V6z" fill="#a259ff"/><path d="M6 12h6v6H6v-6z" fill="#ff7262"/><path d="M12 12h6v6h-6v-6z" fill="#1abcf0"/><path d="M6 6h6v6H6V6z" fill="#0acf83"/></svg>',
    'Vite': '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 7l10 5 10-5-10-5z" fill="#646cff"/><path d="M2 17l10 5 10-5M2 12l10 5 10-5" fill="#646cff"/></svg>'
  }
  return icons[techName] || `<span class="icon-text">${techName.charAt(0)}</span>`
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
            <span class="greeting">Hello! 👋</span>
          </div>
          <h1 class="hero-title">
            <span class="title-line typing-animation">I'm</span>
            <span class="title-name glitch-text" data-text="Rodrigo Frende">Rodrigo Frende</span>
            <div class="title-role-container">
              <span class="title-role typing-role">{{ currentRole }}</span>
              <span class="cursor">|</span>
            </div>
          </h1>
          <p class="hero-description">
            <span class="highlight-text">Frontend Developer</span> passionate about creating 
            <span class="highlight-text">digital experiences</span> that make a difference.
            Specialized in modern technologies and innovative design.
          </p>
          <div class="hero-buttons">
            <button class="btn-primary magnetic-btn" @click="scrollToSection('projects')">
              <span class="btn-text">View Projects</span>
              <div class="btn-shine"></div>
            </button>
            <button class="btn-secondary magnetic-btn" @click="scrollToSection('contact')">
              <span class="btn-text">Contact</span>
              <div class="btn-shine"></div>
            </button>
          </div>
        </div>
        
        <div class="hero-visual">
          <!-- Modern Tech Showcase -->
          <div class="tech-showcase">
            <div class="showcase-header">
              <h3 class="showcase-title">Tech Stack</h3>
              <div class="showcase-subtitle">Technologies I work with</div>
            </div>
            
            <div class="tech-grid">
              <div class="tech-item" v-for="(tech, index) in techStack" :key="tech.name" :style="{ '--delay': index * 0.1 + 's' }">
                <div class="tech-header">
                  <div class="tech-icon">
                    <div class="icon-wrapper" :class="tech.category">
                      <div class="tech-svg-icon" v-html="getTechIcon(tech.name)"></div>
                    </div>
                  </div>
                  <div class="level-indicator">
                    <div class="level-bars" :style="{ '--level': tech.progress + '%' }">
                      <div class="bar bar-1"></div>
                      <div class="bar bar-2"></div>
                      <div class="bar bar-3"></div>
                    </div>
                  </div>
                </div>
                <div class="tech-info">
                  <span class="tech-name">{{ tech.name }}</span>
                </div>
              </div>
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
    <section id="about" class="about-section">
      <div class="container">
        <h2 class="section-title">About Me</h2>
        <div class="about-content">
          <div class="about-text">
            <div class="about-intro">
              <h3>My Story</h3>
              <p>
                I'm a frontend developer passionate about creating digital experiences 
                that make a difference. With over X years of experience in web development, 
                I specialize in modern technologies like Vue.js, React, TypeScript 
                and responsive design.
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
                <h4>Tools</h4>
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
              <div class="stat-label">Projects</div>
            </div>
            <div class="stat-item">
              <div class="stat-number">3+</div>
              <div class="stat-label">Years</div>
            </div>
            <div class="stat-item">
              <div class="stat-number">100%</div>
              <div class="stat-label">Dedication</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Projects Section -->
    <section id="projects" class="projects-section">
      <div class="container">
        <h2 class="section-title">My Projects</h2>
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
        <h2 class="section-title">Contact</h2>
        <div class="contact-content">
          <div class="contact-info">
            <h3>Let's work together!</h3>
            <p>
              I'm always interested in new projects and opportunities. 
              Don't hesitate to contact me if you have any ideas in mind.
            </p>
            <div class="contact-methods">
              <a href="mailto:rodrigo.frende@gmail.com" class="contact-method">
                <div class="method-icon">📧</div>
                <div class="method-info">
                  <span class="method-label">Email</span>
                  <span class="method-value">rodrigo.frende@gmail.com</span>
                </div>
              </a>
            </div>
          </div>
          <div class="social-links">
            <h3>My Networks</h3>
            <div class="social-grid">
              <a href="https://github.com/rodrigofrende" target="_blank" class="social-link">
                <div class="social-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </div>
                <span>GitHub</span>
              </a>
              <a href="https://linkedin.com/in/rodrigofrende" target="_blank" class="social-link">
                <div class="social-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </div>
                <span>LinkedIn</span>
              </a>
              <a href="https://instagram.com/rf.3d.prints" target="_blank" class="social-link">
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
          <p>&copy; {{ new Date().getFullYear() }} Rodrigo Frende. All rights reserved.</p>
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

