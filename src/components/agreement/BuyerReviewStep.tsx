import * as React from "react"
import { ShieldCheck, Check, FileText, Users, ArrowRight } from "lucide-react"
import { AgreementData } from "@/app/create-agreement/page"
import { Button } from "@/components/ui/button"
import { AgreementStepper } from "@/components/agreement/AgreementStepper"
import { type AgreementType, getTypeConfig } from "@/lib/c2c-config"

type Props = {
  data: AgreementData
  onNext: () => void
  agreementType?: AgreementType | null
}

export function BuyerReviewStep({ data, onNext, agreementType }: Props) {
  const [confirmed, setConfirmed] = React.useState(false)
  const accentColor = getTypeConfig(agreementType ?? "sale").color

  const isSellerRole = data.role === "seller"
  const creatorName = data.customerName || "Ravi Kumar"
  const creatorMobile = data.customerMobile || "9876543210"
  const invitedPartyName = data.invitedPartyName || "Rajesh Kumar"
  const invitedPartyMobile = data.invitedPartyMobile || "9123456700"

  const creatorRole =
    isSellerRole
      ? (agreementType === "rental" ? "Owner" : agreementType === "service" ? "Service Provider" : "Seller")
      : (agreementType === "rental" ? "Tenant / Renter" : agreementType === "service" ? "Client" : "Buyer")

  const invitedPartyRole =
    !isSellerRole
      ? (agreementType === "rental" ? "Owner" : agreementType === "service" ? "Service Provider" : "Seller")
      : (agreementType === "rental" ? "Tenant / Renter" : agreementType === "service" ? "Client" : "Buyer")

  const categoryName = data.category || "Mobile Phone & Electronics"
  const itemName = data.productName || data.model || "iPhone 14 Pro"
  const brand = data.brand || "Apple"
  const model = data.model || "iPhone 14 Pro"
  const imeiOrReg = data.serialNumber || data.registrationNumber || "356789123456789"
  const price = data.saleAmount || data.monthlyRent || data.totalCharges || "45,000"
  const description = data.description || "Excellent condition, no scratches."

  return (
    <div className="flex flex-col h-full animate-in fade-in slide-in-from-right-4 duration-500">
      {/* 2-Step Creation Stepper (Node 2 Active) */}
      <AgreementStepper
        steps={["Agreement Details", "Review"]}
        currentIndex={1}
        color={accentColor}
        className="mb-5"
      />

      {/* Header */}
      <div className="mb-4">
        <h2 className="text-[18px] font-bold text-[#0F172A] leading-tight">Review Agreement Details</h2>
        <p className="text-[13px] text-[#64748B] mt-1 font-medium">
          Please verify all details before proceeding.
        </p>
      </div>

      <div className="space-y-3.5 flex-1 overflow-y-auto pr-0.5">
        {/* Item Details Card */}
        <div className="rounded-[16px] border border-[#E2E8F0] bg-white p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-3 pb-2 border-b border-[#F1F5F9]">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-[#EFF6FF] text-[#2563EB]">
              <FileText className="h-3.5 w-3.5" />
            </div>
            <h3 className="text-[13.5px] font-bold text-[#0F172A]">
              {agreementType === "rental" ? "Rental Details" : "Item Details"}
            </h3>
          </div>

          <div className="space-y-2 text-[12.5px]">
            <div className="flex justify-between py-1 border-b border-dashed border-[#F1F5F9]">
              <span className="text-[#64748B] font-medium">Category</span>
              <span className="font-bold text-[#0F172A] text-right">{categoryName}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-dashed border-[#F1F5F9]">
              <span className="text-[#64748B] font-medium">
                {agreementType === "rental" ? "Property / Item" : "Item Name"}
              </span>
              <span className="font-bold text-[#0F172A] text-right">{itemName}</span>
            </div>
            {brand && (
              <div className="flex justify-between py-1 border-b border-dashed border-[#F1F5F9]">
                <span className="text-[#64748B] font-medium">Brand</span>
                <span className="font-bold text-[#0F172A] text-right">{brand}</span>
              </div>
            )}
            {model && (
              <div className="flex justify-between py-1 border-b border-dashed border-[#F1F5F9]">
                <span className="text-[#64748B] font-medium">Model</span>
                <span className="font-bold text-[#0F172A] text-right">{model}</span>
              </div>
            )}
            {imeiOrReg && (
              <div className="flex justify-between py-1 border-b border-dashed border-[#F1F5F9]">
                <span className="text-[#64748B] font-medium">Identifier / Reg</span>
                <span className="font-bold text-[#0F172A] text-right">{imeiOrReg}</span>
              </div>
            )}
            {data.rentalDuration && (
              <div className="flex justify-between py-1 border-b border-dashed border-[#F1F5F9]">
                <span className="text-[#64748B] font-medium">Rental Duration</span>
                <span className="font-bold text-[#0F172A] text-right">{data.rentalDuration}</span>
              </div>
            )}
            <div className="flex justify-between py-1 border-b border-dashed border-[#F1F5F9]">
              <span className="text-[#64748B] font-medium">
                {agreementType === "rental" ? "Rent Amount" : "Sale Price"}
              </span>
              <span className="font-bold text-[#16A34A] text-[13px] text-right">
                ₹{Number(price).toLocaleString("en-IN") || price}
              </span>
            </div>
            {data.securityDeposit && (
              <div className="flex justify-between py-1 border-b border-dashed border-[#F1F5F9]">
                <span className="text-[#64748B] font-medium">Security Deposit</span>
                <span className="font-bold text-[#0F172A] text-right">
                  ₹{Number(data.securityDeposit).toLocaleString("en-IN") || data.securityDeposit}
                </span>
              </div>
            )}
            {description && (
              <div className="flex flex-col py-1">
                <span className="text-[#64748B] font-medium mb-0.5">Description / Terms</span>
                <span className="text-[#0F172A] text-[12px] leading-relaxed bg-[#F8FAFC] p-2 rounded-[8px]">
                  {description}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Parties Card (Creator in Priority 1) */}
        <div className="rounded-[16px] border border-[#E2E8F0] bg-white p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-3 pb-2 border-b border-[#F1F5F9]">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-[#F0FDF4] text-[#16A34A]">
              <Users className="h-3.5 w-3.5" />
            </div>
            <h3 className="text-[13.5px] font-bold text-[#0F172A]">Parties Information</h3>
          </div>

          <div className="space-y-2.5 text-[12.5px]">
            {/* 1. CREATOR (YOU) - Priority 1 */}
            <div className="flex justify-between items-center p-2.5 rounded-[12px] bg-[#EFF6FF]/70 border border-[#DBEAFE]">
              <div>
                <div className="flex items-center gap-1.5 mb-0.5">
                  <span className="text-[10.5px] font-extrabold uppercase tracking-wider text-[#2563EB]">
                    Creator (You)
                  </span>
                  <span className="text-[10px] font-bold bg-white text-[#1E40AF] px-1.5 py-0.5 rounded border border-[#BFDBFE]">
                    {creatorRole}
                  </span>
                </div>
                <span className="font-bold text-[#0F172A] text-[13.5px]">{creatorName}</span>
              </div>
              <span className="text-[#2563EB] font-bold text-right text-[13px]">{creatorMobile}</span>
            </div>

            {/* 2. OTHER PARTY */}
            <div className="flex justify-between items-center p-2.5 rounded-[12px] bg-[#F8FAFC] border border-[#E2E8F0]">
              <div>
                <div className="flex items-center gap-1.5 mb-0.5">
                  <span className="text-[10.5px] font-extrabold uppercase tracking-wider text-[#64748B]">
                    2nd Party
                  </span>
                  <span className="text-[10px] font-bold bg-white text-[#475569] px-1.5 py-0.5 rounded border border-[#CBD5E1]">
                    {invitedPartyRole}
                  </span>
                </div>
                <span className="font-bold text-[#0F172A] text-[13.5px]">{invitedPartyName}</span>
              </div>
              <span className="text-[#64748B] font-semibold text-right text-[13px]">{invitedPartyMobile}</span>
            </div>
          </div>
        </div>

        {/* Legal Confirmation Checkbox */}
        <label className="flex items-start gap-3 rounded-[12px] border border-[#E2E8F0] bg-[#F8FAFC] p-3.5 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={confirmed}
            onChange={(e) => setConfirmed(e.target.checked)}
            className="h-4 w-4 rounded border-gray-300 text-[#2563EB] focus:ring-[#2563EB] mt-0.5"
          />
          <span className="text-[12px] font-medium text-[#334155] leading-snug">
            I have reviewed all details and confirm they are correct and legally accurate.
          </span>
        </label>
      </div>

      {/* Footer CTA */}
      <div className="mt-4 pt-3 border-t border-[#F1F5F9]">
        <Button
          onClick={onNext}
          className="h-[52px] w-full rounded-[14px] bg-[#2563EB] hover:bg-[#1D4ED8] text-[16px] font-bold text-white shadow-lg active:scale-[0.99] flex items-center justify-center gap-2"
        >
          Proceed to Payment
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
