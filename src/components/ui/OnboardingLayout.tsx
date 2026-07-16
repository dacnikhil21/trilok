"use client"

import * as React from "react"
import { ShieldCheck } from "lucide-react"

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
  onBackClick
}: OnboardingLayoutProps) {
  return (
    <div className="flex flex-col flex-1 w-full max-w-[420px] mx-auto min-h-screen px-5 pt-3 pb-8 justify-between">
      {/* 1. Status Bar area */}
      <div className="h-6 flex items-center justify-between w-full text-[12.5px] text-secondary-text/45 font-bold tracking-wider px-1">
        <span>10:11 AM</span>
        <div className="flex items-center gap-1.5">
          <span>5G</span>
          <div className="w-5 h-2.5 rounded-sm border border-secondary-text/35 flex items-center p-0.5">
            <div className="w-3.5 h-full bg-secondary-text/65 rounded-[1px]" />
          </div>
        </div>
      </div>

      {/* 32px Gap */}
      <div className="h-8" />

      {/* 2. Trilok Brand Area */}
      <div className="relative flex flex-col items-center justify-center">
        {showBackButton && onBackClick && (
          <button 
            type="button"
            onClick={onBackClick}
            className="absolute left-1 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full border border-border flex items-center justify-center text-secondary-text hover:text-foreground active:scale-95 transition-all"
            aria-label="Go Back"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/></svg>
          </button>
        )}
        <div className="flex flex-col items-center justify-center gap-1">
          <div className="w-10 h-10 rounded-full bg-primary/8 flex items-center justify-center border border-primary/10 shadow-sm">
            <ShieldCheck strokeWidth={2.4} className="h-5.5 w-5.5 text-primary" />
          </div>
          <div className="flex flex-col items-center gap-0.5">
            <span className="text-[19px] font-display font-bold tracking-tight text-foreground leading-none">
              Trilok
            </span>
            <span className="text-[8.5px] font-bold tracking-[0.18em] uppercase text-secondary-text leading-none mt-1">
              SECURE • VERIFIED • TRUSTED
            </span>
          </div>
        </div>
      </div>

      {/* 24px Gap */}
      <div className="h-6" />

      {/* 3. Page Heading */}
      <div className="text-center space-y-1 px-2">
        <h1 className="text-[23px] font-display font-bold leading-tight text-foreground tracking-tight">
          {title}
        </h1>
        <p className="text-[13px] text-secondary-text leading-snug font-medium max-w-[320px] mx-auto">
          {subtitle}
        </p>
      </div>

      {/* 24px Gap */}
      <div className="h-6" />

      {/* 4. Primary Content Card */}
      <div className="bg-surface border border-border/40 rounded-[16px] p-5 shadow-[0_6px_24px_rgba(0,0,0,0.02)] space-y-4">
        {cardContent}
      </div>

      {/* 24px Gap */}
      <div className="h-6" />

      {/* 5. Primary Button */}
      <div className="w-full">
        <button
          type="button"
          onClick={onButtonClick}
          disabled={isButtonDisabled || isButtonLoading}
          className="w-full h-[56px] rounded-[16px] bg-primary text-surface font-semibold text-[16px] transition-all active:scale-[0.98] shadow-[0_4px_14px_rgba(10,92,54,0.18)] hover:bg-[#084D2D] disabled:pointer-events-none disabled:bg-[#EFEFEF] disabled:text-[#A0A5AA] flex items-center justify-center"
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
        <div className="mt-4 text-center">
          {bottomHelperText}
        </div>
      )}

      {/* Bottom Safe Area */}
      <div className="h-8 flex-1 min-h-[32px]" />
    </div>
  )
}
