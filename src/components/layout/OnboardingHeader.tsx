"use client"

import * as React from "react"
import { ArrowLeft } from "lucide-react"
import { BrandLogo } from "@/components/ui/BrandLogo"
import { AppHeaderBar } from "@/components/layout/AppHeaderBar"
import { cn } from "@/lib/utils"

interface OnboardingHeaderProps {
  onBack?: () => void
  title?: string
  className?: string
}

/** Shared onboarding header — back + official logo or screen title. */
export function OnboardingHeader({ onBack, title, className }: OnboardingHeaderProps) {
  return (
    <AppHeaderBar>
      <div className={cn("relative flex h-[68px] w-full items-center justify-between px-0.5", className)}>
        {onBack ? (
          <button
            type="button"
            onClick={onBack}
            className="z-20 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#E2E8F0] bg-[#F8FAFC] text-[#334155] transition-all active:scale-95"
            aria-label="Go back"
          >
            <ArrowLeft className="h-[20px] w-[20px]" strokeWidth={2.5} />
          </button>
        ) : (
          <div className="h-10 w-10 shrink-0" aria-hidden="true" />
        )}

        <div className="pointer-events-none absolute inset-0 flex items-center justify-center px-8 sm:px-9">
          {title ? (
            <span className="truncate text-[17px] font-bold tracking-tight text-[#0F172A]">{title}</span>
          ) : (
            <BrandLogo variant="headerCompact" />
          )}
        </div>

        <div className="h-10 w-10 shrink-0" aria-hidden="true" />
      </div>
    </AppHeaderBar>
  )
}
