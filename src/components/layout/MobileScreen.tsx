import * as React from "react"
import { cn } from "@/lib/utils"

interface MobileScreenProps {
  children: React.ReactNode
  className?: string
}

/** Canonical full-bleed mobile app shell. Scroll happens inside children, not on body. */
export function MobileScreen({ children, className }: MobileScreenProps) {
  return (
    <div className={cn("mobile-app-shell", className)}>
      {children}
    </div>
  )
}
