"use client"

import * as React from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { AppContainer } from "@/components/ui/AppContainer"
import { OnboardingLayout } from "@/components/ui/OnboardingLayout"
import { 
  ShieldCheck, Smartphone, CheckCircle2, Lock, MapPin, 
  Check, Sparkles, CreditCard, QrCode, ArrowRight, User, Store, Phone, ChevronDown
} from "lucide-react"

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

  // Step 2: Aadhaar (C2C) or Udyam/GST (B2C)
  const [idNumber, setIdNumber] = React.useState("")
  const [fetchedDetails, setFetchedDetails] = React.useState<{
    name: string
    address: string
    extra?: string
  } | null>(null)

  // Step 3: Email (C2C) or Business Verification (B2C)
  const [email, setEmail] = React.useState("")

  // Step 4: Permissions & DPDP Consent (C2C) or ₹99 Subscription Payment (B2C)
  const [dpdpChecked, setDpdpChecked] = React.useState(false)
  const [locationAllowed, setLocationAllowed] = React.useState(false)
  const [paymentMethod, setPaymentMethod] = React.useState<"upi" | "qr">("upi")

  React.useEffect(() => {
    const stored = typeof window !== "undefined" ? sessionStorage.getItem("user_mobile") : ""
    if (stored) setMobile(stored)
  }, [])

  React.useEffect(() => {
    if (timer > 0) {
      const t = setTimeout(() => setTimer(timer - 1), 1000)
      return () => clearTimeout(t)
    }
  }, [timer])

  // Handle auto-fetch simulation
  const handleFetchIdentity = () => {
    if (idNumber.length < 8) {
      setError(isB2C ? "Please enter a valid GSTIN or Udyam Aadhaar number." : "Please enter a valid 12-digit Aadhaar number.")
      return
    }
    setError("")
    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)
      if (isB2C) {
        setFetchedDetails({
          name: "Venkateswara Enterprises & Traders",
          address: "D.No 12-4-8, Main Road, Kakinada, AP - 533001",
          extra: "Category: Retail & Commercial Shop • GST Status: Active"
        })
      } else {
        setFetchedDetails({
          name: "Ramesh Kumar Sharma",
          address: "Flat 302, Green Towers, Kakinada, Andhra Pradesh - 533003",
          extra: "DOB: 14/08/1992 • Gender: Male"
        })
      }
    }, 900)
  }

  const handleNext = () => {
    setError("")

    // Step 1 validation
    if (currentStep === 1) {
      if (!otpSent) {
        if (mobile.length !== 10) {
          setError("Please enter a valid 10-digit mobile number.")
          return
        }
        setIsLoading(true)
        setTimeout(() => {
          setIsLoading(false)
          setOtpSent(true)
          setTimer(45)
        }, 600)
        return
      } else {
        if (otp.length !== 6) {
          setError("Please enter 6-digit OTP.")
          return
        }
        setCurrentStep(2)
        return
      }
    }

    // Step 2 validation
    if (currentStep === 2) {
      if (!fetchedDetails) {
        handleFetchIdentity()
        return
      }
      setCurrentStep(3)
      return
    }

    // Step 3 validation
    if (currentStep === 3) {
      setCurrentStep(4)
      return
    }

    // Step 4 validation
    if (currentStep === 4) {
      if (!isB2C && !dpdpChecked) {
        setError("Please check and accept the DPDP consent notice.")
        return
      }
      setIsLoading(true)
      setTimeout(() => {
        setIsLoading(false)
        setCurrentStep(5)
      }, 800)
      return
    }

    // Step 5: Redirect to Dashboard
    if (currentStep === 5) {
      router.push(`/dashboard?module=${moduleType}`)
    }
  }

  // Aadhaar OTP State
  const [aadhaarOtpSent, setAadhaarOtpSent] = React.useState(false)
  const [aadhaarOtp, setAadhaarOtp] = React.useState("")

  // STEP 1: Mobile & OTP (52px Input Bar)
  const renderStep1 = () => (
    <div className="space-y-3.5">
      <div>
        <label className="block text-[13.5px] font-bold text-[#0F172A] mb-1.5 px-0.5">
          Mobile Number
        </label>
        
        {/* Custom 52px Phone Input Bar */}
        <div className={`w-full h-[52px] rounded-[18px] bg-white border ${error ? 'border-red-500' : 'border-slate-300'} shadow-[0_2px_8px_rgba(0,0,0,0.03)] flex items-center px-2.5 transition-all focus-within:border-[#0052CC] focus-within:ring-2 focus-within:ring-[#0052CC]/15`}>
          <div className="flex items-center gap-1 px-3 py-1.5 rounded-[12px] bg-slate-100/90 border border-slate-200 text-[#0F172A] font-bold text-[14px] shrink-0 mr-2.5 cursor-pointer">
            <span>+91</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
          </div>
          <Phone className="w-4.5 h-4.5 text-[#10B981] shrink-0 mr-2.5" />
          <input
            type="tel"
            inputMode="numeric"
            value={mobile}
            onChange={(e) => {
              setMobile(e.target.value.replace(/\D/g, "").slice(0, 10))
              setError("")
            }}
            placeholder="Enter mobile number"
            className="w-full h-full bg-transparent text-[14.5px] font-semibold text-[#0F172A] placeholder:text-slate-400 focus:outline-none"
          />
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
        <p className="text-[12.5px] text-slate-600 font-medium px-1">
          We will send a 6-digit verification code to authenticate your account.
        </p>
      )}
    </div>
  )

  // STEP 2: Auto-Fetch Identity with Aadhaar OTP (52px Input Bar)
  const renderStep2 = () => (
    <div className="space-y-3.5">
      <div>
        <label className="block text-[13.5px] font-bold text-[#0F172A] mb-1.5 px-0.5">
          {isB2C ? "Udyam Aadhaar or GSTIN Number" : "Aadhaar Number"}
        </label>
        
        <div className={`w-full h-[52px] rounded-[18px] bg-white border ${error ? 'border-red-500' : 'border-slate-300'} shadow-[0_2px_8px_rgba(0,0,0,0.03)] flex items-center px-3 transition-all focus-within:border-[#0052CC] focus-within:ring-2 focus-within:ring-[#0052CC]/15`}>
          <input
            type="text"
            value={idNumber}
            onChange={(e) => {
              setIdNumber(e.target.value.toUpperCase())
              setError("")
              setAadhaarOtpSent(false)
              setFetchedDetails(null)
            }}
            placeholder={isB2C ? "e.g. 37AAAAA0000A1Z5 or UDYAM-AP-00-12345" : "XXXX - XXXX - XXXX"}
            className="w-full h-full bg-transparent text-[14.5px] font-bold text-[#0F172A] placeholder:text-slate-400 placeholder:font-normal focus:outline-none uppercase tracking-wider"
          />
        </div>
        {error && <p className="text-[11.5px] font-semibold text-red-500 mt-1 px-1">{error}</p>}
      </div>

      {/* Aadhaar OTP Verification block inline below number */}
      {!fetchedDetails && (
        <div className="space-y-3">
          {!aadhaarOtpSent ? (
            <button
              type="button"
              onClick={() => {
                if (idNumber.length < 8) {
                  setError(isB2C ? "Please enter a valid GSTIN/Udyam number." : "Please enter a valid 12-digit Aadhaar number.")
                  return
                }
                setError("")
                setAadhaarOtpSent(true)
              }}
              className="w-full h-[48px] rounded-[16px] bg-blue-50 border border-blue-200 text-[#0052CC] font-bold text-[14px] hover:bg-blue-100/70 transition-all flex items-center justify-center gap-2"
            >
              <Smartphone className="w-4.5 h-4.5 text-[#0052CC]" />
              <span>{isB2C ? "Verify Business GST / Udyam" : "Send Aadhaar OTP"}</span>
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
                onClick={handleFetchIdentity}
                disabled={aadhaarOtp.length < 6}
                className="w-full h-[46px] rounded-[14px] bg-[#0052CC] text-white font-bold text-[14px] disabled:opacity-50 transition-opacity shadow-sm"
              >
                Verify & Fetch eKYC Details
              </button>
            </motion.div>
          )}
        </div>
      )}

      {fetchedDetails && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 rounded-[18px] bg-[#ECFDF5] border border-[#10B981]/40 space-y-2 text-[13px]"
        >
          <div className="flex items-center gap-2 text-[#10B981] font-bold text-[14px]">
            <CheckCircle2 className="w-5 h-5 fill-[#10B981] text-white" />
            <span>{isB2C ? "Business Credentials Verified" : "Aadhaar eKYC Verified"}</span>
          </div>
          <div className="text-[#0F172A] font-semibold pt-1">
            <p className="text-[15.5px] font-bold text-[#0052CC]">{fetchedDetails.name}</p>
            <p className="text-[12.5px] text-slate-600 mt-0.5 leading-snug">{fetchedDetails.address}</p>
            {fetchedDetails.extra && <p className="text-[12px] text-[#0052CC] font-bold mt-1.5">{fetchedDetails.extra}</p>}
          </div>
        </motion.div>
      )}
    </div>
  )

  // STEP 3: Contact & Email (52px Input Bar)
  const renderStep3 = () => (
    <div className="space-y-3.5">
      {isB2C ? (
        <div className="space-y-3">
          <div className="p-4 rounded-[18px] bg-slate-50 border border-slate-200/90 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-[13px] font-bold text-slate-700">Verification Status:</span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100/90 border border-blue-200 text-[#0052CC] text-[12px] font-bold">
                <CheckCircle2 className="w-4 h-4 fill-[#0052CC] text-white" />
                Verified Business Tag Ready
              </span>
            </div>
            <p className="text-[12.5px] text-slate-600 leading-relaxed font-medium">
              Your business profile is authenticated. Future agreements will use your verified credentials automatically.
            </p>
          </div>

          <div>
            <label className="block text-[13.5px] font-bold text-[#0F172A] mb-1.5 px-0.5">
              Official Business Email (Optional)
            </label>
            <div className="w-full h-[52px] rounded-[18px] bg-white border border-slate-300 flex items-center px-3 shadow-[0_2px_8px_rgba(0,0,0,0.03)] focus-within:border-[#0052CC]">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="business@example.com"
                className="w-full h-full bg-transparent text-[14.5px] font-semibold text-[#0F172A] placeholder:text-slate-400 focus:outline-none"
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

  // STEP 4: Permissions/Consent (C2C) or ₹99 Subscription (B2C)
  const renderStep4 = () => (
    <div className="space-y-3.5">
      {isB2C ? (
        <div className="space-y-3.5">
          <div className="p-4 bg-gradient-to-br from-blue-50 via-teal-50/50 to-transparent border border-blue-200/90 rounded-[20px] text-center space-y-2">
            <div className="w-12 h-12 bg-[#0052CC] text-white rounded-full flex items-center justify-center mx-auto shadow-md">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-bold text-[18px] text-[#0F172A] tracking-tight">B2C Lifetime Merchant Access</h3>
            <p className="text-[12.5px] text-slate-600 font-medium leading-relaxed">
              Pay a one-time subscription fee for unlimited agreement generation and customer verification.
            </p>
            <div className="pt-2 flex items-baseline justify-center gap-1">
              <span className="text-[32px] font-bold text-[#0052CC]">₹99</span>
              <span className="text-[13px] font-bold text-slate-600">/ Lifetime Access</span>
            </div>
          </div>

          <div className="space-y-2">
            <span className="text-[12px] font-bold uppercase tracking-wider text-slate-700 px-1">Payment Method</span>
            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => setPaymentMethod("upi")}
                className={`p-3.5 rounded-[16px] border flex flex-col items-center justify-center gap-1.5 transition-all ${
                  paymentMethod === "upi"
                    ? "border-2 border-[#0052CC] bg-blue-50/50 text-[#0052CC] shadow-xs font-bold"
                    : "border-slate-200/90 bg-white text-slate-700 hover:border-slate-300"
                }`}
              >
                <Smartphone className="w-5 h-5" />
                <span className="text-[13px]">UPI / GPay</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod("qr")}
                className={`p-3.5 rounded-[16px] border flex flex-col items-center justify-center gap-1.5 transition-all ${
                  paymentMethod === "qr"
                    ? "border-2 border-[#0052CC] bg-blue-50/50 text-[#0052CC] shadow-xs font-bold"
                    : "border-slate-200/90 bg-white text-slate-700 hover:border-slate-300"
                }`}
              >
                <QrCode className="w-5 h-5" />
                <span className="text-[13px]">Instant QR</span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-3.5">
          <div 
            onClick={() => setLocationAllowed(!locationAllowed)}
            className={`p-3.5 rounded-[16px] border flex items-center justify-between cursor-pointer transition-all ${
              locationAllowed ? "border-2 border-[#0052CC] bg-blue-50/40 text-[#0052CC]" : "border-slate-200/90 bg-white"
            }`}
          >
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-[#0052CC]" />
              <div>
                <h4 className="font-bold text-[14px] leading-none text-[#0F172A]">Location Permission</h4>
                <p className="text-[11.5px] text-slate-600 mt-1 font-medium">Required for legal audit stamping</p>
              </div>
            </div>
            <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${locationAllowed ? "bg-[#0052CC] text-white" : "border-slate-300"}`}>
              {locationAllowed && <Check className="w-3.5 h-3.5" strokeWidth={3} />}
            </div>
          </div>

          <div 
            onClick={() => setDpdpChecked(!dpdpChecked)}
            className={`p-3.5 rounded-[16px] border flex items-start gap-3 cursor-pointer transition-all ${
              dpdpChecked ? "border-2 border-[#0052CC] bg-blue-50/40" : "border-slate-200/90 bg-white"
            }`}
          >
            <div className={`w-5 h-5 rounded border flex items-center justify-center shrink-0 mt-0.5 ${dpdpChecked ? "bg-[#0052CC] border-[#0052CC] text-white" : "border-slate-300"}`}>
              {dpdpChecked && <Check className="w-3.5 h-3.5" strokeWidth={3} />}
            </div>
            <span className="text-[12.5px] font-semibold text-[#0F172A] leading-snug select-none">
              I agree to DPDP Act 2023 consent terms for identity verification and eSign execution.
            </span>
          </div>
          {error && <p className="text-[12px] text-red-500 font-bold text-center">{error}</p>}
        </div>
      )}
    </div>
  )

  // STEP 5: Verified Status Card & Completion
  const renderStep5 = () => (
    <div className="space-y-4 text-center">
      <div className="w-16 h-16 rounded-full bg-[#ECFDF5] border border-[#10B981]/40 text-[#10B981] flex items-center justify-center mx-auto shadow-sm">
        <CheckCircle2 className="w-10 h-10 fill-[#10B981] text-white" />
      </div>

      <div className="space-y-1.5">
        <h2 className="text-[21px] font-bold text-[#0F172A] tracking-tight">
          {isB2C ? "Merchant Registration Complete!" : "Registration Complete!"}
        </h2>
        
        <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-blue-100/90 border border-blue-200 text-[#0052CC] text-[13.5px] font-bold shadow-xs mt-1">
          <CheckCircle2 className="w-4 h-4 fill-[#0052CC] text-white" />
          <span>{isB2C ? "Verified Business Tag" : "Person Verified"}</span>
        </div>

        <p className="text-[12.5px] text-slate-600 font-medium leading-relaxed max-w-[290px] mx-auto pt-2">
          {isB2C 
            ? "Your shop profile and ₹99 lifetime subscription are activated. You can now generate customer agreements."
            : "Your personal profile is authenticated via Aadhaar eKYC and ready for legal sale agreements."}
        </p>
      </div>

      <div className="p-4 bg-slate-50 border border-slate-200/90 rounded-[18px] text-left text-[12.5px] space-y-2">
        <div className="flex justify-between border-b border-slate-200/70 pb-2">
          <span className="font-semibold text-slate-600">Verification Status</span>
          <span className="font-bold text-[#0052CC]">{isB2C ? "Verified Business Tag" : "Person Verified"}</span>
        </div>
        {isB2C && (
          <div className="flex justify-between border-b border-slate-200/70 pb-2">
            <span className="font-semibold text-slate-600">Lifetime Subscription</span>
            <span className="font-bold text-[#10B981]">₹99 Paid</span>
          </div>
        )}
        <div className="flex justify-between">
          <span className="font-semibold text-slate-600">Platform Security</span>
          <span className="font-bold text-[#0F172A]">AES-256 Encrypted</span>
        </div>
      </div>
    </div>
  )

  // Title Configs per Step
  const stepTitles = React.useMemo(() => {
    if (isB2C) {
      return [
        { title: "B2C Shop Registration", subtitle: "Step 1: Mobile & OTP Verification" },
        { title: "Udyam / GST Verification", subtitle: "Step 2: Auto-fetch business credentials" },
        { title: "Business Verification", subtitle: "Step 3: Verified Business Tag confirmation" },
        { title: "Lifetime Subscription", subtitle: "Step 4: Pay ₹99 one-time access fee" },
        { title: "Registration Successful", subtitle: "Step 5: Verified Business Tag Active" },
      ]
    }
    return [
      { title: "C2C Personal Registration", subtitle: "Step 1: Mobile & OTP Verification" },
      { title: "Aadhaar eKYC Verification", subtitle: "Step 2: Auto-fetch identity via Aadhaar" },
      { title: "Contact Information", subtitle: "Step 3: Email & notification settings" },
      { title: "Location & Consent", subtitle: "Step 4: GPS permission & DPDP consent" },
      { title: "Registration Successful", subtitle: "Step 5: Person Verified Tag Active" },
    ]
  }, [isB2C])

  const buttonTexts = [
    otpSent ? "Verify OTP" : "Send OTP",
    fetchedDetails ? "Continue to Next Step" : (isB2C ? "Fetch Business Details" : "Fetch Aadhaar Details"),
    "Continue Setup",
    isB2C ? "Pay ₹99 & Complete Setup" : "Confirm Consent & Complete",
    "Go to Dashboard"
  ]

  const currentConfig = stepTitles[currentStep - 1]

  const renderCurrentContent = () => {
    switch (currentStep) {
      case 1: return renderStep1()
      case 2: return renderStep2()
      case 3: return renderStep3()
      case 4: return renderStep4()
      case 5: return renderStep5()
      default: return renderStep1()
    }
  }

  return (
    <AppContainer centered>
      <OnboardingLayout
        title={currentConfig.title}
        subtitle={currentConfig.subtitle}
        cardContent={renderCurrentContent()}
        buttonText={buttonTexts[currentStep - 1]}
        onButtonClick={handleNext}
        isButtonLoading={isLoading}
        showBackButton={currentStep > 1 && currentStep < 5}
        stepperStep={currentStep - 1}
        onBackClick={() => setCurrentStep(prev => Math.max(1, prev - 1))}
      />
    </AppContainer>
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
