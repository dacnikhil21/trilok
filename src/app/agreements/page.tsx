"use client"

import * as React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { AppShell } from "@/components/layout/AppShell"
import { AppHeader } from "@/components/layout/AppHeader"
import { AppBottomNav } from "@/components/layout/AppBottomNav"
import { cn } from "@/lib/utils"

const FILTERS = ["All", "Pending", "Completed", "Draft"] as const

const MOCK_AGREEMENTS = [
  { id: "1", title: "iPhone 14 Pro Sale", party: "Rahul Sharma", status: "Pending", date: "10 Aug 2026", amount: "₹72,000" },
  { id: "2", title: "MacBook Air M2 Sale", party: "Priya Nair", status: "Completed", date: "8 Aug 2026", amount: "₹85,000" },
  { id: "3", title: "Samsung TV 55\"", party: "Amit Patel", status: "Draft", date: "7 Aug 2026", amount: "₹42,000" },
  { id: "4", title: "iPad Air Sale", party: "Sneha Reddy", status: "Completed", date: "5 Aug 2026", amount: "₹38,000" },
]

const STATUS_STYLE: Record<string, string> = {
  Pending: "bg-[#FFF7ED] text-[#EA580C]",
  Completed: "bg-[#F0FDF4] text-[#16A34A]",
  Draft: "bg-[#FAF5FF] text-[#9333EA]",
}

function AgreementsContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const moduleType = searchParams.get("module") || "b2c"
  const [filter, setFilter] = React.useState<(typeof FILTERS)[number]>("All")

  const items =
    filter === "All"
      ? MOCK_AGREEMENTS
      : MOCK_AGREEMENTS.filter((a) => a.status === filter)

  return (
    <AppShell
      backgroundClassName="bg-[#F8FAFC]"
      header={<AppHeader showBack={false} />}
      bottomBar={
        <AppBottomNav
          activeTab="agreements"
          onCreateAgreement={() => router.push(`/create-agreement?module=${moduleType}`)}
          onTabChange={(tab) => {
            if (tab === "home") router.push(moduleType === "c2c" ? "/dashboard?module=c2c" : "/dashboard/mobile")
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
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
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
        ))}
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
