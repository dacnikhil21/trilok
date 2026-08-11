"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { ShieldCheck } from "lucide-react"
import { MobileAppShell } from "@/components/ui/MobileAppShell"
import { OnboardingHeader } from "@/components/layout/OnboardingHeader"
import { getB2CHomePath, isB2COnboarded } from "@/lib/b2c-session"

export default function OtpPage() {
  const router = useRouter()
  const [otp, setOtp] = React.useState<string>("")
  const [timer, setTimer] = React.useState(45)
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState("")
  const [mobile, setMobile] = React.useState("+91 98765 43210")

  React.useEffect(() => {
    const stored = typeof window !== "undefined" ? sessionStorage.getItem("user_mobile") : ""
    if (stored) {
      setMobile(`+91 ${stored.slice(0, 5)} ${stored.slice(5)}`)
    }
  }, [])

  React.useEffect(() => {
    if (timer > 0) {
      const t = setTimeout(() => setTimer(timer - 1), 1000)
      return () => clearTimeout(t)
    }
  }, [timer])

  const handleVerify = (currentOtp: string) => {
    if (currentOtp.length !== 6) return

    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      if (isB2COnboarded()) {
        router.push(getB2CHomePath())
      } else {
        router.push("/select-service")
      }
    }, 1200)
  }

  const handleNumpadClick = (key: string) => {
    if (key === "backspace") {
      setOtp((prev) => prev.slice(0, -1))
      setError("")
      return
    }

    if (otp.length < 6) {
      const newOtp = otp + key
      setOtp(newOtp)
      setError("")

      if (newOtp.length === 6) {
        handleVerify(newOtp)
      }
    }
  }

  const handleResend = () => {
    if (timer > 0) return
    setOtp("")
    setTimer(45)
    setError("")
  }

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0")
    const s = (seconds % 60).toString().padStart(2, "0")
    return `${m}:${s}`
  }

  const numpadKeys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "", "0", "backspace"]

  const numpadFooter = (
    <div className="grid grid-cols-3 gap-x-4 gap-y-3 px-1">
      {numpadKeys.map((key, index) => (
        <div key={index} className="flex h-[56px] justify-center">
          {key === "" ? null : key === "backspace" ? (
            <button
              type="button"
              onClick={() => handleNumpadClick(key)}
              className="flex h-full w-full max-w-[90px] items-center justify-center rounded-[14px] bg-[#F7F9FB] text-primary-text shadow-sm transition-transform active:scale-95"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M21 4H8l-7 8 7 8h13a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z" />
                <line x1="18" y1="9" x2="12" y2="15" />
                <line x1="12" y1="9" x2="18" y2="15" />
              </svg>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => handleNumpadClick(key)}
              className="flex h-full w-full max-w-[90px] items-center justify-center rounded-[14px] bg-[#F7F9FB] text-[24px] font-bold text-primary-text shadow-sm transition-transform active:scale-95"
            >
              {key}
            </button>
          )}
        </div>
      ))}
    </div>
  )

  return (
    <MobileAppShell
      header={<OnboardingHeader title="Verify Identity" onBack={() => router.push("/login")} />}
      footer={numpadFooter}
      contentClassName="px-2 py-2"
    >
      <div className="flex w-full flex-col">
        <div className="mt-2 flex flex-col items-center px-4 text-center">
          <div className="mb-2 flex h-14 w-14 items-center justify-center rounded-full border border-primary/20 bg-primary/10 text-primary shadow-sm">
            <ShieldCheck className="h-7 w-7 text-primary" strokeWidth={2.2} />
          </div>
          <h1 className="mb-1 text-[24px] font-bold tracking-tight text-primary">Verify OTP</h1>
          <p className="text-[13.5px] font-medium text-secondary-text">Enter the 6-digit OTP sent to</p>
          <p className="mt-0.5 text-[16px] font-bold text-foreground">{mobile}</p>
        </div>

        <div className="mb-6 flex justify-between gap-2 px-4">
          {[0, 1, 2, 3, 4, 5].map((index) => {
            const isActive = otp.length === index
            return (
              <div
                key={index}
                className={`flex h-[56px] w-[48px] items-center justify-center rounded-[12px] border text-[24px] font-bold ${
                  isActive
                    ? "border-primary text-primary shadow-sm"
                    : otp[index]
                      ? "border-border text-primary-text"
                      : "border-border text-transparent"
                }`}
              >
                {otp[index] || ""}
              </div>
            )
          })}
        </div>

        {error ? <p className="mb-4 text-center text-[13px] font-semibold text-error">{error}</p> : null}

        <div className="mb-8 text-center">
          <button
            type="button"
            onClick={handleResend}
            disabled={timer > 0 || isLoading}
            className={`text-[14px] font-bold transition-opacity ${timer > 0 ? "text-primary" : "text-primary hover:opacity-80"}`}
          >
            {timer > 0 ? `Resend OTP in ${formatTime(timer)}` : "Resend OTP"}
          </button>
        </div>

        <div className="mb-6 flex items-center justify-center gap-3 px-4">
          <div className="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-full bg-[#EAF7ED] text-[#1E9E40]">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <p className="text-left text-[13px] font-semibold leading-[1.3] text-primary-text">
            Your data is safe and secure
            <br />
            with us.
          </p>
        </div>
      </div>
    </MobileAppShell>
  )
}
