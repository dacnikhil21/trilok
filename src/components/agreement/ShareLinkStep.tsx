import * as React from "react"
import { CheckCircle2, Copy, Check, MessageSquare, Mail, Share2, MoreHorizontal, ArrowRight, Sparkles } from "lucide-react"
import { AgreementData } from "@/app/create-agreement/page"
import { Button } from "@/components/ui/button"

type Props = {
  data: AgreementData
  onNext: () => void
  onGoToAgreements?: () => void
}

export function ShareLinkStep({ data, onNext }: Props) {
  const [copied, setCopied] = React.useState(false)
  const agreementId = "esa" + (data.customerMobile?.slice(-4) || "1234") + "5678"
  const shareUrl = `https://esaleagreement.in/sign/${agreementId}`

  const handleCopy = () => {
    navigator.clipboard?.writeText(shareUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const shareChannels = [
    { name: "WhatsApp", icon: MessageSquare, color: "bg-[#25D366] text-white" },
    { name: "SMS", icon: MessageSquare, color: "bg-[#10B981] text-white" },
    { name: "Email", icon: Mail, color: "bg-[#2563EB] text-white" },
    { name: "Share Link", icon: Share2, color: "bg-[#6366F1] text-white" },
    { name: "More", icon: MoreHorizontal, color: "bg-[#64748B] text-white" },
  ]

  return (
    <div className="flex flex-col h-full animate-in fade-in slide-in-from-right-4 duration-500">
      {/* Success Notification Banner */}
      <div className="flex items-center gap-2.5 rounded-[14px] bg-[#F0FDF4] border border-[#BBF7D0] p-3.5 mb-5 shadow-xs shrink-0">
        <CheckCircle2 className="h-5 w-5 text-[#16A34A] shrink-0" />
        <span className="text-[13.5px] font-bold text-[#15803D]">
          You have eSigned successfully!
        </span>
      </div>

      <div className="space-y-4 flex-1 overflow-y-auto pr-0.5">
        {/* Title */}
        <div className="text-left">
          <h2 className="text-[16px] font-bold text-[#0F172A] leading-snug">
            Share this link with the other party for their eSignature
          </h2>
        </div>

        {/* Link Copy Box */}
        <div className="rounded-[16px] border border-[#CBD5E1] bg-white p-3.5 shadow-sm flex items-center justify-between gap-2">
          <span className="text-[13px] font-semibold text-[#334155] truncate">
            {shareUrl}
          </span>
          <button
            type="button"
            onClick={handleCopy}
            className="flex h-9 items-center gap-1.5 rounded-[10px] bg-[#EFF6FF] px-3 text-[12px] font-bold text-[#2563EB] hover:bg-[#DBEAFE] shrink-0 active:scale-95 transition-all"
          >
            {copied ? (
              <>
                <Check className="h-4 w-4 text-[#16A34A]" />
                <span className="text-[#16A34A]">Copied</span>
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>

        {/* Share Via Channels */}
        <div className="space-y-2">
          <p className="text-[11.5px] font-bold uppercase tracking-wider text-[#94A3B8]">Share via</p>
          <div className="flex items-center justify-between gap-1 overflow-x-auto pb-1">
            {shareChannels.map((ch) => {
              const Icon = ch.icon
              return (
                <button
                  key={ch.name}
                  type="button"
                  onClick={handleCopy}
                  className="flex flex-col items-center gap-1.5 p-1 shrink-0 active:scale-95 transition-transform"
                >
                  <div className={`flex h-12 w-12 items-center justify-center rounded-full shadow-sm ${ch.color}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="text-[11px] font-bold text-[#475569]">{ch.name}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Info Banner */}
        <div className="flex items-start gap-2.5 rounded-[14px] bg-[#EFF6FF] border border-[#BFDBFE] p-3.5 text-[12px] text-[#1E40AF]">
          <Sparkles className="h-4 w-4 text-[#2563EB] shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            The other party will sign using this link. You will be notified once they complete their signature.
          </p>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="mt-4 pt-3 border-t border-[#F1F5F9] shrink-0">
        <Button
          onClick={onNext}
          className="h-[52px] w-full rounded-[14px] bg-[#2563EB] hover:bg-[#1D4ED8] text-[16px] font-bold text-white shadow-lg active:scale-[0.99] flex items-center justify-center gap-2"
        >
          <span>Track Agreement Status</span>
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
