"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { ShieldCheck, Lock, Clock } from "lucide-react"
import { AppShell } from "@/components/layout/AppShell"
import { AppBottomNav } from "@/components/layout/AppBottomNav"
import { AppHeader } from "@/components/layout/AppHeader"
import { MobileDashboardHero, MobileTemplateGrid } from "@/components/layout/MobileListPrimitives"
import {
  DashboardStatGrid,
  DashboardVerificationGrid,
  DashboardTrustStrip,
} from "@/components/dashboard/DashboardPrimitives"
import { resolveDashboardHeroVisual } from "@/components/icons/DashboardHeroes"
import {
  AGREEMENT_STATS,
  DEFAULT_VERIFICATION_SERVICES,
  formatTemplateLabel,
  getTemplateGridItems,
  type DashboardConfig,
  type DashboardTemplate,
} from "@/lib/dashboard-configs"
import { getB2CTemplateCreateUrl, getB2CCreateUrl } from "@/lib/b2c-dashboard-routes"
import { setB2CDashboard, setB2COnboarded, setB2CProfile, mapDashboardToCategoryId } from "@/lib/b2c-session"

interface DashboardScreenProps {
  config: DashboardConfig
}

const HERO_FEATURES = [
  { label: "Legally Recognised", sublabel: "Valid & Compliant", color: "#22C55E", Icon: ShieldCheck },
  { label: "eSign Secure", sublabel: "Digital Signatures", color: "#2563EB", Icon: Lock },
  { label: "Time Stamped", sublabel: "Accurate Records", color: "#A855F7", Icon: Clock },
] as const

export function DashboardScreen({ config }: DashboardScreenProps) {
  const router = useRouter()

  React.useEffect(() => {
    setB2CDashboard(config.id)
    setB2COnboarded()
    setB2CProfile({ categoryId: mapDashboardToCategoryId(config.id) })
  }, [config.id])

  const verificationServices = config.verificationServices ?? DEFAULT_VERIFICATION_SERVICES
  const heroVisual = resolveDashboardHeroVisual(config)
  const templateGridItems =
    config.templates && config.templates.length > 0
      ? getTemplateGridItems(config.templates)
      : []

  const rentalGridItems: DashboardTemplate[] =
    config.rentalCategories?.map((category) => ({
      label: formatTemplateLabel(category.label),
      icon: category.icon,
    })) ?? []

  const homePath = `/dashboard/${config.id}`
  const moduleQuery = "module=b2c"

  const createAgreementPath = getB2CCreateUrl(config.id)

  const handleTabChange = (tab: "home" | "agreements" | "verification" | "profile") => {
    if (tab === "home") router.push(homePath)
    if (tab === "agreements") router.push(`/agreements?${moduleQuery}`)
    if (tab === "verification") router.push(`/verify-identity?${moduleQuery}`)
    if (tab === "profile") router.push(`/profile?${moduleQuery}`)
  }

  const handleTemplateSelect = (item: DashboardTemplate) => {
    router.push(getB2CTemplateCreateUrl(config.id, item.icon))
  }

  return (
    <AppShell
      backgroundClassName="bg-white"
      header={<AppHeader showBack={false} />}
      bottomBar={
        <AppBottomNav
          activeTab="home"
          onCreateAgreement={() => router.push(createAgreementPath)}
          onTabChange={handleTabChange}
        />
      }
      contentClassName="pb-6"
    >
      <MobileDashboardHero
        greeting={config.greeting}
        headline={`${config.headlinePrefix} `}
        headlineHighlight={config.headlineHighlight}
        headlineSuffix={config.headlineSuffix}
        highlightColor={config.highlightColor}
        gradientClass={config.heroGradient}
        icon={heroVisual}
        features={HERO_FEATURES.map(({ label, sublabel, color, Icon }) => ({
          label,
          sublabel,
          color,
          icon: <Icon className="h-[22px] w-[22px]" strokeWidth={2.2} />,
        }))}
      />

      {config.templates && config.templatesTitle && templateGridItems.length > 0 && (
        <section className="mt-5 px-4">
          <h2 className="text-[16px] font-bold tracking-[-0.01em] text-[#0F172A]">
            {config.templatesTitle}
          </h2>
          <div className="mt-4">
            <MobileTemplateGrid items={templateGridItems} onSelect={handleTemplateSelect} />
          </div>
        </section>
      )}

      {config.rentalCategories && config.rentalCategoriesTitle && rentalGridItems.length > 0 && (
        <section className="mt-5 px-4">
          <h2 className="text-[16px] font-bold tracking-[-0.01em] text-[#0F172A]">
            {config.rentalCategoriesTitle}
          </h2>
          <div className="mt-4">
            <MobileTemplateGrid items={rentalGridItems} onSelect={handleTemplateSelect} />
          </div>
        </section>
      )}

      <div className="mt-8 px-4">
        <DashboardStatGrid
          stats={AGREEMENT_STATS}
          viewAllHref={`/agreements?${moduleQuery}`}
        />
      </div>

      <div className="mt-8 px-4">
        <DashboardVerificationGrid
          services={verificationServices}
          viewAllHref={`/verify-identity?${moduleQuery}`}
          onSelect={() => router.push(`/verify-identity?${moduleQuery}`)}
        />
      </div>

      <DashboardTrustStrip />
    </AppShell>
  )
}
