"use client"

import * as React from "react"
import { ChevronRight, Check, Info } from "lucide-react"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { MobileScreen } from "@/components/layout/MobileScreen"
import { StatusBar } from "@/components/layout/StatusBar"
import { AppHeader } from "@/components/layout/AppHeader"
import {
  BUSINESS_CATEGORIES,
  type BusinessCategoryId,
} from "@/lib/categories"
import {
  MobileElectronicsIcon,
  BikesCarsIcon,
  FurnitureSaleIcon,
  RentalServicesIcon,
  ServiceAgreementIcon,
  OthersIcon,
  StoreHeroIllustration,
  WhyCategoryIllustration,
} from "@/components/icons/CategoryIcons"

const CATEGORY_ICONS: Record<BusinessCategoryId, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
  "mobile-electronics": MobileElectronicsIcon,
  "bikes-cars": BikesCarsIcon,
  "furniture-sale": FurnitureSaleIcon,
  "rental-services": RentalServicesIcon,
  "service-agreement": ServiceAgreementIcon,
  others: OthersIcon,
}

export function BusinessCategoryScreen() {
  const router = useRouter()
  const [selectedId, setSelectedId] = React.useState<BusinessCategoryId>("mobile-electronics")

  const selectedCategory = BUSINESS_CATEGORIES.find((category) => category.id === selectedId)

  const handleContinue = () => {
    if (!selectedCategory) return
    router.push(selectedCategory.dashboardRoute)
  }

  return (
    <MobileScreen>
      <StatusBar />
      <AppHeader showBack onBack={() => router.push("/register")} />

      <div className="flex flex-1 flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto">
        <section className="mx-5 mt-1 overflow-hidden rounded-[16px] bg-[#F0F7FF]">
          <div className="px-4 pb-4 pt-4">
            <p className="text-[14px] font-medium text-[#64748B]">Hello, Business Owner 👋</p>
            <div className="mt-2 flex items-start justify-between gap-2">
              <div className="min-w-0 flex-1">
                <h1 className="text-[24px] font-bold leading-[1.2] tracking-[-0.02em] text-[#0F172A]">
                  Select your Business Category
                </h1>
                <p className="mt-2 text-[13px] leading-[1.5] text-[#64748B]">
                  Choose the category that best matches your business to get started.
                </p>
              </div>
              <div className="shrink-0">
                <StoreHeroIllustration className="h-[84px] w-[96px]" aria-hidden="true" />
              </div>
            </div>
          </div>

          <div className="flex items-start gap-2.5 bg-[#DBEAFE]/70 px-4 py-3">
            <Info className="mt-0.5 h-[18px] w-[18px] shrink-0 text-[#2563EB]" strokeWidth={2.5} />
            <p className="text-[12px] leading-[1.45] text-[#334155]">
              You can change or update your business category later from Settings.
            </p>
          </div>
        </section>

        <h2 className="mt-5 px-5 text-[16px] font-bold text-[#0F172A]">Select Business Category</h2>

        <section className="mt-3 grid grid-cols-2 gap-3 px-5">
          {BUSINESS_CATEGORIES.map((category) => {
            const Icon = CATEGORY_ICONS[category.id]
            const isSelected = selectedId === category.id

            return (
              <button
                key={category.id}
                type="button"
                onClick={() => setSelectedId(category.id)}
                className={cn(
                  "relative flex min-h-[148px] flex-col rounded-[12px] border bg-white p-3.5 text-left transition-colors",
                  isSelected
                    ? "border-[#2563EB] shadow-[0_0_0_1px_#2563EB]"
                    : "border-[#E2E8F0] hover:border-[#CBD5E1]"
                )}
              >
                {isSelected && (
                  <span className="absolute right-2.5 top-2.5 flex h-[22px] w-[22px] items-center justify-center rounded-full bg-[#2563EB]">
                    <Check className="h-3.5 w-3.5 text-white" strokeWidth={3} />
                  </span>
                )}

                <Icon className="mb-2.5 h-12 w-12" aria-hidden="true" />

                <div className="flex flex-1 flex-col">
                  <div className="flex items-start justify-between gap-1">
                    <h2 className="text-[14px] font-bold leading-tight text-[#0F172A]">
                      {category.title}
                    </h2>
                    <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-[#94A3B8]" strokeWidth={2.5} />
                  </div>
                  <p className="mt-1.5 text-[11px] leading-[1.4] text-[#64748B]">
                    {category.description}
                  </p>
                </div>
              </button>
            )
          })}
        </section>

        <section className="mx-5 mt-6 flex items-center gap-3 rounded-[12px] bg-[#F0F7FF] px-4 py-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#EFF6FF]">
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
              <path
                d="M11 2L19 5.5V10.5C19 15.1 15.6 19.2 11 20.5C6.4 19.2 3 15.1 3 10.5V5.5L11 2Z"
                fill="#2563EB"
              />
              <path
                d="M8 11L10 13L14 9"
                stroke="white"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="text-[14px] font-bold text-[#2563EB]">Why Select a Business Category?</h3>
            <p className="mt-1 text-[12px] leading-[1.45] text-[#64748B]">
              We will show you only relevant agreement templates and make your experience faster and easier.
            </p>
          </div>
          <WhyCategoryIllustration className="h-[72px] w-[88px] shrink-0" aria-hidden="true" />
        </section>
        </div>

        <div className="shrink-0 border-t border-[#F1F5F9] bg-white px-5 pb-[max(16px,env(safe-area-inset-bottom))] pt-4">
          <button
            type="button"
            onClick={handleContinue}
            className="flex h-[52px] w-full items-center justify-center gap-2 rounded-[12px] bg-[#2563EB] text-[16px] font-semibold text-white shadow-[0_8px_20px_rgba(37,99,235,0.28)] transition-transform active:scale-[0.98]"
          >
            Continue to Dashboard
            <span aria-hidden="true" className="text-[18px] leading-none">
              →
            </span>
          </button>
        </div>
      </div>
    </MobileScreen>
  )
}
