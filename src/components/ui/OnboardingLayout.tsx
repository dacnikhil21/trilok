"use client"

import * as React from "react"
import { ProgressStepper, StepIconItem } from "@/components/ui/ProgressStepper"
import { BrandLogo } from "@/components/ui/BrandLogo"
import { ArrowRight } from "lucide-react"

interface OnboardingLayoutProps {
  title: string
  subtitle?: string
  cardContent: React.ReactNode
  buttonText: string
  onButtonClick: () => void
  isButtonDisabled?: boolean
  isButtonLoading?: boolean
  bottomHelperText?: React.ReactNode
  showBackButton?: boolean
  onBackClick?: () => void
  stepperStep?: number
  stepperSteps?: (string | StepIconItem)[]
  moduleType?: "c2c" | "b2c"
}

import { MobileAppShell } from "@/components/ui/MobileAppShell"

export function OnboardingLayout({
  title,
  subtitle,
  cardContent,
  buttonText,
  onButtonClick,
  isButtonDisabled = false,
  isButtonLoading = false,
  bottomHelperText,
  showBackButton = false,
  onBackClick,
  stepperStep,
  stepperSteps,
  moduleType
}: OnboardingLayoutProps) {
  const headerContent = (
    <div className="w-full flex items-center justify-between h-[52px] sm:h-[56px] relative px-0.5">
      {onBackClick ? (
        <button 
          type="button"
          onClick={onBackClick}
          className="w-9.5 h-9.5 rounded-full bg-slate-100/90 hover:bg-slate-200/90 flex items-center justify-center text-slate-700 active:scale-95 transition-all z-20 shrink-0 border border-slate-200/80 shadow-2xs"
          aria-label="Go Back"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/></svg>
        </button>
      ) : <div className="w-9.5 h-9.5" />}

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <BrandLogo size="md" />
      </div>

      <div className="w-9.5 h-9.5" />
    </div>
  )

  const footerContent = (
    <div className="w-full space-y-3 pb-1">
      <button
        type="button"
        onClick={onButtonClick}
        disabled={isButtonDisabled || isButtonLoading}
        className="w-full h-[52px] rounded-full bg-gradient-to-r from-[#0052CC] via-[#0077B6] to-[#10B981] text-white font-bold text-[15.5px] flex items-center justify-center gap-2 transition-all shadow-[0_6px_20px_rgba(0,82,204,0.35)] active:scale-[0.985] hover:opacity-95 disabled:opacity-75 disabled:cursor-not-allowed"
      >
        {isButtonLoading ? (
          <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
        ) : (
          <>
            <span className="tracking-wide font-extrabold text-[15.5px] text-white drop-shadow-xs">{buttonText}</span>
            <ArrowRight className="w-5 h-5 text-white shrink-0 stroke-[2.5]" />
          </>
        )}
      </button>

      {bottomHelperText && (
        <div className="text-center text-[12px] text-slate-600 font-medium">
          {bottomHelperText}
        </div>
      )}

      <div className="w-full flex items-center justify-between text-[11.5px] text-slate-600 pt-0.5 pb-0.5 px-1">
        <div className="flex items-center gap-1.5 font-medium">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#0052CC]"><path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/></svg>
          <span>Need help?</span>
        </div>
        <button type="button" className="text-[#0052CC] font-bold hover:underline flex items-center gap-0.5">
          <span>Contact Support</span>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
        </button>
      </div>
    </div>
  )

  return (
    <MobileAppShell header={headerContent} footer={footerContent}>
      <div className="w-full flex flex-col space-y-3.5 pt-1">
        {/* Page Heading & Subtitle */}
        <div className="text-center space-y-0.5 pt-0.5">
          <h1 className="text-[20px] font-extrabold text-[#0F172A] tracking-tight leading-tight">
            {title}
          </h1>
          {subtitle && (
            <p className="text-[12px] text-slate-600 font-medium leading-snug max-w-[320px] mx-auto">
              {subtitle}
            </p>
          )}
        </div>

        {/* Progress Stepper directly below title with Square Icons */}
        {stepperStep !== undefined && (
          <div className="w-full px-0.5 pt-0.5">
            <ProgressStepper currentStep={stepperStep} totalSteps={5} steps={stepperSteps} moduleType={moduleType} />
          </div>
        )}

        {/* Primary Content Card */}
        <div className="w-full bg-white border border-slate-200/90 rounded-[20px] p-4 sm:p-5 shadow-md">
          {cardContent}
        </div>
      </div>
    </MobileAppShell>
  )
}
