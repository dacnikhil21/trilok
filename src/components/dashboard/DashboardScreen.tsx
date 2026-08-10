"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { FileText, ShieldCheck, Lock, Clock } from "lucide-react"
import { cn } from "@/lib/utils"
import { AppShell } from "@/components/layout/AppShell"
import { AppBottomNav } from "@/components/layout/AppBottomNav"
import { AppHeader } from "@/components/layout/AppHeader"
import {
  DashboardSectionHeader,
  DashboardTemplateGrid,
  DashboardStatGrid,
} from "@/components/dashboard/DashboardPrimitives"
import { DASHBOARD_HEROES } from "@/components/icons/DashboardHeroes"
import { Icon3D } from "@/components/icons/Icon3D"
import {
  AGREEMENT_STATS,
  DEFAULT_VERIFICATION_SERVICES,
  type DashboardConfig,
  type VerificationService,
} from "@/lib/dashboard-configs"

interface DashboardScreenProps {
  config: DashboardConfig
}

const HERO_FEATURES = [
  { label: "Legally Recognised", color: "#22C55E", Icon: ShieldCheck },
  { label: "eSign Secure", color: "#2563EB", Icon: Lock },
  { label: "Time Stamped", color: "#A855F7", Icon: Clock },
] as const

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

export function DashboardScreen({ config }: DashboardScreenProps) {
  const router = useRouter()
  const HeroIllustration =
    DASHBOARD_HEROES[config.id as keyof typeof DASHBOARD_HEROES] ?? DASHBOARD_HEROES.mobile
  const verificationServices = config.verificationServices ?? DEFAULT_VERIFICATION_SERVICES
  const templateLayout = config.templateLayout ?? "grid"
  const templateGridCols = config.templateGridCols ?? 3

  return (
    <AppShell
      backgroundClassName="bg-[#F8FAFC]"
      header={<AppHeader showBack={false} />}
      bottomBar={
        <AppBottomNav
          activeTab="home"
          onCreateAgreement={() => router.push("/create-agreement?module=b2c")}
        />
      }
      contentClassName="pb-4"
    >
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
            <DashboardSectionHeader title={config.templatesTitle} />
            <DashboardTemplateGrid
              items={config.templates}
              columns={templateGridCols}
              layout={templateLayout}
              renderIcon={(template) => <Icon3D name={template.icon} size="xl" alt={template.label} bare />}
            />
          </section>
        )}

        {config.rentalCategories && config.rentalCategoriesTitle && (
          <section className="mt-5 px-4">
            <h2 className="mb-3 text-[16px] font-extrabold text-[#0F172A]">{config.rentalCategoriesTitle}</h2>
            <div className="flex gap-3 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {config.rentalCategories.map((category) => (
                <button
                  key={category.label}
                  type="button"
                  className="flex w-[132px] shrink-0 flex-col items-center rounded-[14px] border border-[#E2E8F0] bg-white px-3 py-4 text-center shadow-[0_2px_8px_rgba(15,23,42,0.06)] active:scale-[0.98]"
                >
                  <Icon3D name={category.icon} size="hero" alt={category.label} />
                  <span className="mt-2.5 text-[12px] font-extrabold text-[#0F172A]">{category.label}</span>
                  <span className="mt-1 text-[10px] leading-[1.35] text-[#64748B]">{category.description}</span>
                </button>
              ))}
            </div>
          </section>
        )}

        <section className="mt-5 px-4">
          <DashboardSectionHeader title="My Agreements Overview" />
          <DashboardStatGrid stats={AGREEMENT_STATS} renderIcon={(icon, color) => <StatIcon type={icon} color={color} />} />
        </section>

        <section className="mt-5 px-4">
          <h2 className="mb-3 text-[15px] font-bold text-[#0F172A]">Our Verification Services</h2>
          <div className="flex gap-3 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {verificationServices.map((service: VerificationService) => (
              <button
                key={service.label}
                type="button"
                className="flex w-[88px] shrink-0 flex-col items-center gap-2 rounded-[12px] bg-white p-2 shadow-[0_1px_4px_rgba(15,23,42,0.06)]"
              >
                <Icon3D name={service.icon} size="xl" alt={service.label} />
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
    </AppShell>
  )
}
