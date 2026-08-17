import * as React from "react"
import { Eye, EyeOff, ShieldCheck, ArrowRight, CheckCircle2, Lock } from "lucide-react"
import { AgreementData } from "@/app/create-agreement/page"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

type Props = {
  data: AgreementData
  updateData: (d: Partial<AgreementData>) => void
  onNext: () => void
}

export function AadhaarEsignSetupStep({ data, updateData, onNext }: Props) {
  const [showAadhaar, setShowAadhaar] = React.useState(false)
  const [aadhaar, setAadhaar] = React.useState(data.aadhaarNumber || "")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, "").slice(0, 12)
    setAadhaar(raw)
    updateData({ aadhaarNumber: raw })
  }

  const formatDisplay = (num: string) => {
    if (!showAadhaar && num.length > 4) {
      const visible = num.slice(-4)
      const masked = "XXXX-XXXX-" + visible
      return masked
    }
    return num.replace(/(\d{4})(?=\d)/g, "$1 ")
  }

  const isValid = aadhaar.length === 12

  const steps = [
    { num: "1", title: "Enter Aadhaar Number" },
    { num: "2", title: "We generate eSign link" },
    { num: "3", title: "You sign the document" },
    { num: "4", title: "Share link with other party" },
  ]

  return (
    <div className="flex flex-col h-full animate-in fade-in slide-in-from-right-4 duration-500">
      {/* Title */}
      <div className="text-center mt-2 mb-6">
        <h2 className="text-[20px] font-bold text-[#0F172A] leading-tight">Enter Aadhaar Number</h2>
        <p className="text-[13px] text-[#64748B] mt-1 font-medium">
          To generate secure eSign link
        </p>
      </div>

      <div className="space-y-4 flex-1 overflow-y-auto pr-0.5">
        {/* Aadhaar Input Card */}
        <div className="rounded-[16px] border border-[#E2E8F0] bg-white p-4 shadow-sm space-y-2">
          <label className="text-[13px] font-bold text-[#334155]">Aadhaar Number *</label>
          <div className="relative">
            <Input
              type={showAadhaar ? "tel" : "text"}
              value={showAadhaar ? aadhaar : formatDisplay(aadhaar)}
              onChange={handleChange}
              placeholder="Enter 12-digit Aadhaar number"
              className="h-14 rounded-[12px] border-[#CBD5E1] pr-12 text-[16px] font-bold tracking-wider"
            />
            <button
              type="button"
              onClick={() => setShowAadhaar(!showAadhaar)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-[#64748B]"
            >
              {showAadhaar ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Info Box */}
        <div className="flex items-start gap-3 rounded-[14px] bg-[#EFF6FF] border border-[#BFDBFE] p-3.5">
          <ShieldCheck className="h-5 w-5 text-[#2563EB] shrink-0 mt-0.5" />
          <p className="text-[12px] font-semibold text-[#1E40AF] leading-relaxed">
            Your Aadhaar is used only for eSignature verification and is 100% secure.
          </p>
        </div>

        {/* How it Works Card */}
        <div className="rounded-[16px] border border-[#E2E8F0] bg-white p-4 shadow-sm space-y-3">
          <p className="text-[12px] font-bold uppercase tracking-wider text-[#94A3B8]">How it works</p>
          <div className="space-y-2.5">
            {steps.map((s) => (
              <div key={s.num} className="flex items-center gap-3">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#F1F5F9] text-[12px] font-black text-[#2563EB] shrink-0">
                  {s.num}
                </div>
                <span className="text-[13.5px] font-semibold text-[#0F172A]">{s.title}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="mt-4 pt-3 border-t border-[#F1F5F9]">
        <Button
          onClick={onNext}
          className="h-[52px] w-full rounded-[14px] bg-[#2563EB] hover:bg-[#1D4ED8] text-[16px] font-bold text-white shadow-lg active:scale-[0.99] flex items-center justify-center gap-2"
        >
          Generate eSign Link
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
