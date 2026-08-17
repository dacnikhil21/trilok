import * as React from "react"
import { CheckCircle2, Clock, RefreshCw, Bell, ArrowRight, Loader2 } from "lucide-react"
import { AgreementData } from "@/app/create-agreement/page"
import { Button } from "@/components/ui/button"

type Props = {
  data?: AgreementData
  onNext: () => void
}

export function WaitingForResponseStep({ data, onNext }: Props) {
  const [checking, setChecking] = React.useState(false)

  const isSeller = data?.role === "seller"
  const creatorName = isSeller ? (data?.customerName || "Ravi Kumar") : (data?.customerName || "Rajesh Kumar")
  const creatorRole = isSeller ? "Seller" : "Buyer"
  const otherName = isSeller ? (data?.invitedPartyName || "Rajesh Kumar") : (data?.invitedPartyName || "Ravi Kumar")
  const otherRole = isSeller ? "Buyer" : "Seller"
  const docTitle = data?.category ? `${data.category} Agreement` : "Mobile Phone Sale Agreement"
  const amount = data?.saleAmount || data?.monthlyRent || data?.totalCharges || "45,000"

  const now = new Date()
  const formattedTime = now.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }) + ", " + now.toLocaleTimeString("en-IN", { hour: "numeric", minute: "2-digit", hour12: true })

  const handleCheckApproval = () => {
    setChecking(true)
    setTimeout(() => {
      setChecking(false)
      onNext() // Directly moves to Agreement Completed!
    }, 1000)
  }

  return (
    <div className="flex flex-col h-full animate-in fade-in slide-in-from-right-4 duration-500">
      {/* Title */}
      <div className="text-center mt-2 mb-5 shrink-0">
        <h2 className="text-[20px] font-bold text-[#0F172A] leading-tight">Waiting for Other Party</h2>
        <p className="text-[13px] text-[#64748B] mt-1 font-medium">
          The agreement link has been sent successfully.
        </p>
      </div>

      <div className="space-y-4 flex-1 overflow-y-auto pr-0.5">
        {/* Document Info Card */}
        <div className="rounded-[16px] border border-[#E2E8F0] bg-white p-4 shadow-sm text-left space-y-2.5">
          <div className="flex justify-between py-1 border-b border-[#F1F5F9] text-[13px]">
            <span className="text-[#64748B] font-medium">Document:</span>
            <span className="font-bold text-[#0F172A] text-right">{docTitle}</span>
          </div>
          <div className="flex justify-between py-1 border-b border-[#F1F5F9] text-[13px]">
            <span className="text-[#64748B] font-medium">Creator:</span>
            <span className="font-bold text-[#0F172A] text-right">{creatorName} ({creatorRole})</span>
          </div>
          <div className="flex justify-between py-1 text-[13px]">
            <span className="text-[#64748B] font-medium">Amount:</span>
            <span className="font-bold text-[#16A34A] text-right">
              ₹{Number(amount).toLocaleString("en-IN") || amount}
            </span>
          </div>
        </div>

        {/* Signed By Status List */}
        <div className="rounded-[16px] border border-[#E2E8F0] bg-white p-4 shadow-sm text-left space-y-3">
          <p className="text-[12px] font-bold uppercase tracking-wider text-[#94A3B8]">Signed By</p>

          <div className="space-y-3">
            {/* Creator Item (Signed) */}
            <div className="flex items-start justify-between gap-2 pb-2.5 border-b border-[#F1F5F9]">
              <div>
                <p className="text-[13.5px] font-bold text-[#0F172A]">
                  1. {creatorName} (You - {creatorRole})
                </p>
                <p className="text-[11px] text-[#94A3B8] mt-0.5">{formattedTime}</p>
              </div>
              <div className="flex items-center gap-1 rounded-full bg-[#F0FDF4] px-2.5 py-1 text-[11px] font-bold text-[#16A34A] shrink-0">
                <CheckCircle2 className="h-3.5 w-3.5" />
                <span>Signed</span>
              </div>
            </div>

            {/* Second Party Item (Pending / Awaiting) */}
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-[13.5px] font-bold text-[#0F172A]">
                  2. {otherName} ({otherRole})
                </p>
                <p className="text-[11px] text-[#EA580C] mt-0.5">Awaiting signature via WhatsApp / SMS</p>
              </div>
              <div className="flex items-center gap-1 rounded-full bg-[#FFF7ED] px-2.5 py-1 text-[11px] font-bold text-[#EA580C] shrink-0">
                <Clock className="h-3.5 w-3.5" />
                <span>Pending</span>
              </div>
            </div>
          </div>
        </div>

        {/* Notification Banner */}
        <div className="flex items-start gap-2.5 rounded-[14px] bg-[#EFF6FF] border border-[#BFDBFE] p-3.5 text-[12px] text-[#1E40AF]">
          <Bell className="h-4 w-4 text-[#2563EB] shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            You will be notified automatically when {otherName} completes their signature.
          </p>
        </div>
      </div>

      {/* Footer CTAs */}
      <div className="mt-4 pt-3 border-t border-[#F1F5F9] shrink-0 space-y-2">
        <Button
          onClick={handleCheckApproval}
          disabled={checking}
          className="h-[52px] w-full rounded-[14px] bg-[#2563EB] hover:bg-[#1D4ED8] text-[16px] font-bold text-white shadow-lg active:scale-[0.99] flex items-center justify-center gap-2"
        >
          {checking ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Checking Signature Status...
            </>
          ) : (
            <>
              <RefreshCw className="h-4 w-4 mr-1" />
              Check Status / View Agreement
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
