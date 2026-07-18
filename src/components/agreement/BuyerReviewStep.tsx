import * as React from "react"
import { ShieldAlert, CheckCircle2, User, FileText, Send } from "lucide-react"
import { AgreementData } from "@/app/create-agreement/page"
import { Button } from "@/components/ui/button"

type Props = {
  data: AgreementData
  onNext: () => void
}

export function BuyerReviewStep({ data, onNext }: Props) {
  const roleDisplay = data.role === "buyer" ? "Buyer" : "Seller"

  return (
    <div className="flex flex-col h-full animate-in fade-in zoom-in-95 duration-500">
      
      {/* Header */}
      <div className="text-center mt-2 mb-6">
        <h2 className="text-[20px] font-bold text-[#041B4A] leading-tight mb-2">
          Agreement Review
        </h2>
        <p className="text-[13px] text-gray-500 font-medium max-w-[260px] mx-auto">
          Review the agreement details before sending the invitation.
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
            <p className="text-[12px] font-bold text-gray-500 uppercase tracking-wide">Your Role: {roleDisplay}</p>
            <p className="text-[16px] font-bold text-[#041B4A]">{data.customerName || "Creator Name"}</p>
            <div className="flex items-center gap-1 mt-1">
               <CheckCircle2 className="w-3.5 h-3.5 text-[#1E9E40]" />
               <p className="text-[11px] font-bold text-[#1E9E40]">Ready to Send</p>
            </div>
          </div>
        </div>

        {/* Product Summary */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 mb-2">
             <FileText className="w-4 h-4 text-[#0033A0]" />
             <h3 className="text-[14px] font-bold text-[#041B4A]">Product & Terms</h3>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-3 space-y-2">
            <div className="flex justify-between">
              <span className="text-[12px] text-gray-500 font-medium">Product</span>
              <span className="text-[12px] text-[#041B4A] font-bold text-right max-w-[150px] truncate">{data.productName || "-"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[12px] text-gray-500 font-medium">Model / S.N.</span>
              <span className="text-[12px] text-[#041B4A] font-bold text-right truncate max-w-[150px]">{data.model || "-"} {data.serialNumber ? `(${data.serialNumber})` : ""}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[12px] text-gray-500 font-medium">Quantity</span>
              <span className="text-[12px] text-[#041B4A] font-bold text-right">{data.quantity || "-"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[12px] text-gray-500 font-medium">Price</span>
              <span className="text-[12px] text-[#041B4A] font-bold text-right">₹{data.saleAmount || "0"}</span>
            </div>
            <div className="flex justify-between pt-2 border-t border-gray-200 mt-2">
              <span className="text-[12px] text-gray-500 font-medium">Condition</span>
              <span className="text-[12px] text-[#041B4A] font-bold text-right">{data.condition || "-"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[12px] text-gray-500 font-medium">Warranty</span>
              <span className="text-[12px] text-[#041B4A] font-bold text-right">{data.warranty || "-"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[12px] text-gray-500 font-medium">Return Policy</span>
              <span className="text-[12px] text-[#041B4A] font-bold text-right max-w-[150px] truncate">{data.returnPolicy || "-"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[12px] text-gray-500 font-medium">Payment Term</span>
              <span className="text-[12px] text-[#041B4A] font-bold text-right max-w-[150px] truncate">{data.paymentTerms || "-"}</span>
            </div>
          </div>
        </div>

        {/* Security Notice */}
        <div className="bg-amber-50 rounded-lg p-3 flex gap-3 border border-amber-100">
          <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <p className="text-[11px] font-medium text-amber-800 leading-relaxed">
            Please ensure all details are correct. Once the invitation is sent, these terms cannot be changed unless the other party rejects them.
          </p>
        </div>

      </div>

      {/* Footer Buttons */}
      <div className="mt-6 pt-4 bg-[#fcfcfc] space-y-3 pb-4">
        <Button 
          onClick={onNext}
          className="w-full h-[52px] bg-[#0033A0] hover:bg-[#002277] text-white rounded-[14px] text-[16px] font-bold shadow-lg"
        >
          Continue
        </Button>
      </div>

    </div>
  )
}
