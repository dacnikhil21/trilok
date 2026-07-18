import * as React from "react"
import { Check, ShieldAlert, CheckCircle2, User, FileText } from "lucide-react"
import { AgreementData } from "@/app/create-agreement/page"
import { Button } from "@/components/ui/button"

type Props = {
  data: AgreementData
  onNext: () => void
}

export function BuyerReviewStep({ data, onNext }: Props) {
  const otherRole = data.role === "seller" ? "Buyer" : "Seller"
  const sellerName = data.role === "seller" ? data.customerName || "Ramesh Kumar Sharma" : "Ramesh Kumar Sharma"

  return (
    <div className="flex flex-col h-full animate-in fade-in zoom-in-95 duration-500">
      
      {/* Simulation Header */}
      <div className="text-center mt-2 mb-6">
        <div className="inline-block bg-[#0033A0]/10 text-[#0033A0] px-3 py-1 rounded-full text-[11px] font-bold tracking-wide uppercase mb-3">
          {otherRole} Perspective
        </div>
        <h2 className="text-[20px] font-bold text-[#041B4A] leading-tight mb-2">
          Review Agreement Invitation
        </h2>
        <p className="text-[13px] text-gray-500 font-medium max-w-[260px] mx-auto">
          Please review the details below. Accept to proceed with Aadhaar verification.
        </p>
      </div>

      {/* Summary Card */}
      <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm space-y-5 flex-1 overflow-y-auto">
        
        {/* Initiator Info */}
        <div className="flex items-start gap-4 pb-5 border-b border-gray-100">
          <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center shrink-0">
            <User className="w-6 h-6 text-[#0033A0]" />
          </div>
          <div>
            <p className="text-[12px] font-bold text-gray-500 uppercase tracking-wide">Initiated By</p>
            <p className="text-[16px] font-bold text-[#041B4A]">{sellerName}</p>
            <div className="flex items-center gap-1 mt-1">
               <CheckCircle2 className="w-3.5 h-3.5 text-[#1E9E40]" />
               <p className="text-[11px] font-bold text-[#1E9E40]">Aadhaar Verified</p>
            </div>
          </div>
        </div>

        {/* Product Summary */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 mb-2">
             <FileText className="w-4 h-4 text-[#0033A0]" />
             <h3 className="text-[14px] font-bold text-[#041B4A]">Agreement Details</h3>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-3 space-y-2">
            <div className="flex justify-between">
              <span className="text-[12px] text-gray-500 font-medium">Product</span>
              <span className="text-[12px] text-[#041B4A] font-bold text-right">{data.productName || "Plastic Nozzle"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[12px] text-gray-500 font-medium">Model / Brand</span>
              <span className="text-[12px] text-[#041B4A] font-bold text-right">{data.brand} {data.model}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[12px] text-gray-500 font-medium">Quantity</span>
              <span className="text-[12px] text-[#041B4A] font-bold text-right">{data.quantity || "1000 Pieces"}</span>
            </div>
          </div>

          <div className="bg-green-50 border border-green-100 rounded-lg p-4 flex justify-between items-center mt-3">
            <span className="text-[13px] font-bold text-[#166534]">Total Amount</span>
            <span className="text-[18px] font-black text-[#166534]">₹ {data.saleAmount || "45,00,000"}</span>
          </div>
        </div>

      </div>

      {/* Security Alert */}
      <div className="mt-6 flex items-start gap-3 bg-[#FFF9E6] border border-[#FDE047] p-3.5 rounded-[12px]">
        <ShieldAlert className="w-5 h-5 text-[#B45309] shrink-0" strokeWidth={2.5} />
        <p className="text-[11px] font-semibold text-[#B45309] leading-snug">
          By accepting, you will be required to authenticate your identity via Aadhaar OTP to sign this agreement.
        </p>
      </div>

      {/* Action Buttons */}
      <div className="mt-6 space-y-3 pb-6 shrink-0">
        <Button 
          onClick={onNext}
          className="w-full h-[52px] bg-[#1E9E40] hover:bg-[#168833] text-white rounded-[14px] text-[16px] font-bold shadow-lg gap-2"
        >
          <Check className="w-5 h-5" /> Accept Agreement
        </Button>
        <button 
          className="w-full h-[52px] text-red-500 text-[15px] font-bold hover:bg-red-50 rounded-[14px] transition-colors"
        >
          Reject
        </button>
      </div>

    </div>
  )
}
