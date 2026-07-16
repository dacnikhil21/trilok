import { useState, useCallback } from "react"
import { useRouter } from "next/navigation"

export function useLogin() {
  const router = useRouter()
  const [mobileNumber, setMobileNumber] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  // Validate Indian mobile number (exactly 10 digits, usually starting with 6-9)
  const isValidMobile = /^[6-9]\d{9}$/.test(mobileNumber)

  const handleMobileChange = useCallback((value: string) => {
    // Only allow digits, max 10
    const formatted = value.replace(/\D/g, "").slice(0, 10)
    setMobileNumber(formatted)
  }, [])

  const submitLogin = useCallback(async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isValidMobile) return

    setIsLoading(true)
    
    // Simulate API verification delay
    setTimeout(() => {
      setIsLoading(false)
      router.push("/otp")
    }, 1200)
  }, [isValidMobile, router])

  return {
    mobileNumber,
    isLoading,
    isValidMobile,
    handleMobileChange,
    submitLogin
  }
}
