import * as React from "react"
import { Check, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Icon3D } from "@/components/icons/Icon3D"

/** Compact native-style screen intro — no hero illustration */
export function MobileScreenIntro({
  eyebrow,
  title,
  subtitle,
  hint,
}: {
  eyebrow?: string
  title: string
  subtitle?: string
  hint?: string
}) {
  return (
    <div className="px-4 pt-2 pb-1">
      {eyebrow ? <p className="text-[13px] font-medium text-[#64748B]">{eyebrow}</p> : null}
      <h1 className="mt-0.5 text-[20px] font-bold leading-[1.25] tracking-[-0.02em] text-[#0F172A]">{title}</h1>
      {subtitle ? <p className="mt-1 text-[13px] leading-[1.4] text-[#64748B]">{subtitle}</p> : null}
      {hint ? (
        <p className="mt-2 rounded-[10px] bg-[#EFF6FF] px-3 py-2 text-[11px] leading-[1.4] text-[#475569]">{hint}</p>
      ) : null}
    </div>
  )
}

/** Single-column selectable list — React Native settings / picker pattern */
export function MobileSelectionList<T extends { id: string; title: string; subtitle?: string }>({
  items,
  selectedId,
  onSelect,
  renderIcon,
}: {
  items: T[]
  selectedId: string
  onSelect: (id: string) => void
  renderIcon: (item: T) => React.ReactNode
}) {
  return (
    <div className="mt-3 px-4">
      <div className="overflow-hidden rounded-[14px] border border-[#E2E8F0] bg-white shadow-[0_1px_4px_rgba(15,23,42,0.04)]">
        {items.map((item, index) => {
          const isSelected = selectedId === item.id
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelect(item.id)}
              className={cn(
                "flex w-full min-h-[64px] items-center gap-3 px-3.5 py-3 text-left active:bg-[#F8FAFC]",
                index > 0 && "border-t border-[#F1F5F9]",
                isSelected && "bg-[#F8FAFF]"
              )}
            >
              <div className="shrink-0">{renderIcon(item)}</div>
              <div className="min-w-0 flex-1">
                <p className="text-[14px] font-semibold leading-tight text-[#0F172A]">{item.title}</p>
                {item.subtitle ? (
                  <p className="mt-0.5 line-clamp-1 text-[12px] leading-snug text-[#64748B]">{item.subtitle}</p>
                ) : null}
              </div>
              {isSelected ? (
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#2563EB]">
                  <Check className="h-3.5 w-3.5 text-white" strokeWidth={3} />
                </span>
              ) : (
                <ChevronRight className="h-4 w-4 shrink-0 text-[#CBD5E1]" strokeWidth={2.5} />
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}

/** Single-column tappable rows — navigate on tap (no selection state) */
export function MobileNavList<T extends { id: string; title: string; subtitle?: string }>({
  items,
  onSelect,
  renderIcon,
}: {
  items: T[]
  onSelect: (id: string) => void
  renderIcon: (item: T) => React.ReactNode
}) {
  return (
    <div className="mt-3 px-4 pb-4">
      <div className="overflow-hidden rounded-[14px] border border-[#E2E8F0] bg-white shadow-[0_1px_4px_rgba(15,23,42,0.04)]">
        {items.map((item, index) => (
          <button
            key={item.id}
            type="button"
            onClick={() => onSelect(item.id)}
            className={cn(
              "flex w-full min-h-[64px] items-center gap-3 px-3.5 py-3 text-left active:bg-[#F8FAFC]",
              index > 0 && "border-t border-[#F1F5F9]"
            )}
          >
            <div className="shrink-0">{renderIcon(item)}</div>
            <div className="min-w-0 flex-1">
              <p className="text-[14px] font-semibold leading-tight text-[#0F172A]">{item.title}</p>
              {item.subtitle ? (
                <p className="mt-0.5 line-clamp-1 text-[12px] leading-snug text-[#64748B]">{item.subtitle}</p>
              ) : null}
            </div>
            <ChevronRight className="h-4 w-4 shrink-0 text-[#CBD5E1]" strokeWidth={2.5} />
          </button>
        ))}
      </div>
    </div>
  )
}

export function MobileIconChipRow<T extends { label: string }>({
  items,
  renderIcon,
  onSelect,
}: {
  items: T[]
  renderIcon: (item: T) => React.ReactNode
  onSelect?: (item: T) => void
}) {
  return (
    <div className="flex gap-2.5 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {items.map((item) => (
        <button
          key={item.label}
          type="button"
          onClick={() => onSelect?.(item)}
          className="flex w-[88px] shrink-0 flex-col items-center rounded-[12px] border border-[#E2E8F0] bg-white px-2 py-3 shadow-[0_1px_3px_rgba(15,23,42,0.04)] active:scale-[0.98]"
        >
          <div className="flex h-[52px] w-[52px] items-center justify-center">{renderIcon(item)}</div>
          <span className="mt-2 line-clamp-2 text-center text-[10px] font-semibold leading-tight text-[#334155]">
            {item.label}
          </span>
        </button>
      ))}
    </div>
  )
}

/** Premium hero — reference layout: gradient bleed, side dividers only, floating PNG */
export function MobileDashboardHero({
  greeting,
  headline,
  headlineHighlight,
  headlineSuffix,
  highlightColor = "#2563EB",
  icon,
  features,
  gradientClass = "from-[#EFF6FF] via-[#F5F9FF] to-white",
  glowClassName = "bg-[#DBEAFE]/35",
}: {
  greeting: string
  headline: string
  headlineHighlight?: string
  headlineSuffix?: string
  highlightColor?: string
  icon: React.ReactNode
  features: Array<{ label: string; sublabel?: string; color: string; icon: React.ReactNode }>
  gradientClass?: string
  glowClassName?: string
}) {
  return (
    <section className="relative overflow-hidden">
      <div className={cn("relative bg-gradient-to-b px-4 pb-4 pt-4", gradientClass)}>
        <div
          className={cn(
            "pointer-events-none absolute -right-6 top-2 h-40 w-40 rounded-full blur-3xl",
            glowClassName
          )}
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute right-0 top-8 h-32 w-24 opacity-[0.35]"
          style={{
            backgroundImage: "radial-gradient(#93C5FD 1px, transparent 1px)",
            backgroundSize: "10px 10px",
          }}
          aria-hidden="true"
        />

        <div className="relative flex min-h-[126px] items-end gap-2">
          <div className="min-w-0 flex-1 pr-1">
            <p className="text-[14px] font-medium text-[#64748B]">{greeting}</p>
            <h1 className="mt-1.5 text-[22px] font-bold leading-[1.2] tracking-[-0.03em] text-[#0F172A]">
              {headline}
              {headlineHighlight ? (
                <>
                  <span style={{ color: highlightColor }}>{headlineHighlight}</span>{" "}
                </>
              ) : null}
              {headlineSuffix}
            </h1>
          </div>
          <div className="relative shrink-0 self-end pb-0.5">
            <div
              className="pointer-events-none absolute -inset-3 rounded-full bg-[#BFDBFE]/25 blur-2xl"
              aria-hidden="true"
            />
            <div className="relative">{icon}</div>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-3 divide-x divide-[#E2E8F0]">
          {features.map(({ label, sublabel, color, icon: featIcon }) => (
            <div key={label} className="flex flex-col items-center px-2 py-0.5 text-center">
              <span style={{ color }}>{featIcon}</span>
              <p className="mt-1.5 text-[11px] font-bold leading-tight text-[#0F172A]">{label}</p>
              {sublabel ? (
                <p className="mt-0.5 text-[9px] font-medium leading-snug text-[#94A3B8]">{sublabel}</p>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/** 4×2 template grid — bare icons, borderless native feel */
export function MobileTemplateGrid<T extends { label: string; icon: string }>({
  items,
  onSelect,
}: {
  items: T[]
  onSelect?: (item: T) => void
}) {
  return (
    <div className="grid grid-cols-4 gap-x-2 gap-y-6">
      {items.map((item) => (
        <button
          key={item.label}
          type="button"
          onClick={() => onSelect?.(item)}
          className="group flex flex-col items-center gap-2.5 px-0.5 active:scale-[0.96] transition-transform"
        >
          <Icon3D name={item.icon} size="md" alt={item.label} bare />
          <span className="line-clamp-2 text-center text-[11px] font-semibold leading-[1.25] text-[#475569] group-active:text-[#2563EB]">
            {item.label}
          </span>
        </button>
      ))}
    </div>
  )
}
