"use client"

import * as React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { ShieldCheck, CheckCircle2, Building2, IdCard, User } from "lucide-react"
import { AppShell } from "@/components/layout/AppShell"
import { AppHeader } from "@/components/layout/AppHeader"
import { getB2CProfile } from "@/lib/b2c-session"
import { getC2CProfile } from "@/lib/c2c-session"
import { resolveAppModule, type AppModule } from "@/lib/app-module"

function VerificationStatusContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const moduleType: AppModule = resolveAppModule(searchParams.get("module"))
  const isB2C = moduleType === "b2c"
  const profilePath = `/profile?module=${moduleType}`

  const b2cProfile = getB2CProfile()
  const c2cProfile = getC2CProfile()
  const verified = isB2C ? b2cProfile.verified : c2cProfile.verified

  const items = isB2C
    ? [
        { icon: IdCard, label: "Aadhaar eKYC", status: "Verified", done: true },
        { icon: Building2, label: "Business (GST / Udyam)", status: "Verified", done: true },
        {
          icon: ShieldCheck,
          label: "Merchant Tag",
          status: verified ? "Active" : "Pending",
          done: verified,
        },
      ]
    : [
        { icon: IdCard, label: "Aadhaar eKYC", status: verified ? "Verified" : "Pending", done: verified },
        { icon: User, label: "Person Verification", status: verified ? "Active" : "Pending", done: verified },
        { icon: ShieldCheck, label: "Digital Agreement Access", status: verified ? "Enabled" : "Pending", done: verified },
      ]

  return (
    <AppShell
      backgroundClassName="bg-[#F8FAFC]"
      header={<AppHeader showBack onBack={() => router.push(profilePath)} />}
      contentClassName="px-4 pb-6 pt-2"
    >
      <h1 className="text-[20px] font-bold text-[#0F172A]">Verification Status</h1>
      <p className="mt-0.5 text-[13px] text-[#64748B]">
        {isB2C ? "Your business verification summary" : "Your personal verification summary"}
      </p>

      <div className="mt-4 rounded-[16px] bg-gradient-to-br from-[#16A34A] to-[#15803D] px-4 py-5 text-white shadow-[0_4px_20px_rgba(22,163,74,0.25)]">
        <div className="flex items-center gap-3">
          <CheckCircle2 className="h-10 w-10 text-white" strokeWidth={2.2} />
          <div>
            <p className="text-[16px] font-bold">
              {isB2C ? "Business Verified" : verified ? "Identity Verified" : "Verification Pending"}
            </p>
            <p className="text-[12px] text-green-100">
              {isB2C ? "Ready to create agreements" : "Verify to create agreements securely"}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-4 overflow-hidden rounded-[16px] bg-white shadow-[0_2px_12px_rgba(15,23,42,0.06)]">
        {items.map(({ icon: Icon, label, status, done }, i) => (
          <div
            key={label}
            className={`flex items-center gap-3 px-4 py-3.5 ${i > 0 ? "border-t border-[#F1F5F9]" : ""}`}
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#EFF6FF]">
              <Icon className="h-5 w-5 text-[#2563EB]" strokeWidth={2} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[14px] font-semibold text-[#0F172A]">{label}</p>
              <p className={`text-[12px] font-semibold ${done ? "text-[#16A34A]" : "text-[#EA580C]"}`}>{status}</p>
            </div>
            {done ? <CheckCircle2 className="h-5 w-5 text-[#16A34A]" /> : null}
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={() => router.push(`/verify-identity?module=${moduleType}`)}
        className="mt-4 flex h-[48px] w-full items-center justify-center rounded-[12px] border border-[#BFDBFE] bg-[#EFF6FF] text-[14px] font-semibold text-[#2563EB] active:bg-[#DBEAFE]"
      >
        View Verification Services
      </button>
    </AppShell>
  )
}

export default function VerificationStatusPage() {
  return (
    <React.Suspense
      fallback={
        <div className="mobile-app-shell flex items-center justify-center bg-[#F8FAFC]">
          <span className="h-8 w-8 animate-spin rounded-full border-4 border-[#2563EB] border-t-transparent" />
        </div>
      }
    >
      <VerificationStatusContent />
    </React.Suspense>
  )
}
