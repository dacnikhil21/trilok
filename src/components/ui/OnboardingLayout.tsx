"use client"

import * as React from "react"
import { ProgressStepper } from "@/components/ui/ProgressStepper"
import { BrandLogo } from "@/components/ui/BrandLogo"

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
    <div className="w-full bg-[#FAFCFF] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-teal-100/40 via-blue-50/20 to-transparent flex flex-col items-center justify-start min-h-screen sm:min-h-0 py-4 px-4 pb-[calc(16px+env(safe-area-inset-bottom,0px))] box-border select-none font-sans overflow-y-auto">
      
      {/* ── Material Design 3 Centered Content Stack (8-Point System) ───────────────── */}
      <div className="w-full max-w-[390px] flex flex-col space-y-4 my-auto sm:my-0">

        {/* Top Navigation Bar (Header) */}
        <div className="w-full flex items-center justify-between h-11 relative border-b border-slate-200/70 pb-2">
          {showBackButton && onBackClick ? (
            <button 
              type="button"
              onClick={onBackClick}
              className="w-9 h-9 rounded-full bg-slate-100/80 hover:bg-slate-200/80 flex items-center justify-center text-slate-700 active:scale-95 transition-all z-20 shrink-0"
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
        <div className="text-center space-y-1 pt-1">
          <h1 className="text-[22px] font-extrabold text-[#0F172A] tracking-tight leading-tight">
            {title}
          </h1>
          <p className="text-[12.5px] text-slate-500 font-medium leading-snug max-w-[300px] mx-auto">
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
        <div className="w-full bg-white/90 backdrop-blur-xs border border-slate-200/80 rounded-[20px] p-3.5 shadow-2xs">
          {cardContent}
        </div>

        {/* Primary Action Button (Gradient Send/Continue Button) */}
        <div className="w-full">
          <button
            type="button"
            onClick={onButtonClick}
            disabled={isButtonDisabled || isButtonLoading}
            className="w-full h-[48px] rounded-[16px] bg-gradient-to-r from-[#0052CC] to-[#10B981] text-white font-bold text-[15px] flex items-center justify-center gap-2 transition-all shadow-[0_4px_16px_rgba(0,82,204,0.22)] active:scale-[0.985] hover:opacity-95 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isButtonLoading ? (
              <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
            ) : (
              <span>{buttonText}</span>
            )}
          </button>
        </div>

        {/* Bottom Helper Text */}
        {bottomHelperText && (
          <div className="text-center text-[12px] text-slate-500 font-medium">
            {bottomHelperText}
          </div>
        )}

      </div>
    </div>
  )
}
