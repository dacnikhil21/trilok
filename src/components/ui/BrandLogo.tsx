"use client"

import * as React from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { brandAssets } from "@/lib/brand-assets"

export type BrandLogoVariant = "header" | "headerCompact" | "splash" | "full"

interface BrandLogoProps {
  variant?: BrandLogoVariant
  /** @deprecated Use variant="header" */
  size?: "sm" | "md" | "lg"
  /** @deprecated Tagline is baked into logo-full.png */
  showSubtitle?: boolean
  className?: string
  priority?: boolean
}

const variantStyles: Record<
  BrandLogoVariant,
  { src: string; width: number; height: number; className: string }
> = {
  header: {
    src: brandAssets.logoFull,
    width: 220,
    height: 44,
    className: "h-[44px] w-auto max-w-[min(220px,calc(100vw-120px))]",
  },
  headerCompact: {
    src: brandAssets.logoFull,
    width: 196,
    height: 38,
    className: "h-[38px] w-auto max-w-[min(196px,calc(100vw-120px))]",
  },
  full: {
    src: brandAssets.logoFullHd,
    width: 280,
    height: 56,
    className: "h-[56px] w-auto max-w-[280px]",
  },
  splash: {
    src: brandAssets.logoSplash,
    width: 320,
    height: 105,
    className: "h-[105px] w-auto max-w-[320px]",
  },
}

function resolveVariant(variant?: BrandLogoVariant, size?: BrandLogoProps["size"]): BrandLogoVariant {
  if (variant) return variant
  switch (size) {
    case "sm":
      return "headerCompact"
    case "lg":
      return "splash"
    default:
      return "header"
  }
}

/** Official eSaleAgreement logo — PNG asset, not CSS recreation. */
export function BrandLogo({
  variant,
  size,
  showSubtitle: _showSubtitle,
  className = "",
  priority = false,
}: BrandLogoProps) {
  const resolved = resolveVariant(variant, size)
  const config = variantStyles[resolved]

  return (
    <div className={cn("flex shrink-0 select-none items-center justify-center", className)}>
      <Image
        src={config.src}
        alt="eSaleAgreement — Secure. Simple. Trusted."
        width={config.width}
        height={config.height}
        priority={priority}
        className={cn("object-contain object-center", config.className)}
        sizes="(max-width: 390px) 220px, 280px"
      />
    </div>
  )
}
