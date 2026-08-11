"use client"

import * as React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { AppShell } from "@/components/layout/AppShell"
import { AppHeader } from "@/components/layout/AppHeader"
import { getB2CProfile, setB2CProfile } from "@/lib/b2c-session"
import { getC2CProfile, setC2CProfile } from "@/lib/c2c-session"
import { resolveAppModule, type AppModule } from "@/lib/app-module"

function ContactContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const moduleType: AppModule = resolveAppModule(searchParams.get("module"))
  const isB2C = moduleType === "b2c"
  const profilePath = `/profile?module=${moduleType}`

  const [mobile, setMobile] = React.useState("")
  const [email, setEmail] = React.useState("")

  React.useEffect(() => {
    const profile = isB2C ? getB2CProfile() : getC2CProfile()
    setMobile(profile.mobile)
    setEmail(profile.email)
  }, [isB2C])

  const handleSave = () => {
    if (isB2C) {
      setB2CProfile({ mobile, email })
    } else {
      setC2CProfile({ mobile, email })
    }
    router.push(profilePath)
  }

  return (
    <AppShell
      backgroundClassName="bg-[#F8FAFC]"
      header={<AppHeader showBack onBack={() => router.push(profilePath)} />}
      footer={
        <div className="border-t border-[#E2E8F0] bg-white px-4 pt-2.5 pb-[max(10px,env(safe-area-inset-bottom))]">
          <button
            type="button"
            onClick={handleSave}
            className="flex h-[48px] w-full items-center justify-center rounded-[12px] bg-[#2563EB] text-[15px] font-semibold text-white shadow-[0_4px_14px_rgba(37,99,235,0.25)] active:scale-[0.98]"
          >
            Save Changes
          </button>
        </div>
      }
      contentClassName="px-4 pb-6 pt-2 space-y-4"
    >
      <h1 className="text-[20px] font-bold text-[#0F172A]">Contact Details</h1>
      <p className="text-[13px] text-[#64748B]">
        {isB2C ? "Update your business contact details" : "Update your personal contact details"}
      </p>

      <div className="space-y-3 rounded-[16px] bg-white p-4 shadow-[0_2px_12px_rgba(15,23,42,0.06)]">
        <div className="space-y-1.5">
          <label className="text-[12px] font-semibold text-[#64748B]">Mobile Number</label>
          <input
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            className="h-[48px] w-full rounded-[12px] border border-[#E2E8F0] px-3 text-[14px] font-medium text-[#0F172A] focus:border-[#2563EB] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20"
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-[12px] font-semibold text-[#64748B]">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-[48px] w-full rounded-[12px] border border-[#E2E8F0] px-3 text-[14px] font-medium text-[#0F172A] focus:border-[#2563EB] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20"
          />
        </div>
      </div>
    </AppShell>
  )
}

export default function ContactPage() {
  return (
    <React.Suspense
      fallback={
        <div className="mobile-app-shell flex items-center justify-center bg-[#F8FAFC]">
          <span className="h-8 w-8 animate-spin rounded-full border-4 border-[#2563EB] border-t-transparent" />
        </div>
      }
    >
      <ContactContent />
    </React.Suspense>
  )
}
