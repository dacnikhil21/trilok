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
      case "lg": return { height: "h-[50px] sm:h-[54px]", maxW: "max-w-[250px] sm:max-w-[270px]" }
      default:   return { height: "h-[40px] sm:h-[44px]", maxW: "max-w-[215px] sm:max-w-[235px]" }
    }
  }, [size])

  return (
    <div className={`flex items-center justify-center shrink-0 select-none ${className}`}>
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
