import * as React from "react"
import { CheckCircle2, Download, Share2, Sparkles, Check, FileCheck, ArrowRight } from "lucide-react"
import { AgreementData } from "@/app/create-agreement/page"
import { Button } from "@/components/ui/button"

type Props = {
  data: AgreementData
  onHome: () => void
  onViewAgreements?: () => void
}

export function AgreementCompletedStep({ data, onHome, onViewAgreements }: Props) {
  const isSeller = data.role === "seller"
  const sellerName = isSeller ? (data.customerName || "Ravi Kumar") : (data.invitedPartyName || "Ravi Kumar")
  const buyerName = isSeller ? (data.invitedPartyName || "Rajesh Kumar") : (data.customerName || "Rajesh Kumar")
  const docTitle = data.category ? `${data.category} Agreement` : "Mobile Phone Sale Agreement"

  const agreementId = "ESA" + (data.customerMobile?.slice(-4) || "1234") + "5678"

  const now = new Date()
  const dateStr = now.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })
  const timeStr = now.toLocaleTimeString("en-IN", { hour: "numeric", minute: "2-digit", hour12: true })
  const completedTimestamp = `${dateStr}, ${timeStr}`

  const downloadMockPdf = () => {
    const text = `eSaleAgreement Certificate\n\nAgreement ID: ${agreementId}\nDocument: ${docTitle}\nCompleted On: ${completedTimestamp}\n\nSigned By:\n1. ${sellerName} (Seller) - Verified Aadhaar eSign\n2. ${buyerName} (Buyer) - Verified Aadhaar eSign\n\nStatus: Legally Valid & Digitally Signed`
    const blob = new Blob([text], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${agreementId}_Agreement.txt`
    a.click()
  }

  const shareAgreement = () => {
    if (navigator.share) {
      navigator.share({
        title: docTitle,
        text: `Completed eSaleAgreement: ${docTitle} (${agreementId})`,
        url: window.location.href,
      }).catch(() => {})
    } else {
      navigator.clipboard?.writeText(window.location.href)
      alert("Agreement link copied to clipboard!")
    }
  }

  return (
    <div className="flex flex-col h-full animate-in fade-in zoom-in-95 duration-500">
      {/* Visual Success Hero */}
      <div className="flex flex-col items-center justify-center text-center mt-2 mb-4">
        <div className="relative mb-3">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#16A34A] text-white shadow-[0_8px_30px_rgba(22,163,74,0.35)]">
            <Check className="h-10 w-10" strokeWidth={3.5} />
          </div>
          <div className="absolute -top-1 -right-1 text-2xl animate-bounce">✨</div>
          <div className="absolute -bottom-1 -left-1 text-xl animate-pulse">🎉</div>
        </div>

        <h2 className="text-[20px] font-extrabold text-[#0F172A] leading-tight">
          🎉 Agreement Completed!
        </h2>
        <p className="text-[13px] font-semibold text-[#16A34A] mt-1">
          Both parties have signed successfully.
        </p>
      </div>

      <div className="space-y-3.5 flex-1 overflow-y-auto pr-0.5">
        {/* Agreement Metadata Card */}
        <div className="rounded-[16px] border border-[#E2E8F0] bg-white p-4 shadow-sm text-left space-y-2.5">
          <div className="flex justify-between py-1 border-b border-[#F1F5F9] text-[13px]">
            <span className="text-[#64748B] font-medium">Document:</span>
            <span className="font-bold text-[#0F172A] text-right">{docTitle}</span>
          </div>
          <div className="flex justify-between py-1 border-b border-[#F1F5F9] text-[13px]">
            <span className="text-[#64748B] font-medium">Agreement ID:</span>
            <span className="font-bold text-[#2563EB] text-right font-mono">{agreementId}</span>
          </div>
          <div className="flex justify-between py-1 text-[13px]">
            <span className="text-[#64748B] font-medium">Completed On:</span>
            <span className="font-bold text-[#0F172A] text-right">{completedTimestamp}</span>
          </div>
        </div>

        {/* Signed By Status List */}
        <div className="rounded-[16px] border border-[#E2E8F0] bg-white p-4 shadow-sm text-left space-y-3">
          <p className="text-[12px] font-bold uppercase tracking-wider text-[#94A3B8]">Signed By</p>

          <div className="space-y-2.5">
            {/* Seller Signed */}
            <div className="flex items-center justify-between pb-2 border-b border-[#F1F5F9]">
              <div>
                <p className="text-[13px] font-bold text-[#0F172A]">1. {sellerName} (Seller)</p>
                <p className="text-[11px] text-[#94A3B8]">{completedTimestamp}</p>
              </div>
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#DCFCE7] text-[#16A34A]">
                <Check className="h-3.5 w-3.5" strokeWidth={3} />
              </div>
            </div>

            {/* Buyer Signed */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[13px] font-bold text-[#0F172A]">2. {buyerName} (Buyer)</p>
                <p className="text-[11px] text-[#94A3B8]">{completedTimestamp}</p>
              </div>
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#DCFCE7] text-[#16A34A]">
                <Check className="h-3.5 w-3.5" strokeWidth={3} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-4 pt-3 border-t border-[#F1F5F9] space-y-2.5">
        <Button
          onClick={downloadMockPdf}
          className="h-[52px] w-full rounded-[14px] bg-[#1E3A8A] hover:bg-[#172554] text-[16px] font-bold text-white shadow-lg active:scale-[0.99] flex items-center justify-center gap-2"
        >
          <Download className="h-5 w-5" />
          Download PDF
        </Button>

        <button
          type="button"
          onClick={shareAgreement}
          className="h-[48px] w-full rounded-[14px] border border-[#CBD5E1] bg-white text-[15px] font-bold text-[#0F172A] hover:bg-[#F8FAFC] flex items-center justify-center gap-2 transition-colors"
        >
          <Share2 className="h-4 w-4" />
          Share Agreement
        </button>

        <button
          type="button"
          onClick={onViewAgreements || onHome}
          className="w-full text-center text-[14px] font-bold text-[#2563EB] py-2 hover:underline"
        >
          Go to My Agreements →
        </button>
      </div>
    </div>
  )
}
