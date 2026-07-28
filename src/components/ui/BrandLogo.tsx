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
      case "sm": return { height: "h-[34px]", maxW: "max-w-[190px]" }
      case "lg": return { height: "h-[56px] sm:h-[60px]", maxW: "max-w-[270px] sm:max-w-[290px]" }
      default:   return { height: "h-[46px] sm:h-[50px]", maxW: "max-w-[235px] sm:max-w-[255px]" }
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
