"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { AppShell } from "@/components/layout/AppShell"
import { AppHeader } from "@/components/layout/AppHeader"
import { getB2CProfile, setB2CProfile } from "@/lib/b2c-session"
import { getCategoryById } from "@/lib/categories"

export default function BusinessDetailsPage() {
  const router = useRouter()
  const [form, setForm] = React.useState(() => getB2CProfile())
  const category = getCategoryById(form.categoryId)

  const handleSave = () => {
    setB2CProfile(form)
    router.push("/profile?module=b2c")
  }

  return (
    <AppShell
      backgroundClassName="bg-[#F8FAFC]"
      header={<AppHeader showBack onBack={() => router.push("/profile?module=b2c")} />}
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
      <h1 className="text-[20px] font-bold text-[#0F172A]">Business Details</h1>
      <p className="text-[13px] text-[#64748B]">Manage your shop information</p>

      <div className="space-y-3 rounded-[16px] bg-white p-4 shadow-[0_2px_12px_rgba(15,23,42,0.06)]">
        <Field label="Business Name" value={form.businessName} onChange={(v) => setForm((f) => ({ ...f, businessName: v }))} />
        <Field label="Business Category" value={category?.title ?? "—"} readOnly />
        <Field label="GST / Udyam Number" value={form.gstNumber} onChange={(v) => setForm((f) => ({ ...f, gstNumber: v }))} />
        <Field label="Business Address" value={form.address} onChange={(v) => setForm((f) => ({ ...f, address: v }))} multiline />
      </div>
    </AppShell>
  )
}

function Field({
  label,
  value,
  onChange,
  readOnly,
  multiline,
}: {
  label: string
  value: string
  onChange?: (v: string) => void
  readOnly?: boolean
  multiline?: boolean
}) {
  return (
    <div className="space-y-1.5">
      <label className="text-[12px] font-semibold text-[#64748B]">{label}</label>
      {multiline ? (
        <textarea
          value={value}
          readOnly={readOnly}
          onChange={(e) => onChange?.(e.target.value)}
          className="min-h-[80px] w-full rounded-[12px] border border-[#E2E8F0] px-3 py-2.5 text-[14px] font-medium text-[#0F172A] focus:border-[#2563EB] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20"
        />
      ) : (
        <input
          value={value}
          readOnly={readOnly}
          onChange={(e) => onChange?.(e.target.value)}
          className="h-[48px] w-full rounded-[12px] border border-[#E2E8F0] px-3 text-[14px] font-medium text-[#0F172A] read-only:bg-[#F8FAFC] focus:border-[#2563EB] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20"
        />
      )}
    </div>
  )
}
