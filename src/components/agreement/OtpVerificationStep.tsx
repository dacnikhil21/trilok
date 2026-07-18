import * as React from "react"
import { CheckCircle2 } from "lucide-react"
import { AgreementData } from "@/app/create-agreement/page"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

type Props = {
  data: AgreementData
  updateData: (d: Partial<AgreementData>) => void
  onNext: () => void
}

export function OtpVerificationStep({ data, updateData, onNext }: Props) {
  const isComplete = data.otp.length === 6

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 6)
    updateData({ otp: val })
  }

  return (
    <div className="flex flex-col h-full animate-in fade-in slide-in-from-right-4 duration-500">
      
      {/* Title */}
      <div className="text-center mt-2 mb-8">
        <h2 className="text-[20px] font-bold text-[#041B4A] leading-tight">
          Verify OTP
        </h2>
        <p className="text-[13px] text-gray-500 mt-2 font-medium max-w-[220px] mx-auto">
          Enter the OTP sent to<br/>
          <span className="font-bold text-[#041B4A]">+91 {data.customerMobile || "91234 56789"}</span>
        </p>
      </div>

      {/* OTP Inputs */}
      <div className="flex justify-between items-center w-full px-2">
        {[0, 1, 2, 3, 4, 5].map((index) => (
          <div key={index} className="w-[45px] h-[50px] relative">
            <Input
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={data.otp[index] || ""}
              onChange={(e) => {
                const val = e.target.value.replace(/\D/g, '')
                if (val) {
                  const newOtp = data.otp.split('')
                  newOtp[index] = val
                  updateData({ otp: newOtp.join('') })
                  
                  // Auto focus next
                  if (index < 5) {
                    const nextInput = document.getElementById(`otp-${index + 1}`)
                    nextInput?.focus()
                  }
                }
              }}
              onKeyDown={(e) => {
                if (e.key === 'Backspace' && !data.otp[index] && index > 0) {
                  const prevInput = document.getElementById(`otp-${index - 1}`)
                  prevInput?.focus()
                }
              }}
              id={`otp-${index}`}
              className="absolute inset-0 text-center text-[18px] font-bold bg-white border-gray-200 focus:border-[#0033A0] focus:ring-2 focus:ring-[#0033A0]/20 rounded-[12px] shadow-sm transition-all"
            />
          </div>
        ))}
      </div>

      {/* Resend */}
      <div className="mt-8 text-center">
        <p className="text-[13px] font-bold text-[#0033A0] cursor-pointer hover:underline">
          Resend OTP in 00:30
        </p>
      </div>

      {/* Success Status (Matches UI Mock) */}
      <div className={`mt-6 transition-all duration-300 ${isComplete ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"}`}>
        <div className="flex items-center gap-3 bg-[#EAF7EE] p-3.5 rounded-[12px] border border-[#DCFCE7]">
          <div className="w-5 h-5 rounded-full bg-[#16A34A] flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-3.5 h-3.5 text-white" strokeWidth={3} />
          </div>
          <p className="text-[12px] font-bold text-[#166534] leading-snug">
            Customer Verified<br/>Successfully
          </p>
        </div>
      </div>

      {/* Footer Button */}
      <div className="mt-auto pt-6">
        <Button 
          onClick={onNext}
          className="w-full h-[52px] bg-[#0033A0] hover:bg-[#002277] text-white rounded-[14px] text-[16px] font-bold shadow-lg"
        >
          Next
        </Button>
      </div>

    </div>
  )
}
