<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

// Mouse parallax effect
const mouseX = ref(0)
const mouseY = ref(0)
const isLoaded = ref(false)

// Pre-generate particles with better distribution (static, won't re-render)
const particles = Array.from({ length: 50 }, (_, i) => {
  const types = ['float', 'twinkle', 'drift']
  const type = types[Math.floor(Math.random() * types.length)]
  
  return {
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    delay: Math.random() * 8, // Shorter delays
    duration: 8 + Math.random() * 8, // Shorter durations (8-16s)
    type: type,
    size: 2 + Math.random() * 2, // Variable size (2-4px)
    opacity: 0.3 + Math.random() * 0.5 // Variable opacity (0.3-0.8)
  }
})

// Tech stack with icons
const techStack = [
  { name: 'Vue', color: '#42b883' },
  { name: 'React', color: '#61dafb' },
  { name: 'TypeScript', color: '#3178c6' },
  { name: 'Tailwind', color: '#06b6d4' },
  { name: 'Vite', color: '#646cff' },
  { name: 'Git', color: '#f05032' },
  { name: 'Azure', color: '#0078d4' },
  { name: 'AWS', color: '#ff9900' },
  { name: 'Figma', color: '#f24e1e' },
  { name: 'Firebase', color: '#ffca28' }
]

// Mouse move handler for parallax
const handleMouseMove = (e: MouseEvent) => {
  const x = (e.clientX / window.innerWidth - 0.5) * 20
  const y = (e.clientY / window.innerHeight - 0.5) * 20
  mouseX.value = x
  mouseY.value = y
}

// Scroll to section
const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}

onMounted(() => {
  // Fade in animation
  setTimeout(() => {
    isLoaded.value = true
  }, 100)
  
  // Add mouse move listener
  window.addEventListener('mousemove', handleMouseMove)
})

onUnmounted(() => {
  window.removeEventListener('mousemove', handleMouseMove)
})
</script>

<template>
  <section class="hero-section" :class="{ 'loaded': isLoaded }">
    <!-- Dynamic animated background - v-memo prevents re-render -->
    <div class="hero-background" v-memo="[mouseX, mouseY]">
      <!-- Gradient orbs -->
      <div class="orb orb-1" :style="{ transform: `translate(${mouseX * 2}px, ${mouseY * 2}px)` }"></div>
      <div class="orb orb-2" :style="{ transform: `translate(${mouseX * -1.5}px, ${mouseY * -1.5}px)` }"></div>
      <div class="orb orb-3" :style="{ transform: `translate(${mouseX * 1}px, ${mouseY * 1}px)` }"></div>
      
      <!-- Floating particles - using pre-generated array -->
      <div class="particles-container">
        <div 
          class="particle" 
          v-for="particle in particles" 
          :key="particle.id"
          :class="`particle-${particle.type}`"
          :style="{ 
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            animationDelay: `${particle.delay}s`,
            animationDuration: `${particle.duration}s`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            opacity: particle.opacity
          }"
        ></div>
      </div>
      
      <!-- Grid overlay for depth -->
      <div class="grid-overlay"></div>
    </div>

    <!-- Main hero content -->
    <div class="hero-container">
      
      <!-- Main headline -->
      <h1 class="hero-headline fade-in-up" style="animation-delay: 0.4s">
        <span class="headline-pre">{{ t('hero.greeting') }}</span>
        <span class="headline-main">
          {{ t('hero.title') }}
          <span class="headline-accent">{{ t('hero.titleAccent') }}</span>
          <span class="headline-highlight">{{ t('hero.titleHighlight') }}</span>
        </span>
        </h1>
        
      <!-- CTA Buttons -->
      <div class="hero-actions fade-in-up" style="animation-delay: 0.8s">
        <button class="btn btn-primary magnetic" @click="scrollToSection('projects')">
          <span class="btn-content">
            <span class="btn-text">{{ t('hero.cta.viewWork') }}</span>
                <svg class="btn-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M4 10h12m0 0l-4-4m4 4l-4 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
          </span>
          <span class="btn-shimmer"></span>
              </button>
        
        <button class="btn btn-secondary magnetic" @click="scrollToSection('contact')">
          <span class="btn-content">
            <span class="btn-text">{{ t('hero.cta.letsTalk') }}</span>
            <svg class="btn-icon" width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </span>
          <span class="btn-shimmer"></span>
              </button>
        </div>

      <!-- Quick stats/highlights -->
      <div class="hero-stats fade-in-up" style="animation-delay: 1s">
        <div class="stat-item">
          <div class="stat-icon">⚡</div>
          <div class="stat-content">
            <div class="stat-number">{{ t('hero.stats.experience.number') }}</div>
            <div class="stat-label">{{ t('hero.stats.experience.label') }}</div>
            </div>
        </div>

        <div class="stat-divider"></div>
        
        <div class="stat-item">
          <div class="stat-icon">🚀</div>
          <div class="stat-content">
            <div class="stat-number">{{ t('hero.stats.projects.number') }}</div>
            <div class="stat-label">{{ t('hero.stats.projects.label') }}</div>
          </div>
        </div>

        <div class="stat-divider"></div>
        
        <div class="stat-item">
          <div class="stat-icon">💎</div>
          <div class="stat-content">
            <div class="stat-number">{{ t('hero.stats.satisfaction.number') }}</div>
            <div class="stat-label">{{ t('hero.stats.satisfaction.label') }}</div>
            </div>
          </div>
        </div>

      <!-- Tech stack preview -->
      <div class="tech-stack-preview fade-in-up" style="animation-delay: 1.2s">
        <p class="tech-label">{{ t('hero.poweredBy') }}</p>
        <div class="tech-icons">
          <div class="tech-badge" v-for="tech in techStack" :key="tech.name">
            <span class="tech-dot" :style="{ background: tech.color }"></span>
            <span class="tech-name">{{ tech.name }}</span>
            </div>
        </div>
      </div>

      <!-- Scroll indicator -->
      <div class="scroll-indicator fade-in" style="animation-delay: 1.4s">
        <div class="scroll-mouse">
          <div class="scroll-wheel"></div>
        </div>
        <p class="scroll-text">{{ t('hero.scrollToExplore') }}</p>
      </div>
    </div>

    <!-- Decorative elements -->
    <div class="decorative-lines" v-once>
      <div class="line line-1"></div>
      <div class="line line-2"></div>
      <div class="line line-3"></div>
    </div>
  </section>
</template>

<style scoped>
/* ===================================
   BASE STYLES & VARIABLES
   =================================== */
.hero-section {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: linear-gradient(135deg, #0a0118 0%, #1a0b2e 50%, #16123f 100%);
  opacity: 0;
  transition: opacity 1s cubic-bezier(0.4, 0, 0.2, 1);
}

.hero-section.loaded {
  opacity: 1;
}

/* ===================================
   ANIMATED BACKGROUND
   =================================== */
.hero-background {
  position: absolute;
  inset: 0;
  z-index: 0;
  overflow: hidden;
}

/* Gradient orbs with blur effect */
.orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(100px);
  opacity: 0.6;
  animation: float-orb 25s ease-in-out infinite;
  will-change: transform;
}

.orb-1 {
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, rgba(124, 58, 237, 0.5) 0%, transparent 70%);
  top: -15%;
  left: -15%;
  animation-delay: 0s;
}

.orb-2 {
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, rgba(59, 130, 246, 0.4) 0%, transparent 70%);
  bottom: -15%;
  right: -10%;
  animation-delay: 8s;
}

.orb-3 {
  width: 450px;
  height: 450px;
  background: radial-gradient(circle, rgba(168, 85, 247, 0.35) 0%, transparent 70%);
  top: 40%;
  left: 60%;
  animation-delay: 4s;
}

@keyframes float-orb {
  0%, 100% {
    transform: translate(0, 0) scale(1);
  }
  33% {
    transform: translate(50px, -50px) scale(1.1);
  }
  66% {
    transform: translate(-30px, 30px) scale(0.95);
  }
}

/* Floating particles */
.particles-container {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
}

.particle {
  position: absolute;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 50%;
  box-shadow: 0 0 8px rgba(255, 255, 255, 0.4);
  will-change: transform, opacity;
}

/* Floating animation - moves up */
.particle-float {
  animation: particle-float 12s ease-in-out infinite;
}

@keyframes particle-float {
  0% {
    transform: translateY(0) translateX(0);
  }
  25% {
    transform: translateY(-30vh) translateX(10px);
  }
  50% {
    transform: translateY(-60vh) translateX(-5px);
  }
  75% {
    transform: translateY(-80vh) translateX(15px);
  }
  100% {
    transform: translateY(-100vh) translateX(0);
  }
}

/* Twinkling animation - stays in place */
.particle-twinkle {
  animation: particle-twinkle 4s ease-in-out infinite;
}

@keyframes particle-twinkle {
  0%, 100% {
    opacity: 0.4;
    transform: scale(0.9);
  }
  50% {
    opacity: 1;
    transform: scale(1.3);
  }
}

/* Drifting animation - moves diagonally */
.particle-drift {
  animation: particle-drift 10s linear infinite;
}

@keyframes particle-drift {
  0% {
    transform: translate(0, 0);
  }
  33% {
    transform: translate(30px, -40vh);
  }
  66% {
    transform: translate(-20px, -70vh);
  }
  100% {
    transform: translate(10px, -100vh);
  }
}

/* Grid overlay for depth */
.grid-overlay {
  position: absolute;
  inset: 0;
  background-image: 
    linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
  background-size: 50px 50px;
  opacity: 0.5;
  animation: grid-pulse 4s ease-in-out infinite;
}

@keyframes grid-pulse {
  0%, 100% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.5;
  }
}

/* ===================================
   HERO CONTAINER
   =================================== */
.hero-container {
  position: relative;
  z-index: 1;
  max-width: 1200px;
  width: 100%;
  padding: 110px 40px 70px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

/* ===================================
   HERO HEADLINE
   =================================== */
.hero-headline {
  margin-bottom: 2.5rem;
  max-width: 900px;
}

.headline-pre {
  display: block;
  font-size: clamp(1.1rem, 2.5vw, 1.4rem);
  font-weight: 500;
  color: rgba(255, 255, 255, 0.75);
  margin-bottom: 1.25rem;
  letter-spacing: 0.5px;
}

.headline-main {
  display: block;
  font-size: clamp(2.5rem, 7vw, 5rem);
  font-weight: 800;
  line-height: 1.15;
  background: linear-gradient(
    135deg,
    #ffffff 0%,
    #a78bfa 40%,
    #60a5fa 70%,
    #c084fc 100%
  );
  background-size: 200% 200%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: gradient-shift 8s ease infinite;
  letter-spacing: -0.03em;
}

@keyframes gradient-shift {
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

.headline-accent {
  display: block;
  font-size: clamp(1.6rem, 4.5vw, 2.75rem);
  font-weight: 600;
  color: rgba(255, 255, 255, 0.85);
  margin-top: 0.75rem;
  letter-spacing: 0.01em;
}

.headline-highlight {
  display: block;
  font-size: clamp(2.2rem, 6vw, 4.5rem);
  font-weight: 800;
  background: linear-gradient(
    135deg,
    #c084fc 0%,
    #7c3aed 50%,
    #6366f1 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  position: relative;
  padding-bottom: 0.25em;
  margin-top: 0.125rem;
  line-height: 1.2;
}

.headline-highlight::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 65%;
  height: 4px;
  background: linear-gradient(
    90deg,
    transparent,
    #7c3aed,
    transparent
  );
  border-radius: 2px;
}

/* ===================================
   CTA BUTTONS
   =================================== */
.hero-actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 3.5rem;
}

.btn {
  position: relative;
  padding: 16px 32px;
  border: none;
  border-radius: 14px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.btn-content {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  gap: 8px;
}

.btn-icon {
  transition: transform 0.3s ease;
}

.btn:hover .btn-icon {
  transform: translateX(4px);
}

.btn-primary {
  background: linear-gradient(135deg, #7c3aed 0%, #6366f1 100%);
  color: white;
  box-shadow: 
    0 8px 30px rgba(124, 58, 237, 0.4),
    0 0 0 1px rgba(255, 255, 255, 0.1) inset;
}

.btn-primary:hover {
  box-shadow: 
    0 12px 40px rgba(124, 58, 237, 0.6),
    0 0 0 1px rgba(255, 255, 255, 0.2) inset;
  transform: translateY(-3px);
}

.btn-secondary {
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(10px);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.15);
  border-color: rgba(255, 255, 255, 0.3);
  transform: translateY(-3px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
}

.btn-shimmer {
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.3),
    transparent
  );
  transition: left 0.6s ease;
}

.btn:hover .btn-shimmer {
  left: 100%;
}

/* Magnetic effect for buttons */
.magnetic {
  transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

/* ===================================
   HERO STATS
   =================================== */
.hero-stats {
  display: flex;
  align-items: center;
  gap: 2.5rem;
  padding: 2.25rem 3rem;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  margin-bottom: 3rem;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.stat-icon {
  font-size: 2rem;
  filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.3));
}

.stat-content {
  text-align: left;
}

.stat-number {
  font-size: 1.75rem;
  font-weight: 800;
  color: white;
  line-height: 1;
  background: linear-gradient(135deg, #ffffff 0%, #a78bfa 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.stat-label {
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.6);
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-top: 0.25rem;
}

.stat-divider {
  width: 1px;
  height: 40px;
  background: linear-gradient(
    to bottom,
    transparent,
    rgba(255, 255, 255, 0.2),
    transparent
  );
}

/* ===================================
   TECH STACK PREVIEW
   =================================== */
.tech-stack-preview {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.25rem;
  margin-bottom: 3rem;
}

.tech-label {
  font-size: 0.6875rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: rgba(255, 255, 255, 0.45);
  font-weight: 600;
}

.tech-icons {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  justify-content: center;
}

.tech-badge {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 7px 13px;
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 10px;
  transition: all 0.3s ease;
  cursor: pointer;
}

.tech-badge:hover {
  background: rgba(255, 255, 255, 0.15);
  border-color: rgba(255, 255, 255, 0.3);
  transform: translateY(-3px) scale(1.05);
  box-shadow: 0 6px 20px rgba(124, 58, 237, 0.4);
}

.tech-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  box-shadow: 0 0 8px currentColor;
  flex-shrink: 0;
}

.tech-name {
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.8125rem;
  font-weight: 600;
  white-space: nowrap;
  letter-spacing: 0.01em;
}

/* ===================================
   SCROLL INDICATOR
   =================================== */
.scroll-indicator {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  opacity: 0.6;
  transition: opacity 0.3s ease;
}

.scroll-indicator:hover {
  opacity: 1;
}

.scroll-mouse {
  width: 26px;
  height: 40px;
  border: 2px solid rgba(255, 255, 255, 0.5);
  border-radius: 13px;
  position: relative;
  animation: scroll-bounce 2s ease-in-out infinite;
}

.scroll-wheel {
  width: 4px;
  height: 10px;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 2px;
  position: absolute;
  top: 8px;
  left: 50%;
  transform: translateX(-50%);
  animation: scroll-wheel 2s ease-in-out infinite;
}

@keyframes scroll-bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(10px);
  }
}

@keyframes scroll-wheel {
  0%, 100% {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
  50% {
    opacity: 0.3;
    transform: translateX(-50%) translateY(10px);
  }
}

.scroll-text {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  color: rgba(255, 255, 255, 0.5);
  font-weight: 600;
}

/* ===================================
   DECORATIVE LINES
   =================================== */
.decorative-lines {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  opacity: 0.15;
}

.line {
  position: absolute;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(124, 58, 237, 0.5),
    transparent
  );
  height: 1px;
  width: 100%;
  animation: line-slide 10s ease-in-out infinite;
}

.line-1 {
  top: 20%;
  animation-delay: 0s;
}

.line-2 {
  top: 50%;
  animation-delay: 3s;
}

.line-3 {
  top: 80%;
  animation-delay: 6s;
}

@keyframes line-slide {
  0%, 100% {
    transform: translateX(-100%);
    opacity: 0;
  }
  50% {
    transform: translateX(0);
    opacity: 1;
  }
}

/* ===================================
   FADE IN ANIMATIONS
   =================================== */
.fade-in-up {
  opacity: 0;
  animation: fade-in-up 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-in {
    opacity: 0;
  animation: fade-in 0.8s ease forwards;
  }

@keyframes fade-in {
  to {
    opacity: 1;
  }
}

/* ===================================
   RESPONSIVE DESIGN - MOBILE FIRST
   =================================== */

/* Tablet */
@media (max-width: 1024px) {
  .hero-container {
    padding: 100px 30px 60px;
  }

  .hero-stats {
    gap: 1.5rem;
    padding: 1.5rem 2rem;
  }

  .stat-number {
    font-size: 1.5rem;
  }

  .stat-icon {
    font-size: 1.75rem;
  }
}

/* Mobile */
@media (max-width: 768px) {
  .hero-container {
    padding: 100px 24px 60px;
  }

  .hero-headline {
    margin-bottom: 2rem;
  }

  .headline-pre {
    margin-bottom: 1rem;
    font-size: 1rem;
  }

  .headline-main {
    font-size: clamp(2.25rem, 9vw, 3.5rem) !important;
    line-height: 1.2;
  }

  .headline-accent {
    font-size: clamp(1.35rem, 5vw, 2rem) !important;
    margin-top: 0.875rem;
  }

  .headline-highlight {
    font-size: clamp(1.85rem, 7.5vw, 2.75rem) !important;
    margin-top: 0.375rem;
  }

  .headline-highlight::after {
    width: 85%;
    height: 3px;
  }

  .hero-actions {
    flex-direction: column;
    width: 100%;
    max-width: 100%;
    gap: 0.875rem;
    margin-bottom: 2.5rem;
  }
  
  .btn {
    width: 100%;
    padding: 16px 28px;
    font-size: 1rem;
  }

  .btn-content {
    gap: 12px;
  }

  .btn-icon {
    width: 20px;
    height: 20px;
    flex-shrink: 0;
  }

  .hero-stats {
    flex-direction: column;
    gap: 1.5rem;
    padding: 2rem 1.75rem;
    width: 100%;
    max-width: 100%;
    margin-bottom: 2.5rem;
  }
  
  .stat-item {
    width: 100%;
    justify-content: center;
  }
  
  .stat-divider {
    width: 100%;
    height: 1px;
  }

  .tech-stack-preview {
    margin-bottom: 2.5rem;
    padding: 0 16px;
  }

  .tech-label {
    font-size: 0.625rem;
    letter-spacing: 1.75px;
  }

  .tech-icons {
    gap: 0.625rem;
    flex-wrap: wrap;
    justify-content: center;
  }
  
  .tech-badge {
    padding: 6px 11px;
    gap: 6px;
  }

  .tech-dot {
    width: 6px;
    height: 6px;
  }

  .tech-name {
    font-size: 0.75rem;
  }

  /* Reduce orb sizes on mobile */
  .orb-1 {
    width: 400px;
    height: 400px;
  }

  .orb-2 {
    width: 350px;
    height: 350px;
  }

  .orb-3 {
    width: 300px;
    height: 300px;
  }
}

/* Small mobile */
@media (max-width: 480px) {
  .hero-container {
    padding: 90px 20px 50px;
  }
  
  .hero-headline {
    margin-bottom: 1.75rem;
  }

  .headline-pre {
    font-size: 0.9375rem;
    margin-bottom: 0.875rem;
  }

  .headline-main {
    font-size: clamp(2rem, 11vw, 2.75rem) !important;
    line-height: 1.2;
  }

  .headline-accent {
    font-size: clamp(1.25rem, 6vw, 1.65rem) !important;
    margin-top: 0.75rem;
  }

  .headline-highlight {
    font-size: clamp(1.65rem, 9vw, 2.25rem) !important;
    margin-top: 0.375rem;
  }

  .hero-actions {
    gap: 0.75rem;
    margin-bottom: 2rem;
  }

  .btn {
    font-size: 0.9375rem;
    padding: 15px 24px;
  }

  .btn-icon {
    width: 18px;
    height: 18px;
  }

  .hero-stats {
    padding: 1.875rem 1.5rem;
    gap: 1.25rem;
    margin-bottom: 2rem;
  }

  .stat-item {
    gap: 0.75rem;
  }

  .stat-icon {
    font-size: 1.5rem;
  }

  .stat-number {
    font-size: 1.3rem;
  }

  .stat-label {
    font-size: 0.7rem;
  }

  .tech-stack-preview {
    margin-bottom: 2rem;
  }

  .tech-label {
    font-size: 0.5625rem;
    letter-spacing: 1.5px;
  }

  .tech-icons {
    gap: 0.5rem;
  }

  .tech-badge {
    padding: 5px 10px;
    gap: 5px;
  }

  .tech-dot {
    width: 5px;
    height: 5px;
  }

  .tech-name {
    font-size: 0.6875rem;
  }

  /* Reduce orb sizes more on small mobile */
  .orb-1 {
    width: 300px;
    height: 300px;
  }

  .orb-2 {
    width: 250px;
    height: 250px;
  }

  .orb-3 {
    width: 200px;
    height: 200px;
  }
}
</style>

