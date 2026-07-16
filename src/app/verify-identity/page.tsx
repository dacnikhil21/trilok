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
  const [aadhaarNumber, setAadhaarNumber] = React.useState("")
  const [aadhaarOtp, setAadhaarOtp] = React.useState("")
  const [timer, setTimer] = React.useState(30)
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
  const deviceId = "TRILOK-MBL-88D4"
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
        return 4
      case "success":
        return 5
    }
  }, [step])

  const handleButtonClick = () => {
    setError("")
    if (step === "aadhaar") {
      if (aadhaarNumber.length !== 12) {
        setError("Aadhaar Number must be exactly 12 digits.")
        return
      }
      setIsLoading(true)
      setTimeout(() => {
        setIsLoading(false)
        setStep("otp")
      }, 1000)
    } else if (step === "otp") {
      if (aadhaarOtp.length !== 6) {
        setError("OTP code must be exactly 6 digits.")
        return
      }
      setIsLoading(true)
      setTimeout(() => {
        setIsLoading(false)
        setStep("consent")
      }, 1200)
    } else if (step === "consent") {
      if (!dpdpChecked) return
      setStep("permissions")
    } else if (step === "permissions") {
      if (!gpsAllowed || !cameraAllowed || !notifAllowed) return
      setStep("liveness")
    } else if (step === "liveness") {
      if (!livenessCaptured) {
        setScanning(true)
        setTimeout(() => {
          setScanning(false)
          setLivenessCaptured(true)
        }, 1800)
      } else {
        setStep("success")
      }
    } else if (step === "success") {
      router.push(`/dashboard?module=${moduleType}`)
    }
  }

  // 1. Aadhaar screen content
  const renderAadhaarContent = () => (
    <div className="space-y-4">
      <Input
        label="Aadhaar Card Number"
        type="text"
        inputMode="numeric"
        value={aadhaarNumber}
        onChange={(e) => { setAadhaarNumber(e.target.value.replace(/\D/g, "").slice(0, 12)); setError(""); }}
        placeholder="Enter 12-digit Aadhaar"
        error={error}
        required
      />
      <div className="flex items-start gap-2.5 p-3 rounded-[12px] bg-divider/20 text-secondary-text border border-border/10 text-[11.5px] leading-relaxed">
        <Lock className="w-4 h-4 shrink-0 text-primary mt-0.5" />
        <span>Trilok is certified as a sub-ASA user. Your data is encrypted and validated through UIDAI channels.</span>
      </div>
    </div>
  )

  // 2. Aadhaar OTP screen content
  const renderAadhaarOtpContent = () => (
    <div className="space-y-4">
      <p className="text-[13px] text-secondary-text font-medium text-center leading-relaxed">
        Enter the 6-digit OTP dispatched to your registered mobile ending in <strong>****{aadhaarNumber.slice(-4)}</strong>.
      </p>
      <Input
        label="Aadhaar Verification OTP"
        type="text"
        inputMode="numeric"
        value={aadhaarOtp}
        onChange={(e) => { setAadhaarOtp(e.target.value.replace(/\D/g, "").slice(0, 6)); setError(""); }}
        placeholder="Enter 6-digit OTP"
        error={error}
        required
      />
      <div className="flex justify-between items-center text-[12.5px] px-1 font-bold uppercase tracking-wider text-primary">
        <button type="button" onClick={() => setStep("aadhaar")} className="hover:opacity-80">Edit Aadhaar</button>
        {timer > 0 ? (
          <span className="text-secondary-text/80 font-semibold normal-case">Resend in {timer}s</span>
        ) : (
          <button type="button" onClick={() => { setTimer(30); setAadhaarOtp(""); }} className="hover:opacity-80">Resend OTP</button>
        )}
      </div>
    </div>
  )

  // 3. DPDP Consent screen content
  const renderConsentContent = () => (
    <div className="space-y-4 text-left">
      {/* Realistic DPDP Terms Scrollbox */}
      <div className="max-h-[140px] overflow-y-auto border border-border rounded-[12px] p-3 text-[11px] text-secondary-text font-medium leading-relaxed space-y-2 bg-[#FBFBFA]">
        <h4 className="font-bold text-foreground">Consent Notice (DPDP Act, 2023)</h4>
        <p>1. <strong>Purpose of Collection:</strong> Trilok shall process the Aadhaar identity parameters and GPS coordinates solely for verification, timestamp audit tracking, and digital agreement signature execution.</p>
        <p>2. <strong>Identity Matching:</strong> Your live selfie will be parsed locally to confirm compliance match with Aadhaar image registers.</p>
        <p>3. <strong>Storage & Encryption:</strong> Consent records, agreement tokens, and encryption metadata are logged immutably under standard cryptographic hashes.</p>
      </div>

      <div className="flex items-start gap-3 cursor-pointer pt-1" onClick={() => setDpdpChecked(!dpdpChecked)}>
        <div className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 mt-0.5 transition-all ${dpdpChecked ? "bg-primary border-primary" : "border-border"}`}>
          {dpdpChecked && <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />}
        </div>
        <span className="text-[12px] font-semibold text-foreground leading-snug select-none">
          I confirm that I have read the consent terms and authorize Trilok to verify my identity and execute agreements.
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

  // Subtitle/Title mapper
  const pageConfig = React.useMemo(() => {
    switch (step) {
      case "aadhaar":
        return { title: "Aadhaar eKYC", subtitle: "Aadhaar Verification" }
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
        return "Request Secure OTP"
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
    if (step === "aadhaar" && aadhaarNumber.length !== 12) return true
    if (step === "otp" && aadhaarOtp.length !== 6) return true
    if (step === "consent" && !dpdpChecked) return true
    if (step === "permissions" && (!gpsAllowed || !cameraAllowed || !notifAllowed)) return true
    if (step === "liveness" && scanning) return true
    return false
  }, [step, aadhaarNumber, aadhaarOtp, dpdpChecked, gpsAllowed, cameraAllowed, notifAllowed, scanning])

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
        onButtonClick={handleButtonClick}
        isButtonDisabled={isButtonDisabled}
        isButtonLoading={isLoading}
        showBackButton={step !== "success"}
        stepperStep={stepNumber}
        onBackClick={() => {
          if (step === "otp") setStep("aadhaar")
          else if (step === "consent") setStep("otp")
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
