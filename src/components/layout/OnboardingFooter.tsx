"use client"

import * as React from "react"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface OnboardingFooterProps {
  buttonText: string
  onButtonClick: () => void
  isButtonDisabled?: boolean
  isButtonLoading?: boolean
  bottomHelperText?: React.ReactNode
  showSupportRow?: boolean
  className?: string
}

/** Shared onboarding footer — gradient CTA + optional help row. */
export function OnboardingFooter({
  buttonText,
  onButtonClick,
  isButtonDisabled = false,
  isButtonLoading = false,
  bottomHelperText,
  showSupportRow = true,
  className,
}: OnboardingFooterProps) {
  return (
    <div className={cn("w-full space-y-3", className)}>
      <button
        type="button"
        onClick={onButtonClick}
        disabled={isButtonDisabled || isButtonLoading}
        className="flex h-[52px] w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#0052CC] via-[#0077B6] to-[#10B981] text-[15.5px] font-bold text-white shadow-[0_6px_20px_rgba(0,82,204,0.35)] transition-all active:scale-[0.985] hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-75"
      >
        {isButtonLoading ? (
          <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
        ) : (
          <>
            <span className="text-[15.5px] font-extrabold tracking-wide text-white drop-shadow-xs">
              {buttonText}
            </span>
            <ArrowRight className="h-5 w-5 shrink-0 stroke-[2.5] text-white" />
          </>
        )}
      </button>

      {bottomHelperText ? (
        <div className="text-center text-[12px] font-medium text-slate-600">{bottomHelperText}</div>
      ) : null}

      {showSupportRow ? (
        <div className="flex w-full items-center justify-between px-1 pb-0.5 pt-0.5 text-[11.5px] text-slate-600">
          <div className="flex items-center gap-1.5 font-medium">
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-[#0052CC]"
            >
              <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
              <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
            </svg>
            <span>Need help?</span>
          </div>
          <button type="button" className="flex items-center gap-0.5 font-bold text-[#0052CC] hover:underline">
            <span>Contact Support</span>
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      ) : null}
    </div>
  )
}
