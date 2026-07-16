"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { OnboardingLayout } from "@/components/ui/OnboardingLayout"
import { AppContainer } from "@/components/ui/AppContainer"
import { Input } from "@/components/ui/input"

export default function LoginPage() {
  const router = useRouter()
  const [mobile, setMobile] = React.useState("")
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState("")

  const handleMobileChange = (val: string) => {
    const clean = val.replace(/\D/g, "").slice(0, 10)
    setMobile(clean)
    setError("")
  }

  const handleSubmit = () => {
    const isValid = /^[6-9]\d{9}$/.test(mobile)
    if (!isValid) {
      setError("Please enter a valid 10-digit Indian mobile number.")
      return
    }

    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      // Save mobile to session for downstream usage
      sessionStorage.setItem("user_mobile", mobile)
      router.push("/otp")
    }, 1200)
  }

  const isButtonDisabled = mobile.length !== 10

  const cardContent = (
    <div className="space-y-4">
      <p className="text-[13px] text-secondary-text font-medium text-center leading-relaxed">
        Verify your identity securely with our OTP authorization.
      </p>
      <Input
        label="Mobile Number"
        type="tel"
        inputMode="numeric"
        prefixNode="+91"
        value={mobile}
        onChange={(e) => handleMobileChange(e.target.value)}
        placeholder=""
        required
      />
      {error && (
        <p className="text-[11.5px] text-error font-semibold text-center">{error}</p>
      )}
    </div>
  )

  return (
    <AppContainer centered>
      <OnboardingLayout
        title="Welcome back"
        subtitle="Enter your mobile number to access your secure digital agreements."
        cardContent={cardContent}
        buttonText="Continue"
        onButtonClick={handleSubmit}
        isButtonDisabled={isButtonDisabled}
        isButtonLoading={isLoading}
        bottomHelperText={
          <span className="text-[12.5px] text-secondary-text/80">
            By continuing, you agree to our <button className="font-semibold text-foreground underline hover:text-primary">Terms</button> & <button className="font-semibold text-foreground underline hover:text-primary">Privacy Policy</button>
          </span>
        }
      />
    </AppContainer>
  )
}
