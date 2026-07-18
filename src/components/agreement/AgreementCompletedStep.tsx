import * as React from "react"
import { Check, Download, Share2 } from "lucide-react"
import { AgreementData } from "@/app/create-agreement/page"
import { Button } from "@/components/ui/button"

type Props = {
  data: AgreementData
  onHome: () => void
}

export function AgreementCompletedStep({ data, onHome }: Props) {
  // Generate random mock ID
  const mockId = "ESA-" + new Date().getFullYear() + "-" + String(new Date().getMonth()+1).padStart(2,'0') + "-" + Math.floor(Math.random()*10000).toString().padStart(4, '0')
  
  // Format current date mock
  const dateOptions: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: '2-digit', hour12: true }
  const mockDate = new Date().toLocaleString('en-IN', dateOptions)

  return (
    <div className="flex flex-col h-full animate-in fade-in zoom-in-95 duration-500 pt-10">
      
      {/* Success Icon */}
      <div className="flex justify-center mb-6">
        <div className="w-20 h-20 bg-[#1E9E40] rounded-full flex items-center justify-center shadow-[0_8px_30px_rgba(30,158,64,0.3)] relative">
          <Check className="w-10 h-10 text-white" strokeWidth={3.5} />
          {/* Decorative dots */}
          <div className="absolute top-0 right-0 w-2 h-2 bg-yellow-400 rounded-full animate-ping" />
          <div className="absolute bottom-2 left-0 w-2.5 h-2.5 bg-blue-400 rounded-full animate-bounce" />
          <div className="absolute top-6 -left-3 w-1.5 h-1.5 bg-red-400 rounded-full" />
        </div>
      </div>

      {/* Title */}
      <div className="text-center mb-10">
        <h2 className="text-[22px] font-bold text-[#1E9E40] leading-tight">
          Agreement Completed<br/>Successfully!
        </h2>
      </div>

      {/* Details Box */}
      <div className="bg-white border border-gray-100 shadow-sm rounded-[16px] p-5 space-y-4 mb-8">
        <div>
          <p className="text-[12px] text-gray-500 font-bold mb-1">Agreement ID</p>
          <p className="text-[15px] font-bold text-[#041B4A]">{mockId}</p>
        </div>
        <div className="w-full h-px bg-gray-100" />
        <div>
          <p className="text-[12px] text-gray-500 font-bold mb-1">Date & Time</p>
          <p className="text-[14px] font-semibold text-[#041B4A]">{mockDate}</p>
        </div>
      </div>

      <div className="text-center mb-10">
        <p className="text-[13.5px] font-semibold text-[#041B4A] leading-relaxed px-4">
          This agreement is legally valid<br/>and securely stored.
        </p>
      </div>

      {/* Actions */}
      <div className="space-y-3 mt-auto mb-8">
        <Button 
          className="w-full h-[52px] bg-[#0033A0] hover:bg-[#002277] text-white rounded-[14px] text-[16px] font-bold shadow-lg flex items-center justify-center gap-2"
        >
          <Download className="w-5 h-5" /> Download PDF
        </Button>
        <Button 
          variant="outline"
          className="w-full h-[52px] border-2 border-gray-200 text-[#041B4A] hover:bg-gray-50 rounded-[14px] text-[16px] font-bold flex items-center justify-center gap-2"
        >
          <Share2 className="w-5 h-5" /> Share Agreement
        </Button>
        <button 
          onClick={onHome}
          className="w-full h-[52px] text-[#0033A0] text-[15px] font-bold mt-2 hover:bg-[#0033A0]/5 rounded-[14px] transition-colors"
        >
          View My Agreements
        </button>
      </div>

      <div className="text-center pb-6">
        <p className="text-[12px] font-bold text-gray-400">
          <span className="text-[#1E9E40]">Thank You!</span><br/>
          For using eSaleagreement.in
        </p>
      </div>

    </div>
  )
}
