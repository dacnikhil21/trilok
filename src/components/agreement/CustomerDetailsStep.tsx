import * as React from "react"
import { User, Check } from "lucide-react"
import { AgreementData } from "@/app/create-agreement/page"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

type Props = {
  data: AgreementData
  updateData: (d: Partial<AgreementData>) => void
  onNext: () => void
}

export function CustomerDetailsStep({ data, updateData, onNext }: Props) {
  const isValid = data.customerMobile.length >= 10

  return (
    <div className="flex flex-col h-full animate-in fade-in slide-in-from-right-4 duration-500">
      
      {/* Title */}
      <div className="text-center mt-2 mb-8">
        <h2 className="text-[20px] font-bold text-[#041B4A] leading-tight">
          Customer Details
        </h2>
        <p className="text-[13px] text-gray-500 mt-2 font-medium max-w-[220px] mx-auto">
          Enter customer mobile number to continue
        </p>
      </div>

      {/* Form */}
      <div className="space-y-5">
        <div className="space-y-1.5">
          <label className="text-[13px] font-bold text-[#041B4A]">Mobile Number</label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[15px] font-semibold text-[#041B4A]">+91</span>
            <Input 
              type="tel"
              value={data.customerMobile}
              onChange={(e) => updateData({ customerMobile: e.target.value.replace(/\D/g, '').slice(0, 10) })}
              placeholder="91234 56789"
              className="pl-12 pr-10 h-14 text-[15px] font-semibold rounded-[12px] border-gray-200"
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
              <User className="w-5 h-5" strokeWidth={2} />
            </div>
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-[13px] font-bold text-[#041B4A]">Customer Name (Optional)</label>
          <Input 
            type="text"
            value={data.customerName}
            onChange={(e) => updateData({ customerName: e.target.value })}
            placeholder="Suresh Verma"
            className="px-4 h-14 text-[15px] font-semibold rounded-[12px] border-gray-200"
          />
        </div>
      </div>

      <div className="mt-8">
        <div className="flex items-center gap-3 bg-[#EAF7EE] p-3 rounded-[12px]">
          <div className="w-6 h-6 rounded-full bg-[#1A8A3C] flex items-center justify-center shrink-0">
            <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
          </div>
          <p className="text-[11px] font-medium text-[#1A8A3C] leading-snug">
            Customer will verify their<br/>identity on this device.
          </p>
        </div>
      </div>

      {/* Footer Button */}
      <div className="mt-auto pt-6">
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
