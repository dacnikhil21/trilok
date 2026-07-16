"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { OnboardingLayout } from "@/components/ui/OnboardingLayout"
import { AppContainer } from "@/components/ui/AppContainer"

export default function OtpPage() {
  const router = useRouter()
  const [otp, setOtp] = React.useState<string[]>(Array(6).fill(""))
  const [timer, setTimer] = React.useState(30)
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState("")

  React.useEffect(() => {
    if (timer > 0) {
      const t = setTimeout(() => setTimer(timer - 1), 1000)
      return () => clearTimeout(t)
    }
  }, [timer])

  const inputRefs = React.useRef<(HTMLInputElement | null)[]>([])

  const handleChange = (val: string, index: number) => {
    const numericVal = val.replace(/\D/g, "")
    if (!numericVal) return

    const newOtp = [...otp]
    newOtp[index] = numericVal.slice(-1)
    setOtp(newOtp)
    setError("")

    // Shift focus to next input
    if (index < 5 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace") {
      if (!otp[index] && index > 0) {
        const newOtp = [...otp]
        newOtp[index - 1] = ""
        setOtp(newOtp)
        inputRefs.current[index - 1]?.focus()
      } else {
        const newOtp = [...otp]
        newOtp[index] = ""
        setOtp(newOtp)
      }
    }
  }

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6)
    if (pastedData.length === 6) {
      const newOtp = pastedData.split("")
      setOtp(newOtp)
      inputRefs.current[5]?.focus()
    }
  }

  const handleVerify = () => {
    const fullOtp = otp.join("")
    if (fullOtp.length !== 6) {
      setError("Please enter the 6-digit verification code.")
      return
    }

    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      // OTP verified, proceed to select service
      router.push("/select-service")
    }, 1500)
  }

  const handleResend = () => {
    if (timer > 0) return
    setOtp(Array(6).fill(""))
    setTimer(30)
    setError("")
    inputRefs.current[0]?.focus()
  }

  const otpComplete = otp.every(digit => digit !== "")

  const cardContent = (
    <div className="space-y-5">
      <p className="text-[13px] text-secondary-text font-medium text-center leading-relaxed">
        We have sent a 6-digit verification code to your mobile number.
      </p>

      {/* OTP Boxes Grid */}
      <div className="flex justify-between gap-1.5">
        {otp.map((digit, idx) => (
          <input
            key={idx}
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(e.target.value, idx)}
            onKeyDown={(e) => handleKeyDown(e, idx)}
            onPaste={handlePaste}
            ref={(el) => { inputRefs.current[idx] = el }}
            className="w-[38px] h-[48px] rounded-[10px] border border-border bg-surface text-center font-display font-bold text-[18px] text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all shadow-sm"
          />
        ))}
      </div>

      {error && (
        <p className="text-[11.5px] text-error font-semibold text-center">{error}</p>
      )}

      {/* Resend Actions */}
      <div className="text-center pt-2">
        {timer > 0 ? (
          <span className="text-[12.5px] text-secondary-text/80 font-medium">
            Resend code in <strong className="text-foreground">{timer}s</strong>
          </span>
        ) : (
          <button
            onClick={handleResend}
            className="text-[12.5px] text-primary hover:opacity-85 font-bold uppercase tracking-wider"
          >
            Resend Code
          </button>
        )}
      </div>
    </div>
  )

  return (
    <AppContainer centered>
      <OnboardingLayout
        title="Enter Verification Code"
        subtitle="Verification Code"
        cardContent={cardContent}
        buttonText="Verify & Continue"
        onButtonClick={handleVerify}
        isButtonDisabled={!otpComplete}
        isButtonLoading={isLoading}
        bottomHelperText={
          <span className="text-[12px] text-secondary-text/80">
            Having trouble? <button className="font-semibold text-foreground underline hover:text-primary">Contact Support</button>
          </span>
        }
        showBackButton
        onBackClick={() => router.push("/login")}
      />
    </AppContainer>
  )
}
