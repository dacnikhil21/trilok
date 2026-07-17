"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { AppContainer } from "@/components/ui/AppContainer"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

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
      <div className="w-full flex flex-col h-full bg-surface">
        
        {/* Header */}
        <div className="text-center mt-2 mb-6">
          <h1 className="text-[26px] font-bold text-primary mb-1.5 tracking-tight">Welcome Back!</h1>
          <p className="text-[14px] text-secondary-text font-medium">Login or Register to continue</p>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-divider mb-8 px-4">
          <button 
            className={`flex-1 pb-3 text-[16px] font-bold transition-all ${activeTab === 'login' ? 'text-primary border-b-[2.5px] border-primary' : 'text-secondary-text font-semibold hover:text-foreground'}`}
            onClick={() => setActiveTab('login')}
          >
            Login
          </button>
          <button 
            className={`flex-1 pb-3 text-[16px] font-bold transition-all ${activeTab === 'register' ? 'text-primary border-b-[2.5px] border-primary' : 'text-secondary-text font-semibold hover:text-foreground'}`}
            onClick={() => setActiveTab('register')}
          >
            Register
          </button>
        </div>

        {/* Input */}
        <div className="mb-6 px-1">
          <Input
            label="Mobile Number"
            type="tel"
            inputMode="numeric"
            prefixNode="+91"
            value={mobile}
            onChange={(e) => handleMobileChange(e.target.value)}
            placeholder="2345678909"
            error={error}
          />
        </div>

        {/* Action Button */}
        <div className="px-1 mb-10">
          <Button 
            className="w-full rounded-[14px] h-[52px] text-[16px] font-semibold tracking-wide shadow-none" 
            onClick={handleSubmit} 
            disabled={isButtonDisabled}
            loading={isLoading}
          >
            Send OTP
          </Button>
        </div>

        {/* Divider */}
        <div className="relative flex items-center justify-center mb-8 px-8">
          <div className="absolute inset-0 flex items-center px-8">
            <div className="w-full border-t border-divider/60"></div>
          </div>
          <div className="relative bg-surface px-4 text-[13px] text-secondary-text font-medium">
            or continue with
          </div>
        </div>

        {/* Social Logins */}
        <div className="flex gap-4 mb-10 px-1">
          <button className="flex-1 h-[52px] flex items-center justify-center gap-2.5 border border-divider/60 rounded-[14px] text-[15px] font-bold text-primary hover:bg-gray-50 transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Google
          </button>
          <button className="flex-1 h-[52px] flex items-center justify-center gap-2.5 border border-divider/60 rounded-[14px] text-[15px] font-bold text-primary hover:bg-gray-50 transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.88-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51h-.57c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.576-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.98 1.005-3.648-.235-.373a9.86 9.86 0 01-1.51-5.26c0-5.445 4.433-9.879 9.882-9.879 2.64 0 5.122 1.029 6.988 2.895A9.825 9.825 0 0121.93 11.91c0 5.442-4.433 9.875-9.879 9.875M19.39 4.606A11.759 11.759 0 0012.053 1.15C5.58 1.15.312 6.417.31 12.89c0 2.071.542 4.09 1.576 5.87L0 25l6.402-1.677a11.8 11.8 0 005.648 1.43h.005c6.47 0 11.737-5.267 11.739-11.74a11.755 11.755 0 00-3.404-8.407" fill="#25D366"/>
            </svg>
            WhatsApp
          </button>
        </div>

        <div className="flex-1" />

        {/* Trust Badges */}
        <div className="flex justify-between items-start w-full px-0.5 mt-auto pb-5">
          
          <div className="flex flex-col items-center flex-1 px-0.5">
            <div className="mb-1 h-[36px] flex items-center justify-center">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                <path d="M12 21.5c-4-2-7.5-6-7.5-11V6l7.5-2.5L19.5 6v4.5c0 5-3.5 9-7.5 11z" stroke="#0033A0" strokeWidth="2" strokeLinejoin="round"/>
                <circle cx="12" cy="10" r="1.8" fill="#1E9E40"/>
                <path d="M8.5 16.5c0-1.8 1.5-3.2 3.5-3.2s3.5 1.4 3.5 3.2v.3H8.5v-.3z" fill="#1E9E40"/>
              </svg>
            </div>
            <span className="text-[12px] font-medium text-[#041B4A] text-center leading-[1.25] tracking-tight">Secure<br/>Login</span>
          </div>
          
          <div className="w-[1px] h-9 bg-[#E0E5EB] mt-2 mx-0.5 opacity-80"></div>
          
          <div className="flex flex-col items-center flex-1 px-0.5">
            <div className="mb-1 h-[36px] flex items-center justify-center">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                {/* Sun Rays */}
                <g fill="#0033A0">
                  <polygon points="11.3,4 12,1.5 12.7,4" transform="rotate(-80 12 12)" />
                  <polygon points="11.3,4 12,1.5 12.7,4" transform="rotate(-53 12 12)" />
                  <polygon points="11.3,4 12,1.5 12.7,4" transform="rotate(-26 12 12)" />
                  <polygon points="11.3,4 12,1.5 12.7,4" />
                  <polygon points="11.3,4 12,1.5 12.7,4" transform="rotate(26 12 12)" />
                  <polygon points="11.3,4 12,1.5 12.7,4" transform="rotate(53 12 12)" />
                  <polygon points="11.3,4 12,1.5 12.7,4" transform="rotate(80 12 12)" />
                </g>
                {/* Fingerprint Arches */}
                <path d="M12 20.5v-1" stroke="#0033A0" strokeWidth="1.8" strokeLinecap="round"/>
                <path d="M9.5 20.5V19a2.5 2.5 0 0 1 5 0v1.5" stroke="#0033A0" strokeWidth="1.8" strokeLinecap="round"/>
                <path d="M7 20.5V18a5 5 0 0 1 10 0v2.5" stroke="#0033A0" strokeWidth="1.8" strokeLinecap="round"/>
                <path d="M4.5 20.5V16.5a7.5 7.5 0 0 1 15 0v4" stroke="#0033A0" strokeWidth="1.8" strokeLinecap="round"/>
              </svg>
            </div>
            <span className="text-[12px] font-medium text-[#041B4A] text-center leading-[1.25] tracking-tight">Aadhaar<br/>eKYC</span>
          </div>
          
          <div className="w-[1px] h-9 bg-[#E0E5EB] mt-2 mx-0.5 opacity-80"></div>
          
          <div className="flex flex-col items-center flex-1 px-0.5">
            <div className="mb-1 h-[36px] flex items-center justify-center">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                <path d="M12 21.5c-4-2-7.5-6-7.5-11V6l7.5-2.5L19.5 6v4.5c0 5-3.5 9-7.5 11z" stroke="#0033A0" strokeWidth="2" strokeLinejoin="round"/>
                <rect x="9.5" y="7.5" width="5" height="7" rx="0.5" stroke="#0033A0" strokeWidth="1.3"/>
                <rect x="10.5" y="9.5" width="3" height="3" stroke="#0033A0" strokeWidth="1"/>
                <path d="M11.2 11l0.6 0.6 1.2-1.2" stroke="#0033A0" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="text-[12px] font-medium text-[#041B4A] text-center leading-[1.25] tracking-tight">DPDP Act<br/>Compliant</span>
          </div>
          
          <div className="w-[1px] h-9 bg-[#E0E5EB] mt-2 mx-0.5 opacity-80"></div>
          
          <div className="flex flex-col items-center flex-1 px-0.5">
            <div className="mb-1 h-[36px] flex items-center justify-center">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                <rect x="7" y="11" width="10" height="8" rx="1.5" stroke="#0033A0" strokeWidth="2"/>
                <path d="M9 11V7.5a3 3 0 0 1 6 0V11" stroke="#0033A0" strokeWidth="2" strokeLinecap="round"/>
                <path d="M12 14v2" stroke="#0033A0" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <span className="text-[12px] font-medium text-[#041B4A] text-center leading-[1.25] tracking-tight">End-to-End<br/>Encrypted</span>
          </div>
          
        </div>
      </div>
    </AppContainer>
  )
}
