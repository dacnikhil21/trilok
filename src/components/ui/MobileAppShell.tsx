"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { AppShell, type AppShellProps } from "@/components/layout/AppShell"

interface MobileAppShellProps extends AppShellProps {
  /** @deprecated Prefer bottomBar prop */
  hasFloatingNav?: boolean
}

/** Onboarding shell — delegates to AppShell with horizontal padding on scroll content. */
export function MobileAppShell({
  children,
  header,
  footer,
  bottomBar,
  className = "",
  contentClassName = "",
  hasFloatingNav: _hasFloatingNav = false,
  backgroundClassName = "bg-white",
}: MobileAppShellProps) {
  return (
    <AppShell
      header={header}
      footer={footer ? <div className="px-4 pt-3">{footer}</div> : undefined}
      bottomBar={bottomBar}
      className={className}
      backgroundClassName={backgroundClassName}
      contentClassName={cn("px-4 py-3", contentClassName)}
    >
      {children}
    </AppShell>
  )
}
