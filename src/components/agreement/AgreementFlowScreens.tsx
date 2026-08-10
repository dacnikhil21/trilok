"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  type AgreementType,
  type AgreementCategory,
  getTypeConfig,
  getTypeTitle,
} from "@/lib/c2c-config"
import { Icon3D } from "@/components/icons/Icon3D"
import { iconFieldToKey } from "@/lib/category-hero-images"
import { MobileNavList, MobileScreenIntro } from "@/components/layout/MobileListPrimitives"

interface AgreementFlowHeaderProps {
  type: AgreementType
  title: string
  onBack: () => void
}

export function AgreementFlowHeader({ type, title, onBack }: AgreementFlowHeaderProps) {
  const config = getTypeConfig(type)
  return (
    <div className="w-full shrink-0 shadow-sm" style={{ backgroundColor: config.color }}>
      <div className="flex h-[52px] items-center gap-2 px-3">
        <button
          type="button"
          onClick={onBack}
          aria-label="Go back"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white active:bg-white/15"
        >
          <ChevronLeft className="h-5 w-5" strokeWidth={2.5} />
        </button>
        <h1 className="min-w-0 flex-1 truncate text-center text-[15px] font-bold text-white">{title}</h1>
        <div className="h-9 w-9 shrink-0" aria-hidden="true" />
      </div>
    </div>
  )
}

interface AgreementCategoryPickerProps {
  type: AgreementType
  categories: AgreementCategory[]
  onSelect: (categoryId: string) => void
}

export function AgreementCategoryPicker({ type, categories, onSelect }: AgreementCategoryPickerProps) {
  const items = categories.map((c) => ({
    id: c.id,
    title: c.title,
    subtitle: c.description,
  }))

  return (
    <>
      <MobileScreenIntro
        title={`Select ${type} category`}
        subtitle={`Choose the type of ${type} agreement to continue.`}
      />
      <MobileNavList
        items={items}
        onSelect={onSelect}
        renderIcon={(item) => {
          const category = categories.find((c) => c.id === item.id)!
          return <Icon3D name={iconFieldToKey(category.icon)} size="md" alt={item.title} />
        }}
      />
    </>
  )
}

interface AgreementCategoryIntroProps {
  type: AgreementType
  category: AgreementCategory
  /** B2C template label — e.g. "Mobile Phone" */
  productLabel?: string | null
}

export function AgreementCategoryIntro({
  type,
  category,
  productLabel,
}: AgreementCategoryIntroProps) {
  const config = getTypeConfig(type)
  const introTitle = productLabel
    ? `Create Agreement for ${productLabel}`
    : category.introTitle

  return (
    <div className="flex flex-col bg-white">
      <div className="flex flex-col items-center px-5 pt-6 pb-2">
        <div
          className="flex items-center justify-center rounded-[28px] p-5"
          style={{ backgroundColor: config.colorLight }}
        >
          <Icon3D name={iconFieldToKey(category.icon)} size="jumbo" alt={category.title} bare />
        </div>
      </div>

      <div className="px-5 pt-3 pb-6">
        <h2
          className="text-center text-[20px] font-extrabold leading-[1.28] tracking-[-0.02em]"
          style={{ color: config.color }}
        >
          {introTitle}
        </h2>

        <p className="mt-4 text-[13px] font-semibold text-[#64748B]">This agreement is suitable for:</p>

        <ul className="mt-4 space-y-3.5">
          {category.introItems.map((item) => (
            <li key={item} className="flex items-center gap-3">
              <span
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-white shadow-md"
                style={{ backgroundColor: config.color }}
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2.5 6L5 8.5L9.5 4" stroke="white" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </span>
              <span className="text-[15px] font-medium text-[#1E293B]">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

/** Sticky footer CTA for agreement intro — use inside AppShell footer slot */
export function AgreementIntroFooter({
  type,
  onCreate,
}: {
  type: AgreementType
  onCreate: () => void
}) {
  const config = getTypeConfig(type)
  return (
    <div className="px-5 pt-4">
      <button
        type="button"
        onClick={onCreate}
        className={cn(
          "flex h-[52px] w-full items-center justify-center gap-2 rounded-[12px] text-[16px] font-bold text-white shadow-lg active:scale-[0.98]",
          config.buttonClass
        )}
      >
        Create Agreement
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  )
}

export function AgreementTypePicker({ onSelect }: { onSelect: (type: AgreementType) => void }) {
  const items = (["sale", "rental", "service"] as AgreementType[]).map((type) => {
    const config = getTypeConfig(type)
    return { id: type, title: getTypeTitle(type), subtitle: config.description }
  })

  return (
    <>
      <MobileScreenIntro
        title="Create Agreement"
        subtitle="Choose agreement type to continue."
      />
      <MobileNavList
        items={items}
        onSelect={(id) => onSelect(id as AgreementType)}
        renderIcon={(item) => <Icon3D name={item.id} size="md" alt={item.title} />}
      />
    </>
  )
}
