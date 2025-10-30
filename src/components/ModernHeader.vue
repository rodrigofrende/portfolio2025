<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()
const isScrolled = ref(false)
const mobileMenuOpen = ref(false)
const activeSection = ref('home')

// Language switcher
const toggleLanguage = () => {
  const newLocale = locale.value === 'es' ? 'en' : 'es'
  locale.value = newLocale
  localStorage.setItem('locale', newLocale)
}

// Scroll handler
const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
  
  // Update active section based on scroll
  const sections = ['home', 'about', 'projects', 'contact']
  const scrollPosition = window.scrollY + 100
  
  for (const section of sections) {
    const element = document.getElementById(section)
    if (element) {
      const { offsetTop, offsetHeight } = element
      if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
        activeSection.value = section
        break
      }
    }
  }
}

// Scroll to section
const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
  mobileMenuOpen.value = false
}

// Toggle mobile menu
const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <header class="modern-header" :class="{ 'scrolled': isScrolled }">
    <nav class="nav-container">
      <!-- Logo -->
      <div class="nav-logo" @click="scrollToSection('home')">
        <span class="logo-text">RF Dev</span>
      </div>

      <!-- Desktop Navigation -->
      <ul class="nav-menu desktop-menu">
        <li 
          v-for="item in ['home', 'about', 'projects', 'contact']" 
          :key="item"
          class="nav-item"
        >
          <a 
            @click.prevent="scrollToSection(item)" 
            class="nav-link"
            :class="{ 'active': activeSection === item }"
            href="#"
          >
            {{ t(`nav.${item}`) }}
          </a>
        </li>
        
        <!-- Language Switcher Desktop -->
        <li class="nav-item">
          <button 
            @click="toggleLanguage" 
            class="lang-switcher"
            :title="locale === 'es' ? 'Cambiar a Inglés' : 'Switch to Spanish'"
          >
            <span class="lang-icon">🌐</span>
            <span class="lang-text">{{ locale === 'es' ? 'ES' : 'EN' }}</span>
          </button>
        </li>
      </ul>

      <!-- Mobile Menu Toggle -->
      <button 
        class="mobile-toggle" 
        :class="{ 'active': mobileMenuOpen }"
        @click="toggleMobileMenu"
        aria-label="Toggle menu"
      >
        <span class="toggle-line"></span>
        <span class="toggle-line"></span>
        <span class="toggle-line"></span>
      </button>
    </nav>

    <!-- Mobile Menu -->
    <div class="mobile-menu" :class="{ 'active': mobileMenuOpen }">
      <ul class="mobile-menu-list">
        <li 
          v-for="item in ['home', 'about', 'projects', 'contact']" 
          :key="item"
          class="mobile-menu-item"
        >
          <a 
            @click.prevent="scrollToSection(item)" 
            class="mobile-menu-link"
            :class="{ 'active': activeSection === item }"
            href="#"
          >
            {{ t(`nav.${item}`) }}
          </a>
        </li>
        
        <!-- Language Switcher Mobile -->
        <li class="mobile-menu-item">
          <button 
            @click="toggleLanguage" 
            class="mobile-lang-switcher"
          >
            <span class="lang-icon">🌐</span>
            <span class="lang-text">{{ locale === 'es' ? 'Español' : 'English' }}</span>
            <span class="lang-badge">{{ locale === 'es' ? 'ES' : 'EN' }}</span>
          </button>
        </li>
      </ul>
    </div>

    <!-- Glass overlay for mobile menu -->
    <div 
      class="mobile-overlay" 
      :class="{ 'active': mobileMenuOpen }"
      @click="toggleMobileMenu"
    ></div>
  </header>
</template>

<style scoped>
/* Modern Header */
.modern-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  padding: 1rem 0;
}

/* Glass effect when scrolled */
.modern-header.scrolled {
  background: rgba(13, 13, 23, 0.7);
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.3);
  padding: 0.75rem 0;
}

/* Nav Container */
.nav-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

/* Logo */
.nav-logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  transition: transform 0.3s ease;
  z-index: 1001;
}

.nav-logo:hover {
  transform: scale(1.05);
}

@keyframes rotate-logo {
  0%, 100% {
    transform: rotate(0deg) scale(1);
  }
  50% {
    transform: rotate(180deg) scale(1.1);
  }
}

.logo-text {
  font-size: 1.5rem;
  font-weight: 700;
  background: linear-gradient(135deg, #a78bfa 0%, #ec4899 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -0.02em;
  text-shadow: 0 0 30px rgba(167, 139, 250, 0.5);
}

/* Desktop Menu */
.desktop-menu {
  display: flex;
  list-style: none;
  gap: 2.5rem;
  align-items: center;
}

.nav-item {
  position: relative;
}

.nav-link {
  position: relative;
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  font-weight: 500;
  font-size: 1rem;
  letter-spacing: 0.02em;
  transition: all 0.3s ease;
  padding: 0.5rem 0;
  cursor: pointer;
}

.nav-link::before {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background: linear-gradient(90deg, #a78bfa, #ec4899);
  transition: width 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  box-shadow: 0 0 10px rgba(167, 139, 250, 0.5);
}

.nav-link:hover,
.nav-link.active {
  color: #fff;
}

.nav-link:hover::before,
.nav-link.active::before {
  width: 100%;
}

/* Glow effect on hover */
.nav-link:hover {
  text-shadow: 0 0 20px rgba(167, 139, 250, 0.6);
}

/* Language Switcher Desktop */
.lang-switcher {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 10px;
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.lang-switcher:hover {
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(167, 139, 250, 0.25);
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(167, 139, 250, 0.2);
}

.lang-icon {
  font-size: 1.125rem;
}

.lang-text {
  font-family: monospace;
  letter-spacing: 0.5px;
}

/* Mobile Toggle */
.mobile-toggle {
  display: none;
  flex-direction: column;
  gap: 6px;
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 12px;
  padding: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 1001;
}

.mobile-toggle:hover {
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(167, 139, 250, 0.25);
  box-shadow: 0 4px 12px rgba(167, 139, 250, 0.15);
}

.toggle-line {
  width: 24px;
  height: 2px;
  background: linear-gradient(90deg, #a78bfa, #ec4899);
  border-radius: 2px;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.mobile-toggle.active .toggle-line:nth-child(1) {
  transform: rotate(45deg) translate(8px, 8px);
}

.mobile-toggle.active .toggle-line:nth-child(2) {
  opacity: 0;
  transform: translateX(20px);
}

.mobile-toggle.active .toggle-line:nth-child(3) {
  transform: rotate(-45deg) translate(8px, -8px);
}

/* Mobile Menu */
.mobile-menu {
  position: fixed;
  top: 0;
  right: -100%;
  width: min(300px, 80vw);
  height: 100vh;
  background: rgba(13, 13, 23, 0.95);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-left: 1px solid rgba(255, 255, 255, 0.06);
  box-shadow: -8px 0 32px 0 rgba(0, 0, 0, 0.6);
  transition: right 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  z-index: 1000;
  padding-top: 100px;
}

.mobile-menu.active {
  right: 0;
}

.mobile-menu-list {
  list-style: none;
  padding: 0 2rem;
}

.mobile-menu-item {
  margin-bottom: 0.5rem;
}

.mobile-menu-link {
  display: block;
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  font-weight: 500;
  font-size: 1.25rem;
  padding: 1rem 1.5rem;
  border-radius: 12px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.mobile-menu-link::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 3px;
  height: 0;
  background: linear-gradient(180deg, #a78bfa, #ec4899);
  transition: height 0.3s ease;
  border-radius: 0 2px 2px 0;
}

.mobile-menu-link:hover,
.mobile-menu-link.active {
  background: rgba(167, 139, 250, 0.1);
  color: #fff;
  transform: translateX(8px);
}

.mobile-menu-link:hover::before,
.mobile-menu-link.active::before {
  height: 100%;
}

/* Language Switcher Mobile */
.mobile-lang-switcher {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  font-weight: 500;
  font-size: 1.25rem;
  padding: 1rem 1.5rem;
  border-radius: 12px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  background: transparent;
  border: none;
  cursor: pointer;
  text-align: left;
}

.mobile-lang-switcher .lang-icon {
  font-size: 1.5rem;
  margin-right: 1rem;
}

.mobile-lang-switcher .lang-text {
  flex: 1;
  font-family: inherit;
  letter-spacing: normal;
}

.lang-badge {
  padding: 4px 12px;
  background: rgba(167, 139, 250, 0.15);
  border: 1px solid rgba(167, 139, 250, 0.25);
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 600;
  font-family: monospace;
  letter-spacing: 0.5px;
}

.mobile-lang-switcher::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 3px;
  height: 0;
  background: linear-gradient(180deg, #a78bfa, #ec4899);
  transition: height 0.3s ease;
  border-radius: 0 2px 2px 0;
}

.mobile-lang-switcher:hover {
  background: rgba(167, 139, 250, 0.1);
  color: #fff;
  transform: translateX(8px);
}

.mobile-lang-switcher:hover::before {
  height: 100%;
}

.mobile-lang-switcher:hover .lang-badge {
  background: rgba(167, 139, 250, 0.25);
  border-color: rgba(167, 139, 250, 0.4);
}

/* Mobile Overlay */
.mobile-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
  z-index: 999;
}

.mobile-overlay.active {
  opacity: 1;
  visibility: visible;
}

/* Responsive */
@media (max-width: 768px) {
  .nav-container {
    padding: 0 1.5rem;
  }

  .desktop-menu {
    display: none;
  }

  .mobile-toggle {
    display: flex;
  }

  .logo-text {
    font-size: 1.25rem;
  }

  .logo-icon {
    width: 36px;
    height: 36px;
  }
}

@media (max-width: 480px) {
  .nav-container {
    padding: 0 1rem;
  }

  .mobile-menu {
    width: 85vw;
  }

  .mobile-menu-link {
    font-size: 1.125rem;
    padding: 0.875rem 1.25rem;
  }
}

/* Smooth animation on mount */
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.modern-header {
  animation: fade-in 0.6s ease-out;
}
</style>

