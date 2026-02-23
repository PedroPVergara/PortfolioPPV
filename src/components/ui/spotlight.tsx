import React from "react"
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
  /** Animation duration in seconds (higher = slower) */
  speed?: number
  /** Ignored in CSS version but kept for compatibility */
  smoothing?: number
  /** Ignored in CSS version but kept for compatibility */
  ambient?: boolean
  /** Ignored in CSS version but kept for compatibility */
  imageRef?: React.RefObject<HTMLElement | null>
}

export function SpotlightBackground({
  className,
  children,
  colors = ["rgba(120, 119, 198, 0.3)"],
  size = 400,
  blur = 80,
  opacity = 1,
  speed = 10, // Default duration in seconds
}: SpotlightBackgroundProps) {
  const colorArray = Array.isArray(colors) ? colors : [colors]

  return (
    <div className={cn("fixed inset-0 overflow-hidden", className)}>
      <style>{`
        @keyframes spotlight-float-1 {
          0% { transform: translate(-20%, -20%) scale(1); }
          33% { transform: translate(30%, 10%) scale(1.1); }
          66% { transform: translate(-10%, 30%) scale(0.9); }
          100% { transform: translate(-20%, -20%) scale(1); }
        }
        @keyframes spotlight-float-2 {
          0% { transform: translate(20%, 20%) scale(1); }
          33% { transform: translate(-30%, -10%) scale(1.2); }
          66% { transform: translate(10%, -30%) scale(0.8); }
          100% { transform: translate(20%, 20%) scale(1); }
        }
        @keyframes spotlight-float-3 {
          0% { transform: translate(-10%, 10%) scale(0.9); }
          50% { transform: translate(20%, -20%) scale(1.1); }
          100% { transform: translate(-10%, 10%) scale(0.9); }
        }
      `}</style>

      {/* Spotlight layers */}
      {colorArray.map((color, i) => (
        <div
          key={i}
          className="pointer-events-none absolute rounded-full will-change-transform"
          style={{
            width: size,
            height: size,
            left: '50%',
            top: '50%',
            marginLeft: -size / 2,
            marginTop: -size / 2,
            background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
            opacity,
            filter: `blur(${blur}px)`,
            animation: `spotlight-float-${(i % 3) + 1} ${speed * (1 + i * 0.2)}s infinite ease-in-out`,
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
