<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface Props {
  textSize?: 'small' | 'medium' | 'large'
  showHighlight?: boolean
  speed?: number
}

const props = withDefaults(defineProps<Props>(), {
  textSize: 'medium',
  showHighlight: true,
  speed: 100
})

const currentText = ref('')
const highlightedLetters = ref<number[]>([])
const phase = ref(0) // 0: escribiendo nombre, 1: resaltando letras, 2: mostrando frontend
const isTyping = ref(false)

const nameText = 'rodrigo frende'
const targetText = 'frontend'

// Mapeo de qué letras del nombre están en frontend
const sharedLettersMap: { [key: number]: boolean } = {
  0: true,  // r
  1: true,  // o
  2: true,  // d
  3: true,  // r
  5: false, // g
  6: true,  // o
  8: true,  // f
  9: true,  // r
  10: true, // e
  11: true, // n
  12: true, // d
  13: true, // e
}

const animateText = async () => {
  // Fase 1: Escribir "rodrigo frende"
  phase.value = 0
  isTyping.value = true
  currentText.value = ''
  highlightedLetters.value = []
  
  for (let i = 0; i < nameText.length; i++) {
    currentText.value += nameText[i]
    // Agregar animación de aparición para la nueva letra
    await new Promise(resolve => setTimeout(resolve, props.speed))
  }
  
  isTyping.value = false
  await new Promise(resolve => setTimeout(resolve, 800))
  
  // Fase 2: Resaltar letras compartidas (solo si showHighlight está activado)
  if (props.showHighlight) {
    phase.value = 1
    const sharedIndices = Object.keys(sharedLettersMap)
      .filter(key => sharedLettersMap[parseInt(key)])
      .map(key => parseInt(key))
    
    for (let i = 0; i < sharedIndices.length; i++) {
      highlightedLetters.value.push(sharedIndices[i])
      await new Promise(resolve => setTimeout(resolve, 80))
    }
    
    await new Promise(resolve => setTimeout(resolve, 1000))
  }
  
  // Fase 3: Limpiar y escribir "frontend"
  phase.value = 2
  isTyping.value = true
  
  // Limpiar texto gradualmente desde el final
  for (let i = nameText.length - 1; i >= 0; i--) {
    currentText.value = nameText.slice(0, i)
    await new Promise(resolve => setTimeout(resolve, 50))
  }
  
  highlightedLetters.value = []
  await new Promise(resolve => setTimeout(resolve, 300))
  
  // Escribir "frontend"
  for (let i = 0; i < targetText.length; i++) {
    currentText.value += targetText[i]
    await new Promise(resolve => setTimeout(resolve, props.speed))
  }
  
  isTyping.value = false
  await new Promise(resolve => setTimeout(resolve, 2000))
  
  // Reiniciar la animación
  animateText()
}

onMounted(() => {
  animateText()
})
</script>

<template>
  <div class="name-transition-container" :class="`size-${props.textSize}`">
    <div class="text-display">
      <span
        v-for="(char, index) in currentText"
        :key="`${phase}-${index}`"
        :data-letter="char"
        :class="{
          'letter': true,
          'highlighted': phase === 1 && highlightedLetters.includes(index),
          'space': char === ' ',
          'frontend-letter': phase === 2
        }"
      >
        {{ char }}
      </span>
      <span class="cursor" v-if="isTyping">|</span>
    </div>
  </div>
</template>

<style scoped>
.name-transition-container {
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
  background: 
    linear-gradient(135deg, rgba(0, 20, 40, 0.9) 0%, rgba(0, 40, 80, 0.8) 100%),
    repeating-linear-gradient(
      0deg,
      transparent,
      transparent 2px,
      rgba(0, 255, 65, 0.03) 2px,
      rgba(0, 255, 65, 0.03) 4px
    );
  border-radius: 8px;
  border: 1px solid rgba(0, 255, 65, 0.2);
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(0, 255, 65, 0.1);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.name-transition-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    linear-gradient(
      90deg,
      transparent 0%,
      rgba(0, 255, 65, 0.1) 50%,
      transparent 100%
    );
  animation: terminal-scan 4s linear infinite;
  pointer-events: none;
}

.name-transition-container:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.2);
}

/* Tamaños del texto */
.size-small .text-display {
  font-size: 1.5rem;
  min-height: 2rem;
}

.size-medium .text-display {
  font-size: 2.2rem;
  min-height: 2.8rem;
}

.size-large .text-display {
  font-size: 3rem;
  min-height: 4rem;
}

.text-display {
  font-weight: 600;
  font-family: 'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', monospace;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.1rem;
  width: 100%;
  position: relative;
  letter-spacing: 0.05em;
}

.letter {
  display: inline-block;
  opacity: 1;
  transition: all 0.3s ease;
  color: #c0c0c0;
  width: 1.1em;
  text-align: center;
  animation: terminal-flicker 4s ease-in-out infinite;
  transform-origin: center;
  font-family: 'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', monospace;
}

.letter:nth-child(odd) {
  animation-delay: 0.2s;
}

.letter:nth-child(even) {
  animation-delay: 0.4s;
}

.letter.space {
  width: 0.4em;
}

.letter.highlighted {
  color: #ffffff;
  text-shadow: 
    0 0 3px #ffffff,
    0 0 6px #ffffff,
    0 0 9px #ffffff;
  transform: scale(1.05);
  font-weight: 700;
  animation: terminal-select 1.5s ease-in-out infinite;
}

.letter.frontend-letter {
  color: #00ff41;
  text-shadow: 
    0 0 5px #00ff41,
    0 0 10px #00ff41,
    0 0 15px #00ff41,
    0 0 20px #00ff41;
  animation: terminal-glow 2s ease-in-out infinite, scan-line 3s linear infinite;
  position: relative;
  font-family: 'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', monospace;
}

.letter.frontend-letter::before {
  content: attr(data-letter);
  position: absolute;
  top: 0;
  left: 0;
  color: #00ff41;
  opacity: 0.3;
  animation: glitch-flicker 0.1s infinite;
  z-index: -1;
}

.letter.frontend-letter::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(90deg, transparent, rgba(0, 255, 65, 0.1), transparent);
  animation: scan-line 2s linear infinite;
  z-index: 1;
}

.cursor {
  display: inline-block;
  width: 2px;
  height: 1.2em;
  background: #667eea;
  margin-left: 0.2rem;
  animation: blink 1s infinite;
  box-shadow: 0 0 8px rgba(102, 126, 234, 0.8);
  flex-shrink: 0;
}


/* Animaciones */
@keyframes blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}

@keyframes pulse-glow {
  0%, 100% {
    text-shadow: 
      0 0 8px rgba(102, 126, 234, 0.9),
      0 0 16px rgba(102, 126, 234, 0.6),
      0 0 24px rgba(102, 126, 234, 0.4);
  }
  50% {
    text-shadow: 
      0 0 12px rgba(102, 126, 234, 1),
      0 0 20px rgba(102, 126, 234, 0.8),
      0 0 28px rgba(102, 126, 234, 0.6);
  }
}

@keyframes terminal-glow {
  0%, 100% {
    text-shadow: 
      0 0 5px #00ff41,
      0 0 10px #00ff41,
      0 0 15px #00ff41,
      0 0 20px #00ff41;
  }
  50% {
    text-shadow: 
      0 0 2px #00ff41,
      0 0 5px #00ff41,
      0 0 8px #00ff41,
      0 0 12px #00ff41;
  }
}

@keyframes scan-line {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

@keyframes glitch-flicker {
  0%, 100% {
    opacity: 0.3;
    transform: translateX(0);
  }
  20% {
    opacity: 0.1;
    transform: translateX(-1px);
  }
  40% {
    opacity: 0.5;
    transform: translateX(1px);
  }
  60% {
    opacity: 0.2;
    transform: translateX(-1px);
  }
  80% {
    opacity: 0.4;
    transform: translateX(1px);
  }
}

@keyframes terminal-flicker {
  0%, 100% {
    opacity: 1;
    color: #c0c0c0;
  }
  50% {
    opacity: 0.8;
    color: #a0a0a0;
  }
}

@keyframes terminal-select {
  0%, 100% {
    text-shadow: 
      0 0 3px #ffffff,
      0 0 6px #ffffff,
      0 0 9px #ffffff;
  }
  50% {
    text-shadow: 
      0 0 1px #ffffff,
      0 0 3px #ffffff,
      0 0 5px #ffffff;
  }
}

@keyframes data-stream {
  0% {
    opacity: 0;
    transform: translateY(-10px);
  }
  50% {
    opacity: 0.7;
    transform: translateY(0px);
  }
  100% {
    opacity: 1;
    transform: translateY(0px);
  }
}

@keyframes terminal-scan {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}


/* Responsive */
@media (max-width: 768px) {
  .name-transition-container {
    padding: 1.5rem 1rem;
    max-width: 500px;
  }
  
  .size-small .text-display {
    font-size: 1.2rem;
    min-height: 1.6rem;
  }

  .size-medium .text-display {
    font-size: 1.8rem;
    min-height: 2.2rem;
  }

  .size-large .text-display {
    font-size: 2.4rem;
    min-height: 3rem;
  }
}

@media (max-width: 480px) {
  .name-transition-container {
    padding: 1.2rem 0.8rem;
    max-width: 400px;
  }
  
  .size-small .text-display {
    font-size: 1rem;
    min-height: 1.4rem;
  }

  .size-medium .text-display {
    font-size: 1.4rem;
    min-height: 1.8rem;
  }

  .size-large .text-display {
    font-size: 1.8rem;
    min-height: 2.2rem;
  }
}
</style>

