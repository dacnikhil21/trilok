"use client"

import * as React from "react"
import { ShieldCheck, ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"

interface PageHeaderProps {
  title?: string
  subtitle?: string
  showLogo?: boolean
  className?: string
  showBackButton?: boolean
}

export function PageHeader({ title, subtitle, showLogo = false, showBackButton = true, className = "" }: PageHeaderProps) {
  const router = useRouter()

  return (
    <div className={`mb-6 ${className}`}>
      {/* Top Bar: Back Button & Pill Logo */}
      <div className="flex items-center justify-between mb-6 h-10">
        {showBackButton ? (
          <button 
            onClick={() => router.back()}
            className="w-10 h-10 flex items-center justify-center rounded-full border border-border bg-surface shadow-sm text-primary hover:bg-primary/5 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" strokeWidth={2.5} />
          </button>
        ) : <div className="w-10" />}

        {showLogo && (
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-primary/10 shadow-sm mx-auto">
            <ShieldCheck strokeWidth={2.5} className="w-4 h-4 text-primary" />
            <span className="text-[15px] font-display font-bold text-primary">
              eSaleAgreement
            </span>
          </div>
        )}

        <div className="w-10" /> {/* Spacer for centering */}
      </div>

      {(title || subtitle) && (
        <div className="space-y-1 text-center flex flex-col items-center">
          {title && (
            <h1 className="text-[24px] font-display font-bold leading-tight text-foreground tracking-tight">
              {title}
            </h1>
          )}
          {subtitle && (
            <p className="text-[14px] text-secondary-text leading-snug font-medium text-center max-w-[280px]">
              {subtitle}
            </p>
          )}
        </div>
      )}
    </div>
  )
}
