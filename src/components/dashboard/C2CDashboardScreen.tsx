"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { ShieldCheck, Lock, Clock } from "lucide-react"
import { AppShell } from "@/components/layout/AppShell"
import { AppHeader } from "@/components/layout/AppHeader"
import { AppBottomNav } from "@/components/layout/AppBottomNav"
import { Icon3D } from "@/components/icons/Icon3D"
import {
  DashboardAgreementTypeCards,
  DashboardTrustStrip,
  DashboardVerificationGrid,
} from "@/components/dashboard/DashboardPrimitives"
import { AGREEMENT_TYPES, C2C_VERIFICATION_SERVICES } from "@/lib/c2c-config"

const HERO_FEATURES = [
  { label: "Legally Recognised", color: "#22C55E", Icon: ShieldCheck },
  { label: "eSign Secure", color: "#2563EB", Icon: Lock },
  { label: "Time Stamped", color: "#A855F7", Icon: Clock },
] as const

interface C2CDashboardScreenProps {
  userName?: string
}

export function C2CDashboardScreen({ userName = "Ravi Kumar" }: C2CDashboardScreenProps) {
  const router = useRouter()

  return (
    <AppShell
      backgroundClassName="bg-[#F8FAFC]"
      header={<AppHeader showBack={false} />}
      bottomBar={
        <AppBottomNav
          activeTab="home"
          onCreateAgreement={() => router.push("/create-agreement?module=c2c")}
          onTabChange={(tab) => {
            if (tab === "verification") router.push("/verify-identity?module=c2c")
            if (tab === "home") router.push("/dashboard?module=c2c")
          }}
        />
      }
      contentClassName="pb-4"
    >
      <section className="mx-4 mt-1 overflow-hidden rounded-[16px] border border-[#E2E8F0]/50 bg-white shadow-[0_2px_12px_rgba(15,23,42,0.06)]">
        <div className="flex items-start gap-3 p-4 pb-3">
          <div className="min-w-0 flex-1">
            <p className="text-[13px] font-medium text-[#64748B]">Hello, {userName} 👋</p>
            <h1 className="mt-1 text-[18px] font-bold leading-[1.3] tracking-[-0.02em] text-[#0F172A]">
              Create, eSign & manage your agreements securely
            </h1>
          </div>
          <Icon3D name="service-agreement" size="xl" alt="Agreements" className="shrink-0" />
        </div>
        <div className="flex items-center justify-between border-t border-[#F1F5F9] bg-[#FAFBFC] px-3 py-2.5">
          {HERO_FEATURES.map(({ label, color, Icon }) => (
            <div key={label} className="flex flex-1 flex-col items-center gap-1 px-0.5">
              <Icon className="h-4 w-4" style={{ color }} strokeWidth={2.2} />
              <span className="text-center text-[10px] font-semibold leading-tight text-[#64748B]">{label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-5 px-4">
        <h2 className="text-[15px] font-bold text-[#0F172A]">Create New Agreement</h2>
        <p className="mt-0.5 text-[11px] text-[#64748B]">Choose a category to get started</p>
        <div className="mt-3">
          <DashboardAgreementTypeCards
            types={AGREEMENT_TYPES}
            onSelect={(typeId) => router.push(`/create-agreement?module=c2c&type=${typeId}`)}
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
            onSelect={() => router.push("/verify-identity?module=c2c")}
          />
        </div>
      </section>

      <DashboardTrustStrip />
    </AppShell>
  )
}
