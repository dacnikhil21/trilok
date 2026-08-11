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
import { DashboardHeroArt } from "@/components/icons/DashboardHeroes"
import { iconFieldToKey } from "@/lib/category-hero-images"
import { getC2CCategoryHero } from "@/lib/c2c-session"

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
  const config = getTypeConfig(type)
  const items = categories.map((c) => ({
    id: c.id,
    title: c.title,
    subtitle: c.description,
  }))

  return (
    <div className="flex flex-col bg-white">
      <section
        className="px-4 pb-4 pt-3"
        style={{ background: `linear-gradient(180deg, ${config.colorLight} 0%, #ffffff 100%)` }}
      >
        <h2 className="text-[20px] font-bold leading-[1.25] tracking-[-0.02em] text-[#0F172A]">
          Select {type} category
        </h2>
        <p className="mt-1 text-[13px] leading-[1.4] text-[#64748B]">
          Choose the type of {type} agreement to continue.
        </p>
      </section>

      <div className="space-y-2.5 px-4 pb-4">
        {items.map((item) => {
          const category = categories.find((c) => c.id === item.id)!
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelect(item.id)}
              className="flex w-full min-h-[72px] items-center gap-3 rounded-[16px] border border-[#E8EDF3] bg-white px-3.5 py-3 text-left shadow-[0_2px_10px_rgba(15,23,42,0.05)] active:scale-[0.99] active:bg-[#F8FAFC]"
            >
              <Icon3D name={iconFieldToKey(category.icon)} size="md" alt={item.title} bare />
              <div className="min-w-0 flex-1">
                <p className="text-[14px] font-bold leading-tight text-[#0F172A]">{item.title}</p>
                <p className="mt-0.5 line-clamp-2 text-[12px] leading-snug text-[#64748B]">{item.subtitle}</p>
              </div>
              <ChevronRight className="h-4 w-4 shrink-0 text-[#CBD5E1]" strokeWidth={2.5} />
            </button>
          )
        })}
      </div>
    </div>
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
  const heroSrc = getC2CCategoryHero(category.id)

  return (
    <div className="flex flex-col bg-white pb-2">
      <section
        className="relative overflow-hidden px-4 pb-2 pt-2"
        style={{ background: `linear-gradient(180deg, ${config.colorLight} 0%, #ffffff 92%)` }}
      >
        <div className="flex justify-center">
          <DashboardHeroArt
            src={heroSrc}
            alt={category.title}
            className="relative z-[1] h-[120px] w-[140px] shrink-0 object-contain object-bottom drop-shadow-[0_12px_24px_rgba(37,99,235,0.16)]"
          />
        </div>
      </section>

      <div className="px-5 pt-2">
        <h2
          className="text-center text-[19px] font-extrabold leading-[1.3] tracking-[-0.02em] text-[#0F172A]"
        >
          {introTitle}
        </h2>
        <p className="mt-2 text-center text-[13px] leading-[1.45] text-[#64748B]">
          {category.description}
        </p>

        <p className="mt-5 text-[12px] font-semibold uppercase tracking-[0.04em] text-[#94A3B8]">
          Covers
        </p>
        <div className="mt-2.5 flex flex-wrap gap-2">
          {category.introItems.map((item) => (
            <span
              key={item}
              className="inline-flex rounded-full px-3 py-1.5 text-[13px] font-medium text-[#334155]"
              style={{ backgroundColor: `${config.color}14` }}
            >
              {item}
            </span>
          ))}
        </div>
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
    return { id: type, title: getTypeTitle(type), subtitle: config.description, config }
  })

  return (
    <div className="flex flex-col bg-white">
      <section className="bg-gradient-to-b from-[#EFF6FF] to-white px-4 pb-4 pt-3">
        <h2 className="text-[20px] font-bold leading-[1.25] tracking-[-0.02em] text-[#0F172A]">
          Create Agreement
        </h2>
        <p className="mt-1 text-[13px] leading-[1.4] text-[#64748B]">Choose agreement type to continue.</p>
      </section>

      <div className="space-y-2.5 px-4 pb-4">
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => onSelect(item.id as AgreementType)}
            className="flex w-full min-h-[72px] items-center gap-3 rounded-[16px] border border-[#E8EDF3] bg-white px-3.5 py-3 text-left shadow-[0_2px_10px_rgba(15,23,42,0.05)] active:scale-[0.99] active:bg-[#F8FAFC]"
          >
            <Icon3D name={item.id} size="md" alt={item.title} bare />
            <div className="min-w-0 flex-1">
              <p className="text-[14px] font-bold leading-tight text-[#0F172A]">{item.title}</p>
              <p className="mt-0.5 text-[12px] leading-snug text-[#64748B]">{item.subtitle}</p>
            </div>
            <ChevronRight className="h-4 w-4 shrink-0 text-[#CBD5E1]" strokeWidth={2.5} />
          </button>
        ))}
      </div>
    </div>
  )
}
