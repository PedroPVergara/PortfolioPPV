import React, { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

export interface SpotlightBackgroundProps {
  className?: string
  children?: React.ReactNode
  /** Spotlight color(s) - can be a single color or array for multiple spotlights */
  colors?: string | string[]
  /** Size of the spotlight gradient in pixels */
  size?: number
  /** Blur amount for softer edges */
  blur?: number
  /** Opacity of the spotlight */
  opacity?: number
  /** Speed of movement (pixels per frame approx) */
  speed?: number
  /** Ignored in CSS version but kept for compatibility */
  smoothing?: number
  /** Ignored in CSS version but kept for compatibility */
  ambient?: boolean
  /** Ignored in CSS version but kept for compatibility */
  imageRef?: React.RefObject<HTMLElement | null>
}

interface SpotlightState {
  x: number
  y: number
  vx: number
  vy: number
}

export function SpotlightBackground({
  className,
  children,
  colors = ["rgba(120, 119, 198, 0.3)"],
  size = 400,
  blur = 80,
  opacity = 1,
  speed = 2, // Speed in pixels per frame
}: SpotlightBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const spotlightRefs = useRef<(HTMLDivElement | null)[]>([])
  const statesRef = useRef<SpotlightState[]>([])
  const requestRef = useRef<number | null>(null)

  const colorArray = Array.isArray(colors) ? colors : [colors]

  useEffect(() => {
    // Initialize states with random positions and velocities
    const container = containerRef.current
    if (!container) return

    const { width, height } = container.getBoundingClientRect()
    
    // Initialize states if empty or color count changed
    if (statesRef.current.length !== colorArray.length) {
      statesRef.current = colorArray.map(() => ({
        x: Math.random() * (width - size),
        y: Math.random() * (height - size),
        vx: (Math.random() - 0.5) * speed, // Random direction X
        vy: (Math.random() - 0.5) * speed  // Random direction Y
      }))
    }

    const animate = () => {
      if (!containerRef.current) return
      
      const { width, height } = containerRef.current.getBoundingClientRect()

      spotlightRefs.current.forEach((ref, i) => {
        if (!ref) return
        const state = statesRef.current[i]

        // Update position
        state.x += state.vx
        state.y += state.vy

        // Bounce off walls
        if (state.x <= -size / 2) {
          state.x = -size / 2
          state.vx *= -1
        } else if (state.x >= width - size / 2) {
          state.x = width - size / 2
          state.vx *= -1
        }

        if (state.y <= -size / 2) {
          state.y = -size / 2
          state.vy *= -1
        } else if (state.y >= height - size / 2) {
          state.y = height - size / 2
          state.vy *= -1
        }

        // Apply transform directly for performance
        ref.style.transform = `translate3d(${state.x}px, ${state.y}px, 0)`
      })

      requestRef.current = requestAnimationFrame(animate)
    }

    requestRef.current = requestAnimationFrame(animate)

    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current)
    }
  }, [colorArray.length, size, speed])

  return (
    <div
      ref={containerRef}
      className={cn("fixed inset-0 overflow-hidden", className)}
    >
      {/* Spotlight layers */}
      {colorArray.map((color, i) => (
        <div
          key={i}
          ref={(el) => { spotlightRefs.current[i] = el }}
          className="pointer-events-none absolute rounded-full will-change-transform"
          style={{
            width: size,
            height: size,
            left: 0,
            top: 0,
            background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
            opacity,
            filter: `blur(${blur}px)`,
            // Initial position handled by JS immediately
          }}
        />
      ))}

      {/* Content layer */}
      {children && <div className="relative z-10 h-full w-full">{children}</div>}
    </div>
  )
}

export default function SpotlightBackgroundDemo() {
  return <SpotlightBackground colors={["rgba(120, 119, 198, 0.4)", "rgba(59, 130, 246, 0.3)"]} />
}
