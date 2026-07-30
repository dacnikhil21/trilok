"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { ShieldCheck, Check, Lock, QrCode, ArrowRight, FileEdit, Sparkles, HelpCircle, MessageSquare, User } from "lucide-react"
import { cn } from "@/lib/utils"

interface C2CVerificationStepProps {
  onProceed: () => void
  isLoading?: boolean
  selectedMethod?: "upi" | "qr"
  onMethodChange?: (method: "upi" | "qr") => void
}

function AuthenticUpiLogo() {
  return (
    <div className="flex items-center gap-1.5 shrink-0 mb-0.5">
      <svg className="h-4.5 w-auto" viewBox="0 0 100 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Navy Blue UPI Text */}
        <text x="0" y="24" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="900" fontStyle="italic" fontSize="26" fill="#003399" letterSpacing="0.5">UPI</text>
        {/* Official UPI Arrow Stripes */}
        <path d="M62 6L75 16L62 26H70L83 16L70 6H62Z" fill="#10B981" />
        <path d="M74 6L87 16L74 26H82L95 16L82 6H74Z" fill="#F59E0B" />
      </svg>
    </div>
  )
}

function C2CPersonShieldIcon({ className = "w-13 h-15 sm:w-14 sm:h-16" }: { className?: string }) {
  return (
    <div className="relative inline-block shrink-0">
      <svg className={className} viewBox="0 0 64 74" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Outer Green Shield Shape */}
        <path 
          d="M32 2L59 12V34C59 51.5 47 64 32 70C17 64 5 51.5 5 34V12L32 2Z" 
          fill="#10B981" 
          stroke="#059669"
          strokeWidth="1.5"
        />
        {/* Inner White Trace Line */}
        <path 
          d="M32 6.5L54.5 14.8V34C54.5 48.5 44.5 59 32 64.2C19.5 59 9.5 48.5 9.5 34V14.8L32 6.5Z" 
          stroke="white" 
          strokeWidth="1.6" 
          strokeOpacity="0.75" 
        />
        {/* White Person Silhouette */}
        <circle cx="32" cy="25" r="7" fill="white" />
        <path 
          d="M19 44C19 37.3726 24.3726 32 31 32H33C39.6274 32 45 37.3726 45 44V46H19V44Z" 
          fill="white" 
        />
      </svg>
      {/* Green Checkmark Circle Badge Overlapping Bottom Right */}
      <div className="absolute -bottom-1 -right-1 w-5.5 h-5.5 rounded-full bg-[#10B981] border-2 border-white flex items-center justify-center shadow-xs">
        <Check className="w-3 h-3 stroke-[3] text-white" />
      </div>
    </div>
  )
}

export function C2CVerificationStep({
  onProceed,
  isLoading = false,
  selectedMethod: externalMethod,
  onMethodChange
}: C2CVerificationStepProps) {
  const [internalMethod, setInternalMethod] = React.useState<"upi" | "qr">("upi")
  const selectedMethod = externalMethod ?? internalMethod

  const handleMethodSelect = (method: "upi" | "qr") => {
    setInternalMethod(method)
    if (onMethodChange) {
      onMethodChange(method)
    }
  }

  const [isAuthorized, setIsAuthorized] = React.useState(true)

  return (
    <div className="w-full space-y-4 animate-in fade-in duration-300">
      
      {/* 1. Lifetime Verified Person Tag Banner Card */}
      <div className="relative overflow-hidden rounded-[20px] bg-gradient-to-br from-[#ECF8F1] via-[#F2F9F5] to-[#E6F4EA] border border-[#C5EBD6] p-4 sm:p-5 shadow-xs">
        {/* Subtle Watermark Building Graphics */}
        <div className="absolute right-0 bottom-0 opacity-20 pointer-events-none transform translate-x-2 translate-y-2">
          <svg width="180" height="110" viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 120V60L40 40L60 60V120" stroke="#10B981" strokeWidth="2" strokeDasharray="4 4" />
            <path d="M70 120V40L95 20L120 40V120" stroke="#10B981" strokeWidth="2" />
            <path d="M130 120V70L150 55L170 70V120" stroke="#10B981" strokeWidth="2" strokeDasharray="3 3" />
            <circle cx="150" cy="35" r="16" fill="#10B981" fillOpacity="0.2" />
          </svg>
        </div>

        <div className="relative z-10 flex items-stretch gap-3.5">
          {/* Left Column: Shield Badge */}
          <div className="flex flex-col items-center justify-center shrink-0 pr-2 border-r border-[#D1EAD8]">
            <div className="relative flex items-center justify-center">
              <Sparkles className="absolute -top-1 -left-1 w-4 h-4 text-amber-400 animate-pulse z-10" />
              <Sparkles className="absolute -bottom-1 -right-1 w-3.5 h-3.5 text-amber-400 z-10" />
              
              <C2CPersonShieldIcon className="w-13 h-15 sm:w-14 sm:h-16 drop-shadow-xs" />
            </div>
            
            <div className="mt-1 text-center leading-none">
              <span className="block text-[10px] font-black text-[#047857] tracking-wider uppercase">PERSON</span>
              <span className="block text-[10px] font-black text-[#047857] tracking-wider uppercase mt-0.5">VERIFIED</span>
            </div>
          </div>

          {/* Right Column: Title & Price */}
          <div className="flex-1 min-w-0 space-y-1.5 flex flex-col justify-center">
            <h3 className="text-[16px] sm:text-[17px] font-extrabold text-[#0F172A] leading-tight tracking-tight">
              Get Your Verified Person Tag
            </h3>
            <p className="text-[12px] text-slate-600 font-medium leading-snug">
              Get lifetime identity verification and dashboard access.
            </p>
            
            <div className="pt-1 flex items-center gap-2">
              <span className="text-[28px] sm:text-[30px] font-black text-[#10B981] leading-none tracking-tight">
                ₹0
              </span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#D1F2DF] text-[#047857] border border-[#BBE3CA]">
                Free Verification
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. From Next Agreement Onwards Card (₹99 for C2C) */}
      <div className="relative overflow-hidden rounded-[20px] bg-white border border-[#D0E2FF] p-4 sm:p-5 shadow-xs">
        {/* "BEST VALUE" Top Right Hanging Ribbon Badge */}
        <div className="absolute top-0 right-4 z-20">
          <div 
            className="bg-[#0052CC] text-white text-[9px] font-black tracking-wider uppercase px-2.5 pt-1.5 pb-2.5 shadow-sm text-center min-w-[76px]"
            style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 50% 82%, 0 100%)" }}
          >
            BEST VALUE
          </div>
        </div>

        <div className="space-y-3.5">
          {/* Card Header & Price */}
          <div className="flex items-start gap-3 pt-1">
            <div className="w-11 h-11 rounded-full bg-[#0052CC] text-white flex items-center justify-center shrink-0 shadow-md">
              <FileEdit className="w-5.5 h-5.5 stroke-[2.2]" />
            </div>
            
            <div className="flex-1 min-w-0 pr-16">
              <h4 className="text-[14.5px] font-extrabold text-[#0F172A] leading-snug">
                From Next Agreement Onwards
              </h4>
              <p className="text-[12px] text-slate-500 font-medium">
                Create any C2C sale agreement for just
              </p>
              <div className="mt-0.5 flex items-baseline gap-1">
                <span className="text-[24px] font-black text-[#0052CC] leading-none">₹99</span>
                <span className="text-[12px] font-bold text-slate-600">per agreement</span>
              </div>
            </div>
          </div>

          {/* Features Checklist */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 border-t border-slate-100">
            {[
              "Easy & Fast Agreement Creation",
              "Legally Compliant (DPDP Act 2023)",
              "Secure & Tamper Proof",
              "24/7 Support"
            ].map((feature, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <div className="w-4.5 h-4.5 rounded-full bg-[#0052CC]/10 flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3 text-[#0052CC] stroke-[3]" />
                </div>
                <span className="text-[12px] font-semibold text-slate-700 leading-tight">
                  {feature}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3. Choose Payment Method */}
      <div className="space-y-2 pt-1">
        <h4 className="text-[13.5px] font-extrabold text-[#0F172A]">
          Choose Payment Method
        </h4>

        <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
          {/* Option A: UPI / GPay / PhonePe */}
          <button
            type="button"
            onClick={() => handleMethodSelect("upi")}
            className={cn(
              "p-3 rounded-[16px] border text-left flex items-start gap-2.5 transition-all relative overflow-hidden",
              selectedMethod === "upi"
                ? "border-2 border-[#0052CC] bg-[#F0F5FF] shadow-xs"
                : "border-slate-200/90 bg-white hover:border-slate-300"
            )}
          >
            {/* Radio Dot */}
            <div className={cn(
              "w-4 h-4 rounded-full border flex items-center justify-center shrink-0 mt-0.5 transition-colors",
              selectedMethod === "upi"
                ? "border-[#0052CC] bg-[#0052CC]"
                : "border-slate-300 bg-white"
            )}>
              {selectedMethod === "upi" && (
                <div className="w-1.5 h-1.5 rounded-full bg-white" />
              )}
            </div>

            <div className="flex-1 min-w-0 space-y-0.5">
              <AuthenticUpiLogo />
              <div className="text-[12px] font-extrabold text-[#0F172A] leading-tight whitespace-nowrap overflow-hidden text-ellipsis">
                UPI / GPay / PhonePe
              </div>
              <p className="text-[10.5px] text-slate-500 font-medium leading-tight">
                Pay using any UPI app
              </p>
            </div>
          </button>

          {/* Option B: Scan & Pay */}
          <button
            type="button"
            onClick={() => handleMethodSelect("qr")}
            className={cn(
              "p-3 rounded-[16px] border text-left flex items-start gap-2.5 transition-all relative overflow-hidden",
              selectedMethod === "qr"
                ? "border-2 border-[#0052CC] bg-[#F0F5FF] shadow-xs"
                : "border-slate-200/90 bg-white hover:border-slate-300"
            )}
          >
            {/* Radio Dot */}
            <div className={cn(
              "w-4 h-4 rounded-full border flex items-center justify-center shrink-0 mt-0.5 transition-colors",
              selectedMethod === "qr"
                ? "border-[#0052CC] bg-[#0052CC]"
                : "border-slate-300 bg-white"
            )}>
              {selectedMethod === "qr" && (
                <div className="w-1.5 h-1.5 rounded-full bg-white" />
              )}
            </div>

            <div className="flex-1 min-w-0 space-y-0.5">
              <QrCode className="w-5 h-5 text-[#0F172A]" />
              <div className="text-[12px] font-extrabold text-[#0F172A] leading-tight whitespace-nowrap">
                Scan & Pay
              </div>
              <p className="text-[10.5px] text-slate-500 font-medium leading-tight">
                Pay using any UPI QR
              </p>
            </div>
          </button>
        </div>
      </div>

      {/* 4. Consent Checkbox */}
      <div 
        onClick={() => setIsAuthorized(!isAuthorized)}
        className={cn(
          "p-3 rounded-[14px] border flex items-start gap-2.5 cursor-pointer transition-all",
          isAuthorized ? "border-slate-200 bg-slate-50/50" : "border-slate-200 bg-white"
        )}
      >
        <div className={cn(
          "w-4.5 h-4.5 rounded border flex items-center justify-center shrink-0 mt-0.5 transition-colors",
          isAuthorized ? "bg-[#10B981] border-[#10B981] text-white" : "border-slate-300 bg-white"
        )}>
          {isAuthorized && <Check className="w-3 h-3 stroke-[3]" />}
        </div>
        <span className="text-[11.5px] font-bold text-slate-700 leading-snug select-none">
          I authorize eSaleAgreement to verify my identity and agree to the{" "}
          <span className="text-[#0052CC] underline font-bold">Terms & Conditions</span> and{" "}
          <span className="text-[#0052CC] underline font-bold">Privacy Policy</span>.
        </span>
      </div>

      {/* 5. Security Banner */}
      <div className="p-3 bg-[#F0FDF4] border border-[#DCFCE7] rounded-[14px] flex items-center gap-2.5">
        <div className="w-6 h-6 rounded-[8px] bg-[#10B981] text-white flex items-center justify-center shrink-0 shadow-2xs">
          <Lock className="w-3.5 h-3.5" />
        </div>
        <span className="text-[11.5px] font-bold text-[#15803D]">
          Your data is 100% secure and DPDP Act compliant.
        </span>
      </div>

      {/* 6. Primary Action CTA Button */}
      <button
        type="button"
        onClick={onProceed}
        disabled={isLoading || !isAuthorized}
        className="w-full h-[52px] rounded-full bg-gradient-to-r from-[#0052CC] via-[#0077B6] to-[#10B981] text-white font-black text-[15.5px] flex items-center justify-center gap-2 transition-all shadow-[0_6px_20px_rgba(0,82,204,0.3)] active:scale-[0.985] hover:opacity-95 disabled:opacity-60 disabled:cursor-not-allowed mt-2"
      >
        {isLoading ? (
          <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
        ) : (
          <>
            <ShieldCheck className="w-5 h-5 text-white stroke-[2.5]" />
            <span className="tracking-wide text-white drop-shadow-xs">
              Activate Person Tag & Proceed
            </span>
            <ArrowRight className="w-5 h-5 text-white stroke-[2.5]" />
          </>
        )}
      </button>

      {/* 7. Footer Helper Links */}
      <div className="flex items-center justify-between text-[11.5px] text-slate-500 pt-1 px-1">
        <div className="flex items-center gap-1.5 font-medium">
          <HelpCircle className="w-4 h-4 text-[#0052CC]" />
          <span>Need help?</span>
        </div>
        <button type="button" className="text-[#0052CC] font-bold hover:underline flex items-center gap-1">
          <span>Contact Support</span>
          <MessageSquare className="w-3.5 h-3.5" />
        </button>
      </div>

    </div>
  )
}
