<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps<{
  delay?: number
  threshold?: number
}>()

const isVisible = ref(false)
const elementRef = ref<HTMLElement | null>(null)

let observer: IntersectionObserver | null = null

onMounted(() => {
  if (elementRef.value) {
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              isVisible.value = true
            }, props.delay || 0)
            // Una vez revelado, dejamos de observar
            if (observer) observer.unobserve(entry.target)
          }
        })
      },
      {
        threshold: props.threshold || 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    )
    
    observer.observe(elementRef.value)
  }
})

onUnmounted(() => {
  if (observer && elementRef.value) {
    observer.unobserve(elementRef.value)
  }
})
</script>

<template>
  <div 
    ref="elementRef" 
    class="scroll-reveal" 
    :class="{ 'is-visible': isVisible }"
  >
    <slot></slot>
  </div>
</template>

<style scoped>
.scroll-reveal {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275),
              transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.scroll-reveal.is-visible {
  opacity: 1;
  transform: translateY(0);
}
</style>

