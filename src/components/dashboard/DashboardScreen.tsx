"use client"

import * as React from "react"
import { FileText, Home, Shield, ShieldCheck, User, Plus, Lock, Clock } from "lucide-react"
import { cn } from "@/lib/utils"
import { MobileScreen } from "@/components/layout/MobileScreen"
import { StatusBar } from "@/components/layout/StatusBar"
import { AppHeader } from "@/components/layout/AppHeader"
import { DASHBOARD_HEROES } from "@/components/icons/DashboardHeroes"
import {
  AGREEMENT_STATS,
  DEFAULT_VERIFICATION_SERVICES,
  type DashboardConfig,
  type DashboardTemplate,
  type RentalCategory,
  type VerificationService,
  type VerificationServiceIcon,
} from "@/lib/dashboard-configs"

interface DashboardScreenProps {
  config: DashboardConfig
}

const HERO_FEATURES = [
  { label: "Legally Recognised", color: "#22C55E", Icon: ShieldCheck },
  { label: "eSign Secure", color: "#2563EB", Icon: Lock },
  { label: "Time Stamped", color: "#A855F7", Icon: Clock },
] as const

function TemplateIcon({ icon }: { icon: DashboardTemplate["icon"] }) {
  const common = "h-7 w-7"
  switch (icon) {
    case "phone":
      return (
        <svg className={common} viewBox="0 0 28 28" fill="none">
          <rect x="8" y="3" width="12" height="22" rx="2" fill="#2563EB" />
          <rect x="10" y="6" width="8" height="14" rx="1" fill="#EFF6FF" />
        </svg>
      )
    case "laptop":
      return (
        <svg className={common} viewBox="0 0 28 28" fill="none">
          <rect x="5" y="7" width="18" height="12" rx="1.5" fill="#2563EB" />
          <path d="M3 20H25" stroke="#1D4ED8" strokeWidth="2" strokeLinecap="round" />
        </svg>
      )
    case "tablet":
      return (
        <svg className={common} viewBox="0 0 28 28" fill="none">
          <rect x="7" y="4" width="14" height="20" rx="2" fill="#2563EB" />
          <rect x="9" y="7" width="10" height="13" rx="1" fill="#EFF6FF" />
        </svg>
      )
    case "watch":
      return (
        <svg className={common} viewBox="0 0 28 28" fill="none">
          <rect x="9" y="8" width="10" height="12" rx="3" fill="#2563EB" />
          <rect x="11" y="4" width="6" height="4" rx="1" fill="#1D4ED8" />
          <rect x="11" y="20" width="6" height="4" rx="1" fill="#1D4ED8" />
        </svg>
      )
    case "camera":
      return (
        <svg className={common} viewBox="0 0 28 28" fill="none">
          <rect x="4" y="9" width="20" height="14" rx="2" fill="#2563EB" />
          <circle cx="14" cy="16" r="4" fill="#EFF6FF" />
          <rect x="10" y="6" width="8" height="4" rx="1" fill="#1D4ED8" />
        </svg>
      )
    case "tv":
      return (
        <svg className={common} viewBox="0 0 28 28" fill="none">
          <rect x="4" y="6" width="20" height="14" rx="2" fill="#2563EB" />
          <path d="M10 22H18" stroke="#1D4ED8" strokeWidth="2" strokeLinecap="round" />
        </svg>
      )
    case "appliance":
      return (
        <svg className={common} viewBox="0 0 28 28" fill="none">
          <rect x="7" y="4" width="14" height="20" rx="2" fill="#2563EB" />
          <circle cx="14" cy="12" r="3" fill="#EFF6FF" />
        </svg>
      )
    case "console":
      return (
        <svg className={common} viewBox="0 0 28 28" fill="none">
          <rect x="4" y="10" width="20" height="10" rx="3" fill="#2563EB" />
          <circle cx="10" cy="15" r="2" fill="#EFF6FF" />
          <circle cx="18" cy="15" r="2" fill="#EFF6FF" />
        </svg>
      )
    case "accessories":
      return (
        <svg className={common} viewBox="0 0 28 28" fill="none">
          <rect x="6" y="8" width="16" height="12" rx="2" fill="#2563EB" />
          <path d="M10 8V6C10 4.9 10.9 4 12 4H16C17.1 4 18 4.9 18 6V8" stroke="#1D4ED8" strokeWidth="1.5" />
        </svg>
      )
    case "bike":
      return (
        <svg className={common} viewBox="0 0 28 28" fill="none">
          <circle cx="8" cy="18" r="4" stroke="#2563EB" strokeWidth="2" />
          <circle cx="20" cy="18" r="4" stroke="#2563EB" strokeWidth="2" />
          <path d="M8 18H14L17 10H22" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" />
        </svg>
      )
    case "car":
      return (
        <svg className={common} viewBox="0 0 28 28" fill="none">
          <path d="M5 16H23L21 10H7L5 16Z" fill="#2563EB" />
          <circle cx="9" cy="18" r="2" fill="#1D4ED8" />
          <circle cx="19" cy="18" r="2" fill="#1D4ED8" />
        </svg>
      )
    case "scooter":
      return (
        <svg className={common} viewBox="0 0 28 28" fill="none">
          <circle cx="9" cy="19" r="3" stroke="#2563EB" strokeWidth="2" />
          <circle cx="19" cy="19" r="3" stroke="#2563EB" strokeWidth="2" />
          <path d="M9 19H15L18 11" stroke="#2563EB" strokeWidth="2" />
        </svg>
      )
    case "commercial":
      return (
        <svg className={common} viewBox="0 0 28 28" fill="none">
          <rect x="5" y="10" width="18" height="10" rx="2" fill="#2563EB" />
          <rect x="8" y="6" width="12" height="5" rx="1" fill="#1D4ED8" />
        </svg>
      )
    case "bike-loan":
    case "car-loan":
      return (
        <svg className={common} viewBox="0 0 28 28" fill="none">
          <rect x="6" y="5" width="16" height="18" rx="2" fill="#2563EB" />
          <path d="M10 11H18M10 15H16" stroke="#EFF6FF" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      )
    case "used-vehicle":
      return (
        <svg className={common} viewBox="0 0 28 28" fill="none">
          <rect x="6" y="5" width="16" height="18" rx="2" fill="#22C55E" />
          <path d="M11 14L13 16L17 12" stroke="white" strokeWidth="2" strokeLinecap="round" />
        </svg>
      )
    case "furniture":
      return (
        <svg className={common} viewBox="0 0 28 28" fill="none">
          <rect x="5" y="14" width="18" height="8" rx="2" fill="#16A34A" />
          <rect x="7" y="10" width="14" height="5" rx="1" fill="#22C55E" />
        </svg>
      )
    case "office-furniture":
      return (
        <svg className={common} viewBox="0 0 28 28" fill="none">
          <rect x="8" y="8" width="12" height="14" rx="1" fill="#22C55E" />
          <rect x="6" y="18" width="16" height="4" rx="1" fill="#16A34A" />
        </svg>
      )
    case "custom-furniture":
      return (
        <svg className={common} viewBox="0 0 28 28" fill="none">
          <rect x="6" y="10" width="16" height="12" rx="2" fill="#A16207" />
          <path d="M10 10V7H18V10" stroke="#92400E" strokeWidth="1.5" />
        </svg>
      )
    case "used-furniture":
      return (
        <svg className={common} viewBox="0 0 28 28" fill="none">
          <rect x="5" y="14" width="18" height="8" rx="2" fill="#22C55E" />
          <rect x="7" y="10" width="14" height="5" rx="1" fill="#4ADE80" />
        </svg>
      )
    case "bulk-furniture":
      return (
        <svg className={common} viewBox="0 0 28 28" fill="none">
          <rect x="6" y="10" width="16" height="14" rx="2" fill="#A16207" />
          <path d="M6 14H22" stroke="#CA8A04" strokeWidth="2" />
        </svg>
      )
    case "warranty":
      return (
        <svg className={common} viewBox="0 0 28 28" fill="none">
          <path d="M14 4L22 7V13C22 17.4 18.8 21.2 14 22.5C9.2 21.2 6 17.4 6 13V7L14 4Z" fill="#16A34A" />
          <path d="M11 13L13 15L17 11" stroke="white" strokeWidth="2" strokeLinecap="round" />
        </svg>
      )
    case "delivery":
      return (
        <svg className={common} viewBox="0 0 28 28" fill="none">
          <rect x="4" y="10" width="14" height="10" rx="1" fill="#22C55E" />
          <path d="M18 12H24L22 18H18V12Z" fill="#16A34A" />
          <circle cx="10" cy="22" r="2" fill="#15803D" />
          <circle cx="20" cy="22" r="2" fill="#15803D" />
        </svg>
      )
    case "freelance":
      return (
        <svg className={common} viewBox="0 0 28 28" fill="none">
          <circle cx="14" cy="10" r="4" fill="#2563EB" />
          <path d="M8 24C8 19.6 10.7 17 14 17C17.3 17 20 19.6 20 24" stroke="#2563EB" strokeWidth="2" />
        </svg>
      )
    case "it-services":
      return (
        <svg className={common} viewBox="0 0 28 28" fill="none">
          <rect x="5" y="7" width="18" height="12" rx="1.5" fill="#2563EB" />
          <path d="M3 20H25" stroke="#1D4ED8" strokeWidth="2" />
        </svg>
      )
    case "cleaning":
      return (
        <svg className={common} viewBox="0 0 28 28" fill="none">
          <path d="M8 20L14 6L20 20H8Z" fill="#2563EB" />
          <rect x="12" y="20" width="4" height="4" rx="1" fill="#1D4ED8" />
        </svg>
      )
    case "maintenance":
      return (
        <svg className={common} viewBox="0 0 28 28" fill="none">
          <path d="M8 18L16 10L20 14L12 22L8 18Z" fill="#2563EB" />
          <path d="M17 7L21 11" stroke="#1D4ED8" strokeWidth="2" strokeLinecap="round" />
        </svg>
      )
    case "installation":
      return (
        <svg className={common} viewBox="0 0 28 28" fill="none">
          <rect x="6" y="5" width="16" height="18" rx="2" fill="#2563EB" />
          <path d="M14 10V16M11 13H17" stroke="#EFF6FF" strokeWidth="2" strokeLinecap="round" />
        </svg>
      )
    case "more":
    default:
      return (
        <svg className={common} viewBox="0 0 28 28" fill="none">
          <circle cx="8" cy="14" r="2" fill="#2563EB" />
          <circle cx="14" cy="14" r="2" fill="#2563EB" />
          <circle cx="20" cy="14" r="2" fill="#2563EB" />
        </svg>
      )
  }
}

function RentalCategoryIcon({ icon }: { icon: RentalCategory["icon"] }) {
  switch (icon) {
    case "pg":
      return (
        <svg className="h-[52px] w-[52px]" viewBox="0 0 52 52" fill="none">
          <rect x="8" y="14" width="36" height="32" rx="3" fill="#2563EB" />
          <rect x="12" y="20" width="8" height="8" rx="1" fill="#BFDBFE" />
          <rect x="24" y="20" width="8" height="8" rx="1" fill="#BFDBFE" />
          <rect x="12" y="32" width="8" height="8" rx="1" fill="#BFDBFE" />
          <rect x="24" y="32" width="8" height="8" rx="1" fill="#BFDBFE" />
        </svg>
      )
    case "vehicle":
      return (
        <svg className="h-[52px] w-[52px]" viewBox="0 0 52 52" fill="none">
          <path d="M8 30H44L40 20H12L8 30Z" fill="#2563EB" />
          <circle cx="16" cy="34" r="4" fill="#1D4ED8" />
          <circle cx="36" cy="34" r="4" fill="#1D4ED8" />
        </svg>
      )
    case "electronics":
      return (
        <svg className="h-[52px] w-[52px]" viewBox="0 0 52 52" fill="none">
          <rect x="8" y="10" width="16" height="26" rx="2" fill="#2563EB" />
          <rect x="28" y="14" width="16" height="22" rx="2" fill="#3B82F6" />
          <rect x="18" y="36" width="20" height="8" rx="1" fill="#1D4ED8" />
        </svg>
      )
    case "other":
    default:
      return (
        <svg className="h-[52px] w-[52px]" viewBox="0 0 52 52" fill="none">
          <circle cx="26" cy="26" r="18" fill="#EFF6FF" />
          <circle cx="18" cy="26" r="2.5" fill="#2563EB" />
          <circle cx="26" cy="26" r="2.5" fill="#2563EB" />
          <circle cx="34" cy="26" r="2.5" fill="#2563EB" />
        </svg>
      )
  }
}

function VerificationServiceIcon({ icon, color }: { icon: VerificationServiceIcon; color: string }) {
  const common = "h-6 w-6"
  switch (icon) {
    case "aadhaar":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="8" stroke={color} strokeWidth="1.8" />
          <path d="M8 12C8 12 10 8 12 8C14 8 16 12 16 12" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
          <path d="M8 14C8 14 10 18 12 18C14 18 16 14 16 14" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      )
    case "pan":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none">
          <rect x="5" y="6" width="14" height="12" rx="2" stroke={color} strokeWidth="1.8" />
          <circle cx="12" cy="12" r="2.5" fill={color} />
        </svg>
      )
    case "gstin":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none">
          <path d="M6 18V8L12 4L18 8V18H6Z" stroke={color} strokeWidth="1.8" strokeLinejoin="round" />
          <rect x="10" y="12" width="4" height="6" fill={color} />
        </svg>
      )
    case "driving-licence":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none">
          <rect x="4" y="6" width="16" height="12" rx="2" stroke={color} strokeWidth="1.8" />
          <circle cx="9" cy="12" r="2" fill={color} />
          <path d="M13 10H18M13 14H16" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      )
    case "udyam":
    case "utilities":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none">
          <path d="M4 10H20V18H4V10Z" stroke={color} strokeWidth="1.8" />
          <path d="M8 10V7H16V10" stroke={color} strokeWidth="1.8" />
          <rect x="9" y="13" width="6" height="5" fill={color} />
        </svg>
      )
    case "rc":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none">
          <path d="M4 14H18L16 10H6L4 14Z" fill={color} />
          <circle cx="8" cy="16" r="1.5" fill={color} />
          <circle cx="14" cy="16" r="1.5" fill={color} />
        </svg>
      )
    case "more":
    default:
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none">
          <circle cx="7" cy="12" r="1.5" fill={color} />
          <circle cx="12" cy="12" r="1.5" fill={color} />
          <circle cx="17" cy="12" r="1.5" fill={color} />
        </svg>
      )
  }
}

function StatIcon({ type, color }: { type: string; color: string }) {
  if (type === "pending") {
    return (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none">
        <path
          d="M7 3H17V7L12 12L17 17V21H7V17L12 12L7 7V3Z"
          stroke={color}
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
      </svg>
    )
  }
  if (type === "completed") {
    return (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="8" stroke={color} strokeWidth="2" />
        <path d="M9 12L11 14L15 10" stroke={color} strokeWidth="2" strokeLinecap="round" />
      </svg>
    )
  }
  if (type === "draft") {
    return (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none">
        <path d="M6 18L16 8L18 10L8 20H6V18Z" fill={color} />
      </svg>
    )
  }
  return <FileText className="h-6 w-6" style={{ color }} strokeWidth={2} />
}

function TemplateCard({ template, compact }: { template: DashboardTemplate; compact?: boolean }) {
  return (
    <button
      type="button"
      className={cn(
        "flex flex-col items-center justify-center rounded-[12px] border border-[#E2E8F0] bg-white text-center shadow-[0_1px_3px_rgba(15,23,42,0.06)]",
        compact ? "min-h-[88px] w-[92px] shrink-0 px-2 py-2.5" : "min-h-[88px] px-1.5 py-2.5"
      )}
    >
      <TemplateIcon icon={template.icon} />
      <span className={cn("mt-2 font-medium leading-tight text-[#334155]", compact ? "text-[10px]" : "text-[10px]")}>
        {template.label}
      </span>
    </button>
  )
}

function BottomNav() {
  return (
    <nav className="w-full shrink-0 border-t border-[#E2E8F0] bg-white pb-[max(8px,env(safe-area-inset-bottom))] pt-2">
      <div className="relative grid grid-cols-5 items-end px-2">
        <button type="button" className="flex flex-col items-center gap-1 py-1">
          <Home className="h-[22px] w-[22px] text-[#2563EB]" strokeWidth={2.2} />
          <span className="text-[10px] font-semibold text-[#2563EB]">Home</span>
        </button>
        <button type="button" className="flex flex-col items-center gap-1 py-1">
          <FileText className="h-[22px] w-[22px] text-[#94A3B8]" strokeWidth={2} />
          <span className="text-[10px] font-medium text-[#94A3B8]">My Agreements</span>
        </button>
        <div className="relative flex flex-col items-center">
          <button
            type="button"
            aria-label="Create Agreement"
            className="-mt-7 flex h-[56px] w-[56px] items-center justify-center rounded-full bg-[#2563EB] shadow-[0_8px_20px_rgba(37,99,235,0.35)]"
          >
            <Plus className="h-7 w-7 text-white" strokeWidth={2.5} />
          </button>
          <span className="mt-1 text-[10px] font-medium text-[#64748B]">Create Agreement</span>
        </div>
        <button type="button" className="flex flex-col items-center gap-1 py-1">
          <Shield className="h-[22px] w-[22px] text-[#94A3B8]" strokeWidth={2} />
          <span className="text-[10px] font-medium text-[#94A3B8]">Verification</span>
        </button>
        <button type="button" className="flex flex-col items-center gap-1 py-1">
          <User className="h-[22px] w-[22px] text-[#94A3B8]" strokeWidth={2} />
          <span className="text-[10px] font-medium text-[#94A3B8]">Profile</span>
        </button>
      </div>
    </nav>
  )
}

export function DashboardScreen({ config }: DashboardScreenProps) {
  const HeroIllustration =
    DASHBOARD_HEROES[config.id as keyof typeof DASHBOARD_HEROES] ?? DASHBOARD_HEROES.mobile
  const verificationServices = config.verificationServices ?? DEFAULT_VERIFICATION_SERVICES
  const templateLayout = config.templateLayout ?? "grid"
  const templateGridCols = config.templateGridCols ?? 4

  return (
    <MobileScreen className="bg-[#F8FAFC]">
      <StatusBar />
      <AppHeader showBack={false} />

      <div className="flex flex-1 flex-col overflow-hidden bg-[#F8FAFC]">
        <div className="flex-1 overflow-y-auto">
        <section className={cn("mx-4 mt-1 overflow-hidden rounded-[16px] bg-gradient-to-br", config.heroGradient)}>
          <div className="p-4 pb-3">
            <div className="flex items-start gap-2">
              <div className="min-w-0 flex-1">
                <p className="text-[13px] font-medium text-[#334155]">{config.greeting}</p>
                <h1 className="mt-1.5 text-[20px] font-bold leading-[1.25] tracking-[-0.02em] text-[#0F172A]">
                  {config.headlinePrefix}{" "}
                  <span style={{ color: config.highlightColor }}>{config.headlineHighlight}</span>{" "}
                  {config.headlineSuffix}
                </h1>
                <p className="mt-2 text-[12px] leading-[1.45] text-[#64748B]">{config.subtext}</p>
              </div>
              <div className="shrink-0">
                <HeroIllustration className="h-[92px] w-[100px]" aria-hidden="true" />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-white/70 px-3 py-2.5">
            {HERO_FEATURES.map(({ label, color, Icon }) => (
              <div key={label} className="flex flex-col items-center gap-1 px-1">
                <Icon className="h-4 w-4" style={{ color }} strokeWidth={2.2} />
                <span className="text-center text-[9px] font-medium leading-tight text-[#475569]">{label}</span>
              </div>
            ))}
          </div>
        </section>

        {config.templates && config.templatesTitle && (
          <section className="mt-5 px-4">
            <div className="mb-3 flex items-center justify-between gap-2">
              <h2 className="text-[15px] font-bold text-[#0F172A]">{config.templatesTitle}</h2>
              <button type="button" className="shrink-0 text-[13px] font-semibold text-[#2563EB]">
                View All
              </button>
            </div>

            {templateLayout === "scroll" ? (
              <div className="flex gap-2.5 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {config.templates.map((template) => (
                  <TemplateCard key={template.label} template={template} compact />
                ))}
              </div>
            ) : (
              <div className={cn("grid gap-2.5", templateGridCols === 5 ? "grid-cols-5" : "grid-cols-4")}>
                {config.templates.map((template) => (
                  <TemplateCard key={template.label} template={template} />
                ))}
              </div>
            )}
          </section>
        )}

        {config.rentalCategories && config.rentalCategoriesTitle && (
          <section className="mt-5 px-4">
            <h2 className="mb-3 text-[15px] font-bold text-[#0F172A]">{config.rentalCategoriesTitle}</h2>
            <div className="flex gap-3 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {config.rentalCategories.map((category) => (
                <button
                  key={category.label}
                  type="button"
                  className="flex w-[148px] shrink-0 flex-col items-center rounded-[12px] border border-[#E2E8F0] bg-white px-3 py-4 text-center shadow-[0_1px_3px_rgba(15,23,42,0.06)]"
                >
                  <RentalCategoryIcon icon={category.icon} />
                  <span className="mt-2 text-[13px] font-bold text-[#0F172A]">{category.label}</span>
                  <span className="mt-1 text-[10px] leading-[1.35] text-[#64748B]">{category.description}</span>
                </button>
              ))}
            </div>
          </section>
        )}

        <section className="mt-5 px-4">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-[15px] font-bold text-[#0F172A]">My Agreements Overview</h2>
            <button type="button" className="text-[13px] font-semibold text-[#2563EB]">
              View All
            </button>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {AGREEMENT_STATS.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col rounded-[12px] border border-[#E2E8F0] bg-white px-2 py-3 shadow-[0_1px_3px_rgba(15,23,42,0.06)]"
              >
                <StatIcon type={stat.icon} color={stat.color} />
                <span className="mt-2 text-[10px] font-medium leading-tight text-[#64748B]">{stat.label}</span>
                <span className="mt-1 text-[18px] font-bold text-[#0F172A]">{stat.value}</span>
                <span className="mt-0.5 text-[9px] text-[#94A3B8]">{stat.subtext}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-5 px-4">
          <h2 className="mb-3 text-[15px] font-bold text-[#0F172A]">Our Verification Services</h2>
          <div className="flex gap-3 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {verificationServices.map((service: VerificationService) => (
              <button
                key={service.label}
                type="button"
                className="flex w-[72px] shrink-0 flex-col items-center gap-2"
              >
                <div
                  className="flex h-[52px] w-[52px] items-center justify-center rounded-full"
                  style={{ backgroundColor: `${service.color}18` }}
                >
                  <VerificationServiceIcon icon={service.icon} color={service.color} />
                </div>
                <span className="text-center text-[10px] font-medium leading-tight text-[#475569]">
                  {service.label}
                </span>
              </button>
            ))}
          </div>
        </section>

        <section className="mx-4 mt-5 flex items-center gap-3 rounded-[12px] bg-[#EFF6FF] px-4 py-3">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M12 2L20 5.5V11C20 15.4 16.8 19.2 12 20.5C7.2 19.2 4 15.4 4 11V5.5L12 2Z" fill="#2563EB" />
            <path d="M9 12L11 14L15 10" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
          <div className="min-w-0 flex-1">
            <p className="text-[13px] font-bold text-[#2563EB]">Secure • Reliable • 100% Digital</p>
            <p className="text-[11px] leading-[1.4] text-[#64748B]">
              Your data is safe with us and used only for verification purposes.
            </p>
          </div>
          <Lock className="h-5 w-5 shrink-0 text-[#2563EB]" strokeWidth={2} />
        </section>
        </div>

        <BottomNav />
      </div>
    </MobileScreen>
  )
}
