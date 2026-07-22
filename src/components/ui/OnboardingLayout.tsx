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
    <div className="w-full flex flex-col h-full bg-surface pt-2 pb-2">

      {/* Top Navigation Bar (Header) */}
      <div className="w-full flex items-center justify-between h-12 relative px-4 mb-4 shrink-0">
        {showBackButton && onBackClick ? (
          <button 
            type="button"
            onClick={onBackClick}
            className="absolute left-2 top-0 w-10 h-10 rounded-full bg-[#F7F9FB] flex items-center justify-center text-primary-text hover:text-foreground active:scale-95 transition-all shadow-sm z-20 shrink-0"
            aria-label="Go Back"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/></svg>
          </button>
        ) : null}

        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <BrandLogo size="sm" />
        </div>
      </div>

      {/* Page Heading */}
      <div className="text-center px-4 mb-4">
        <h1 className="text-[24px] font-bold text-primary mb-1 tracking-tight">
          {title}
        </h1>
        <p className="text-[14px] text-secondary-text font-medium">
          {subtitle}
        </p>
      </div>

      {/* Progress Stepper directly below title/subtitle */}
      {stepperStep !== undefined && (
        <div className="w-full px-6 mb-4 shrink-0">
          <ProgressStepper currentStep={stepperStep} totalSteps={5} />
        </div>
      )}

      {/* Primary Content Card (No border, just part of layout) */}
      <div className="px-4 mb-6">
        {cardContent}
      </div>

      <div className="flex-1" />

      {/* Primary Button */}
      <div className="w-full px-4 mb-4">
        <button
          type="button"
          onClick={onButtonClick}
          disabled={isButtonDisabled || isButtonLoading}
          className="w-full rounded-[14px] h-[52px] bg-primary text-surface font-semibold tracking-wide text-[16px] transition-all active:scale-[0.98] hover:opacity-90 disabled:pointer-events-none disabled:bg-[#EFEFEF] disabled:text-[#A0A5AA] flex items-center justify-center"
        >
          {isButtonLoading ? (
            <span className="h-5 w-5 animate-spin rounded-full border-2 border-surface border-t-transparent" />
          ) : (
            buttonText
          )}
        </button>
      </div>

      {/* Bottom Helper Text */}
      {bottomHelperText && (
        <div className="mt-2 text-center text-[13px] text-secondary-text font-medium mb-4 px-4">
          {bottomHelperText}
        </div>
      )}

    </div>
  )
}
