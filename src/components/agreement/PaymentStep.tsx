import * as React from "react"
import { CheckCircle2, ShieldCheck, Lock, Loader2, Sparkles } from "lucide-react"
import { AgreementData } from "@/app/create-agreement/page"
import { Button } from "@/components/ui/button"

type Props = {
  data: AgreementData
  onNext: () => void
}

export function PaymentStep({ data, onNext }: Props) {
  const [processing, setProcessing] = React.useState(false)

  const handlePay = () => {
    setProcessing(true)
    setTimeout(() => {
      setProcessing(false)
      onNext()
    }, 1200)
  }

  const features = [
    "Create agreement",
    "Send eSign link",
    "Secure Digital Signature",
    "Legally Valid Document",
  ]

  return (
    <div className="flex flex-col h-full animate-in fade-in slide-in-from-right-4 duration-500">
      {/* Title */}
      <div className="text-center mt-2 mb-6">
        <h2 className="text-[20px] font-bold text-[#0F172A] leading-tight">Payment Required</h2>
        <p className="text-[13px] text-[#64748B] mt-1 font-medium">
          To create and send agreement link
        </p>
      </div>

      <div className="space-y-4 flex-1 overflow-y-auto pr-0.5">
        {/* Amount Box */}
        <div className="rounded-[20px] border border-[#BFDBFE] bg-gradient-to-b from-[#EFF6FF] to-white p-6 text-center shadow-[0_4px_20px_rgba(37,99,235,0.08)]">
          <p className="text-[13px] font-bold uppercase tracking-wider text-[#64748B]">Amount</p>
          <div className="my-2 flex items-baseline justify-center gap-1">
            <span className="text-[40px] font-black text-[#2563EB] tracking-tight">₹99</span>
          </div>
          <p className="text-[12px] font-bold text-[#475569]">Ninety Nine Rupees Only</p>
        </div>

        {/* What You Get Card */}
        <div className="rounded-[16px] border border-[#E2E8F0] bg-white p-4 shadow-sm">
          <p className="text-[12px] font-bold uppercase tracking-wider text-[#94A3B8] mb-3">
            What you get
          </p>
          <div className="space-y-2.5">
            {features.map((feat) => (
              <div key={feat} className="flex items-center gap-3">
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#DCFCE7] text-[#16A34A] shrink-0">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                </div>
                <span className="text-[13.5px] font-semibold text-[#0F172A]">{feat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Secure Payment Gateway Logos */}
        <div className="rounded-[16px] border border-[#E2E8F0] bg-[#F8FAFC] p-4 text-center">
          <div className="flex items-center justify-center gap-1.5 text-[12px] font-bold text-[#64748B] mb-2">
            <Lock className="h-3.5 w-3.5 text-[#16A34A]" />
            <span>Secure Payment</span>
          </div>
          <p className="text-[10.5px] font-semibold text-[#94A3B8] mb-3">Powered by Razorpay</p>

          <div className="flex items-center justify-center gap-3">
            {/* UPI Badge */}
            <div className="rounded-[6px] border border-[#CBD5E1] bg-white px-2.5 py-1 text-[11px] font-black text-[#0F172A] shadow-xs">
              UPI
            </div>
            {/* VISA */}
            <div className="rounded-[6px] border border-[#CBD5E1] bg-white px-2.5 py-1 text-[11px] font-black italic text-[#1A1F71] shadow-xs">
              VISA
            </div>
            {/* Mastercard */}
            <div className="flex items-center gap-0.5 rounded-[6px] border border-[#CBD5E1] bg-white px-2.5 py-1 shadow-xs">
              <div className="h-3 w-3 rounded-full bg-[#EB001B]" />
              <div className="-ml-1.5 h-3 w-3 rounded-full bg-[#F79E1B] opacity-80" />
            </div>
            {/* RuPay */}
            <div className="rounded-[6px] border border-[#CBD5E1] bg-white px-2.5 py-1 text-[11px] font-black text-[#097939] shadow-xs">
              RuPay
            </div>
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="mt-4 pt-3 border-t border-[#F1F5F9]">
        <Button
          onClick={handlePay}
          disabled={processing}
          className="h-[52px] w-full rounded-[14px] bg-[#2563EB] hover:bg-[#1D4ED8] text-[16px] font-bold text-white shadow-lg active:scale-[0.99] flex items-center justify-center gap-2"
        >
          {processing ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Processing Payment...
            </>
          ) : (
            <>
              <ShieldCheck className="h-5 w-5" />
              Pay ₹99 Securely
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
