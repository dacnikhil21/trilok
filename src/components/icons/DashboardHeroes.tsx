import * as React from "react"

type HeroProps = React.SVGProps<SVGSVGElement>

/** PNG hero — true-alpha asset, floats on gradient (no box) */
export function DashboardHeroArt({
  src,
  alt,
  className,
}: {
  src: string
  alt: string
  className?: string
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      width={150}
      height={136}
      className={
        className ??
        "relative z-[1] h-[136px] w-[158px] shrink-0 object-contain object-bottom drop-shadow-[0_14px_28px_rgba(37,99,235,0.14)]"
      }
      loading="eager"
      decoding="async"
    />
  )
}

export function MobileHeroIllustration(props: HeroProps) {
  return (
    <svg width="120" height="110" viewBox="0 0 96 88" fill="none" {...props}>
      <rect x="8" y="12" width="28" height="52" rx="4" fill="#2563EB" />
      <rect x="12" y="18" width="20" height="34" rx="2" fill="#EFF6FF" />
      <rect x="40" y="24" width="44" height="28" rx="3" fill="#3B82F6" />
      <path d="M44 52H80" stroke="#1D4ED8" strokeWidth="3" strokeLinecap="round" />
      <rect x="52" y="58" width="24" height="16" rx="8" fill="#BFDBFE" />
      <rect x="62" y="8" width="22" height="38" rx="4" fill="#2563EB" />
      <rect x="66" y="14" width="14" height="24" rx="2" fill="#EFF6FF" />
      <circle cx="72" cy="68" r="12" fill="#22C55E" />
      <path d="M68 68L71 71L77 65" stroke="white" strokeWidth="2" strokeLinecap="round" />
      <rect x="78" y="52" width="14" height="18" rx="2" fill="white" stroke="#E2E8F0" strokeWidth="1" />
      <path d="M82 58H88M82 62H86" stroke="#94A3B8" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  )
}

export function VehicleHeroIllustration(props: HeroProps) {
  return (
    <svg width="96" height="88" viewBox="0 0 96 88" fill="none" {...props}>
      <circle cx="24" cy="62" r="8" stroke="#2563EB" strokeWidth="3" />
      <circle cx="68" cy="62" r="8" stroke="#2563EB" strokeWidth="3" />
      <path d="M12 58H78L70 38H26L12 58Z" fill="#2563EB" />
      <path d="M30 38L38 22H58L66 38" stroke="#1D4ED8" strokeWidth="2" />
      <circle cx="78" cy="66" r="10" fill="#22C55E" />
      <path d="M74 66L77 69L83 63" stroke="white" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

export function FurnitureHeroIllustration(props: HeroProps) {
  return (
    <svg width="96" height="88" viewBox="0 0 96 88" fill="none" {...props}>
      <rect x="8" y="44" width="48" height="22" rx="4" fill="#16A34A" />
      <rect x="12" y="36" width="40" height="10" rx="3" fill="#22C55E" />
      <rect x="58" y="28" width="10" height="38" rx="2" fill="#EAB308" />
      <circle cx="63" cy="22" r="8" fill="#FDE047" />
      <circle cx="78" cy="62" r="12" fill="#22C55E" />
      <path d="M74 62L77 65L83 59" stroke="white" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

export function RentalHeroIllustration(props: HeroProps) {
  return (
    <svg width="96" height="88" viewBox="0 0 96 88" fill="none" {...props}>
      <path d="M20 52L48 28L76 52V72H20V52Z" fill="#2563EB" />
      <rect x="38" y="54" width="20" height="18" rx="2" fill="#EFF6FF" />
      <rect x="26" y="46" width="12" height="10" rx="1" fill="#BFDBFE" />
      <rect x="58" y="46" width="12" height="10" rx="1" fill="#BFDBFE" />
      <circle cx="72" cy="64" r="12" fill="#22C55E" />
      <path d="M68 64L71 67L77 61" stroke="white" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

export function ServiceHeroIllustration(props: HeroProps) {
  return (
    <svg width="96" height="88" viewBox="0 0 96 88" fill="none" {...props}>
      <rect x="48" y="16" width="36" height="48" rx="4" fill="#2563EB" />
      <rect x="54" y="24" width="24" height="4" rx="2" fill="#BFDBFE" />
      <rect x="54" y="32" width="18" height="3" rx="1.5" fill="#BFDBFE" />
      <circle cx="24" cy="28" r="10" fill="#2563EB" />
      <path d="M14 58C14 48 18 42 24 42C30 42 34 48 34 58" fill="#1D4ED8" />
      <rect x="18" y="58" width="12" height="18" rx="2" fill="#3B82F6" />
      <circle cx="66" cy="58" r="10" fill="#22C55E" />
      <path d="M62 58L65 61L71 55" stroke="white" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

export function OthersHeroIllustration(props: HeroProps) {
  return (
    <svg width="96" height="88" viewBox="0 0 96 88" fill="none" {...props}>
      <path
        d="M28 18H68C72.4 18 76 21.6 76 26V62C76 66.4 72.4 70 68 70H28C23.6 70 20 66.4 20 62V26C20 21.6 23.6 18 28 18Z"
        fill="#F97316"
      />
      <path d="M36 18V12C36 9.8 37.8 8 40 8H56C58.2 8 60 9.8 60 12V18" stroke="#EA580C" strokeWidth="2" />
      <rect x="32" y="32" width="32" height="4" rx="2" fill="#FFEDD5" />
      <rect x="32" y="42" width="24" height="4" rx="2" fill="#FFEDD5" />
      <circle cx="72" cy="62" r="12" fill="#22C55E" />
      <path d="M68 62L71 65L77 59" stroke="white" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

export const DASHBOARD_HEROES = {
  mobile: MobileHeroIllustration,
  vehicle: VehicleHeroIllustration,
  furniture: FurnitureHeroIllustration,
  rental: RentalHeroIllustration,
  service: ServiceHeroIllustration,
  others: OthersHeroIllustration,
} as const

/** Prefer config.heroImage PNG; fall back to SVG illustration component */
export function resolveDashboardHeroVisual(
  config: { id: string; heroImage?: string; headlineHighlight: string },
): React.ReactNode {
  if (config.heroImage) {
    return (
      <DashboardHeroArt
        src={config.heroImage}
        alt={`${config.headlineHighlight} agreements`}
      />
    )
  }

  const HeroIllustration =
    DASHBOARD_HEROES[config.id as keyof typeof DASHBOARD_HEROES] ?? DASHBOARD_HEROES.mobile

  return <HeroIllustration className="h-[124px] w-[136px] shrink-0 drop-shadow-[0_12px_28px_rgba(37,99,235,0.15)]" />
}
