# 🎓 PROJECT MASTER CLASS: Instalaciones García's Frontend

> **Objetivo:** Este documento es tu biblia técnica. Léelo, estúdialo y domínalo. Aquí está todo el conocimiento necesario para pasar de "usuario" a "arquitecto" de este proyecto.
> **Versión:** 2.0 (Edición Arquitecto)

---

## 📚 MÓDULO 1: LA FILOSOFÍA (ASTRO & ISLAS)

### 1.1 ¿Por qué Astro?

No elegimos Astro por moda. Lo elegimos por **Rendimiento Extremo**.
La mayoría de los frameworks modernos (Next.js, React puro) envían una enorme cantidad de JavaScript al navegador, incluso para mostrar texto estático. Esto se llama "Hidratación completa".

- **El Problema:** El usuario ve la página, pero no puede hacer clic hasta que se descarga y ejecuta todo el JS. Esto afecta el TTI (Time to Interactive).
- **La Solución Astro:** Astro es **HTML-first**. Por defecto, envía 0kb de JavaScript a tus usuarios. El servidor renderiza todo el HTML posible y lo envía listo para consumir.

### 1.2 Arquitectura de Islas (Islands Architecture)

Imagina tu sitio web como un mar de HTML estático (rápido, ligero). En ese mar, flotan "Islas" de interactividad.

- **El Mar (HTML Estático):**
  - El Header y el Navbar (inicialmente).
  - El Footer.
  - El texto del Hero.
  - Las tarjetas de servicios (`ServiceCard.astro`).
  - **Ventaja:** Cargan instantáneamente. Google los ama porque el contenido está ahí desde el primer byte.

- **Las Islas (Componentes Interactivos):**
  - La `ProjectGallery.jsx` (Galería interactiva con filtros).
  - La `ProjectCalculator.jsx` (Lógica de negocio compleja).
  - El `HomeCarousel.jsx` (Carrusel con estado).
  - **Ventaja:** Solo cargan su JavaScript cuando es estrictamente necesario.

- **La Magia:** Astro renderiza las islas en el servidor (HTML estático inicial) y luego, _solo si es necesario_, las "despierta" (hidrata) en el navegador.

### 1.3 Directivas de Hidratación (Tú tienes el control)

En este proyecto verás atributos especiales en los componentes React dentro de archivos `.astro`. Debes saber qué hacen y cuándo usarlos:

#### `client:load`

- **Comportamiento:** Carga e hidrata el JavaScript inmediatamente al cargar la página.
- **Costo:** Alto. Bloquea el renderizado inicial si es muy pesado.
- **Uso:** Elementos críticos que el usuario necesita usar en el milisegundo 1 (ej: un menú de navegación complejo que debe abrirse al instante, o un banner de cookies).
- **En nuestro proyecto:** Evitamos usarlo a menos que sea indispensable.

#### `client:visible` (EL ESTÁNDAR DE ORO)

- **Comportamiento:** Carga el JavaScript solo cuando el componente entra en el viewport (pantalla visible) del usuario. Usa `IntersectionObserver` internamente.
- **Costo:** Bajo. Difiere la carga hasta que se necesita.
- **Uso:** Galerías, carruseles, formularios de contacto al final de la página.
- **Ejemplo Real:**
  ```astro
  <!-- ProjectGallery está abajo en la página. Si el usuario no hace scroll, nunca descarga su JS. -->
  <ProjectGallery client:visible />
  ```

#### `client:idle`

- **Comportamiento:** Carga cuando el navegador ha terminado de cargar todo lo demás y está "ocioso" (idle).
- **Costo:** Medio. No bloquea la carga inicial, pero se descarga eventualmente.
- **Uso:** Chats de soporte, analíticas complejas, elementos de baja prioridad.

#### `client:media="(max-width: 50em)"`

- **Comportamiento:** Carga solo si se cumple la media query CSS.
- **Uso:** Un menú hamburguesa que solo existe en móviles. En desktop, ni siquiera se descarga el código.

#### `client:only="react"`

- **Comportamiento:** Salta el renderizado en servidor (SSR). Renderiza SOLO en el cliente.
- **Uso:** Componentes que dependen de `window` o `localStorage` desde el inicio y no pueden renderizarse en el servidor.
- **Advertencia:** Muestra un espacio en blanco hasta que carga. Usa un `fallback` si es posible.

---

## 🏗️ MÓDULO 2: ESTRUCTURA DEL PROYECTO

Entender dónde vive cada cosa es vital para no perderse.

```text
/
├── public/                  # Archivos estáticos puros (se copian tal cual al dist)
│   ├── favicon.svg          # Icono de la pestaña
│   └── robots.txt           # Instrucciones para Google
├── src/
│   ├── assets/              # Imágenes y videos optimizables
│   │   ├── images/          # .webp, .jpg, .png (Astro las optimiza)
│   │   └── videos/          # .mp4 (Pesados, cuidado aquí)
│   ├── components/          # Bloques de construcción (React y Astro)
│   │   ├── ProjectGallery.jsx  # Isla React
│   │   └── ServiceCard.astro   # Componente estático Astro
│   ├── layouts/             # Plantillas maestras
│   │   └── Layout.astro     # Contiene <html>, <head>, Navbar y Footer
│   ├── lib/                 # Lógica pura JS (sin UI)
│   │   └── apiClient.js     # Configuración de Axios
│   ├── pages/               # Rutas del sitio (File-based routing)
│   │   ├── index.astro      # / (Home)
│   │   ├── servicios.astro  # /servicios
│   │   └── contacto.astro   # /contacto
│   └── styles/
│       └── global.css       # Estilos globales y Tailwind directives
├── astro.config.mjs         # Configuración de Astro (Integraciones, output)
├── tailwind.config.mjs      # Configuración de diseño (Colores, fuentes)
└── vercel.json              # Configuración de despliegue (Headers, CSP)
```

### Reglas de Oro de la Estructura:

1.  **Componentes:** Si se usa en más de una página, va a `src/components`.
2.  **Páginas:** Cada archivo en `src/pages` es una URL pública.
3.  **Assets:** Las imágenes que importas en el código van en `src/assets`. Las que referencias por string (ej: `/logo.png`) van en `public`. **Prefiere siempre `src/assets` para optimización automática.**

---

## 🎨 MÓDULO 3: EL MOTOR VISUAL (TAILWIND & CSS)

### 3.1 Utility-First (Tailwind)

No escribimos CSS tradicional (`.mi-clase { ... }`) a menos que sea estrictamente necesario. Usamos clases de utilidad.

- **¿Por qué?**
  1.  **Consistencia:** No hay "50 tonos de gris". Usamos los definidos en `tailwind.config.mjs`.
  2.  **Tamaño:** Tailwind purga todo lo que no usas. Tu CSS final es diminuto (<10kb gzip).
  3.  **Mantenibilidad:** Al leer el HTML, sabes exactamente cómo se ve. No tienes que buscar en 3 archivos CSS diferentes.

### 3.2 Configuración del Tema (`tailwind.config.mjs`)

Aquí definimos la identidad visual de "Instalaciones García".

```javascript
export default {
  theme: {
    extend: {
      colors: {
        primary: "#0a0a0a", // Negro profundo (Fondo principal)
        secondary: "#1a1a1a", // Gris oscuro (Tarjetas, secciones alternas)
        accent: "#3b82f6", // Azul eléctrico (Botones, destacados)
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"], // Tipografía moderna y legible
      },
    },
  },
};
```

**Uso:** En vez de `bg-[#0a0a0a]`, usa `bg-primary`. Si un día decidimos cambiar el negro por azul oscuro, solo cambiamos el config y todo el sitio se actualiza.

### 3.3 Glassmorphism (El Toque Premium)

El diseño "Premium" de este sitio se basa en capas, profundidad y transparencias.

- **La Fórmula:**
  1.  **Fondo semitransparente:** `bg-white/5` o `bg-black/40`.
  2.  **Desenfoque (Blur):** `backdrop-blur-md` o `backdrop-blur-xl`. Esto difumina lo que hay _detrás_ del elemento.
  3.  **Borde sutil:** `border border-white/10`. Define los límites del "cristal".
  4.  **Sombra:** `shadow-lg` para separarlo del fondo.

**Ejemplo de Tarjeta Premium:**

```html
<div
  class="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl shadow-xl hover:bg-white/10 transition-all"
>
  <!-- Contenido -->
</div>
```

### 3.4 Animaciones

Usamos dos tipos de animaciones:

1.  **CSS Nativo (Tailwind):** Para cosas simples (hover, transiciones).
    - `transition-all duration-300 hover:scale-105`: El elemento crece suavemente al pasar el mouse.
    - `animate-pulse`: Para elementos de carga o destacados sutiles.

2.  **Framer Motion (React):** Para animaciones complejas de entrada/salida, listas y gestos.
    - **AnimatePresence:** Permite animar componentes cuando se _desmontan_ del DOM (ej: cambiar de slide en el carrusel).
    - **Layout Animations:** `layout` prop hace que los elementos se muevan suavemente cuando cambia su posición en la lista.

---

## 🧠 MÓDULO 4: EL CEREBRO (REACT & ESTADO)

### 4.1 Cuándo usar React

Astro es para contenido estático. React es para interacción dinámica.

- **Usa Astro si:**
  - Es solo visual (Hero, Footer).
  - Es una lista que no cambia después de cargar (Lista de servicios).
  - No requiere interacción del usuario más allá de enlaces.

- **Usa React si:**
  - Necesitas `useState` (filtros, contadores, formularios).
  - Necesitas `useEffect` (peticiones API en el cliente, suscripciones).
  - Necesitas librerías de React (Framer Motion, Swiper React).

### 4.2 Props y Comunicación (El Puente)

Pasamos datos desde Astro (el servidor) hacia React (el cliente).

**En `index.astro` (Servidor):**

```astro
---
// Importamos datos o los pedimos a una API en tiempo de build
const projects = [
  { title: "Proyecto A", image: "/img/a.jpg" },
  { title: "Proyecto B", image: "/img/b.jpg" },
];
---

<!-- Pasamos los datos como props. Astro los serializa a JSON. -->
<ProjectGallery client:visible projects={projects} />
```

**En `ProjectGallery.jsx` (Cliente):**

```jsx
const ProjectGallery = ({ projects }) => {
  // Aquí React toma el control. 'projects' es un array normal.
  const [current, setCurrent] = useState(projects[0]);
  return <div>{current.title}</div>;
};
```

### 4.3 Hooks Personalizados

Si tienes lógica que se repite, extráela a un Hook.
Ejemplo: `useWindowSize`, `useScrollPosition`.

---

## 🔌 MÓDULO 5: LA CAPA DE DATOS (API CLIENT)

Toda la comunicación con el backend pasa por `src/lib/apiClient.js`. **Nunca** hagas `fetch` directos en los componentes si puedes evitarlo.

### 5.1 Anatomía de `apiClient.js`

```javascript
import axios from "axios";

const apiClient = axios.create({
  // IMPORTANTE: Usa variables de entorno.
  // En desarrollo: http://localhost:3000/api
  // En producción: https://tu-backend.onrender.com/api
  baseURL: import.meta.env.PUBLIC_API_URL || "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor de Respuesta (El Guardián)
apiClient.interceptors.response.use(
  (response) => response, // Si todo bien, pasa la respuesta
  (error) => {
    // Si hay error, lo logueamos centralizadamente
    console.error("API Error:", error.response?.data || error.message);
    // Rechazamos la promesa para que el componente pueda manejarlo (mostrar alerta, etc.)
    return Promise.reject(error);
  },
);

export default apiClient;
```

### 5.2 Consumiendo la API en React

```javascript
import apiClient from "../lib/apiClient";

useEffect(() => {
  const fetchData = async () => {
    try {
      setLoading(true);
      const { data } = await apiClient.get("/proyectos");
      setProjects(data);
    } catch (err) {
      setError("No se pudieron cargar los proyectos.");
    } finally {
      setLoading(false);
    }
  };
  fetchData();
}, []);
```

---

## 🛣️ MÓDULO 6: NAVEGACIÓN Y SPA (VIEW TRANSITIONS)

### 6.1 El Problema de las Webs Tradicionales

Normalmente, al hacer clic en un enlace, la pantalla se pone blanca, el navegador descarga todo de nuevo y renderiza. Se siente "lento" y "tosco".

### 6.2 La Solución: `<ClientRouter />` (Antes ViewTransitions)

Astro implementa transiciones de vista nativas del navegador con un fallback robusto.

1.  **Intercepta:** El clic en el enlace `<a>`.
2.  **Fetch:** Pide la siguiente página en segundo plano.
3.  **Swap:** Cambia solo el contenido del `<body>` manteniendo el estado de elementos persistentes si se configuran.
4.  **Animate:** Hace un cross-fade suave entre la página vieja y la nueva.

### 6.3 El Ciclo de Vida (Lifecycle) - ¡CUIDADO AQUÍ!

Como la página no se "recarga" realmente (es una SPA simulada), `window.onload` o `document.addEventListener('DOMContentLoaded')` **NO** funcionan como esperas (solo corren la primera vez).

**Eventos que DEBES usar:**

- `astro:page-load`: Se dispara CADA VEZ que se muestra una nueva página (o la primera). **Aquí va tu código de inicialización (animaciones, analytics, listeners).**
- `astro:before-preparation`: Justo antes de empezar a cargar la nueva página.
- `astro:after-swap`: Justo después de cambiar el HTML, pero antes de que el navegador pinte.

**Patrón Correcto para Scripts Globales:**

```javascript
<script>
  function setup() {
    // Tu lógica de inicialización
    console.log("Página lista");

    // Re-atachar event listeners porque el DOM cambió
    const btn = document.getElementById('mi-boton');
    btn?.addEventListener('click', handleClick);
  }

  // Correr en la primera carga
  setup();

  // Correr en cada navegación subsiguiente
  document.addEventListener("astro:page-load", setup);
</script>
```

---

## ⚡ MÓDULO 7: RENDIMIENTO (PERFORMANCE)

### 7.1 Core Web Vitals (Las métricas de Google)

- **LCP (Largest Contentful Paint):** ¿Qué tan rápido carga lo más grande? (Tu video hero).
  - **Solución:** Usar `poster` en el video. Optimizar el video a <5MB. Usar formatos modernos.
- **CLS (Cumulative Layout Shift):** ¿Se mueven las cosas?
  - **Solución:** Definir dimensiones explícitas (`width`, `height`) en imágenes y contenedores.
- **INP (Interaction to Next Paint):** ¿Responde rápido?
  - **Solución:** Menos JS en el main thread. Hidratación parcial.

### 7.2 Optimización de Imágenes

Astro tiene un componente `<Image />` increíble. ÚSALO.

```astro
import {Image} from 'astro:assets'; import myImage from
'../assets/my-image.png';

<Image
  src={myImage}
  alt="Descripción"
  width={800}
  height={600}
  format="webp"
  quality={80}
/>
```

Esto genera automáticamente versiones optimizadas, lazy loading y previene el CLS.

### 7.3 Optimización de Videos

Los videos son pesados. Estrategias:

1.  **Poster:** Siempre pon una imagen `poster`. Es lo primero que ve el usuario mientras carga el video.
2.  **Compresión:** Usa Handbrake o FFmpeg para comprimir MP4. Bitrate variable, sin audio (si es background).
3.  **Lazy Load:** Si el video no está en el Hero, usa `IntersectionObserver` para cargarlo solo cuando se acerque al viewport.

---

## 🔍 MÓDULO 8: SEO (SEARCH ENGINE OPTIMIZATION)

### 8.1 Metadatos Dinámicos

En `Layout.astro`, recibimos `title` y `description` como props. Cada página debe enviarlos.

```astro
<!-- index.astro -->
<Layout
  title="Inicio - Instalaciones García"
  description="Expertos en electricidad..."
/>
```

### 8.2 Canonical URL

Evita contenido duplicado.
`<link rel="canonical" href={Astro.url} />`

### 8.3 Open Graph (Redes Sociales)

Configuramos `og:image`, `og:title`, `og:description` para que cuando compartan tu enlace en WhatsApp o Facebook, se vea una tarjeta bonita con imagen.

### 8.4 JSON-LD (Datos Estructurados)

Le decimos a Google explícitamente "Somos una Empresa Contratista".

```html
<script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "GeneralContractor",
    "name": "Instalaciones García's",
    "address": { ... }
  }
</script>
```

---

## 🐛 MÓDULO 9: HALL OF SHAME (ERRORES COMUNES)

### 9.1 "ReferenceError: document is not defined"

- **Causa:** Estás intentando acceder a `document` o `window` en el cuerpo del script de un componente `.astro` (que corre en el servidor).
- **Solución:** Mueve esa lógica a una etiqueta `<script>` (cliente) o usa `useEffect` si es React.

### 9.2 "Hydration Mismatch"

- **Causa:** El HTML que generó el servidor no coincide con el que React intentó renderizar en el cliente.
- **Ejemplo:** Renderizar `new Date().toLocaleTimeString()` (la hora cambia entre servidor y cliente).
- **Solución:** Renderiza el contenido dinámico solo después de montar (`useEffect`), o usa un estado inicial consistente.

### 9.3 "CORS Error"

- **Causa:** Tu frontend (localhost:4321) intenta pedir datos a tu backend (localhost:3000) y el backend no le da permiso.
- **Solución:** Configura `cors` en el backend (`app.use(cors({ origin: 'http://localhost:4321' }))`).

### 9.4 "El menú móvil no cierra al hacer clic"

- **Causa:** El evento `click` en el enlace navega, pero no actualiza el estado del menú.
- **Solución:** Agregar un listener a los enlaces del menú para cerrar el menú programáticamente.

---

## 🚀 MÓDULO 10: DESPLIEGUE (DEPLOYMENT)

### 10.1 Variables de Entorno en Producción

En local usamos `.env`. En Vercel/Render, debes configurar las variables en el panel de control del proyecto.

- `PUBLIC_API_URL`: La URL de tu backend en producción.

### 10.2 Content Security Policy (CSP)

Es una capa de seguridad en `vercel.json`. Define qué fuentes de contenido son confiables.

- Si agregas un video de YouTube, debes agregar `https://www.youtube.com` a `frame-src`.
- Si tu API cambia de dominio, actualiza `connect-src`.

### 10.3 Build Process

Cuando haces push a main:

1.  Vercel detecta el cambio.
2.  Ejecuta `npm install`.
3.  Ejecuta `npm run build` (Astro genera los archivos estáticos en `/dist`).
4.  Sube `/dist` a la CDN global.

---

> **Palabras Finales del Arquitecto:**
> El código es un organismo vivo. Se pudre si no se cuida.
>
> 1.  **Limpia:** Borra console.logs, borra componentes no usados.
> 2.  **Documenta:** Si la lógica es compleja, escribe un comentario explicando el "por qué", no el "qué".
> 3.  **Optimiza:** Siempre pregúntate "¿Puedo hacer esto con menos JavaScript?".
>
> ¡Ahora ve y construye algo grandioso!
