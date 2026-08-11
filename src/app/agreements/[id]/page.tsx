"use client"

import * as React from "react"
import { useRouter, useParams, useSearchParams } from "next/navigation"
import {
  Share2,
  Download,
  FileText,
  User,
  Package,
  IndianRupee,
  MapPin,
  Calendar,
  ChevronRight,
} from "lucide-react"
import { AppShell } from "@/components/layout/AppShell"
import { AppHeader } from "@/components/layout/AppHeader"
import { AppBottomNav } from "@/components/layout/AppBottomNav"
import { cn } from "@/lib/utils"
import { getB2CCreateUrl } from "@/lib/b2c-dashboard-routes"
import { getB2CDashboard } from "@/lib/b2c-session"
import { getAgreementById } from "@/lib/b2c-agreements"
import { resolveAppModule, type AppModule } from "@/lib/app-module"

const STATUS_STYLE: Record<string, string> = {
  Pending: "bg-[#FFF7ED] text-[#EA580C]",
  Completed: "bg-[#F0FDF4] text-[#16A34A]",
  Draft: "bg-[#FAF5FF] text-[#9333EA]",
}

function AgreementDetailContent() {
  const router = useRouter()
  const params = useParams()
  const searchParams = useSearchParams()
  const moduleType: AppModule = resolveAppModule(searchParams.get("module"))
  const isB2C = moduleType === "b2c"
  const id = params.id as string
  const [b2cDashboard, setB2cDashboard] = React.useState("mobile")
  const [agreement, setAgreement] = React.useState(() => getAgreementById(id, moduleType))

  React.useEffect(() => {
    if (isB2C) setB2cDashboard(getB2CDashboard())
    setAgreement(getAgreementById(id, moduleType))
  }, [id, isB2C, moduleType])

  const b2cHomePath = `/dashboard/${b2cDashboard}`
  const b2cCreatePath = getB2CCreateUrl(b2cDashboard)

  if (!agreement) {
    return (
      <AppShell
        backgroundClassName="bg-[#F8FAFC]"
        header={<AppHeader showBack onBack={() => router.push(`/agreements?module=${moduleType}`)} />}
        contentClassName="flex items-center justify-center px-4"
      >
        <p className="text-[14px] font-semibold text-[#64748B]">Agreement not found.</p>
      </AppShell>
    )
  }

  const rows = [
    { icon: Package, label: "Product", value: agreement.productName },
    { icon: FileText, label: "Category", value: agreement.category },
    { icon: User, label: "Other Party", value: agreement.party },
    { icon: IndianRupee, label: "Amount", value: agreement.amount },
    ...(agreement.paymentTerms
      ? [{ icon: FileText, label: "Payment Terms", value: agreement.paymentTerms }]
      : []),
    ...(agreement.deliveryDate
      ? [{ icon: Calendar, label: "Delivery Date", value: agreement.deliveryDate }]
      : []),
    ...(agreement.deliveryLocation
      ? [{ icon: MapPin, label: "Delivery Location", value: agreement.deliveryLocation }]
      : []),
  ]

  return (
    <AppShell
      backgroundClassName="bg-[#F8FAFC]"
      header={<AppHeader showBack onBack={() => router.push(`/agreements?module=${moduleType}`)} />}
      bottomBar={
        <AppBottomNav
          activeTab="agreements"
          onCreateAgreement={() =>
            router.push(isB2C ? b2cCreatePath : `/create-agreement?module=${moduleType}`)
          }
          onTabChange={(tab) => {
            if (tab === "home") router.push(isB2C ? b2cHomePath : "/dashboard?module=c2c")
            if (tab === "verification") router.push(`/verify-identity?module=${moduleType}`)
            if (tab === "profile") router.push(`/profile?module=${moduleType}`)
          }}
        />
      }
      contentClassName="px-4 pb-6 pt-2"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h1 className="text-[20px] font-bold text-[#0F172A]">{agreement.title}</h1>
          <p className="mt-0.5 text-[12px] text-[#64748B]">Ref: {agreement.referenceNo}</p>
        </div>
        <span className={cn("shrink-0 rounded-full px-2.5 py-1 text-[11px] font-bold", STATUS_STYLE[agreement.status])}>
          {agreement.status}
        </span>
      </div>

      <div className="mt-4 rounded-[16px] bg-gradient-to-br from-[#2563EB] to-[#1D4ED8] px-4 py-4 text-white shadow-[0_4px_20px_rgba(37,99,235,0.2)]">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-blue-100">Agreement Value</p>
        <p className="mt-1 text-[28px] font-extrabold">{agreement.amount}</p>
        <p className="mt-1 text-[12px] text-blue-100">Created on {agreement.date}</p>
      </div>

      <div className="mt-4 overflow-hidden rounded-[16px] bg-white shadow-[0_2px_12px_rgba(15,23,42,0.06)]">
        {rows.map(({ icon: Icon, label, value }, i) => (
          <div
            key={label}
            className={cn("flex items-center gap-3 px-4 py-3.5", i > 0 && "border-t border-[#F1F5F9]")}
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#EFF6FF]">
              <Icon className="h-4 w-4 text-[#2563EB]" strokeWidth={2} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-[#94A3B8]">{label}</p>
              <p className="text-[14px] font-semibold text-[#0F172A]">{value}</p>
            </div>
          </div>
        ))}
      </div>

      {(agreement.brand || agreement.model || agreement.serialNumber) && (
        <div className="mt-4 rounded-[16px] bg-white px-4 py-3.5 shadow-[0_2px_12px_rgba(15,23,42,0.06)]">
          <p className="text-[13px] font-bold text-[#0F172A]">Product Details</p>
          <div className="mt-2 space-y-1.5 text-[13px] text-[#64748B]">
            {agreement.brand ? <p>Brand: <span className="font-semibold text-[#0F172A]">{agreement.brand}</span></p> : null}
            {agreement.model ? <p>Model: <span className="font-semibold text-[#0F172A]">{agreement.model}</span></p> : null}
            {agreement.serialNumber ? (
              <p>Serial / IMEI: <span className="font-semibold text-[#0F172A]">{agreement.serialNumber}</span></p>
            ) : null}
          </div>
        </div>
      )}

      <div className="mt-4 grid grid-cols-2 gap-3">
        <button
          type="button"
          className="flex h-[48px] items-center justify-center gap-2 rounded-[12px] border border-[#E2E8F0] bg-white text-[13px] font-semibold text-[#0F172A] active:bg-[#F8FAFC]"
        >
          <Share2 className="h-4 w-4 text-[#2563EB]" />
          Share
        </button>
        <button
          type="button"
          className="flex h-[48px] items-center justify-center gap-2 rounded-[12px] border border-[#E2E8F0] bg-white text-[13px] font-semibold text-[#0F172A] active:bg-[#F8FAFC]"
        >
          <Download className="h-4 w-4 text-[#2563EB]" />
          Download PDF
        </button>
      </div>

      {agreement.status === "Draft" && (
        <button
          type="button"
          onClick={() => router.push(isB2C ? b2cCreatePath : `/create-agreement?module=${moduleType}`)}
          className="mt-4 flex w-full items-center justify-between rounded-[14px] bg-[#EFF6FF] px-4 py-3.5 text-left active:bg-[#DBEAFE]"
        >
          <span className="text-[14px] font-semibold text-[#2563EB]">Continue editing agreement</span>
          <ChevronRight className="h-4 w-4 text-[#2563EB]" />
        </button>
      )}
    </AppShell>
  )
}

export default function AgreementDetailPage() {
  return (
    <React.Suspense
      fallback={
        <div className="mobile-app-shell flex items-center justify-center bg-[#F8FAFC]">
          <span className="h-8 w-8 animate-spin rounded-full border-4 border-[#2563EB] border-t-transparent" />
        </div>
      }
    >
      <AgreementDetailContent />
    </React.Suspense>
  )
}
