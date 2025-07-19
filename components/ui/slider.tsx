"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface SliderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  value: number[]
  onValueChange?: (value: number[]) => void
  max?: number
  min?: number
  step?: number
  disabled?: boolean
}

const Slider = React.forwardRef<HTMLDivElement, SliderProps>(
  ({ className, value, onValueChange, max = 100, min = 0, step = 1, disabled = false, ...props }, ref) => {
    const [isDragging, setIsDragging] = React.useState(false)
    const sliderRef = React.useRef<HTMLDivElement>(null)

    const handleMouseDown = (event: React.MouseEvent) => {
      if (disabled) return
      setIsDragging(true)
      updateValue(event)
    }

    const updateValue = React.useCallback(
      (event: React.MouseEvent | MouseEvent) => {
        if (!sliderRef.current || disabled) return

        const rect = sliderRef.current.getBoundingClientRect()
        const percentage = Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width))
        const newValue = min + percentage * (max - min)
        const steppedValue = Math.round(newValue / step) * step

        onValueChange?.([Math.max(min, Math.min(max, steppedValue))])
      },
      [min, max, step, onValueChange, disabled],
    )

    React.useEffect(() => {
      const handleMouseMove = (event: MouseEvent) => {
        if (isDragging) {
          updateValue(event)
        }
      }

      const handleMouseUp = () => {
        setIsDragging(false)
      }

      if (isDragging) {
        document.addEventListener("mousemove", handleMouseMove)
        document.addEventListener("mouseup", handleMouseUp)
      }

      return () => {
        document.removeEventListener("mousemove", handleMouseMove)
        document.removeEventListener("mouseup", handleMouseUp)
      }
    }, [isDragging, updateValue])

    const percentage = ((value[0] - min) / (max - min)) * 100

    return (
      <div
        ref={(node) => {
          sliderRef.current = node
          if (typeof ref === "function") {
            ref(node)
          } else if (ref) {
            ref.current = node
          }
        }}
        className={cn(
          "relative flex w-full touch-none select-none items-center cursor-pointer",
          disabled && "opacity-50 cursor-not-allowed",
          className,
        )}
        onMouseDown={handleMouseDown}
        {...props}
      >
        <div className="relative h-2 w-full grow overflow-hidden rounded-full bg-secondary">
          <div className="absolute h-full bg-primary transition-all" style={{ width: `${percentage}%` }} />
        </div>
        <div
          className="block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
          style={{
            left: `${percentage}%`,
            transform: "translateX(-50%)",
            position: "absolute",
          }}
        />
      </div>
    )
  },
)
Slider.displayName = "Slider"

export { Slider }
