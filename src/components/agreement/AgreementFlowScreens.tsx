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
  return (
    <div className="space-y-3 px-4 pb-6 pt-3">
      <p className="text-[13px] font-medium text-[#64748B]">Select the type of {type} agreement</p>
      <div className="space-y-3">
        {categories.map((category) => (
          <button
            key={category.id}
            type="button"
            onClick={() => onSelect(category.id)}
            className="flex w-full items-center gap-3.5 rounded-[14px] border border-[#E2E8F0] bg-white p-3.5 text-left shadow-[0_2px_8px_rgba(15,23,42,0.06)] active:scale-[0.99]"
          >
            <Icon3D name={iconFieldToKey(category.icon)} size="card" alt={category.title} />
            <div className="min-w-0 flex-1 py-0.5">
              <h3 className="text-[14px] font-bold leading-snug text-[#0F172A]">{category.title}</h3>
              <p className="mt-1 text-[11px] leading-[1.45] text-[#64748B]">{category.description}</p>
            </div>
            <ChevronRight className="h-5 w-5 shrink-0 text-[#94A3B8]" />
          </button>
        ))}
      </div>
    </div>
  )
}

interface AgreementCategoryIntroProps {
  type: AgreementType
  category: AgreementCategory
  onCreate: () => void
}

export function AgreementCategoryIntro({ type, category, onCreate }: AgreementCategoryIntroProps) {
  const config = getTypeConfig(type)

  return (
    <div className="flex min-h-full flex-col bg-white">
      <div className="flex flex-col items-center px-5 pt-8 pb-2">
        <div
          className="flex items-center justify-center rounded-[28px] p-5"
          style={{ backgroundColor: config.colorLight }}
        >
          <Icon3D name={iconFieldToKey(category.icon)} size="jumbo" alt={category.title} bare />
        </div>
      </div>

      <div className="flex flex-1 flex-col px-5 pt-4 pb-4">
        <h2
          className="text-center text-[20px] font-extrabold leading-[1.28] tracking-[-0.02em]"
          style={{ color: config.color }}
        >
          {category.introTitle}
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

      <div className="sticky bottom-0 border-t border-[#E2E8F0] bg-white px-5 pb-[max(16px,env(safe-area-inset-bottom))] pt-4 shadow-[0_-4px_16px_rgba(15,23,42,0.06)]">
        <button
          type="button"
          onClick={onCreate}
          className={cn(
            "flex h-[52px] w-full items-center justify-center gap-2 rounded-[12px] text-[16px] font-bold text-white shadow-lg",
            config.buttonClass
          )}
        >
          Create Agreement
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  )
}

export function AgreementTypePicker({ onSelect }: { onSelect: (type: AgreementType) => void }) {
  return (
    <div className="space-y-3 px-4 pb-6 pt-3">
      <p className="text-[13px] font-medium text-[#64748B]">Choose agreement type to continue</p>
      {(["sale", "rental", "service"] as AgreementType[]).map((type) => {
        const config = getTypeConfig(type)
        return (
          <button
            key={type}
            type="button"
            onClick={() => onSelect(type)}
            className="flex w-full items-center gap-4 rounded-[14px] border border-[#E2E8F0] bg-white p-4 text-left shadow-sm active:scale-[0.99]"
          >
            <Icon3D name={type} size="card" alt={getTypeTitle(type)} />
            <div className="min-w-0 flex-1">
              <h3 className="text-[15px] font-bold text-[#0F172A]">{getTypeTitle(type)}</h3>
              <p className="mt-0.5 text-[12px] text-[#64748B]">{config.description}</p>
            </div>
            <ChevronRight className="h-5 w-5 text-[#94A3B8]" />
          </button>
        )
      })}
    </div>
  )
}
