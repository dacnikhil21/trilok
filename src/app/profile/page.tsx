"use client"

import * as React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { ChevronRight, Building2, Phone, Mail, Shield, LogOut } from "lucide-react"
import { AppShell } from "@/components/layout/AppShell"
import { AppHeader } from "@/components/layout/AppHeader"
import { AppBottomNav } from "@/components/layout/AppBottomNav"

function ProfileContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const moduleType = searchParams.get("module") || "b2c"
  const isB2C = moduleType === "b2c"

  const rows = [
    { icon: Building2, label: "Business Details", sub: isB2C ? "Ravi Mobiles" : "Personal Account" },
    { icon: Phone, label: "Mobile Number", sub: "+91 98765 43210" },
    { icon: Mail, label: "Email", sub: "ravi@example.com" },
    { icon: Shield, label: "Verification Status", sub: "Verified" },
  ]

  return (
    <AppShell
      backgroundClassName="bg-[#F8FAFC]"
      header={<AppHeader showBack={false} />}
      bottomBar={
        <AppBottomNav
          activeTab="profile"
          onCreateAgreement={() => router.push(`/create-agreement?module=${moduleType}`)}
          onTabChange={(tab) => {
            if (tab === "home") router.push(isB2C ? "/dashboard/mobile" : "/dashboard?module=c2c")
            if (tab === "agreements") router.push(`/agreements?module=${moduleType}`)
            if (tab === "verification") router.push(`/verify-identity?module=${moduleType}`)
          }}
        />
      }
      contentClassName="px-4 pb-6 pt-2"
    >
      <div className="rounded-[16px] bg-gradient-to-br from-[#2563EB] to-[#1D4ED8] px-4 py-5 text-white shadow-[0_4px_20px_rgba(37,99,235,0.25)]">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/20 text-[22px] font-bold">
          {isB2C ? "RM" : "RK"}
        </div>
        <h1 className="mt-3 text-[18px] font-bold">{isB2C ? "Ravi Mobiles" : "Ravi Kumar"}</h1>
        <p className="mt-0.5 text-[12px] text-blue-100">{isB2C ? "B2C Merchant • Mobile & Electronics" : "C2C Personal Account"}</p>
      </div>

      <div className="mt-5 overflow-hidden rounded-[16px] bg-white shadow-[0_2px_12px_rgba(15,23,42,0.06)]">
        {rows.map(({ icon: Icon, label, sub }, i) => (
          <button
            key={label}
            type="button"
            className={`flex w-full items-center gap-3 px-4 py-3.5 text-left active:bg-[#F8FAFC] ${i > 0 ? "border-t border-[#F1F5F9]" : ""}`}
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#EFF6FF]">
              <Icon className="h-5 w-5 text-[#2563EB]" strokeWidth={2} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[14px] font-semibold text-[#0F172A]">{label}</p>
              <p className="text-[12px] text-[#64748B]">{sub}</p>
            </div>
            <ChevronRight className="h-4 w-4 text-[#CBD5E1]" />
          </button>
        ))}
      </div>

      <button
        type="button"
        onClick={() => router.push("/login")}
        className="mt-5 flex w-full items-center justify-center gap-2 rounded-[14px] border border-[#FEE2E2] bg-white py-3.5 text-[14px] font-semibold text-[#DC2626] active:bg-red-50"
      >
        <LogOut className="h-4 w-4" />
        Sign Out
      </button>
    </AppShell>
  )
}

export default function ProfilePage() {
  return (
    <React.Suspense
      fallback={
        <div className="mobile-app-shell flex items-center justify-center bg-[#F8FAFC]">
          <span className="h-8 w-8 animate-spin rounded-full border-4 border-[#2563EB] border-t-transparent" />
        </div>
      }
    >
      <ProfileContent />
    </React.Suspense>
  )
}
