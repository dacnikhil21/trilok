import * as React from "react"
import { ShieldCheck, CheckCircle2, Loader2 } from "lucide-react"
import { AgreementData } from "@/app/create-agreement/page"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

type Props = {
  data: AgreementData
  updateData: (d: Partial<AgreementData>) => void
  onNext: () => void
}

export function BuyerVerificationStep({ data, updateData, onNext }: Props) {
  const [stage, setStage] = React.useState<"aadhaar" | "otp" | "success">("aadhaar")
  const [verifying, setVerifying] = React.useState(false)

  const otherRole = data.role === "seller" ? "Buyer" : "Seller"

  const handleSendOtp = () => {
    setVerifying(true)
    setTimeout(() => {
      setVerifying(false)
      setStage("otp")
    }, 1200)
  }

  const handleVerifyOtp = () => {
    setVerifying(true)
    setTimeout(() => {
      setVerifying(false)
      setStage("success")
      setTimeout(onNext, 1500)
    }, 1200)
  }

  return (
    <div className="flex flex-col h-full animate-in fade-in slide-in-from-right-4 duration-500">
      
      {/* Title */}
      <div className="text-center mt-2 mb-8">
        <div className="inline-block bg-[#0033A0]/10 text-[#0033A0] px-3 py-1 rounded-full text-[11px] font-bold tracking-wide uppercase mb-3">
          {otherRole} Perspective
        </div>
        <h2 className="text-[20px] font-bold text-[#041B4A] leading-tight mb-2">
          {otherRole} Identity Verification
        </h2>
        <p className="text-[13px] text-gray-500 font-medium max-w-[240px] mx-auto">
          The {otherRole.toLowerCase()} verifies their identity via Aadhaar to proceed with the agreement.
        </p>
      </div>

      <div className="flex-1">
        {stage === "aadhaar" && (
          <div className="space-y-6 animate-in fade-in">
            <div className="space-y-1.5">
              <label className="text-[13px] font-bold text-[#041B4A]">
                {otherRole} Aadhaar Number
              </label>
              <Input 
                type="tel"
                value={data.buyerAadhaar}
                onChange={(e) => updateData({ buyerAadhaar: e.target.value.replace(/\D/g, '').slice(0, 12) })}
                placeholder="XXXX XXXX 5678"
                className="px-4 h-14 text-[16px] tracking-widest font-semibold rounded-[12px] border-gray-200"
              />
            </div>

            <Button 
              onClick={handleSendOtp}
              disabled={verifying}
              className="w-full h-[52px] bg-[#0033A0] hover:bg-[#002277] text-white rounded-[14px] text-[16px] font-bold shadow-lg"
            >
              {verifying ? <Loader2 className="w-5 h-5 animate-spin" /> : "Send OTP"}
            </Button>
          </div>
        )}

        {stage === "otp" && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
            <div className="space-y-1.5">
              <label className="text-[13px] font-bold text-[#041B4A]">
                Enter OTP sent to {otherRole}
              </label>
              <Input 
                type="tel"
                value={data.buyerOtp}
                onChange={(e) => updateData({ buyerOtp: e.target.value.replace(/\D/g, '').slice(0, 6) })}
                placeholder="123456"
                className="px-4 h-14 text-[18px] text-center tracking-[0.5em] font-bold rounded-[12px] border-gray-200"
              />
            </div>

            <Button 
              onClick={handleVerifyOtp}
              disabled={verifying}
              className="w-full h-[52px] bg-[#0033A0] hover:bg-[#002277] text-white rounded-[14px] text-[16px] font-bold shadow-lg"
            >
              {verifying ? <Loader2 className="w-5 h-5 animate-spin" /> : "Verify Identity"}
            </Button>
          </div>
        )}

        {stage === "success" && (
          <div className="h-full flex flex-col items-center justify-center animate-in zoom-in-95 duration-300">
            <div className="w-20 h-20 bg-[#EAF7EE] rounded-full flex items-center justify-center mb-4">
              <CheckCircle2 className="w-10 h-10 text-[#1E9E40]" strokeWidth={2.5} />
            </div>
            <h3 className="text-[18px] font-bold text-[#166534]">
              {otherRole} Verified!
            </h3>
            <p className="text-[13px] text-gray-500 mt-2 font-medium">
              Identity confirmed successfully.
            </p>
          </div>
        )}
      </div>

    </div>
  )
}
