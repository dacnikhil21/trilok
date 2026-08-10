"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { ShieldCheck, Lock, ChevronRight, Clock } from "lucide-react"
import { cn } from "@/lib/utils"
import { AppShell } from "@/components/layout/AppShell"
import { AppHeader } from "@/components/layout/AppHeader"
import { AppBottomNav } from "@/components/layout/AppBottomNav"
import { Icon3D } from "@/components/icons/Icon3D"
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
      backgroundClassName="bg-[#F1F5F9]"
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
      contentClassName="pb-2"
    >
      <section className="mx-3 mt-2 overflow-hidden rounded-[18px] bg-gradient-to-br from-[#EFF6FF] via-[#F0F9FF] to-[#F8FAFC] shadow-[0_4px_20px_rgba(37,99,235,0.08)]">
        <div className="relative p-4 pb-3">
          <div className="flex items-start gap-3">
            <div className="min-w-0 flex-1">
              <p className="text-[13px] font-semibold text-[#475569]">Hello, {userName} 👋</p>
              <h1 className="mt-1.5 text-[19px] font-extrabold leading-[1.28] tracking-[-0.02em] text-[#0F172A]">
                Create, eSign & manage your agreements securely
              </h1>
            </div>
            <Icon3D name="service-agreement" size="hero" alt="Agreements" />
          </div>
        </div>
        <div className="flex items-stretch justify-between border-t border-white/80 bg-white/50 px-2 py-2.5">
          {HERO_FEATURES.map(({ label, color, Icon }) => (
            <div key={label} className="flex flex-1 flex-col items-center gap-1 px-0.5">
              <Icon className="h-[18px] w-[18px]" style={{ color }} strokeWidth={2.2} />
              <span className="text-center text-[9px] font-semibold leading-tight text-[#475569]">{label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-4 px-3">
        <h2 className="px-1 text-[16px] font-extrabold text-[#0F172A]">Create New Agreement</h2>
        <p className="mt-0.5 px-1 text-[12px] font-medium text-[#64748B]">Choose a category to get started</p>
        <div className="mt-3 space-y-3">
          {AGREEMENT_TYPES.map((type) => (
            <article
              key={type.id}
              className="overflow-hidden rounded-[16px] border border-[#E2E8F0]/80 bg-white shadow-[0_2px_12px_rgba(15,23,42,0.06)]"
            >
              <div className="flex items-center gap-4 p-4">
                <Icon3D name={type.id} size="hero" alt={type.title} />
                <div className="min-w-0 flex-1">
                  <h3 className="text-[15px] font-extrabold text-[#0F172A]">{type.title}</h3>
                  <p className="mt-0.5 text-[12px] leading-snug text-[#64748B]">{type.description}</p>
                </div>
              </div>
              <div className="px-4 pb-4">
                <button
                  type="button"
                  onClick={() => router.push(`/create-agreement?module=c2c&type=${type.id}`)}
                  className={cn(
                    "flex h-[42px] w-full items-center justify-center gap-2 rounded-[10px] text-[13px] font-bold text-white shadow-md active:scale-[0.98]",
                    type.buttonClass
                  )}
                >
                  Create Now
                  <ChevronRight className="h-4 w-4" strokeWidth={2.5} />
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-5 px-3">
        <h2 className="px-1 text-[16px] font-extrabold leading-snug text-[#0F172A]">
          Verify Business/shops or Customer Identities
        </h2>
        <p className="mt-0.5 px-1 text-[12px] font-medium text-[#64748B]">With trusted E-services</p>
        <div className="mt-3 grid grid-cols-2 gap-2.5">
          {C2C_VERIFICATION_SERVICES.map((service) => (
            <button
              key={service.label}
              type="button"
              onClick={() => router.push("/verify-identity?module=c2c")}
              className="flex min-h-[140px] flex-col rounded-[14px] border border-[#E2E8F0] bg-white p-3.5 text-left shadow-[0_2px_8px_rgba(15,23,42,0.05)] active:scale-[0.98]"
            >
              <Icon3D name={service.icon} size="xl" alt={service.label} />
              <span className="mt-2.5 text-[11px] font-bold leading-tight text-[#0F172A]">{service.label}</span>
              <span className="mt-1 flex-1 text-[10px] leading-snug text-[#94A3B8]">{service.description}</span>
              <ChevronRight className="mt-2 h-4 w-4 text-[#2563EB]" />
            </button>
          ))}
        </div>
      </section>

      <section className="mx-3 mt-4 mb-2 flex items-center gap-3 rounded-[14px] bg-[#EFF6FF] px-4 py-3.5 shadow-sm">
        <Icon3D name="aadhaar" size="lg" alt="Secure" />
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
