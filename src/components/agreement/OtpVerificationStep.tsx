import * as React from "react"
import { ShieldCheck, ArrowRight } from "lucide-react"
import { AgreementData } from "@/app/create-agreement/page"
import { Button } from "@/components/ui/button"

type Props = {
  data: AgreementData
  updateData: (d: Partial<AgreementData>) => void
  onNext: () => void
}

export function OtpVerificationStep({ data, updateData, onNext }: Props) {
  const isValid = (data.invitedPartyOtp || "").length === 6

  return (
    <div className="flex flex-col h-full animate-in fade-in slide-in-from-right-4 duration-500">
      
      {/* Title */}
      <div className="text-center mt-2 mb-8">
        <div className="inline-block bg-[#0033A0]/10 text-[#0033A0] px-3 py-1 rounded-full text-[11px] font-bold tracking-wide uppercase mb-3">
          Assisted Identity Verification
        </div>
        <h2 className="text-[20px] font-bold text-[#041B4A] leading-tight mb-2">
          Enter OTP
        </h2>
        <p className="text-[13px] text-gray-500 font-medium max-w-[260px] mx-auto">
          Ask {data.invitedPartyName || "the other party"} for the 6-digit OTP sent to their Aadhaar-linked mobile.
        </p>
      </div>

      {/* OTP Input Mock (Simple 1 field for speed) */}
      <div className="flex justify-center mb-8">
        <input 
          type="tel"
          maxLength={6}
          value={data.invitedPartyOtp || ""}
          onChange={(e) => updateData({ invitedPartyOtp: e.target.value.replace(/\D/g, '') })}
          className="w-full max-w-[240px] text-center text-[32px] tracking-[0.5em] font-bold text-[#041B4A] h-16 border-b-2 border-gray-300 focus:border-[#0033A0] focus:outline-none bg-transparent transition-colors placeholder:text-gray-200"
          placeholder="------"
        />
      </div>

      <div className="text-center mb-8">
        <button className="text-[13px] font-bold text-[#0033A0] hover:underline">
          Resend OTP
        </button>
      </div>

      {/* Footer Button */}
      <div className="mt-auto pt-6 pb-4">
        <Button 
          onClick={onNext}
          disabled={!isValid}
          className="w-full h-[52px] bg-[#0033A0] hover:bg-[#002277] text-white rounded-[14px] text-[16px] font-bold shadow-lg"
        >
          Verify Identity
        </Button>
      </div>

    </div>
  )
}
