"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Check } from "lucide-react"

interface ProgressStepperProps {
  currentStep: number
  totalSteps: number
  className?: string
}

export function ProgressStepper({ currentStep, totalSteps, className = "" }: ProgressStepperProps) {
  const steps = Array.from({ length: totalSteps })

  return (
    <div className={`w-full ${className}`}>
      {/* Node row */}
      <div className="flex items-center justify-between w-full relative px-2">
        {/* Background line that goes across the entire row behind the dots */}
        <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-[2px] bg-border z-0 rounded-full overflow-hidden">
          <motion.div
            initial={false}
            animate={{ width: `${(currentStep / (totalSteps - 1)) * 100}%` }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="h-full bg-primary rounded-full"
          />
        </div>

        {steps.map((_, idx) => {
          const isCompleted = idx < currentStep
          const isActive = idx === currentStep
          const isPending = idx > currentStep

          return (
            <div key={idx} className="flex flex-col items-center relative z-10 shrink-0 w-8 h-8">
              {/* Node Circle */}
              <motion.div
                initial={false}
                animate={{
                  backgroundColor: isCompleted
                    ? "var(--color-primary)"
                    : isActive
                    ? "var(--color-primary)"
                    : "#FFFFFF",
                  borderColor: isCompleted || isActive ? "var(--color-primary)" : "var(--color-border)",
                  color: isCompleted || isActive ? "#FFFFFF" : "var(--color-primary)",
                }}
                className="w-7 h-7 rounded-full border-[1.5px] flex items-center justify-center shadow-sm bg-surface mx-auto"
              >
                {isCompleted ? (
                  <Check strokeWidth={3.8} className="w-4 h-4 text-white" />
                ) : (
                  <span className="text-[12px] font-bold mt-[1px]">
                    {idx + 1}
                  </span>
                )}
              </motion.div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

