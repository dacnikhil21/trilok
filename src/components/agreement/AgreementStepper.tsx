import * as React from "react"
import { Check, FileText, ShieldCheck, FileCheck, Layers } from "lucide-react"
import { cn } from "@/lib/utils"

interface AgreementStepperProps {
  steps?: string[]
  /** 0-based index of the current step. */
  currentIndex: number
  /** Accent color for the active node + progress line — matches the agreement type color. */
  color?: string
  className?: string
}

const DEFAULT_STEPS = ["Agreement Details", "Review"]

const STEP_ICONS = [Layers, ShieldCheck, FileCheck]

/**
 * Ultra-Premium 2/3-step progress stepper.
 * Seamless, borderless mobile design with perfectly connected progress lines,
 * squircle icon nodes, active glowing indicators, and smooth state transitions.
 */
export function AgreementStepper({
  steps = DEFAULT_STEPS,
  currentIndex,
  color = "#2563EB",
  className,
}: AgreementStepperProps) {
  return (
    <div className={cn("w-full px-3 pt-1 pb-2 mb-3 select-none", className)}>
      <div className="flex items-start justify-between w-full">
        {steps.map((label, idx) => {
          const isCompleted = idx < currentIndex
          const isActive = idx === currentIndex
          const isUpcoming = idx > currentIndex
          const isLast = idx === steps.length - 1
          const IconComponent = STEP_ICONS[idx % STEP_ICONS.length]

          return (
            <React.Fragment key={label}>
              {/* Step Node + Label Column */}
              <div className="flex flex-col items-center gap-1.5 shrink-0 min-w-[80px]">
                {/* 44px x 44px Squircle Node */}
                <div
                  className={cn(
                    "flex h-11 w-11 items-center justify-center rounded-[14px] transition-all duration-300 relative shrink-0",
                    isCompleted && "text-white shadow-md scale-100",
                    isActive &&
                      "bg-white border-2 scale-105 shadow-[0_0_0_4px_rgba(37,99,235,0.14),0_4px_14px_rgba(37,99,235,0.2)]",
                    isUpcoming && "border-[1.5px] border-[#CBD5E1] bg-[#F8FAFC] text-[#94A3B8]"
                  )}
                  style={{
                    backgroundColor: isCompleted ? color : isActive ? "#FFFFFF" : "#F8FAFC",
                    borderColor: isCompleted ? "transparent" : isActive ? color : "#CBD5E1",
                    color: isCompleted ? "#FFFFFF" : isActive ? color : "#94A3B8",
                  }}
                >
                  {isCompleted ? (
                    <Check className="h-5 w-5 text-white stroke-[3] animate-in zoom-in-75 duration-200" />
                  ) : isActive ? (
                    <div className="flex items-center justify-center relative">
                      <IconComponent className="h-5 w-5 animate-pulse" strokeWidth={2.5} style={{ color }} />
                      <span className="absolute -top-1.5 -right-1.5 flex h-2.5 w-2.5">
                        <span
                          className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                          style={{ backgroundColor: color }}
                        />
                        <span
                          className="relative inline-flex rounded-full h-2.5 w-2.5 shadow-xs"
                          style={{ backgroundColor: color }}
                        />
                      </span>
                    </div>
                  ) : (
                    <IconComponent className="h-4.5 w-4.5 text-[#94A3B8]" strokeWidth={2} />
                  )}
                </div>

                {/* Step Label */}
                <span
                  className={cn(
                    "text-[12px] leading-tight text-center whitespace-nowrap transition-colors",
                    isActive
                      ? "font-extrabold tracking-tight"
                      : isCompleted
                        ? "font-bold text-[#0F172A]"
                        : "font-semibold text-[#64748B]"
                  )}
                  style={{ color: isActive ? color : undefined }}
                >
                  {label}
                </span>
              </div>

              {/* Connecting Line Between Nodes — Exactly at vertical center (mt-[20px] for 44px node) */}
              {!isLast && (
                <div className="flex-1 mx-2.5 mt-[20px] h-[3.5px] rounded-full bg-[#E2E8F0] overflow-hidden self-start">
                  <div
                    className="h-full rounded-full transition-all duration-500 ease-out relative"
                    style={{
                      backgroundColor: color,
                      width: idx < currentIndex ? "100%" : "0%",
                    }}
                  >
                    {idx < currentIndex && (
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-[shimmer_2s_infinite]" />
                    )}
                  </div>
                </div>
              )}
            </React.Fragment>
          )
        })}
      </div>
    </div>
  )
}
