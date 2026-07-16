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
    <div className={`mb-6 ${className}`}>
      {showLogo && (
        // Logo block: tight spacing, centered, no excess bottom margin
        <div className="flex flex-col items-center justify-center gap-1.5 mb-5">
          <div className="w-10 h-10 rounded-full bg-primary/8 flex items-center justify-center border border-primary/10 shadow-[var(--shadow-level-1)]">
            <ShieldCheck strokeWidth={2.2} className="h-5 w-5 text-primary" />
          </div>
          <div className="flex flex-col items-center gap-0.5">
            <span className="text-[19px] font-display font-bold tracking-tight text-foreground leading-none">
              Trilok
            </span>
            <span className="text-[8.5px] font-bold tracking-[0.18em] uppercase text-secondary-text">
              Secure · Verified · Trusted
            </span>
          </div>
        </div>
      )}

      {(title || subtitle) && (
        // Heading block: left-aligned, tight line spacing
        <div className="space-y-1">
          {title && (
            <h1 className="text-[24px] font-display font-bold leading-tight text-foreground tracking-tight">
              {title}
            </h1>
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
