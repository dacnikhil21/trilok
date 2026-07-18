"use client"

import * as React from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { AppContainer } from "@/components/ui/AppContainer"
import { OnboardingLayout } from "@/components/ui/OnboardingLayout"
import { Input } from "@/components/ui/input"
import { ProgressStepper } from "@/components/ui/ProgressStepper"
import { UploadCloud, Check, ChevronDown, ArrowRight, MapPin } from "lucide-react"

const B2C_CATEGORIES = [
  "Real Estate & Rental",
  "Retail & Commerce",
  "Fitness & Sports waivers",
  "Freelancer & Service SLA",
  "Consulting Contracts"
]

const B2B_TYPES = [
  "Proprietorship",
  "Partnership Firm",
  "Private Limited Company",
  "Public Limited Company"
]

function RegisterFormContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const moduleType = (searchParams.get("module") || "c2c").toLowerCase() as "c2c" | "b2b" | "b2c"

  const [formPage, setFormPage] = React.useState<1 | 2>(1)

  // C2C Form States
  const [c2cName, setC2cName] = React.useState("")
  const [c2cMobile, setC2cMobile] = React.useState("")
  const [c2cEmail, setC2cEmail] = React.useState("")
  const [c2cAddress, setC2cAddress] = React.useState("")

  // B2B Form States
  const [b2bName, setB2bName] = React.useState("")
  const [b2bGst, setB2bGst] = React.useState("")
  const [b2bPan, setB2bPan] = React.useState("")
  const [b2bType, setB2bType] = React.useState("")
  const [b2bSignatory, setB2bSignatory] = React.useState("")
  const [b2bEmail, setB2bEmail] = React.useState("")
  const [b2bMobile, setB2bMobile] = React.useState("")
  const [b2bAddress, setB2bAddress] = React.useState("")
  const [b2bLogo, setB2bLogo] = React.useState("")

  // B2C Form States
  const [b2cName, setB2cName] = React.useState("")
  const [b2cGst, setB2cGst] = React.useState("")
  const [b2cCategory, setB2cCategory] = React.useState("")
  const [b2cLogo, setB2cLogo] = React.useState("")
  const [b2cOwnerName, setB2cOwnerName] = React.useState("")
  const [b2cMobile, setB2cMobile] = React.useState("")
  const [b2cEmail, setB2cEmail] = React.useState("")
  const [b2cAddress, setB2cAddress] = React.useState("")

  // Dropdown states
  const [showCategoryMenu, setShowCategoryMenu] = React.useState(false)
  const [showTypeMenu, setShowTypeMenu] = React.useState(false)
  const [errors, setErrors] = React.useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = React.useState(false)

  React.useEffect(() => {
    const stored = typeof window !== "undefined" ? sessionStorage.getItem("user_mobile") : ""
    const initialMobile = stored || ""
    setC2cMobile(initialMobile)
    setB2bMobile(initialMobile)
    setB2cMobile(initialMobile)
  }, [])

  const handleNextPage = () => {
    setErrors({})
    setFormPage(2)
  }

  const validateFinal = () => {
    setErrors({})
    return true
  }

  const handleSubmit = () => {
    if (formPage === 1) {
      handleNextPage()
      return
    }
    


    if (!validateFinal()) return
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      router.push(`/verify-identity?module=${moduleType}`)
    }, 1200)
  }

  const config = React.useMemo(() => {
    const label = moduleType === "b2b" ? "Business" : moduleType === "b2c" ? "Merchant" : "Personal"
    return {
      title: `${label} Registration`,
      subheading: formPage === 1 ? "Step 1: Enter entity credentials" : "Step 2: Enter contact details"
    }
  }, [moduleType, formPage])

  // CONTENT FOR PAGE 1
  const renderPage1 = () => {
    if (moduleType === "b2b") {
      return (
        <div className="space-y-4">
          <Input
            label="Company Name"
            type="text"
            value={b2bName}
            onChange={(e) => { setB2bName(e.target.value); delete errors.b2bName; }}
            error={errors.b2bName}
            required
          />
          <Input
            label="GSTIN (GST Number)"
            type="text"
            value={b2bGst}
            onChange={(e) => { setB2bGst(e.target.value.toUpperCase()); delete errors.b2bGst; }}
            placeholder="15-digit GSTIN"
            error={errors.b2bGst}
            required
          />
          <Input
            label="Company PAN"
            type="text"
            value={b2bPan}
            onChange={(e) => { setB2bPan(e.target.value.toUpperCase()); delete errors.b2bPan; }}
            placeholder="10-digit PAN"
            error={errors.b2bPan}
            required
          />
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowTypeMenu(!showTypeMenu)}
              className="w-full h-[56px] px-4 rounded-[16px] border border-border bg-surface flex items-center justify-between font-semibold text-[14.5px] text-foreground hover:border-primary/20 transition-all text-left"
            >
              <span>{b2bType || "Business Entity Type"}</span>
              <ChevronDown className="w-4.5 h-4.5 text-secondary-text" />
            </button>
            {showTypeMenu && (
              <div className="absolute top-[60px] left-0 right-0 z-30 bg-surface border border-border rounded-[16px] shadow-lg max-h-48 overflow-y-auto overflow-hidden divide-y divide-divider">
                {B2B_TYPES.map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => { setB2bType(type); setShowTypeMenu(false); delete errors.b2bType; }}
                    className="w-full px-4 py-3 text-left text-[13.5px] font-semibold text-foreground hover:bg-primary/5 transition-colors"
                  >
                    {type}
                  </button>
                ))}
              </div>
            )}
            {errors.b2bType && <p className="text-[11.5px] text-error font-bold mt-1.5 pl-1">{errors.b2bType}</p>}
          </div>
        </div>
      )
    }

    if (moduleType === "b2c") {
      return (
        <div className="space-y-4">
          <Input
            label="Business / Merchant Name"
            type="text"
            value={b2cName}
            onChange={(e) => { setB2cName(e.target.value); delete errors.b2cName; }}
            error={errors.b2cName}
            required
          />
          <Input
            label="GSTIN"
            type="text"
            value={b2cGst}
            onChange={(e) => { setB2cGst(e.target.value.toUpperCase()); delete errors.b2cGst; }}
            placeholder="15-digit GSTIN"
            error={errors.b2cGst}
            required
          />
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowCategoryMenu(!showCategoryMenu)}
              className="w-full h-[56px] px-4 rounded-[16px] border border-border bg-surface flex items-center justify-between font-semibold text-[14.5px] text-foreground hover:border-primary/20 transition-all text-left"
            >
              <span>{b2cCategory || "Business Category"}</span>
              <ChevronDown className="w-4.5 h-4.5 text-secondary-text" />
            </button>
            {showCategoryMenu && (
              <div className="absolute top-[60px] left-0 right-0 z-30 bg-surface border border-border rounded-[16px] shadow-lg max-h-48 overflow-y-auto overflow-hidden divide-y divide-divider">
                {B2C_CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => { setB2cCategory(cat); setShowCategoryMenu(false); delete errors.b2cCategory; }}
                    className="w-full px-4 py-3 text-left text-[13.5px] font-semibold text-foreground hover:bg-primary/5 transition-colors"
                  >
                    {cat}
                  </button>
                ))}
              </div>
            )}
            {errors.b2cCategory && <p className="text-[11.5px] text-error font-bold mt-1.5 pl-1">{errors.b2cCategory}</p>}
          </div>
        </div>
      )
    }

    // Default C2C Page 1
    return (
      <div className="space-y-4 relative">
        <Input
          label="Full Name (As per Aadhaar)"
          type="text"
          value={c2cName}
          onChange={(e) => { setC2cName(e.target.value); delete errors.c2cName; }}
          error={errors.c2cName}
          required
        />
        <Input
          label="Mobile Number"
          type="tel"
          prefixNode="+91"
          value={c2cMobile}
          onChange={(e) => { setC2cMobile(e.target.value.replace(/\D/g, "").slice(0, 10)); delete errors.c2cMobile; }}
          error={errors.c2cMobile}
          required
        />
        <div className="relative">
          <Input
            label="Email Address (Optional)"
            type="email"
            value={c2cEmail}
            onChange={(e) => { setC2cEmail(e.target.value); delete errors.c2cEmail; }}
            error={errors.c2cEmail}
          />
          {/* Sparkles Autofill Button */}
          <button 
            type="button"
            className="absolute -right-2 -bottom-4 w-12 h-12 bg-[#F0F4FA] rounded-full flex items-center justify-center text-primary shadow-sm border border-primary/10 hover:bg-primary/10 active:scale-95 transition-all z-10"
            onClick={() => {
              setC2cName("Ramesh Kumar Sharma");
              setC2cEmail("ramesh.kumar@example.com");
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z"/><path d="M19 3v4"/><path d="M21 5h-4"/></svg>
          </button>
        </div>
      </div>
    )
  }

  // CONTENT FOR PAGE 2
  const renderPage2 = () => {
    if (moduleType === "b2b") {
      return (
        <div className="space-y-4">
          <Input
            label="Authorized Signatory Name"
            type="text"
            value={b2bSignatory}
            onChange={(e) => { setB2bSignatory(e.target.value); delete errors.b2bSignatory; }}
            error={errors.b2bSignatory}
            required
          />
          <Input
            label="Official Email"
            type="email"
            value={b2bEmail}
            onChange={(e) => { setB2bEmail(e.target.value); delete errors.b2bEmail; }}
            error={errors.b2bEmail}
            required
          />
          <Input
            label="Official Mobile"
            type="tel"
            prefixNode="+91"
            value={b2bMobile}
            onChange={(e) => { setB2bMobile(e.target.value.replace(/\D/g, "").slice(0, 10)); delete errors.b2bMobile; }}
            error={errors.b2bMobile}
            required
          />
          <Input
            label="Company Address"
            type="text"
            value={b2bAddress}
            onChange={(e) => { setB2bAddress(e.target.value); delete errors.b2bAddress; }}
            error={errors.b2bAddress}
            required
          />
          <div className="space-y-2">
            <span className="text-[12px] text-secondary-text font-bold uppercase tracking-wider pl-1">Company Logo / Seal</span>
            <div
              onClick={() => { setB2bLogo("seal_stamp_authorized.png"); delete errors.b2bLogo; }}
              className={`h-[56px] rounded-[16px] border border-dashed flex flex-col items-center justify-center cursor-pointer transition-all duration-200 ${b2bLogo ? "border-primary bg-primary/[0.01]" : "border-border hover:border-primary/20"}`}
            >
              {b2bLogo ? (
                <span className="flex items-center gap-1.5 text-primary text-[13px] font-bold"><Check className="w-4 h-4" strokeWidth={3} /> {b2bLogo}</span>
              ) : (
                <span className="flex items-center gap-1.5 text-secondary-text text-[12.5px] font-bold"><UploadCloud className="w-4.5 h-4.5" /> Tap to upload logo/seal</span>
              )}
            </div>
            {errors.b2bLogo && <p className="text-[11.5px] text-error font-bold pl-1">{errors.b2bLogo}</p>}
          </div>
        </div>
      )
    }

    if (moduleType === "b2c") {
      return (
        <div className="space-y-4">
          <Input
            label="Merchant Owner Name"
            type="text"
            value={b2cOwnerName}
            onChange={(e) => { setB2cOwnerName(e.target.value); delete errors.b2cOwnerName; }}
            error={errors.b2cOwnerName}
            required
          />
          <Input
            label="Official Email"
            type="email"
            value={b2cEmail}
            onChange={(e) => { setB2cEmail(e.target.value); delete errors.b2cEmail; }}
            error={errors.b2cEmail}
            required
          />
          <Input
            label="Official Mobile"
            type="tel"
            prefixNode="+91"
            value={b2cMobile}
            onChange={(e) => { setB2cMobile(e.target.value.replace(/\D/g, "").slice(0, 10)); delete errors.b2cMobile; }}
            error={errors.b2cMobile}
            required
          />
          <Input
            label="Business Address"
            type="text"
            value={b2cAddress}
            onChange={(e) => { setB2cAddress(e.target.value); delete errors.b2cAddress; }}
            error={errors.b2cAddress}
            required
          />
          <div className="space-y-2">
            <span className="text-[12px] text-secondary-text font-bold uppercase tracking-wider pl-1">Brand Logo / Signature</span>
            <div
              onClick={() => { setB2cLogo("merchant_logo_sign.png"); delete errors.b2cLogo; }}
              className={`h-[56px] rounded-[16px] border border-dashed flex flex-col items-center justify-center cursor-pointer transition-all duration-200 ${b2cLogo ? "border-primary bg-primary/[0.01]" : "border-border hover:border-primary/20"}`}
            >
              {b2cLogo ? (
                <span className="flex items-center gap-1.5 text-primary text-[13px] font-bold"><Check className="w-4 h-4" strokeWidth={3} /> {b2cLogo}</span>
              ) : (
                <span className="flex items-center gap-1.5 text-secondary-text text-[12.5px] font-bold"><UploadCloud className="w-4.5 h-4.5" /> Tap to upload brand logo</span>
              )}
            </div>
            {errors.b2cLogo && <p className="text-[11.5px] text-error font-bold pl-1">{errors.b2cLogo}</p>}
          </div>
        </div>
      )
    }

    // Default C2C Page 2
    return (
      <div className="space-y-4">
        <Input
          label="Residential Address"
          type="text"
          value={c2cAddress}
          onChange={(e) => { setC2cAddress(e.target.value); delete errors.c2cAddress; }}
          placeholder="Building, street, pincode, state"
          error={errors.c2cAddress}
          required
        />
        <p className="text-[12.5px] text-secondary-text/80 font-medium leading-relaxed px-1">
          Make sure your address matches your government identification registers for automated validation.
        </p>
      </div>
    )
  }



  return (
    <AppContainer centered>
      <OnboardingLayout
        title={config.title}
        subtitle={config.subheading}
        cardContent={formPage === 1 ? renderPage1() : renderPage2()}
        buttonText={formPage === 1 ? "Continue" : "Complete Setup"}
        onButtonClick={handleSubmit}
        isButtonLoading={isLoading}
        showBackButton
        stepperStep={formPage - 1}
        onBackClick={() => {
          if (formPage === 2) {
            setFormPage(1)
          } else {
            router.push("/select-service")
          }
        }}
      />
    </AppContainer>
  )
}

export default function RegisterPage() {
  return (
    <React.Suspense fallback={
      <div className="flex min-h-screen items-center justify-center bg-background">
        <span className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    }>
      <RegisterFormContent />
    </React.Suspense>
  )
}
