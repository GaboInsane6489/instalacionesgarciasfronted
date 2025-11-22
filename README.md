# ⚡ Instalaciones García's - Enterprise Web Platform

![Astro](https://img.shields.io/badge/Astro-5.0-orange?style=for-the-badge&logo=astro)
![React](https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-Latest-black?style=for-the-badge&logo=framer)
![Status](https://img.shields.io/badge/Status-Production_Ready-success?style=for-the-badge)

> **Una experiencia digital premium para el sector de ingeniería y construcción.**
> Este proyecto redefine la presencia digital corporativa con un diseño de alto impacto, animaciones fluidas y herramientas interactivas de vanguardia.

---

## 🚀 Características Destacadas

### 🎨 Diseño & UX Premium

- **Glassmorphism UI:** Interfaz moderna con efectos de desenfoque y transparencias dinámicas.
- **Astro View Transitions:** Navegación SPA (Single Page Application) nativa sin recargas.
- **Micro-interacciones:** Efectos de hover, cursores magnéticos y feedback visual sutil.
- **Spotlight Effect:** Iluminación dinámica en tarjetas que sigue el cursor del usuario.

### 🛠️ Funcionalidades Avanzadas

- **Calculadora de Proyectos Inteligente:** Estimación en tiempo real de costos y materiales con integración directa a WhatsApp.
- **Galería Interactiva:** Carrusel de proyectos con fondo de video y transiciones cinematográficas.
- **Mega Footer Corporativo:** Estructura de navegación completa con datos empresariales.
- **Animaciones Scroll-Trigger:** Efectos "Mask Reveal" y "Counter Up" activados al visualizar.

---

## 🛠️ Stack Tecnológico

Este proyecto ha sido construido utilizando las tecnologías más modernas del ecosistema web:

| Tecnología                                          | Uso Principal                                             |
| --------------------------------------------------- | --------------------------------------------------------- |
| **[Astro](https://astro.build/)**                   | Framework principal (Islands Architecture)                |
| **[React](https://react.dev/)**                     | Componentes interactivos complejos (Calculadora, Galería) |
| **[Tailwind CSS](https://tailwindcss.com/)**        | Sistema de diseño y estilos utilitarios                   |
| **[Framer Motion](https://www.framer.com/motion/)** | Motor de animaciones complejas y gestos                   |
| **[Lucide React](https://lucide.dev/)**             | Iconografía vectorial moderna y ligera                    |

---

## 📂 Estructura del Proyecto

```bash
InstalacionesGarciasFronted/
├── public/              # Assets estáticos públicos
├── src/
│   ├── components/      # Componentes UI reutilizables
│   │   ├── ProjectCalculator.jsx  # 🧮 Simulador de costos
│   │   ├── ProjectGallery.jsx     # 📸 Carrusel interactivo
│   │   ├── SolutionsGuide.jsx     # 📘 Guía de soluciones
│   │   ├── ServiceCard.astro      # 🃏 Tarjeta con efecto spotlight
│   │   └── VideoHero.astro        # 🎥 Hero section con video
│   ├── layouts/         # Plantillas base (Layout.astro)
│   ├── pages/           # Rutas del sitio
│   │   ├── index.astro      # 🏠 Página de inicio
│   │   └── servicios.astro  # 🛠️ Página de servicios
│   └── styles/          # Estilos globales (global.css)
├── astro.config.mjs     # Configuración de Astro
├── tailwind.config.mjs  # Configuración de diseño
└── package.json         # Dependencias y scripts
```

---

## ⚡ Guía de Instalación

Sigue estos pasos para levantar el proyecto en tu entorno local:

### 1. Prerrequisitos

- Node.js (v18 o superior)
- pnpm (recomendado) o npm

### 2. Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/instalaciones-garcias.git
cd instalaciones-garcias
```

### 3. Instalar dependencias

Utilizamos `pnpm` para una gestión de paquetes rápida y eficiente.

```bash
pnpm install
```

### 4. Iniciar servidor de desarrollo

```bash
pnpm dev
```

El sitio estará disponible en `http://localhost:4321`.

---

## 🚢 Scripts Disponibles

| Comando            | Descripción                                           |
| ------------------ | ----------------------------------------------------- |
| `pnpm dev`         | Inicia el servidor de desarrollo local                |
| `pnpm build`       | Genera la versión de producción optimizada en `/dist` |
| `pnpm preview`     | Vista previa local de la versión de producción        |
| `pnpm astro check` | Ejecuta diagnósticos y chequeo de tipos               |

---

## 🌟 Optimizaciones Implementadas

- **Lazy Loading:** Componentes pesados (React) cargan solo cuando son visibles (`client:visible`).
- **SEO:** Etiquetas canónicas, meta descripciones y estructura semántica HTML5.
- **Performance:** Videos optimizados y carga diferida de recursos no críticos.
- **Accesibilidad:** Contraste adecuado y navegación por teclado.

---

<div align="center">
  <p>Desarrollado con ❤️ y excelencia técnica.</p>
  <p>© 2025 Instalaciones García's</p>
</div>
