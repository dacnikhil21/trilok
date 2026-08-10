"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { brandAssets, brandColors } from "@/lib/brand-assets"

export type BrandLogoVariant = "header" | "headerCompact" | "splash" | "full" | "icon"

interface BrandLogoProps {
  variant?: BrandLogoVariant
  /** @deprecated Use variant="header" */
  size?: "sm" | "md" | "lg"
  className?: string
  priority?: boolean
}

type LogoLayout = "horizontal" | "vertical"

const VARIANTS: Record<
  BrandLogoVariant,
  {
    layout: LogoLayout
    iconSize: number
    nameClass: string
    taglineClass: string
    gapClass: string
  }
> = {
  headerCompact: {
    layout: "horizontal",
    iconSize: 66,
    nameClass: "text-[16px] font-bold tracking-[-0.02em] leading-none",
    taglineClass:
      "mt-1 whitespace-nowrap text-[9px] font-bold tracking-[0.22em] text-[#334155]",
    gapClass: "gap-2.5",
  },
  header: {
    layout: "horizontal",
    iconSize: 68,
    nameClass: "text-[17px] font-bold tracking-[-0.02em] leading-none",
    taglineClass:
      "mt-1 whitespace-nowrap text-[9.5px] font-bold tracking-[0.22em] text-[#334155]",
    gapClass: "gap-2.5",
  },
  full: {
    layout: "horizontal",
    iconSize: 50,
    nameClass: "text-[18px] font-bold tracking-[-0.02em] leading-none",
    taglineClass: "mt-[5px] text-[9px] font-bold tracking-[0.13em] text-[#334155]",
    gapClass: "gap-3",
  },
  splash: {
    layout: "vertical",
    iconSize: 92,
    nameClass: "text-[22px] font-bold tracking-[-0.02em] leading-none",
    taglineClass: "mt-2 text-[11px] font-bold tracking-[0.16em] text-[#334155]",
    gapClass: "gap-3",
  },
  icon: {
    layout: "horizontal",
    iconSize: 40,
    nameClass: "text-[15px] font-bold tracking-[-0.02em] leading-none",
    taglineClass: "mt-[4px] text-[8px] font-bold tracking-[0.12em] text-[#334155]",
    gapClass: "gap-2.5",
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

function LogoIcon({ size, priority }: { size: number; priority?: boolean }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={brandAssets.logoIcon}
      alt=""
      width={size}
      height={size}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      className="shrink-0 object-contain object-center"
      style={{ width: size, height: size, minWidth: size, minHeight: size, flexShrink: 0 }}
    />
  )
}

function BrandWordmark({ nameClass, taglineClass }: { nameClass: string; taglineClass: string }) {
  return (
    <div className="flex min-w-0 flex-col justify-center leading-none">
      <p className={nameClass}>
        <span style={{ color: brandColors.nameBlue }}>eSale</span>
        <span style={{ color: brandColors.nameGreen }}>Agreement</span>
      </p>
      <p className={taglineClass}>SECURE. SIMPLE. TRUSTED.</p>
    </div>
  )
}

/** Official eSaleAgreement logo — client eS handshake icon + wordmark */
export function BrandLogo({
  variant,
  size,
  className = "",
  priority = false,
}: BrandLogoProps) {
  const resolved = resolveVariant(variant, size)
  const config = VARIANTS[resolved]

  if (resolved === "icon") {
    return (
      <div className={cn("flex shrink-0 select-none items-center justify-center", className)}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={brandAssets.logoIcon}
          alt="eSaleAgreement"
          width={config.iconSize}
          height={config.iconSize}
          loading={priority ? "eager" : "lazy"}
          className="shrink-0 object-contain"
          style={{ width: config.iconSize, height: config.iconSize }}
        />
      </div>
    )
  }

  return (
    <div
      className={cn(
        "flex shrink-0 select-none",
        config.layout === "vertical"
          ? "flex-col items-center justify-center text-center"
          : "flex-row items-center justify-center",
        config.gapClass,
        className
      )}
    >
      <LogoIcon size={config.iconSize} priority={priority} />
      <BrandWordmark nameClass={config.nameClass} taglineClass={config.taglineClass} />
    </div>
  )
}
