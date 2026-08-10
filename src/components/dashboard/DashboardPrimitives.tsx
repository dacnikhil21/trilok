'use client'

import * as React from 'react'
import Link from 'next/link'
import { ChevronRight, FileText, ShieldCheck } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Icon3D } from '@/components/icons/Icon3D'
import type { AgreementTypeConfig } from '@/lib/c2c-config'
import type { VerificationService } from '@/lib/dashboard-configs'

const STAT_ACCENT: Record<string, string> = {
  blue: '#2563EB',
  orange: '#F97316',
  green: '#22C55E',
  purple: '#A855F7',
}

const STAT_ICON_BG: Record<string, string> = {
  blue: 'bg-[#EFF6FF]',
  orange: 'bg-[#FFF7ED]',
  green: 'bg-[#F0FDF4]',
  purple: 'bg-[#FAF5FF]',
}

function StatIcon({ type, color }: { type: string; color: string }) {
  if (type === 'pending') {
    return (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M7 3H17V7L12 12L17 17V21H7V17L12 12L7 7V3Z"
          stroke={color}
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
      </svg>
    )
  }
  if (type === 'completed') {
    return (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="8" stroke={color} strokeWidth="2" />
        <path d="M9 12L11 14L15 10" stroke={color} strokeWidth="2" strokeLinecap="round" />
      </svg>
    )
  }
  if (type === 'draft') {
    return (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M6 18L16 8L18 10L8 20H6V18Z" fill={color} />
      </svg>
    )
  }
  return <FileText className="h-5 w-5" style={{ color }} strokeWidth={2} />
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

/** 2×2 stat cards — icon left, text right, colored bottom border */
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
  const colorKey = (hex: string) => {
    if (hex.includes('2563EB') || hex.includes('3B82F6')) return 'blue'
    if (hex.includes('F59E0B') || hex.includes('F97316')) return 'orange'
    if (hex.includes('22C55E') || hex.includes('10B981')) return 'green'
    return 'purple'
  }

  return (
    <section>
      {showHeader ? (
        <DashboardSectionHeader title="My Agreements Overview" viewAllHref={viewAllHref} />
      ) : null}
      <div className="grid grid-cols-2 gap-3">
        {stats.map((stat) => {
          const key = colorKey(stat.color)
          return (
            <div
              key={stat.label}
              className="relative overflow-hidden rounded-[16px] bg-white px-3 py-3.5 shadow-[0_2px_12px_rgba(15,23,42,0.06)]"
            >
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    'flex h-11 w-11 shrink-0 items-center justify-center rounded-full',
                    STAT_ICON_BG[key] ?? 'bg-[#F1F5F9]'
                  )}
                >
                  <StatIcon type={stat.icon} color={STAT_ACCENT[key] ?? stat.color} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[11px] font-medium text-[#64748B]">{stat.label}</p>
                  <p className="text-[22px] font-bold leading-tight text-[#0F172A]">{stat.value}</p>
                  <p className="text-[10px] text-[#94A3B8]">{stat.subtext}</p>
                </div>
              </div>
              <div
                className="absolute bottom-0 left-0 right-0 h-[3px]"
                style={{ backgroundColor: STAT_ACCENT[key] ?? stat.color }}
              />
            </div>
          )
        })}
      </div>
    </section>
  )
}

/** 2-column verification grid with accent strip */
export function DashboardVerificationGrid({
  services,
  onSelect,
  showHeader = true,
  viewAllHref,
}: {
  services: VerificationService[]
  onSelect?: () => void
  showHeader?: boolean
  viewAllHref?: string
}) {
  return (
    <section>
      {showHeader ? (
        <DashboardSectionHeader title="Our Verification Services" viewAllHref={viewAllHref} />
      ) : null}
      <div className="grid grid-cols-2 gap-3">
        {services.map((service) => {
          const title = service.shortLabel ?? service.label
          const subtitle =
            service.description ??
            (service.shortLabel ? `Verify ${service.shortLabel}` : 'Verification service')

          return (
            <button
              key={service.label}
              type="button"
              onClick={onSelect}
              className="relative flex flex-col overflow-hidden rounded-[16px] bg-white px-3 py-3.5 text-left shadow-[0_2px_12px_rgba(15,23,42,0.06)] transition-transform active:scale-[0.98]"
            >
              <div className="flex items-center gap-2.5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center">
                  <Icon3D name={service.icon} size="sm" alt={title} bare />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[12px] font-bold leading-tight text-[#0F172A]">{title}</p>
                  <p className="mt-0.5 text-[10px] leading-snug text-[#64748B]">{subtitle}</p>
                </div>
              </div>
              <div
                className="absolute bottom-0 left-0 right-0 h-[3px]"
                style={{ backgroundColor: service.color }}
              />
            </button>
          )
        })}
      </div>
    </section>
  )
}

/** C2C agreement type cards — 3 columns with circular CTA */
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
    <div className="grid grid-cols-3 gap-2.5">
      {types.map((type) => (
        <button
          key={type.id}
          type="button"
          onClick={() => onSelect(type.id)}
          className="flex min-h-[172px] flex-col rounded-[14px] border border-[#E2E8F0] bg-white p-2.5 shadow-[0_2px_8px_rgba(15,23,42,0.06)] active:scale-[0.98]"
        >
          <div className="flex flex-1 flex-col items-center text-center">
            <Icon3D name={iconMap[type.id] ?? 'sale'} size="card" alt={type.title} bare />
            <p className="mt-2 line-clamp-2 min-h-[28px] text-[11px] font-bold leading-tight text-[#0F172A]">
              {type.title}
            </p>
            <p className="mt-1 line-clamp-2 min-h-[26px] text-[10px] leading-snug text-[#64748B]">
              {type.description}
            </p>
          </div>
          <div className="mt-2 flex justify-center">
            <span
              className="flex h-8 w-8 items-center justify-center rounded-full text-white"
              style={{ backgroundColor: type.color }}
            >
              <ChevronRight className="h-4 w-4" strokeWidth={2.5} />
            </span>
          </div>
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
