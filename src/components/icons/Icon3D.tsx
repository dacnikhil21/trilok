"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { getIcon3DPath } from "@/lib/icon3d-registry"

interface Icon3DProps {
  name: string
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "card" | "hero" | "jumbo"
  className?: string
  alt?: string
  /** Fill container — no outer box shadow (for nested layouts) */
  bare?: boolean
}

const SIZE_MAP = {
  xs: { box: 40, img: 36 },
  sm: { box: 48, img: 44 },
  md: { box: 56, img: 52 },
  lg: { box: 72, img: 66 },
  xl: { box: 88, img: 80 },
  card: { box: 80, img: 74 },
  hero: { box: 120, img: 112 },
  jumbo: { box: 168, img: 156 },
} as const

/**
 * 3D PNG icon — uses native img for reliable local asset loading on mobile.
 */
export function Icon3D({ name, size = "md", className, alt, bare = false }: Icon3DProps) {
  const [failed, setFailed] = React.useState(false)
  const dims = SIZE_MAP[size]
  const src = getIcon3DPath(name)

  if (failed) {
    return <Icon3DFallback name={name} size={size} className={className} />
  }

  return (
    <div
      className={cn(
        "relative flex shrink-0 items-center justify-center overflow-hidden rounded-[18px]",
        !bare && "bg-white shadow-[0_4px_14px_rgba(15,23,42,0.08)]",
        className
      )}
      style={{ width: dims.box, height: dims.box }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt ?? name}
        width={dims.img}
        height={dims.img}
        className="h-full w-full object-contain p-1.5"
        loading="lazy"
        onError={() => setFailed(true)}
      />
    </div>
  )
}

function Icon3DFallback({ name, size = "md", className }: Icon3DProps) {
  const dims = SIZE_MAP[size]
  const hue = hashHue(name)

  return (
    <div
      className={cn(
        "relative flex shrink-0 items-center justify-center overflow-hidden rounded-[16px]",
        className
      )}
      style={{
        width: dims.box,
        height: dims.box,
        background: `linear-gradient(145deg, hsl(${hue} 80% 58%), hsl(${hue} 65% 40%))`,
        boxShadow: `0 10px 24px hsla(${hue}, 60%, 38%, 0.35), inset 0 2px 8px rgba(255,255,255,0.3)`,
      }}
    >
      <div className="absolute inset-x-3 top-1.5 h-1/3 rounded-full bg-white/30 blur-[3px]" />
      <span className="relative text-[11px] font-bold uppercase tracking-wide text-white">
        {name.slice(0, 2)}
      </span>
    </div>
  )
}

function hashHue(str: string): number {
  let h = 0
  for (let i = 0; i < str.length; i++) h = (h + str.charCodeAt(i) * 17) % 360
  return h
}
