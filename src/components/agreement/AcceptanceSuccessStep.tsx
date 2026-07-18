import * as React from "react"
import { CheckCircle2, UserCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AgreementData } from "@/app/create-agreement/page"

type Props = {
  data: AgreementData
  onNext: () => void
}

export function AcceptanceSuccessStep({ data, onNext }: Props) {
  return (
    <div className="flex flex-col h-full animate-in fade-in zoom-in-95 duration-500">
      
      <div className="flex-1 flex flex-col items-center justify-center -mt-10">
        
        {/* Status Icon */}
        <div className="relative mb-6">
          <div className="w-24 h-24 rounded-full bg-[#EAF7EE] flex items-center justify-center">
            <UserCheck className="w-12 h-12 text-[#1E9E40]" strokeWidth={1.5} />
          </div>
          <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm">
            <CheckCircle2 className="w-7 h-7 text-[#1E9E40]" strokeWidth={2.5} />
          </div>
        </div>

        {/* Text */}
        <h2 className="text-[22px] font-bold text-[#041B4A] leading-tight text-center mb-3">
          Agreement Accepted!
        </h2>
        <p className="text-[14px] text-gray-500 font-medium text-center max-w-[260px] leading-relaxed">
          <span className="font-bold text-[#041B4A]">{data.invitedPartyName || "The other party"}</span> has reviewed and accepted the terms of the agreement.
        </p>

        {/* Note */}
        <div className="mt-8 bg-blue-50 rounded-xl p-4 border border-blue-100 max-w-[300px]">
          <p className="text-[12px] font-medium text-blue-800 leading-relaxed text-center">
            You must now complete their identity verification to make this legally binding.
          </p>
        </div>

      </div>

      <div className="mt-auto pt-6 space-y-4">
        <Button 
          onClick={onNext}
          className="w-full h-[52px] bg-[#0033A0] hover:bg-[#002277] text-white rounded-[14px] text-[16px] font-bold shadow-lg"
        >
          Continue to Verification
        </Button>
      </div>

    </div>
  )
}
