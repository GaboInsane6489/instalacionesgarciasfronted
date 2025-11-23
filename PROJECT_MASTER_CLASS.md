# 🎓 PROJECT MASTER CLASS: Instalaciones García's Frontend

> **Objetivo:** Este documento es tu biblia técnica. Léelo, estúdialo y domínalo. Aquí está todo el conocimiento necesario para pasar de "usuario" a "arquitecto" de este proyecto.

---

## 📚 MÓDULO 1: LA FILOSOFÍA (ASTRO & ISLAS)

### 1.1 ¿Por qué Astro?

No elegimos Astro por moda. Lo elegimos por **Rendimiento**.
La mayoría de los frameworks modernos (Next.js, React puro) envían una enorme cantidad de JavaScript al navegador, incluso para mostrar texto estático. Esto se llama "Hidratación completa".

- **El Problema:** El usuario ve la página, pero no puede hacer clic hasta que se descarga y ejecuta todo el JS.
- **La Solución Astro:** Astro es **HTML-first**. Por defecto, envía 0kb de JavaScript a tus usuarios.

### 1.2 Arquitectura de Islas (Islands Architecture)

Imagina tu sitio web como un mar de HTML estático (rápido, ligero). En ese mar, flotan "Islas" de interactividad.

- **El Mar:** El Header, el Footer, el texto del Hero, las tarjetas de servicios. Son HTML puro y CSS. Cargan instantáneamente.
- **Las Islas:** La `ProjectGallery`, la `ProjectCalculator`. Son componentes React complejos.
- **La Magia:** Astro renderiza las islas en el servidor (HTML) y luego, _solo si es necesario_, las "despierta" (hidrata) en el navegador.

### 1.3 Directivas de Hidratación (Tú tienes el control)

En este proyecto verás atributos especiales en los componentes React. Debes saber qué hacen:

- `client:load`: **EVITAR SI ES POSIBLE.** Carga el JS inmediatamente. Úsalo solo para cosas críticas que el usuario necesita ver/usar en el milisegundo 1 (ej: un menú móvil complejo).
- `client:visible`: **EL ESTÁNDAR DE ORO.** Carga el JS solo cuando el usuario hace scroll y el componente entra en pantalla.
  - _Ejemplo:_ Tu `ProjectGallery` está abajo en la página. Si el usuario nunca baja, nunca descarga el código de la galería. Ahorro masivo de datos.
- `client:idle`: Carga cuando el navegador no está haciendo nada más.
- `client:media="(max-width: 50em)"`: Carga solo en móviles (o escritorio).

---

## 🎨 MÓDULO 2: EL MOTOR VISUAL (TAILWIND & CSS)

### 2.1 Utility-First (Tailwind)

No escribimos CSS tradicional (`.mi-clase { ... }`) a menos que sea estrictamente necesario. Usamos clases de utilidad.

- **¿Por qué?**
  1.  **Consistencia:** No hay "50 tonos de gris". Usamos los definidos en `tailwind.config.mjs`.
  2.  **Tamaño:** Tailwind purga todo lo que no usas. Tu CSS final es diminuto.
  3.  **Velocidad:** Escribes estilos sin salir del HTML.

### 2.2 Global CSS (`src/styles/global.css`)

Aquí viven las "reglas maestras".

- **Fuentes:** Definimos `font-sans` aquí.
- **Scroll Behavior:** `html { scroll-behavior: smooth; }` para que los enlaces internos se deslicen suavemente.
- **Animaciones Custom:** Si Tailwind no lo tiene (como tu animación `scrollWheel`), lo definimos aquí o en bloques `<style>` locales.

### 2.3 Glassmorphism (Vidriosidad)

El diseño "Premium" de este sitio se basa en capas y transparencias.

- **La Técnica:** `bg-white/10` (fondo blanco al 10%) + `backdrop-blur-md` (desenfoque de lo que hay detrás).
- **Bordes:** Siempre usa bordes sutiles `border-white/10` para definir los límites del vidrio.

---

## 🧠 MÓDULO 3: EL CEREBRO (REACT & ESTADO)

### 3.1 Cuándo usar React

Astro es para contenido. React es para interacción.

- ¿Es una lista de servicios estática? -> **Astro** (`ServiceCard.astro`).
- ¿El usuario hace clic, cambia cosas, calcula números? -> **React** (`ProjectCalculator.jsx`).

### 3.2 Props y Comunicación

Pasamos datos desde Astro (el servidor) hacia React (el cliente).

- _En `servicios.astro`:_ Definimos el array `projects` (con las rutas de las imágenes ya procesadas).
- _En `ProjectGallery.jsx`:_ Recibimos `({ projects })`.
- **Importante:** Una vez que los datos entran a la "Isla" de React, React toma el control. Astro ya no interviene ahí.

---

## 🛣️ MÓDULO 4: NAVEGACIÓN Y SPA (CLIENT ROUTER)

### 4.1 El Problema de las Webs Tradicionales

Normalmente, al hacer clic en un enlace, la pantalla se pone blanca, el navegador descarga todo de nuevo y renderiza. Se siente "lento" y "tosco".

### 4.2 La Solución: `<ClientRouter />`

Este componente (en `Layout.astro`) intercepta los clics.

1.  **Fetch:** Pide la siguiente página en segundo plano.
2.  **Swap:** Cambia solo el contenido del `<body>`.
3.  **Persist:** Mantiene el scroll (o lo resetea inteligentemente) y elementos persistentes.

### 4.3 El Ciclo de Vida (Lifecycle)

Esto es CRÍTICO. Como la página no se "recarga" realmente, `window.onload` o `document.addEventListener('DOMContentLoaded')` **NO** funcionan como esperas (solo corren la primera vez).

**Eventos que DEBES usar:**

- `astro:page-load`: Se dispara CADA VEZ que se muestra una nueva página (o la primera). **Aquí va tu código de inicialización (animaciones, analytics).**
- `astro:before-preparation`: Justo antes de empezar a cargar la nueva página.
- `astro:after-swap`: Justo después de cambiar el HTML, pero antes de que el navegador pinte.

_Ejemplo Real (Tu arreglo de animaciones):_

```javascript
// MAL: Solo corre una vez
initAnimations();

// BIEN: Corre siempre
document.addEventListener("astro:page-load", initAnimations);
```

---

## 🖼️ MÓDULO 5: ESTRATEGIA DE ASSETS (IMÁGENES Y VIDEO)

### 5.1 Imágenes Locales vs Remotas

- **Remotas (URLs):** Son riesgosas. Si el servidor externo cae, tu sitio se ve roto. Son lentas (DNS lookup, conexión SSL extra).
- **Locales (`src/assets`):** Son la gloria.
  - Astro las procesa en el build.
  - Genera WebP (más ligero que JPG/PNG).
  - Genera dimensiones exactas (no carga una imagen de 4000px en un móvil).

### 5.2 El Componente `<Image />` vs `<img>`

- Siempre intenta usar el import de Astro:
  ```javascript
  import miFoto from '../assets/foto.jpg';
  // ...
  <img src={miFoto.src} ... />
  ```
  Al hacer `miFoto.src`, Astro ya te está dando la URL optimizada del archivo final en `dist`.

### 5.3 Videos

Los videos son los asesinos del ancho de banda.

- **Regla de Oro:** Nunca uses `preload="auto"` en un video "above the fold" (pantalla inicial) a menos que sea crítico. Usa `preload="metadata"`.
- **Formato:** MP4 es compatible, pero WebM es más ligero. (Nota: En este proyecto usamos MP4 por compatibilidad con los assets originales, pero WebM es el objetivo ideal).

---

## ⚡ MÓDULO 6: RENDIMIENTO (PERFORMANCE)

### 6.1 Core Web Vitals

Google te mide por esto.

- **LCP (Largest Contentful Paint):** ¿Qué tan rápido carga lo más grande de la pantalla? (Tu video hero).
  - _Optimización:_ Asegurar que el video cargue rápido y tenga un `poster` (imagen de fondo) mientras carga.
- **CLS (Cumulative Layout Shift):** ¿Se mueven las cosas mientras cargan?
  - _Optimización:_ Siempre poner `width` y `height` (o aspect-ratio en CSS) a las imágenes y contenedores para reservar el espacio.
- **INP (Interaction to Next Paint):** ¿Qué tan rápido responde al clic?
  - _Optimización:_ Menos JavaScript. Hidratación parcial (Islas).

### 6.2 Lazy Loading

- Nativo: `loading="lazy"` en imágenes. El navegador se encarga.
- Astro: `client:visible` en componentes. Astro se encarga.

---

## 🛠️ MÓDULO 7: COMPONENTES CLAVE (DEEP DIVE)

### 7.1 `VideoHero.astro`

Este es tu componente de "Primera Impresión".

- **Reto:** Cargar un video pesado sin frenar el sitio.
- **Estrategia:**
  1.  Mostrar una imagen (`poster`) inmediatamente.
  2.  Cargar solo los metadatos del video.
  3.  Ocultar el video en móviles (`hidden md:block`) y mostrar una imagen estática optimizada. **Esto ahorra megabytes de datos a usuarios móviles.**

### 7.2 `ProjectGallery.jsx`

- **Tecnología:** Framer Motion (`AnimatePresence`).
- **Lógica:** Mantiene un índice (`currentIndex`). Al cambiar, Framer Motion detecta la salida del componente viejo y la entrada del nuevo, animando `x` (posición) y `opacity`.
- **Dato:** Usa `mode="popLayout"` o `mode="wait"` para manejar cómo salen los elementos del DOM.

---

## 🐛 MÓDULO 8: TROUBLESHOOTING (SOLUCIÓN DE PROBLEMAS)

### 8.1 "Mis cambios no se ven"

- ¿Está corriendo el servidor (`pnpm dev`)?
- ¿Guardaste el archivo?
- A veces Vite se confunde. Detén el servidor (Ctrl+C) y corre `pnpm dev` de nuevo.

### 8.2 "El build falla con EPERM"

- **Causa:** Windows bloquea archivos si están siendo usados.
- **Solución:** Cierra cualquier otra terminal, cierra la carpeta `dist` si la tienes abierta en el explorador, o reinicia VS Code.

### 8.3 "La animación no funciona al volver atrás"

- **Causa:** El script de animación no se reinició.
- **Solución:** Revisa que estés usando `document.addEventListener('astro:page-load', ...)` en tu etiqueta `<script>`.

---

## 🚀 MÓDULO 9: EL FUTURO (SCALABILITY)

### 9.1 CMS (Gestor de Contenidos)

Ahora mismo los proyectos están en un array en el código (`const projects = [...]`).

- **Siguiente Nivel:** Conectar Astro a un CMS "Headless" (como Contentful, Sanity, o incluso WordPress Headless).
- Astro pediría los datos al CMS en el momento del build (`getStaticPaths`) y generaría las páginas automáticamente. ¡No tendrías que tocar código para agregar un proyecto nuevo!

### 9.2 Internacionalización (i18n)

Astro tiene soporte nativo para i18n. Podrías tener `/en/projects` y `/es/proyectos` fácilmente configurando `astro.config.mjs`.

---

> **Fin de la Master Class.**
> Este proyecto es una pieza de ingeniería moderna. Cuídalo, mantén las dependencias actualizadas y sigue siempre la regla de oro: **Menos JavaScript es Más Rendimiento.**
