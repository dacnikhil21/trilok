import * as React from "react"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface AgreementStepperProps {
  steps?: string[]
  /** 0-based index of the current step. */
  currentIndex: number
  /** Accent color for the active node + progress line — matches the agreement type color. */
  color?: string
  className?: string
}

const DEFAULT_STEPS = ["Item Details", "Parties", "Agreement"]

/**
 * Premium 3-step progress stepper matching reference mobile designs.
 * Features dynamic active glow, smooth progress bars, and polished typography.
 */
export function AgreementStepper({
  steps = DEFAULT_STEPS,
  currentIndex,
  color = "#2563EB",
  className,
}: AgreementStepperProps) {
  return (
    <div className={cn("w-full px-1", className)}>
      <div className="flex items-center justify-between relative">
        {steps.map((label, idx) => {
          const isCompleted = idx < currentIndex
          const isActive = idx === currentIndex

          return (
            <React.Fragment key={label}>
              {/* Step Node */}
              <div className="flex flex-col items-center gap-2 shrink-0 z-10">
                <div
                  className={cn(
                    "flex h-9 w-9 items-center justify-center rounded-full transition-all duration-300",
                    isCompleted && "text-white shadow-[0_2px_8px_rgba(37,99,235,0.25)] scale-100",
                    isActive &&
                      "bg-white border-2 shadow-[0_0_0_4px_rgba(37,99,235,0.14),0_2px_8px_rgba(37,99,235,0.18)] scale-105",
                    !isActive && !isCompleted && "border-[1.5px] border-slate-300 bg-white text-slate-300 shadow-xs"
                  )}
                  style={{
                    backgroundColor: isCompleted ? color : undefined,
                    borderColor: isCompleted ? "transparent" : isActive ? color : "#CBD5E1",
                    color: isActive && !isCompleted ? color : undefined,
                  }}
                >
                  {isCompleted ? (
                    <Check className="h-4.5 w-4.5 text-white stroke-[3] animate-in zoom-in-50 duration-200" />
                  ) : isActive ? (
                    <div
                      className="h-3.5 w-3.5 rounded-full shadow-xs animate-in zoom-in-50 duration-200"
                      style={{ backgroundColor: color }}
                    />
                  ) : (
                    <div className="h-2 w-2 rounded-full bg-slate-200" />
                  )}
                </div>

                {/* Step Label */}
                <span
                  className={cn(
                    "text-[11px] leading-tight text-center whitespace-nowrap transition-colors",
                    isActive
                      ? "font-extrabold tracking-[-0.01em]"
                      : isCompleted
                        ? "font-bold text-[#334155]"
                        : "font-semibold text-slate-400"
                  )}
                  style={{ color: isActive ? color : undefined }}
                >
                  {label}
                </span>
              </div>

              {/* Connecting Progress Line */}
              {idx < steps.length - 1 && (
                <div className="flex-1 mx-2 -mt-5 h-[3px] rounded-full bg-[#E2E8F0] overflow-hidden relative">
                  <div
                    className="h-full rounded-full transition-all duration-500 ease-out"
                    style={{
                      backgroundColor: color,
                      width: idx < currentIndex ? "100%" : "0%",
                    }}
                  />
                </div>
              )}
            </React.Fragment>
          )
        })}
      </div>
    </div>
  )
}
