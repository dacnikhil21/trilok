import * as React from "react"
import { ShieldCheck, CheckCircle2 } from "lucide-react"
import { AgreementData } from "@/app/create-agreement/page"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

type Props = {
  data: AgreementData
  updateData: (d: Partial<AgreementData>) => void
  onNext: () => void
}

export function AadhaarAuthStep({ data, updateData, onNext }: Props) {
  const isValid = data.aadhaarNumber.length >= 12
  const [tab, setTab] = React.useState<"aadhaar" | "vid">("aadhaar")

  return (
    <div className="flex flex-col h-full animate-in fade-in slide-in-from-right-4 duration-500">
      
      {/* Title */}
      <div className="text-center mt-2 mb-6">
        <h2 className="text-[20px] font-bold text-[#041B4A] leading-tight mb-4">
          Customer Aadhaar Verification
        </h2>
        
        {/* Aadhaar Logo Mock */}
        <div className="flex justify-center mb-4">
          <div className="flex items-center gap-1.5">
            <div className="w-8 h-8 bg-white border-2 border-red-500 rounded-full flex items-center justify-center relative overflow-hidden">
               <div className="absolute inset-0 border-[3px] border-yellow-400 rounded-full scale-75" />
               <div className="w-2 h-2 bg-black rounded-full" />
            </div>
            <div className="w-8 h-8 bg-white border-2 border-red-500 rounded-full flex items-center justify-center relative overflow-hidden">
               <div className="absolute inset-0 border-[3px] border-yellow-400 rounded-full scale-75" />
               <div className="w-2 h-2 bg-black rounded-full" />
            </div>
          </div>
        </div>

        <p className="text-[13px] text-gray-500 mt-2 font-medium max-w-[220px] mx-auto">
          Customer verifies their identity using Aadhaar
        </p>
      </div>

      {/* Tabs */}
      <div className="flex w-full mb-6 border-b border-gray-200 relative">
        <button 
          onClick={() => setTab("aadhaar")}
          className={`flex-1 pb-3 text-[14px] font-bold ${tab === "aadhaar" ? "text-[#0033A0]" : "text-gray-400"}`}
        >
          Aadhaar Card
        </button>
        <button 
          onClick={() => setTab("vid")}
          className={`flex-1 pb-3 text-[14px] font-bold ${tab === "vid" ? "text-[#0033A0]" : "text-gray-400"}`}
        >
          Virtual ID
        </button>
        <div 
          className="absolute bottom-0 left-0 h-[3px] w-1/2 bg-[#0033A0] rounded-t-full transition-transform duration-300"
          style={{ transform: `translateX(${tab === "aadhaar" ? "0%" : "100%"})` }}
        />
      </div>

      {/* Form */}
      <div className="space-y-6">
        <div className="space-y-1.5">
          <label className="text-[13px] font-bold text-[#041B4A]">
            {tab === "aadhaar" ? "Aadhaar Number" : "Virtual ID Number"}
          </label>
          <Input 
            type="tel"
            value={data.aadhaarNumber}
            onChange={(e) => updateData({ aadhaarNumber: e.target.value.replace(/\D/g, '').slice(0, tab === "aadhaar" ? 12 : 16) })}
            placeholder={tab === "aadhaar" ? "XXXX XXXX 5678" : "XXXX XXXX XXXX 5678"}
            className="px-4 h-14 text-[16px] tracking-widest font-semibold rounded-[12px] border-gray-200"
          />
        </div>

        <Button 
          onClick={onNext}
          className="w-full h-[52px] bg-[#0033A0] hover:bg-[#002277] text-white rounded-[14px] text-[16px] font-bold shadow-lg"
        >
          Send OTP
        </Button>
      </div>

      {/* Security Alerts */}
      <div className="mt-8 space-y-3">
        <div className="flex items-center gap-3 bg-[#F0FDF4] border border-[#DCFCE7] p-3.5 rounded-[12px]">
          <div className="w-5 h-5 rounded-full bg-[#16A34A] flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-3.5 h-3.5 text-white" strokeWidth={3} />
          </div>
          <p className="text-[11px] font-semibold text-[#166534] leading-snug">
            Aadhaar details are secure and<br/>used only for this agreement.
          </p>
        </div>
        <div className="flex items-center gap-3 bg-[#F0FDF4] border border-[#DCFCE7] p-3.5 rounded-[12px]">
          <div className="w-5 h-5 rounded-full bg-[#16A34A] flex items-center justify-center shrink-0">
            <ShieldCheck className="w-3.5 h-3.5 text-white" strokeWidth={2.5} />
          </div>
          <p className="text-[11px] font-semibold text-[#166534] leading-snug">
            No data is stored on our<br/>servers.
          </p>
        </div>
      </div>

    </div>
  )
}
