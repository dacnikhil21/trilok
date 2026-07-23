"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { AppContainer } from "@/components/ui/AppContainer"
import { ServiceSelectionForm } from "@/components/auth/ServiceSelectionForm"
import { TermsModal } from "@/components/ui/TermsModal"
import { BrandLogo } from "@/components/ui/BrandLogo"
import { 
  ShieldCheck, Phone, ChevronDown, ArrowRight, Shield, 
  Fingerprint, Lock, CheckCircle2 
} from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const [mobile, setMobile] = React.useState("")
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState("")
  const [activeTab, setActiveTab] = React.useState<"login" | "register">("login")
  const [isTermsOpen, setIsTermsOpen] = React.useState(false)

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

  return (
    <AppContainer centered>
      {/* ── Outer Scrollable Container (Content-Driven, NO Viewport Height Calculations) ── */}
      <div className="w-full bg-[#FAFCFF] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-teal-100/40 via-blue-50/20 to-transparent flex flex-col items-center justify-start min-h-screen sm:min-h-0 py-4 px-4 pb-[calc(16px+env(safe-area-inset-bottom,0px))] box-border select-none font-sans overflow-y-auto">
        
        {/* ── Material Design 3 Centered Content Stack (8-Point System) ───────────────── */}
        <div className="w-full max-w-[390px] flex flex-col space-y-4 my-auto sm:my-0">

          {/* ── SECTION 1: Login / Register Segmented Tabs ───────────────────────────── */}
          <div className="w-full flex items-center justify-center pt-1 pb-2 border-b border-slate-200/80">
            <div className="flex justify-center gap-12 relative w-full">
              <button 
                className={`pb-2 text-[15px] font-bold transition-all relative ${activeTab === 'login' ? 'text-[#0052CC]' : 'text-slate-500 hover:text-slate-800'}`}
                onClick={() => setActiveTab('login')}
              >
                Login
                {activeTab === 'login' && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#0052CC] rounded-full" />
                )}
              </button>
              <button 
                className={`pb-2 text-[15px] font-bold transition-all relative ${activeTab === 'register' ? 'text-[#0052CC]' : 'text-slate-500 hover:text-slate-800'}`}
                onClick={() => setActiveTab('register')}
              >
                Register
                {activeTab === 'register' && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#0052CC] rounded-full" />
                )}
              </button>
            </div>
          </div>

          {/* ── SECTION 2 & 3: Brand Logo & Welcome Message ─────────────────────────── */}
          <div className="flex flex-col items-center text-center pt-1 space-y-1.5">
            {/* Section 2: Brand Logo */}
            <div>
              <BrandLogo size="md" />
            </div>

            {/* Section 3: Welcome Message */}
            <div className="space-y-1">
              <h1 className="text-[22px] font-extrabold text-[#0F172A] tracking-tight leading-tight flex items-center justify-center gap-1.5">
                <span>{activeTab === 'login' ? "Welcome Back!" : "Create your account"}</span>
                <span className="text-[21px]">👋</span>
              </h1>
              <p className="text-[12.5px] text-slate-500 font-medium max-w-[280px] leading-snug mx-auto">
                Join thousands securing smart, legal digital sale agreements.
              </p>
            </div>
          </div>

          {/* ── MAIN ACTION FLOW (Sections 4 - 6) ────────────────────────────────────── */}
          {activeTab === 'login' ? (
            <div className="w-full flex flex-col space-y-3.5">
              
              {/* SECTION 4: Mobile Number Field */}
              <div>
                <label className="block text-[13px] font-bold text-[#0F172A] mb-1 px-0.5">
                  Mobile Number
                </label>

                {/* Phone Input Bar */}
                <div className={`w-full h-[48px] rounded-[16px] bg-white border ${error ? 'border-red-500' : 'border-slate-200/90'} shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex items-center px-2 transition-all focus-within:border-[#0052CC] focus-within:ring-2 focus-within:ring-[#0052CC]/15`}>
                  
                  {/* Country Code Pill (+91 ⌄) */}
                  <div className="flex items-center gap-1 px-2.5 py-1 rounded-[10px] bg-slate-50 border border-slate-100 text-[#0F172A] font-bold text-[13.5px] shrink-0 mr-2 cursor-pointer hover:bg-slate-100/80 transition-colors">
                    <span>+91</span>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                  </div>

                  {/* Green Phone Icon */}
                  <Phone className="w-4 h-4 text-[#10B981] shrink-0 mr-2" />

                  {/* Input Field */}
                  <input
                    type="tel"
                    inputMode="numeric"
                    value={mobile}
                    onChange={(e) => handleMobileChange(e.target.value)}
                    placeholder="Enter mobile number"
                    className="w-full h-full bg-transparent text-[14px] font-semibold text-[#0F172A] placeholder:text-slate-400 placeholder:font-normal focus:outline-none"
                  />
                </div>
                {error && <p className="text-[11.5px] font-semibold text-red-500 mt-1 px-1">{error}</p>}
              </div>

              {/* SECTION 5: Gradient Send OTP Button */}
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isButtonDisabled || isLoading}
                className={`w-full h-[48px] rounded-[16px] bg-gradient-to-r from-[#0052CC] to-[#10B981] text-white font-bold text-[15px] flex items-center justify-between px-3.5 transition-all shadow-[0_4px_16px_rgba(0,82,204,0.22)] active:scale-[0.985] ${
                  isButtonDisabled ? 'opacity-70 cursor-not-allowed' : 'hover:opacity-95'
                }`}
              >
                <div className="w-7.5 h-7.5 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                  <Shield className="w-3.5 h-3.5 text-white fill-white/30" />
                </div>
                
                <span className="tracking-wide">{isLoading ? "Sending OTP..." : "Send OTP"}</span>

                <ArrowRight className="w-4.5 h-4.5 text-white shrink-0" />
              </button>

              {/* Floating Divider ("or continue with") */}
              <div className="relative flex items-center justify-center py-0.5">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200/80"></div>
                </div>
                <div className="relative bg-white px-3 py-0.5 rounded-full border border-slate-200/80 shadow-2xs text-[11px] text-slate-500 font-medium">
                  or continue with
                </div>
              </div>

              {/* SECTION 6: Social Login Buttons (Google & WhatsApp) */}
              <div className="grid grid-cols-2 gap-2.5">
                {/* Google Card */}
                <button 
                  type="button"
                  className="h-[46px] bg-white border border-slate-200/90 rounded-[14px] flex items-center justify-center gap-2 shadow-2xs hover:bg-slate-50 active:scale-[0.98] transition-all"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  <span className="text-[13.5px] font-bold text-[#0F172A]">Google</span>
                </button>

                {/* WhatsApp Card */}
                <button 
                  type="button"
                  className="h-[46px] bg-white border border-slate-200/90 rounded-[14px] flex items-center justify-center gap-2 shadow-2xs hover:bg-slate-50 active:scale-[0.98] transition-all"
                >
                  <svg width="19" height="19" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.88-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51h-.57c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.576-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.98 1.005-3.648-.235-.373a9.86 9.86 0 01-1.51-5.26c0-5.445 4.433-9.879 9.882-9.879 2.64 0 5.122 1.029 6.988 2.895A9.825 9.825 0 0121.93 11.91c0 5.442-4.433 9.875-9.879 9.875M19.39 4.606A11.759 11.759 0 0012.053 1.15C5.58 1.15.312 6.417.31 12.89c0 2.071.542 4.09 1.576 5.87L0 25l6.402-1.677a11.8 11.8 0 005.648 1.43h.005c6.47 0 11.737-5.267 11.739-11.74a11.755 11.755 0 00-3.404-8.407" fill="#25D366"/>
                  </svg>
                  <span className="text-[13.5px] font-bold text-[#0F172A]">WhatsApp</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="w-full">
              <ServiceSelectionForm />
            </div>
          )}

          {/* ── SECTION 7: Trust Features (2x2 Card Grid) ─────────────────────────────── */}
          <div className="w-full bg-white/90 backdrop-blur-xs border border-slate-200/80 rounded-[18px] p-2.5 shadow-2xs">
            <div className="grid grid-cols-2 gap-2">
              
              {/* Card 1: Secure Login */}
              <div className="flex items-start gap-2 p-2 rounded-[12px] bg-slate-50/60 hover:bg-slate-50 transition-colors">
                <div className="w-8.5 h-8.5 rounded-[10px] bg-[#EFF6FF] text-[#0052CC] flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4.5 h-4.5 text-[#0052CC]" />
                </div>
                <div className="flex flex-col text-left min-w-0">
                  <span className="text-[11.5px] font-bold text-[#0F172A] leading-tight">Secure Login</span>
                  <span className="text-[10px] text-slate-500 leading-tight mt-0.5">Your data is safe & protected</span>
                </div>
              </div>

              {/* Card 2: Aadhaar eKYC */}
              <div className="flex items-start gap-2 p-2 rounded-[12px] bg-slate-50/60 hover:bg-slate-50 transition-colors">
                <div className="w-8.5 h-8.5 rounded-[10px] bg-[#ECFDF5] text-[#10B981] flex items-center justify-center shrink-0">
                  <Fingerprint className="w-4.5 h-4.5 text-[#10B981]" />
                </div>
                <div className="flex flex-col text-left min-w-0">
                  <span className="text-[11.5px] font-bold text-[#0F172A] leading-tight">Aadhaar eKYC</span>
                  <span className="text-[10px] text-slate-500 leading-tight mt-0.5">Verify securely with Aadhaar</span>
                </div>
              </div>

              {/* Card 3: DPDP Compliant */}
              <div className="flex items-start gap-2 p-2 rounded-[12px] bg-slate-50/60 hover:bg-slate-50 transition-colors">
                <div className="w-8.5 h-8.5 rounded-[10px] bg-[#F5F3FF] text-[#7C3AED] flex items-center justify-center shrink-0">
                  <Shield className="w-4.5 h-4.5 text-[#7C3AED]" />
                </div>
                <div className="flex flex-col text-left min-w-0">
                  <span className="text-[11.5px] font-bold text-[#0F172A] leading-tight">DPDP Compliant</span>
                  <span className="text-[10px] text-slate-500 leading-tight mt-0.5">We respect your privacy</span>
                </div>
              </div>

              {/* Card 4: End-to-End Encrypted */}
              <div className="flex items-start gap-2 p-2 rounded-[12px] bg-slate-50/60 hover:bg-slate-50 transition-colors">
                <div className="w-8.5 h-8.5 rounded-[10px] bg-[#FFFBEB] text-[#D97706] flex items-center justify-center shrink-0">
                  <Lock className="w-4.5 h-4.5 text-[#D97706]" />
                </div>
                <div className="flex flex-col text-left min-w-0">
                  <span className="text-[11.5px] font-bold text-[#0F172A] leading-tight">End-to-End Encrypted</span>
                  <span className="text-[10px] text-slate-500 leading-tight mt-0.5">100% encrypted transactions</span>
                </div>
              </div>

            </div>
          </div>

          {/* ── SECTION 8: Terms & Conditions Disclaimer ──────────────────────────────── */}
          <div className="w-full text-center pt-0.5 pb-1">
            <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-500 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981] shrink-0" />
              <span>By continuing, you agree to our</span>
            </div>

            <div className="flex items-center justify-center gap-2 text-[11.5px] font-bold mt-0.5">
              <button
                type="button"
                onClick={() => setIsTermsOpen(true)}
                className="text-[#0052CC] hover:underline"
              >
                Terms & Conditions
              </button>
              <span className="text-slate-300">•</span>
              <button
                type="button"
                onClick={() => setIsTermsOpen(true)}
                className="text-[#0052CC] hover:underline"
              >
                Privacy Policy
              </button>
            </div>
          </div>

        </div>

        {/* Terms & Conditions Modal */}
        <TermsModal isOpen={isTermsOpen} onClose={() => setIsTermsOpen(false)} />
      </div>
    </AppContainer>
  )
}
