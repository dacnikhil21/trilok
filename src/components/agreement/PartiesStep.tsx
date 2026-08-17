import * as React from "react"
import { User, Phone, CheckCircle2, Shield } from "lucide-react"
import { AgreementData } from "@/app/create-agreement/page"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { AgreementStepper } from "@/components/agreement/AgreementStepper"
import { type AgreementType, getTypeConfig } from "@/lib/c2c-config"

type Props = {
  data: AgreementData
  updateData: (d: Partial<AgreementData>) => void
  onNext: () => void
  agreementType?: AgreementType | null
}

export function PartiesStep({ data, updateData, onNext, agreementType }: Props) {
  const accentColor = getTypeConfig(agreementType ?? "sale").color
  const isSellerRole = data.role === "seller"

  // Derive initial values if empty
  const sellerName = isSellerRole ? (data.customerName || "") : (data.invitedPartyName || "")
  const sellerMobile = isSellerRole ? (data.customerMobile || "") : (data.invitedPartyMobile || "")
  const buyerName = isSellerRole ? (data.invitedPartyName || "") : (data.customerName || "")
  const buyerMobile = isSellerRole ? (data.invitedPartyMobile || "") : (data.customerMobile || "")

  const handleSellerNameChange = (val: string) => {
    if (isSellerRole) {
      updateData({ customerName: val })
    } else {
      updateData({ invitedPartyName: val })
    }
  }

  const handleSellerMobileChange = (val: string) => {
    const cleaned = val.replace(/\D/g, "").slice(0, 10)
    if (isSellerRole) {
      updateData({ customerMobile: cleaned })
    } else {
      updateData({ invitedPartyMobile: cleaned })
    }
  }

  const handleBuyerNameChange = (val: string) => {
    if (isSellerRole) {
      updateData({ invitedPartyName: val })
    } else {
      updateData({ customerName: val })
    }
  }

  const handleBuyerMobileChange = (val: string) => {
    const cleaned = val.replace(/\D/g, "").slice(0, 10)
    if (isSellerRole) {
      updateData({ invitedPartyMobile: cleaned })
    } else {
      updateData({ customerMobile: cleaned })
    }
  }

  const isComplete =
    sellerName.trim().length > 0 &&
    sellerMobile.length >= 10 &&
    buyerName.trim().length > 0 &&
    buyerMobile.length >= 10

  return (
    <div className="flex flex-col h-full animate-in fade-in slide-in-from-right-4 duration-500">
      {/* 3-Step Wizard Stepper (Node 2 Active) */}
      <AgreementStepper
        steps={["Item Details", "Parties", "Agreement"]}
        currentIndex={1}
        color={accentColor}
        className="mb-5"
      />

      {/* Header Title */}
      <div className="mb-5">
        <h2 className="text-[18px] font-bold text-[#0F172A] leading-tight">Parties Details</h2>
        <p className="text-[13px] text-[#64748B] mt-1 font-medium">
          Enter information for both Seller and Buyer
        </p>
      </div>

      <div className="space-y-4 flex-1 overflow-y-auto pr-0.5">
        {/* Seller Card */}
        <div className="rounded-[16px] border border-[#E2E8F0] bg-white p-4 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#EFF6FF] text-[#2563EB]">
                <User className="h-4 w-4" />
              </div>
              <h3 className="text-[14px] font-bold text-[#0F172A]">Seller Information</h3>
            </div>
            {isSellerRole && (
              <span className="rounded-full bg-[#EFF6FF] px-2.5 py-0.5 text-[11px] font-bold text-[#2563EB]">
                You (Creator)
              </span>
            )}
          </div>

          <div className="space-y-1 text-left">
            <label className="text-[12.5px] font-bold text-[#334155]">Seller Full Name *</label>
            <Input
              type="text"
              value={sellerName}
              onChange={(e) => handleSellerNameChange(e.target.value)}
              placeholder="e.g. Ravi Kumar"
              className="h-12 rounded-[12px] border-[#CBD5E1] text-[14px] font-semibold"
            />
          </div>

          <div className="space-y-1 text-left">
            <label className="text-[12.5px] font-bold text-[#334155]">Seller Mobile Number *</label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[14px] font-bold text-[#64748B]">
                +91
              </span>
              <Input
                type="tel"
                value={sellerMobile}
                onChange={(e) => handleSellerMobileChange(e.target.value)}
                placeholder="98765 43210"
                className="h-12 rounded-[12px] border-[#CBD5E1] pl-12 text-[14px] font-semibold"
              />
            </div>
          </div>
        </div>

        {/* Buyer Card */}
        <div className="rounded-[16px] border border-[#E2E8F0] bg-white p-4 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#F0FDF4] text-[#16A34A]">
                <User className="h-4 w-4" />
              </div>
              <h3 className="text-[14px] font-bold text-[#0F172A]">Buyer Information</h3>
            </div>
            {!isSellerRole && (
              <span className="rounded-full bg-[#F0FDF4] px-2.5 py-0.5 text-[11px] font-bold text-[#16A34A]">
                You (Creator)
              </span>
            )}
          </div>

          <div className="space-y-1 text-left">
            <label className="text-[12.5px] font-bold text-[#334155]">Buyer Full Name *</label>
            <Input
              type="text"
              value={buyerName}
              onChange={(e) => handleBuyerNameChange(e.target.value)}
              placeholder="e.g. Rajesh Kumar"
              className="h-12 rounded-[12px] border-[#CBD5E1] text-[14px] font-semibold"
            />
          </div>

          <div className="space-y-1 text-left">
            <label className="text-[12.5px] font-bold text-[#334155]">Buyer Mobile Number *</label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[14px] font-bold text-[#64748B]">
                +91
              </span>
              <Input
                type="tel"
                value={buyerMobile}
                onChange={(e) => handleBuyerMobileChange(e.target.value)}
                placeholder="91234 56700"
                className="h-12 rounded-[12px] border-[#CBD5E1] pl-12 text-[14px] font-semibold"
              />
            </div>
          </div>
        </div>

        {/* Security Notice */}
        <div className="flex items-start gap-2.5 rounded-[12px] bg-[#F8FAFC] border border-[#E2E8F0] p-3 text-[12px] text-[#64748B]">
          <Shield className="h-4 w-4 text-[#2563EB] shrink-0 mt-0.5" />
          <p>
            Both parties will receive a secure link to review and Aadhaar eSign this agreement digitally.
          </p>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="mt-4 pt-3 border-t border-[#F1F5F9]">
        <Button
          onClick={onNext}
          className="h-[52px] w-full rounded-[14px] bg-[#2563EB] hover:bg-[#1D4ED8] text-[16px] font-bold text-white shadow-lg active:scale-[0.99]"
        >
          Next
        </Button>
      </div>
    </div>
  )
}
