'use client'

import * as React from 'react'
import Link from 'next/link'
import { ChevronRight, Check, FileText, Hourglass, Pencil, ShieldCheck } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Icon3D } from '@/components/icons/Icon3D'
import {
  VerificationServiceGrid,
} from '@/components/verification/VerificationServicePicker'
import type { AgreementTypeConfig } from '@/lib/c2c-config'
import type { VerificationService } from '@/lib/dashboard-configs'

const STAT_THEME = {
  blue: {
    accent: '#2563EB',
    gradient: 'from-[#EFF6FF] via-[#F5F9FF] to-[#FAFCFF]',
    pillBg: 'bg-[#DBEAFE]',
    pillText: 'text-[#1D4ED8]',
    watermark: 'bg-[#BFDBFE]/35',
  },
  orange: {
    accent: '#F97316',
    gradient: 'from-[#FFF7ED] via-[#FFFBF5] to-[#FFFCF8]',
    pillBg: 'bg-[#FFEDD5]',
    pillText: 'text-[#C2410C]',
    watermark: 'bg-[#FDBA74]/30',
  },
  green: {
    accent: '#22C55E',
    gradient: 'from-[#F0FDF4] via-[#F5FDF8] to-[#FAFEFB]',
    pillBg: 'bg-[#DCFCE7]',
    pillText: 'text-[#15803D]',
    watermark: 'bg-[#86EFAC]/30',
  },
  purple: {
    accent: '#A855F7',
    gradient: 'from-[#FAF5FF] via-[#FCF8FF] to-[#FEFCFF]',
    pillBg: 'bg-[#F3E8FF]',
    pillText: 'text-[#7E22CE]',
    watermark: 'bg-[#D8B4FE]/30',
  },
} as const

function statColorKey(hex: string): keyof typeof STAT_THEME {
  if (hex.includes('2563EB') || hex.includes('3B82F6')) return 'blue'
  if (hex.includes('F59E0B') || hex.includes('F97316')) return 'orange'
  if (hex.includes('22C55E') || hex.includes('10B981')) return 'green'
  return 'purple'
}

function StatWatermarkIcon({ type, color }: { type: string; color: string }) {
  const props = { className: 'h-[22px] w-[22px]', style: { color }, strokeWidth: 2, 'aria-hidden': true as const }

  if (type === 'pending') return <Hourglass {...props} />
  if (type === 'completed') return <Check {...props} />
  if (type === 'draft') return <Pencil {...props} />
  return <FileText {...props} />
}

export function DashboardSectionHeader({
  title,
  viewAllHref,
  onViewAll,
}: {
  title: string
  viewAllHref?: string
  onViewAll?: () => void
}) {
  const action = viewAllHref ? (
    <Link href={viewAllHref} className="flex items-center gap-0.5 text-[13px] font-semibold text-[#2563EB]">
      View all
      <ChevronRight className="h-4 w-4" strokeWidth={2.5} />
    </Link>
  ) : onViewAll ? (
    <button
      type="button"
      onClick={onViewAll}
      className="flex items-center gap-0.5 text-[13px] font-semibold text-[#2563EB]"
    >
      View all
      <ChevronRight className="h-4 w-4" strokeWidth={2.5} />
    </button>
  ) : null

  return (
    <div className="mb-3 flex items-center justify-between">
      <h2 className="text-[16px] font-bold text-[#0F172A]">{title}</h2>
      {action}
    </div>
  )
}

/** 2×2 compact stat cards — number-first, tinted bg, watermark icon, pill tag */
export function DashboardStatGrid({
  stats,
  showHeader = true,
  viewAllHref,
}: {
  stats: Array<{
    label: string
    value: string
    subtext: string
    color: string
    icon: string
  }>
  showHeader?: boolean
  viewAllHref?: string
}) {
  return (
    <section>
      {showHeader ? (
        <DashboardSectionHeader title="My Agreements Overview" viewAllHref={viewAllHref} />
      ) : null}
      <div className="grid grid-cols-2 gap-2.5">
        {stats.map((stat) => {
          const key = statColorKey(stat.color)
          const theme = STAT_THEME[key]

          return (
            <div
              key={stat.label}
              className={cn(
                'relative overflow-hidden rounded-[16px] bg-gradient-to-br px-3 pb-3 pt-3 shadow-[0_2px_10px_rgba(15,23,42,0.05)]',
                theme.gradient
              )}
            >
              <div
                className="pointer-events-none absolute right-2 top-2 flex h-9 w-9 items-center justify-center rounded-[10px]"
                style={{ backgroundColor: `${theme.accent}14` }}
                aria-hidden="true"
              >
                <StatWatermarkIcon type={stat.icon} color={theme.accent} />
              </div>

              <div className="relative z-[1] max-w-[78%]">
                <p className="text-[24px] font-bold leading-none tracking-[-0.02em] text-[#0F172A]">
                  {stat.value}
                </p>
                <p className="mt-1 line-clamp-1 text-[11px] font-semibold leading-tight text-[#334155]">
                  {stat.label}
                </p>
                <span
                  className={cn(
                    'mt-2.5 inline-flex max-w-full items-center rounded-full px-2 py-0.5 text-[9px] font-semibold',
                    theme.pillBg,
                    theme.pillText
                  )}
                >
                  <span className="truncate">{stat.subtext}</span>
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

/** 2-column verification grid — app-level picker cards */
export function DashboardVerificationGrid({
  services,
  onSelect,
  showHeader = true,
  viewAllHref,
}: {
  services: VerificationService[]
  onSelect?: (service: VerificationService) => void
  showHeader?: boolean
  viewAllHref?: string
}) {
  return (
    <section>
      {showHeader ? (
        <DashboardSectionHeader title="Our Verification Services" viewAllHref={viewAllHref} />
      ) : null}
      <VerificationServiceGrid
        services={services}
        onSelect={(service) => onSelect?.(service)}
      />
    </section>
  )
}

/** C2C agreement types — compact 3-column tiles, icon-first, subtle chevron hint */
export function DashboardAgreementTypeCards({
  types,
  onSelect,
}: {
  types: AgreementTypeConfig[]
  onSelect: (typeId: AgreementTypeConfig['id']) => void
}) {
  const iconMap: Record<string, string> = {
    sale: 'sale',
    rental: 'rental',
    service: 'service',
  }

  return (
    <div className="grid grid-cols-3 gap-2">
      {types.map((type) => (
        <button
          key={type.id}
          type="button"
          onClick={() => onSelect(type.id)}
          className="relative flex flex-col items-center rounded-[14px] border border-[#E8EDF3] bg-white px-1.5 pb-2.5 pt-2.5 text-center shadow-[0_2px_12px_rgba(15,23,42,0.04)] active:scale-[0.98] active:bg-[#FAFBFC]"
        >
          <div className="relative flex w-full items-center justify-center">
            <Icon3D name={iconMap[type.id] ?? 'sale'} size="xl" alt={type.title} bare />
            <ChevronRight
              className="absolute right-0 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#CBD5E1]"
              strokeWidth={2.5}
              aria-hidden="true"
            />
          </div>
          <p className="mt-1.5 line-clamp-2 w-full text-[11px] font-bold leading-[1.2] text-[#0F172A]">
            {type.title}
          </p>
          <p className="mt-0.5 line-clamp-1 w-full text-[9px] leading-snug text-[#64748B]">
            {type.description}
          </p>
        </button>
      ))}
    </div>
  )
}

export function DashboardTrustStrip() {
  return (
    <section className="mx-4 mt-8 overflow-hidden rounded-[16px] bg-gradient-to-r from-[#EFF6FF] to-[#F0FDF4] px-4 py-3.5 shadow-[0_2px_12px_rgba(15,23,42,0.04)]">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white shadow-sm">
          <ShieldCheck className="h-5 w-5 text-[#2563EB]" strokeWidth={2.2} />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[12px] font-bold text-[#0F172A]">Secure • Reliable • 100% Digital</p>
          <p className="mt-0.5 text-[10px] leading-snug text-[#64748B]">
            Your data is safe and used only for verification purposes.
          </p>
        </div>
      </div>
    </section>
  )
}

/** @deprecated Dev preview only */
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
        'flex h-full min-h-[104px] flex-col items-center justify-center rounded-[14px] border border-[#E2E8F0] bg-white p-2.5 text-center shadow-[0_2px_8px_rgba(15,23,42,0.06)]',
        compact && 'min-h-[104px] w-[100px] shrink-0'
      )}
    >
      <div className="flex min-h-[72px] shrink-0 items-center justify-center">{icon}</div>
      <span className="mt-2 line-clamp-2 text-[10px] font-medium leading-tight text-[#334155]">
        {label}
      </span>
    </button>
  )
}

/** @deprecated Dev preview only */
export function DashboardTemplateGrid<T extends { label: string }>({
  items,
  renderIcon,
}: {
  items: T[]
  renderIcon: (item: T) => React.ReactNode
}) {
  return (
    <div className="grid grid-cols-3 gap-2.5">
      {items.map((item) => (
        <DashboardCard key={item.label} label={item.label} icon={renderIcon(item)} />
      ))}
    </div>
  )
}
