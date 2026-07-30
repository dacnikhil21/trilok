"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Check, Wallet, User, Calendar, Phone, IdCard, ArrowRight, Info, HelpCircle, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface C2CVerifiedSuccessStepProps {
  onContinue: () => void
  fullName?: string
  mobile?: string
  aadhaarLast4?: string
  verificationDate?: string
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
      <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#10B981] border-2 border-white flex items-center justify-center shadow-xs">
        <Check className="w-3.5 h-3.5 stroke-[3] text-white" />
      </div>
    </div>
  )
}

export function C2CVerifiedSuccessStep({
  onContinue,
  fullName = "Gulshan Kumar",
  mobile = "98765 43210",
  aadhaarLast4 = "1234",
  verificationDate = "29 May 2024"
}: C2CVerifiedSuccessStepProps) {
  return (
    <div className="w-full space-y-4 animate-in fade-in duration-300">
      
      {/* 1. Person Verified Status Banner Card */}
      <div className="rounded-[20px] bg-white border border-slate-200/90 p-4 sm:p-5 shadow-xs">
        <div className="flex items-stretch gap-3.5 sm:gap-4">
          {/* Left Column: Green Person Shield Badge Icon */}
          <div className="flex flex-col items-center justify-center shrink-0 pr-3.5 sm:pr-4 border-r border-slate-200/80">
            <C2CPersonShieldIcon className="w-13 h-15 sm:w-14 sm:h-16 drop-shadow-xs" />
          </div>

          {/* Right Column: Title & Subtitle */}
          <div className="flex-1 min-w-0 space-y-1 flex flex-col justify-center">
            <h3 className="text-[14.5px] sm:text-[15.5px] font-extrabold text-[#0F172A] leading-snug">
              You are now{" "}
              <span className="text-[#10B981] font-black">Verified and Active</span>
            </h3>
            <p className="text-[11.5px] sm:text-[12px] text-slate-500 font-medium leading-snug">
              Your identity is verified via Aadhaar eKYC. You can now create and sign agreements securely.
            </p>
          </div>
        </div>
      </div>

      {/* 2. PAYMENT SUMMARY Card (2 Side-by-Side Columns for C2C) */}
      <div className="rounded-[20px] bg-white border border-slate-200/90 p-4 sm:p-5 shadow-xs space-y-3.5">
        {/* Header */}
        <div className="flex items-center gap-2 border-b border-slate-100 pb-2.5">
          <div className="w-7 h-7 rounded-full bg-[#F0F5FF] text-[#0052CC] flex items-center justify-center shrink-0">
            <Wallet className="w-4 h-4 stroke-[2.2]" />
          </div>
          <h4 className="text-[12.5px] font-black text-[#0033A0] tracking-wider uppercase">
            PAYMENT SUMMARY
          </h4>
        </div>

        {/* 2-Column Side-by-Side Summary Box */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 rounded-[16px] bg-slate-50/60 border border-slate-200/70 p-3 sm:p-4">
          {/* Column 1: Profile Verification */}
          <div className="space-y-1.5 border-r border-slate-200/70 pr-2 sm:pr-4 flex flex-col justify-between">
            <div>
              <span className="block text-[11.5px] sm:text-[12.5px] font-extrabold text-[#0F172A] leading-tight">Profile Verification</span>
              <div className="text-[24px] sm:text-[28px] font-black text-[#10B981] leading-none mt-1">₹0</div>
              <p className="text-[10.5px] sm:text-[11px] text-slate-500 font-medium mt-0.5">Free Verification</p>
            </div>
            
            <div className="pt-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] sm:text-[11px] font-bold bg-[#E6F4EA] text-[#047857] border border-[#BBE3CA] whitespace-nowrap">
                <Check className="w-3.5 h-3.5 stroke-[3] text-white bg-[#10B981] rounded-full p-0.5 shrink-0" /> Completed Successfully
              </span>
            </div>
          </div>

          {/* Column 2: Agreement Creation */}
          <div className="space-y-1.5 pl-1 sm:pl-2 flex flex-col justify-between">
            <div>
              <span className="block text-[11.5px] sm:text-[12.5px] font-extrabold text-[#0F172A] leading-tight">Agreement Creation</span>
              <div className="text-[24px] sm:text-[28px] font-black text-[#0052CC] leading-none mt-1">₹99</div>
              <p className="text-[10.5px] sm:text-[11px] text-slate-500 font-medium mt-0.5">Per Agreement</p>
            </div>

            <div className="pt-2">
              <div className="p-2 rounded-[10px] bg-[#F0F5FF] border border-[#D0E2FF] flex items-start gap-1.5 text-[10px] sm:text-[11px] text-[#0052CC] font-semibold leading-tight">
                <Info className="w-3.5 h-3.5 shrink-0 mt-0.5 stroke-[2.2]" />
                <span>Pay ₹99 only when you create an agreement.</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. YOUR DETAILS Card */}
      <div className="rounded-[20px] bg-white border border-slate-200/90 p-4 sm:p-5 shadow-xs space-y-3.5">
        {/* Header */}
        <div className="flex items-center gap-2 border-b border-slate-100 pb-2.5">
          <div className="w-7 h-7 rounded-full bg-[#F0F5FF] text-[#0052CC] flex items-center justify-center shrink-0">
            <User className="w-4 h-4 stroke-[2.2]" />
          </div>
          <h4 className="text-[12.5px] font-black text-[#0033A0] tracking-wider uppercase">
            YOUR DETAILS
          </h4>
        </div>

        {/* 2x2 Side-by-Side Details Grid */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          {/* Detail 1: Full Name */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-[10px] bg-[#E6F4EA] text-[#10B981] flex items-center justify-center shrink-0">
              <User className="w-4 h-4 stroke-[2]" />
            </div>
            <div className="min-w-0">
              <span className="block text-[10.5px] sm:text-[11px] font-semibold text-slate-500">Full Name</span>
              <span className="block text-[12px] sm:text-[13px] font-extrabold text-[#0F172A] truncate">{fullName}</span>
            </div>
          </div>

          {/* Detail 2: Aadhaar Verified */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-[10px] bg-[#E6F4EA] text-[#10B981] flex items-center justify-center shrink-0">
              <IdCard className="w-4 h-4 stroke-[2]" />
            </div>
            <div className="min-w-0">
              <span className="block text-[10.5px] sm:text-[11px] font-semibold text-slate-500">Aadhaar Verified</span>
              <div className="flex items-center gap-1.5">
                <span className="text-[12px] sm:text-[13px] font-extrabold text-[#0F172A] truncate">XXXX XXXX {aadhaarLast4}</span>
                <span className="text-[9.5px] font-bold bg-[#E6F4EA] text-[#047857] px-1.5 py-0.5 rounded-[4px]">Verified</span>
              </div>
            </div>
          </div>

          {/* Detail 3: Mobile Number */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-[10px] bg-[#E6F4EA] text-[#10B981] flex items-center justify-center shrink-0">
              <Phone className="w-4 h-4 stroke-[2]" />
            </div>
            <div className="min-w-0">
              <span className="block text-[10.5px] sm:text-[11px] font-semibold text-slate-500">Mobile Number</span>
              <span className="block text-[12px] sm:text-[13px] font-extrabold text-[#0F172A] truncate">{mobile}</span>
            </div>
          </div>

          {/* Detail 4: Verification Date */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-[10px] bg-[#E6F4EA] text-[#10B981] flex items-center justify-center shrink-0">
              <Calendar className="w-4 h-4 stroke-[2]" />
            </div>
            <div className="min-w-0">
              <span className="block text-[10.5px] sm:text-[11px] font-semibold text-slate-500">Verification Date</span>
              <span className="block text-[12px] sm:text-[13px] font-extrabold text-[#0F172A] truncate">{verificationDate}</span>
            </div>
          </div>
        </div>

        {/* Verification Source Security Pill */}
        <div className="p-2.5 sm:p-3 bg-[#F0FDF4] border border-[#DCFCE7] rounded-[12px] flex items-center gap-2">
          <div className="w-5 h-5 rounded-full bg-[#10B981] text-white flex items-center justify-center shrink-0">
            <Check className="w-3.5 h-3.5 stroke-[3]" />
          </div>
          <span className="text-[11px] sm:text-[11.5px] font-extrabold text-[#15803D]">
            Verified via eKYC (Aadhaar) • DPDP Consent Completed
          </span>
        </div>
      </div>

      {/* 4. Primary Action Button */}
      <button
        type="button"
        onClick={onContinue}
        className="w-full h-[52px] rounded-full bg-gradient-to-r from-[#0052CC] via-[#0077B6] to-[#10B981] text-white font-black text-[15.5px] flex items-center justify-center gap-2 transition-all shadow-[0_6px_20px_rgba(0,82,204,0.3)] active:scale-[0.985] hover:opacity-95 mt-2"
      >
        <span className="tracking-wide text-white drop-shadow-xs">
          Go to Dashboard
        </span>
        <ArrowRight className="w-5 h-5 text-white stroke-[2.5]" />
      </button>

      {/* 5. Footer Helper Links */}
      <div className="flex items-center justify-between text-[11.5px] text-slate-500 pt-1 px-1">
        <div className="flex items-center gap-1.5 font-medium">
          <HelpCircle className="w-4 h-4 text-[#0052CC]" />
          <span>Need help?</span>
        </div>
        <button type="button" className="text-[#0052CC] font-bold hover:underline flex items-center gap-1">
          <span>Contact Support</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

    </div>
  )
}
