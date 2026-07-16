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
    <div className={`space-y-3 mb-5 ${className}`}>
      {showLogo && (
        <div className="flex flex-col items-center justify-center space-y-1.5 mb-4">
          <div className="w-9 h-9 rounded-full bg-primary/8 flex items-center justify-center border border-primary/10 shadow-[var(--shadow-level-1)]">
            <ShieldCheck strokeWidth={2.2} className="h-5 w-5 text-primary" />
          </div>
          <div className="flex flex-col items-center">
            <span className="text-[18px] font-display font-bold tracking-tight text-foreground leading-none">
              Trilok
            </span>
            <span className="text-[9px] font-bold tracking-widest uppercase text-secondary-text mt-1">
              Secure • Verified • Trusted
            </span>
          </div>
        </div>
      )}

      {(title || subtitle) && (
        <div className="space-y-1.5">
          {title && (
            <h2 className="text-[23px] font-display font-bold leading-tight text-foreground tracking-tight">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="text-[13.5px] text-secondary-text leading-snug font-medium">
              {subtitle}
            </p>
          )}
        </div>
      )}
    </div>
  )
}
