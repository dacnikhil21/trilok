"use client"

import * as React from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { AppContainer } from "@/components/ui/AppContainer"
import { PageHeader } from "@/components/ui/PageHeader"
import { ProgressStepper } from "@/components/ui/ProgressStepper"
import { StatusCard } from "@/components/ui/StatusCard"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ShieldCheck, Camera, MapPin, Check, Lock, RefreshCw, Sparkles } from "lucide-react"

type Step = "consent" | "aadhaar" | "permissions" | "selfie"

const STEPS_MAP: Record<Step, number> = {
  consent: 0,
  aadhaar: 1,
  permissions: 2,
  selfie: 3,
}

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
    <AppContainer centered>
      <PageHeader 
        title="Secure Verification" 
        subtitle="We protect your identity with institutional-grade security protocols." 
        showLogo
      />
      <div className="flex flex-col flex-1">
        {/* Stepper component */}
        <ProgressStepper currentStep={STEPS_MAP[step]} totalSteps={4} />

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
              <StatusCard
                variant="success"
                icon={ShieldCheck}
                title="DPDP Act Protection"
                description="Under the Indian Digital Personal Data Protection (DPDP) Act, your details are fully encrypted. We act solely as a secure processor for executing your digital agreements."
              />

              <div className="p-4 bg-surface border border-border rounded-[var(--radius-md)] flex items-start gap-3 mt-4 shadow-[var(--shadow-level-1)]">
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
                    <div className="text-[14px] text-secondary-text mb-2 font-medium">
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
                      className="text-center text-[14px] text-secondary-text hover:text-foreground font-medium transition-colors"
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
              <h3 className="font-display font-bold text-[20px] text-foreground tracking-tight">Secure System Checks</h3>
              <p className="text-[14px] text-secondary-text -mt-2 font-medium">
                We require browser confirmations to ensure jurisdiction parameters are verified under legal agreement guidelines.
              </p>

              <div className="space-y-4">
                {/* GPS Status Card */}
                <StatusCard
                  variant={gpsGranted ? "success" : "info"}
                  icon={gpsGranted ? Check : MapPin}
                  title="Geographic Stamping"
                  description="Verifies signature jurisdiction to enforce valid state-level stamp duty."
                  actionNode={
                    !gpsGranted && (
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        onClick={requestGps}
                        loading={isGpsLoading}
                      >
                        Allow
                      </Button>
                    )
                  }
                />

                {/* Camera Status Card */}
                <StatusCard
                  variant={cameraGranted ? "success" : "info"}
                  icon={cameraGranted ? Check : Camera}
                  title="Liveness Protection"
                  description="Authenticates a real-time matching selfie, securing against identity theft."
                  actionNode={
                    !cameraGranted && (
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        onClick={requestCamera}
                        loading={isCameraLoading}
                      >
                        Allow
                      </Button>
                    )
                  }
                />
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
                  <p className="text-[13px] text-secondary-text font-medium">
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
      <VerifyIdentityForm />
    </React.Suspense>
  )
}
