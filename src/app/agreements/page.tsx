"use client"

import * as React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Search, ChevronRight, FileText, CheckCircle2, Clock, Smartphone, Car, Sofa, Package } from "lucide-react"
import { AppShell } from "@/components/layout/AppShell"
import { AppHeader } from "@/components/layout/AppHeader"
import { AppBottomNav } from "@/components/layout/AppBottomNav"
import { cn } from "@/lib/utils"
import { resolveAppModule, type AppModule } from "@/lib/app-module"
import { getB2CCreateUrl } from "@/lib/b2c-dashboard-routes"
import { getB2CDashboard } from "@/lib/b2c-session"
import { getAgreements, type AgreementRecord } from "@/lib/b2c-agreements"

const FILTERS = ["All", "Pending", "Completed"] as const

function getCategoryIcon(title: string = "", category: string = "") {
  const lower = (title + " " + category).toLowerCase()
  if (lower.includes("bike") || lower.includes("car") || lower.includes("vehicle")) {
    return { icon: Car, bg: "bg-[#EFF6FF]", color: "text-[#2563EB]" }
  }
  if (lower.includes("furniture") || lower.includes("sofa") || lower.includes("table")) {
    return { icon: Sofa, bg: "bg-[#FFF7ED]", color: "text-[#EA580C]" }
  }
  if (lower.includes("phone") || lower.includes("mobile") || lower.includes("laptop") || lower.includes("electronics")) {
    return { icon: Smartphone, bg: "bg-[#F5F3FF]", color: "text-[#7C3AED]" }
  }
  return { icon: Package, bg: "bg-[#F0FDF4]", color: "text-[#16A34A]" }
}

function AgreementsContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const moduleType: AppModule = resolveAppModule(searchParams.get("module"))
  const isB2C = moduleType === "b2c"
  const [filter, setFilter] = React.useState<(typeof FILTERS)[number]>("All")
  const [searchQuery, setSearchQuery] = React.useState("")
  const [b2cDashboard, setB2cDashboard] = React.useState("mobile")
  const [items, setItems] = React.useState<AgreementRecord[]>([])

  React.useEffect(() => {
    if (isB2C) setB2cDashboard(getB2CDashboard())
    setItems(getAgreements(moduleType))
  }, [isB2C, moduleType])

  const b2cHomePath = `/dashboard/${b2cDashboard}`
  const b2cCreatePath = getB2CCreateUrl(b2cDashboard)

  const filtered = items.filter((a) => {
    const matchesFilter = filter === "All" || a.status === filter
    const matchesSearch =
      searchQuery.trim() === "" ||
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.referenceNo?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.party?.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesFilter && matchesSearch
  })

  return (
    <AppShell
      backgroundClassName="bg-[#F8FAFC]"
      header={
        <div className="w-full bg-[#2563EB] text-white shadow-sm shrink-0">
          <div className="flex h-[52px] items-center justify-between px-4">
            <h1 className="text-[17px] font-bold text-white">My Agreements</h1>
            <button
              type="button"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white"
            >
              <Search className="h-4 w-4" />
            </button>
          </div>
        </div>
      }
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
      contentClassName="px-4 pb-6 pt-3"
    >
      {/* Search Input */}
      <div className="relative mb-3">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#94A3B8]" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search agreements by name or ID..."
          className="h-11 w-full rounded-[12px] border border-[#CBD5E1] bg-white pl-10 pr-4 text-[13.5px] font-semibold text-[#0F172A] placeholder-[#94A3B8] shadow-xs focus:border-[#2563EB] focus:outline-none"
        />
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 pb-2">
        {FILTERS.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            className={cn(
              "flex-1 rounded-[10px] py-2 text-[12.5px] font-bold transition-all text-center",
              filter === f
                ? "bg-[#2563EB] text-white shadow-sm"
                : "bg-white text-[#64748B] border border-[#E2E8F0] shadow-xs hover:bg-[#F1F5F9]"
            )}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Agreements Cards List */}
      <div className="mt-3 space-y-3">
        {filtered.length === 0 ? (
          <div className="rounded-[16px] border border-[#E2E8F0] bg-white px-4 py-10 text-center shadow-sm">
            <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-[#EFF6FF] text-[#2563EB]">
              <FileText className="h-6 w-6" />
            </div>
            <p className="text-[15px] font-bold text-[#0F172A]">No agreements found</p>
            <p className="mt-1 text-[12.5px] text-[#64748B]">
              Create a new agreement to start eSigning securely.
            </p>
          </div>
        ) : (
          filtered.map((item) => {
            const cat = getCategoryIcon(item.title, item.category)
            const Icon = cat.icon
            const isCompleted = item.status === "Completed"

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => router.push(`/agreements/${item.id}?module=${moduleType}`)}
                className="flex w-full items-center gap-3.5 rounded-[16px] border border-[#E2E8F0] bg-white p-3.5 text-left shadow-sm hover:border-[#CBD5E1] active:scale-[0.99] transition-all"
              >
                {/* 3D / Category Icon */}
                <div
                  className={cn(
                    "flex h-12 w-12 shrink-0 items-center justify-center rounded-[14px]",
                    cat.bg,
                    cat.color
                  )}
                >
                  <Icon className="h-6 w-6" />
                </div>

                {/* Details */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-1">
                    <p className="text-[14px] font-bold text-[#0F172A] truncate">{item.title}</p>
                    <span
                      className={cn(
                        "shrink-0 rounded-full px-2.5 py-0.5 text-[10.5px] font-extrabold",
                        isCompleted
                          ? "bg-[#DCFCE7] text-[#15803D]"
                          : "bg-[#FEF3C7] text-[#B45309]"
                      )}
                    >
                      {item.status}
                    </span>
                  </div>

                  <p className="text-[11.5px] font-mono text-[#64748B] mt-0.5">
                    {item.referenceNo || `ESA${item.id.slice(-6)}`}
                  </p>

                  <div className="mt-2 flex items-center justify-between text-[12px]">
                    <span className="font-extrabold text-[#0F172A]">{item.amount}</span>
                    <span className="text-[#94A3B8] font-medium">{item.date}</span>
                  </div>
                </div>

                <ChevronRight className="h-4 w-4 text-[#CBD5E1] shrink-0" />
              </button>
            )
          })
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
