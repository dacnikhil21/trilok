"use client"

import * as React from "react"

interface ProgressStepperProps {
  currentStep: number
  totalSteps: number
  className?: string
}

export function ProgressStepper({ currentStep, totalSteps, className = "" }: ProgressStepperProps) {
  return (
    <div className={`flex items-center gap-2 mb-8 bg-divider p-1.5 rounded-[var(--radius-sm)] ${className}`}>
      {Array.from({ length: totalSteps }).map((_, idx) => {
        const isActive = idx === currentStep
        const isCompleted = idx < currentStep
        
        return (
          <div
            key={idx}
            className={`h-2 flex-1 rounded-full transition-all duration-300 ${
              isActive ? "bg-primary" : isCompleted ? "bg-primary/20" : "bg-border/60"
            }`}
          />
        )
      })}
    </div>
  )
}
