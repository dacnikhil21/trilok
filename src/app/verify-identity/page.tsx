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
import { 
  ShieldCheck, Camera, MapPin, Check, Lock, RefreshCw, 
  Sparkles, Bell, Eye, Database, FileText, Smartphone, CheckCircle2, Clock
} from "lucide-react"

type Step = "aadhaar" | "aadhaar-success" | "consent" | "permissions" | "recorded"

const STEPS_MAP: Record<Step, number> = {
  aadhaar: 1,
  "aadhaar-success": 1,
  consent: 2,
  permissions: 3,
  recorded: 4,
}

function VerifyIdentityContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const moduleType = searchParams.get("module") || "c2c"

  const [step, setStep] = React.useState<Step>("aadhaar")

  // Aadhaar eKYC states
  const [aadhaarNumber, setAadhaarNumber] = React.useState("")
  const [aadhaarOtp, setAadhaarOtp] = React.useState("")
  const [isOtpSent, setIsOtpSent] = React.useState(false)
  const [isAadhaarVerifying, setIsAadhaarVerifying] = React.useState(false)

  // Consent states (Screen 01)
  const [consents, setConsents] = React.useState({
    collectPersonalInfo: false,
    ekycVerification: false,
    gpsCapture: false,
    cameraAccess: false,
    termsAccepted: false,
  })

  // Permission states (Screen 02)
  const [gpsGranted, setGpsGranted] = React.useState(false)
  const [cameraGranted, setCameraGranted] = React.useState(false)
  const [notifGranted, setNotifGranted] = React.useState(false)
  const [isGpsLoading, setIsGpsLoading] = React.useState(false)
  const [isCameraLoading, setIsCameraLoading] = React.useState(false)
  const [isNotifLoading, setIsNotifLoading] = React.useState(false)

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
    }, 1000)
  }

  const verifyAadhaarOtp = () => {
    if (aadhaarOtp.length !== 6) return
    setIsAadhaarVerifying(true)
    setTimeout(() => {
      setIsAadhaarVerifying(false)
      setStep("aadhaar-success")
    }, 1200)
  }

  const requestGps = () => {
    setIsGpsLoading(true)
    setTimeout(() => {
      setGpsGranted(true)
      setIsGpsLoading(false)
    }, 600)
  }

  const requestCamera = () => {
    setIsCameraLoading(true)
    setTimeout(() => {
      setCameraGranted(true)
      setIsCameraLoading(false)
    }, 600)
  }

  const requestNotif = () => {
    setIsNotifLoading(true)
    setTimeout(() => {
      setNotifGranted(true)
      setIsNotifLoading(false)
    }, 600)
  }

  const toggleConsent = (key: keyof typeof consents) => {
    setConsents((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const allConsentsChecked = Object.values(consents).every(Boolean)

  const deviceId = React.useMemo(() => {
    return "TRILOK-MBL-78X9"
  }, [])

  const timestamp = React.useMemo(() => {
    return new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })
  }, [step])

  return (
    <AppContainer centered>
      {/* Platform Branding logo block */}
      <div className="flex flex-col items-center justify-center space-y-2 mb-6">
        <div className="w-10 h-10 rounded-full bg-primary/8 flex items-center justify-center border border-primary/10 shadow-[var(--shadow-level-1)]">
          <ShieldCheck strokeWidth={2.4} className="h-5.5 w-5.5 text-primary" />
        </div>
        <div className="flex flex-col items-center">
          <span className="text-[19px] font-display font-bold tracking-tight text-foreground leading-none">
            Trilok
          </span>
          <span className="text-[9.5px] font-bold tracking-widest uppercase text-secondary-text mt-1.5">
            Secure • Verified • Trusted
          </span>
        </div>
      </div>

      <div className="flex flex-col flex-1">
        {/* Stepper indicator */}
        <ProgressStepper currentStep={STEPS_MAP[step]} totalSteps={5} className="mb-6" />

        <AnimatePresence mode="wait">
          {/* STEP 1: Aadhaar eKYC Verification */}
          {step === "aadhaar" && (
            <motion.div
              key="aadhaar"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex flex-col flex-1 space-y-6"
            >
              <PageHeader 
                title="Aadhaar Verification" 
                subtitle="Authenticate your signature identity instantly using government eKYC records."
              />

              <div className="space-y-4">
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
                    <p className="text-[13px] text-secondary-text font-medium leading-relaxed">
                      OTP has been dispatched to the mobile number registered with your Aadhaar ending in ****
                    </p>
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
                      className="text-center text-[13px] text-secondary-text hover:text-foreground font-semibold transition-colors"
                    >
                      Edit Aadhaar
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* STEP 2: Identity Verified Transition */}
          {step === "aadhaar-success" && (
            <motion.div
              key="aadhaar-success"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex flex-col flex-1 space-y-6 text-center py-4"
            >
              <div className="mx-auto w-16 h-16 rounded-full bg-verified flex items-center justify-center border border-primary/20 shadow-sm mb-2">
                <Check strokeWidth={3} className="w-8 h-8 text-primary" />
              </div>

              <div className="space-y-2">
                <h2 className="text-[24px] font-display font-bold text-foreground">Identity Verified</h2>
                <p className="text-[14px] text-secondary-text max-w-xs mx-auto font-medium leading-relaxed">
                  Your identity has been successfully validated against Aadhaar database registers.
                </p>
              </div>

              <div className="p-4 bg-divider/40 border border-border rounded-[16px] text-left space-y-2.5">
                <div className="flex justify-between text-[13px] font-medium">
                  <span className="text-secondary-text">Full Name</span>
                  <span className="text-foreground">Nikhil Dachepalli</span>
                </div>
                <div className="flex justify-between text-[13px] font-medium border-t border-divider pt-2.5">
                  <span className="text-secondary-text">Verification Method</span>
                  <span className="text-foreground">Aadhaar eKYC API</span>
                </div>
              </div>

              <div className="mt-auto pt-8">
                <Button onClick={() => setStep("consent")} size="lg" className="w-full h-14">
                  Proceed to Privacy Consent
                </Button>
              </div>
            </motion.div>
          )}

          {/* STEP 3: DPDP Consent (Screen 01) */}
          {step === "consent" && (
            <motion.div
              key="consent"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex flex-col flex-1 space-y-6"
            >
              <PageHeader
                title="Data Privacy & Consent"
                subtitle="To comply with the Digital Personal Data Protection (DPDP) Act, 2023, we require your consent before processing your identity and agreement information."
              />

              <div className="bg-surface border border-border rounded-[16px] p-5 shadow-[var(--shadow-level-1)] space-y-4">
                {/* Checkbox 1 */}
                <div className="flex items-start gap-3 cursor-pointer" onClick={() => toggleConsent("collectPersonalInfo")}>
                  <div className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 mt-0.5 transition-all ${consents.collectPersonalInfo ? "bg-primary border-primary" : "border-border"}`}>
                    {consents.collectPersonalInfo && <Check className="w-3.5 h-3.5 text-surface" strokeWidth={3} />}
                  </div>
                  <span className="text-[13px] font-semibold text-foreground leading-snug select-none">
                    I consent to Trilok collecting and processing my personal information for identity verification.
                  </span>
                </div>

                {/* Checkbox 2 */}
                <div className="flex items-start gap-3 cursor-pointer border-t border-divider pt-3" onClick={() => toggleConsent("ekycVerification")}>
                  <div className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 mt-0.5 transition-all ${consents.ekycVerification ? "bg-primary border-primary" : "border-border"}`}>
                    {consents.ekycVerification && <Check className="w-3.5 h-3.5 text-surface" strokeWidth={3} />}
                  </div>
                  <span className="text-[13px] font-semibold text-foreground leading-snug select-none">
                    I consent to Aadhaar eKYC verification for secure agreement authentication.
                  </span>
                </div>

                {/* Checkbox 3 */}
                <div className="flex items-start gap-3 cursor-pointer border-t border-divider pt-3" onClick={() => toggleConsent("gpsCapture")}>
                  <div className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 mt-0.5 transition-all ${consents.gpsCapture ? "bg-primary border-primary" : "border-border"}`}>
                    {consents.gpsCapture && <Check className="w-3.5 h-3.5 text-surface" strokeWidth={3} />}
                  </div>
                  <span className="text-[13px] font-semibold text-foreground leading-snug select-none">
                    I allow GPS location capture for legal audit purposes.
                  </span>
                </div>

                {/* Checkbox 4 */}
                <div className="flex items-start gap-3 cursor-pointer border-t border-divider pt-3" onClick={() => toggleConsent("cameraAccess")}>
                  <div className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 mt-0.5 transition-all ${consents.cameraAccess ? "bg-primary border-primary" : "border-border"}`}>
                    {consents.cameraAccess && <Check className="w-3.5 h-3.5 text-surface" strokeWidth={3} />}
                  </div>
                  <span className="text-[13px] font-semibold text-foreground leading-snug select-none">
                    I allow camera access for live identity verification.
                  </span>
                </div>

                {/* Checkbox 5 */}
                <div className="flex items-start gap-3 cursor-pointer border-t border-divider pt-3" onClick={() => toggleConsent("termsAccepted")}>
                  <div className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 mt-0.5 transition-all ${consents.termsAccepted ? "bg-primary border-primary" : "border-border"}`}>
                    {consents.termsAccepted && <Check className="w-3.5 h-3.5 text-surface" strokeWidth={3} />}
                  </div>
                  <span className="text-[13px] font-semibold text-foreground leading-snug select-none">
                    I agree to the Privacy Policy, Terms & Conditions and DPDP Policy.
                  </span>
                </div>
              </div>

              <div className="mt-auto pt-8">
                <Button 
                  onClick={() => setStep("permissions")} 
                  disabled={!allConsentsChecked} 
                  size="lg" 
                  className="w-full h-14"
                >
                  Confirm Consent
                </Button>
              </div>
            </motion.div>
          )}

          {/* STEP 4: Permissions Required (Screen 02) */}
          {step === "permissions" && (
            <motion.div
              key="permissions"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex flex-col flex-1 space-y-6"
            >
              <PageHeader
                title="Permissions Required"
                subtitle="To complete secure agreement creation, Trilok requires access to the following services."
              />

              <div className="space-y-4">
                {/* Camera card */}
                <div className={`p-4 bg-surface border rounded-[16px] flex items-center justify-between shadow-[var(--shadow-level-1)] transition-all ${cameraGranted ? "border-primary/20 bg-primary/[0.01]" : "border-border"}`}>
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center ${cameraGranted ? "bg-primary/8 text-primary" : "bg-divider text-secondary-text"}`}>
                      <Camera className="w-4.5 h-4.5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-[14.5px] leading-none">Camera</h4>
                      <p className="text-[11.5px] text-secondary-text mt-1 font-semibold">Required for Live Selfie Verification</p>
                    </div>
                  </div>
                  <Button 
                    size="sm" 
                    variant={cameraGranted ? "ghost" : "secondary"} 
                    className="h-9 px-3.5 text-[12px] font-bold" 
                    onClick={requestCamera} 
                    loading={isCameraLoading}
                    disabled={cameraGranted}
                  >
                    {cameraGranted ? "Allowed" : "Allow"}
                  </Button>
                </div>

                {/* GPS card */}
                <div className={`p-4 bg-surface border rounded-[16px] flex items-center justify-between shadow-[var(--shadow-level-1)] transition-all ${gpsGranted ? "border-primary/20 bg-primary/[0.01]" : "border-border"}`}>
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center ${gpsGranted ? "bg-primary/8 text-primary" : "bg-divider text-secondary-text"}`}>
                      <MapPin className="w-4.5 h-4.5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-[14.5px] leading-none">GPS Location</h4>
                      <p className="text-[11.5px] text-secondary-text mt-1 font-semibold">Required for Agreement Audit Trail</p>
                    </div>
                  </div>
                  <Button 
                    size="sm" 
                    variant={gpsGranted ? "ghost" : "secondary"} 
                    className="h-9 px-3.5 text-[12px] font-bold" 
                    onClick={requestGps} 
                    loading={isGpsLoading}
                    disabled={gpsGranted}
                  >
                    {gpsGranted ? "Allowed" : "Allow"}
                  </Button>
                </div>

                {/* Notifications card */}
                <div className={`p-4 bg-surface border rounded-[16px] flex items-center justify-between shadow-[var(--shadow-level-1)] transition-all ${notifGranted ? "border-primary/20 bg-primary/[0.01]" : "border-border"}`}>
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center ${notifGranted ? "bg-primary/8 text-primary" : "bg-divider text-secondary-text"}`}>
                      <Bell className="w-4.5 h-4.5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-[14.5px] leading-none">Notifications</h4>
                      <p className="text-[11.5px] text-secondary-text mt-1 font-semibold">Receive Agreement Status Updates</p>
                    </div>
                  </div>
                  <Button 
                    size="sm" 
                    variant={notifGranted ? "ghost" : "secondary"} 
                    className="h-9 px-3.5 text-[12px] font-bold" 
                    onClick={requestNotif} 
                    loading={isNotifLoading}
                    disabled={notifGranted}
                  >
                    {notifGranted ? "Allowed" : "Allow"}
                  </Button>
                </div>
              </div>

              <div className="mt-auto pt-8">
                <Button 
                  onClick={() => setStep("recorded")} 
                  disabled={!gpsGranted || !cameraGranted || !notifGranted} 
                  size="lg" 
                  className="w-full h-14"
                >
                  Continue
                </Button>
              </div>
            </motion.div>
          )}

          {/* STEP 5: Consent Recorded Success (Screen 03) */}
          {step === "recorded" && (
            <motion.div
              key="recorded"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col flex-1 space-y-6"
            >
              <div className="text-center py-2 space-y-4">
                <div className="mx-auto w-16 h-16 rounded-full bg-verified flex items-center justify-center border border-primary/20 shadow-sm">
                  <CheckCircle2 strokeWidth={2.4} className="w-8 h-8 text-primary" />
                </div>
                <div className="space-y-1">
                  <h2 className="text-[24px] font-display font-bold text-foreground">Consent Successfully Recorded</h2>
                  <p className="text-[13px] text-secondary-text max-w-xs mx-auto font-semibold leading-relaxed">
                    Your consent has been securely recorded under the Digital Personal Data Protection Act (2023).
                  </p>
                </div>
              </div>

              {/* Premium Audit Card */}
              <div className="p-5 bg-surface border border-border rounded-[20px] shadow-[var(--shadow-level-1)] space-y-4">
                <div className="flex justify-between items-center text-[13px] font-semibold border-b border-divider pb-3">
                  <span className="text-secondary-text flex items-center gap-1.5"><FileText className="w-4 h-4 text-primary" /> Consent Version</span>
                  <span className="text-foreground">v2.4.1 (DPDP-2023)</span>
                </div>
                
                <div className="flex justify-between items-center text-[13px] font-semibold border-b border-divider pb-3">
                  <span className="text-secondary-text flex items-center gap-1.5"><Clock className="w-4 h-4 text-primary" /> Timestamp</span>
                  <span className="text-foreground text-[12px]">{timestamp}</span>
                </div>

                <div className="flex justify-between items-center text-[13px] font-semibold border-b border-divider pb-3">
                  <span className="text-secondary-text flex items-center gap-1.5"><Smartphone className="w-4 h-4 text-primary" /> Device ID</span>
                  <span className="text-foreground">{deviceId}</span>
                </div>

                <div className="flex justify-between items-center text-[13px] font-semibold border-b border-divider pb-3">
                  <span className="text-secondary-text flex items-center gap-1.5"><MapPin className="w-4 h-4 text-primary" /> GPS Status</span>
                  <span className="text-foreground flex items-center gap-1 text-[12px] text-success"><Check className="w-3.5 h-3.5" /> Stamped & Audited</span>
                </div>

                <div className="flex justify-between items-center text-[13px] font-semibold border-b border-divider pb-3">
                  <span className="text-secondary-text flex items-center gap-1.5"><Database className="w-4 h-4 text-primary" /> Data Processing</span>
                  <span className="text-foreground flex items-center gap-1 text-[12px] text-success"><Check className="w-3.5 h-3.5" /> Encrypted (AES-256)</span>
                </div>

                <div className="flex justify-between items-center text-[13px] font-semibold">
                  <span className="text-secondary-text flex items-center gap-1.5"><Eye className="w-4 h-4 text-primary" /> Audit Logging</span>
                  <span className="text-foreground flex items-center gap-1 text-[12px] text-success"><Check className="w-3.5 h-3.5" /> Active & Immutable</span>
                </div>
              </div>

              <div className="mt-auto pt-8">
                <Button 
                  onClick={() => router.push(`/dashboard?module=${moduleType}`)} 
                  size="lg" 
                  className="w-full h-14"
                >
                  Continue to Dashboard
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* FOOTER DPDP LINKS */}
      <footer className="mt-10 pt-4 border-t border-divider flex items-center justify-center gap-4 text-[12px] font-bold text-secondary-text tracking-wide uppercase">
        <button className="hover:text-primary transition-colors">Privacy Policy</button>
        <span className="text-border">•</span>
        <button className="hover:text-primary transition-colors">Terms & Conditions</button>
        <span className="text-border">•</span>
        <button className="hover:text-primary transition-colors">DPDP Policy</button>
      </footer>
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
