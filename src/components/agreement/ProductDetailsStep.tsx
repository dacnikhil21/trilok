import * as React from "react"
import { ChevronDown, Calendar, Check, User } from "lucide-react"
import { AgreementData } from "@/app/create-agreement/page"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { AgreementStepper } from "@/components/agreement/AgreementStepper"

import {
  type AgreementType,
  type TemplateField,
  findCategory,
  getTypeConfig,
  SALE_CATEGORIES,
  RENTAL_CATEGORIES,
  SERVICE_CATEGORIES,
} from "@/lib/c2c-config"

type Props = {
  data: AgreementData
  updateData: (d: Partial<AgreementData>) => void
  onNext: () => void
  isB2C?: boolean
  agreementType?: AgreementType | null
  categoryId?: string | null
}

export function ProductDetailsStep({ data, updateData, onNext, agreementType, categoryId }: Props) {
  const category =
    agreementType && categoryId ? findCategory(agreementType, categoryId) : undefined

  if (category?.fields?.length) {
    return (
      <ConfiguredItemDetailsForm
        data={data}
        updateData={updateData}
        onNext={onNext}
        fields={category.fields}
        title={category.detailsTitle ?? "Item Details"}
        subtitle={category.detailsSubtitle ?? "Enter details about the item"}
        agreementType={agreementType}
        accentColor={getTypeConfig(agreementType ?? "sale").color}
      />
    )
  }

  return <LegacyItemDetailsForm data={data} updateData={updateData} onNext={onNext} agreementType={agreementType} />
}

function ConfiguredItemDetailsForm({
  data,
  updateData,
  onNext,
  fields,
  title,
  subtitle,
  agreementType,
  accentColor,
}: {
  data: AgreementData
  updateData: (d: Partial<AgreementData>) => void
  onNext: () => void
  fields: TemplateField[]
  title: string
  subtitle: string
  agreementType?: AgreementType | null
  accentColor: string
}) {
  const getValue = (key: string): string =>
    (data as unknown as Record<string, string>)[key] ?? ""

  const setValue = (key: string, value: string) => {
    updateData({ [key]: value } as Partial<AgreementData>)
  }

  const isSellerRole = data.role === "seller"
  const otherPartyTitle =
    agreementType === "rental"
      ? (isSellerRole ? "Tenant / Renter" : "Owner / Landlord")
      : agreementType === "service"
      ? "Client / Customer"
      : (isSellerRole ? "Buyer / Customer" : "Seller / Vendor")

  return (
    <div className="flex flex-col h-full animate-in fade-in slide-in-from-right-4 duration-500">
      {/* 2-Step Wizard Stepper (Node 1 Active) */}
      <AgreementStepper
        steps={["Agreement Details", "Review"]}
        currentIndex={0}
        color={accentColor}
        className="mb-4 shrink-0"
      />

      {/* Title */}
      <div className="mb-4 shrink-0">
        <h2 className="text-[18px] font-bold text-[#0F172A] leading-tight">{title}</h2>
        <p className="text-[13px] text-[#64748B] mt-1 font-medium">{subtitle}</p>
      </div>

      {/* Scrollable Form Fields */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-1 pb-4">
        {fields.map((field) => (
          <FieldControl
            key={field.key}
            field={field}
            value={getValue(field.key)}
            onChange={(v) => setValue(field.key, v)}
          />
        ))}

        {/* Other Party / Customer Details Card with Distinct Card Container */}
        <div className="mt-6 rounded-[18px] bg-gradient-to-b from-[#F8FAFC] to-[#F1F5F9] border-2 border-[#E2E8F0] p-4.5 space-y-4 shadow-sm">
          <div className="flex items-center gap-2.5 pb-2.5 border-b border-[#E2E8F0]">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#2563EB] text-white shadow-xs">
              <User className="h-4 w-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-[14.5px] font-extrabold text-[#0F172A] tracking-tight">
                  {otherPartyTitle} Details
                </h3>
                <span className="text-[10.5px] font-bold bg-[#EFF6FF] text-[#2563EB] px-2 py-0.5 rounded-full border border-[#DBEAFE]">
                  2nd Party
                </span>
              </div>
              <p className="text-[11.5px] text-[#64748B] font-medium mt-0.5">
                Required for agreement invitation & customer eSign
              </p>
            </div>
          </div>

          {/* Full Name */}
          <div className="space-y-1.5 text-left">
            <label className="text-[12.5px] font-bold text-[#1E293B] uppercase tracking-wide">
              {otherPartyTitle} Name *
            </label>
            <Input
              type="text"
              value={data.invitedPartyName}
              onChange={(e) => updateData({ invitedPartyName: e.target.value })}
              placeholder={`Enter ${otherPartyTitle.toLowerCase()} name`}
              className="bg-white px-4 h-13 text-[14.5px] font-semibold text-[#0F172A] placeholder-[#94A3B8] rounded-[12px] border-[#CBD5E1] shadow-xs focus:bg-white"
            />
          </div>

          {/* Mobile Number */}
          <div className="space-y-1.5 text-left">
            <label className="text-[12.5px] font-bold text-[#1E293B] uppercase tracking-wide">
              {otherPartyTitle} Mobile Number *
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[14px] font-bold text-[#64748B]">
                +91
              </span>
              <Input
                type="tel"
                inputMode="numeric"
                maxLength={10}
                value={data.invitedPartyMobile}
                onChange={(e) =>
                  updateData({ invitedPartyMobile: e.target.value.replace(/\D/g, "").slice(0, 10) })
                }
                placeholder="Enter 10-digit mobile number"
                className="bg-white pl-14 pr-4 h-13 text-[14.5px] font-semibold text-[#0F172A] placeholder-[#94A3B8] rounded-[12px] border-[#CBD5E1] shadow-xs focus:bg-white"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Pinned Bottom Button */}
      <div className="pt-3 pb-1 border-t border-[#F1F5F9] shrink-0">
        <Button
          onClick={onNext}
          className="w-full h-[52px] bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-[14px] text-[16px] font-bold shadow-lg active:scale-[0.99] transition-all"
        >
          Next
        </Button>
      </div>
    </div>
  )
}

function CustomSelect({
  label,
  placeholder,
  value,
  options,
  onChange,
}: {
  label: string
  placeholder: string
  value: string
  options: string[]
  onChange: (val: string) => void
}) {
  const [open, setOpen] = React.useState(false)
  const ref = React.useRef<HTMLDivElement>(null)

  // Click outside to close
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside)
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [open])

  const hasValue = value && value.trim().length > 0

  return (
    <div ref={ref} className="space-y-1.5 text-left relative w-full">
      <label className="text-[13px] font-bold text-[#041B4A]">{label}</label>

      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`w-full flex items-center justify-between px-4 h-14 text-[14.5px] font-semibold bg-white border border-[#CBD5E1] rounded-[12px] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] transition-colors shadow-xs ${
          open ? "border-[#2563EB] ring-2 ring-[#2563EB]/20" : ""
        }`}
      >
        <span className={`truncate text-left pr-2 ${hasValue ? "text-[#0F172A]" : "text-[#94A3B8]"}`}>
          {hasValue ? value : placeholder}
        </span>
        <ChevronDown
          className={`w-5 h-5 text-[#64748B] shrink-0 transition-transform duration-200 ${
            open ? "rotate-180 text-[#2563EB]" : ""
          }`}
          strokeWidth={2.5}
        />
      </button>

      {/* Dropdown Menu (Strictly contained within mobile frame) */}
      {open && (
        <div className="absolute left-0 right-0 top-[100%] mt-1.5 max-h-56 overflow-y-auto rounded-[14px] border border-[#CBD5E1] bg-white shadow-xl z-50 p-1.5 space-y-1 animate-in fade-in zoom-in-95 duration-150">
          {options.map((opt) => {
            const isSelected = value === opt
            return (
              <button
                key={opt}
                type="button"
                onClick={() => {
                  onChange(opt)
                  setOpen(false)
                }}
                className={`w-full flex items-center justify-between px-3.5 py-3 rounded-[10px] text-[13.5px] font-semibold text-left transition-colors ${
                  isSelected
                    ? "bg-[#EFF6FF] text-[#2563EB] font-bold"
                    : "text-[#334155] hover:bg-[#F8FAFC]"
                }`}
              >
                <span className="truncate pr-2">{opt}</span>
                {isSelected && <Check className="w-4 h-4 text-[#2563EB] shrink-0" strokeWidth={3} />}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}

function FieldControl({
  field,
  value,
  onChange,
}: {
  field: TemplateField
  value: string
  onChange: (v: string) => void
}) {
  const label = field.required
    ? `${field.label} *`
    : `${field.label}${field.type !== "select" ? " (Optional)" : ""}`

  const placeholder = field.placeholder

  if (field.type === "select") {
    return (
      <CustomSelect
        label={label}
        placeholder={placeholder ?? `Select ${field.label}`}
        value={value}
        options={field.options ?? []}
        onChange={onChange}
      />
    )
  }

  if (field.type === "textarea") {
    return (
      <div className="space-y-1.5 text-left">
        <label className="text-[13px] font-bold text-[#041B4A]">{label}</label>
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full p-4 text-[14.5px] font-semibold text-[#0F172A] placeholder-[#94A3B8] rounded-[12px] border border-[#CBD5E1] min-h-[96px] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] shadow-xs"
        />
      </div>
    )
  }

  if (field.type === "date") {
    return (
      <div className="space-y-1.5 text-left">
        <label className="text-[13px] font-bold text-[#041B4A]">{label}</label>
        <div className="relative">
          <Input
            type="date"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="pl-4 pr-10 h-14 text-[14.5px] font-semibold text-[#0F172A] rounded-[12px] border-[#CBD5E1] shadow-xs"
          />
          <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-[#64748B]">
            <Calendar className="w-4 h-4" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-1.5 text-left">
      <label className="text-[13px] font-bold text-[#041B4A]">{label}</label>
      <Input
        type="text"
        inputMode={field.type === "number" ? "numeric" : "text"}
        value={value}
        onChange={(e) =>
          onChange(field.type === "number" ? e.target.value.replace(/[^\d]/g, "") : e.target.value)
        }
        placeholder={placeholder}
        className="px-4 h-14 text-[14.5px] font-semibold text-[#0F172A] placeholder-[#94A3B8] rounded-[12px] border-[#CBD5E1] shadow-xs"
      />
    </div>
  )
}

function LegacyItemDetailsForm({
  data,
  updateData,
  onNext,
  agreementType,
}: Pick<Props, "data" | "updateData" | "onNext" | "agreementType">) {
  const allCategories = React.useMemo(
    () => [...SALE_CATEGORIES, ...RENTAL_CATEGORIES, ...SERVICE_CATEGORIES],
    []
  )
  const matchedCategory = allCategories.find(
    (c) => c.title.toLowerCase() === data.category.toLowerCase()
  )

  return (
    <div className="flex flex-col h-full animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="text-center mt-2 mb-6">
        <h2 className="text-[20px] font-bold text-[#041B4A] leading-tight">Product / Service Details</h2>
        <p className="text-[13px] text-gray-500 mt-1 font-medium max-w-[220px] mx-auto">
          Enter item or service information
        </p>
      </div>

      <div className="flex-1 overflow-y-auto space-y-4 pr-1 pb-4">
        {matchedCategory ? (
          <div className="space-y-1.5 text-left">
            <label className="text-[13.5px] font-bold text-[#041B4A]">Category</label>
            <div className="flex h-14 items-center rounded-[12px] border border-slate-200/90 bg-[#F8FAFC] px-4 text-[14.5px] font-semibold text-[#041B4A]">
              {data.category}
            </div>
          </div>
        ) : null}

        <div className="space-y-1.5 text-left">
          <label className="text-[13.5px] font-bold text-[#041B4A]">Name *</label>
          <Input
            type="text"
            value={data.productName}
            onChange={(e) => updateData({ productName: e.target.value })}
            placeholder="Enter name"
            className="px-4 h-14 text-[14.5px] font-semibold rounded-[12px] border-[#CBD5E1]"
          />
        </div>

        <div className="space-y-1.5 text-left">
          <label className="text-[13px] font-bold text-[#041B4A]">Price / Amount (₹) *</label>
          <Input
            type="text"
            inputMode="numeric"
            value={data.saleAmount}
            onChange={(e) => updateData({ saleAmount: e.target.value.replace(/[^\d]/g, "") })}
            placeholder="e.g. 5000"
            className="px-4 h-14 text-[14.5px] font-semibold rounded-[12px] border-[#CBD5E1]"
          />
        </div>

        <div className="space-y-1.5 text-left">
          <label className="text-[13px] font-bold text-[#041B4A]">Description</label>
          <textarea
            value={data.description}
            onChange={(e) => updateData({ description: e.target.value })}
            placeholder="Brief description..."
            className="w-full p-4 text-[14.5px] font-semibold rounded-[12px] border border-[#CBD5E1] min-h-[96px] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB]"
          />
        </div>

        {/* Other Party Section */}
        <div className="pt-4 border-t border-[#E2E8F0] space-y-3.5">
          <div className="space-y-1.5 text-left">
            <label className="text-[13.5px] font-bold text-[#041B4A]">Other Party Name *</label>
            <Input
              type="text"
              value={data.invitedPartyName}
              onChange={(e) => updateData({ invitedPartyName: e.target.value })}
              placeholder="Enter name"
              className="px-4 h-14 text-[14.5px] font-semibold rounded-[12px] border-[#CBD5E1]"
            />
          </div>

          <div className="space-y-1.5 text-left">
            <label className="text-[13.5px] font-bold text-[#041B4A]">Other Party Mobile *</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[14.5px] font-bold text-[#64748B]">
                +91
              </span>
              <Input
                type="tel"
                inputMode="numeric"
                maxLength={10}
                value={data.invitedPartyMobile}
                onChange={(e) =>
                  updateData({ invitedPartyMobile: e.target.value.replace(/\D/g, "").slice(0, 10) })
                }
                placeholder="Enter 10-digit mobile"
                className="pl-14 pr-4 h-14 text-[14.5px] font-semibold rounded-[12px] border-[#CBD5E1]"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="pt-3 pb-1 border-t border-[#F1F5F9]">
        <Button
          onClick={onNext}
          className="w-full h-[52px] bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-[14px] text-[16px] font-bold shadow-lg active:scale-[0.99]"
        >
          Next
        </Button>
      </div>
    </div>
  )
}
