<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

interface CarouselItem {
  id: string
  icon: string
  title: string
  content: string
  type?: 'text' | 'list' | 'cv'
}

const currentIndex = ref(0)
const isAnimating = ref(false)
const touchStartX = ref(0)
const touchEndX = ref(0)

const valueItems = computed(() => {
  try {
    // Try direct array access
    const items = t('about.value.items') as unknown
    
    // Check if it's already an array
    if (Array.isArray(items)) {
      console.log('valueItems is array:', items)
      return items as string[]
    }
    
    // Check if it's an object (like {0: 'item1', 1: 'item2'})
    if (typeof items === 'object' && items !== null) {
      const arrayFromObject = Object.values(items) as string[]
      console.log('valueItems from object:', arrayFromObject)
      return arrayFromObject
    }
    
    // Try accessing each item individually as a fallback
    const manualItems: string[] = []
    for (let i = 0; i < 10; i++) {
      const item = t(`about.value.items.${i}`)
      if (item && !item.startsWith('about.value.items')) {
        manualItems.push(item)
      } else {
        break
      }
    }
    
    if (manualItems.length > 0) {
      console.log('valueItems manual:', manualItems)
      return manualItems
    }
    
    console.warn('valueItems fallback: empty array')
    return []
  } catch (error) {
    console.error('Error loading value items:', error)
    return []
  }
})

const items = computed<CarouselItem[]>(() => [
  {
    id: 'journey',
    icon: '🚀',
    title: t('about.journey.title'),
    content: t('about.journey.text'),
    type: 'text'
  },
  {
    id: 'approach',
    icon: '💡',
    title: t('about.approach.title'),
    content: t('about.approach.text'),
    type: 'text'
  },
  {
    id: 'value',
    icon: '✨',
    title: t('about.value.title'),
    content: '',
    type: 'list'
  },
  {
    id: 'cv',
    icon: '📄',
    title: t('about.cv.title'),
    content: t('about.cv.download'),
    type: 'cv'
  }
])

const goToSlide = (index: number) => {
  if (isAnimating.value || index === currentIndex.value) return
  isAnimating.value = true
  currentIndex.value = index
  setTimeout(() => {
    isAnimating.value = false
  }, 500)
}

const nextSlide = () => {
  const next = (currentIndex.value + 1) % items.value.length
  goToSlide(next)
}

const prevSlide = () => {
  const prev = (currentIndex.value - 1 + items.value.length) % items.value.length
  goToSlide(prev)
}

// Touch handlers for mobile swipe
const handleTouchStart = (e: TouchEvent) => {
  touchStartX.value = e.touches[0].clientX
}

const handleTouchMove = (e: TouchEvent) => {
  touchEndX.value = e.touches[0].clientX
}

const handleTouchEnd = () => {
  if (touchStartX.value - touchEndX.value > 50) {
    nextSlide()
  }
  if (touchEndX.value - touchStartX.value > 50) {
    prevSlide()
  }
}

// Keyboard navigation
const handleKeyDown = (e: KeyboardEvent) => {
  if (e.key === 'ArrowLeft') prevSlide()
  if (e.key === 'ArrowRight') nextSlide()
}

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown)
})
</script>

<template>
  <div class="carousel-container">
    <!-- Tabs Navigation -->
    <div class="carousel-tabs">
      <button
        v-for="(item, index) in items"
        :key="item.id"
        class="carousel-tab"
        :class="{ active: currentIndex === index }"
        @click="goToSlide(index)"
      >
        <span class="tab-icon">{{ item.icon }}</span>
        <span class="tab-title">{{ item.title }}</span>
        <div v-if="currentIndex === index" class="tab-indicator"></div>
      </button>
    </div>

    <!-- Content Area -->
    <div 
      class="carousel-content"
      @touchstart="handleTouchStart"
      @touchmove="handleTouchMove"
      @touchend="handleTouchEnd"
    >
      <!-- Navigation Arrows -->
      <button class="carousel-arrow carousel-arrow-left" @click="prevSlide" :disabled="isAnimating">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="15 18 9 12 15 6"/>
        </svg>
      </button>

      <button class="carousel-arrow carousel-arrow-right" @click="nextSlide" :disabled="isAnimating">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="9 18 15 12 9 6"/>
        </svg>
      </button>

      <!-- Slides -->
      <div class="carousel-track">
        <transition name="slide" mode="out-in">
          <div :key="currentIndex" class="carousel-slide">
            <!-- Text Content -->
            <div v-if="items[currentIndex].type === 'text'" class="slide-content-text">
              <div class="slide-icon-large">{{ items[currentIndex].icon }}</div>
              <h3 class="slide-title">{{ items[currentIndex].title }}</h3>
              <p class="slide-text">{{ items[currentIndex].content }}</p>
            </div>

            <!-- List Content -->
            <div v-else-if="items[currentIndex].type === 'list'" class="slide-content-list">
              <div class="slide-icon-large">{{ items[currentIndex].icon }}</div>
              <h3 class="slide-title">{{ items[currentIndex].title }}</h3>
              <!-- Debug info (remove after testing) -->
              <p v-if="valueItems.length === 0" style="color: yellow; text-align: center;">
                Debug: valueItems is empty. Check console for details.
              </p>
              <ul v-else class="slide-list">
                <li v-for="(item, idx) in valueItems" :key="idx" class="slide-list-item">
                  <svg class="list-check" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  <span>{{ item }}</span>
                </li>
              </ul>
            </div>

            <!-- CV Content -->
            <div v-else-if="items[currentIndex].type === 'cv'" class="slide-content-cv">
              <div class="slide-icon-large">{{ items[currentIndex].icon }}</div>
              <h3 class="slide-title">{{ items[currentIndex].title }}</h3>
              <p class="cv-description">{{ items[currentIndex].content }}</p>
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
        </transition>
      </div>

      <!-- Progress Indicators -->
      <div class="carousel-indicators">
        <button
          v-for="(item, index) in items"
          :key="index"
          class="indicator"
          :class="{ active: currentIndex === index }"
          @click="goToSlide(index)"
          :aria-label="`Go to ${item.title}`"
        ></button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.carousel-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

/* Tabs Navigation */
.carousel-tabs {
  display: flex;
  gap: 1rem;
  margin-bottom: 2.5rem;
  justify-content: center;
  flex-wrap: wrap;
  padding: 0.5rem;
}

.carousel-tab {
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 1.75rem;
  background: rgba(139, 92, 246, 0.08);
  border: 2px solid rgba(139, 92, 246, 0.2);
  border-radius: 1rem;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  white-space: nowrap;
  overflow: hidden;
}

.carousel-tab::before {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 3px;
  background: linear-gradient(90deg, #8b5cf6, #3b82f6);
  transform: scaleX(0);
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: 0 0 0.875rem 0.875rem;
}

.carousel-tab:hover:not(.active) {
  background: rgba(139, 92, 246, 0.15);
  border-color: rgba(139, 92, 246, 0.4);
  transform: translateY(-2px) scale(1.02);
  box-shadow: 0 4px 20px rgba(139, 92, 246, 0.2);
}

.carousel-tab:hover:not(.active)::before {
  transform: scaleX(0.5);
}

.carousel-tab.active {
  background: linear-gradient(135deg, rgba(139, 92, 246, 0.25), rgba(59, 130, 246, 0.25));
  border-color: rgba(139, 92, 246, 0.6);
  box-shadow: 0 8px 32px rgba(139, 92, 246, 0.4);
}

.carousel-tab.active::before {
  transform: scaleX(1);
}

.tab-icon {
  font-size: 1.5rem;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  flex-shrink: 0;
}

.carousel-tab:hover .tab-icon {
  transform: scale(1.1) rotate(-5deg);
}

.carousel-tab.active .tab-icon {
  transform: scale(1.15);
  filter: drop-shadow(0 0 8px rgba(139, 92, 246, 0.6));
}

.tab-title {
  font-size: 1rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.85);
  transition: color 0.3s ease;
}

.carousel-tab:hover .tab-title,
.carousel-tab.active .tab-title {
  color: rgba(255, 255, 255, 1);
}

.tab-indicator {
  /* Removed - now using ::before pseudo-element */
  display: none;
}

@keyframes slideIn {
  from {
    width: 0;
    opacity: 0;
  }
  to {
    width: 60%;
    opacity: 1;
  }
}

/* Content Area */
.carousel-content {
  position: relative;
  min-height: 500px;
  background: rgba(17, 24, 39, 0.5);
  border: 1px solid rgba(139, 92, 246, 0.2);
  border-radius: 1.5rem;
  padding: 3rem 2rem;
  backdrop-filter: blur(10px);
}

/* Navigation Arrows */
.carousel-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 48px;
  height: 48px;
  background: rgba(139, 92, 246, 0.2);
  border: 1px solid rgba(139, 92, 246, 0.4);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 10;
}

.carousel-arrow:hover:not(:disabled) {
  background: rgba(139, 92, 246, 0.4);
  transform: translateY(-50%) scale(1.1);
  box-shadow: 0 8px 24px rgba(139, 92, 246, 0.4);
}

.carousel-arrow:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.carousel-arrow-left {
  left: 1rem;
}

.carousel-arrow-right {
  right: 1rem;
}

.carousel-arrow svg {
  color: white;
}

/* Track & Slides */
.carousel-track {
  position: relative;
  width: 100%;
  min-height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 4rem;
}

.carousel-slide {
  width: 100%;
  max-width: 800px;
}

/* Slide Content Types */
.slide-icon-large {
  font-size: 4rem;
  margin-bottom: 1.5rem;
  text-align: center;
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

.slide-title {
  font-size: 2rem;
  font-weight: 700;
  color: white;
  text-align: center;
  margin-bottom: 1.5rem;
  background: linear-gradient(135deg, #8b5cf6, #3b82f6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.slide-content-text,
.slide-content-list,
.slide-content-cv {
  animation: fadeIn 0.5s ease;
}

.slide-text {
  font-size: 1.125rem;
  line-height: 1.8;
  color: rgba(255, 255, 255, 0.8);
  text-align: center;
  max-width: 700px;
  margin: 0 auto;
}

/* List Style */
.slide-list {
  list-style: none;
  padding: 0;
  max-width: 700px;
  margin: 0 auto;
}

.slide-list-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1rem;
  margin-bottom: 0.75rem;
  background: rgba(139, 92, 246, 0.05);
  border-radius: 0.75rem;
  border: 1px solid rgba(139, 92, 246, 0.1);
  transition: all 0.3s ease;
  animation: slideUp 0.5s ease backwards;
  animation-delay: calc(var(--index, 0) * 0.1s);
}

.slide-list-item:nth-child(1) { --index: 0; }
.slide-list-item:nth-child(2) { --index: 1; }
.slide-list-item:nth-child(3) { --index: 2; }
.slide-list-item:nth-child(4) { --index: 3; }
.slide-list-item:nth-child(5) { --index: 4; }
.slide-list-item:nth-child(6) { --index: 5; }
.slide-list-item:nth-child(7) { --index: 6; }

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.slide-list-item:hover {
  background: rgba(139, 92, 246, 0.1);
  border-color: rgba(139, 92, 246, 0.3);
  transform: translateX(8px);
}

.list-check {
  flex-shrink: 0;
  color: #8b5cf6;
  margin-top: 0.125rem;
}

.slide-list-item span {
  color: rgba(255, 255, 255, 0.9);
  font-size: 1rem;
  line-height: 1.6;
}

/* CV Buttons */
.cv-description {
  text-align: center;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 2rem;
  font-size: 1.125rem;
}

.cv-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.cv-button {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 2rem;
  border-radius: 0.75rem;
  font-weight: 600;
  font-size: 1rem;
  text-decoration: none;
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.cv-button-primary {
  background: linear-gradient(135deg, #8b5cf6, #6366f1);
  color: white;
  box-shadow: 0 8px 24px rgba(139, 92, 246, 0.4);
}

.cv-button-primary:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 32px rgba(139, 92, 246, 0.6);
}

.cv-button-secondary {
  background: rgba(139, 92, 246, 0.1);
  color: white;
  border-color: rgba(139, 92, 246, 0.4);
}

.cv-button-secondary:hover {
  background: rgba(139, 92, 246, 0.2);
  border-color: rgba(139, 92, 246, 0.6);
  transform: translateY(-4px);
}

/* Progress Indicators */
.carousel-indicators {
  display: flex;
  gap: 0.75rem;
  justify-content: center;
  margin-top: 2rem;
}

.indicator {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: rgba(139, 92, 246, 0.3);
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
}

.indicator:hover {
  background: rgba(139, 92, 246, 0.5);
  transform: scale(1.2);
}

.indicator.active {
  background: linear-gradient(135deg, #8b5cf6, #3b82f6);
  width: 32px;
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(139, 92, 246, 0.5);
}

/* Slide Transitions */
.slide-enter-active,
.slide-leave-active {
  transition: all 0.5s ease;
}

.slide-enter-from {
  opacity: 0;
  transform: translateX(50px);
}

.slide-leave-to {
  opacity: 0;
  transform: translateX(-50px);
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* Responsive Design */
@media (max-width: 768px) {
  .carousel-container {
    padding: 1rem 0.5rem;
  }

  .carousel-tabs {
    gap: 0.5rem;
    margin-bottom: 1.5rem;
    padding: 0.25rem;
  }

  .carousel-tab {
    padding: 0.875rem 1.25rem;
    gap: 0.5rem;
    flex: 1 1 auto;
    min-width: 0;
  }

  .carousel-tab:hover:not(.active) {
    transform: translateY(-1px) scale(1.01);
  }

  .tab-icon {
    font-size: 1.25rem;
  }

  .tab-title {
    font-size: 0.875rem;
  }

  .carousel-content {
    min-height: 450px;
    padding: 2rem 1rem;
  }

  .carousel-track {
    padding: 0 1rem;
  }

  .carousel-arrow {
    width: 40px;
    height: 40px;
  }

  .carousel-arrow-left {
    left: 0.5rem;
  }

  .carousel-arrow-right {
    right: 0.5rem;
  }

  .slide-icon-large {
    font-size: 3rem;
    margin-bottom: 1rem;
  }

  .slide-title {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }

  .slide-text {
    font-size: 1rem;
  }

  .slide-list-item {
    padding: 0.75rem;
    gap: 0.75rem;
  }

  .cv-buttons {
    flex-direction: column;
  }

  .cv-button {
    width: 100%;
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .carousel-arrow {
    width: 36px;
    height: 36px;
  }

  .carousel-arrow svg {
    width: 20px;
    height: 20px;
  }

  .slide-title {
    font-size: 1.25rem;
  }

  .slide-text {
    font-size: 0.9375rem;
  }

  .carousel-tabs {
    gap: 0.375rem;
  }

  .carousel-tab {
    padding: 0.75rem 1rem;
    font-size: 0.8125rem;
  }

  .tab-title {
    font-size: 0.8125rem;
  }
}

/* Extra small devices - stack tabs if needed */
@media (max-width: 380px) {
  .carousel-tabs {
    flex-direction: column;
    align-items: stretch;
  }

  .carousel-tab {
    width: 100%;
    justify-content: flex-start;
  }
}
</style>

