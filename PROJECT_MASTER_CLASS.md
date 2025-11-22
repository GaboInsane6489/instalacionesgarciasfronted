# 🎓 Master Class: Dominando tu Proyecto "Instalaciones García's"

¡Bienvenido a la guía definitiva de tu propio código! Esta documentación está diseñada para llevarte de "no sé qué estoy viendo" a "soy el dueño absoluto de este sitio".

---

## 1. ¿Qué es esto realmente? (El "Stack")

No es solo una página web "clásica" (HTML/CSS/JS). Es una **Aplicación Web Moderna** construida con una arquitectura híbrida muy potente.

- **🚀 Astro (El Jefe):** Es el framework principal. Piensa en Astro como el "esqueleto" y el "organizador". Su superpoder es que envía **cero JavaScript** al navegador por defecto, lo que hace que el sitio vuele.
- **⚛️ React (El Cerebro Interactivo):** Usamos React solo donde necesitamos interactividad compleja (la Calculadora, la Galería, la Guía de Soluciones). Astro "incrusta" estos componentes de React como "Islas" interactivas.
- **🎨 Tailwind CSS (El Estilista):** En lugar de escribir archivos CSS gigantes (`style.css`), escribimos los estilos directamente en el HTML (ej: `class="bg-black text-white"`). Es rápido y mantenible.
- **✨ Framer Motion (El Animador):** Una librería de React que hace que las cosas se muevan suavemente (transiciones, entradas, hovers).

---

## 2. El Tour por la Casa (Estructura de Archivos)

Vamos a abrir la carpeta `src/` (Source/Fuente). Aquí es donde vive todo tu código.

### 📂 `src/pages/` (Las Rutas)

Aquí es donde ocurre la magia del enrutamiento. **Cada archivo aquí es una URL en tu sitio.**

- `index.astro` ➡️ Es tu página de inicio (`/`).
- `servicios.astro` ➡️ Es la página de servicios (`/servicios`).
- **¿Quieres una página "Contacto"?** Solo crea `contacto.astro` aquí y ¡listo! Astro crea la ruta automáticamente.

### 📂 `src/layouts/` (Las Plantillas)

- `Layout.astro`: Es el "molde" de todas tus páginas.
  - Aquí está el `<head>` (metadatos, título).
  - Aquí está el **Navbar** (menú de arriba).
  - Aquí está el **Footer** (pie de página).
  - Tiene un `<slot />`. Todo lo que escribas en tus páginas (`index.astro`, etc.) se inyecta en ese `slot`. ¡Así no repites el menú en cada archivo!

### 📂 `src/components/` (Las Piezas de Lego)

Aquí están los bloques reutilizables.

- **`.astro` (Estáticos):** Como `VideoHero.astro` o `ServiceCard.astro`. Son HTML + CSS con superpoderes. Se renderizan en el servidor y llegan listos al navegador.
- **`.jsx` (Interactivos/React):** Como `ProjectCalculator.jsx` o `ProjectGallery.jsx`. Estos tienen "vida" en el navegador (manejan clicks, estados, cálculos).

### 📂 `src/styles/`

- `global.css`: Aquí configuramos Tailwind y algunas animaciones globales (como el scrollbar personalizado).

---

## 3. Diseccionando la Magia (¿Cómo funciona?)

### Las "Islas" de Astro (`client:load`)

Si miras `servicios.astro`, verás esto:

```astro
<ProjectCalculator client:load />
```

Ese `client:load` es la clave. Le dice a Astro: _"Oye, este componente es de React y necesita JavaScript para funcionar. Cárgalo y hazlo interactivo en cuanto la página abra"_.
Sin esa etiqueta, Astro renderizaría solo el HTML estático (sin funcionalidad).

### View Transitions (Navegación tipo App)

En `Layout.astro` importamos `<ClientRouter />`. Esto hace que cuando haces clic en un enlace, el navegador **no recarga toda la página en blanco**. En su lugar, Astro intercambia suavemente el contenido viejo por el nuevo. ¡Por eso se siente tan premium!

---

## 4. Guía Práctica: "Quiero cambiar algo..."

### Caso A: "Quiero cambiar el video del inicio"

1. Ve a `src/pages/index.astro`.
2. Busca el componente `<VideoHero ... />`.
3. Cambia la propiedad `videoUrl="..."`. ¡Listo! (Justo lo que acabas de hacer).

### Caso B: "Quiero cambiar el color de un botón"

1. Busca el botón en el código.
2. Verás clases como `bg-white text-black`.
3. Cámbialo a `bg-blue-500 text-white`. (Tailwind tiene todos los colores: red, blue, green, slate, zinc, etc., y números del 50 al 950 para la intensidad).

### Caso C: "Quiero agregar un nuevo servicio"

1. Ve a `src/pages/servicios.astro`.
2. Al principio del archivo, verás una lista `const services = [...]`.
3. Agrega un nuevo objeto a esa lista:
   ```javascript
   {
     title: "Nuevo Servicio",
     description: "Descripción increíble...",
     icon: Zap // Importa el icono que quieras usar
   }
   ```
4. El código recorre esa lista automáticamente (`services.map(...)`), así que la tarjeta aparecerá sola.

---

## 5. Comandos de la Terminal (Tu Centro de Control)

- `pnpm dev`: **"Modo Constructor"**. Enciende el servidor local. Si cambias código, se actualiza solo.
- `pnpm build`: **"Modo Fábrica"**. Empaqueta todo tu sitio en una carpeta `dist/` lista para subir a internet.
- `pnpm preview`: **"Modo Prueba"**. Te deja ver lo que generó el comando `build` para asegurar que todo funciona antes de subirlo.

---

## 🎓 Conclusión

Tienes en tus manos un **Ferrari** del desarrollo web.

- No es un WordPress lento y pesado.
- No es un sitio viejo hecho a mano.
- Es una aplicación moderna, optimizada, modular y escalable.

¡Explora, rompe cosas (siempre puedes hacer `Ctrl+Z`) y diviértete construyendo!
