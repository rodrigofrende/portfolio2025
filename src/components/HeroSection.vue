<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

// Mouse parallax effect
const mouseX = ref(0)
const mouseY = ref(0)
const isLoaded = ref(false)

// Pre-generate particles (static, won't re-render)
const particles = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  left: Math.random() * 100,
  top: Math.random() * 100,
  delay: Math.random() * 15,
  duration: 15 + Math.random() * 10
}))

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
          :style="{ 
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            animationDelay: `${particle.delay}s`,
            animationDuration: `${particle.duration}s`
          }"
        ></div>
      </div>
      
      <!-- Grid overlay for depth -->
      <div class="grid-overlay"></div>
    </div>

    <!-- Main hero content -->
    <div class="hero-container">
      
      <!-- Status badge -->
      <div class="hero-badge fade-in-up" style="animation-delay: 0.2s">
        <span class="status-dot"></span>
        <span class="badge-label">{{ t('hero.badge') }}</span>
        <span class="badge-shine"></span>
      </div>

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
            <svg class="btn-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
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
}

.particle {
  position: absolute;
  width: 3px;
  height: 3px;
  background: rgba(255, 255, 255, 0.6);
  border-radius: 50%;
  animation: particle-float 20s linear infinite;
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
}

@keyframes particle-float {
  0% {
    transform: translateY(0) translateX(0);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    transform: translateY(-100vh) translateX(50px);
    opacity: 0;
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
  padding: 120px 40px 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

/* ===================================
   STATUS BADGE
   =================================== */
.hero-badge {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 10px 24px;
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 50px;
  color: white;
  font-size: 0.875rem;
  font-weight: 600;
  margin-bottom: 2.5rem;
  overflow: hidden;
  transition: all 0.3s ease;
}

.hero-badge:hover {
  background: rgba(255, 255, 255, 0.12);
  border-color: rgba(255, 255, 255, 0.25);
  transform: translateY(-2px);
}

.status-dot {
  width: 8px;
  height: 8px;
  background: #10b981;
  border-radius: 50%;
  animation: pulse-dot 2s ease-in-out infinite;
  box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7);
}

@keyframes pulse-dot {
  0%, 100% {
    box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7);
  }
  50% {
    box-shadow: 0 0 0 10px rgba(16, 185, 129, 0);
  }
}

.badge-label {
  position: relative;
  z-index: 2;
  letter-spacing: 0.5px;
}

.badge-shine {
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.2),
    transparent
  );
  animation: badge-shine 3s ease-in-out infinite;
}

@keyframes badge-shine {
  0% {
    left: -100%;
  }
  50%, 100% {
    left: 100%;
  }
}

/* ===================================
   HERO HEADLINE
   =================================== */
.hero-headline {
  margin-bottom: 2rem;
  max-width: 900px;
}

.headline-pre {
  display: block;
  font-size: clamp(1.2rem, 2.5vw, 1.5rem);
  font-weight: 500;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 1rem;
  letter-spacing: 0.5px;
}

.headline-main {
  display: block;
  font-size: clamp(2.5rem, 7vw, 5.5rem);
  font-weight: 800;
  line-height: 1.1;
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
  font-size: clamp(1.5rem, 4vw, 2.5rem);
  font-weight: 600;
  color: rgba(255, 255, 255, 0.8);
  margin-top: 0.5rem;
}

.headline-highlight {
  display: block;
  font-size: clamp(2rem, 5.5vw, 4rem);
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
  padding-bottom: 0.2em;
}

.headline-highlight::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 60%;
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
  gap: 1.25rem;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 4rem;
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
  gap: 2rem;
  padding: 2rem 3rem;
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
  gap: 1rem;
  margin-bottom: 4rem;
}

.tech-label {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  color: rgba(255, 255, 255, 0.5);
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
  gap: 8px;
  padding: 8px 14px;
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
  font-size: 0.875rem;
  font-weight: 600;
  white-space: nowrap;
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
    padding: 90px 20px 50px;
  }

  .hero-badge {
    font-size: 0.8125rem;
    padding: 8px 20px;
  }

  .headline-pre {
    margin-bottom: 0.75rem;
  }

  .headline-highlight::after {
    width: 80%;
    height: 3px;
  }

  .hero-actions {
    flex-direction: column;
    width: 100%;
    max-width: 400px;
    gap: 1rem;
  }

  .btn {
    width: 100%;
    padding: 14px 28px;
  }

  .hero-stats {
    flex-direction: column;
    gap: 1.5rem;
    padding: 2rem 1.5rem;
    width: 100%;
    max-width: 400px;
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
    margin-bottom: 3rem;
  }

  .tech-icons {
    gap: 0.5rem;
  }

  .tech-badge {
    padding: 6px 12px;
  }

  .tech-dot {
    width: 6px;
    height: 6px;
  }

  .tech-name {
    font-size: 0.8125rem;
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
    padding: 80px 16px 40px;
  }

  .hero-badge {
    font-size: 0.75rem;
    padding: 6px 16px;
    gap: 8px;
  }

  .status-dot {
    width: 6px;
    height: 6px;
  }

  .hero-stats {
    padding: 1.5rem 1rem;
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

  .tech-badge {
    padding: 5px 10px;
    gap: 6px;
  }

  .tech-dot {
    width: 6px;
    height: 6px;
  }

  .tech-name {
    font-size: 0.75rem;
  }

  .btn {
    font-size: 0.9375rem;
    padding: 13px 26px;
  }
}
</style>

