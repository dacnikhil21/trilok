"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface MobileAppShellProps {
  children: React.ReactNode
  header?: React.ReactNode
  footer?: React.ReactNode
  bottomBar?: React.ReactNode
  className?: string
  contentClassName?: string
  /** @deprecated Prefer bottomBar prop */
  hasFloatingNav?: boolean
}

export function MobileAppShell({
  children,
  header,
  footer,
  bottomBar,
  className = "",
  contentClassName = "",
  hasFloatingNav = false,
}: MobileAppShellProps) {
  return (
    <div className={cn("mobile-app-shell", className)}>
      {header && (
        <header className="w-full shrink-0 border-b border-slate-100 bg-white/95 px-4 pt-[max(8px,env(safe-area-inset-top))] backdrop-blur-md">
          {header}
        </header>
      )}

      <main
        className={cn(
          "w-full flex-1 overflow-y-auto overflow-x-hidden px-4 py-3 no-scrollbar",
          !bottomBar && !footer && "safe-bottom-padding",
          contentClassName
        )}
      >
        {children}
      </main>

      {footer && (
        <footer className="w-full shrink-0 border-t border-slate-100 bg-white/95 px-4 pb-[max(16px,env(safe-area-inset-bottom))] pt-2 backdrop-blur-md">
          {footer}
        </footer>
      )}

      {bottomBar && (
        <div className="w-full shrink-0 bg-white">{bottomBar}</div>
      )}
    </div>
  )
}
