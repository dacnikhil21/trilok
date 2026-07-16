"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Check } from "lucide-react"

const STEP_LABELS = ["Register", "Verify", "Consent", "Access", "Audit"]

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
        <div className="absolute left-6 right-6 top-[13px] h-[2px] bg-border -z-10 rounded-full overflow-hidden">
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
            <div key={idx} className="flex flex-col items-center z-10 shrink-0 w-12">
              {/* Node Dot */}
              <motion.div
                initial={false}
                animate={{
                  scale: isActive ? 1.15 : 1,
                  backgroundColor: isCompleted
                    ? "#0A5C36"
                    : isActive
                    ? "#0A5C36"
                    : "#FFFFFF",
                  borderColor: isCompleted || isActive ? "#0A5C36" : "rgba(26,29,31,0.22)",
                }}
                className="w-7 h-7 rounded-full border-2 flex items-center justify-center shadow-sm bg-surface"
              >
                {isCompleted ? (
                  <Check strokeWidth={3.8} className="w-3.5 h-3.5 text-white" />
                ) : isActive ? (
                  <motion.span
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
                    className="w-2 h-2 rounded-full bg-white"
                  />
                ) : (
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary-text/30" />
                )}
              </motion.div>
              {/* Label */}
              <span
                className={`text-[9px] font-bold mt-1.5 tracking-wider uppercase text-center transition-colors duration-300 ${
                  isCompleted || isActive ? "text-primary" : "text-secondary-text/50"
                }`}
              >
                {STEP_LABELS[idx]}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
