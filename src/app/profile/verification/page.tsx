"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { ShieldCheck, CheckCircle2, Building2, IdCard } from "lucide-react"
import { AppShell } from "@/components/layout/AppShell"
import { AppHeader } from "@/components/layout/AppHeader"
import { getB2CProfile } from "@/lib/b2c-session"

export default function VerificationStatusPage() {
  const router = useRouter()
  const profile = getB2CProfile()

  const items = [
    { icon: IdCard, label: "Aadhaar eKYC", status: "Verified", done: true },
    { icon: Building2, label: "Business (GST / Udyam)", status: "Verified", done: true },
    { icon: ShieldCheck, label: "Merchant Tag", status: profile.verified ? "Active" : "Pending", done: profile.verified },
  ]

  return (
    <AppShell
      backgroundClassName="bg-[#F8FAFC]"
      header={<AppHeader showBack onBack={() => router.push("/profile?module=b2c")} />}
      contentClassName="px-4 pb-6 pt-2"
    >
      <h1 className="text-[20px] font-bold text-[#0F172A]">Verification Status</h1>
      <p className="mt-0.5 text-[13px] text-[#64748B]">Your business verification summary</p>

      <div className="mt-4 rounded-[16px] bg-gradient-to-br from-[#16A34A] to-[#15803D] px-4 py-5 text-white shadow-[0_4px_20px_rgba(22,163,74,0.25)]">
        <div className="flex items-center gap-3">
          <CheckCircle2 className="h-10 w-10 text-white" strokeWidth={2.2} />
          <div>
            <p className="text-[16px] font-bold">Business Verified</p>
            <p className="text-[12px] text-green-100">Ready to create agreements</p>
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
        onClick={() => router.push("/verify-identity?module=b2c")}
        className="mt-4 flex h-[48px] w-full items-center justify-center rounded-[12px] border border-[#BFDBFE] bg-[#EFF6FF] text-[14px] font-semibold text-[#2563EB] active:bg-[#DBEAFE]"
      >
        View Verification Flow
      </button>
    </AppShell>
  )
}
