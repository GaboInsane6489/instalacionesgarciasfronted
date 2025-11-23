# 🏗️ Instalaciones García's - Frontend Project

> **Versión:** 1.0.0
> **Estado:** Producción
> **Stack:** Astro v5 + React + TailwindCSS

Bienvenido a la documentación oficial del repositorio frontend de **Instalaciones García's**. Este documento sirve como la fuente de verdad técnica para desarrolladores, arquitectos y mantenedores del proyecto.

---

## 📑 Tabla de Contenidos

1.  [Visión General del Proyecto](#visión-general-del-proyecto)
2.  [Arquitectura Técnica](#arquitectura-técnica)
3.  [Stack Tecnológico](#stack-tecnológico)
4.  [Estructura del Proyecto](#estructura-del-proyecto)
5.  [Instalación y Configuración](#instalación-y-configuración)
6.  [Guía de Desarrollo](#guía-de-desarrollo)
7.  [Componentes Principales](#componentes-principales)
8.  [Estrategia de Assets y Rendimiento](#estrategia-de-assets-y-rendimiento)
9.  [Navegación y SPA](#navegación-y-spa)
10. [Despliegue](#despliegue)

---

## 1. 🔭 Visión General del Proyecto

Este proyecto es la interfaz pública (Frontend) para la empresa **Instalaciones García's**, líder en servicios eléctricos e industriales. El objetivo principal del sitio es convertir visitantes en clientes potenciales mediante una experiencia de usuario (UX) premium, rápida y confiable.

### Objetivos Clave

- **Velocidad Extrema:** Cargas iniciales cercanas a 0ms utilizando la arquitectura de Islas de Astro.
- **Estética Premium:** Diseño visual de alta gama con animaciones fluidas y vidriosidad (Glassmorphism).
- **SEO Optimizado:** Renderizado estático (SSG) para máxima indexabilidad.
- **Interactividad:** Componentes React complejos (Galerías, Calculadoras) hidratados solo cuando es necesario.

---

## 2. 🏛️ Arquitectura Técnica

El proyecto utiliza una arquitectura **Multi-Page Application (MPA)** potenciada con capacidades de **Single Page Application (SPA)** mediante `ClientRouter`.

### Conceptos Core

- **Astro Islands (Islas):** El sitio es mayoritariamente HTML estático. Solo las "islas" de interactividad (componentes React) cargan JavaScript. Esto reduce el bundle size drásticamente.
- **View Transitions:** Utilizamos el router del cliente de Astro para navegar entre páginas sin recargar el navegador completo, manteniendo el estado de animaciones y reduciendo el consumo de datos.
- **Lazy Loading:** Todo recurso que no es crítico para la primera pintura (First Contentful Paint) se carga de manera diferida.

---

## 3. 🛠️ Stack Tecnológico

### Core

- **Framework:** [Astro v5.16](https://astro.build/) - El motor principal.
- **UI Library:** [React v19](https://react.dev/) - Para componentes interactivos complejos.
- **Styling:** [Tailwind CSS v3.4](https://tailwindcss.com/) - Utility-first CSS framework.
- **Lenguaje:** JavaScript (ES6+) / JSX.

### Librerías Adicionales

- **Framer Motion:** Para animaciones complejas en componentes React (Galería).
- **Lucide React:** Sistema de iconos SVG ligeros y consistentes.
- **Canvas Confetti:** Efectos visuales de celebración.

### Herramientas de Build

- **Vite:** Bundler de próxima generación, ultra rápido.
- **PNPM:** Gestor de paquetes eficiente.

---

## 4. 📂 Estructura del Proyecto

```bash
/
├── public/              # Archivos estáticos públicos (favicon, robots.txt)
├── src/
│   ├── assets/          # Assets procesados por Vite/Astro
│   │   ├── images/      # Imágenes locales (JPG, PNG, AVIF)
│   │   └── videos/      # Videos locales (MP4, WebM)
│   ├── components/      # Componentes reutilizables
│   │   ├── ProjectGallery.jsx   # Galería interactiva (React)
│   │   ├── ProjectCalculator.jsx # Calculadora de costos (React)
│   │   ├── ServiceCard.astro    # Tarjeta de servicio (Astro)
│   │   ├── VideoHero.astro      # Componente Hero con video (Astro)
│   │   └── SolutionsGuide.jsx   # Guía interactiva (React)
│   ├── layouts/         # Plantillas base de páginas
│   │   └── Layout.astro # Layout principal (Navbar, Footer, SEO)
│   ├── pages/           # Rutas del sitio (File-system routing)
│   │   ├── index.astro      # Página de Inicio (/)
│   │   ├── servicios.astro  # Página de Servicios (/servicios)
│   │   ├── proyectos.astro  # Página de Proyectos (/proyectos)
│   │   └── contacto.astro   # Página de Contacto (/contacto)
│   └── styles/          # Estilos globales
│       └── global.css   # Configuraciones base de Tailwind y fuentes
├── astro.config.mjs     # Configuración de Astro
├── tailwind.config.mjs  # Configuración de Tailwind
└── package.json         # Dependencias y scripts
```

---

## 5. 🚀 Instalación y Configuración

Sigue estos pasos para levantar el entorno de desarrollo localmente.

### Prerrequisitos

- Node.js v18.14.1 o superior.
- PNPM (recomendado) o NPM.

### Pasos

1.  **Clonar el repositorio:**

    ```bash
    git clone <url-del-repo>
    cd InstalacionesGarciasFronted
    ```

2.  **Instalar dependencias:**

    ```bash
    pnpm install
    ```

3.  **Iniciar servidor de desarrollo:**
    ```bash
    pnpm dev
    ```
    El sitio estará disponible en `http://localhost:4321`.

---

## 6. � Guía de Desarrollo

### Comandos Disponibles

| Comando            | Descripción                                                  |
| :----------------- | :----------------------------------------------------------- |
| `pnpm dev`         | Inicia el servidor local con Hot Module Replacement (HMR).   |
| `pnpm build`       | Compila el sitio para producción en la carpeta `dist/`.      |
| `pnpm preview`     | Sirve la versión compilada localmente para pruebas finales.  |
| `pnpm astro check` | Ejecuta verificaciones de tipos y errores en archivos Astro. |

### Flujo de Trabajo Recomendado

1.  **Crear Componentes:** Si es estático, usa `.astro`. Si necesita estado (useState, useEffect), usa `.jsx` (React).
2.  **Estilos:** Usa clases de Tailwind siempre que sea posible. Para animaciones CSS complejas, usa la etiqueta `<style>` dentro del componente Astro o `global.css`.
3.  **Assets:** Coloca imágenes en `src/assets/images`. Impórtalas en los archivos Astro/JS para que Vite las optimice.

---

## 7. 🧩 Componentes Principales

### `Layout.astro`

Es el contenedor maestro. Maneja:

- **SEO:** Meta etiquetas dinámicas (Title, Description, OG Tags).
- **Navegación:** Navbar responsivo con efecto glassmorphism.
- **Footer:** Pie de página masivo con enlaces y datos de contacto.
- **ClientRouter:** Habilita la navegación SPA.

### `VideoHero.astro`

Componente de alto impacto visual para las cabeceras de página.

- **Props:** `videoUrl` (local o remoto), `mobileImage` (fallback), `title`, `subtitle`.
- **Optimización:** Usa `preload="metadata"` para no bloquear la red.

### `ProjectGallery.jsx`

Carrusel interactivo construido con React y Framer Motion.

- **Hidratación:** Se carga con `client:visible`. No descarga JS hasta que el usuario hace scroll hacia él.
- **Props:** Recibe un array de objetos `projects` con imágenes importadas localmente.

---

## 8. ⚡ Estrategia de Assets y Rendimiento

### Imágenes

- **Ubicación:** `src/assets/images/`
- **Procesamiento:** Astro convierte automáticamente a WebP/AVIF y genera srcsets para diferentes tamaños de pantalla.
- **Uso:**
  ```astro
  import myImage from "../assets/images/foto.jpg";
  <img src={myImage.src} loading="lazy" />
  ```

### Videos

- **Ubicación:** `src/assets/videos/`
- **Estrategia:** Videos cortos (<5MB) se sirven localmente. Videos largos deben ser externos o streameados.
- **Carga:** Siempre usar `preload="metadata"` y `muted` `autoplay` `playsinline` para compatibilidad móvil.

### Lazy Loading

- **Imágenes:** Atributo `loading="lazy"` en todas las imágenes "below the fold" (debajo de la primera pantalla).
- **Componentes:** Directiva `client:visible` para componentes React pesados.

---

## 9. 🔄 Navegación y SPA

El sitio usa el `ClientRouter` de Astro (anteriormente View Transitions).

### Comportamiento

- El navegador no recarga la página completa.
- Se intercambia el contenido del `<body>`.
- Se mantienen los estados de scripts globales.

### Manejo de Eventos

Debido a que el DOM no se destruye completamente, los scripts que dependen de `DOMContentLoaded` solo corren una vez. Para ejecutar código en cada navegación (como reinicializar animaciones), usamos:

```javascript
document.addEventListener("astro:page-load", () => {
  // Tu código aquí (ej: inicializar observadores, analytics)
});
```

---

## 10. 🚢 Despliegue

El proyecto está configurado para ser desplegado como un sitio estático.

### Build

Ejecuta `pnpm build`. Esto generará una carpeta `dist/` con HTML, CSS y JS puro.

### Hosting Recomendado

- **Vercel / Netlify:** Detección automática de Astro.
- **Servidor Apache/Nginx:** Simplemente subir el contenido de `dist/`.

### Configuración de Servidor

Asegúrate de que tu servidor sirva los archivos con los headers de caché correctos (Cache-Control) para maximizar la velocidad.

---

## 11. 💡 Ideas Futuras (Roadmap)

Lista de mejoras planificadas para llevar el proyecto al siguiente nivel:

- [ ] **Blueprint Mode (Modo Plano):** Un tema alternativo que simula un plano arquitectónico (fondo azul, líneas finas).
- [ ] **Transiciones de Vista "Mágicas":** Animaciones fluidas donde los elementos persisten y se transforman al navegar entre páginas.
- [ ] **Elementos 3D Interactivos:** Modelos 3D ligeros (cascos, estructuras) que reaccionan al mouse.
- [x] **Efecto Spotlight:** Cursor tipo "linterna" que revela texturas en secciones oscuras.
- [ ] **PWA (Progressive Web App):** Hacer el sitio instalable y funcional offline.

---

> **Instalaciones García's** - Ingeniería y Excelencia.
> Documentación generada por el equipo de desarrollo.
