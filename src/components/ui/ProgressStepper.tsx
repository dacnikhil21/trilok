"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Store, ShieldCheck, FileText, Edit3, Check, User } from "lucide-react"
import { cn } from "@/lib/utils"

export type StepIconItem = {
  label: string
  icon: React.ElementType
}

const DEFAULT_STEP_CONFIGS: StepIconItem[] = [
  { label: "Business Reg", icon: Store },
  { label: "Verified Tag", icon: ShieldCheck },
  { label: "Agreement", icon: FileText },
  { label: "Customer eSign", icon: Edit3 },
  { label: "Completed", icon: ShieldCheck },
]

interface ProgressStepperProps {
  currentStep: number
  totalSteps?: number
  steps?: (string | StepIconItem)[]
  className?: string
  moduleType?: "c2c" | "b2c"
}

export function ProgressStepper({
  currentStep,
  totalSteps = 5,
  steps: customSteps,
  className = "",
  moduleType = "b2c"
}: ProgressStepperProps) {
  const stepsConfig: StepIconItem[] = React.useMemo(() => {
    if (customSteps && customSteps.length > 0) {
      return customSteps.map((item, idx) => {
        if (typeof item === "string") {
          const fallbackIcon = DEFAULT_STEP_CONFIGS[idx]?.icon || Store
          return { label: item, icon: fallbackIcon }
        }
        return item
      })
    }
    if (moduleType === "c2c") {
      return [
        { label: "Personal Reg", icon: User },
        { label: "eKYC Verified", icon: ShieldCheck },
        { label: "Agreement", icon: FileText },
        { label: "eSign", icon: Edit3 },
        { label: "Completed", icon: ShieldCheck },
      ]
    }
    return DEFAULT_STEP_CONFIGS
  }, [customSteps, moduleType])

  return (
    <div className={cn("w-full py-1", className)}>
      {/* Step Nodes Row */}
      <div className="flex items-start justify-between w-full relative px-0.5">
        {/* Background Line Connecting Nodes */}
        <div className="absolute left-5 right-5 top-4.5 -translate-y-1/2 h-[2.5px] bg-slate-200/90 z-0 rounded-full overflow-hidden">
          <motion.div
            initial={false}
            animate={{ width: `${Math.min(100, (currentStep / (stepsConfig.length - 1)) * 100)}%` }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="h-full bg-gradient-to-r from-[#0052CC] via-[#0077B6] to-[#10B981] rounded-full"
          />
        </div>

        {stepsConfig.map((item, idx) => {
          const Icon = item.icon
          const isCompleted = idx < currentStep
          const isActive = idx === currentStep

          return (
            <div key={idx} className="flex-1 min-w-0 flex flex-col items-center relative z-10 text-center px-0.5">
              {/* Square-Shaped Node Container */}
              <motion.div
                initial={false}
                animate={{
                  scale: isActive ? 1.06 : 1,
                }}
                transition={{ duration: 0.2 }}
                className={cn(
                  "w-9 h-9 sm:w-10 sm:h-10 rounded-[12px] sm:rounded-[14px] border flex items-center justify-center transition-all mx-auto shadow-2xs shrink-0",
                  isCompleted
                    ? "bg-[#10B981] border-[#10B981] text-white shadow-xs"
                    : isActive
                    ? "bg-white border-2 border-[#0052CC] text-[#0052CC] ring-4 ring-[#0052CC]/15 shadow-sm"
                    : "bg-white border-slate-200/90 text-slate-400 hover:border-slate-300"
                )}
              >
                {isCompleted ? (
                  <Check className="w-4 h-4 text-white" strokeWidth={3} />
                ) : (
                  <Icon className={cn("w-4 h-4 stroke-[2.2]", isActive ? "text-[#0052CC]" : "text-slate-400")} />
                )}
              </motion.div>

              {/* Step Label (Clean 2-line auto-wrap, no truncation) */}
              <span className={cn(
                "text-[9.5px] sm:text-[10px] font-bold mt-1 leading-[1.15] text-center w-full min-h-[24px] flex items-center justify-center tracking-tighter sm:tracking-normal",
                isActive ? "text-[#0052CC] font-extrabold" : isCompleted ? "text-[#10B981]" : "text-slate-500 font-medium"
              )}>
                {item.label}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
