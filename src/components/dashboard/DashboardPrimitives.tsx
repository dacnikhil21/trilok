import * as React from "react"
import { cn } from "@/lib/utils"
import { tokens, type TemplateGridColumns } from "@/lib/design-tokens"

export function DashboardSectionHeader({
  title,
  actionLabel = "View All",
  onAction,
}: {
  title: string
  actionLabel?: string
  onAction?: () => void
}) {
  return (
    <div className="mb-3 flex items-center justify-between gap-2">
      <h2 className="text-[15px] font-bold text-[#0F172A]">{title}</h2>
      <button
        type="button"
        onClick={onAction}
        className="shrink-0 text-[13px] font-semibold text-[#2563EB]"
      >
        {actionLabel}
      </button>
    </div>
  )
}

export function DashboardCard({
  label,
  icon,
  compact = false,
  onClick,
}: {
  label: string
  icon: React.ReactNode
  compact?: boolean
  onClick?: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex h-full min-h-[104px] flex-col items-center justify-center rounded-[14px] border border-[#E2E8F0] bg-white p-2.5 text-center shadow-[0_2px_8px_rgba(15,23,42,0.06)]",
        compact && "min-h-[104px] w-[100px] shrink-0"
      )}
    >
      <div className="flex min-h-[72px] shrink-0 items-center justify-center">{icon}</div>
      <span className="mt-2 line-clamp-2 text-[10px] font-medium leading-tight text-[#334155]">
        {label}
      </span>
    </button>
  )
}

export function DashboardTemplateGrid<T extends { label: string }>({
  items,
  columns = 3,
  layout = "grid",
  renderIcon,
}: {
  items: T[]
  columns?: TemplateGridColumns
  layout?: "grid" | "scroll"
  renderIcon: (item: T) => React.ReactNode
}) {
  if (layout === "scroll") {
    return (
      <div className="flex gap-2.5 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {items.map((item) => (
          <DashboardCard key={item.label} label={item.label} icon={renderIcon(item)} compact />
        ))}
      </div>
    )
  }

  const safeColumns = Math.min(columns, tokens.layout.maxTemplateColumns)

  return (
    <div
      className={cn(
        "grid auto-rows-fr gap-2.5",
        safeColumns === 3 ? "grid-cols-3" : "grid-cols-4"
      )}
    >
      {items.map((item) => (
        <DashboardCard key={item.label} label={item.label} icon={renderIcon(item)} />
      ))}
    </div>
  )
}

export function DashboardStatGrid({
  stats,
  renderIcon,
}: {
  stats: Array<{
    label: string
    value: string
    subtext: string
    color: string
    icon: string
  }>
  renderIcon: (icon: string, color: string) => React.ReactNode
}) {
  return (
    <div className="grid grid-cols-2 gap-2.5">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="flex min-h-[108px] flex-col rounded-[12px] border border-[#E2E8F0] bg-white px-3 py-3 shadow-[0_1px_3px_rgba(15,23,42,0.06)]"
        >
          {renderIcon(stat.icon, stat.color)}
          <span className="mt-2 text-[10px] font-medium leading-tight text-[#64748B]">{stat.label}</span>
          <span className="mt-1 text-[18px] font-bold text-[#0F172A]">{stat.value}</span>
          <span className="mt-0.5 line-clamp-2 text-[9px] leading-tight text-[#94A3B8]">{stat.subtext}</span>
        </div>
      ))}
    </div>
  )
}
