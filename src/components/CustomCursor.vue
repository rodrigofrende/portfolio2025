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
  cursorDotX.value = lerp(cursorDotX.value, cursorX.value, 0.15)
  cursorDotY.value = lerp(cursorDotY.value, cursorY.value, 0.15)
  
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
  width: 8px;
  height: 8px;
  background: linear-gradient(135deg, #a78bfa, #ec4899);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  transition: transform 0.15s ease, opacity 0.15s ease;
  box-shadow: 0 0 10px rgba(167, 139, 250, 0.6);
  z-index: 10001;
}

.cursor-dot.clicking {
  transform: translate(-50%, -50%) scale(0.5);
}

.cursor-ring {
  position: fixed;
  width: 40px;
  height: 40px;
  border: 2px solid rgba(167, 139, 250, 0.4);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  z-index: 10000;
}

.cursor-ring.clicking {
  transform: translate(-50%, -50%) scale(0.8);
  border-color: rgba(167, 139, 250, 0.8);
}

.cursor-ring.hovering {
  transform: translate(-50%, -50%) scale(1.5);
  border-color: rgba(167, 139, 250, 0.6);
  background: rgba(167, 139, 250, 0.05);
}

.cursor-ring-inner {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(167, 139, 250, 0.1) 0%, transparent 70%);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.cursor-ring.hovering .cursor-ring-inner {
  opacity: 1;
}

/* Hide default cursor on interactive elements */
@media (pointer: fine) {
  :global(a),
  :global(button),
  :global(.bento-card),
  :global([role="button"]) {
    cursor: none !important;
  }
  
  :global(body) {
    cursor: none !important;
  }
}
</style>

