"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { ServiceSelectionForm } from "@/components/auth/ServiceSelectionForm"
import { TermsModal } from "@/components/ui/TermsModal"
import {
  ShieldCheck, Phone, ChevronDown, ArrowRight, Shield,
  Fingerprint, Lock, CheckCircle2, User, UserPlus
} from "lucide-react"
import { MobileAppShell } from "@/components/ui/MobileAppShell"
import { OnboardingHeader } from "@/components/layout/OnboardingHeader"
import { useDevSettingsHandlers } from "@/components/ui/DevSettingsProvider"

export default function LoginPage() {
  const router = useRouter()
  const [mobile, setMobile] = React.useState("")
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState("")
  const [activeTab, setActiveTab] = React.useState<"login" | "register">("login")
  const [isTermsOpen, setIsTermsOpen] = React.useState(false)

  useDevSettingsHandlers({
    onAutoFillAadhaar: () => setMobile("9876543210"),
  })

  const handleMobileChange = (val: string) => {
    const clean = val.replace(/\D/g, "").slice(0, 10)
    setMobile(clean)
    setError("")
  }

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    if (mobile.length !== 10) {
      setError("Please enter a valid 10-digit mobile number.")
      return
    }
    setIsLoading(true)
    if (typeof window !== "undefined") {
      sessionStorage.setItem("user_mobile", mobile)
    }
    setTimeout(() => {
      setIsLoading(false)
      router.push("/otp")
    }, 600)
  }

  const isButtonDisabled = mobile.length !== 10

  const headerContent = <OnboardingHeader />

  return (
    <MobileAppShell header={headerContent} contentClassName="pb-4">
      <div className="w-full flex flex-col space-y-4 py-1">
        {/* SECTION 1: Welcome Headline & Subtext */}
        <div className="w-full text-center space-y-1">
          <h2 className="text-[19px] font-extrabold text-[#0F172A] tracking-tight leading-tight">
            {activeTab === 'login' ? "Welcome Back! 👋" : "Create your account 👋"}
          </h2>
          <p className="text-[12.5px] text-slate-600 font-medium max-w-[300px] leading-snug mx-auto">
            Secure access to your digital sale agreements.
          </p>
        </div>

        {/* SECTION 2: 44px Capsule Pill Segmented Control */}
        <div className="w-full bg-slate-100/90 border border-slate-200/80 rounded-[18px] p-1 shadow-2xs">
          <div className="grid grid-cols-2 gap-1">
            <button
              type="button"
              className={`h-[44px] rounded-[15px] font-bold text-[14px] flex items-center justify-center gap-2 transition-all ${
                activeTab === 'login'
                  ? 'bg-[#0052CC] text-white shadow-md shadow-[#0052CC]/25'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
              onClick={() => setActiveTab('login')}
            >
              <User className={`w-4 h-4 ${activeTab === 'login' ? 'text-white' : 'text-slate-500'}`} />
              <span>Login</span>
            </button>

            <button
              type="button"
              className={`h-[44px] rounded-[15px] font-bold text-[14px] flex items-center justify-center gap-2 transition-all ${
                activeTab === 'register'
                  ? 'bg-[#0052CC] text-white shadow-md shadow-[#0052CC]/25'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
              onClick={() => setActiveTab('register')}
            >
              <UserPlus className={`w-4 h-4 ${activeTab === 'register' ? 'text-white' : 'text-slate-500'}`} />
              <span>Register</span>
            </button>
          </div>
        </div>

        {/* MAIN ACTION FLOW */}
        {activeTab === 'login' ? (
          <div className="w-full flex flex-col space-y-4 pt-1">
            {/* 52px Mobile Number Field */}
            <div>
              <label className="block text-[13.5px] font-bold text-[#0F172A] mb-1.5 px-0.5">
                Mobile Number
              </label>

              <div className={`w-full h-[52px] rounded-[18px] bg-white border ${error ? 'border-red-500' : 'border-slate-300'} shadow-2xs flex items-center px-3 transition-all focus-within:border-[#0052CC] focus-within:ring-2 focus-within:ring-[#0052CC]/15`}>
                <div className="flex items-center gap-1 px-3 py-1.5 rounded-[12px] bg-slate-100/90 border border-slate-200 text-[#0F172A] font-bold text-[14px] shrink-0 mr-2.5">
                  <span>+91</span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
                </div>

                <Phone className="w-4.5 h-4.5 text-[#10B981] shrink-0 mr-2.5" />

                <input
                  type="tel"
                  inputMode="numeric"
                  value={mobile}
                  onChange={(e) => handleMobileChange(e.target.value)}
                  placeholder="Enter mobile number"
                  className="w-full h-full bg-transparent text-[14.5px] font-semibold text-[#0F172A] placeholder:text-slate-400 focus:outline-none"
                />
              </div>
              {error && <p className="text-[11.5px] font-semibold text-red-500 mt-1 px-1">{error}</p>}
            </div>

            {/* 52px CTA BUTTON */}
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isButtonDisabled || isLoading}
              className={`w-full h-[52px] rounded-[18px] bg-gradient-to-r from-[#0052CC] via-[#0077B6] to-[#10B981] text-white font-bold text-[15.5px] flex items-center justify-between px-4 transition-all shadow-[0_6px_20px_rgba(0,82,204,0.35)] active:scale-[0.985] ${
                isButtonDisabled ? 'opacity-85 cursor-not-allowed' : 'hover:opacity-95'
              }`}
            >
              <div className="w-8 h-8 rounded-full bg-white/25 flex items-center justify-center shrink-0 border border-white/30 backdrop-blur-2xs">
                <Shield className="w-4 h-4 text-white fill-white/40" />
              </div>

              <span className="tracking-wide font-extrabold text-[15.5px] text-white drop-shadow-xs">
                {isLoading ? "Sending OTP..." : "Send OTP"}
              </span>

              <ArrowRight className="w-5 h-5 text-white shrink-0 stroke-[2.5]" />
            </button>

            {/* Floating Divider ("or continue with") */}
            <div className="relative flex items-center justify-center py-1">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200" />
              </div>
              <div className="relative bg-white px-3 py-0.5 rounded-full border border-slate-200 shadow-2xs text-[11px] text-slate-600 font-semibold">
                or continue with
              </div>
            </div>

            {/* 50px Social Login Buttons */}
            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                className="h-[50px] bg-white border border-slate-200/90 rounded-[16px] flex items-center justify-center gap-2.5 shadow-2xs hover:bg-slate-50 active:scale-[0.98] transition-all"
              >
                <svg width="19" height="19" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
                <span className="text-[14px] font-bold text-[#0F172A]">Google</span>
              </button>

              <button
                type="button"
                className="h-[50px] bg-white border border-slate-200/90 rounded-[16px] flex items-center justify-center gap-2.5 shadow-2xs hover:bg-slate-50 active:scale-[0.98] transition-all"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" fill="#EA4335" />
                </svg>
                <span className="text-[14px] font-bold text-[#0F172A]">Gmail</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="w-full pt-1">
            <ServiceSelectionForm />
          </div>
        )}

        {/* ── BOTTOM SECTION (TRUST CARDS + LEGAL TERMS + SOCIAL PROOF) ───────────── */}
        <div className="w-full flex flex-col space-y-3.5 pt-3 pb-2 items-center justify-center text-center">
          {/* 4 TRUST CARDS */}
          <div className="w-full bg-white/95 backdrop-blur-xs border border-slate-200/90 rounded-[20px] p-3 shadow-2xs">
            <div className="grid grid-cols-4 gap-1.5 items-start justify-items-center">
              <div className="flex flex-col items-center justify-center text-center p-0.5 w-full">
                <div className="w-9 h-9 rounded-[12px] bg-[#EEF2FF] text-[#3B82F6] flex items-center justify-center shrink-0 mb-1 shadow-2xs">
                  <ShieldCheck className="w-4.5 h-4.5 text-[#3B82F6]" />
                </div>
                <span className="text-[10px] font-bold text-[#0F172A] leading-tight">Secure Legal</span>
              </div>

              <div className="flex flex-col items-center justify-center text-center p-0.5 w-full">
                <div className="w-9 h-9 rounded-[12px] bg-[#ECFDF5] text-[#10B981] flex items-center justify-center shrink-0 mb-1 shadow-2xs">
                  <Fingerprint className="w-4.5 h-4.5 text-[#10B981]" />
                </div>
                <span className="text-[10px] font-bold text-[#0F172A] leading-tight">Aadhaar eKYC</span>
              </div>

              <div className="flex flex-col items-center justify-center text-center p-0.5 w-full">
                <div className="w-9 h-9 rounded-[12px] bg-[#FFFBEB] text-[#D97706] flex items-center justify-center shrink-0 mb-1 shadow-2xs">
                  <Lock className="w-4.5 h-4.5 text-[#D97706]" />
                </div>
                <span className="text-[10px] font-bold text-[#0F172A] leading-tight">Bank-Grade Protection</span>
              </div>

              <div className="flex flex-col items-center justify-center text-center p-0.5 w-full">
                <div className="w-9 h-9 rounded-[12px] bg-[#F5F3FF] text-[#8B5CF6] flex items-center justify-center shrink-0 mb-1 shadow-2xs">
                  <Shield className="w-4.5 h-4.5 text-[#8B5CF6]" />
                </div>
                <span className="text-[10px] font-bold text-[#0F172A] leading-tight">DSDP Compliant</span>
              </div>
            </div>
          </div>

          {/* Legal Terms & Conditions */}
          <div className="w-full flex flex-col items-center justify-center text-center space-y-1">
            <div className="flex items-center justify-center gap-1.5 text-[11.5px] text-slate-600 font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981] shrink-0" />
              <span>By continuing, you agree to our</span>
            </div>

            <div className="flex items-center justify-center gap-2 text-[12px] font-bold">
              <button
                type="button"
                onClick={() => setIsTermsOpen(true)}
                className="text-[#0052CC] hover:underline"
              >
                Terms & Conditions
              </button>
              <span className="text-slate-400">•</span>
              <button
                type="button"
                onClick={() => setIsTermsOpen(true)}
                className="text-[#0052CC] hover:underline"
              >
                Privacy Policy
              </button>
            </div>
          </div>

          {/* Bottom Social Proof */}
          <div className="w-full flex items-center justify-center pt-1">
            <div className="flex items-center gap-1.5 text-[11px] text-slate-700 font-bold px-3 py-1 rounded-full bg-slate-100/90 border border-slate-200/80 shadow-2xs">
              <ShieldCheck className="w-3.5 h-3.5 text-[#0052CC]" />
              <span>Trusted by 10,000+ users across India</span>
            </div>
          </div>
        </div>
      </div>

      <TermsModal isOpen={isTermsOpen} onClose={() => setIsTermsOpen(false)} />
    </MobileAppShell>
  )
}

