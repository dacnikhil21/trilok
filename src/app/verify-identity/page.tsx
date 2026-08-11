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
import { BusinessVerificationStep } from "@/components/agreement/BusinessVerificationStep"
import { BusinessVerifiedSuccessStep } from "@/components/agreement/BusinessVerifiedSuccessStep"
import { C2CVerificationStep } from "@/components/agreement/C2CVerificationStep"
import { C2CVerifiedSuccessStep } from "@/components/agreement/C2CVerifiedSuccessStep"
import { Input } from "@/components/ui/input"
import { ShieldCheck, Camera, MapPin, Check, Bell, RefreshCw, CheckCircle2, Lock, Smartphone, FileText, CreditCard, QrCode, Sparkles } from "lucide-react"

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

  // B2C Payment State
  const [selectedPaymentMethod, setSelectedPaymentMethod] = React.useState<"upi" | "card" | "qr">("upi")

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

  // DPDP state
  const [dpdpChecked, setDpdpChecked] = React.useState(false)

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
    setDpdpChecked(false)
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
      setTimer(60)
      advanceStep()
    } else if (step === "otp") {
      advanceStep()
    } else if (step === "upload-ekyc") {
      advanceStep()
    } else if (step === "consent") {
      advanceStep()
    } else if (step === "permissions") {
      advanceStep()
    } else if (step === "liveness") {
      advanceStep()
    } else if (step === "location") {
      advanceStep()
    } else if (step === "payment") {
      advanceStep()
    } else if (step === "success") {
      router.push(isB2C ? b2cHomePath : `/dashboard?module=${moduleType}`)
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
    <div className="space-y-4 text-center">
      <div className="w-16 h-16 bg-blue-50 text-primary rounded-full flex items-center justify-center mx-auto mb-2 border border-blue-100 shadow-sm">
        <ShieldCheck className="w-8 h-8" strokeWidth={2.5} />
      </div>
      <p className="text-[13px] text-secondary-text font-medium leading-relaxed max-w-[280px] mx-auto">
        {serviceConfig.helperText}
      </p>

      <div className="pt-2 space-y-3">
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
          error={error}
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

      <div className="p-3 bg-surface border border-border/50 rounded-[12px] flex items-start gap-3 mt-4">
        <Lock className="w-4.5 h-4.5 text-success shrink-0 mt-0.5" />
        <p className="text-left text-[11px] text-secondary-text font-medium leading-relaxed">
          {serviceConfig.securityNote}
        </p>
      </div>
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
      <div className="max-h-[140px] overflow-y-auto border border-border rounded-[12px] p-3 text-[11px] text-secondary-text font-medium leading-relaxed space-y-2 bg-[#FBFBFA]">
        <h4 className="font-bold text-foreground">Consent Notice (DPDP Act, 2023)</h4>
        <p>1. <strong>Purpose of Collection:</strong> eSaleAgreement shall process your {serviceConfig.label} verification details and GPS coordinates solely for identity verification, timestamp audit tracking, and digital agreement signature execution.</p>
        <p>2. <strong>Identity Matching:</strong> Your submitted {serviceConfig.label} details will be verified against authorized government databases.</p>
        <p>3. <strong>Storage & Encryption:</strong> Consent records, agreement tokens, and encryption metadata are logged immutably under standard cryptographic hashes.</p>
      </div>

      <div className="flex items-start gap-3 cursor-pointer pt-1" onClick={() => setDpdpChecked(!dpdpChecked)}>
        <div className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 mt-0.5 transition-all ${dpdpChecked ? "bg-primary border-primary" : "border-border"}`}>
          {dpdpChecked && <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />}
        </div>
        <span className="text-[12px] font-semibold text-foreground leading-snug select-none">
          I confirm that I have read the consent terms and authorize eSaleAgreement to verify my identity and execute agreements.
        </span>
      </div>
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

  // 8. Subscription / Tag Activation Payment screen content
  const renderPaymentContent = () => (
    isB2C ? (
      <BusinessVerificationStep
        onProceed={() => handlePrimaryAction()}
        isLoading={isLoading}
        selectedMethod={selectedPaymentMethod === "qr" ? "qr" : "upi"}
        onMethodChange={(m) => setSelectedPaymentMethod(m)}
      />
    ) : (
      <C2CVerificationStep
        onProceed={() => handlePrimaryAction()}
        isLoading={isLoading}
        selectedMethod={selectedPaymentMethod === "qr" ? "qr" : "upi"}
        onMethodChange={(m) => setSelectedPaymentMethod(m)}
      />
    )
  )

  // 9. Success screen content with Verified Tag
  const renderSuccessContent = () => (
    <div className="space-y-4">
      {isB2C ? (
        <BusinessVerifiedSuccessStep
          onContinue={() => handlePrimaryAction()}
        />
      ) : (
        <C2CVerifiedSuccessStep
          onContinue={() => handlePrimaryAction()}
        />
      )}
    </div>
  )

  const isInputValid = React.useMemo(() => {
    if (!serviceConfig.isValid(documentValue)) return false
    if (serviceConfig.secondaryField && !serviceConfig.secondaryField.isValid(secondaryValue)) return false
    return true
  }, [serviceConfig, documentValue, secondaryValue])

  const isAadhaarService = serviceConfig.id === "aadhaar"

  const pageConfig = React.useMemo<{ title: React.ReactNode; subtitle: React.ReactNode }>(() => {
    switch (step) {
      case "aadhaar":
        return {
          title: `${serviceLabel} Verification`,
          subtitle: `Verify your ${serviceLabel} securely`,
        }
      case "otp":
        return { title: `${serviceLabel} OTP`, subtitle: `Verify your ${serviceLabel}` }
      case "upload-ekyc":
        return {
          title: `Upload ${serviceLabel} Documents`,
          subtitle: isAadhaarService
            ? "Provide front, back and selfie"
            : `Provide front and back of your ${serviceLabel}`,
        }
      case "consent": return { title: "Data Privacy & Consent", subtitle: "DPDP Consent" }
      case "permissions": return { title: "Permissions Required", subtitle: "Consent Access" }
      case "liveness": return { title: "Face Verification", subtitle: "Liveness Audit" }
      case "location": return { title: "Location Permission", subtitle: "Allow location access" }
      case "payment": return { title: isB2C ? "Business Verification" : "Person Verification", subtitle: isB2C ? <span>One-time payment of <span className="font-extrabold text-[#10B981]">₹99</span> for lifetime verification & access</span> : <span>One-time payment of <span className="font-extrabold text-[#10B981]">₹0</span> for lifetime verification & access</span> }
      case "success":
        return {
          title: <span><span className="text-[#10B981]">{serviceLabel}</span> Verified!</span>,
          subtitle: `Your ${serviceLabel} is successfully verified and ready for agreements.`,
        }
    }
  }, [step, isB2C, serviceLabel, isAadhaarService])

  const buttonTextConfig = React.useMemo(() => {
    switch (step) {
      case "aadhaar": return serviceConfig.primaryButtonText
      case "otp": return `Verify ${serviceLabel}`
      case "upload-ekyc": return "Verify Documents"
      case "consent": return "Confirm DPDP Consent"
      case "permissions": return "Grant Permissions"
      case "liveness": return livenessCaptured ? "Continue" : "Capture Face Selfie"
      case "location": return isB2C ? "Proceed to ₹99 Payment" : "Allow Location"
      case "payment": return "Complete ₹99 Payment & Activate"
      case "success": return "Continue to Dashboard"
    }
  }, [step, livenessCaptured, isB2C, serviceConfig.primaryButtonText, serviceLabel])

  const isButtonDisabled = React.useMemo(() => {
    if (step === "aadhaar") return !isInputValid
    if (step === "otp") return otp.length < 6
    if (step === "consent") return !dpdpChecked
    return false
  }, [step, isInputValid, otp, dpdpChecked])

  const renderStepContent = () => {
    switch (step) {
      case "aadhaar": return renderServiceInputContent()
      case "otp": return renderOtpContent()
      case "upload-ekyc": return renderUploadEkycContent()
      case "consent": return renderConsentContent()
      case "permissions": return renderPermissionsContent()
      case "liveness": return renderLivenessContent()
      case "location": return renderLocationContent()
      case "payment": return renderPaymentContent()
      case "success": return renderSuccessContent()
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
