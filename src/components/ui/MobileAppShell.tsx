"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface MobileAppShellProps {
  children: React.ReactNode
  header?: React.ReactNode
  footer?: React.ReactNode
  className?: string
  contentClassName?: string
  hasFloatingNav?: boolean
}

export function MobileAppShell({
  children,
  header,
  footer,
  className = "",
  contentClassName = "",
  hasFloatingNav = false,
}: MobileAppShellProps) {
  return (
    <div className="min-h-[100dvh] w-full bg-[#FAFCFF] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-teal-100/30 via-blue-50/15 to-transparent flex flex-col items-center justify-between font-sans select-none overflow-hidden">
      
      {/* ── Native Mobile App Frame Shell (Content-Driven 430px Container) ─────────────── */}
      <div className={cn(
        "w-full max-w-[430px] flex flex-col flex-1 min-h-[100dvh] justify-between relative bg-white sm:bg-white/90 sm:backdrop-blur-sm sm:shadow-xl sm:border-x sm:border-slate-200/80 overflow-hidden mx-auto",
        className
      )}>
        
        {/* Header Bar Slot */}
        {header && (
          <header className="w-full shrink-0 z-30 pt-[max(8px,env(safe-area-inset-top))] px-4 bg-white/95 backdrop-blur-md border-b border-slate-100">
            {header}
          </header>
        )}

        {/* Scrollable Main Content Body Area */}
        <main className={cn(
          "w-full flex-1 overflow-y-auto no-scrollbar px-4 py-3 space-y-3.5",
          hasFloatingNav ? "safe-nav-padding" : "safe-bottom-padding",
          contentClassName
        )}>
          {children}
        </main>

        {/* Action / Sticky Footer Slot */}
        {footer && (
          <footer className="w-full shrink-0 z-30 pb-[max(16px,env(safe-area-inset-bottom))] px-4 pt-2 bg-white/95 backdrop-blur-md border-t border-slate-100">
            {footer}
          </footer>
        )}

      </div>
    </div>
  )
}
