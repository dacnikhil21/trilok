"use client"

import * as React from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { AppContainer } from "@/components/ui/AppContainer"
import { OnboardingLayout } from "@/components/ui/OnboardingLayout"
import { ProgressStepper } from "@/components/ui/ProgressStepper"
import { Input } from "@/components/ui/input"
import { ShieldCheck, Camera, MapPin, Check, Bell, RefreshCw, CheckCircle2, Lock, Smartphone, FileText } from "lucide-react"

type OnboardingStep = "aadhaar" | "otp" | "upload-ekyc" | "consent" | "permissions" | "liveness" | "location" | "success"

function VerifyIdentityContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const moduleType = (searchParams.get("module") || "c2c").toLowerCase()

  const [step, setStep] = React.useState<OnboardingStep>("aadhaar")

  // Aadhaar manual state
  const [aadhaarNumber, setAadhaarNumber] = React.useState("")
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

  // Mock values
  const deviceId = "ESALEAGREEMENT-MBL-88D4"
  const timestamp = React.useMemo(() => new Date().toLocaleString("en-IN"), [step])

  const stepNumber = React.useMemo(() => {
    switch (step) {
      case "aadhaar":
      case "otp":
      case "upload-ekyc":
        return 1
      case "consent":
        return 2
      case "permissions":
        return 3
      case "liveness":
      case "location":
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
          if (aadhaarNumber.length < 12) {
            setError("Please enter a valid 12-digit Aadhaar number.")
            return
          }
          setError("")
          setTimer(60)
          setStep("otp")
          break
        case "otp":
          if (otp.length < 6) {
            setError("Please enter valid 6-digit OTP.")
            return
          }
          setError("")
          setStep("upload-ekyc")
          break
        case "upload-ekyc":
          if (!uploads.front || !uploads.back || !uploads.selfie) {
            setError("Please complete all uploads.")
            return
          }
          setError("")
          setStep("consent")
          break
        case "consent":
          setStep("permissions")
          break
        case "permissions":
          setStep("liveness")
          break
        case "liveness":
          setStep("location")
          break
        case "location":
          setStep("success")
          break
        case "success":
          router.push(`/dashboard?module=${moduleType}`)
          break
      }
    }, 800)
  }

  // 1. Aadhaar manual screen content
  const renderAadhaarContent = () => (
    <div className="space-y-4 text-center">
      <div className="w-16 h-16 bg-blue-50 text-primary rounded-full flex items-center justify-center mx-auto mb-2 border border-blue-100 shadow-sm">
        <ShieldCheck className="w-8 h-8" strokeWidth={2.5} />
      </div>
      <p className="text-[13px] text-secondary-text font-medium leading-relaxed max-w-[280px] mx-auto">
        Your Aadhaar number is securely transmitted directly to UIDAI.
      </p>
      
      <div className="pt-2">
        <Input
          label="Aadhaar Number"
          type="tel"
          placeholder="XXXX - XXXX - XXXX"
          value={aadhaarNumber}
          onChange={(e) => {
            const val = e.target.value.replace(/\D/g, "").slice(0, 12)
            setAadhaarNumber(val)
            setError("")
          }}
          error={error}
        />
      </div>

      <div className="p-3 bg-surface border border-border/50 rounded-[12px] flex items-start gap-3 mt-4">
        <Lock className="w-4.5 h-4.5 text-success shrink-0 mt-0.5" />
        <p className="text-left text-[11px] text-secondary-text font-medium leading-relaxed">
          Secured with AES-256 bit encryption. eSaleAgreement does not store your Aadhaar number.
        </p>
      </div>
    </div>
  )

  // 2. OTP screen content
  const renderAadhaarOtpContent = () => (
    <div className="space-y-4 text-center">
      <div className="w-16 h-16 bg-blue-50 text-primary rounded-full flex items-center justify-center mx-auto mb-2 border border-blue-100 shadow-sm">
        <Smartphone className="w-8 h-8" strokeWidth={2.5} />
      </div>
      <p className="text-[13.5px] text-secondary-text font-medium leading-relaxed">
        Enter the 6-digit OTP sent to your Aadhaar-linked mobile number.
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

  // 3. Upload eKYC content
  const renderUploadEkycContent = () => (
    <div className="flex flex-col space-y-6 animate-in fade-in zoom-in-95 duration-300">
      {/* Tabs */}
      <div className="flex w-full bg-[#F7F9FB] rounded-[12px] p-1 mb-2">
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
          Virtual ID (VID)
        </button>
      </div>

      {error && <p className="text-[12.5px] text-error font-bold text-center mt-[-10px]">{error}</p>}

      {/* Upload grid */}
      <div className="grid grid-cols-2 gap-4">
        {/* Front Upload */}
        <div className="flex flex-col gap-2">
          <div 
            onClick={() => {
              setUploads(prev => ({ ...prev, front: true }))
              setError("")
            }}
            className={`w-full aspect-[1.6/1] rounded-[14px] border-[1.5px] border-dashed flex flex-col items-center justify-center p-3 relative overflow-hidden transition-all cursor-pointer group ${uploads.front ? "bg-[#F4F9FF] border-[#0033A0]/40" : "bg-white border-[#E2E8F0] hover:border-[#0033A0]/30 hover:bg-[#F8FAFC]"}`}
          >
            <div className="absolute inset-0 p-3 opacity-30 flex flex-col pointer-events-none">
              <div className="flex items-center gap-2 mb-2 border-b border-[#94A3B8]/30 pb-1">
                <div className="w-5 h-5 rounded-full bg-[#E2E8F0] flex items-center justify-center shrink-0 overflow-hidden">
                  <div className="w-3 h-3 bg-[#CBD5E1] rounded-b-full translate-y-[2px]" />
                </div>
                <div className="h-1.5 w-16 bg-[#E2E8F0] rounded-full" />
              </div>
              <div className="flex gap-3">
                <div className="w-[30%] aspect-[3/4] bg-[#E2E8F0] rounded-[2px]" />
                <div className="flex-1 space-y-1.5">
                  <div className="h-1 w-full bg-[#E2E8F0] rounded-full" />
                  <div className="h-1 w-[80%] bg-[#E2E8F0] rounded-full" />
                  <div className="h-1 w-[60%] bg-[#E2E8F0] rounded-full" />
                  <div className="h-2 w-full mt-2 bg-[#E2E8F0] rounded-full mx-auto" />
                </div>
              </div>
            </div>
            
            <div className={`relative z-10 w-11 h-11 rounded-full flex items-center justify-center shadow-sm transition-transform group-hover:scale-105 ${uploads.front ? "bg-[#0033A0] text-white" : "bg-white text-[#041B4A] border border-[#E2E8F0]"}`}>
              {uploads.front ? <Check className="w-5 h-5" strokeWidth={3} /> : <Camera className="w-5 h-5" />}
            </div>
          </div>
          <span className="text-[13px] font-bold text-[#041B4A] text-center">Upload Front</span>
        </div>

        {/* Back Upload */}
        <div className="flex flex-col gap-2">
          <div 
            onClick={() => {
              setUploads(prev => ({ ...prev, back: true }))
              setError("")
            }}
            className={`w-full aspect-[1.6/1] rounded-[14px] border-[1.5px] border-dashed flex flex-col items-center justify-center p-3 relative overflow-hidden transition-all cursor-pointer group ${uploads.back ? "bg-[#F4F9FF] border-[#0033A0]/40" : "bg-white border-[#E2E8F0] hover:border-[#0033A0]/30 hover:bg-[#F8FAFC]"}`}
          >
            <div className="absolute inset-0 p-3 opacity-30 flex flex-col justify-between pointer-events-none">
              <div className="h-[25%] w-full bg-[#E2E8F0] rounded-[2px]" />
              <div className="space-y-1.5">
                <div className="h-1 w-full bg-[#E2E8F0] rounded-full" />
                <div className="h-1 w-[85%] bg-[#E2E8F0] rounded-full" />
                <div className="h-1 w-[70%] bg-[#E2E8F0] rounded-full" />
              </div>
            </div>

            <div className={`relative z-10 w-11 h-11 rounded-full flex items-center justify-center shadow-sm transition-transform group-hover:scale-105 ${uploads.back ? "bg-[#0033A0] text-white" : "bg-white text-[#041B4A] border border-[#E2E8F0]"}`}>
              {uploads.back ? <Check className="w-5 h-5" strokeWidth={3} /> : <Camera className="w-5 h-5" />}
            </div>
          </div>
          <span className="text-[13px] font-bold text-[#041B4A] text-center">Upload Back</span>
        </div>
      </div>

      {/* Live Selfie */}
      <div className="flex flex-col gap-2">
        <div 
          onClick={() => {
            setUploads(prev => ({ ...prev, selfie: true }))
            setError("")
          }}
          className={`w-full h-[140px] rounded-[16px] border-[1.5px] border-dashed flex flex-col items-center justify-center relative overflow-hidden transition-all cursor-pointer group ${uploads.selfie ? "bg-[#F4F9FF] border-[#0033A0]/40" : "bg-[#F8FAFC] border-[#CBD5E1] hover:border-[#0033A0]/30 hover:bg-[#F1F5F9]"}`}
        >
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
            <div className="w-[100px] h-[100px] rounded-[30px] border-2 border-[#94A3B8]" />
            <div className="absolute w-[60px] h-[60px] rounded-full border-2 border-[#94A3B8] -translate-y-2" />
            <div className="absolute w-[80px] h-[40px] rounded-t-full border-2 border-b-0 border-[#94A3B8] translate-y-10" />
          </div>

          <div className={`relative z-10 w-14 h-14 rounded-full flex items-center justify-center shadow-sm transition-transform group-hover:scale-110 ${uploads.selfie ? "bg-[#0033A0] text-white" : "bg-white text-[#041B4A] border border-[#E2E8F0]"}`}>
            {uploads.selfie ? <Check className="w-6 h-6" strokeWidth={3} /> : <Camera className="w-6 h-6" />}
          </div>
        </div>
        <span className="text-[13px] font-bold text-[#041B4A] text-center">Live Selfie</span>
      </div>
    </div>
  )

  // 4. DPDP Consent screen content
  const renderConsentContent = () => (
    <div className="space-y-4 text-left">
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

  // 8. Success screen content
  const renderSuccessContent = () => (
    <div className="space-y-4">
      <div className="text-center space-y-2.5">
        <div className="mx-auto w-14 h-14 rounded-full bg-success/10 flex items-center justify-center border border-success/20 shadow-sm">
          <CheckCircle2 strokeWidth={2.4} className="w-8 h-8 text-success" />
        </div>
        <div className="space-y-0.5">
          <h2 className="text-[20px] font-display font-bold text-foreground">Identity Verified Successfully</h2>
          <p className="text-[12px] text-secondary-text font-medium leading-relaxed max-w-[280px] mx-auto">
            Your credentials have been securely stored in compliance with the DPDP Act (2023).
          </p>
        </div>
      </div>

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
      case "aadhaar": return { title: "Aadhaar eKYC Verification", subtitle: "Enter your Aadhaar number manually" }
      case "otp": return { title: "Aadhaar OTP", subtitle: "Verify OTP" }
      case "upload-ekyc": return { title: "Upload eKYC Documents", subtitle: "Provide front, back and selfie" }
      case "consent": return { title: "Data Privacy & Consent", subtitle: "DPDP Consent" }
      case "permissions": return { title: "Permissions Required", subtitle: "Consent Access" }
      case "liveness": return { title: "Face Verification", subtitle: "Liveness Audit" }
      case "location": return { title: "Location Permission", subtitle: "Allow location access" }
      case "success": return { title: "Verification Completed", subtitle: "Identity Verified" }
    }
  }, [step])

  const buttonTextConfig = React.useMemo(() => {
    switch (step) {
      case "aadhaar": return "Request Secure OTP"
      case "otp": return "Verify Aadhaar"
      case "upload-ekyc": return "Verify Documents"
      case "consent": return "Confirm DPDP Consent"
      case "permissions": return "Grant Permissions"
      case "liveness": return livenessCaptured ? "Continue" : "Capture Face Selfie"
      case "location": return "Allow Location"
      case "success": return "Continue to Dashboard"
    }
  }, [step, livenessCaptured])

  const isButtonDisabled = React.useMemo(() => {
    if (step === "consent") return !dpdpChecked
    return false
  }, [step, dpdpChecked])

  const renderStepContent = () => {
    switch (step) {
      case "aadhaar": return renderAadhaarContent()
      case "otp": return renderAadhaarOtpContent()
      case "upload-ekyc": return renderUploadEkycContent()
      case "consent": return renderConsentContent()
      case "permissions": return renderPermissionsContent()
      case "liveness": return renderLivenessContent()
      case "location": return renderLocationContent()
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
          if (step === "otp") setStep("aadhaar")
          else if (step === "upload-ekyc") setStep("otp")
          else if (step === "consent") setStep("upload-ekyc")
          else if (step === "permissions") setStep("consent")
          else if (step === "liveness") setStep("permissions")
          else if (step === "location") setStep("liveness")
          else router.back()
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
