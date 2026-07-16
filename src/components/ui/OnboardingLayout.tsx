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
    <div className="flex flex-col flex-1 w-full max-w-[420px] mx-auto justify-between space-y-6">

      {/* 2. Top Navigation Bar (Header) */}
      <div className="w-full flex items-center justify-between h-12 relative px-1 shrink-0">
        {showBackButton && onBackClick ? (
          <button 
            type="button"
            onClick={onBackClick}
            className="w-10 h-10 rounded-full border border-border bg-surface flex items-center justify-center text-secondary-text hover:text-foreground active:scale-95 transition-all shadow-sm z-10 shrink-0"
            aria-label="Go Back"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/></svg>
          </button>
        ) : (
          <div className="w-10 h-10" />
        )}

        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="flex items-center gap-1.5 bg-primary/6 border border-primary/10 px-3.5 py-1.5 rounded-full shadow-sm">
            <ShieldCheck strokeWidth={2.4} className="h-4.5 w-4.5 text-primary" />
            <span className="text-[15.5px] font-display font-bold tracking-tight text-foreground leading-none">
              Trilok
            </span>
          </div>
        </div>

        <div className="w-10 h-10" />
      </div>

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
