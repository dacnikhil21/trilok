"use client"

import * as React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Check, ChevronRight, Info, Shield } from "lucide-react"
import { AppShell } from "@/components/layout/AppShell"
import { AppHeader } from "@/components/layout/AppHeader"
import { Icon3D } from "@/components/icons/Icon3D"
import { cn } from "@/lib/utils"
import {
  BUSINESS_CATEGORIES,
  type BusinessCategory,
  type BusinessCategoryId,
} from "@/lib/categories"
import {
  mapDashboardToCategoryId,
  setB2CDashboardFromRoute,
  setB2COnboarded,
  setB2CProfile,
} from "@/lib/b2c-session"

const CATEGORY_ICON_KEYS: Record<BusinessCategoryId, string> = {
  "mobile-electronics": "mobile-electronics",
  "bikes-cars": "bikes-cars",
  "furniture-sale": "furniture-sale",
  "rental-services": "rental-services",
  "service-agreement": "service-agreement",
  others: "others",
}

const CATEGORY_ACCENT: Record<BusinessCategoryId, string> = {
  "mobile-electronics": "#2563EB",
  "bikes-cars": "#64748B",
  "furniture-sale": "#16A34A",
  "rental-services": "#2563EB",
  "service-agreement": "#9333EA",
  others: "#F97316",
}

function BusinessCategoryCard({
  category,
  selected,
  onSelect,
}: {
  category: BusinessCategory
  selected: boolean
  onSelect: () => void
}) {
  const accent = CATEGORY_ACCENT[category.id]

  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "relative flex flex-col rounded-[14px] bg-white p-3 text-left shadow-[0_2px_10px_rgba(15,23,42,0.06)] active:scale-[0.98]",
        selected ? "border-2 border-[#2563EB] shadow-[0_2px_12px_rgba(37,99,235,0.12)]" : "border border-[#E8EDF3]"
      )}
    >
      {selected ? (
        <span className="absolute right-1.5 top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#2563EB] shadow-sm">
          <Check className="h-3 w-3 text-white" strokeWidth={3} />
        </span>
      ) : null}

      <Icon3D
        name={CATEGORY_ICON_KEYS[category.id]}
        size="sm"
        alt={category.title}
        bare
        className="rounded-[14px]"
      />

      <p className="mt-2 pr-4 text-[13px] font-bold leading-[1.2] tracking-[-0.01em] text-[#0F172A]">
        {category.title}
      </p>
      <p className="mt-0.5 line-clamp-2 flex-1 text-[10px] leading-[1.35] text-[#64748B]">
        {category.description}
      </p>

      <ChevronRight
        className="absolute bottom-2.5 right-2.5 h-4 w-4"
        strokeWidth={2.5}
        style={{ color: accent }}
      />
    </button>
  )
}

export function BusinessCategoryScreen() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const fromProfile = searchParams.get("from") === "profile"
  const [selectedId, setSelectedId] = React.useState<BusinessCategoryId>("mobile-electronics")

  const selectedCategory = BUSINESS_CATEGORIES.find((category) => category.id === selectedId)

  const handleContinue = () => {
    if (!selectedCategory) return
    setB2CDashboardFromRoute(selectedCategory.dashboardRoute)
    setB2CProfile({ categoryId: selectedId })
    setB2COnboarded()
    if (fromProfile) {
      router.push("/profile?module=b2c")
    } else {
      router.push(selectedCategory.dashboardRoute)
    }
  }

  return (
    <AppShell
      backgroundClassName="bg-[#F8FAFC]"
      header={
        <AppHeader
          showBack
          onBack={() =>
            fromProfile ? router.push("/profile?module=b2c") : router.push("/register?module=b2c")
          }
        />
      }
      footer={
        <div className="border-t border-[#E2E8F0] bg-white px-4 pt-2.5 pb-[max(10px,env(safe-area-inset-bottom))]">
          <button
            type="button"
            onClick={handleContinue}
            className="flex h-[48px] w-full items-center justify-center gap-2 rounded-[12px] bg-[#2563EB] text-[15px] font-semibold text-white shadow-[0_4px_14px_rgba(37,99,235,0.25)] active:scale-[0.98]"
          >
            Continue {fromProfile ? " & Save" : "to Dashboard"}
            <span aria-hidden="true" className="text-[17px] leading-none">
              →
            </span>
          </button>
        </div>
      }
      contentClassName="pb-1"
    >
      <section className="bg-gradient-to-br from-[#EFF6FF] via-[#F8FAFC] to-white px-4 pb-3.5 pt-2.5">
        <div className="flex items-end gap-2">
          <div className="min-w-0 flex-1 pb-1">
            <p className="text-[12px] font-medium text-[#64748B]">Hello, Business Owner 👋</p>
            <h1 className="mt-1 text-[19px] font-bold leading-[1.22] tracking-[-0.02em] text-[#0F172A]">
              Select Business Category
            </h1>
            <p className="mt-1 text-[11px] leading-[1.35] text-[#64748B]">
              Choose one to continue.
            </p>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/business-category/hero.png?v=2"
            alt=""
            width={118}
            height={108}
            className="h-[108px] w-[118px] shrink-0 object-contain object-bottom drop-shadow-[0_10px_24px_rgba(37,99,235,0.14)]"
          />
        </div>

        <p className="mt-2.5 flex items-start gap-1.5 rounded-[10px] bg-[#EFF6FF] px-2.5 py-2 text-[10px] leading-[1.35] text-[#475569]">
          <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#2563EB]" strokeWidth={2.2} />
          <span>You can change your category later from Settings.</span>
        </p>
      </section>

      <div className="grid grid-cols-2 gap-2.5 px-4 pt-3">
        {BUSINESS_CATEGORIES.map((category) => (
          <BusinessCategoryCard
            key={category.id}
            category={category}
            selected={selectedId === category.id}
            onSelect={() => setSelectedId(category.id)}
          />
        ))}
      </div>

      <div className="mx-4 mt-3 flex items-center gap-3 rounded-[14px] border border-[#E8EDF3] bg-white px-3 py-3 shadow-[0_1px_6px_rgba(15,23,42,0.04)]">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#EFF6FF]">
          <Shield className="h-[18px] w-[18px] text-[#2563EB]" strokeWidth={2.2} />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[12px] font-bold text-[#0F172A]">Why Select a Business Category?</p>
          <p className="mt-0.5 text-[10px] leading-[1.4] text-[#64748B]">
            We show only relevant agreement templates and make your experience faster and easier.
          </p>
        </div>
      </div>
    </AppShell>
  )
}
