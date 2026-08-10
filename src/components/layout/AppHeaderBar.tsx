import * as React from "react"
import { cn } from "@/lib/utils"

interface AppHeaderBarProps {
  children: React.ReactNode
  className?: string
}

/** Shared header chrome — visible separator + white bar on all app screens. */
export function AppHeaderBar({ children, className }: AppHeaderBarProps) {
  return (
    <div
      className={cn(
        "w-full shrink-0 border-b border-[#E2E8F0] bg-white shadow-[0_1px_0_rgba(15,23,42,0.04)]",
        className
      )}
    >
      {children}
    </div>
  )
}
