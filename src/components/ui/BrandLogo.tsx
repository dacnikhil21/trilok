"use client"

import * as React from "react"

interface BrandLogoProps {
  size?: "sm" | "md" | "lg"
  showSubtitle?: boolean
  className?: string
}

export function BrandLogo({ size = "md", showSubtitle = true, className = "" }: BrandLogoProps) {
  const dimensions = React.useMemo(() => {
    switch (size) {
      case "sm": return { height: "h-[30px]", maxW: "max-w-[170px]" }
      case "lg": return { height: "h-[46px]", maxW: "max-w-[240px]" }
      default:   return { height: "h-[38px] sm:h-[42px]", maxW: "max-w-[210px] sm:max-w-[230px]" }
    }
  }, [size])

  return (
    <div className={`flex items-center shrink-0 select-none ${className}`}>
      {/* ── Exact Uploaded Image Asset (Trimmed 1014x187) ────────────────────── */}
      <img
        src="/exact_logo.png"
        onError={(e) => { (e.target as HTMLImageElement).src = "/app_logo.png"; }}
        alt="eSaleAgreement Logo"
        className={`object-contain ${dimensions.height} ${dimensions.maxW} w-auto`}
      />
    </div>
  )
}
