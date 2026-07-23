"use client"

import * as React from "react"
import { ProgressStepper } from "@/components/ui/ProgressStepper"
import { BrandLogo } from "@/components/ui/BrandLogo"
import { ArrowRight } from "lucide-react"

interface OnboardingLayoutProps {
  title: string
  subtitle: string
  cardContent: React.ReactNode
  buttonText: string
  onButtonClick: () => void
  isButtonDisabled?: boolean
  isButtonLoading?: boolean
  bottomHelperText?: React.ReactNode
  showBackButton?: boolean
  onBackClick?: () => void
  stepperStep?: number
}

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
  stepperStep
}: OnboardingLayoutProps) {
  return (
    <div className="w-full bg-[#FAFCFF] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-teal-100/40 via-blue-50/20 to-transparent flex flex-col items-center justify-start min-h-screen sm:min-h-0 py-3.5 px-3.5 pb-[calc(24px+env(safe-area-inset-bottom,0px))] box-border select-none font-sans overflow-y-auto">
      
      {/* ── Material Design 3 Centered Content Stack (8-Point System) ───────────────── */}
      <div className="w-full max-w-[390px] flex flex-col space-y-3.5 my-auto sm:my-0">

        {/* Top Navigation Bar (Header) */}
        <div className="w-full flex items-center justify-between h-11 relative border-b border-slate-200/70 pb-2">
          {showBackButton && onBackClick ? (
            <button 
              type="button"
              onClick={onBackClick}
              className="w-9 h-9 rounded-full bg-slate-100/90 hover:bg-slate-200/90 flex items-center justify-center text-slate-700 active:scale-95 transition-all z-20 shrink-0"
              aria-label="Go Back"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/></svg>
            </button>
          ) : <div className="w-9 h-9" />}

          <div className="flex items-center justify-center">
            <BrandLogo size="sm" />
          </div>

          <div className="w-9 h-9" />
        </div>

        {/* Page Heading */}
        <div className="text-center space-y-0.5 pt-0.5">
          <h1 className="text-[21px] font-extrabold text-[#0F172A] tracking-tight leading-tight">
            {title}
          </h1>
          <p className="text-[12.5px] text-slate-700 font-medium leading-snug max-w-[300px] mx-auto">
            {subtitle}
          </p>
        </div>

        {/* Progress Stepper directly below title/subtitle */}
        {stepperStep !== undefined && (
          <div className="w-full px-2 pt-0.5">
            <ProgressStepper currentStep={stepperStep} totalSteps={5} />
          </div>
        )}

        {/* Primary Content Card */}
        <div className="w-full bg-white/95 backdrop-blur-xs border border-slate-200/90 rounded-[18px] p-3.5 shadow-2xs">
          {cardContent}
        </div>

        {/* Primary Action Button (52px Gradient Send/Continue Button) */}
        <div className="w-full">
          <button
            type="button"
            onClick={onButtonClick}
            disabled={isButtonDisabled || isButtonLoading}
            className="w-full h-[52px] rounded-[18px] bg-gradient-to-r from-[#0052CC] via-[#0077B6] to-[#10B981] text-white font-bold text-[15.5px] flex items-center justify-center gap-2 transition-all shadow-[0_6px_20px_rgba(0,82,204,0.35)] active:scale-[0.985] hover:opacity-95 disabled:opacity-75 disabled:cursor-not-allowed"
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
        </div>

        {/* Bottom Helper Text */}
        {bottomHelperText && (
          <div className="text-center text-[12px] text-slate-600 font-medium">
            {bottomHelperText}
          </div>
        )}

      </div>
    </div>
  )
}
