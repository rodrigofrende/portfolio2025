<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const cursorX = ref(0)
const cursorY = ref(0)
const cursorDotX = ref(0)
const cursorDotY = ref(0)
const isClicking = ref(false)
const isHovering = ref(false)

let rafId: number | null = null

const lerp = (start: number, end: number, factor: number) => {
  return start + (end - start) * factor
}

const updateCursor = () => {
  cursorDotX.value = lerp(cursorDotX.value, cursorX.value, 0.25)
  cursorDotY.value = lerp(cursorDotY.value, cursorY.value, 0.25)
  
  rafId = requestAnimationFrame(updateCursor)
}

const handleMouseMove = (e: MouseEvent) => {
  cursorX.value = e.clientX
  cursorY.value = e.clientY
  
  // Check if hovering interactive elements
  const target = e.target as HTMLElement
  const isInteractive = target.tagName === 'A' || 
                        target.tagName === 'BUTTON' || 
                        target.classList.contains('bento-card') ||
                        target.closest('a') ||
                        target.closest('button') ||
                        target.closest('.bento-card')
  
  isHovering.value = !!isInteractive
}

const handleMouseDown = () => {
  isClicking.value = true
}

const handleMouseUp = () => {
  isClicking.value = false
}

onMounted(() => {
  window.addEventListener('mousemove', handleMouseMove)
  window.addEventListener('mousedown', handleMouseDown)
  window.addEventListener('mouseup', handleMouseUp)
  updateCursor()
})

onUnmounted(() => {
  window.removeEventListener('mousemove', handleMouseMove)
  window.removeEventListener('mousedown', handleMouseDown)
  window.removeEventListener('mouseup', handleMouseUp)
  if (rafId) cancelAnimationFrame(rafId)
})
</script>

<template>
  <div class="custom-cursor">
    <!-- Outer ring -->
    <div 
      class="cursor-ring" 
      :class="{ 'clicking': isClicking, 'hovering': isHovering }"
      :style="{ 
        left: cursorDotX + 'px', 
        top: cursorDotY + 'px' 
      }"
    >
      <div class="cursor-ring-inner"></div>
    </div>
    
    <!-- Inner dot -->
    <div 
      class="cursor-dot" 
      :class="{ 'clicking': isClicking }"
      :style="{ 
        left: cursorX + 'px', 
        top: cursorY + 'px' 
      }"
    ></div>
  </div>
</template>

<style scoped>
.custom-cursor {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 9999;
  display: none;
}

/* Show only on devices with pointer (not touch) */
@media (pointer: fine) {
  .custom-cursor {
    display: block;
  }
}

.cursor-dot {
  position: fixed;
  width: 6px;
  height: 6px;
  background: linear-gradient(135deg, #a78bfa, #ec4899);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  transition: transform 0.15s ease, opacity 0.15s ease;
  box-shadow: 0 0 4px rgba(167, 139, 250, 0.3);
  z-index: 10001;
  opacity: 0.8;
}

.cursor-dot.clicking {
  transform: translate(-50%, -50%) scale(0.7);
}

.cursor-ring {
  position: fixed;
  width: 24px;
  height: 24px;
  border: 1.5px solid rgba(167, 139, 250, 0.25);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  transition: all 0.25s ease-out;
  z-index: 10000;
  opacity: 0.6;
}

.cursor-ring.clicking {
  transform: translate(-50%, -50%) scale(0.85);
  border-color: rgba(167, 139, 250, 0.5);
  opacity: 0.8;
}

.cursor-ring.hovering {
  transform: translate(-50%, -50%) scale(1.2);
  border-color: rgba(167, 139, 250, 0.4);
  background: rgba(167, 139, 250, 0.03);
  opacity: 0.7;
}

.cursor-ring-inner {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(167, 139, 250, 0.05) 0%, transparent 70%);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.cursor-ring.hovering .cursor-ring-inner {
  opacity: 0.5;
}

/* Hide default cursor on interactive elements */
@media (pointer: fine) {
  :global(body) {
    cursor: none !important;
  }
  
  /* Keep native cursor for text selection */
  :global(p),
  :global(span),
  :global(h1),
  :global(h2),
  :global(h3),
  :global(h4),
  :global(h5),
  :global(h6),
  :global(li),
  :global(input),
  :global(textarea) {
    cursor: text !important;
  }
}
</style>

