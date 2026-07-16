"use client"

import * as React from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { AppContainer } from "@/components/ui/AppContainer"
import { PageHeader } from "@/components/ui/PageHeader"
import { ProgressStepper } from "@/components/ui/ProgressStepper"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ShieldCheck, UploadCloud, Check, ChevronDown, ArrowRight, ArrowLeft } from "lucide-react"

// Categories for B2C
const B2C_CATEGORIES = [
  "Real Estate & Rental",
  "Retail & Commerce",
  "Fitness & Sports waivers",
  "Freelancer & Service SLA",
  "Consulting Contracts"
]

function RegisterFormContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const moduleType = (searchParams.get("module") || "c2c").toLowerCase()

  // Form Sub-Page State (Page 1 vs Page 2 to keep screens small and above-the-fold)
  const [formPage, setFormPage] = React.useState<1 | 2>(1)

  // C2C Form States
  const [c2cName, setC2cName] = React.useState("")
  const [c2cMobile, setC2cMobile] = React.useState("")
  const [c2cEmail, setC2cEmail] = React.useState("")
  const [c2cAddress, setC2cAddress] = React.useState("")
  const [c2cAadhaar, setC2cAadhaar] = React.useState("")

  // B2B Form States
  const [b2bName, setB2bName] = React.useState("")
  const [b2bGst, setB2bGst] = React.useState("")
  const [b2bLogo, setB2bLogo] = React.useState("")
  const [b2bOwnerName, setB2bOwnerName] = React.useState("")
  const [b2bAddress, setB2bAddress] = React.useState("")
  const [b2bOwnerMobile, setB2bOwnerMobile] = React.useState("")
  const [b2bOwnerAadhaar, setB2bOwnerAadhaar] = React.useState("")

  // B2C Form States
  const [b2cName, setB2cName] = React.useState("")
  const [b2cGst, setB2cGst] = React.useState("")
  const [b2cCategory, setB2cCategory] = React.useState("")
  const [b2cLogo, setB2cLogo] = React.useState("")
  const [b2cOwnerName, setB2cOwnerName] = React.useState("")
  const [b2cAddress, setB2cAddress] = React.useState("")
  const [b2cOwnerMobile, setB2cOwnerMobile] = React.useState("")
  const [b2cOwnerAadhaar, setB2cOwnerAadhaar] = React.useState("")

  const [showCategoryMenu, setShowCategoryMenu] = React.useState(false)
  const [errors, setErrors] = React.useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = React.useState(false)

  React.useEffect(() => {
    const stored = typeof window !== "undefined" ? sessionStorage.getItem("user_mobile") : ""
    const initialMobile = stored || "9876543210"
    setC2cMobile(initialMobile)
    setB2bOwnerMobile(initialMobile)
    setB2cOwnerMobile(initialMobile)
  }, [])

  const handleNextPage = () => {
    const newErrors: Record<string, string> = {}
    if (moduleType === "b2b") {
      if (!b2bName.trim()) newErrors.b2bName = "Business Legal Name is required"
      if (b2bGst.trim().length !== 15) newErrors.b2bGst = "GSTIN must be exactly 15 alphanumeric characters"
      if (!b2bLogo) newErrors.b2bLogo = "Company logo is required"
    } else if (moduleType === "b2c") {
      if (!b2cName.trim()) newErrors.b2cName = "Merchant Brand Name is required"
      if (b2cGst.trim().length !== 15) newErrors.b2cGst = "GSTIN must be exactly 15 alphanumeric characters"
      if (!b2cCategory) newErrors.b2cCategory = "Business category is required"
      if (!b2cLogo) newErrors.b2cLogo = "Brand logo is required"
    } else {
      if (!c2cName.trim()) newErrors.c2cName = "Full Name is required"
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setErrors({})
    setFormPage(2)
  }

  const validateFinal = () => {
    const newErrors: Record<string, string> = {}
    if (moduleType === "b2b") {
      if (!b2bOwnerName.trim()) newErrors.b2bOwnerName = "Owner Name is required"
      if (!b2bAddress.trim()) newErrors.b2bAddress = "Business Address is required"
      if (b2bOwnerMobile.length !== 10) newErrors.b2bOwnerMobile = "Mobile must be 10 digits"
      if (b2bOwnerAadhaar.length !== 12) newErrors.b2bOwnerAadhaar = "Aadhaar must be 12 digits"
    } else if (moduleType === "b2c") {
      if (!b2cOwnerName.trim()) newErrors.b2cOwnerName = "Owner Name is required"
      if (!b2cAddress.trim()) newErrors.b2cAddress = "Store Address is required"
      if (b2cOwnerMobile.length !== 10) newErrors.b2cOwnerMobile = "Mobile must be 10 digits"
      if (b2cOwnerAadhaar.length !== 12) newErrors.b2cOwnerAadhaar = "Aadhaar must be 12 digits"
    } else {
      if (!c2cAddress.trim()) newErrors.c2cAddress = "Residential Address is required"
      if (c2cAadhaar.length !== 12) newErrors.c2cAadhaar = "Aadhaar must be 12 digits"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateFinal()) return
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      router.push(`/verify-identity?module=${moduleType}`)
    }, 1000)
  }

  const config = React.useMemo(() => {
    switch (moduleType) {
      case "b2b":
        return {
          title: "Business Registration",
          subheading: formPage === 1 ? "Enter details for your enterprise entity." : "Enter representative owner details."
        }
      case "b2c":
        return {
          title: "Merchant Registration",
          subheading: formPage === 1 ? "Enter brand and store properties." : "Enter merchant owner credentials."
        }
      case "c2c":
      default:
        return {
          title: "Individual Registration",
          subheading: formPage === 1 ? "Enter your basic contact details." : "Enter verification credentials."
        }
    }
  }, [moduleType, formPage])

  return (
    <AppContainer centered>
      {/* Branding Logo Block */}
      <div className="flex flex-col items-center justify-center space-y-1.5 mb-3">
        <div className="w-10 h-10 rounded-full bg-primary/8 flex items-center justify-center border border-primary/10 shadow-sm">
          <ShieldCheck strokeWidth={2.4} className="h-5.5 w-5.5 text-primary" />
        </div>
        <div className="flex flex-col items-center">
          <span className="text-[19px] font-display font-bold tracking-tight text-foreground leading-none">Trilok</span>
          <span className="text-[9.5px] font-bold tracking-widest uppercase text-secondary-text mt-1.5">Secure • Verified • Trusted</span>
        </div>
      </div>

      {/* Progress Stepper - Unifies onboarding wizard */}
      <ProgressStepper currentStep={0} totalSteps={5} className="mb-4" />

      <PageHeader title={config.title} subtitle={config.subheading} className="mb-4 text-center" />

      <form onSubmit={handleSubmit} className="flex flex-col flex-1">
        <AnimatePresence mode="wait">
          
          {/* ==========================================
              PAGE 1: BASIC INFO
          ========================================== */}
          {formPage === 1 && (
            <motion.div
              key="page-1"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="space-y-4 flex flex-col flex-1 justify-between"
            >
              <div className="space-y-3">
                {moduleType === "b2b" ? (
                  // B2B PAGE 1
                  <>
                    <Input
                      label="Business Legal Name"
                      type="text"
                      value={b2bName}
                      onChange={(e) => setB2bName(e.target.value)}
                      placeholder="e.g. Acme Corp"
                      required
                    />
                    {errors.b2bName && <p className="text-[11px] text-error font-bold">{errors.b2bName}</p>}

                    <Input
                      label="GSTIN (GST Number)"
                      type="text"
                      value={b2bGst}
                      onChange={(e) => setB2bGst(e.target.value.toUpperCase())}
                      placeholder="e.g. 27AAAAA1111A1Z1"
                      required
                    />
                    {errors.b2bGst && <p className="text-[11px] text-error font-bold">{errors.b2bGst}</p>}

                    <div className="space-y-2">
                      <label className="text-[13px] font-bold tracking-wide uppercase text-secondary-text">Business Logo</label>
                      <div 
                        onClick={() => setB2bLogo("enterprise_logo.png")}
                        className={`h-14 rounded-[12px] border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all duration-300 ${b2bLogo ? "border-primary bg-primary/[0.01]" : "border-border hover:border-primary/20"}`}
                      >
                        {b2bLogo ? (
                          <span className="flex items-center gap-1.5 text-primary text-[13px] font-bold"><Check className="w-4.5 h-4.5" strokeWidth={3} /> {b2bLogo}</span>
                        ) : (
                          <span className="flex items-center gap-1.5 text-secondary-text text-[12px] font-bold"><UploadCloud className="w-5 h-5" /> Click to upload logo</span>
                        )}
                      </div>
                      {errors.b2bLogo && <p className="text-[11px] text-error font-bold">{errors.b2bLogo}</p>}
                    </div>
                  </>
                ) : moduleType === "b2c" ? (
                  // B2C PAGE 1
                  <>
                    <Input
                      label="Merchant Brand Name"
                      type="text"
                      value={b2cName}
                      onChange={(e) => setB2cName(e.target.value)}
                      placeholder="e.g. Desert Retail"
                      required
                    />
                    {errors.b2cName && <p className="text-[11px] text-error font-bold">{errors.b2cName}</p>}

                    <Input
                      label="GSTIN (GST Number)"
                      type="text"
                      value={b2cGst}
                      onChange={(e) => setB2cGst(e.target.value.toUpperCase())}
                      placeholder="e.g. 27AAAAA1111A1Z1"
                      required
                    />
                    {errors.b2cGst && <p className="text-[11px] text-error font-bold">{errors.b2cGst}</p>}

                    <div className="space-y-2 relative">
                      <label className="text-[13px] font-bold tracking-wide uppercase text-secondary-text">Business Category</label>
                      <button
                        type="button"
                        onClick={() => setShowCategoryMenu(!showCategoryMenu)}
                        className="w-full h-13 px-4 rounded-[12px] border border-border bg-surface flex items-center justify-between font-medium text-[14px] text-foreground hover:border-primary/20 transition-all text-left"
                      >
                        <span>{b2cCategory || "Select commercial category"}</span>
                        <ChevronDown className="w-4.5 h-4.5 text-secondary-text" />
                      </button>
                      {showCategoryMenu && (
                        <div className="absolute top-[80px] left-0 right-0 z-30 bg-surface border border-border rounded-[12px] shadow-lg max-h-48 overflow-y-auto overflow-hidden divide-y divide-divider">
                          {B2C_CATEGORIES.map((cat) => (
                            <button
                              key={cat}
                              type="button"
                              onClick={() => {
                                setB2cCategory(cat)
                                setShowCategoryMenu(false)
                              }}
                              className="w-full px-4 py-3 text-left text-[13.5px] font-semibold text-foreground hover:bg-primary/5 transition-colors"
                            >
                              {cat}
                            </button>
                          ))}
                        </div>
                      )}
                      {errors.b2cCategory && <p className="text-[11px] text-error font-bold">{errors.b2cCategory}</p>}
                    </div>

                    <div className="space-y-2">
                      <label className="text-[13px] font-bold tracking-wide uppercase text-secondary-text">Brand Logo</label>
                      <div 
                        onClick={() => setB2cLogo("merchant_logo.png")}
                        className={`h-14 rounded-[12px] border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all duration-300 ${b2cLogo ? "border-primary bg-primary/[0.01]" : "border-border hover:border-primary/20"}`}
                      >
                        {b2cLogo ? (
                          <span className="flex items-center gap-1.5 text-primary text-[13px] font-bold"><Check className="w-4.5 h-4.5" strokeWidth={3} /> {b2cLogo}</span>
                        ) : (
                          <span className="flex items-center gap-1.5 text-secondary-text text-[12px] font-bold"><UploadCloud className="w-5 h-5" /> Click to upload logo</span>
                        )}
                      </div>
                      {errors.b2cLogo && <p className="text-[11px] text-error font-bold">{errors.b2cLogo}</p>}
                    </div>
                  </>
                ) : (
                  // C2C PAGE 1
                  <>
                    <Input
                      label="Full Name (As per Aadhaar)"
                      type="text"
                      value={c2cName}
                      onChange={(e) => setC2cName(e.target.value)}
                      placeholder="e.g. Nikhil Dachepalli"
                      required
                    />
                    {errors.c2cName && <p className="text-[11px] text-error font-bold">{errors.c2cName}</p>}

                    <Input
                      label="Mobile Number"
                      type="text"
                      value={`+91 ${c2cMobile}`}
                      readOnly
                      disabled
                      className="bg-[#F8F9FA] border-dashed cursor-not-allowed opacity-75"
                    />

                    <Input
                      label="Email Address (Optional)"
                      type="email"
                      value={c2cEmail}
                      onChange={(e) => setC2cEmail(e.target.value)}
                      placeholder="e.g. nikhil@example.com"
                    />
                  </>
                )}
              </div>

              <div className="mt-6">
                <Button type="button" onClick={handleNextPage} size="lg" className="w-full h-14 flex items-center justify-center gap-2">
                  Continue Onboarding
                  <ArrowRight className="w-4.5 h-4.5" />
                </Button>
              </div>
            </motion.div>
          )}

          {/* ==========================================
              PAGE 2: LEGAL INFO / VERIFICATION CREDENTIALS
          ========================================== */}
          {formPage === 2 && (
            <motion.div
              key="page-2"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="space-y-4 flex flex-col flex-1 justify-between"
            >
              <div className="space-y-4">
                {moduleType === "b2b" ? (
                  // B2B PAGE 2
                  <>
                    <Input
                      label="Authorized Representative Owner Name"
                      type="text"
                      value={b2bOwnerName}
                      onChange={(e) => setB2bOwnerName(e.target.value)}
                      placeholder="Owner / CFO full name"
                      required
                    />
                    {errors.b2bOwnerName && <p className="text-[11px] text-error font-bold">{errors.b2bOwnerName}</p>}

                    <div className="space-y-2">
                      <label className="text-[13px] font-bold tracking-wide uppercase text-secondary-text">Registered Company Address</label>
                      <textarea
                        value={b2bAddress}
                        onChange={(e) => setB2bAddress(e.target.value)}
                        placeholder="Company registered address"
                        required
                        rows={2}
                        className="w-full px-4 py-3 rounded-[12px] border border-border bg-surface text-[14px] focus:outline-none focus:border-primary transition-all duration-300 font-medium resize-none leading-relaxed"
                      />
                      {errors.b2bAddress && <p className="text-[11px] text-error font-bold">{errors.b2bAddress}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Input
                          label="Owner Mobile"
                          type="text"
                          inputMode="numeric"
                          value={b2bOwnerMobile}
                          onChange={(e) => setB2bOwnerMobile(e.target.value.replace(/\D/g, "").slice(0, 10))}
                          placeholder="10-digit mobile"
                          required
                        />
                        {errors.b2bOwnerMobile && <p className="text-[11px] text-error font-bold mt-1">{errors.b2bOwnerMobile}</p>}
                      </div>
                      <div>
                        <Input
                          label="Owner Aadhaar"
                          type="text"
                          inputMode="numeric"
                          value={b2bOwnerAadhaar}
                          onChange={(e) => setB2bOwnerAadhaar(e.target.value.replace(/\D/g, "").slice(0, 12))}
                          placeholder="12-digit Aadhaar"
                          required
                        />
                        {errors.b2bOwnerAadhaar && <p className="text-[11px] text-error font-bold mt-1">{errors.b2bOwnerAadhaar}</p>}
                      </div>
                    </div>
                  </>
                ) : moduleType === "b2c" ? (
                  // B2C PAGE 2
                  <>
                    <Input
                      label="Merchant Owner Full Name"
                      type="text"
                      value={b2cOwnerName}
                      onChange={(e) => setB2cOwnerName(e.target.value)}
                      placeholder="Enter representative owner name"
                      required
                    />
                    {errors.b2cOwnerName && <p className="text-[11px] text-error font-bold">{errors.b2cOwnerName}</p>}

                    <div className="space-y-2">
                      <label className="text-[13px] font-bold tracking-wide uppercase text-secondary-text">Store / Business Address</label>
                      <textarea
                        value={b2cAddress}
                        onChange={(e) => setB2cAddress(e.target.value)}
                        placeholder="Merchant registered address"
                        required
                        rows={2}
                        className="w-full px-4 py-3 rounded-[12px] border border-border bg-surface text-[14px] focus:outline-none focus:border-primary transition-all duration-300 font-medium resize-none leading-relaxed"
                      />
                      {errors.b2cAddress && <p className="text-[11px] text-error font-bold">{errors.b2cAddress}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Input
                          label="Owner Mobile"
                          type="text"
                          inputMode="numeric"
                          value={b2cOwnerMobile}
                          onChange={(e) => setB2cOwnerMobile(e.target.value.replace(/\D/g, "").slice(0, 10))}
                          placeholder="10-digit mobile"
                          required
                        />
                        {errors.b2cOwnerMobile && <p className="text-[11px] text-error font-bold mt-1">{errors.b2cOwnerMobile}</p>}
                      </div>
                      <div>
                        <Input
                          label="Owner Aadhaar"
                          type="text"
                          inputMode="numeric"
                          value={b2cOwnerAadhaar}
                          onChange={(e) => setB2cOwnerAadhaar(e.target.value.replace(/\D/g, "").slice(0, 12))}
                          placeholder="12-digit Aadhaar"
                          required
                        />
                        {errors.b2cOwnerAadhaar && <p className="text-[11px] text-error font-bold mt-1">{errors.b2cOwnerAadhaar}</p>}
                      </div>
                    </div>
                  </>
                ) : (
                  // C2C PAGE 2
                  <>
                    <div className="space-y-2">
                      <label className="text-[13px] font-bold tracking-wide uppercase text-secondary-text">Residential Address</label>
                      <textarea
                        value={c2cAddress}
                        onChange={(e) => setC2cAddress(e.target.value)}
                        placeholder="Enter full home address"
                        required
                        rows={3}
                        className="w-full px-4 py-3 rounded-[12px] border border-border bg-surface text-[14px] focus:outline-none focus:border-primary transition-all duration-300 font-medium resize-none leading-relaxed"
                      />
                      {errors.c2cAddress && <p className="text-[11px] text-error font-bold">{errors.c2cAddress}</p>}
                    </div>

                    <Input
                      label="Aadhaar Card Number"
                      type="text"
                      inputMode="numeric"
                      value={c2cAadhaar}
                      onChange={(e) => setC2cAadhaar(e.target.value.replace(/\D/g, "").slice(0, 12))}
                      placeholder="Enter 12-digit Aadhaar Number"
                      required
                    />
                    {errors.c2cAadhaar && <p className="text-[11px] text-error font-bold">{errors.c2cAadhaar}</p>}
                  </>
                )}
              </div>

              <div className="flex gap-3 mt-6">
                <Button type="button" variant="secondary" onClick={() => setFormPage(1)} className="h-14 px-5">
                  <ArrowLeft className="w-5 h-5 text-secondary-text" />
                </Button>
                <Button type="submit" loading={isLoading} size="lg" className="flex-1 h-14">
                  Complete Registration
                </Button>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </form>
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
