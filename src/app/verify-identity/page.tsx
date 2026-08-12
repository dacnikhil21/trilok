"use client"

import * as React from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { OnboardingLayout } from "@/components/ui/OnboardingLayout"
import { AppShell } from "@/components/layout/AppShell"
import { AppHeader } from "@/components/layout/AppHeader"
import { AppBottomNav } from "@/components/layout/AppBottomNav"
import {
  VerificationServiceGrid,
  VerificationServicePickerIntro,
  VerificationTrustBanner,
} from "@/components/verification/VerificationServicePicker"
import { C2C_VERIFICATION_SERVICES } from "@/lib/c2c-config"
import { DEFAULT_VERIFICATION_SERVICES } from "@/lib/dashboard-configs"
import {
  getVerificationServiceConfig,
  getServiceFlowSteps,
  getNextFlowStep,
  getPrevFlowStep,
  type VerificationFlowStep,
} from "@/lib/verification-service-config"
import { getB2CCreateUrl } from "@/lib/b2c-dashboard-routes"
import { getB2CDashboard } from "@/lib/b2c-session"
import { ProgressStepper } from "@/components/ui/ProgressStepper"
import { TermsModal } from "@/components/ui/TermsModal"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { 
  ShieldCheck, Camera, MapPin, Check, Bell, RefreshCw, CheckCircle2, Lock, Smartphone, 
  FileText, CreditCard, QrCode, Sparkles, Upload, Trash2, Download, AlertCircle, 
  HelpCircle, UserCheck, Briefcase, Building, Coins, FileSignature, CheckCircle 
} from "lucide-react"

type OnboardingStep = VerificationFlowStep

function VerifyIdentityContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const moduleType = (searchParams.get("module") || "c2c").toLowerCase()
  const isB2C = moduleType === "b2c"
  const [b2cDashboard, setB2cDashboard] = React.useState("mobile")

  React.useEffect(() => {
    if (isB2C) setB2cDashboard(getB2CDashboard())
  }, [isB2C])

  const b2cHomePath = `/dashboard/${b2cDashboard}`
  const b2cCreatePath = getB2CCreateUrl(b2cDashboard)
  const c2cHomePath = `/dashboard?module=${moduleType}`
  const serviceParam = searchParams.get("service")
  const showServicePicker = !serviceParam
  const verificationServices = isB2C ? DEFAULT_VERIFICATION_SERVICES : C2C_VERIFICATION_SERVICES

  const selectedService = verificationServices.find((s) => s.icon === serviceParam)
  const serviceLabel = selectedService?.shortLabel ?? selectedService?.label ?? "Identity"
  const serviceConfig = React.useMemo(
    () => getVerificationServiceConfig(serviceParam),
    [serviceParam]
  )
  const flowSteps = React.useMemo(
    () => getServiceFlowSteps(serviceConfig, isB2C),
    [serviceConfig, isB2C]
  )

  const [step, setStep] = React.useState<OnboardingStep>("aadhaar")

  // Verification purpose & file upload states
  const [purpose, setPurpose] = React.useState<string>("customer")
  const [consentFile, setConsentFile] = React.useState<{ name: string; size: string } | null>(null)
  const [isDragging, setIsDragging] = React.useState(false)

  // Service document input state
  const [documentValue, setDocumentValue] = React.useState("")
  const [secondaryValue, setSecondaryValue] = React.useState("")
  const [otp, setOtp] = React.useState("")
  const [timer, setTimer] = React.useState(0)

  // Upload eKYC state
  const [activeTab, setActiveTab] = React.useState<"aadhaar" | "vid">("aadhaar")
  const [uploads, setUploads] = React.useState({ front: false, back: false, selfie: false })
  
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState("")

  React.useEffect(() => {
    if (timer > 0 && (step === "otp")) {
      const t = setTimeout(() => setTimer(timer - 1), 1000)
      return () => clearTimeout(t)
    }
  }, [timer, step])

  // Consent checkboxes & Terms modal states
  const [termsAccepted, setTermsAccepted] = React.useState(false)
  const [privacyAccepted, setPrivacyAccepted] = React.useState(false)
  const [isLegalModalOpen, setIsLegalModalOpen] = React.useState(false)
  const [legalModalTab, setLegalModalTab] = React.useState<"privacy" | "terms" | "consent">("terms")

  const openLegalDoc = (tab: "privacy" | "terms" | "consent") => {
    setLegalModalTab(tab)
    setIsLegalModalOpen(true)
  }

  // Selected payment option state
  const [paymentMethod, setPaymentMethod] = React.useState<"upi" | "card" | "netbanking" | "wallet">("upi")

  // Permissions state
  const [gpsAllowed, setGpsAllowed] = React.useState(false)
  const [cameraAllowed, setCameraAllowed] = React.useState(false)
  const [notifAllowed, setNotifAllowed] = React.useState(false)

  // Liveness state
  const [livenessCaptured, setLivenessCaptured] = React.useState(false)
  const [scanning, setScanning] = React.useState(false)

  React.useEffect(() => {
    setStep("aadhaar")
    setDocumentValue("")
    setSecondaryValue("")
    setOtp("")
    setTimer(0)
    setError("")
    setPurpose("customer")
    setConsentFile(null)
    setTermsAccepted(false)
    setPrivacyAccepted(false)
    setPaymentMethod("upi")
    setIsDragging(false)
    setIsLegalModalOpen(false)
    setGpsAllowed(false)
    setCameraAllowed(false)
    setNotifAllowed(false)
    setLivenessCaptured(false)
    setUploads({ front: false, back: false, selfie: false })
    setActiveTab("aadhaar")
  }, [serviceParam])

  // Mock values
  const deviceId = "ESALEAGREEMENT-MBL-88D4"
  const timestamp = React.useMemo(() => new Date().toLocaleString("en-IN"), [step])

  const stepNumber = React.useMemo(() => {
    const idx = flowSteps.indexOf(step)
    if (idx < 0) return 1
    const total = flowSteps.filter((s) => s !== "success").length
    return Math.min(5, Math.max(1, Math.ceil(((idx + 1) / total) * 4)))
  }, [step, flowSteps])

  const advanceStep = () => {
    const next = getNextFlowStep(step, flowSteps)
    if (next) setStep(next)
  }

  const handlePrimaryAction = () => {
    setError("")

    if (step === "aadhaar") {
      if (!isInputValid) {
        setError(`Please enter a valid ${serviceConfig.label} number.`)
        return
      }
      if (purpose === "customer" && !consentFile) {
        setError("Please upload the customer consent document to proceed.")
        return
      }
      advanceStep()
    } else if (step === "consent") {
      if (!termsAccepted || !privacyAccepted) {
        setError("You must accept the Terms & Conditions and Privacy Policy.")
        return
      }
      advanceStep()
    } else if (step === "payment") {
      setIsLoading(true)
      setTimeout(() => {
        setIsLoading(false)
        advanceStep()
      }, 1200)
    } else if (step === "success") {
      router.push(isB2C ? b2cHomePath : `/dashboard?module=${moduleType}`)
    } else {
      advanceStep()
    }
  }

  const formatDocumentDisplay = (value: string) => {
    if (serviceConfig.id !== "aadhaar") return value
    const d = value.replace(/\D/g, "")
    if (d.length <= 4) return d
    if (d.length <= 8) return `${d.slice(0, 4)} - ${d.slice(4)}`
    return `${d.slice(0, 4)} - ${d.slice(4, 8)} - ${d.slice(8)}`
  }

  // 1. Service-specific input screen
  const renderServiceInputContent = () => (
    <div className="space-y-4">
      {/* Service Header Info */}
      <div className="text-center">
        <div className="w-14 h-14 bg-blue-50 text-[#0033A0] rounded-full flex items-center justify-center mx-auto mb-2 border border-blue-100 shadow-sm">
          <ShieldCheck className="w-7 h-7" strokeWidth={2.5} />
        </div>
        <p className="text-[12.5px] text-slate-500 font-semibold leading-relaxed max-w-[280px] mx-auto">
          {serviceConfig.helperText}
        </p>
      </div>

      {/* ID Number input field */}
      <div className="space-y-3">
        <Input
          label={serviceConfig.fieldLabel}
          type={serviceConfig.inputMode === "numeric" ? "tel" : "text"}
          placeholder={serviceConfig.placeholder}
          value={serviceConfig.id === "aadhaar" ? formatDocumentDisplay(documentValue) : documentValue}
          onChange={(e) => {
            const val = serviceConfig.formatValue(e.target.value)
            setDocumentValue(val)
            setError("")
          }}
          error={error && !documentValue ? error : undefined}
        />
        {serviceConfig.secondaryField ? (
          <Input
            label={serviceConfig.secondaryField.label}
            type={serviceConfig.secondaryField.inputMode === "numeric" ? "tel" : "text"}
            placeholder={serviceConfig.secondaryField.placeholder}
            value={secondaryValue}
            onChange={(e) => {
              setSecondaryValue(serviceConfig.secondaryField!.formatValue(e.target.value))
              setError("")
            }}
          />
        ) : null}
      </div>

      {/* Select Purpose segment */}
      <div className="text-left space-y-2 pt-1">
        <label className="text-[12px] font-extrabold text-[#041B4A] uppercase tracking-wider">
          Select Purpose of Verification
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {[
            { id: "customer", label: "Customer Verification", icon: UserCheck },
            { id: "business", label: "Business Verification", icon: Building },
            { id: "employment", label: "Employment Verification", icon: Briefcase },
            { id: "transaction", label: "Transaction Verification", icon: Coins },
            { id: "kyc", label: "KYC / Onboarding", icon: FileSignature },
            { id: "other", label: "Other (Please specify)", icon: HelpCircle },
          ].map((opt) => {
            const Icon = opt.icon
            const isSelected = purpose === opt.id
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => {
                  setPurpose(opt.id)
                  setError("")
                }}
                className={cn(
                  "flex items-center gap-2.5 p-2.5 rounded-[12px] border text-left transition-all active:scale-[0.98] cursor-pointer",
                  isSelected 
                    ? "bg-[#0033A0]/5 border-[#0033A0] text-[#0033A0] font-bold" 
                    : "bg-white border-slate-200/90 text-slate-500 hover:border-slate-300 font-medium"
                )}
              >
                <div className={cn(
                  "w-7 h-7 rounded-[8px] flex items-center justify-center shrink-0",
                  isSelected ? "bg-[#0033A0]/10 text-[#0033A0]" : "bg-slate-50 text-slate-400"
                )}>
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <span className="text-[11.5px] leading-tight truncate">{opt.label}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Conditional File Upload segment */}
      {purpose === "customer" && (
        <div className="text-left space-y-2 pt-2 animate-in fade-in slide-in-from-top-2 duration-300">
          <label className="text-[12px] font-extrabold text-[#041B4A] uppercase tracking-wider flex items-center gap-1">
            Upload Client Consent Form
            <span className="text-[#EF4444] font-extrabold text-[11px]">*</span>
          </label>
          
          {!consentFile ? (
            <div
              onDragOver={(e) => {
                e.preventDefault()
                setIsDragging(true)
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={(e) => {
                e.preventDefault()
                setIsDragging(false)
                if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                  const file = e.dataTransfer.files[0]
                  setConsentFile({
                    name: file.name,
                    size: `${(file.size / 1024 / 1024).toFixed(2)} MB`
                  })
                  setError("")
                }
              }}
              onClick={() => {
                const input = document.getElementById("consent-file-input")
                if (input) input.click()
              }}
              className={cn(
                "w-full rounded-[14px] border-2 border-dashed flex flex-col items-center justify-center p-5 text-center cursor-pointer transition-all duration-200 bg-[#FBFBFA]",
                isDragging 
                  ? "border-[#0033A0] bg-[#0033A0]/5 scale-[1.01]" 
                  : "border-slate-200/90 hover:border-slate-350 hover:bg-slate-50"
              )}
            >
              <input
                id="consent-file-input"
                type="file"
                accept=".pdf,.png,.jpg,.jpeg"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    const file = e.target.files[0]
                    setConsentFile({
                      name: file.name,
                      size: `${(file.size / 1024 / 1024).toFixed(2)} MB`
                    })
                    setError("")
                  }
                }}
              />
              <div className="w-9 h-9 rounded-full bg-blue-50 text-[#0033A0] flex items-center justify-center mb-2 shadow-2xs">
                <Upload className="w-4.5 h-4.5" />
              </div>
              <p className="text-[11.5px] font-bold text-[#0F172A] leading-tight">
                Drag & drop consent form, or <span className="text-[#0033A0] underline">browse</span>
              </p>
              <p className="text-[9.5px] font-medium text-slate-400 mt-1 leading-normal">
                Supports PDF, JPEG, PNG (Max 5MB)
              </p>
            </div>
          ) : (
            <div className="w-full rounded-[14px] border border-[#C5EBD6] bg-[#ECF8F1]/40 flex items-center justify-between p-3 shadow-2xs">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-[8px] bg-[#C5EBD6]/50 text-[#10B981] flex items-center justify-center shrink-0">
                  <FileText className="w-4 h-4" />
                </div>
                <div className="min-w-0 text-left">
                  <p className="text-[11px] font-extrabold text-[#0F172A] truncate leading-tight">
                    {consentFile.name}
                  </p>
                  <p className="text-[9px] font-medium text-slate-500 mt-0.5 leading-none">
                    {consentFile.size} • <span className="text-[#10B981] font-bold">Uploaded</span>
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setConsentFile(null)}
                className="p-1 rounded-full hover:bg-slate-200 text-slate-400 hover:text-error transition-colors shrink-0"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      )}

      {/* Pricing and Security Indicator */}
      <div className="pt-2 flex flex-col gap-2 text-left">
        <div className="flex items-center justify-between p-3 bg-[#F8FAFC] border border-slate-200/90 rounded-[14px] shadow-2xs">
          <div className="flex items-center gap-2">
            <Coins className="w-4 h-4 text-[#10B981]" />
            <span className="text-[11.5px] font-bold text-slate-500">Service Verification Fee</span>
          </div>
          <span className="text-[13.5px] font-extrabold text-[#10B981]">₹9</span>
        </div>

        <div className="p-3 bg-[#F8FAFC] border border-slate-200/90 rounded-[14px] flex items-start gap-2.5 shadow-2xs">
          <Lock className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
          <p className="text-[10px] text-slate-500 font-medium leading-relaxed">
            {serviceConfig.securityNote}
          </p>
        </div>
      </div>

      {error && (
        <div className="p-2.5 bg-red-50 border border-red-200 rounded-[10px] text-left flex items-start gap-2 animate-shake">
          <AlertCircle className="w-4 h-4 text-[#EF4444] shrink-0 mt-0.5" />
          <span className="text-[11px] text-[#EF4444] font-bold leading-normal">{error}</span>
        </div>
      )}
    </div>
  )

  // 2. OTP screen content
  const renderOtpContent = () => (
    <div className="space-y-4 text-center">
      <div className="w-16 h-16 bg-blue-50 text-primary rounded-full flex items-center justify-center mx-auto mb-2 border border-blue-100 shadow-sm">
        <Smartphone className="w-8 h-8" strokeWidth={2.5} />
      </div>
      <p className="text-[13.5px] text-secondary-text font-medium leading-relaxed">
        {serviceConfig.otpHint}
      </p>
      
      <div className="pt-2 flex flex-col items-center">
        <input
          type="tel"
          className="w-full max-w-[240px] text-center text-[32px] tracking-[0.5em] font-bold text-foreground h-16 border-b-2 border-border focus:border-primary focus:outline-none bg-transparent transition-colors placeholder:text-border/50"
          placeholder="••••••"
          value={otp}
          onChange={(e) => {
            setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
            setError("")
          }}
        />
        {error && <p className="text-[11.5px] text-error font-bold mt-2">{error}</p>}
      </div>

      <div className="pt-4">
        <button 
          onClick={() => setTimer(60)}
          disabled={timer > 0}
          className={`text-[12.5px] font-bold transition-colors ${timer > 0 ? "text-secondary-text/50" : "text-primary hover:text-primary-dark"}`}
        >
          {timer > 0 ? `Resend OTP in ${timer}s` : "Resend OTP"}
        </button>
      </div>
    </div>
  )

  const renderUploadEkycContent = () => {
    const isAadhaar = serviceConfig.id === "aadhaar"
    const frontLabel = serviceConfig.uploadFrontLabel ?? "Upload Front"
    const backLabel = serviceConfig.uploadBackLabel ?? "Upload Back"

    return (
    <div className="flex flex-col space-y-6 animate-in fade-in zoom-in-95 duration-300 pb-4">
      {isAadhaar ? (
      <div className="flex w-full bg-[#F7F9FB] rounded-[12px] p-1">
        <button 
          onClick={() => setActiveTab("aadhaar")}
          className={`flex-1 py-3 text-[14.5px] font-bold rounded-[10px] transition-all ${
            activeTab === "aadhaar" 
              ? "bg-white text-[#0033A0] shadow-sm ring-1 ring-black/5" 
              : "text-[#64748B] hover:text-[#041B4A]"
          }`}
        >
          Aadhaar Card
        </button>
        <button 
          onClick={() => setActiveTab("vid")}
          className={`flex-1 py-3 text-[14.5px] font-bold rounded-[10px] transition-all ${
            activeTab === "vid" 
              ? "bg-white text-[#0033A0] shadow-sm ring-1 ring-black/5" 
              : "text-[#64748B] hover:text-[#041B4A]"
          }`}
        >
          Virtual ID
        </button>
      </div>
      ) : (
        <p className="text-[13px] font-semibold text-[#64748B] text-center">
          Upload clear photos of your {serviceConfig.label} document
        </p>
      )}

      {error && <p className="text-[12.5px] text-error font-bold text-center mt-[-10px]">{error}</p>}

      {/* Row 1: Upload Front */}
      <div className="space-y-2">
        <span className="text-[15px] font-bold text-[#041B4A]">{frontLabel}</span>
        <div className="grid grid-cols-[1.6fr_1fr_1fr] gap-3 h-[94px]">
          {/* Mockup */}
          <div className="w-full h-full bg-white rounded-[10px] border border-gray-200 shadow-[0_2px_10px_rgba(0,0,0,0.04)] relative flex flex-col justify-between p-1.5 overflow-hidden">
            <div className="flex items-center justify-between px-1">
               <div className="flex items-center gap-1">
                  <div className="w-3.5 h-4 text-[7px] leading-none"><ShieldCheck className="w-full h-full text-gray-700" strokeWidth={2} /></div>
                  <span className="text-[6px] font-bold text-gray-800">Government of India</span>
               </div>
               <div className="text-[5px] text-orange-500 font-bold">AADHAAR</div>
            </div>
            <div className="flex gap-2 px-1">
               <div className="w-[28px] h-[36px] bg-[#D1D5DB] rounded-[3px] flex items-end justify-center overflow-hidden shrink-0">
                  <div className="w-6 h-6 bg-[#9CA3AF] rounded-t-full" />
               </div>
               <div className="flex-1 space-y-[2px] mt-0.5">
                  <div className="text-[4px] text-gray-500 font-semibold leading-none">Name</div>
                  <div className="text-[5px] font-bold leading-none">XXXX XXXX XXXX</div>
                  <div className="text-[4px] text-gray-500 font-semibold leading-none mt-1">DOB : XX/XX/XXXX</div>
                  <div className="text-[4px] text-gray-500 font-semibold leading-none">Gender : MALE</div>
               </div>
               <div className="w-6 h-6 border-2 border-dashed border-gray-400 mt-1 flex items-center justify-center p-[1px] shrink-0">
                  <div className="w-full h-full bg-gray-400" />
               </div>
            </div>
            <div className="text-center pb-0.5 mt-auto">
               <div className="text-[11.5px] font-bold tracking-[0.15em] leading-none text-black">1234 5678 9012</div>
               <div className="h-[2px] w-full mt-1.5 flex">
                 <div className="flex-1 bg-green-500" />
                 <div className="flex-1 bg-white" />
                 <div className="flex-1 bg-red-500" />
               </div>
            </div>
          </div>
          
          {/* Empty Place */}
          <div className="w-full h-full bg-white rounded-[10px] border border-gray-200 shadow-[0_2px_10px_rgba(0,0,0,0.04)] flex items-center justify-center relative">
            {uploads.front && <CheckCircle2 className="w-8 h-8 text-green-500 absolute inset-0 m-auto" />}
          </div>

          {/* Camera Button */}
          <div 
            onClick={() => setUploads(prev => ({ ...prev, front: true }))}
            className={`w-full h-full bg-white rounded-[10px] border border-gray-200 shadow-[0_2px_10px_rgba(0,0,0,0.04)] flex items-center justify-center cursor-pointer transition-all hover:bg-gray-50 ${uploads.front ? "ring-2 ring-[#0033A0]" : ""}`}
          >
            <Camera className="w-8 h-8 text-[#0033A0]" fill="#0033A0" strokeWidth={1} />
          </div>
        </div>
      </div>

      {/* Row 2: Upload Back */}
      <div className="space-y-2">
        <span className="text-[15px] font-bold text-[#041B4A]">{backLabel}</span>
        <div className="grid grid-cols-[1.6fr_1fr_1fr] gap-3 h-[94px]">
          {/* Mockup */}
          <div className="w-full h-full bg-white rounded-[10px] border border-gray-200 shadow-[0_2px_10px_rgba(0,0,0,0.04)] relative flex flex-col justify-between p-1.5 overflow-hidden">
            <div className="flex items-center gap-1 px-1 pt-0.5">
               <div className="w-4 h-4"><ShieldCheck className="w-full h-full text-gray-700" strokeWidth={2} /></div>
               <span className="text-[5px] font-bold text-orange-500 leading-tight">Unique Identification Authority of India</span>
            </div>
            <div className="h-[2px] w-full mt-1 flex">
                 <div className="flex-1 bg-green-500" />
                 <div className="flex-1 bg-white" />
                 <div className="flex-1 bg-red-500" />
            </div>
            <div className="flex gap-2 px-1 mt-1.5">
               <div className="flex-1 space-y-[2px]">
                  <div className="text-[4px] font-bold leading-none">Address :</div>
                  <div className="text-[5px] font-bold leading-none">XXXX XXXX XXXX</div>
                  <div className="text-[5px] font-bold leading-none">XXXX XXXX XXXX</div>
                  <div className="text-[5px] font-bold leading-none">Pincode - 123456</div>
               </div>
               <div className="w-7 h-7 border-2 border-dashed border-gray-400 mt-0.5 flex items-center justify-center p-[1px] shrink-0">
                  <div className="w-full h-full bg-gray-400" />
               </div>
            </div>
            <div className="text-center pb-0.5 mt-auto">
               <div className="text-[11.5px] font-bold tracking-[0.15em] leading-none text-black">1234 5678 9012</div>
            </div>
          </div>
          
          {/* Empty Place */}
          <div className="w-full h-full bg-white rounded-[10px] border border-gray-200 shadow-[0_2px_10px_rgba(0,0,0,0.04)] flex items-center justify-center relative">
            {uploads.back && <CheckCircle2 className="w-8 h-8 text-green-500 absolute inset-0 m-auto" />}
          </div>

          {/* Camera Button */}
          <div 
            onClick={() => setUploads(prev => ({ ...prev, back: true }))}
            className={`w-full h-full bg-white rounded-[10px] border border-gray-200 shadow-[0_2px_10px_rgba(0,0,0,0.04)] flex items-center justify-center cursor-pointer transition-all hover:bg-gray-50 ${uploads.back ? "ring-2 ring-[#0033A0]" : ""}`}
          >
            <Camera className="w-8 h-8 text-[#0033A0]" fill="#0033A0" strokeWidth={1} />
          </div>
        </div>
      </div>

      {/* Row 3: Live Selfie */}
      {serviceConfig.showSelfieUpload !== false ? (
      <div className="space-y-2">
        <span className="text-[15px] font-bold text-[#041B4A]">Live Selfie</span>
        <div className="grid grid-cols-[1.6fr_1fr_1fr] gap-3 h-[94px]">
          {/* Mockup */}
          <div className="w-full h-full bg-[#E5E7EB] rounded-[10px] border border-gray-200 shadow-[0_2px_10px_rgba(0,0,0,0.04)] overflow-hidden relative">
            <svg viewBox="0 0 100 100" className="w-full h-full absolute inset-0 pt-3">
              <path d="M 15 100 L 15 75 Q 15 60 50 60 Q 85 60 85 75 L 85 100" fill="#93C5FD" stroke="#60A5FA" strokeWidth="2" />
              <path d="M 35 60 L 50 80 L 65 60" fill="#BFDBFE" />
              <rect x="42" y="45" width="16" height="20" fill="#FDBA74" />
              <circle cx="50" cy="40" r="18" fill="#FDBA74" />
              <path d="M 32 40 Q 50 65 68 40 Q 50 60 32 40" fill="#1F2937" />
              <path d="M 32 38 Q 50 15 68 38 Q 50 20 32 38" fill="#1F2937" />
              <circle cx="43" cy="36" r="2" fill="#1F2937" />
              <circle cx="57" cy="36" r="2" fill="#1F2937" />
              <path d="M 39 32 L 46 32 M 54 32 L 61 32" stroke="#1F2937" strokeWidth="2" strokeLinecap="round" />
              <path d="M 50 40 L 50 45" stroke="#C2410C" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
          
          {/* Empty Place */}
          <div className="w-full h-full bg-white rounded-[10px] border border-gray-200 shadow-[0_2px_10px_rgba(0,0,0,0.04)] flex items-center justify-center relative">
            {uploads.selfie && <CheckCircle2 className="w-8 h-8 text-green-500 absolute inset-0 m-auto" />}
          </div>

          {/* Camera Button */}
          <div 
            onClick={() => setUploads(prev => ({ ...prev, selfie: true }))}
            className={`w-full h-full bg-white rounded-[10px] border border-gray-200 shadow-[0_2px_10px_rgba(0,0,0,0.04)] flex items-center justify-center cursor-pointer transition-all hover:bg-gray-50 ${uploads.selfie ? "ring-2 ring-[#0033A0]" : ""}`}
          >
            <Camera className="w-8 h-8 text-[#0033A0]" fill="#0033A0" strokeWidth={1} />
          </div>
        </div>
      </div>
      ) : null}
    </div>
    )
  }

  // 4. DPDP Consent screen content
  const renderConsentContent = () => (
    <div className="space-y-4 text-left">
      {/* Centered Trust Icon & Headline */}
      <div className="flex flex-col items-center text-center">
        <div className="w-13 h-13 bg-[#ECF8F1] border border-[#C5EBD6] rounded-full flex items-center justify-center text-[#10B981] mb-2 shadow-sm animate-pulse">
          <ShieldCheck className="w-6.5 h-6.5" strokeWidth={2.5} />
        </div>
        <h3 className="text-[15px] font-extrabold text-[#0F172A] leading-tight">Your Consent is Important</h3>
        <p className="text-[11px] font-semibold text-slate-500 max-w-[285px] mx-auto mt-1 leading-normal">
          We will fetch and process the information you have provided only for the purpose of this verification.
        </p>
      </div>

      {/* Security Promises */}
      <div className="space-y-2">
        {[
          "We do not sell your personal data.",
          "We do not use data for marketing or advertising.",
          "Verification data is deleted within 30 days after verification, except information required to be retained by law."
        ].map((text, idx) => (
          <div key={idx} className="flex items-start gap-2.5 p-2.5 bg-slate-50 border border-slate-200/60 rounded-[12px] shadow-2xs">
            <div className="w-4.5 h-4.5 rounded-full bg-[#ECF8F1] text-[#10B981] flex items-center justify-center shrink-0 mt-0.5">
              <Check className="w-2.5 h-2.5 stroke-[3.5]" />
            </div>
            <span className="text-[10.5px] font-bold text-slate-600 leading-normal">{text}</span>
          </div>
        ))}
      </div>

      {/* Checkbox Selections */}
      <div className="space-y-2 pt-1 border-t border-slate-100">
        <p className="text-[10px] font-extrabold text-[#041B4A] uppercase tracking-wider">Please read and agree:</p>
        
        <div 
          onClick={() => setTermsAccepted(!termsAccepted)}
          className="flex items-start gap-2.5 cursor-pointer p-2 rounded-[10px] hover:bg-slate-50 transition-colors"
        >
          <div className={cn(
            "w-4.5 h-4.5 rounded border flex items-center justify-center shrink-0 mt-0.5 transition-all cursor-pointer",
            termsAccepted ? "bg-[#0033A0] border-[#0033A0] text-white" : "border-slate-300 bg-white"
          )}>
            {termsAccepted && <Check className="w-3 h-3 text-white" strokeWidth={3.5} />}
          </div>
          <span className="text-[11.5px] font-bold text-slate-700 leading-snug select-none">
            I agree to the <span onClick={(e) => { e.stopPropagation(); openLegalDoc("terms"); }} className="text-[#0033A0] underline font-extrabold">Terms & Conditions</span>
          </span>
        </div>

        <div 
          onClick={() => setPrivacyAccepted(!privacyAccepted)}
          className="flex items-start gap-2.5 cursor-pointer p-2 rounded-[10px] hover:bg-slate-50 transition-colors"
        >
          <div className={cn(
            "w-4.5 h-4.5 rounded border flex items-center justify-center shrink-0 mt-0.5 transition-all cursor-pointer",
            privacyAccepted ? "bg-[#0033A0] border-[#0033A0] text-white" : "border-slate-300 bg-white"
          )}>
            {privacyAccepted && <Check className="w-3 h-3 text-white" strokeWidth={3.5} />}
          </div>
          <span className="text-[11.5px] font-bold text-slate-700 leading-snug select-none">
            I have read the <span onClick={(e) => { e.stopPropagation(); openLegalDoc("privacy"); }} className="text-[#0033A0] underline font-extrabold">Privacy Policy</span>
          </span>
        </div>
      </div>

      <p className="text-[9.5px] text-center font-bold text-slate-400 pt-1 leading-normal">
        This is the key consent step before we pull any data. (Mandatory)
      </p>

      {error && (
        <div className="p-2.5 bg-red-50 border border-red-200 rounded-[10px] flex items-start gap-2 animate-shake">
          <AlertCircle className="w-4 h-4 text-[#EF4444] shrink-0 mt-0.5" />
          <span className="text-[11px] text-[#EF4444] font-bold leading-normal">{error}</span>
        </div>
      )}
    </div>
  )

  // 5. Permissions screen content
  const renderPermissionsContent = () => (
    <div className="space-y-3">
      <div className="space-y-2.5">
        {[
          { icon: MapPin, label: "GPS Location", desc: "Required for legal audit stamping", allowed: gpsAllowed, set: setGpsAllowed },
          { icon: Camera, label: "Camera Access", desc: "Required for live face verification", allowed: cameraAllowed, set: setCameraAllowed },
          { icon: Bell, label: "Notifications", desc: "Agreement signature status updates", allowed: notifAllowed, set: setNotifAllowed },
        ].map((item) => {
          const Icon = item.icon
          return (
            <div
              key={item.label}
              onClick={() => item.set(!item.allowed)}
              className={`p-3 bg-surface border rounded-[14px] flex items-center justify-between cursor-pointer transition-all ${item.allowed ? "border-primary/20 bg-primary/[0.01]" : "border-border"}`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-8.5 h-8.5 rounded-full flex items-center justify-center ${item.allowed ? "bg-primary/8 text-primary" : "bg-divider text-secondary-text"}`}>
                  <Icon className="w-4.5 h-4.5" />
                </div>
                <div className="text-left">
                  <h4 className="font-bold text-[13.5px] leading-none">{item.label}</h4>
                  <p className="text-[11px] text-secondary-text mt-0.5 font-medium">{item.desc}</p>
                </div>
              </div>
              <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${item.allowed ? "bg-primary border-primary text-white" : "border-border text-transparent"}`}>
                <Check className="w-3 h-3" strokeWidth={3} />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )

  // 6. Liveness screen content
  const renderLivenessContent = () => (
    <div className="space-y-4 text-center">
      {!livenessCaptured ? (
        <div className="space-y-3">
          <p className="text-[13px] text-secondary-text font-medium leading-relaxed">
            Position your face in the center of the viewport guide to complete liveness eKYC.
          </p>

          <div className="w-[180px] h-[180px] rounded-full border-[3px] border-primary/30 bg-[#1A1D1F] mx-auto overflow-hidden relative flex items-center justify-center shadow-inner">
            {scanning && (
              <motion.div
                animate={{ y: [-90, 90, -90] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                className="absolute inset-x-0 h-[2px] bg-primary/70 shadow-[0_0_12px_#0A5C36]"
              />
            )}
            <div className="w-[150px] h-[150px] rounded-full border border-white/10 flex items-center justify-center opacity-30">
              <Camera className="w-12 h-12 text-white" />
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          <p className="text-[13.5px] text-success font-semibold flex items-center justify-center gap-1.5">
            <CheckCircle2 className="w-5 h-5" /> Face Scan Completed
          </p>
          <div className="w-[150px] h-[150px] rounded-full border border-primary bg-primary/5 mx-auto overflow-hidden relative flex items-center justify-center">
            <Check className="w-12 h-12 text-primary" strokeWidth={3} />
          </div>
          <button
            type="button"
            onClick={() => setLivenessCaptured(false)}
            className="text-[12.5px] text-secondary-text font-bold uppercase tracking-wider hover:text-foreground flex items-center gap-1.5 mx-auto pt-1"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Retake Selfie
          </button>
        </div>
      )}
    </div>
  )

  // 7. Location screen content
  const renderLocationContent = () => (
    <div className="flex flex-col items-center pt-2">
      <div className="w-full aspect-square max-h-[220px] bg-[#E8ECEF] rounded-[24px] mb-6 relative overflow-hidden flex items-center justify-center border border-border/60 shadow-sm">
         {/* Map mockup */}
         <div className="absolute inset-0 opacity-40">
            <div className="absolute top-1/4 left-0 right-0 h-4 bg-white transform -rotate-12" />
            <div className="absolute top-1/2 left-0 right-0 h-6 bg-white transform rotate-6" />
            <div className="absolute top-0 bottom-0 left-1/3 w-4 bg-white transform 12" />
            <div className="absolute top-0 bottom-0 right-1/4 w-5 bg-white transform -rotate-6" />
            <div className="absolute top-[20%] left-[10%] w-16 h-24 bg-[#D1DFD3]" />
            <div className="absolute bottom-[20%] right-[10%] w-20 h-16 bg-[#D1DFD3]" />
            <div className="absolute top-[60%] left-[20%] w-12 h-12 bg-[#D1DFD3]" />
         </div>
         <div className="relative z-10 w-20 h-20 flex items-center justify-center mb-4">
            <svg viewBox="0 0 24 24" fill="#D32F2F" className="w-16 h-16 drop-shadow-md">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
            </svg>
         </div>
      </div>
      
      <p className="text-[14px] text-foreground font-medium leading-[1.6] mb-4 text-center px-2">
        We value your current location to include with the Digital Personal's proof of transaction act, 2023.
      </p>
      <p className="text-[14px] text-secondary-text font-medium leading-[1.6] text-center px-4">
        Your location is secure and used only for agreement creation.
      </p>
    </div>
  )

  // 8. Pay-per-use Payment screen content
  const renderPaymentContent = () => {
    const AuthenticUpiLogo = () => (
      <div className="flex items-center gap-1 shrink-0">
        <svg className="h-3 w-auto" viewBox="0 0 100 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <text x="0" y="24" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="900" fontStyle="italic" fontSize="24" fill="#003399" letterSpacing="0.5">UPI</text>
          <path d="M62 6L75 16L62 26H70L83 16L70 6H62Z" fill="#10B981" />
          <path d="M74 6L87 16L74 26H82L95 16L82 6H74Z" fill="#F59E0B" />
        </svg>
      </div>
    )

    return (
      <div className="space-y-4">
        {/* Service Fee Box */}
        <div className="flex items-center justify-between p-3.5 bg-slate-50 border border-slate-200/90 rounded-[14px] shadow-2xs">
          <div className="text-left">
            <span className="text-[12.5px] font-extrabold text-[#0F172A]">{serviceLabel} Verification Fee</span>
            <p className="text-[9.5px] font-semibold text-slate-400 mt-0.5">Standard verification pull rate</p>
          </div>
          <span className="text-[16px] font-black text-[#10B981]">₹9</span>
        </div>

        {/* Secure Payment Alert */}
        <div className="p-3 bg-[#ECF8F1]/40 border border-[#C5EBD6] rounded-[14px] flex items-start gap-2.5 shadow-2xs text-left">
          <Lock className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
          <div>
            <p className="text-[11.5px] font-bold text-[#0F172A] leading-tight">Secure & Encrypted Payment</p>
            <p className="text-[9.5px] text-slate-500 font-semibold mt-0.5 leading-normal">
              Your transaction is 100% secure. Credentials are never saved on our servers.
            </p>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="space-y-2 text-left">
          <label className="text-[10px] font-extrabold text-[#041B4A] uppercase tracking-wider">Choose a payment method</label>
          <div className="space-y-2">
            {[
              { id: "upi", label: "UPI", desc: "Pay using Google Pay, PhonePe, Paytm", rightEl: <AuthenticUpiLogo /> },
              { id: "card", label: "Card", desc: "Visa, Mastercard, RuPay cards", rightEl: <span className="text-[9.5px] font-bold text-slate-400">VISA / RUPAY</span> },
              { id: "netbanking", label: "Net Banking", desc: "State Bank of India, HDFC, ICICI, etc.", rightEl: <span className="text-[9.5px] font-bold text-slate-400">NETBANKING</span> },
              { id: "wallet", label: "Wallet", desc: "PhonePe Wallet, Paytm, etc.", rightEl: <span className="text-[9.5px] font-bold text-slate-400">WALLETS</span> },
            ].map((method) => {
              const isSelected = paymentMethod === method.id
              return (
                <div
                  key={method.id}
                  onClick={() => setPaymentMethod(method.id as any)}
                  className={cn(
                    "flex items-center justify-between p-3 rounded-[12px] border cursor-pointer transition-all active:scale-[0.99]",
                    isSelected 
                      ? "border-[#0033A0] bg-[#0033A0]/5 shadow-2xs" 
                      : "border-slate-200 bg-white hover:border-slate-350"
                  )}
                >
                  <div className="flex items-start gap-3 min-w-0">
                    <div className={cn(
                      "w-4 h-4 rounded-full border flex items-center justify-center shrink-0 mt-0.5 transition-all",
                      isSelected ? "border-[#0033A0] bg-[#0033A0]" : "border-slate-300"
                    )}>
                      {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </div>
                    <div className="min-w-0 text-left">
                      <p className="text-[11.5px] font-extrabold text-[#0F172A] leading-tight">{method.label}</p>
                      <p className="text-[9px] text-slate-400 font-medium mt-0.5 leading-tight">{method.desc}</p>
                    </div>
                  </div>
                  {method.rightEl}
                </div>
              )
            })}
          </div>
        </div>

        {/* Redirect Note */}
        <p className="text-[9px] text-center font-semibold text-slate-400 pt-1 leading-normal">
          You will be redirected to Razorpay secure payment gateway.
        </p>

        {/* CTA Button */}
        <button
          type="button"
          onClick={() => handlePrimaryAction()}
          disabled={isLoading}
          className="w-full h-11 bg-[#0033A0] text-white rounded-[14px] font-bold text-[13px] flex items-center justify-center gap-2 shadow-sm transition-all hover:bg-[#002270] active:scale-[0.98] cursor-pointer mt-1"
        >
          {isLoading ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>Processing secure payment...</span>
            </>
          ) : (
            <>
              <CreditCard className="w-4.5 h-4.5" />
              <span>Pay ₹9 Securely</span>
            </>
          )}
        </button>

        {/* Razorpay Secured Footer */}
        <div className="flex items-center justify-center gap-1.5 text-[9px] text-slate-400 font-semibold pt-1">
          <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
          <span>Secured by Razorpay • PCI-DSS Compliant</span>
        </div>
      </div>
    )
  }

  // 9. Success screen content with Verification Result Details Table
  const renderSuccessContent = () => {
    const now = new Date()
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    const dateStr = `${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}`

    const getMockDetails = () => {
      const docVal = documentValue || "ABCDE1234F"
      switch (serviceConfig.id) {
        case "pan":
          return [
            { label: "PAN Number", value: docVal },
            { label: "Name (as per PAN)", value: "RAMESH KUMAR" },
            { label: "PAN Type", value: "Individual" },
            { label: "Status", value: "Active", isBadge: true, badgeColor: "bg-[#ECF8F1] text-[#10B981] border-[#C5EBD6]" },
            { label: "Last Updated On", value: dateStr },
          ]
        case "rc":
          return [
            { label: "Vehicle Number", value: docVal },
            { label: "Owner Name", value: "RAJESH ANAND" },
            { label: "Model / Variant", value: "MARUTI SWIFT VXI" },
            { label: "Chassis Number", value: "MA3FCAXXXXXXXX678" },
            { label: "Engine Number", value: "K12MXXXXXX456" },
            { label: "Fitness Valid Upto", value: "14 Jan 2038" },
            { label: "Insurance Valid Upto", value: "10 Jan 2027" },
            { label: "RC Status", value: "Active (VAHAN Verified)", isBadge: true, badgeColor: "bg-[#ECF8F1] text-[#10B981] border-[#C5EBD6]" },
          ]
        case "gstin":
          return [
            { label: "GSTIN Number", value: docVal },
            { label: "Legal Name", value: "TRILOK RENTALS PRIVATE LIMITED" },
            { label: "Taxpayer Type", value: "Regular" },
            { label: "GSTIN Status", value: "Active", isBadge: true, badgeColor: "bg-[#ECF8F1] text-[#10B981] border-[#C5EBD6]" },
            { label: "Principal Place", value: "Flat 302, Green Meadows, Madhapur, Hyderabad, 500081" },
          ]
        case "driving-licence":
          return [
            { label: "DL Number", value: docVal },
            { label: "Holder Name", value: "SURESH SHARMA" },
            { label: "Date of Birth", value: secondaryValue || "12/04/1992" },
            { label: "Licensing Authority", value: "RTO Hyderabad" },
            { label: "Validity (Non-Transport)", value: "05 Dec 2040" },
            { label: "Status", value: "Active", isBadge: true, badgeColor: "bg-[#ECF8F1] text-[#10B981] border-[#C5EBD6]" },
          ]
        case "udyam":
          return [
            { label: "Udyam Reg Number", value: docVal },
            { label: "Enterprise Name", value: "TRILOK LOGISTICS" },
            { label: "Major Activity", value: "Services" },
            { label: "Enterprise Type", value: "Micro" },
            { label: "Status", value: "Active", isBadge: true, badgeColor: "bg-[#ECF8F1] text-[#10B981] border-[#C5EBD6]" },
          ]
        case "utilities":
          return [
            { label: "Consumer Number", value: docVal },
            { label: "Consumer Name", value: "V. KRISHNA MURTHY" },
            { label: "Utility Provider", value: "APEPDCL (Power Distribution)" },
            { label: "Billing Address", value: "Door No 4-82/A, Gajuwaka, Visakhapatnam, AP, 530026" },
            { label: "Status", value: "Verified & Active", isBadge: true, badgeColor: "bg-[#ECF8F1] text-[#10B981] border-[#C5EBD6]" },
          ]
        default:
          return [
            { label: "Reference Number", value: docVal },
            { label: "Verification Status", value: "Success / Verified", isBadge: true, badgeColor: "bg-[#ECF8F1] text-[#10B981] border-[#C5EBD6]" },
            { label: "Timestamp", value: dateStr },
          ]
      }
    }

    const details = getMockDetails()

    return (
      <div className="space-y-4 animate-in zoom-in-95 duration-200">
        {/* Verification Success Header */}
        <div className="flex flex-col items-center text-center">
          <div className="w-13 h-13 bg-[#ECF8F1] border border-[#C5EBD6] rounded-full flex items-center justify-center text-[#10B981] mb-2 shadow-sm">
            <Check className="w-7 h-7 stroke-[3]" />
          </div>
          <h3 className="text-[15px] font-extrabold text-[#10B981] leading-tight">Verification Successful</h3>
          <p className="text-[11px] font-semibold text-slate-500 mt-0.5 leading-normal">
            Details fetched successfully.
          </p>
        </div>

        {/* Verification Details Table card */}
        <div className="bg-white border border-slate-200/90 rounded-[16px] overflow-hidden shadow-xs">
          <div className="divide-y divide-slate-100">
            {details.map((detail, idx) => (
              <div key={idx} className="flex justify-between items-center px-4 py-3 text-left">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{detail.label}</span>
                {detail.isBadge ? (
                  <span className={cn("text-[9.5px] font-black px-2.5 py-0.5 rounded-full border uppercase", detail.badgeColor)}>
                    {detail.value}
                  </span>
                ) : (
                  <span className="text-[11.5px] font-extrabold text-[#0F172A] pl-4 text-right break-words max-w-[65%]">
                    {detail.value}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Source trust banner */}
        <div className="p-3 bg-[#ECF8F1]/40 border border-[#C5EBD6] rounded-[14px] flex items-start gap-2.5 shadow-2xs text-left">
          <Lock className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
          <p className="text-[9.5px] text-slate-500 font-semibold leading-normal">
            This information is fetched from authorized databases and used only for the purpose of this agreement.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2 pt-2">
          <button
            type="button"
            onClick={() => {
              alert("Result PDF saved to your downloads folder.")
            }}
            className="w-full h-11 bg-white border border-slate-200 hover:border-slate-350 text-slate-700 rounded-[14px] font-bold text-[12.5px] flex items-center justify-center gap-2 shadow-2xs transition-all active:scale-[0.98] cursor-pointer"
          >
            <Download className="w-4 h-4 text-slate-500" />
            <span>Download / Save Result</span>
          </button>

          <button
            type="button"
            onClick={() => handlePrimaryAction()}
            className="w-full h-11 bg-[#0033A0] text-white rounded-[14px] font-bold text-[12.5px] flex items-center justify-center gap-1 shadow-sm transition-all hover:bg-[#002270] active:scale-[0.98] cursor-pointer"
          >
            <span>Done</span>
          </button>
        </div>

        {/* Retention policy footnote */}
        <p className="text-[9.5px] text-center font-bold text-slate-400 pt-1 leading-normal">
          Verification data is scheduled for deletion within 30 days after verification, except information required to be retained by law.
        </p>
      </div>
    )
  }

  const isInputValid = React.useMemo(() => {
    if (!serviceConfig.isValid(documentValue)) return false
    if (serviceConfig.secondaryField && !serviceConfig.secondaryField.isValid(secondaryValue)) return false
    return true
  }, [serviceConfig, documentValue, secondaryValue])

  const pageConfig = React.useMemo<{ title: React.ReactNode; subtitle: React.ReactNode }>(() => {
    switch (step) {
      case "aadhaar":
        return {
          title: `${serviceLabel} Verification`,
          subtitle: `Enter details and select purpose for verification`,
        }
      case "consent":
        return {
          title: "Consent & Terms",
          subtitle: "Review and agree to legal consent terms",
        }
      case "payment":
        return {
          title: "Payment",
          subtitle: `Pay verification fee securely to proceed`,
        }
      case "success":
        return {
          title: "Verification Result",
          subtitle: "View pulled details and save result",
        }
      default:
        return {
          title: `${serviceLabel} Verification`,
          subtitle: `Verify your ${serviceLabel} securely`,
        }
    }
  }, [step, serviceLabel])

  const buttonTextConfig = React.useMemo(() => {
    switch (step) {
      case "aadhaar": return "Proceed to Consent"
      case "consent": return "I Agree & Continue"
      case "payment": return "Pay ₹9 Securely"
      case "success": return "Done"
      default: return "Continue"
    }
  }, [step])

  const isButtonDisabled = React.useMemo(() => {
    if (step === "aadhaar") {
      const basicValid = isInputValid
      if (purpose === "customer") {
        return !basicValid || !consentFile
      }
      return !basicValid
    }
    if (step === "consent") return !termsAccepted || !privacyAccepted
    return false
  }, [step, isInputValid, purpose, consentFile, termsAccepted, privacyAccepted])

  const renderStepContent = () => {
    switch (step) {
      case "aadhaar": return renderServiceInputContent()
      case "otp": return renderOtpContent()
      case "consent": return renderConsentContent()
      case "payment": return renderPaymentContent()
      case "success": return renderSuccessContent()
      default: return renderServiceInputContent()
    }
  }

  if (showServicePicker) {
    return (
      <AppShell
        backgroundClassName="bg-white"
        header={<AppHeader />}
        bottomBar={
          <AppBottomNav
            activeTab="verification"
            onCreateAgreement={() =>
              router.push(isB2C ? b2cCreatePath : "/create-agreement?module=c2c")
            }
            onTabChange={(tab) => {
              if (tab === "home") router.push(isB2C ? b2cHomePath : c2cHomePath)
              if (tab === "agreements") router.push(`/agreements?module=${moduleType}`)
              if (tab === "profile") router.push(`/profile?module=${moduleType}`)
            }}
          />
        }
        contentClassName="pb-4"
      >
        <VerificationServicePickerIntro />
        <div className="px-4">
          <VerificationServiceGrid
            services={verificationServices}
            onSelect={(service) =>
              router.push(`/verify-identity?module=${moduleType}&service=${service.icon}`)
            }
          />
        </div>
        <div className="mt-5 px-4">
          <VerificationTrustBanner />
        </div>
      </AppShell>
    )
  }

  return (
    <>
      <OnboardingLayout
        title={pageConfig.title}
        subtitle={pageConfig.subtitle}
        cardContent={renderStepContent()}
        buttonText={buttonTextConfig}
        onButtonClick={handlePrimaryAction}
        isButtonDisabled={isButtonDisabled}
        isButtonLoading={isLoading}
        showBackButton={step !== "success"}
        stepperStep={stepNumber}
        hideFooterButton={step === "payment" || step === "success"}
        noCardWrapper={step === "payment" || step === "success"}
        moduleType={isB2C ? "b2c" : "c2c"}
        bottomBar={
          isB2C ? (
            <AppBottomNav
              activeTab="verification"
              onCreateAgreement={() => router.push(b2cCreatePath)}
              onTabChange={(tab) => {
                if (tab === "home") router.push(b2cHomePath)
                if (tab === "agreements") router.push(`/agreements?module=${moduleType}`)
                if (tab === "profile") router.push(`/profile?module=${moduleType}`)
              }}
            />
          ) : (
            <AppBottomNav
              activeTab="verification"
              onCreateAgreement={() => router.push("/create-agreement?module=c2c")}
              onTabChange={(tab) => {
                if (tab === "home") router.push(c2cHomePath)
                if (tab === "agreements") router.push(`/agreements?module=${moduleType}`)
                if (tab === "profile") router.push(`/profile?module=${moduleType}`)
              }}
            />
          )
        }
        onBackClick={() => {
          if (step === "aadhaar") {
            if (serviceParam) {
              router.replace(`/verify-identity?module=${moduleType}`)
              return
            }
            router.back()
            return
          }
          const prev = getPrevFlowStep(step, flowSteps)
          if (prev) setStep(prev)
          else router.back()
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

export default function VerifyIdentityPage() {
  return (
    <React.Suspense fallback={
      <div className="flex min-h-screen items-center justify-center bg-background">
        <span className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    }>
      <VerifyIdentityContent />
    </React.Suspense>
  )
}
