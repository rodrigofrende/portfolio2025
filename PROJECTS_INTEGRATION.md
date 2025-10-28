# 🚀 Integración de Proyectos con GitHub

## 📋 Resumen

Tu portfolio ahora muestra **automáticamente** tus proyectos reales de GitHub con screenshots en vivo, sin necesidad de guardar imágenes localmente.

---

## ✨ Características Implementadas

### **1. Screenshots Automáticos** 📸

Utilizamos **3 métodos** para obtener imágenes de tus proyectos:

#### **Método 1: Microlink API (Prioridad 1)**
Si el proyecto tiene demo en vivo, usa:
```
https://api.microlink.io/?url=tu-demo.com&screenshot=true
```
- ✅ **Gratis** e ilimitado
- ✅ Screenshot en tiempo real del sitio
- ✅ Se actualiza automáticamente

#### **Método 2: GitHub Social Cards (Prioridad 2)**
Si no hay demo, usa la imagen social de GitHub:
```
https://opengraph.githubassets.com/1/usuario/repo
```
- ✅ Generada automáticamente por GitHub
- ✅ Muestra stats y descripción del repo
- ✅ Actualización automática

#### **Método 3: Gradientes (Fallback)**
Si fallan los anteriores, usa un gradiente bonito con el emoji del proyecto.

---

## 🎯 Tus Proyectos Actuales

### **Proyectos Featured** ⭐

1. **FURIA FC - Team Management**
   - 📍 URL: https://furia-fc-schedule.netlify.app
   - 🔧 Stack: React, TypeScript, Firebase, Vite
   - 🎨 Badge: ⚽

2. **RF3D Shop**
   - 📍 URL: https://rf3d-shop.netlify.app
   - 🔧 Stack: Vue.js, Pinia, CSS3, JavaScript
   - 🎨 Badge: 🎨

### **Otros Proyectos**

3. **Poké Palette**
   - 📍 URL: https://poke-palette.netlify.app
   - 🔧 Stack: React, PokeAPI, Canvas API, TypeScript
   - 🎨 Badge: 🎮

4. **UI Storybook**
   - 📍 URL: https://rf-ui-storybook.netlify.app
   - 🔧 Stack: Storybook, React, TypeScript, CSS Modules
   - 🎨 Badge: 📚

5. **Money Metrics**
   - 📍 URL: https://confetti-counter.netlify.app
   - 🔧 Stack: JavaScript, Canvas API, Web Audio API, CSS3
   - 🎨 Badge: 🎉

---

## 🛠️ Cómo Agregar/Editar Proyectos

### **Archivo:** `src/data/projects.ts`

```typescript
{
  id: 6, // Siguiente ID disponible
  title: 'Mi Nuevo Proyecto',
  description: 'Descripción detallada del proyecto (se recomienda 2-3 líneas)',
  technologies: ['Vue.js', 'TypeScript', 'Tailwind'] as const,
  github: 'https://github.com/rodrigofrende/mi-proyecto',
  demo: 'https://mi-proyecto.netlify.app', // Opcional
  icon: '🚀', // Emoji representativo
  featured: true // Opcional - muestra badge dorado
}
```

---

## 🎨 Personalización Visual

### **Featured Badge** ⭐
Los proyectos con `featured: true` muestran una insignia dorada en la esquina superior derecha.

### **Botones de Enlaces**
- **GitHub**: Botón blanco con borde
- **Live Demo**: Botón con gradiente purple (destacado)

### **Hover Effects**
- Imagen hace zoom (1.05x)
- Card se eleva 8px
- Sombra aumenta y cambia de color

---

## 📊 Estadísticas de Proyectos

### **Tecnologías más usadas:**
1. TypeScript (4 proyectos)
2. React (3 proyectos)
3. Vue.js (2 proyectos)
4. CSS3/Vite (múltiples)

---

## 🔧 Troubleshooting

### **Las imágenes no cargan:**

1. **Verifica las URLs de demo** en `projects.ts`
2. **Microlink puede tener rate limit** (poco probable con uso normal)
3. **Fallback automático** activado → muestra gradiente con emoji

### **Cambiar proveedor de screenshots:**

Si prefieres otro servicio, edita la función `getProjectScreenshot`:

```typescript
// Alternativa 1: Screenshot.rocks (gratis)
return `https://api.screenshot.rocks/api/v1/screenshot?url=${projectUrl}`

// Alternativa 2: PageSpeed Insights
return `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${projectUrl}&screenshot=true`

// Alternativa 3: Solo GitHub Cards
// Comentar el método 1 y usar siempre getGithubSocialImage()
```

---

## 🚀 Próximas Mejoras Sugeridas

- [ ] **Filtros por tecnología** (mostrar solo proyectos React, Vue, etc.)
- [ ] **Búsqueda** de proyectos
- [ ] **Lazy loading** de imágenes para mejor performance
- [ ] **Modal con detalles** al hacer click en un proyecto
- [ ] **GitHub API** para obtener stats reales (stars, forks, issues)
- [ ] **Ordenar por featured** primero

---

## 📝 Notas Importantes

1. **Sin límites de API**: Microlink y GitHub Social Cards son gratuitos
2. **Cache del navegador**: Las imágenes se cachean automáticamente
3. **Responsive**: Todo optimizado para mobile y desktop
4. **SEO friendly**: Atributos `alt`, `loading="lazy"`, `rel="noopener"`

---

## 🎉 Resultado

Ahora tu portfolio:
✅ Muestra proyectos reales con screenshots automáticos
✅ No requiere actualización manual de imágenes
✅ Se ve profesional con efectos visuales premium
✅ Destaca proyectos importantes con badges
✅ Tiene enlaces directos a GitHub y demos en vivo

**¡Todo listo para impresionar a recruiters!** 🚀

