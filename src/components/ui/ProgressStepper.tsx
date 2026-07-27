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
  const steps = [
    "Verify Mobile",
    "User Details",
    "Aadhaar eKYC",
    "PAN Verification",
    "Final Setup"
  ]

  return (
    <div className={`w-full ${className}`}>
      {/* Node row */}
      <div className="flex items-start justify-between w-full relative px-1">
        {/* Background line that goes across the entire row behind the dots */}
        <div className="absolute left-6 right-6 top-3.5 -translate-y-1/2 h-[2px] bg-slate-200 z-0 rounded-full overflow-hidden">
          <motion.div
            initial={false}
            animate={{ width: `${(currentStep / (totalSteps - 1)) * 100}%` }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="h-full bg-[#0052CC] rounded-full"
          />
        </div>

        {steps.map((stepLabel, idx) => {
          const isCompleted = idx < currentStep
          const isActive = idx === currentStep

          return (
            <div key={idx} className="flex flex-col items-center relative z-10 shrink-0 w-12 text-center">
              {/* Node Circle */}
              <motion.div
                initial={false}
                animate={{
                  backgroundColor: isCompleted || isActive ? "#0052CC" : "#FFFFFF",
                  borderColor: isCompleted || isActive ? "#0052CC" : "#CBD5E1",
                  color: isCompleted || isActive ? "#FFFFFF" : "#64748B",
                }}
                className={`w-7 h-7 rounded-full border-[1.5px] flex items-center justify-center shadow-2xs mx-auto ${
                  isActive ? "ring-4 ring-[#0052CC]/15" : ""
                }`}
              >
                <span className="text-[11.5px] font-bold mt-[0.5px]">
                  {idx + 1}
                </span>
              </motion.div>

              {/* Step Label */}
              <span className={`text-[10px] font-bold mt-1 tracking-tight truncate w-full ${
                isActive ? "text-[#0052CC]" : isCompleted ? "text-slate-700" : "text-slate-500 font-medium"
              }`}>
                {stepLabel}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

