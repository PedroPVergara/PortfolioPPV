import React, { useCallback, useEffect, useRef, useState } from "react"
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
  /** Smoothing factor for cursor tracking (0-1, lower = smoother) */
  smoothing?: number
  /** Enable ambient drift when no mouse activity */
  ambient?: boolean
  /** Opacity of the spotlight */
  opacity?: number
  /** Speed multiplier for ambient animation */
  speed?: number
  /** Reference to an element to detect overlap with */
  imageRef?: React.RefObject<HTMLElement | null>
}

interface SpotlightPosition {
  x: number
  y: number
  targetX: number
  targetY: number
  currentSize: number
}

interface RenderPosition {
  x: number
  y: number
  size: number
}

export function SpotlightBackground({
  className,
  children,
  colors = ["rgba(120, 119, 198, 0.3)"],
  size = 400,
  blur = 80,
  smoothing = 0.1,
  ambient = true,
  opacity = 1,
  speed = 1,
  imageRef,
}: SpotlightBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const spotlightsRef = useRef<SpotlightPosition[]>([])
  const animationRef = useRef<number | null>(null)
  const [positions, setPositions] = useState<RenderPosition[]>([])

  const colorArray = Array.isArray(colors) ? colors : [colors]

  // Initialize spotlight positions
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const { width, height } = container.getBoundingClientRect()
    const centerX = width / 2
    const centerY = height / 2

    spotlightsRef.current = colorArray.map((_, i) => ({
      x: centerX + (i - (colorArray.length - 1) / 2) * 50,
      y: centerY,
      targetX: centerX + (i - (colorArray.length - 1) / 2) * 50,
      targetY: centerY,
      currentSize: size,
    }))

    setPositions(spotlightsRef.current.map(s => ({ x: s.x, y: s.y, size: s.currentSize })))
  }, [colorArray.length, size])

  // Lerp helper
  const lerp = useCallback((start: number, end: number, factor: number) => {
    return start + (end - start) * factor
  }, [])

  // Animation loop
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const { width, height } = container.getBoundingClientRect()
    let tick = 0

    const animate = () => {
      tick += speed
      const isAmbient = ambient

      // Check overlap with image
      let imageRect: DOMRect | null = null
      if (imageRef?.current) {
        imageRect = imageRef.current.getBoundingClientRect()
      }

      spotlightsRef.current = spotlightsRef.current.map((spotlight, i) => {
        let { x, y, targetX, targetY, currentSize } = spotlight

        // Ambient drift
        if (isAmbient) {
          const offset = i * 0.5
          targetX = width / 2 + Math.sin(tick * 0.005 + offset) * (width * 0.3)
          targetY = height / 2 + Math.cos(tick * 0.003 + offset) * (height * 0.25)
        }

        // Smooth interpolation
        x = lerp(x, targetX, smoothing)
        y = lerp(y, targetY, smoothing)

        // Size logic based on overlap
        let targetSize = size
        if (imageRect) {
          const imageCenterX = imageRect.left + imageRect.width / 2
          const imageCenterY = imageRect.top + imageRect.height / 2
          
          // Calculate distance from spotlight center to image center
          const dx = x - imageCenterX
          const dy = y - imageCenterY
          const distance = Math.sqrt(dx * dx + dy * dy)
          
          // Define radius where effect starts (larger than image itself)
          const maxDim = Math.max(imageRect.width, imageRect.height)
          const effectRadius = maxDim * 1.5 // Effect starts further out
          
          if (distance < effectRadius) {
            // Calculate intensity (0 to 1)
            // 1 at center, 0 at effectRadius edge
            const intensity = Math.max(0, 1 - (distance / effectRadius))
            
            // SmoothStep interpolation for organic feel
            const smoothIntensity = intensity * intensity * (3 - 2 * intensity)
            
            // Increase size up to 100% more (2x total) at peak overlap
            targetSize = size + (size * 1.0 * smoothIntensity)
          }
        }
        currentSize = lerp(currentSize, targetSize, 0.05) // Smooth size transition

        return { x, y, targetX, targetY, currentSize }
      })

      setPositions(spotlightsRef.current.map(s => ({ x: s.x, y: s.y, size: s.currentSize })))
      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
    }
  }, [ambient, smoothing, lerp, speed, size, imageRef])

  return (
    <div
      ref={containerRef}
      className={cn("fixed inset-0 overflow-hidden", className)}
    >
      {/* Spotlight layers */}
      {colorArray.map((color, i) => (
        <div
          key={i}
          className="pointer-events-none absolute inset-0 transition-opacity duration-300"
          style={{
            opacity,
            background: positions[i]
              ? `radial-gradient(${positions[i].size}px circle at ${positions[i].x}px ${positions[i].y}px, ${color}, transparent 70%)`
              : "transparent",
            filter: `blur(${blur}px)`,
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
