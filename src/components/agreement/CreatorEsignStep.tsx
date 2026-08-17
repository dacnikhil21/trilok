import * as React from "react"
import { FileSignature, ShieldCheck, Loader2, Lock } from "lucide-react"
import { AgreementData } from "@/app/create-agreement/page"
import { Button } from "@/components/ui/button"

type Props = {
  data: AgreementData
  updateData: (d: Partial<AgreementData>) => void
  onNext: () => void
}

export function CreatorEsignStep({ data, updateData, onNext }: Props) {
  const [signing, setSigning] = React.useState(false)

  const isSeller = data.role === "seller"
  const creatorName = isSeller ? (data.customerName || "Ravi Kumar") : (data.customerName || "Rajesh Kumar")
  const creatorRole = isSeller ? "Seller" : "Buyer"
  const docTitle = data.category ? `${data.category} Agreement` : "Mobile Phone Sale Agreement"
  const amount = data.saleAmount || data.monthlyRent || data.totalCharges || "45,000"

  const handleEsign = () => {
    setSigning(true)
    setTimeout(() => {
      setSigning(false)
      onNext()
    }, 1000)
  }

  return (
    <div className="flex flex-col h-full animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="flex-1 flex flex-col items-center justify-center text-center px-2 py-4">
        {/* Document Illustration */}
        <div className="relative mb-6">
          <div className="h-28 w-24 rounded-[16px] bg-gradient-to-br from-[#EFF6FF] to-[#DBEAFE] border-2 border-[#93C5FD] shadow-md flex flex-col items-center justify-between p-3 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-6 h-6 bg-[#93C5FD] border-b border-l border-[#60A5FA] rounded-bl-[6px]" />
            <div className="w-10 h-1.5 bg-[#93C5FD] rounded-full mt-2" />
            <div className="w-14 h-1 bg-[#BFDBFE] rounded-full" />
            <div className="w-12 h-1 bg-[#BFDBFE] rounded-full" />
            <div className="w-14 h-1 bg-[#BFDBFE] rounded-full" />
            <div className="w-8 h-8 rounded-full bg-[#2563EB] text-white flex items-center justify-center shadow-md">
              <FileSignature className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-[20px] font-bold text-[#0F172A] leading-tight mb-1">
          You are the Agreement Creator
        </h2>
        <p className="text-[14px] font-semibold text-[#2563EB] mb-6">
          Please eSign first
        </p>

        {/* Agreement Details Card */}
        <div className="w-full rounded-[16px] border border-[#E2E8F0] bg-white p-4 shadow-sm text-left space-y-2.5 mb-4">
          <div className="flex justify-between py-1 border-b border-[#F1F5F9] text-[13px]">
            <span className="text-[#64748B] font-medium">Document:</span>
            <span className="font-bold text-[#0F172A] text-right">{docTitle}</span>
          </div>
          <div className="flex justify-between py-1 border-b border-[#F1F5F9] text-[13px]">
            <span className="text-[#64748B] font-medium">Creator:</span>
            <span className="font-bold text-[#0F172A] text-right">{creatorName} ({creatorRole})</span>
          </div>
          <div className="flex justify-between py-1 text-[13px]">
            <span className="text-[#64748B] font-medium">Amount:</span>
            <span className="font-bold text-[#16A34A] text-right">
              ₹{Number(amount).toLocaleString("en-IN") || amount}
            </span>
          </div>
        </div>

        <p className="text-[12.5px] font-medium text-[#64748B] max-w-[280px]">
          Click below to eSign this document using your Aadhaar.
        </p>
      </div>

      {/* Footer CTA */}
      <div className="mt-auto pt-3 border-t border-[#F1F5F9]">
        <Button
          onClick={handleEsign}
          disabled={signing}
          className="h-[52px] w-full rounded-[14px] bg-[#2563EB] hover:bg-[#1D4ED8] text-[16px] font-bold text-white shadow-lg active:scale-[0.99] flex items-center justify-center gap-2"
        >
          {signing ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Securing Digital Signature...
            </>
          ) : (
            <>
              <FileSignature className="h-5 w-5" />
              eSign Now
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
