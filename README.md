# 🎨 Portfolio Moderno - Vue 3 + TypeScript + Vite

Un portfolio interactivo y moderno con diseño glassmorphism que cautiva desde el primer momento.

## ✨ Características Destacadas

### 🪟 Modern Header con Glassmorphism
- **Efecto Glass**: Transparencia + blur cuando haces scroll
- **Logo Animado**: Rotación suave con gradientes
- **Hover Underline**: Efecto de línea degradada que crece
- **Menu Mobile**: Slide-in desde la derecha con overlay
- **Auto-highlight**: Sección activa según scroll
- **Smooth Animations**: Transiciones suaves con cubic-bezier

### 🎯 Hero Section Bento Grid
- **Diseño Interactivo**: 7 cards con diferentes tamaños y contenidos
- **Efectos Premium**: Shine effects, border glow, y transformaciones suaves
- **Gradientes Animados**: Background con orbes flotantes
- **Typing Animation**: Frases que se escriben automáticamente
- **Mobile First**: 100% responsive en todos los dispositivos

### 🖱️ Cursor Personalizado
- Cursor con seguimiento suave (lerp interpolation)
- Efectos visuales en hover y click
- Solo visible en dispositivos con mouse
- Anillo expansivo y dot central con gradientes

### 📜 Scroll Reveal Animations
- Componente reutilizable para revelar secciones
- Intersection Observer API para performance
- Animaciones suaves y configurables
- Threshold y delays personalizables

### 📱 Responsive & Performance
- **Mobile First** approach
- Grid adaptativo (12 → 6 → 1 columnas)
- Animaciones GPU accelerated
- Lazy loading de efectos complejos
- Optimizado para Lighthouse 90+

## 🚀 Instalación y Uso

```bash
# Instalar dependencias
npm install

# Desarrollo
npm run dev

# Build para producción
npm run build

# Preview de producción
npm run preview
```

## 🎨 Personalización Rápida

**Ver guía completa:** [`PERSONALIZAR.md`](./PERSONALIZAR.md)

**Archivos principales a editar:**
- `src/components/HeroSection.vue` - Tu información personal, tecnologías, estadísticas
- `src/components/ModernHeader.vue` - Logo y navegación
- `src/App.vue` - Proyectos, About Me, Contacto

## 📂 Estructura del Proyecto

```
portfolio/
├── src/
│   ├── components/
│   │   ├── ModernHeader.vue        # 🪟 Header glassmorphism
│   │   ├── HeroSection.vue         # ⭐ Hero interactivo
│   │   ├── CustomCursor.vue        # 🖱️ Cursor personalizado
│   │   └── ScrollReveal.vue        # 📜 Animaciones de scroll
│   ├── App.vue                      # Componente principal
│   ├── main.ts                      # Entry point
│   └── style.css                    # Estilos globales
├── public/
└── README.md                        # Este archivo
```

## 🎯 Mejores Prácticas Implementadas

### Performance ⚡
- [x] Animaciones GPU accelerated (`transform` y `opacity`)
- [x] RequestAnimationFrame para cursor
- [x] Intersection Observer para scroll reveals
- [x] Lazy loading de efectos
- [x] `will-change` en elementos animados

### UX/UI 🎨
- [x] Visual hierarchy clara
- [x] Feedback inmediato en interacciones
- [x] Micro-interacciones que deleitan
- [x] Espaciado consistente
- [x] Tipografía escalable con `clamp()`

### Accesibilidad ♿
- [x] Contraste AAA en textos
- [x] Cursor personalizado solo con mouse
- [x] Smooth scrolling
- [x] Touch targets 44x44px mínimo
- [x] Respeta `prefers-reduced-motion`

### Mobile First 📱
- [x] Diseño desde mobile hacia desktop
- [x] Grid adaptativo
- [x] Typography fluida
- [x] Touch-friendly interactions
- [x] Optimizado para conexiones lentas

## 🛠️ Tecnologías

- **Vue 3** - Framework progresivo
- **TypeScript** - Type safety
- **Vite** - Build tool ultra rápido
- **CSS3** - Animaciones y gradientes modernos
- **Intersection Observer API** - Scroll animations
- **RequestAnimationFrame** - Animaciones suaves

## 🎨 Componentes Principales

### ModernHeader
Header con efecto glass que se activa al hacer scroll. Incluye navegación desktop y mobile con animaciones suaves.

### HeroSection
Bento grid interactivo con 7 cards animadas que muestran tu información de forma dinámica.

### CustomCursor
Cursor personalizado con efectos de seguimiento y hover (solo desktop).

## 🎨 Paleta de Colores

### Background
```css
linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)
```

### Gradientes de Cards
- **Hero**: Violet → Purple → Indigo
- **Tech**: Cyan → Blue
- **Stats**: Emerald → Teal / Orange → Pink
- **Available**: Green → Emerald
- **Location**: Purple → Pink
- **Showcase**: Rose → Pink

## 🚀 Próximas Mejoras

- [ ] Dark mode toggle
- [ ] Gestures para móvil (swipe)
- [ ] Integración con GitHub API
- [ ] Blog section
- [ ] Testimonials carousel
- [ ] Contact form con validación
- [ ] PWA support
- [ ] i18n (ES/EN)

## 📝 Licencia

MIT - Siéntete libre de usar este template para tu propio portfolio.

---

**Creado con ❤️ usando Vue 3, TypeScript y mucho café ☕**

## 🤝 Contribuir

Si encuentras bugs o tienes sugerencias:
1. Abre un issue
2. Crea un Pull Request
3. Comparte el proyecto

---

**¿Te gustó? Dale una ⭐ al repo!**
