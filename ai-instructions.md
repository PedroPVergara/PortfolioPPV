# PortfolioPPV - Project Instructions

## Tech Stack
- **Framework**: React 19
- **Build Tool**: Vite
- **Styling**: Tailwind CSS 4
- **Language**: TypeScript
- **Animations**: Framer Motion
- **Package Manager**: Bun

## Architecture
- **Type**: Single Page Application (SPA)
- **Target**: Desktop First
- **Structure**: Modular and Scalable

## Project Structure
- `src/components`: Reusable UI components
- `src/sections`: Main page sections (100vh each)
- `src/hooks`: Custom React hooks
- `src/utils`: Utility functions
- `src/types`: TypeScript type definitions
- `src/styles`: Global style configurations
- `src/assets`: Images, fonts, icons

## Development Principles
- **SOLID**: Apply SOLID principles in component design.
- **Clean Code**: Maintain readable and maintainable code.
- **Naming**: Use English for all files, variables, and comments.
- **Barrel Exports**: Use `index.ts` files for cleaner imports.
- **Component Structure**: Each component in its own folder with logic, styles, and tests separated if needed.

## Design
- **Background**: Linear gradient from #0D1127 (top) to #020307 (bottom).
- **Layout**: 3 initial sections, each 100vh.
- **Layout**: Breakpoint sizes:
  
  - `lg`: 1024px
  - `xl`: 1280px
  - `2xl`: 1536px
  - `3xl`: 1920px
  - `4xl`: 2560px
  - `5xl`: 3840px

  en cada breakpoint, de la section 1, el hero title debe mantener el mismo orden y diseno en todos los breakpoints, pero cambiando el tamaño de fuente. la imagen PPV.webp tambien se debe escalar en cada breakpoint, para adaptarse al tamaño de la pantalla., el CCS-PPV-LOGO.webp tambien se debe escalar en cada breakpoint, para adaptarse al tamaño de la pantalla.

  en el responsive, el hero title debe cambiar de tamaño de fuente en cada breakpoint, de manera que se adapte al tamaño de la pantalla.

  **Typography & Text Rules**:
  - **Source**: Montserrat (Google Fonts) via `<link>` tag in `index.html`.
  - **Loading Strategy**: MUST use `&display=block` in the font URL. This is critical to prevent FOUT (Flash of Unstyled Text); text should be invisible until the font is fully loaded.
  - **Structure**:
    - "Hola, soy": Medium weight.
    - "Pedro Ponce": Semibold weight.
    - "Vergara": Semibold weight.
    - "Fullstack Developer": Light weight. **Color MUST be #34AEFA**.
  
  **Spacing**:
  - Vertical separation between text blocks must be 16px.

  **Social Icons**:
  - **GitHub**: White icon. No color change on hover. Scales up on hover.
  - **LinkedIn**: Dark icon (#0D1127) inside a white circle. Scales up on hover.
  - **Gap**: Spacing between icons should be compact (approx 12px / gap-3).

  **Reference Sizing**:
  - Macbook Pro 16" is the base design reference (Figma).
  - Logo size at this reference: w160 h75.

## Visual Effects & Interactions
- **Spotlight Background**: Ambient animated spotlight effect. Must interact with the main portrait image (smoothly growing when passing behind it).
- **Focus Element**: Used `FocusPPV.webp` which integrates both the portrait and the focus graphic. Positioned at bottom 20% of the viewport.
- **Image Protection**: Critical images (Logo, FocusPPV) MUST have `draggable="false"` and `select-none` class to prevent user interaction/dragging.

## Layout Rules
- **Header**: Logo and Language Selector must be contained in a top-aligned Flex container to ensure perfect vertical center alignment between them.
- **Social Icons**: Use specific scaling for large screens (XL: 3xl, 2XL: 4xl, 3XL: 5xl) to maintain balance.

## Commands
- `bun dev`: Start development server
- `bun build`: Build for production
- `bun preview`: Preview production build
