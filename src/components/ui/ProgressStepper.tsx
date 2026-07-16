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
      <div className="flex items-center w-full">
        {steps.map((_, idx) => {
          const isCompleted = idx < currentStep
          const isActive = idx === currentStep
          const isPending = idx > currentStep

          return (
            <React.Fragment key={idx}>
              {/* Node */}
              <div className="flex flex-col items-center shrink-0">
                <motion.div
                  initial={false}
                  animate={{
                    scale: isActive ? 1.15 : 1,
                    backgroundColor: isCompleted
                      ? "#0A5C36"
                      : isActive
                      ? "#0A5C36"
                      : "transparent",
                    borderColor: isCompleted || isActive ? "#0A5C36" : "rgba(26,29,31,0.12)",
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 28 }}
                  className="w-7 h-7 rounded-full border-2 flex items-center justify-center shadow-sm"
                >
                  {isCompleted ? (
                    <Check strokeWidth={3} className="w-3.5 h-3.5 text-white" />
                  ) : isActive ? (
                    <motion.span
                      animate={{ scale: [1, 1.3, 1] }}
                      transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
                      className="w-2 h-2 rounded-full bg-white"
                    />
                  ) : (
                    <span className="w-1.5 h-1.5 rounded-full bg-[rgba(26,29,31,0.15)]" />
                  )}
                </motion.div>
                {/* Label */}
                <span
                  className={`text-[9px] font-bold mt-1 tracking-wider uppercase transition-colors duration-300 ${
                    isCompleted || isActive ? "text-primary" : "text-secondary-text/50"
                  }`}
                >
                  {STEP_LABELS[idx]}
                </span>
              </div>

              {/* Connector line between nodes */}
              {idx < totalSteps - 1 && (
                <div className="flex-1 h-[2px] mx-1 mb-4 relative overflow-hidden rounded-full bg-border/60">
                  <motion.div
                    initial={false}
                    animate={{ width: idx < currentStep ? "100%" : "0%" }}
                    transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
                    className="absolute inset-y-0 left-0 bg-primary rounded-full"
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
