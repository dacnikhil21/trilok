"use client"

import * as React from "react"
import { ShieldCheck } from "lucide-react"

interface PageHeaderProps {
  title?: string
  subtitle?: string
  showLogo?: boolean
  className?: string
}

export function PageHeader({ title, subtitle, showLogo = false, className = "" }: PageHeaderProps) {
  return (
    <div className={`space-y-4 mb-8 ${className}`}>
      {showLogo && (
        <div className="flex flex-col items-center justify-center space-y-2 mb-8">
          <div className="w-10 h-10 rounded-full bg-primary/8 flex items-center justify-center border border-primary/10 shadow-[var(--shadow-level-1)]">
            <ShieldCheck strokeWidth={2.2} className="h-5.5 w-5.5 text-primary" />
          </div>
          <div className="flex flex-col items-center">
            <span className="text-[19px] font-display font-bold tracking-tight text-foreground leading-none">
              eSaleAgreement
            </span>
            <span className="text-[9.5px] font-bold tracking-widest uppercase text-secondary-text mt-1.5">
              Secure • Verified • Trusted
            </span>
          </div>
        </div>
      )}

      {(title || subtitle) && (
        <div className="space-y-2">
          {title && (
            <h2 className="text-[28px] font-display font-bold leading-tight text-foreground tracking-tight">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="text-[14.5px] text-secondary-text leading-relaxed font-medium">
              {subtitle}
            </p>
          )}
        </div>
      )}
    </div>
  )
}
