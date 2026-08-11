"use client"

import * as React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { AppShell } from "@/components/layout/AppShell"
import { AppHeader } from "@/components/layout/AppHeader"
import { AppBottomNav } from "@/components/layout/AppBottomNav"
import { cn } from "@/lib/utils"
import { getB2CCreateUrl } from "@/lib/b2c-dashboard-routes"
import { getB2CDashboard } from "@/lib/b2c-session"
import { getAgreements, type AgreementRecord } from "@/lib/b2c-agreements"

const FILTERS = ["All", "Pending", "Completed", "Draft"] as const

const STATUS_STYLE: Record<string, string> = {
  Pending: "bg-[#FFF7ED] text-[#EA580C]",
  Completed: "bg-[#F0FDF4] text-[#16A34A]",
  Draft: "bg-[#FAF5FF] text-[#9333EA]",
}

function AgreementsContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const moduleType = searchParams.get("module") || "b2c"
  const isB2C = moduleType === "b2c"
  const [filter, setFilter] = React.useState<(typeof FILTERS)[number]>("All")
  const [b2cDashboard, setB2cDashboard] = React.useState("mobile")
  const [items, setItems] = React.useState<AgreementRecord[]>([])

  React.useEffect(() => {
    if (isB2C) setB2cDashboard(getB2CDashboard())
    setItems(getAgreements())
  }, [isB2C])

  const b2cHomePath = `/dashboard/${b2cDashboard}`
  const b2cCreatePath = getB2CCreateUrl(b2cDashboard)

  const filtered =
    filter === "All" ? items : items.filter((a) => a.status === filter)

  return (
    <AppShell
      backgroundClassName="bg-[#F8FAFC]"
      header={<AppHeader showBack={false} />}
      bottomBar={
        <AppBottomNav
          activeTab="agreements"
          onCreateAgreement={() =>
            router.push(isB2C ? b2cCreatePath : `/create-agreement?module=${moduleType}`)
          }
          onTabChange={(tab) => {
            if (tab === "home") {
              router.push(isB2C ? b2cHomePath : "/dashboard?module=c2c")
            }
            if (tab === "verification") router.push(`/verify-identity?module=${moduleType}`)
            if (tab === "profile") router.push(`/profile?module=${moduleType}`)
          }}
        />
      }
      contentClassName="px-4 pb-6 pt-2"
    >
      <h1 className="text-[20px] font-bold text-[#0F172A]">My Agreements</h1>
      <p className="mt-0.5 text-[13px] text-[#64748B]">Track and manage all your agreements</p>

      <div className="mt-4 flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {FILTERS.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            className={cn(
              "shrink-0 rounded-full px-4 py-2 text-[12px] font-semibold transition-colors",
              filter === f ? "bg-[#2563EB] text-white" : "bg-white text-[#64748B] shadow-[0_1px_3px_rgba(15,23,42,0.06)]"
            )}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="mt-4 space-y-3">
        {filtered.length === 0 ? (
          <div className="rounded-[16px] bg-white px-4 py-8 text-center shadow-[0_2px_12px_rgba(15,23,42,0.06)]">
            <p className="text-[14px] font-semibold text-[#0F172A]">No agreements yet</p>
            <p className="mt-1 text-[12px] text-[#64748B]">Create your first agreement from the dashboard.</p>
          </div>
        ) : (
          filtered.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => router.push(`/agreements/${item.id}?module=${moduleType}`)}
              className="flex w-full flex-col rounded-[16px] bg-white px-4 py-3.5 text-left shadow-[0_2px_12px_rgba(15,23,42,0.06)] active:scale-[0.99]"
            >
              <div className="flex items-start justify-between gap-2">
                <p className="text-[14px] font-bold text-[#0F172A]">{item.title}</p>
                <span className={cn("shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold", STATUS_STYLE[item.status])}>
                  {item.status}
                </span>
              </div>
              <p className="mt-1 text-[12px] text-[#64748B]">{item.party}</p>
              <div className="mt-2 flex items-center justify-between text-[11px]">
                <span className="text-[#94A3B8]">{item.date}</span>
                <span className="font-bold text-[#0F172A]">{item.amount}</span>
              </div>
            </button>
          ))
        )}
      </div>
    </AppShell>
  )
}

export default function AgreementsPage() {
  return (
    <React.Suspense
      fallback={
        <div className="mobile-app-shell flex items-center justify-center bg-[#F8FAFC]">
          <span className="h-8 w-8 animate-spin rounded-full border-4 border-[#2563EB] border-t-transparent" />
        </div>
      }
    >
      <AgreementsContent />
    </React.Suspense>
  )
}
