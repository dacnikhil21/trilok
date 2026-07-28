"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Store, ShieldCheck, FileText, Edit3, ArrowRight, Check } from "lucide-react"
import { cn } from "@/lib/utils"

export type B2CStep = {
  id: number
  title: string
  subtitle: string
  icon: React.ElementType
  iconBg: string
  iconColor: string
  borderColor: string
  badgeText?: string
}

export const B2C_STEPS: B2CStep[] = [
  {
    id: 1,
    title: "1. Business Registration",
    subtitle: "Business verifies with Aadhaar & PAN and completes one-time eSign.",
    icon: Store,
    iconBg: "bg-[#EEF2FF]",
    iconColor: "text-[#0052CC]",
    borderColor: "border-[#0052CC]/30",
  },
  {
    id: 2,
    title: "2. Verified Business Tag",
    subtitle: "Business gets Verified Tag and lifetime access to dashboard.",
    icon: ShieldCheck,
    iconBg: "bg-[#ECFDF5]",
    iconColor: "text-[#10B981]",
    borderColor: "border-[#10B981]/40",
    badgeText: "Lifetime Access",
  },
  {
    id: 3,
    title: "3. Create Agreement",
    subtitle: "Enter customer details and agreement information.",
    icon: FileText,
    iconBg: "bg-[#EEF2FF]",
    iconColor: "text-[#0052CC]",
    borderColor: "border-[#0052CC]/30",
  },
  {
    id: 4,
    title: "4. Customer eSign",
    subtitle: "Only customer eSigns the agreement every time.",
    icon: Edit3,
    iconBg: "bg-[#EEF2FF]",
    iconColor: "text-[#0052CC]",
    borderColor: "border-[#0052CC]/30",
  },
  {
    id: 5,
    title: "5. Agreement Completed",
    subtitle: "Agreement is generated, secured and stored with audit trail.",
    icon: ShieldCheck,
    iconBg: "bg-[#ECFDF5]",
    iconColor: "text-[#10B981]",
    borderColor: "border-[#10B981]/40",
  },
]

interface B2CProcessGuideProps {
  currentStep?: number // 1 to 5, optional active step highlighter
  variant?: "horizontal" | "vertical" | "compact"
  title?: string
  className?: string
  onStepClick?: (stepId: number) => void
}

export function B2CProcessGuide({
  currentStep,
  variant = "horizontal",
  title = "How B2C Works",
  className = "",
  onStepClick,
}: B2CProcessGuideProps) {
  if (variant === "compact") {
    return (
      <div className={cn("w-full bg-[#F8FAFC] border border-slate-200/90 rounded-[18px] p-3.5 space-y-3", className)}>
        <div className="flex items-center justify-between">
          <span className="text-[12px] font-extrabold uppercase tracking-wider text-slate-600">
            {title}
          </span>
          <span className="text-[11px] font-bold text-[#0052CC] bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">
            5 Simple Steps
          </span>
        </div>

        <div className="grid grid-cols-5 gap-1.5 pt-1">
          {B2C_STEPS.map((step) => {
            const Icon = step.icon
            const isActive = currentStep === step.id
            const isCompleted = currentStep ? currentStep > step.id : false

            return (
              <div
                key={step.id}
                onClick={() => onStepClick?.(step.id)}
                className={cn(
                  "flex flex-col items-center text-center p-1.5 rounded-xl border transition-all cursor-pointer",
                  isActive
                    ? "bg-white border-[#0052CC] shadow-xs ring-2 ring-[#0052CC]/15"
                    : isCompleted
                    ? "bg-emerald-50/60 border-[#10B981]/30 text-emerald-700"
                    : "bg-white/80 border-slate-200/80 text-slate-600 hover:border-slate-300"
                )}
              >
                <div
                  className={cn(
                    "w-7 h-7 rounded-lg flex items-center justify-center mb-1 shrink-0",
                    isCompleted ? "bg-[#10B981] text-white" : step.iconBg,
                    !isCompleted && step.iconColor
                  )}
                >
                  {isCompleted ? <Check className="w-3.5 h-3.5" strokeWidth={3} /> : <Icon className="w-3.5 h-3.5" />}
                </div>
                <span className="text-[9.5px] font-extrabold line-clamp-1 leading-tight">{step.id}. {step.title.split(". ")[1]}</span>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  return (
    <div className={cn("w-full bg-white border border-slate-200/90 rounded-[22px] p-4 shadow-2xs space-y-3.5 select-none", className)}>
      <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
        <div>
          <h3 className="text-[15px] font-extrabold text-[#0F172A] tracking-tight">{title}</h3>
          <p className="text-[11.5px] font-medium text-slate-500">
            {title.toLowerCase().includes("c2c") ? "Automated C2C Personal Agreement Workflow" : "Automated B2C Shop Agreement Workflow"}
          </p>
        </div>
        <div className="flex items-center gap-1 bg-[#EEF2FF] px-2.5 py-1 rounded-full text-[11px] font-bold text-[#0052CC] border border-blue-100">
          <span>5-Step Process</span>
        </div>
      </div>

      {/* Horizontal Swipeable Process Sequence */}
      <div className="overflow-x-auto no-scrollbar pt-1 pb-1 -mx-1 px-1">
        <div className="flex items-stretch gap-2.5 min-w-max">
          {B2C_STEPS.map((step, idx) => {
            const Icon = step.icon
            const isActive = currentStep === step.id
            const isCompleted = currentStep ? currentStep > step.id : false

            return (
              <React.Fragment key={step.id}>
                <motion.div
                  whileHover={{ y: -2 }}
                  onClick={() => onStepClick?.(step.id)}
                  className={cn(
                    "w-[190px] rounded-[18px] p-3.5 border flex flex-col justify-between transition-all cursor-pointer relative",
                    isActive
                      ? "bg-gradient-to-b from-blue-50/60 to-white border-2 border-[#0052CC] shadow-md"
                      : isCompleted
                      ? "bg-emerald-50/40 border-[#10B981]/40"
                      : "bg-slate-50/70 border-slate-200/80 hover:border-slate-300"
                  )}
                >
                  {/* Step Header Icon Box */}
                  <div className="flex items-start justify-between">
                    <div
                      className={cn(
                        "w-10 h-10 rounded-[14px] flex items-center justify-center shrink-0 border shadow-2xs",
                        isCompleted
                          ? "bg-[#10B981] border-[#10B981] text-white"
                          : `${step.iconBg} ${step.borderColor} ${step.iconColor}`
                      )}
                    >
                      {isCompleted ? (
                        <Check className="w-5 h-5" strokeWidth={3} />
                      ) : (
                        <Icon className="w-5 h-5 stroke-[2.2]" />
                      )}
                    </div>

                    <span
                      className={cn(
                        "text-[10px] font-extrabold px-2 py-0.5 rounded-full border",
                        isActive
                          ? "bg-[#0052CC] text-white border-[#0052CC]"
                          : isCompleted
                          ? "bg-emerald-100 text-emerald-800 border-emerald-200"
                          : "bg-slate-200/80 text-slate-600 border-slate-300/60"
                      )}
                    >
                      Step {step.id}
                    </span>
                  </div>

                  {/* Titles */}
                  <div className="mt-3">
                    <h4 className="text-[13px] font-bold text-[#0F172A] leading-tight">
                      {step.title}
                    </h4>
                    <p className="text-[11px] text-slate-600 font-medium leading-snug mt-1">
                      {step.subtitle}
                    </p>
                  </div>
                </motion.div>

                {/* Arrow Connector */}
                {idx < B2C_STEPS.length - 1 && (
                  <div className="flex items-center justify-center shrink-0 text-slate-300 px-0.5">
                    <ArrowRight className="w-4 h-4 text-slate-400 stroke-[2.5]" />
                  </div>
                )}
              </React.Fragment>
            )
          })}
        </div>
      </div>
    </div>
  )
}
