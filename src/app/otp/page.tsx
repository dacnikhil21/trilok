"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { AppContainer } from "@/components/ui/AppContainer"
import { Button } from "@/components/ui/button"

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
      router.push("/select-service")
    }, 1200)
  }

  const handleNumpadClick = (key: string) => {
    if (key === "backspace") {
      setOtp(prev => prev.slice(0, -1))
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
    const m = Math.floor(seconds / 60).toString().padStart(2, '0')
    const s = (seconds % 60).toString().padStart(2, '0')
    return `${m}:${s}`
  }

  const numpadKeys = [
    "1", "2", "3",
    "4", "5", "6",
    "7", "8", "9",
    "", "0", "backspace"
  ]

  return (
    <AppContainer centered>
      <div className="w-full flex flex-col h-full bg-surface pt-4 pb-2">
        
        {/* Header */}
        <div className="text-center mt-2 mb-8">
          <h1 className="text-[26px] font-bold text-primary mb-2 tracking-tight">Verify OTP</h1>
          <p className="text-[14px] text-secondary-text font-medium">Enter the 6-digit OTP sent to</p>
          <p className="text-[16px] font-bold text-primary mt-1">{mobile}</p>
        </div>

        {/* OTP Boxes */}
        <div className="flex justify-between gap-2 mb-6 px-4">
          {[0, 1, 2, 3, 4, 5].map((index) => {
            const isActive = otp.length === index
            return (
              <div
                key={index}
                className={`w-[48px] h-[56px] flex items-center justify-center rounded-[12px] border text-[24px] font-bold ${
                  isActive 
                    ? 'border-primary text-primary shadow-sm' 
                    : otp[index] 
                      ? 'border-border text-primary-text' 
                      : 'border-border text-transparent'
                }`}
              >
                {otp[index] || ""}
              </div>
            )
          })}
        </div>

        {error && (
          <p className="text-[13px] text-error font-semibold text-center mb-4">{error}</p>
        )}

        {/* Resend Timer */}
        <div className="text-center mb-8">
          <button
            onClick={handleResend}
            disabled={timer > 0}
            className={`text-[14px] font-bold transition-opacity ${timer > 0 ? 'text-primary' : 'text-primary hover:opacity-80'}`}
          >
            {timer > 0 ? `Resend OTP in ${formatTime(timer)}` : "Resend OTP"}
          </button>
        </div>

        {/* Trust Note */}
        <div className="flex items-center justify-center gap-3 mb-6 px-4">
          <div className="w-[34px] h-[34px] rounded-full bg-[#EAF7ED] flex items-center justify-center text-[#1E9E40] shrink-0">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
          </div>
          <p className="text-[13px] text-primary-text font-semibold text-left leading-[1.3]">
            Your data is safe and secure<br/>with us.
          </p>
        </div>

        <div className="flex-1" />

        {/* Custom Numpad */}
        <div className="grid grid-cols-3 gap-x-4 gap-y-3 px-2">
          {numpadKeys.map((key, index) => (
            <div key={index} className="flex justify-center h-[56px]">
              {key === "" ? null : key === "backspace" ? (
                <button
                  onClick={() => handleNumpadClick(key)}
                  className="w-full max-w-[90px] h-full rounded-[14px] bg-[#F7F9FB] flex items-center justify-center text-primary-text shadow-sm active:scale-95 transition-transform"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 4H8l-7 8 7 8h13a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z"/><line x1="18" y1="9" x2="12" y2="15"/><line x1="12" y1="9" x2="18" y2="15"/></svg>
                </button>
              ) : (
                <button
                  onClick={() => handleNumpadClick(key)}
                  className="w-full max-w-[90px] h-full rounded-[14px] bg-[#F7F9FB] flex items-center justify-center text-[24px] font-bold text-primary-text shadow-sm active:scale-95 transition-transform"
                >
                  {key}
                </button>
              )}
            </div>
          ))}
        </div>
        
      </div>
    </AppContainer>
  )
}
