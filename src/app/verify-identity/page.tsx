"use client"

import * as React from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { AppContainer } from "@/components/ui/AppContainer"
import { OnboardingLayout } from "@/components/ui/OnboardingLayout"
import { ProgressStepper } from "@/components/ui/ProgressStepper"
import { Input } from "@/components/ui/input"
import { ShieldCheck, Camera, MapPin, Check, Bell, RefreshCw, CheckCircle2, Lock, Smartphone } from "lucide-react"

type OnboardingStep = "aadhaar" | "otp" | "consent" | "permissions" | "liveness" | "success"

function VerifyIdentityContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const moduleType = (searchParams.get("module") || "c2c").toLowerCase()

  const [step, setStep] = React.useState<OnboardingStep>("aadhaar")

  // Aadhaar eKYC state
  const [activeTab, setActiveTab] = React.useState<"aadhaar" | "vid">("aadhaar")
  const [uploads, setUploads] = React.useState({ front: false, back: false, selfie: false })
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState("")



  // DPDP state
  const [dpdpChecked, setDpdpChecked] = React.useState(false)

  // Permissions state
  const [gpsAllowed, setGpsAllowed] = React.useState(false)
  const [cameraAllowed, setCameraAllowed] = React.useState(false)
  const [notifAllowed, setNotifAllowed] = React.useState(false)

  // Liveness state
  const [livenessCaptured, setLivenessCaptured] = React.useState(false)
  const [scanning, setScanning] = React.useState(false)

  // Mock values
  const deviceId = "ESALEAGREEMENT-MBL-88D4"
  const timestamp = React.useMemo(() => new Date().toLocaleString("en-IN"), [step])

  const stepNumber = React.useMemo(() => {
    switch (step) {
      case "aadhaar":
      case "otp":
        return 1
      case "consent":
        return 2
      case "permissions":
        return 3
      case "liveness":
      case "success":
        return 4
      default:
        return 1
    }
  }, [step])

  const handlePrimaryAction = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      switch (step) {
        case "aadhaar":
          if (!uploads.front || !uploads.back || !uploads.selfie) {
            setError("Please complete all uploads.")
            return
          }
          setStep("consent") // Skip OTP step
          break
        case "consent":
          setStep("permissions")
          break
        case "permissions":
          setStep("liveness")
          break
        case "liveness":
          setStep("success")
          break
        case "success":
          router.push(`/dashboard?module=${moduleType}`)
          break
      }
    }, 800)
  }

  // 1. Aadhaar screen content
  const renderAadhaarContent = () => (
    <div className="flex flex-col space-y-6 animate-in fade-in zoom-in-95 duration-300">
      
      {/* Tabs */}
      <div className="flex w-full bg-[#F7F9FB] rounded-[12px] p-1 mb-2">
        <button 
          onClick={() => setActiveTab("aadhaar")}
          className={`flex-1 py-3 text-[14.5px] font-bold rounded-[10px] transition-all ${
            activeTab === "aadhaar" 
              ? "bg-white text-[#0033A0] shadow-sm ring-1 ring-black/5" 
              : "text-gray-500 hover:text-[#041B4A]"
          }`}
        >
          Aadhaar Card
        </button>
        <button 
          onClick={() => setActiveTab("vid")}
          className={`flex-1 py-3 text-[14.5px] font-bold rounded-[10px] transition-all ${
            activeTab === "vid" 
              ? "bg-white text-[#0033A0] shadow-sm ring-1 ring-black/5" 
              : "text-gray-500 hover:text-[#041B4A]"
          }`}
        >
          Virtual ID
        </button>
      </div>

      {/* Upload Front */}
      <div className="space-y-2.5">
        <h4 className="text-[15px] font-bold text-[#041B4A]">Upload Front</h4>
        <div className="flex gap-3">
          {/* Sample */}
          <div className="flex-[1.8] h-[90px] border border-gray-200 rounded-[12px] bg-white relative overflow-hidden flex flex-col p-2">
            <div className="flex justify-between items-start">
               <div className="w-6 h-8 bg-gray-200 rounded-sm" />
               <div className="text-[6px] font-bold text-orange-500 text-center uppercase">Government of India</div>
               <div className="w-8 h-8 rounded-full border border-red-400 flex items-center justify-center">
                  <div className="w-5 h-5 bg-red-100 rounded-full" />
               </div>
            </div>
            <div className="flex gap-2 mt-auto">
               <div className="w-8 h-10 bg-gray-200 rounded-sm shrink-0" />
               <div className="flex-1 space-y-1 mt-1">
                 <div className="w-full h-1.5 bg-gray-200 rounded-full" />
                 <div className="w-3/4 h-1.5 bg-gray-200 rounded-full" />
                 <div className="w-1/2 h-1.5 bg-gray-200 rounded-full" />
               </div>
               <div className="w-8 h-8 bg-gray-200 rounded-sm mt-auto" />
            </div>
          </div>
          {/* Empty Box */}
          <div className="flex-1 h-[90px] border border-gray-200 rounded-[12px] bg-white flex items-center justify-center">
             {uploads.front && <CheckCircle2 className="w-6 h-6 text-[#1E9E40]" />}
          </div>
          {/* Camera Button */}
          <button 
            onClick={() => setUploads(p => ({ ...p, front: !p.front }))}
            className="flex-1 h-[90px] border border-gray-200 rounded-[12px] bg-white flex items-center justify-center hover:bg-gray-50 transition-colors active:scale-95"
          >
             <div className="w-10 h-10 bg-[#0033A0] rounded-lg flex items-center justify-center">
                <Camera className="w-5 h-5 text-white" />
             </div>
          </button>
        </div>
      </div>

      {/* Upload Back */}
      <div className="space-y-2.5">
        <h4 className="text-[15px] font-bold text-[#041B4A]">Upload Back</h4>
        <div className="flex gap-3">
          {/* Sample */}
          <div className="flex-[1.8] h-[90px] border border-gray-200 rounded-[12px] bg-white relative overflow-hidden p-2 flex flex-col justify-between">
            <div className="flex justify-between items-start w-full">
               <div className="w-6 h-8 bg-gray-200 rounded-sm" />
               <div className="text-[6px] font-bold text-orange-500 uppercase mt-1">Unique Identification Authority of India</div>
               <div className="w-4 h-4" />
            </div>
            <div className="flex gap-2">
               <div className="flex-1 space-y-1">
                 <div className="w-full h-1.5 bg-gray-200 rounded-full" />
                 <div className="w-full h-1.5 bg-gray-200 rounded-full" />
                 <div className="w-3/4 h-1.5 bg-gray-200 rounded-full" />
                 <div className="w-1/2 h-1.5 bg-gray-200 rounded-full" />
               </div>
               <div className="w-10 h-10 bg-gray-200 rounded-sm shrink-0" />
            </div>
          </div>
          {/* Empty Box */}
          <div className="flex-1 h-[90px] border border-gray-200 rounded-[12px] bg-white flex items-center justify-center">
             {uploads.back && <CheckCircle2 className="w-6 h-6 text-[#1E9E40]" />}
          </div>
          {/* Camera Button */}
          <button 
            onClick={() => setUploads(p => ({ ...p, back: !p.back }))}
            className="flex-1 h-[90px] border border-gray-200 rounded-[12px] bg-white flex items-center justify-center hover:bg-gray-50 transition-colors active:scale-95"
          >
             <div className="w-10 h-10 bg-[#0033A0] rounded-lg flex items-center justify-center">
                <Camera className="w-5 h-5 text-white" />
             </div>
          </button>
        </div>
      </div>

      {/* Live Selfie */}
      <div className="space-y-2.5">
        <h4 className="text-[15px] font-bold text-[#041B4A]">Live Selfie</h4>
        <div className="flex gap-3">
          {/* Sample */}
          <div className="flex-[1.8] h-[90px] border border-gray-200 rounded-[12px] bg-gray-100 relative overflow-hidden flex items-end justify-center">
             {/* Avatar SVG Mock */}
             <svg width="60" height="70" viewBox="0 0 60 70" fill="none" xmlns="http://www.w3.org/2000/svg">
               <path d="M15 70C15 50 25 45 30 45C35 45 45 50 45 70" fill="#93C5FD"/>
               <circle cx="30" cy="25" r="15" fill="#FCD34D"/>
               <path d="M22 15C25 10 35 10 38 15C40 18 40 22 40 22C40 22 35 18 30 18C25 18 20 22 20 22C20 22 20 18 22 15Z" fill="#1F2937"/>
             </svg>
          </div>
          {/* Empty Box */}
          <div className="flex-1 h-[90px] border border-gray-200 rounded-[12px] bg-white flex items-center justify-center">
             {uploads.selfie && <CheckCircle2 className="w-6 h-6 text-[#1E9E40]" />}
          </div>
          {/* Camera Button */}
          <button 
            onClick={() => setUploads(p => ({ ...p, selfie: !p.selfie }))}
            className="flex-1 h-[90px] border border-gray-200 rounded-[12px] bg-white flex items-center justify-center hover:bg-gray-50 transition-colors active:scale-95"
          >
             <div className="w-10 h-10 bg-[#0033A0] rounded-lg flex items-center justify-center">
                <Camera className="w-5 h-5 text-white" />
             </div>
          </button>
        </div>
      </div>

    </div>
  )

  const renderAadhaarOtpContent = () => null

  // 3. DPDP Consent screen content
  const renderConsentContent = () => (
    <div className="space-y-4 text-left">
      {/* Realistic DPDP Terms Scrollbox */}
      <div className="max-h-[140px] overflow-y-auto border border-border rounded-[12px] p-3 text-[11px] text-secondary-text font-medium leading-relaxed space-y-2 bg-[#FBFBFA]">
        <h4 className="font-bold text-foreground">Consent Notice (DPDP Act, 2023)</h4>
        <p>1. <strong>Purpose of Collection:</strong> eSaleAgreement shall process the Aadhaar identity parameters and GPS coordinates solely for verification, timestamp audit tracking, and digital agreement signature execution.</p>
        <p>2. <strong>Identity Matching:</strong> Your live selfie will be parsed locally to confirm compliance match with Aadhaar image registers.</p>
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

  // 4. Permissions screen content
  const renderPermissionsContent = () => (
    <div className="space-y-3">
      {/* Permissions items */}
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

  // 5. Liveness screen content
  const renderLivenessContent = () => (
    <div className="space-y-4 text-center">
      {!livenessCaptured ? (
        <div className="space-y-3">
          <p className="text-[13px] text-secondary-text font-medium leading-relaxed">
            Position your face in the center of the viewport guide to complete liveness eKYC.
          </p>

          {/* Camera Viewport Simulation */}
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

  // 6. Success screen content
  const renderSuccessContent = () => (
    <div className="space-y-4">
      <div className="text-center space-y-2.5">
        <div className="mx-auto w-14 h-14 rounded-full bg-verified flex items-center justify-center border border-primary/20 shadow-sm">
          <CheckCircle2 strokeWidth={2.4} className="w-8 h-8 text-primary" />
        </div>
        <div className="space-y-0.5">
          <h2 className="text-[20px] font-display font-bold text-foreground">Identity Verified Successfully</h2>
          <p className="text-[12px] text-secondary-text font-medium leading-relaxed max-w-[280px] mx-auto">
            Your credentials have been securely stored in compliance with the DPDP Act (2023).
          </p>
        </div>
      </div>

      {/* Compliance Audit Card */}
      <div className="p-4 bg-[#FBFBFA] border border-border/40 rounded-[14px] space-y-2.5 text-[12.5px] font-semibold text-secondary-text">
        <div className="flex justify-between border-b border-divider pb-2.5">
          <span>Verification Version</span>
          <span className="text-foreground">v2.4.1 (DPDP)</span>
        </div>
        <div className="flex justify-between border-b border-divider pb-2.5">
          <span>Audit Timestamp</span>
          <span className="text-foreground text-[11.5px]">{timestamp}</span>
        </div>
        <div className="flex justify-between border-b border-divider pb-2.5">
          <span>Registered Device</span>
          <span className="text-foreground">{deviceId}</span>
        </div>
        <div className="flex justify-between items-center">
          <span>Security Protocol</span>
          <span className="text-foreground text-[11px] px-2 py-0.5 bg-[#EAF7EE] text-[#1A8A3C] rounded-full">AES-256</span>
        </div>
      </div>
    </div>
  )

  const pageConfig = React.useMemo(() => {
    switch (step) {
      case "aadhaar":
        return { title: "Aadhaar eKYC Verification", subtitle: "Verify your identity using Aadhaar" }
      case "otp":
        return { title: "Aadhaar OTP", subtitle: "OTP Verification" }
      case "consent":
        return { title: "Data Privacy & Consent", subtitle: "DPDP Consent" }
      case "permissions":
        return { title: "Permissions Required", subtitle: "Consent Access" }
      case "liveness":
        return { title: "Face Verification", subtitle: "Liveness Audit" }
      case "success":
        return { title: "Verification Completed", subtitle: "Identity Verified" }
    }
  }, [step])

  const buttonTextConfig = React.useMemo(() => {
    switch (step) {
      case "aadhaar":
        return "Next"
      case "otp":
        return "Verify Aadhaar"
      case "consent":
        return "Confirm DPDP Consent"
      case "permissions":
        return "Grant Permissions"
      case "liveness":
        return livenessCaptured ? "Continue" : "Capture Face Selfie"
      case "success":
        return "Continue to Dashboard"
    }
  }, [step, livenessCaptured])

  const isButtonDisabled = React.useMemo(() => {
    return false
  }, [])

  const renderStepContent = () => {
    switch (step) {
      case "aadhaar": return renderAadhaarContent()
      case "otp": return renderAadhaarOtpContent()
      case "consent": return renderConsentContent()
      case "permissions": return renderPermissionsContent()
      case "liveness": return renderLivenessContent()
      case "success": return renderSuccessContent()
    }
  }

  return (
    <AppContainer centered>
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
        onBackClick={() => {
          if (step === "consent") setStep("aadhaar")
          else if (step === "permissions") setStep("consent")
          else if (step === "liveness") setStep("permissions")
        }}
      />
    </AppContainer>
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
