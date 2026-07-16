"use client"

import * as React from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { AuthLayout } from "@/components/layout/AuthLayout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ShieldCheck, Camera, MapPin, Check, Lock, Sparkles, RefreshCw } from "lucide-react"

type Step = "consent" | "aadhaar" | "permissions" | "selfie"

function VerifyIdentityForm() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const moduleType = searchParams.get("module") || "c2c"

  const [step, setStep] = React.useState<Step>("consent")
  const [consentChecked, setConsentChecked] = React.useState(false)

  // Aadhaar states
  const [aadhaarNumber, setAadhaarNumber] = React.useState("")
  const [aadhaarOtp, setAadhaarOtp] = React.useState("")
  const [isOtpSent, setIsOtpSent] = React.useState(false)
  const [isAadhaarVerifying, setIsAadhaarVerifying] = React.useState(false)

  // Permission states
  const [gpsGranted, setGpsGranted] = React.useState(false)
  const [cameraGranted, setCameraGranted] = React.useState(false)
  const [isGpsLoading, setIsGpsLoading] = React.useState(false)
  const [isCameraLoading, setIsCameraLoading] = React.useState(false)

  // Selfie states
  const [selfieCaptured, setSelfieCaptured] = React.useState(false)
  const [isCapturing, setIsCapturing] = React.useState(false)
  const [capturedImage, setCapturedImage] = React.useState<string | null>(null)

  const handleAadhaarChange = (val: string) => {
    const digits = val.replace(/\D/g, "").slice(0, 12)
    setAadhaarNumber(digits)
  }

  const handleOtpChange = (val: string) => {
    const digits = val.replace(/\D/g, "").slice(0, 6)
    setAadhaarOtp(digits)
  }

  const sendAadhaarOtp = () => {
    if (aadhaarNumber.length !== 12) return
    setIsAadhaarVerifying(true)
    setTimeout(() => {
      setIsOtpSent(true)
      setIsAadhaarVerifying(false)
    }, 1200)
  }

  const verifyAadhaarOtp = () => {
    if (aadhaarOtp.length !== 6) return
    setIsAadhaarVerifying(true)
    setTimeout(() => {
      setIsAadhaarVerifying(false)
      setStep("permissions")
    }, 1500)
  }

  const requestGps = () => {
    setIsGpsLoading(true)
    setTimeout(() => {
      setGpsGranted(true)
      setIsGpsLoading(false)
    }, 800)
  }

  const requestCamera = () => {
    setIsCameraLoading(true)
    setTimeout(() => {
      setCameraGranted(true)
      setIsCameraLoading(false)
    }, 800)
  }

  const triggerSelfieCapture = () => {
    setIsCapturing(true)
    setTimeout(() => {
      setCapturedImage("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 100 100'><circle cx='50' cy='50' r='40' fill='%230A5C36' opacity='0.15'/><path d='M50,30 A15,15 0 0,0 35,45 A15,15 0 0,0 50,60 A15,15 0 0,0 65,45 A15,15 0 0,0 50,30 Z' fill='%230A5C36'/><path d='M20,80 C20,65 30,55 50,55 C70,55 80,65 80,80 Z' fill='%230A5C36'/></svg>")
      setSelfieCaptured(true)
      setIsCapturing(false)
    }, 1200)
  }

  const completeVerification = () => {
    router.push(`/verification-success?module=${moduleType}`)
  }

  return (
    <AuthLayout 
      heading="Secure Verification" 
      subheading="We protect your identity with institutional-grade security protocols."
    >
      <div className="flex flex-col flex-1">
        {/* Progress indicator */}
        <div className="flex items-center gap-2 mb-8 bg-[#F4F4F4] p-1.5 rounded-[var(--radius-sm)]">
          <div className={`h-2 flex-1 rounded-full transition-all duration-300 ${step === "consent" ? "bg-primary" : "bg-primary/20"}`} />
          <div className={`h-2 flex-1 rounded-full transition-all duration-300 ${step === "aadhaar" ? "bg-primary" : step !== "consent" ? "bg-primary/20" : "bg-border"}`} />
          <div className={`h-2 flex-1 rounded-full transition-all duration-300 ${step === "permissions" ? "bg-primary" : (step === "selfie") ? "bg-primary/20" : "bg-border"}`} />
          <div className={`h-2 flex-1 rounded-full transition-all duration-300 ${step === "selfie" ? "bg-primary" : "bg-border"}`} />
        </div>

        <AnimatePresence mode="wait">
          {/* STEP 1: DPDP Consent */}
          {step === "consent" && (
            <motion.div
              key="consent"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex flex-col flex-1 space-y-6"
            >
              <div className="p-6 bg-primary/[0.03] border border-primary/10 rounded-[var(--radius-md)] flex gap-4">
                <ShieldCheck className="w-8 h-8 text-primary shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-display font-bold text-[18px] text-foreground mb-1">DPDP Act Protection</h3>
                  <p className="text-[14px] text-secondary-text leading-relaxed">
                    Under the Indian Digital Personal Data Protection (DPDP) Act, your details are fully encrypted. We act solely as a secure processor for executing your digital agreements.
                  </p>
                </div>
              </div>

              <div className="p-4 bg-surface border border-border rounded-[var(--radius-md)] flex items-start gap-3 mt-4">
                <input
                  type="checkbox"
                  id="dpdp-consent"
                  checked={consentChecked}
                  onChange={(e) => setConsentChecked(e.target.checked)}
                  className="w-5 h-5 mt-1 rounded text-primary focus:ring-primary border-border cursor-pointer accent-[#0A5C36]"
                />
                <label htmlFor="dpdp-consent" className="text-[14px] font-medium text-foreground cursor-pointer leading-snug select-none">
                  I consent to sharing my Aadhaar identity and location data securely for the purpose of agreement authentication.
                </label>
              </div>

              <div className="mt-auto pt-8">
                <Button
                  onClick={() => setStep("aadhaar")}
                  disabled={!consentChecked}
                  size="lg"
                  className="w-full h-14"
                >
                  Agree & Continue
                </Button>
              </div>
            </motion.div>
          )}

          {/* STEP 2: Aadhaar eKYC */}
          {step === "aadhaar" && (
            <motion.div
              key="aadhaar"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex flex-col flex-1 space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-primary font-semibold text-[14px]">
                  <Lock className="w-4 h-4" />
                  <span>Aadhaar Secure eKYC</span>
                </div>
                
                {!isOtpSent ? (
                  <Input
                    label="Aadhaar Card Number"
                    type="text"
                    inputMode="numeric"
                    value={aadhaarNumber}
                    onChange={(e) => handleAadhaarChange(e.target.value)}
                    placeholder="Enter 12-digit Aadhaar Number"
                    required
                  />
                ) : (
                  <div className="space-y-4">
                    <div className="text-[14px] text-secondary-text mb-2">
                      An OTP has been sent to the mobile number registered with your Aadhaar ending in ****
                    </div>
                    <Input
                      label="6-Digit Aadhaar OTP"
                      type="text"
                      inputMode="numeric"
                      value={aadhaarOtp}
                      onChange={(e) => handleOtpChange(e.target.value)}
                      placeholder="Enter 6-digit OTP"
                      required
                    />
                  </div>
                )}
              </div>

              <div className="mt-auto pt-8">
                {!isOtpSent ? (
                  <Button
                    onClick={sendAadhaarOtp}
                    disabled={aadhaarNumber.length !== 12 || isAadhaarVerifying}
                    loading={isAadhaarVerifying}
                    size="lg"
                    className="w-full h-14"
                  >
                    Request Secure OTP
                  </Button>
                ) : (
                  <div className="flex flex-col gap-4">
                    <Button
                      onClick={verifyAadhaarOtp}
                      disabled={aadhaarOtp.length !== 6 || isAadhaarVerifying}
                      loading={isAadhaarVerifying}
                      size="lg"
                      className="w-full h-14"
                    >
                      Verify Identity
                    </Button>
                    <button 
                      type="button" 
                      onClick={() => setIsOtpSent(false)}
                      className="text-center text-[14px] text-secondary-text hover:text-foreground font-medium"
                    >
                      Edit Aadhaar Number
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* STEP 3: Permissions Panel */}
          {step === "permissions" && (
            <motion.div
              key="permissions"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex flex-col flex-1 space-y-6"
            >
              <h3 className="font-display font-bold text-[20px] text-foreground">Secure System Checks</h3>
              <p className="text-[14px] text-secondary-text -mt-2">
                We require browser confirmations to ensure jurisdiction parameters are verified under legal agreement guidelines.
              </p>

              <div className="space-y-4">
                {/* GPS Card */}
                <div className={`p-5 rounded-[var(--radius-md)] border-2 transition-all flex items-start gap-4 ${gpsGranted ? "border-primary/20 bg-primary/[0.02]" : "border-border bg-surface"}`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${gpsGranted ? "bg-primary text-surface" : "bg-[#F4F4F4] text-secondary-text"}`}>
                    {gpsGranted ? <Check className="w-5 h-5" /> : <MapPin className="w-5 h-5" />}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-foreground text-[16px] mb-1">Geographic Stamping</h4>
                    <p className="text-[13px] text-secondary-text leading-relaxed">
                      Verifies signature jurisdiction to enforce valid state-level stamp duty.
                    </p>
                  </div>
                  {!gpsGranted && (
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      onClick={requestGps}
                      loading={isGpsLoading}
                      className="mt-1"
                    >
                      Allow
                    </Button>
                  )}
                </div>

                {/* Camera Card */}
                <div className={`p-5 rounded-[var(--radius-md)] border-2 transition-all flex items-start gap-4 ${cameraGranted ? "border-primary/20 bg-primary/[0.02]" : "border-border bg-surface"}`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${cameraGranted ? "bg-primary text-surface" : "bg-[#F4F4F4] text-secondary-text"}`}>
                    {cameraGranted ? <Check className="w-5 h-5" /> : <Camera className="w-5 h-5" />}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-foreground text-[16px] mb-1">Liveness Protection</h4>
                    <p className="text-[13px] text-secondary-text leading-relaxed">
                      Authenticates a real-time matching selfie, securing against identity theft.
                    </p>
                  </div>
                  {!cameraGranted && (
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      onClick={requestCamera}
                      loading={isCameraLoading}
                      className="mt-1"
                    >
                      Allow
                    </Button>
                  )}
                </div>
              </div>

              <div className="mt-auto pt-8">
                <Button
                  onClick={() => setStep("selfie")}
                  disabled={!gpsGranted || !cameraGranted}
                  size="lg"
                  className="w-full h-14"
                >
                  Continue
                </Button>
              </div>
            </motion.div>
          )}

          {/* STEP 4: Live Selfie */}
          {step === "selfie" && (
            <motion.div
              key="selfie"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex flex-col flex-1 space-y-6"
            >
              <div className="flex flex-col items-center justify-center space-y-6 py-4">
                <div className="relative">
                  {/* Selfie Camera Ring */}
                  <div className="w-48 h-48 rounded-full border-4 border-primary/20 overflow-hidden flex items-center justify-center bg-foreground/5 relative">
                    {capturedImage ? (
                      <img src={capturedImage} alt="Captured Selfie" className="w-full h-full object-cover" />
                    ) : (
                      <Camera className="w-12 h-12 text-secondary-text/40" />
                    )}

                    {isCapturing && (
                      <div className="absolute inset-0 bg-primary/20 flex items-center justify-center animate-pulse">
                        <RefreshCw className="w-10 h-10 animate-spin text-primary" />
                      </div>
                    )}
                  </div>
                  
                  {selfieCaptured && (
                    <div className="absolute -bottom-2 right-4 w-8 h-8 rounded-full bg-primary text-surface flex items-center justify-center shadow-[var(--shadow-level-1)]">
                      <Check className="w-4 h-4" />
                    </div>
                  )}
                </div>

                <div className="text-center space-y-2 max-w-[280px]">
                  <h4 className="font-display font-bold text-[18px]">Position your face</h4>
                  <p className="text-[13px] text-secondary-text">
                    Align your head inside the circle. Ensure good lighting and remove glasses/hats.
                  </p>
                </div>
              </div>

              <div className="mt-auto pt-8 flex gap-4">
                {!selfieCaptured ? (
                  <Button
                    onClick={triggerSelfieCapture}
                    disabled={isCapturing}
                    loading={isCapturing}
                    size="lg"
                    className="w-full h-14"
                  >
                    Capture Secure Selfie
                  </Button>
                ) : (
                  <div className="w-full flex gap-4">
                    <Button
                      onClick={() => {
                        setSelfieCaptured(false)
                        setCapturedImage(null)
                      }}
                      variant="secondary"
                      className="flex-1 h-14 text-foreground font-semibold"
                    >
                      Retake
                    </Button>
                    <Button
                      onClick={completeVerification}
                      className="flex-1 h-14"
                    >
                      Submit Verification
                    </Button>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </AuthLayout>
  )
}

export default function VerifyIdentityPage() {
  return (
    <React.Suspense fallback={
      <div className="flex min-h-screen items-center justify-center bg-background">
        <span className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    }>
      <VerifyIdentityForm />
    </React.Suspense>
  )
}
