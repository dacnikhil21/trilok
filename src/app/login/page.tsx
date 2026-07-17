"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { AppContainer } from "@/components/ui/AppContainer"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function LoginPage() {
  const router = useRouter()
  const [mobile, setMobile] = React.useState("")
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState("")
  const [activeTab, setActiveTab] = React.useState<"login" | "register">("login")

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
      sessionStorage.setItem("user_mobile", mobile)
      router.push("/otp")
    }, 1200)
  }

  const isButtonDisabled = mobile.length !== 10

  return (
    <AppContainer centered>
      <div className="w-full max-w-md mx-auto px-6 py-8 flex flex-col min-h-screen bg-surface">
        
        {/* Header */}
        <div className="text-center mt-8 mb-8">
          <h1 className="text-[28px] font-bold text-primary-text mb-2">Welcome Back!</h1>
          <p className="text-[15px] text-secondary-text">Login or Register to continue</p>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-divider mb-8">
          <button 
            className={`flex-1 pb-3 text-[16px] font-semibold transition-all ${activeTab === 'login' ? 'text-primary border-b-2 border-primary' : 'text-secondary-text'}`}
            onClick={() => setActiveTab('login')}
          >
            Login
          </button>
          <button 
            className={`flex-1 pb-3 text-[16px] font-semibold transition-all ${activeTab === 'register' ? 'text-primary border-b-2 border-primary' : 'text-secondary-text'}`}
            onClick={() => setActiveTab('register')}
          >
            Register
          </button>
        </div>

        {/* Input */}
        <div className="mb-6">
          <Input
            label="Mobile Number"
            type="tel"
            inputMode="numeric"
            prefixNode="+91"
            value={mobile}
            onChange={(e) => handleMobileChange(e.target.value)}
            placeholder="98765 43210"
            error={error}
          />
        </div>

        {/* Action Button */}
        <Button 
          className="w-full mb-8" 
          onClick={handleSubmit} 
          disabled={isButtonDisabled}
          loading={isLoading}
        >
          Send OTP
        </Button>

        {/* Divider */}
        <div className="relative flex items-center justify-center mb-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-divider"></div>
          </div>
          <div className="relative bg-surface px-4 text-[14px] text-secondary-text font-medium">
            or continue with
          </div>
        </div>

        {/* Social Logins */}
        <div className="flex gap-4 mb-12">
          <button className="flex-1 h-[56px] flex items-center justify-center gap-2 border border-border rounded-[12px] text-[15px] font-semibold text-primary-text hover:bg-gray-50 transition-colors">
            {/* Simple colored G for Google */}
            <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Google
          </button>
          <button className="flex-1 h-[56px] flex items-center justify-center gap-2 border border-border rounded-[12px] text-[15px] font-semibold text-primary-text hover:bg-gray-50 transition-colors">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.88-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51h-.57c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.576-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.98 1.005-3.648-.235-.373a9.86 9.86 0 01-1.51-5.26c0-5.445 4.433-9.879 9.882-9.879 2.64 0 5.122 1.029 6.988 2.895A9.825 9.825 0 0121.93 11.91c0 5.442-4.433 9.875-9.879 9.875M19.39 4.606A11.759 11.759 0 0012.053 1.15C5.58 1.15.312 6.417.31 12.89c0 2.071.542 4.09 1.576 5.87L0 25l6.402-1.677a11.8 11.8 0 005.648 1.43h.005c6.47 0 11.737-5.267 11.739-11.74a11.755 11.755 0 00-3.404-8.407" fill="#25D366"/>
            </svg>
            WhatsApp
          </button>
        </div>

        {/* Trust Badges */}
        <div className="flex justify-between items-center px-2 mb-12">
          <div className="flex flex-col items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M12 8v4"/><path d="M12 16h.01"/></svg>
            </div>
            <span className="text-[11px] font-semibold text-primary-text text-center w-16">Secure<br/>Login</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2a10 10 0 0 0-10 10 10 10 0 0 0 10 10 10 10 0 0 0 10-10A10 10 0 0 0 12 2z"/><path d="M12 6v6l4 2"/></svg>
            </div>
            <span className="text-[11px] font-semibold text-primary-text text-center w-16">Aadhaar<br/>eKYC</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><path d="M16 13H8"/><path d="M16 17H8"/><path d="M10 9H8"/></svg>
            </div>
            <span className="text-[11px] font-semibold text-primary-text text-center w-20">DPDP Act<br/>Compliant</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            </div>
            <span className="text-[11px] font-semibold text-primary-text text-center w-16">End-to-End<br/>Encrypted</span>
          </div>
        </div>

        <div className="flex-1" />

        {/* Footer */}
        <div className="text-center pb-6">
          <p className="text-[13px] text-secondary-text mb-1">By continuing, you agree to our</p>
          <div className="text-[13px] font-semibold text-primary">
            Terms of Service & Privacy Policy
          </div>
        </div>
        
      </div>
    </AppContainer>
  )
}
