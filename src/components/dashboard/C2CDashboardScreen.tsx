"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { ShieldCheck, Lock, Clock } from "lucide-react"
import { AppShell } from "@/components/layout/AppShell"
import { AppHeader } from "@/components/layout/AppHeader"
import { AppBottomNav } from "@/components/layout/AppBottomNav"
import { MobileDashboardHero } from "@/components/layout/MobileListPrimitives"
import { DashboardHeroArt } from "@/components/icons/DashboardHeroes"
import {
  DashboardAgreementTypeCards,
  DashboardTrustStrip,
  DashboardVerificationGrid,
} from "@/components/dashboard/DashboardPrimitives"
import { AGREEMENT_TYPES, C2C_VERIFICATION_SERVICES } from "@/lib/c2c-config"
import { setC2CFromDashboard, clearC2CFromDashboard } from "@/lib/c2c-session"

const C2C_HERO_IMAGE = "/assets/dashboards/heroes/c2c-hero.png"

const HERO_FEATURES = [
  { label: "Legally Recognised", sublabel: "Valid & Compliant", color: "#22C55E", Icon: ShieldCheck },
  { label: "eSign Secure", sublabel: "Digital Signatures", color: "#2563EB", Icon: Lock },
  { label: "Time Stamped", sublabel: "Accurate Records", color: "#A855F7", Icon: Clock },
] as const

interface C2CDashboardScreenProps {
  userName?: string
}

export function C2CDashboardScreen({ userName = "Ravi Kumar" }: C2CDashboardScreenProps) {
  const router = useRouter()

  return (
    <AppShell
      backgroundClassName="bg-white"
      header={<AppHeader showBack={false} />}
      bottomBar={
        <AppBottomNav
          activeTab="home"
          onCreateAgreement={() => {
            clearC2CFromDashboard()
            router.push("/create-agreement?module=c2c")
          }}
          onTabChange={(tab) => {
            if (tab === "verification") router.push("/verify-identity?module=c2c")
            if (tab === "home") router.push("/dashboard?module=c2c")
            if (tab === "agreements") router.push("/agreements?module=c2c")
            if (tab === "profile") router.push("/profile?module=c2c")
          }}
        />
      }
      contentClassName="pb-4"
    >
      <MobileDashboardHero
        greeting={`Hello, ${userName} 👋`}
        headline="Create, eSign & manage your "
        headlineHighlight="agreements"
        headlineSuffix="securely"
        highlightColor="#2563EB"
        gradientClass="from-[#BFDBFE]/90 via-[#DBEAFE]/55 to-white"
        glowClassName="bg-[#60A5FA]/40"
        icon={
          <DashboardHeroArt
            src={C2C_HERO_IMAGE}
            alt="Secure digital agreements"
          />
        }
        features={HERO_FEATURES.map(({ label, sublabel, color, Icon }) => ({
          label,
          sublabel,
          color,
          icon: <Icon className="h-[22px] w-[22px]" strokeWidth={2.2} />,
        }))}
      />

      <section className="mt-4 px-4">
        <h2 className="text-[16px] font-bold tracking-[-0.01em] text-[#0F172A]">Create New Agreement</h2>
        <p className="mt-0.5 text-[12px] text-[#64748B]">Choose a category to get started</p>
        <div className="mt-2.5">
          <DashboardAgreementTypeCards
            types={AGREEMENT_TYPES}
            onSelect={(typeId) => {
              setC2CFromDashboard()
              router.push(`/create-agreement?module=c2c&type=${typeId}&from=dashboard`)
            }}
          />
        </div>
      </section>

      <section className="mt-5 px-4">
        <h2 className="text-[14px] font-bold leading-snug text-[#0F172A]">
          Verify Business/shops or Customer Identities
        </h2>
        <p className="mt-0.5 text-[11px] text-[#64748B]">With trusted E-services</p>
        <div className="mt-2.5">
          <DashboardVerificationGrid
            services={C2C_VERIFICATION_SERVICES}
            onSelect={(service) =>
              router.push(`/verify-identity?module=c2c&service=${service.icon}`)
            }
          />
        </div>
      </section>

      <DashboardTrustStrip />
    </AppShell>
  )
}
