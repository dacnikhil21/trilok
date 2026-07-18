import * as React from "react"
import { Briefcase, ShoppingBag, Check } from "lucide-react"
import { AgreementData } from "@/app/create-agreement/page"
import { Button } from "@/components/ui/button"

type Props = {
  data: AgreementData
  updateData: (d: Partial<AgreementData>) => void
  onNext: () => void
}

export function RoleSelectionStep({ data, updateData, onNext }: Props) {
  return (
    <div className="flex flex-col h-full animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Title */}
      <div className="text-center mt-6 mb-10">
        <h2 className="text-[22px] font-bold text-[#041B4A] leading-tight">
          Select Your Role<br/>in this Agreement
        </h2>
      </div>

      {/* Options */}
      <div className="space-y-4 flex-1">
        {/* Seller Option */}
        <button
          onClick={() => {
            updateData({ role: "seller" })
            setTimeout(onNext, 400) // Auto-proceed with slight delay
          }}
          className={`w-full text-left p-5 rounded-[16px] border-[1.5px] transition-all flex items-center justify-between ${
            data.role === "seller" 
              ? "border-[#0033A0] bg-[#0033A0]/[0.03] shadow-sm" 
              : "border-gray-200 bg-white hover:border-[#0033A0]/30"
          }`}
        >
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${
              data.role === "seller" ? "bg-[#0033A0] text-white" : "bg-[#0033A0] text-white"
            }`}>
              <Briefcase className="w-5 h-5" strokeWidth={2.5} />
            </div>
            <div>
              <h3 className="font-bold text-[16px] text-[#041B4A]">I am the Seller</h3>
              <p className="text-[12px] text-gray-500 font-medium mt-0.5">I want to sell a product<br/>or service</p>
            </div>
          </div>
          {data.role === "seller" && (
            <div className="w-6 h-6 rounded-full bg-[#1E9E40] flex items-center justify-center">
              <Check className="w-4 h-4 text-white" strokeWidth={3} />
            </div>
          )}
        </button>

        {/* Buyer Option */}
        <button
          onClick={() => {
            updateData({ role: "buyer" })
            setTimeout(onNext, 400) // Auto-proceed with slight delay
          }}
          className={`w-full text-left p-5 rounded-[16px] border-[1.5px] transition-all flex items-center justify-between ${
            data.role === "buyer" 
              ? "border-[#1E9E40] bg-[#1E9E40]/[0.03] shadow-sm" 
              : "border-gray-200 bg-white hover:border-[#1E9E40]/30"
          }`}
        >
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${
              data.role === "buyer" ? "bg-[#1E9E40] text-white" : "bg-[#1E9E40] text-white"
            }`}>
              <ShoppingBag className="w-5 h-5" strokeWidth={2.5} />
            </div>
            <div>
              <h3 className="font-bold text-[16px] text-[#041B4A]">I am the Buyer</h3>
              <p className="text-[12px] text-gray-500 font-medium mt-0.5">I want to buy a product<br/>or service</p>
            </div>
          </div>
          {data.role === "buyer" && (
            <div className="w-6 h-6 rounded-full bg-[#1E9E40] flex items-center justify-center">
              <Check className="w-4 h-4 text-white" strokeWidth={3} />
            </div>
          )}
        </button>
      </div>

      {/* Footer Info */}
      <div className="mt-auto pt-6">
        <div className="flex items-center gap-3 bg-[#EAF7EE] p-3 rounded-[12px]">
          <div className="w-6 h-6 rounded-full bg-[#1A8A3C] flex items-center justify-center shrink-0">
            <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
          </div>
          <p className="text-[11px] font-medium text-[#1A8A3C] leading-snug">
            You can create agreements<br/>as Seller or Buyer on this device.
          </p>
        </div>
      </div>

    </div>
  )
}
