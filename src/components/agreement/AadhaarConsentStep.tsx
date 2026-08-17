import * as React from "react"
import { ShieldCheck, Lock, EyeOff, FileText, UserCheck, Info, Check } from "lucide-react"
import { Button } from "@/components/ui/button"

type Props = {
  onNext: () => void
}

export function AadhaarConsentStep({ onNext }: Props) {
  const [agreed, setAgreed] = React.useState(true)

  const steps = ["Enter Aadhaar", "Consent", "eSign Link", "eSign"]

  const consentPoints = [
    {
      icon: ShieldCheck,
      text: "I authorize eSaleAgreement to use my Aadhaar number for eKYC verification.",
    },
    {
      icon: Lock,
      text: "My Aadhaar details will be used only for identity verification and eSignature.",
    },
    {
      icon: EyeOff,
      text: "My Aadhaar number and biometric data will not be stored or shared.",
    },
    {
      icon: FileText,
      text: "The verification will be done through UIDAI approved authentication service.",
    },
    {
      icon: UserCheck,
      text: "I understand that I can withdraw my consent at any time.",
    },
    {
      icon: Info,
      text: "I have read and understood the Privacy Policy and Terms & Conditions.",
    },
  ]

  return (
    <div className="flex flex-col h-full animate-in fade-in slide-in-from-right-4 duration-500">
      {/* 4-Step Process Stepper */}
      <div className="flex items-center justify-between mb-4 px-1 shrink-0">
        {steps.map((label, idx) => {
          const isDone = idx === 0
          const isActive = idx === 1
          return (
            <React.Fragment key={label}>
              <div className="flex flex-col items-center gap-1 shrink-0">
                <div
                  className={`flex h-7 w-7 items-center justify-center rounded-full text-[11px] font-bold ${
                    isDone
                      ? "bg-[#16A34A] text-white"
                      : isActive
                        ? "border-2 border-[#16A34A] bg-white text-[#16A34A]"
                        : "border border-slate-300 bg-white text-slate-400"
                  }`}
                >
                  {isDone ? (
                    <Check className="h-3.5 w-3.5 text-white" strokeWidth={3} />
                  ) : isActive ? (
                    <div className="h-2.5 w-2.5 rounded-full bg-[#16A34A]" />
                  ) : null}
                </div>
                <span
                  className={`text-[10.5px] font-bold ${
                    isDone || isActive ? "text-[#16A34A]" : "text-slate-400"
                  }`}
                >
                  {label}
                </span>
              </div>
              {idx < steps.length - 1 && (
                <div
                  className={`mt-[-12px] h-[2px] flex-1 mx-1 rounded-full ${
                    idx === 0 ? "bg-[#16A34A]" : "bg-[#E2E8F0]"
                  }`}
                />
              )}
            </React.Fragment>
          )
        })}
      </div>

      {/* Main Content Title */}
      <div className="mb-3 shrink-0">
        <h2 className="text-[19px] font-extrabold text-[#0F172A] leading-tight">
          Consent for Aadhaar Verification
        </h2>
        <p className="text-[12.5px] text-[#64748B] mt-1 font-medium leading-snug">
          Your consent is required to use Aadhaar for eSignature verification and document signing.
        </p>
      </div>

      {/* Scrollable Consent Cards */}
      <div className="flex-1 overflow-y-auto space-y-3.5 pr-1 pb-3">
        {/* Why we need your consent Card */}
        <div className="rounded-[16px] border border-[#DCFCE7] bg-[#F0FDF4] p-3.5 flex items-start gap-3 shadow-xs">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#DCFCE7] text-[#16A34A] shrink-0">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-[13px] font-bold text-[#166534]">Why we need your consent?</h3>
            <p className="text-[11.5px] text-[#15803D] mt-0.5 leading-relaxed font-medium">
              We will use your Aadhaar number only for identity verification and eSignature purpose. Your Aadhaar data is secure and will not be stored.
            </p>
          </div>
        </div>

        {/* Declarations List Card */}
        <div className="rounded-[16px] border border-[#E2E8F0] bg-white p-4 shadow-sm space-y-3">
          <p className="text-[12.5px] font-bold text-[#0F172A]">By giving consent, you agree that:</p>

          <div className="space-y-2.5 divide-y divide-[#F1F5F9]">
            {consentPoints.map((item, i) => {
              const Icon = item.icon
              return (
                <div key={i} className={`flex items-start gap-3 ${i > 0 ? "pt-2.5" : ""}`}>
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#F0FDF4] text-[#16A34A] shrink-0 mt-0.5">
                    <Icon className="h-3.5 w-3.5" />
                  </div>
                  <p className="text-[12px] text-[#475569] font-medium leading-relaxed">
                    {item.text}
                  </p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Checkbox agreement */}
        <label className="flex items-start gap-3 rounded-[12px] border border-[#CBD5E1] bg-[#F8FAFC] p-3 cursor-pointer select-none shadow-xs">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="h-4 w-4 rounded border-gray-300 text-[#2563EB] focus:ring-[#2563EB] mt-0.5"
          />
          <span className="text-[11.5px] font-medium text-[#334155] leading-snug">
            I agree to provide my Aadhaar number and give consent for eKYC verification and eSignature as per above declarations.
          </span>
        </label>
      </div>

      {/* Pinned Bottom CTA */}
      <div className="pt-2 pb-1 border-t border-[#F1F5F9] shrink-0 space-y-1.5 text-center">
        <Button
          onClick={onNext}
          className="h-[50px] w-full rounded-[14px] bg-[#2563EB] hover:bg-[#1D4ED8] text-[15px] font-bold text-white shadow-lg active:scale-[0.99]"
        >
          I Agree & Continue
        </Button>
        <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#64748B] font-medium">
          <Lock className="h-3 w-3 text-[#16A34A]" />
          <span>Your data is 100% secure and encrypted</span>
        </div>
      </div>
    </div>
  )
}
