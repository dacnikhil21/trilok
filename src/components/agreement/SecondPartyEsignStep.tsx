import * as React from "react"
import { FileSignature, ShieldCheck, CheckCircle2, Loader2, X, Lock } from "lucide-react"
import { AgreementData } from "@/app/create-agreement/page"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

type Props = {
  data: AgreementData
  onNext: () => void
}

export function SecondPartyEsignStep({ data, onNext }: Props) {
  const [showOtpModal, setShowOtpModal] = React.useState(false)
  const [otp, setOtp] = React.useState("")
  const [verifying, setVerifying] = React.useState(false)

  const isSeller = data.role === "seller"
  const creatorName = isSeller ? (data.customerName || "Ravi Kumar") : (data.customerName || "Rajesh Kumar")
  const creatorRole = isSeller ? "Seller" : "Buyer"
  const buyerRole = isSeller ? "Buyer" : "Seller"
  const docTitle = data.category ? `${data.category} Agreement` : "Mobile Phone Sale Agreement"
  const amount = data.saleAmount || data.monthlyRent || data.totalCharges || "45,000"

  const handleVerifyOtp = () => {
    setVerifying(true)
    setTimeout(() => {
      setVerifying(false)
      setShowOtpModal(false)
      onNext() // Advances to Agreement Completed!
    }, 1200)
  }

  return (
    <div className="flex flex-col h-full animate-in fade-in slide-in-from-right-4 duration-500 relative">
      <div className="flex-1 flex flex-col items-center justify-center text-center px-2 py-4">
        {/* Document Illustration (Green Theme) */}
        <div className="relative mb-6">
          <div className="h-28 w-24 rounded-[16px] bg-gradient-to-br from-[#F0FDF4] to-[#DCFCE7] border-2 border-[#86EFAC] shadow-md flex flex-col items-center justify-between p-3 relative overflow-hidden">
            {/* Folded corner effect */}
            <div className="absolute top-0 right-0 w-6 h-6 bg-[#86EFAC] border-b border-l border-[#4ADE80] rounded-bl-[6px]" />
            <div className="w-10 h-1.5 bg-[#86EFAC] rounded-full mt-2" />
            <div className="w-14 h-1 bg-[#BBF7D0] rounded-full" />
            <div className="w-12 h-1 bg-[#BBF7D0] rounded-full" />
            <div className="w-14 h-1 bg-[#BBF7D0] rounded-full" />
            <div className="w-8 h-8 rounded-full bg-[#16A34A] text-white flex items-center justify-center shadow-md">
              <FileSignature className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-[20px] font-bold text-[#0F172A] leading-tight mb-1">
          Please eSign this Document
        </h2>
        <p className="text-[14px] font-semibold text-[#16A34A] mb-6">
          You are the {buyerRole}
        </p>

        {/* Agreement Details Card */}
        <div className="w-full rounded-[16px] border border-[#E2E8F0] bg-white p-4 shadow-sm text-left space-y-2.5 mb-4">
          <div className="flex justify-between py-1 border-b border-[#F1F5F9] text-[13px]">
            <span className="text-[#64748B] font-medium">Document:</span>
            <span className="font-bold text-[#0F172A] text-right">{docTitle}</span>
          </div>
          <div className="flex justify-between py-1 border-b border-[#F1F5F9] text-[13px]">
            <span className="text-[#64748B] font-medium">From:</span>
            <span className="font-bold text-[#0F172A] text-right">{creatorName} ({creatorRole})</span>
          </div>
          <div className="flex justify-between py-1 text-[13px]">
            <span className="text-[#64748B] font-medium">Amount:</span>
            <span className="font-bold text-[#16A34A] text-right">
              ₹{Number(amount).toLocaleString("en-IN") || amount}
            </span>
          </div>
        </div>

        <p className="text-[12.5px] font-medium text-[#64748B] max-w-[280px]">
          Review the document and eSign using your Aadhaar to complete.
        </p>
      </div>

      {/* Footer CTA */}
      <div className="mt-auto pt-3 border-t border-[#F1F5F9]">
        <Button
          onClick={() => setShowOtpModal(true)}
          className="h-[52px] w-full rounded-[14px] bg-[#16A34A] hover:bg-[#15803D] text-[16px] font-bold text-white shadow-lg active:scale-[0.99] flex items-center justify-center gap-2"
        >
          <FileSignature className="h-5 w-5" />
          eSign Now
        </Button>
      </div>

      {/* Aadhaar OTP Modal */}
      {showOtpModal && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-sm rounded-[24px] bg-white p-6 shadow-2xl text-left animate-in slide-in-from-bottom-8 duration-300">
            <div className="flex items-center justify-between pb-3 border-b border-[#F1F5F9]">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F0FDF4] text-[#16A34A]">
                  <Lock className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="text-[15px] font-bold text-[#0F172A]">Aadhaar OTP Verification</h3>
                  <p className="text-[11px] text-[#64748B]">UIDAI eSign Gateway</p>
                </div>
              </div>
              <button
                onClick={() => setShowOtpModal(false)}
                className="text-[#94A3B8] hover:text-[#475569]"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="py-4 space-y-3">
              <p className="text-[12.5px] text-[#475569]">
                Enter the 6-digit OTP sent to your Aadhaar-linked mobile number:
              </p>

              <Input
                type="tel"
                maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                placeholder="• • • • • •"
                className="h-14 text-center text-[22px] font-bold tracking-[0.4em] rounded-[14px] border-[#CBD5E1]"
                autoFocus
              />

              <div className="flex justify-between text-[11px] text-[#64748B]">
                <span>Valid for: 09:59</span>
                <button
                  type="button"
                  onClick={() => setOtp("654321")}
                  className="font-bold text-[#16A34A] hover:underline"
                >
                  Auto-fill (654321)
                </button>
              </div>
            </div>

            <Button
              onClick={handleVerifyOtp}
              disabled={otp.length < 4 || verifying}
              className="h-[50px] w-full rounded-[12px] bg-[#16A34A] hover:bg-[#15803D] text-[15px] font-bold text-white shadow-md flex items-center justify-center gap-2"
            >
              {verifying ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Completing Agreement...
                </>
              ) : (
                <>
                  <ShieldCheck className="h-5 w-5" />
                  Verify & eSign
                </>
              )}
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
