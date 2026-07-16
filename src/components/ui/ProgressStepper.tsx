"use client"

import * as React from "react"

interface ProgressStepperProps {
  currentStep: number
  totalSteps: number
  className?: string
}

export function ProgressStepper({ currentStep, totalSteps, className = "" }: ProgressStepperProps) {
  return (
    <div className={`flex items-center gap-1.5 w-full ${className}`}>
      {Array.from({ length: totalSteps }).map((_, idx) => {
        const isFilled = idx <= currentStep
        
        return (
          <div
            key={idx}
            className={`h-[3px] flex-1 rounded-full transition-all duration-500 ease-out ${
              isFilled ? "bg-primary" : "bg-divider"
            }`}
          />
        )
      })}
    </div>
  );
}
