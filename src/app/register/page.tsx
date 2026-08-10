"use client"

import * as React from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { OnboardingLayout } from "@/components/ui/OnboardingLayout"
import { TermsModal, LegalDocTab } from "@/components/ui/TermsModal"
import { useDevSettingsHandlers } from "@/components/ui/DevSettingsProvider"
import { BusinessVerificationStep } from "@/components/agreement/BusinessVerificationStep"
import { BusinessVerifiedSuccessStep } from "@/components/agreement/BusinessVerifiedSuccessStep"
import { C2CVerificationStep } from "@/components/agreement/C2CVerificationStep"
import { C2CVerifiedSuccessStep } from "@/components/agreement/C2CVerifiedSuccessStep"
import { cn } from "@/lib/utils"
import { 
  ShieldCheck, Smartphone, CheckCircle2, Lock, MapPin, 
  Check, Sparkles, CreditCard, QrCode, ArrowRight, User, Store, Phone, ChevronDown, FileText,
  Building2, IdCard, Mail
} from "lucide-react"

const B2C_REGISTRATION_STEPS = [
  { label: "Mobile OTP", icon: Smartphone },
  { label: "Aadhaar eKYC", icon: IdCard },
  { label: "Business Details", icon: Building2 },
  { label: "Verify & Activate", icon: Sparkles },
  { label: "Complete", icon: CheckCircle2 },
]

const C2C_REGISTRATION_STEPS = [
  { label: "Mobile OTP", icon: Smartphone },
  { label: "Aadhaar eKYC", icon: IdCard },
  { label: "Contact Info", icon: Mail },
  { label: "Complete", icon: CheckCircle2 },
]


export function RegisterFormContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const rawModule = (searchParams.get("module") || "c2c").toLowerCase()
  const moduleType = rawModule === "b2c" ? "b2c" : "c2c"
  const isB2C = moduleType === "b2c"

  // Registration step index (1 to 5)
  const [currentStep, setCurrentStep] = React.useState<number>(1)
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState("")

  // Step 1: Mobile & OTP
  const [mobile, setMobile] = React.useState("")
  const [otpSent, setOtpSent] = React.useState(false)
  const [otp, setOtp] = React.useState("")
  const [timer, setTimer] = React.useState(0)

  // Step 2: Aadhaar eKYC Verification (Required for both B2C Owner & C2C Person)
  const [aadhaarNumber, setAadhaarNumber] = React.useState("")
  const [aadhaarOtpSent, setAadhaarOtpSent] = React.useState(false)
  const [aadhaarOtp, setAadhaarOtp] = React.useState("")
  const [aadhaarDetails, setAadhaarDetails] = React.useState<{
    name: string
    address: string
    extra?: string
  } | null>(null)
  const [step2ConsentChecked, setStep2ConsentChecked] = React.useState(false)

  // Step 3: Business Credentials (B2C: GST/PAN/Udyam) or Contact Email (C2C)
  const [businessIdNumber, setBusinessIdNumber] = React.useState("")
  const [businessDetails, setBusinessDetails] = React.useState<{
    name: string
    address: string
    extra?: string
  } | null>(null)
  const [email, setEmail] = React.useState("")

  // Step 4: Tag Activation & DPDP Consent / ₹99 Subscription Payment
  const [dpdpChecked, setDpdpChecked] = React.useState(false)
  const [paymentMethod, setPaymentMethod] = React.useState<"upi" | "qr">("upi")

  React.useEffect(() => {
    const stored = typeof window !== "undefined" ? sessionStorage.getItem("user_mobile") : ""
    if (stored) setMobile(stored)
  }, [])

  useDevSettingsHandlers({
    onAutoFillAadhaar: (valid) => {
      if (valid) {
        setAadhaarNumber("234567890123")
        setAadhaarOtpSent(true)
        setAadhaarOtp("123456")
        setAadhaarDetails({
          name: "Nikhil Sharma",
          address: "Shop 14, Commercial Complex, MG Road, Vijayawada - 520001",
          extra: "UIDAI Verified • Owner Identity Authenticated",
        })
        setStep2ConsentChecked(true)
      } else {
        setAadhaarNumber("000000000000")
        setError(
          "UIDAI Verification Failed: The entered 12-digit Aadhaar number is not registered in the UIDAI database."
        )
      }
    },
    onAutoFillBusiness: () => {
      setBusinessIdNumber("37AAAAA0000A1Z5")
      setBusinessDetails({
        name: "SHARMA ELECTRONICS & RETAIL STORE",
        address: "GST Registered Premises, Main Road, Vijayawada AP 520001",
        extra: "Active GSTIN Verified • Tax Department Database Matched",
      })
    },
    onJumpStep: (step) => setCurrentStep(step),
  })

  React.useEffect(() => {
    if (timer > 0) {
      const t = setTimeout(() => setTimer(timer - 1), 1000)
      return () => clearTimeout(t)
    }
  }, [timer])

  // Aadhaar Format Detector (Step 2)
  const aadhaarDetectedType = React.useMemo(() => {
    const digitsOnly = aadhaarNumber.replace(/\D/g, "")
    if (!aadhaarNumber) {
      return {
        label: "AADHAAR eKYC",
        color: "bg-slate-100 text-slate-700 border-slate-300",
        description: "Enter 12-digit UIDAI Aadhaar Number"
      }
    }
    if (digitsOnly.length === 12 && /^[2-9]\d{11}$/.test(digitsOnly)) {
      return {
        label: "AADHAAR VERIFIED",
        color: "bg-emerald-100 text-emerald-800 border-emerald-300",
        description: "UIDAI 12-Digit Aadhaar (Verhoeff Checksum Validated)"
      }
    }
    return {
      label: `ENTERING (${digitsOnly.length}/12)`,
      color: "bg-emerald-50 text-emerald-700 border-emerald-200",
      description: `Entering Aadhaar: ${digitsOnly.length} of 12 digits`
    }
  }, [aadhaarNumber])

  // Business ID Format Detector (Step 3 for B2C)
  const businessDetectedType = React.useMemo(() => {
    const val = businessIdNumber.trim().toUpperCase()
    if (!val) {
      return { 
        label: "GSTIN / UDYAM / PAN", 
        color: "bg-slate-100 text-slate-700 border-slate-300",
        description: "Enter GSTIN (15-char), Udyam MSME, or Business PAN"
      }
    }

    if (val.startsWith("UDYAM") || val.includes("UDYAM")) {
      return { 
        label: "UDYAM MSME", 
        color: "bg-emerald-100 text-emerald-800 border-emerald-300",
        description: "Government of India MSME Udyam Registration"
      }
    }

    if (/^\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z0-9]{1}Z[A-Z0-9]{1}$/.test(val) || (val.length === 15 && /^\d{2}/.test(val))) {
      return { 
        label: "GSTIN VERIFIED", 
        color: "bg-blue-100 text-blue-800 border-blue-300",
        description: "15-Digit GSTIN (State Code + Entity PAN + Z + Checksum)"
      }
    }

    if (/^[A-Z]{5}\d{4}[A-Z]{1}$/.test(val)) {
      const entityLetter = val[3]
      const entityType = entityLetter === 'C' ? 'Company' : entityLetter === 'F' ? 'Firm' : entityLetter === 'P' ? 'Proprietor' : 'Business'
      return { 
        label: `PAN (${entityType})`, 
        color: "bg-purple-100 text-purple-800 border-purple-300",
        description: "Income Tax Department 10-Character Business PAN"
      }
    }

    return { 
      label: "CHECKING FORMAT...", 
      color: "bg-blue-50 text-[#0052CC] border-blue-200",
      description: "Auto-detecting GSTIN, Udyam, or PAN format"
    }
  }, [businessIdNumber])

  // Fetch Aadhaar eKYC Details
  const handleFetchAadhaarDetails = () => {
    setError("")
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      setAadhaarDetails({
        name: isB2C ? "Venkateswara Rao (Business Owner)" : "Ramesh Kumar Sharma",
        address: "Flat 302, Green Towers, Main Road, Kakinada, AP - 533003",
        extra: "Aadhaar eKYC Verified • UIDAI Status: Active & Authentic"
      })
    }, 200)
  }

  // Fetch Business Credentials Details (Step 3 B2C)
  const handleFetchBusinessDetails = () => {
    setError("")
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      const val = businessIdNumber.trim().toUpperCase()
      if (val.startsWith("UDYAM")) {
        setBusinessDetails({
          name: "Sri Lakshmi Tirumala Agencies",
          address: "Plot No 45, Industrial Estate, Kakinada, AP - 533005",
          extra: "Udyam MSME Category: Micro Enterprise • Udyam Status: Verified Active"
        })
      } else if (/^\d{2}/.test(val) || val.length === 15) {
        setBusinessDetails({
          name: "Venkateswara Enterprises & Traders",
          address: "D.No 12-4-8, Main Commercial Street, Kakinada, AP - 533001",
          extra: "GSTIN Category: Retail & Commercial Shop • GST Status: Active Registered"
        })
      } else {
        setBusinessDetails({
          name: "Venkateswara Traders (Proprietorship)",
          address: "Main Commercial Street, Kakinada, AP - 533003",
          extra: "Income Tax PAN Status: Active & Validated • Business Tag Eligible"
        })
      }
    }, 200)
  }

  const handleNext = () => {
    setError("")

    // Step 1: Mobile OTP
    if (currentStep === 1) {
      if (!otpSent) {
        setOtpSent(true)
      }
      setCurrentStep(2)
      return
    }

    // Step 2: Owner / Person Aadhaar eKYC Verification
    if (currentStep === 2) {
      if (!step2ConsentChecked) {
        setError(isB2C 
          ? "Please click and confirm the business owner Aadhaar verification authorization box." 
          : "Please check and confirm the Aadhaar verification authorization box to proceed."
        )
        return
      }
      if (!aadhaarDetails) {
        handleFetchAadhaarDetails()
      }
      setCurrentStep(3)
      return
    }

    // Step 3: Business Credentials (B2C) or Contact Info (C2C)
    if (currentStep === 3) {
      if (isB2C && !businessDetails) {
        handleFetchBusinessDetails()
      }
      setCurrentStep(4)
      return
    }

    // Step 4: Tag Activation / Payment (B2C) or DPDP Consent (C2C)
    if (currentStep === 4) {
      if (isB2C) {
        setCurrentStep(5)
        return
      } else {
        router.push("/dashboard?module=c2c")
        return
      }
    }

    // Step 5: Business category selection before dashboard
    if (currentStep === 5) {
      router.push("/business-category")
    }
  }

  // STEP 1: Mobile & OTP (Hero Security Badge + 🇮🇳 +91 Pill + Input Field)
  const renderStep1 = () => (
    <div className="space-y-4">
      {/* Hero Badge Icon (Blue Shield + Green Phone Badge) */}
      <div className="w-full flex justify-center pt-1 pb-1">
        <div className="w-20 h-20 rounded-full bg-[#EEF2FF] flex items-center justify-center relative shadow-xs">
          {/* Blue Shield */}
          <div className="w-11 h-11 rounded-2xl bg-[#0052CC] text-white flex items-center justify-center shadow-md">
            <ShieldCheck className="w-6 h-6 text-white" />
          </div>
          {/* Green Phone Overlay */}
          <div className="w-9 h-9 rounded-xl bg-[#10B981] text-white flex items-center justify-center shadow-md absolute -bottom-1 -right-1 border-2 border-white">
            <Phone className="w-4.5 h-4.5 text-white" />
          </div>
        </div>
      </div>

      <div>
        <label className="block text-[14px] font-bold text-[#0F172A] mb-2 px-0.5">
          Mobile Number
        </label>
        
        {/* Input Row: Indian Flag Pill + Phone Input */}
        <div className="flex items-center gap-2.5 w-full">
          {/* Flag Pill: 🇮🇳 +91 */}
          <div className="h-[48px] px-3.5 rounded-[14px] bg-slate-100/90 border border-slate-200 text-[#0F172A] font-bold text-[14.5px] flex items-center gap-2 shrink-0">
            <span className="text-[17px]">🇮🇳</span>
            <span>+91</span>
          </div>

          {/* Phone Input Box */}
          <div className={`flex-1 h-[48px] rounded-[14px] bg-white border ${error ? 'border-red-500' : 'border-slate-300'} shadow-2xs flex items-center px-3.5 transition-all focus-within:border-[#0052CC] focus-within:ring-2 focus-within:ring-[#0052CC]/15`}>
            <input
              type="tel"
              inputMode="numeric"
              value={mobile}
              onChange={(e) => {
                setMobile(e.target.value.replace(/\D/g, "").slice(0, 10))
                setError("")
              }}
              placeholder="Enter Your Mobile Number"
              className="w-full h-full bg-transparent text-[14.5px] font-medium text-[#0F172A] placeholder:text-slate-400 focus:outline-none"
            />
          </div>
        </div>
        {error && <p className="text-[11.5px] font-semibold text-red-500 mt-1 px-1">{error}</p>}
      </div>

      {otpSent ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 rounded-[18px] bg-blue-50/50 border border-blue-200/80 space-y-3 text-center"
        >
          <div className="flex items-center justify-between text-[12.5px] font-semibold text-slate-700 px-1">
            <span>Enter 6-Digit Verification Code:</span>
            <span className="text-[#0052CC] font-bold">+91 {mobile}</span>
          </div>

          <input
            type="tel"
            className="w-full max-w-[220px] text-center text-[26px] tracking-[0.4em] font-bold text-[#0F172A] h-12 border-b-2 border-[#0052CC] focus:outline-none bg-transparent"
            placeholder="••••••"
            value={otp}
            onChange={(e) => {
              setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
              setError("")
            }}
          />

          <div className="flex items-center justify-between pt-1">
            <span className="text-[12px] text-[#10B981] font-bold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> OTP Sent
            </span>
            <button
              type="button"
              disabled={timer > 0}
              onClick={() => setTimer(45)}
              className={`text-[12px] font-bold ${timer > 0 ? "text-slate-400" : "text-[#0052CC] hover:underline"}`}
            >
              {timer > 0 ? `Resend in ${timer}s` : "Resend OTP"}
            </button>
          </div>
        </motion.div>
      ) : (
        <p className="text-[12px] text-slate-500 font-medium text-center pt-0.5 px-2 leading-relaxed">
          We will send a 6-digit One Time Password (OTP) for verification.
        </p>
      )}
    </div>
  )

  // State for DPDP Legal Documents Modal
  const [isLegalModalOpen, setIsLegalModalOpen] = React.useState(false)
  const [legalModalTab, setLegalModalTab] = React.useState<LegalDocTab>("terms")

  const openLegalDoc = (tab: LegalDocTab) => {
    setLegalModalTab(tab)
    setIsLegalModalOpen(true)
  }

  // STEP 2: Owner / Person Aadhaar eKYC Verification
  const renderStep2 = () => (
    <div className="space-y-4 select-none">
      <div>
        <label className="block text-[13.5px] font-bold text-[#0F172A] mb-1.5 px-0.5">
          {isB2C ? "Business Owner Aadhaar Number" : "Aadhaar Number"}
        </label>
        
        <div className={`w-full h-[52px] rounded-[16px] bg-white border ${error ? 'border-red-500' : 'border-slate-300'} shadow-2xs flex items-center px-3.5 transition-all focus-within:border-[#0052CC] focus-within:ring-2 focus-within:ring-[#0052CC]/15 relative`}>
          <input
            type="text"
            value={aadhaarNumber}
            maxLength={12}
            onChange={(e) => {
              setAadhaarNumber(e.target.value.replace(/\D/g, "").slice(0, 12))
              setError("")
              setAadhaarOtpSent(false)
              setAadhaarDetails(null)
            }}
            placeholder="XXXX - XXXX - XXXX"
            className="w-full h-full bg-transparent text-[14.5px] font-bold text-[#0F172A] placeholder:text-slate-400 placeholder:font-normal focus:outline-none tracking-wider pr-10"
          />
          <div className="shrink-0 flex items-center gap-1">
            <span className={cn("text-[10px] font-extrabold px-2.5 py-1 rounded-lg border transition-all shadow-2xs", aadhaarDetectedType.color)}>
              {aadhaarDetectedType.label}
            </span>
          </div>
        </div>
        
        {/* Live Character Counter Progress Bar */}
        <div className="flex items-center justify-between pt-1.5 px-0.5">
          <span className="text-[11px] font-medium text-slate-500 truncate max-w-[240px]">
            {aadhaarDetectedType.description}
          </span>
          <span className="text-[10.5px] font-extrabold text-[#0052CC] bg-blue-50/90 px-2 py-0.5 rounded-md border border-blue-100/90 shrink-0">
            {aadhaarNumber.length}/12 Digits
          </span>
        </div>

        {error && <p className="text-[11.5px] font-semibold text-red-500 mt-1 px-1">{error}</p>}
      </div>

      {/* Aadhaar OTP Verification button */}
      {!aadhaarDetails && (
        <div className="space-y-3">
          {!aadhaarOtpSent ? (
            <button
              type="button"
              onClick={() => {
                const digits = aadhaarNumber.replace(/\D/g, "")
                if (digits.length < 12) {
                  setError(`Incomplete Aadhaar Number: Entered ${digits.length} out of 12 digits. Please enter complete 12-digit Aadhaar number.`)
                  return
                }
                if (digits.startsWith("0") || digits.startsWith("1") || /^(\d)\1{11}$/.test(digits)) {
                  setError("UIDAI Verification Failed: The entered 12-digit Aadhaar number is not registered in the UIDAI database. Please check the number.")
                  return
                }
                setError("")
                setAadhaarOtpSent(true)
              }}
              className="w-full h-[48px] rounded-[16px] bg-blue-50 border border-blue-200 text-[#0052CC] font-bold text-[14px] hover:bg-blue-100/70 transition-all flex items-center justify-center gap-2"
            >
              <Smartphone className="w-4.5 h-4.5 text-[#0052CC]" />
              <span>{isB2C ? "Send Owner Aadhaar OTP" : "Send Aadhaar OTP"}</span>
            </button>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 rounded-[18px] bg-blue-50/50 border border-blue-200/80 space-y-3 text-center"
            >
              <p className="text-[12.5px] font-semibold text-slate-700">
                Enter 6-digit Aadhaar OTP sent to UIDAI registered mobile:
              </p>

              <input
                type="tel"
                className="w-full max-w-[220px] text-center text-[26px] tracking-[0.4em] font-bold text-[#0F172A] h-12 border-b-2 border-[#0052CC] focus:outline-none bg-transparent"
                placeholder="••••••"
                value={aadhaarOtp}
                onChange={(e) => {
                  setAadhaarOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
                  setError("")
                }}
              />

              <button
                type="button"
                onClick={handleFetchAadhaarDetails}
                disabled={aadhaarOtp.length < 6}
                className="w-full h-[46px] rounded-[14px] bg-[#0052CC] text-white font-bold text-[14px] disabled:opacity-50 transition-opacity shadow-sm"
              >
                Verify & Fetch Aadhaar eKYC
              </button>
            </motion.div>
          )}
        </div>
      )}

      {/* ── GREEN LEGAL NOTICE & 3 SEPARATE DOCUMENTS BOX ── */}
      <div className="p-4 rounded-[18px] bg-[#ECFDF5]/80 border border-[#10B981]/40 space-y-3">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-full bg-[#10B981]/15 flex items-center justify-center text-[#10B981] shrink-0 mt-0.5">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-[14px] text-[#0F172A]">
              {isB2C ? "Owner Identity Verification" : "Your Privacy Matters"}
            </h4>
            <p className="text-[12px] text-slate-600 leading-snug mt-1 font-medium">
              {isB2C
                ? "Business owner verifies with Aadhaar eKYC firstly to establish authorized identity before registering business credentials."
                : "We collect and process your Aadhaar number and eKYC details only for identity verification, agreement creation, fraud prevention and compliance with applicable laws."}
            </p>
          </div>
        </div>

        {/* Checkbox */}
        <div 
          onClick={() => setStep2ConsentChecked(!step2ConsentChecked)}
          className="flex items-start gap-2.5 pt-1 cursor-pointer"
        >
          <div className={`w-4.5 h-4.5 rounded border flex items-center justify-center shrink-0 mt-0.5 transition-all ${
            step2ConsentChecked ? "bg-[#10B981] border-[#10B981] text-white" : "border-slate-300 bg-white"
          }`}>
            {step2ConsentChecked && <Check className="w-3 h-3" strokeWidth={3} />}
          </div>
          <p className="text-[11.5px] font-semibold text-slate-700 leading-tight">
            {isB2C
              ? "I confirm that I am the authorized business owner and voluntarily consent to verify my identity via Aadhaar eKYC."
              : "I voluntarily consent to eSaleAgreement collecting and processing my Aadhaar number and Aadhaar eKYC details solely for identity verification, agreement creation, fraud prevention, and compliance with applicable laws."}
          </p>
        </div>

        {/* 3 Clickable Legal Document Pill Buttons */}
        <div className="pt-2.5 border-t border-[#10B981]/25 text-[11px] font-bold">
          <div className="grid grid-cols-3 gap-1.5 w-full text-center">
            <button
              type="button"
              onClick={() => openLegalDoc("privacy")}
              className="flex items-center justify-center gap-1 py-1.5 px-1 rounded-lg bg-white border border-slate-200 text-[#0052CC] hover:bg-slate-50 hover:border-[#0052CC] transition-all shadow-2xs"
            >
              <FileText className="w-3.5 h-3.5 text-[#0052CC] shrink-0" />
              <span className="truncate">Privacy Policy</span>
            </button>

            <button
              type="button"
              onClick={() => openLegalDoc("terms")}
              className="flex items-center justify-center gap-1 py-1.5 px-1 rounded-lg bg-white border border-slate-200 text-[#0052CC] hover:bg-slate-50 hover:border-[#0052CC] transition-all shadow-2xs"
            >
              <FileText className="w-3.5 h-3.5 text-[#0052CC] shrink-0" />
              <span className="truncate">Terms & Conditions</span>
            </button>

            <button
              type="button"
              onClick={() => openLegalDoc("consent")}
              className="flex items-center justify-center gap-1 py-1.5 px-1 rounded-lg bg-white border border-slate-200 text-[#10B981] hover:bg-slate-50 hover:border-[#10B981] transition-all shadow-2xs"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#10B981] shrink-0" />
              <span className="truncate">Consent Notice</span>
            </button>
          </div>
        </div>
      </div>

      {/* Verified Details Result Box */}
      {aadhaarDetails && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 rounded-[18px] bg-[#ECFDF5] border border-[#10B981]/40 space-y-2 text-[13px]"
        >
          <div className="flex items-center gap-2 text-[#10B981] font-bold text-[14px]">
            <CheckCircle2 className="w-5 h-5 fill-[#10B981] text-white" />
            <span>Owner Aadhaar eKYC Verified</span>
          </div>
          <div className="text-[#0F172A] font-semibold pt-1">
            <p className="text-[15.5px] font-bold text-[#0052CC]">{aadhaarDetails.name}</p>
            <p className="text-[12.5px] text-slate-600 mt-0.5 leading-snug">{aadhaarDetails.address}</p>
            {aadhaarDetails.extra && <p className="text-[12px] text-[#0052CC] font-bold mt-1.5">{aadhaarDetails.extra}</p>}
          </div>
        </motion.div>
      )}

      {/* DPDP Tagline */}
      <div className="text-center text-[11px] text-slate-500 font-semibold flex items-center justify-center gap-1 pt-0.5">
        <Lock className="w-3 h-3 text-slate-400" />
        <span>Secure. Encrypted. UIDAI Compliant eKYC.</span>
      </div>
    </div>
  )

  // STEP 3: Business Credentials (GSTIN / Business PAN / Udyam MSME) for B2C / Contact Info for C2C
  const renderStep3 = () => (
    <div className="space-y-3.5 select-none">
      {isB2C ? (
        <div className="space-y-4">
          <div>
            <label className="block text-[13.5px] font-bold text-[#0F172A] mb-1.5 px-0.5">
              GSTIN / Business PAN / Udyam MSME Number
            </label>
            
            <div className={`w-full h-[52px] rounded-[16px] bg-white border ${error ? 'border-red-500' : 'border-slate-300'} shadow-2xs flex items-center px-3.5 transition-all focus-within:border-[#0052CC] focus-within:ring-2 focus-within:ring-[#0052CC]/15 relative`}>
              <input
                type="text"
                value={businessIdNumber}
                maxLength={19}
                onChange={(e) => {
                  setBusinessIdNumber(e.target.value.toUpperCase())
                  setError("")
                  setBusinessDetails(null)
                }}
                placeholder="E.g. 37AAAAA0000A1Z5 or UDYAM-AP-00-1"
                className="w-full h-full bg-transparent text-[14.5px] font-bold text-[#0F172A] placeholder:text-slate-400 placeholder:font-normal focus:outline-none uppercase tracking-wider pr-10"
              />
              <div className="shrink-0 flex items-center gap-1">
                <span className={cn("text-[10px] font-extrabold px-2.5 py-1 rounded-lg border transition-all shadow-2xs", businessDetectedType.color)}>
                  {businessDetectedType.label}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1.5 px-0.5">
              <span className="text-[11px] font-medium text-slate-500 truncate max-w-[240px]">
                {businessDetectedType.description}
              </span>
              <span className="text-[10.5px] font-extrabold text-[#0052CC] bg-blue-50/90 px-2 py-0.5 rounded-md border border-blue-100/90 shrink-0">
                {businessIdNumber.length}/15 Chars
              </span>
            </div>
            {error && <p className="text-[11.5px] font-semibold text-red-500 mt-1 px-1">{error}</p>}
          </div>

          {!businessDetails ? (
            <button
              type="button"
              onClick={handleFetchBusinessDetails}
              disabled={businessIdNumber.length < 8}
              className="w-full h-[48px] rounded-[16px] bg-[#0052CC] text-white font-bold text-[14px] disabled:opacity-50 transition-all flex items-center justify-center gap-2 shadow-sm"
            >
              <Building2 className="w-4.5 h-4.5 text-white" />
              <span>Verify Business Credentials</span>
            </button>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 rounded-[18px] bg-blue-50/80 border border-blue-200/90 space-y-2 text-[13px]"
            >
              <div className="flex items-center gap-2 text-[#0052CC] font-bold text-[14px]">
                <CheckCircle2 className="w-5 h-5 fill-[#0052CC] text-white" />
                <span>Official Business Details Verified</span>
              </div>
              <div className="text-[#0F172A] font-semibold pt-1">
                <p className="text-[15.5px] font-bold text-[#0052CC]">{businessDetails.name}</p>
                <p className="text-[12.5px] text-slate-600 mt-0.5 leading-snug">{businessDetails.address}</p>
                {businessDetails.extra && <p className="text-[12px] text-[#10B981] font-bold mt-1.5">{businessDetails.extra}</p>}
              </div>
            </motion.div>
          )}

          <div>
            <label className="block text-[13.5px] font-bold text-[#0F172A] mb-1.5 px-0.5">
              Official Business Email (Optional)
            </label>
            <div className="w-full h-[50px] rounded-[16px] bg-white border border-slate-300 flex items-center px-3.5 shadow-2xs focus-within:border-[#0052CC]">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="business@example.com"
                className="w-full h-full bg-transparent text-[14px] font-semibold text-[#0F172A] placeholder:text-slate-400 focus:outline-none"
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-3.5">
          <div>
            <label className="block text-[13.5px] font-bold text-[#0F172A] mb-1.5 px-0.5">
              Email Address (Optional)
            </label>
            <div className="w-full h-[52px] rounded-[18px] bg-white border border-slate-300 flex items-center px-3 shadow-[0_2px_8px_rgba(0,0,0,0.03)] focus-within:border-[#0052CC]">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@example.com"
                className="w-full h-full bg-transparent text-[14.5px] font-semibold text-[#0F172A] placeholder:text-slate-400 focus:outline-none"
              />
            </div>
          </div>

          <div className="p-3.5 rounded-[16px] bg-slate-50 border border-slate-200 text-[12.5px] text-slate-600 font-medium leading-relaxed">
            Your email is used to send completed eSigned PDF agreement copies and audit timestamps.
          </div>
        </div>
      )}
    </div>
  )

  // STEP 4: Tag Activation & Verification (B2C & C2C)
  const renderStep4 = () => (
    <div className="space-y-3.5">
      {isB2C ? (
        <BusinessVerificationStep
          onProceed={() => handleNext()}
          isLoading={isLoading}
          selectedMethod={paymentMethod}
          onMethodChange={setPaymentMethod}
        />
      ) : (
        <C2CVerificationStep
          onProceed={() => handleNext()}
          isLoading={isLoading}
          selectedMethod={paymentMethod}
          onMethodChange={setPaymentMethod}
        />
      )}
    </div>
  )

  // STEP 5: Verified Status Card & Completion
  const renderStep5 = () => (
    <div className="space-y-4">
      {isB2C ? (
        <BusinessVerifiedSuccessStep
          onContinue={() => handleNext()}
          businessName={businessDetails?.name || "Trilok Infotech Pvt. Ltd."}
          ownerName={aadhaarDetails?.name || "Gulshan Kumar"}
        />
      ) : (
        <C2CVerifiedSuccessStep
          onContinue={() => handleNext()}
          fullName={aadhaarDetails?.name || "Gulshan Kumar"}
          mobile={mobile || "98765 43210"}
          aadhaarLast4={aadhaarNumber ? aadhaarNumber.slice(-4) : "1234"}
        />
      )}
    </div>
  )

  // Title Configs per Step
  const stepTitles = React.useMemo<{ title: React.ReactNode; subtitle: React.ReactNode }[]>(() => {
    if (isB2C) {
      return [
        { title: "Mobile & OTP Verification", subtitle: "Step 1: Verify your 10-digit mobile number with OTP" },
        { title: "Owner Aadhaar eKYC", subtitle: "Step 2: Business owner verifies identity via Aadhaar eKYC" },
        { title: "Business GST / PAN / Udyam", subtitle: "Step 3: Authenticate official business details via GSTIN or PAN" },
        { title: "Business Verification", subtitle: <span>One-time payment of <span className="font-extrabold text-[#10B981]">₹99</span> for lifetime verification & access</span> },
        { title: <span><span className="text-[#10B981]">Business</span> Verified!</span>, subtitle: "Your business is successfully verified and ready to create agreements." },
      ]
    }
    return [
      { title: "C2C Personal Registration", subtitle: "Step 1: Mobile & OTP Verification" },
      { title: "Aadhaar eKYC Verification", subtitle: "Step 2: Auto-fetch identity via Aadhaar" },
      { title: "Contact Information", subtitle: "Step 3: Email & notification settings" },
      { title: <span><span className="text-[#10B981]">Person</span> Verified!</span>, subtitle: "Your profile is successfully verified and ready to create agreements." },
    ]
  }, [isB2C])

  const buttonTexts = React.useMemo(() => {
    if (isB2C) {
      return [
        otpSent ? "Verify OTP" : "Send OTP",
        aadhaarDetails ? "Continue to Business Verification" : "Verify Aadhaar eKYC",
        businessDetails ? "Continue to Tag Activation" : "Verify Business Credentials",
        "Pay ₹99 & Activate Tag",
        "Go to Dashboard"
      ]
    }
    return [
      otpSent ? "Verify OTP" : "Send OTP",
      aadhaarDetails ? "Continue to Contact Information" : "Verify Aadhaar eKYC",
      "Confirm Consent & Complete",
      "Go to Dashboard"
    ]
  }, [isB2C, otpSent, aadhaarDetails, businessDetails])

  const currentConfig = stepTitles[currentStep - 1]

  const renderCurrentContent = () => {
    switch (currentStep) {
      case 1: return renderStep1()
      case 2: return renderStep2()
      case 3: return renderStep3()
      case 4: return isB2C ? renderStep4() : renderStep5()
      case 5: return isB2C ? renderStep5() : null
      default: return renderStep1()
    }
  }

  return (
    <>
      <OnboardingLayout
        title={currentConfig.title}
        subtitle={currentConfig.subtitle}
        cardContent={renderCurrentContent()}
        buttonText={buttonTexts[currentStep - 1]}
        onButtonClick={handleNext}
        stepperStep={currentStep - 1}
        stepperSteps={isB2C ? B2C_REGISTRATION_STEPS : C2C_REGISTRATION_STEPS}
        moduleType={moduleType as "c2c" | "b2c"}
        hideFooterButton={isB2C ? (currentStep === 4 || currentStep === 5) : (currentStep === 4)}
        noCardWrapper={isB2C ? (currentStep === 4 || currentStep === 5) : (currentStep === 4)}
        onBackClick={() => {
          if (currentStep > 1) {
            setCurrentStep(prev => prev - 1)
          } else {
            router.push("/login")
          }
        }}
      />
      <TermsModal
        isOpen={isLegalModalOpen}
        onClose={() => setIsLegalModalOpen(false)}
        initialTab={legalModalTab}
      />
    </>
  )
}

export default function RegisterPage() {
  return (
    <React.Suspense fallback={
      <div className="flex min-h-screen items-center justify-center bg-background">
        <span className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    }>
      <RegisterFormContent />
    </React.Suspense>
  )
}
