# Architectural Decision Records (ADR)

Este documento registra las decisiones de arquitectura significativas y los cambios persistentes en el proyecto PortfolioPPV.

## ADR-001: Optimización de Rendimiento en Spotlight Background

*   **Fecha:** 2026-02-23
*   **Estado:** Aceptado

### Contexto
El componente `SpotlightBackground` original utilizaba JavaScript intensivo con `requestAnimationFrame` para calcular la posición de las luces y detectar colisiones con el mouse en cada frame. Esto causaba un alto consumo de CPU y posibles caídas de frames, especialmente en dispositivos móviles o pantallas grandes.

### Decisión
Se refactorizó el componente `src/components/ui/spotlight.tsx` para eliminar la lógica de animación basada en JS y reemplazarla con **animaciones CSS nativas** (`@keyframes` y `transform: translate`).

*   Se eliminó el seguimiento del mouse y la lógica de colisión (haciéndolo puramente ambiental).
*   Se implementaron 3 variantes de animación flotante en CSS.
*   Se utilizó `will-change-transform` para promover las capas al compositor de la GPU.

### Consecuencias
*   **Positivas:** Mejora drástica en el rendimiento (60fps estables), menor uso de CPU, código más mantenible y ligero.
*   **Negativas:** Se pierde la interactividad con el mouse (el spotlight ya no "huye" o cambia de tamaño al pasar el cursor), pero se consideró un intercambio aceptable por la mejora en UX/performance.

---

## ADR-002: Estrategia de Carga (Preloading & Fade-In)

*   **Fecha:** 2026-02-23
*   **Estado:** Aceptado

### Contexto
Al cargar la página de inicio (`Home.tsx`), los elementos aparecían de forma escalonada (primero el fondo, luego contenedores, luego imágenes grandes), creando una experiencia visual poco pulida ("layout shift" y "pop-in").

### Decisión
Se implementó una estrategia de **Pre-carga de Recursos Críticos** combinada con una animación de entrada.

*   Se utiliza `Promise.all` para precargar las imágenes críticas (`LOGO-PPV.webp`, `about-card.webp`, `AboutMe_1.webp`) antes de mostrar el contenido.
*   Se introdujo un estado `isLoaded`.
*   Se envolvió el contenedor principal en `<motion.div>` (Framer Motion) para realizar un `fade-in` suave (duración 0.8s) solo cuando todos los recursos están listos.

### Consecuencias
*   **Positivas:** Experiencia de usuario "premium" sin parpadeos; el sitio se siente más sólido y profesional.
*   **Negativas:** Un ligero retraso inicial (milisegundos) antes de mostrar el contenido mientras se cargan las imágenes, pero el fondo se muestra inmediatamente, mitigando la sensación de espera.

---

## ADR-003: Gestión de Iconos (React Icons)

*   **Fecha:** 2026-02-23
*   **Estado:** Aceptado

### Contexto
El proyecto requería iconos sociales específicos (GitHub, LinkedIn) que no se estaban renderizando correctamente o causaban conflictos de tipos con la configuración inicial de FontAwesome. Además, surgieron errores de build en Vercel por dependencias faltantes.

### Decisión
Se estandarizó el uso de la librería `react-icons` (específicamente el paquete `fa6` - FontAwesome 6) para los iconos de la interfaz.

*   Se instaló explícitamente `react-icons` en `package.json`.
*   Se corrigieron los errores de TypeScript (parámetros no usados en Promesas) que bloqueaban el despliegue.

### Consecuencias
*   **Positivas:** Acceso a una amplia gama de iconos con una API sencilla; resolución de problemas de despliegue en Vercel.

---

## ADR-004: Estructura de Assets Públicos

*   **Fecha:** 2026-02-23
*   **Estado:** Aceptado

### Contexto
El manejo de imágenes importadas dentro de `src` puede aumentar el tamaño del bundle JS inicial si no se gestionan con cuidado.

### Decisión
Mover las imágenes estáticas (Logos, patrones, fotos de perfil) al directorio `public/assets/` y referenciarlas mediante rutas absolutas (e.g., `/assets/image.webp`).

### Consecuencias
*   **Positivas:** Mejor caché del navegador, separación clara de código y contenido estático, reducción del tamaño del bundle principal.
