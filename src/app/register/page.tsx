"use client"

import * as React from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { AppContainer } from "@/components/ui/AppContainer"
import { PageHeader } from "@/components/ui/PageHeader"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ShieldCheck, UploadCloud, Check, ChevronDown } from "lucide-react"

// ==========================================
// C2C (INDIVIDUAL REGISTRATION FORM)
// ==========================================
interface FormProps {
  router: any
  moduleType: string
}

function C2CRegisterForm({ router, moduleType }: FormProps) {
  const [fullName, setFullName] = React.useState("")
  const [mobileNumber, setMobileNumber] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [address, setAddress] = React.useState("")
  const [aadhaar, setAadhaar] = React.useState("")
  const [errors, setErrors] = React.useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = React.useState(false)

  React.useEffect(() => {
    const stored = typeof window !== "undefined" ? sessionStorage.getItem("user_mobile") : ""
    setMobileNumber(stored || "9876543210")
  }, [])

  const validate = () => {
    const newErrors: Record<string, string> = {}
    if (!fullName.trim()) newErrors.fullName = "Full name is required"
    if (aadhaar.replace(/\s/g, "").length !== 12) {
      newErrors.aadhaar = "Aadhaar must be exactly 12 digits"
    }
    if (!address.trim()) newErrors.address = "Address is required"
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      router.push(`/verify-identity?module=${moduleType}`)
    }, 1000)
  }

  const handleAadhaarChange = (val: string) => {
    const clean = val.replace(/\D/g, "").slice(0, 12)
    setAadhaar(clean)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <Input
        label="Full Name (As per Aadhaar)"
        type="text"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        placeholder="Enter your full name"
        required
      />
      {errors.fullName && <p className="text-[11px] text-error font-bold">{errors.fullName}</p>}

      <Input
        label="Mobile Number"
        type="text"
        value={`+91 ${mobileNumber}`}
        readOnly
        disabled
        className="bg-[#F8F9FA] border-dashed cursor-not-allowed opacity-75"
      />

      <Input
        label="Email Address (Optional)"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email address"
      />

      <div className="space-y-2">
        <label className="text-[13px] font-bold tracking-wide uppercase text-secondary-text">Residential Address</label>
        <textarea
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Enter your full address"
          required
          rows={3}
          className="w-full px-4 py-3 rounded-[12px] border border-border bg-surface text-[14px] focus:outline-none focus:border-primary transition-all duration-300 font-medium resize-none leading-relaxed"
        />
        {errors.address && <p className="text-[11px] text-error font-bold">{errors.address}</p>}
      </div>

      <Input
        label="Aadhaar Card Number"
        type="text"
        inputMode="numeric"
        value={aadhaar}
        onChange={(e) => handleAadhaarChange(e.target.value)}
        placeholder="Enter 12-digit Aadhaar Number"
        required
      />
      {errors.aadhaar && <p className="text-[11px] text-error font-bold">{errors.aadhaar}</p>}

      <Button type="submit" loading={isLoading} size="lg" className="w-full h-14 mt-4">
        Register Individual
      </Button>
    </form>
  )
}

// ==========================================
// B2B (BUSINESS REGISTRATION FORM)
// ==========================================
function B2BRegisterForm({ router, moduleType }: FormProps) {
  const [businessName, setBusinessName] = React.useState("")
  const [gstNumber, setGstNumber] = React.useState("")
  const [ownerName, setOwnerName] = React.useState("")
  const [businessAddress, setBusinessAddress] = React.useState("")
  const [ownerMobile, setOwnerMobile] = React.useState("")
  const [ownerAadhaar, setOwnerAadhaar] = React.useState("")
  const [logoName, setLogoName] = React.useState("")
  const [errors, setErrors] = React.useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = React.useState(false)

  const validate = () => {
    const newErrors: Record<string, string> = {}
    if (!businessName.trim()) newErrors.businessName = "Business name is required"
    if (gstNumber.trim().length !== 15) {
      newErrors.gstNumber = "GSTIN must be exactly 15 alphanumeric characters"
    }
    if (!ownerName.trim()) newErrors.ownerName = "Owner name is required"
    if (!businessAddress.trim()) newErrors.businessAddress = "Business address is required"
    if (ownerMobile.length !== 10) newErrors.ownerMobile = "Owner mobile must be 10 digits"
    if (ownerAadhaar.length !== 12) newErrors.ownerAadhaar = "Owner Aadhaar must be 12 digits"
    if (!logoName) newErrors.logo = "Business logo is required"
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      router.push(`/verify-identity?module=${moduleType}`)
    }, 1000)
  }

  const handleSimulatedLogoUpload = () => {
    setLogoName("company_logo_stamp.png")
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <Input
        label="Business Legal Name"
        type="text"
        value={businessName}
        onChange={(e) => setBusinessName(e.target.value)}
        placeholder="Enter Business Name"
        required
      />
      {errors.businessName && <p className="text-[11px] text-error font-bold">{errors.businessName}</p>}

      <Input
        label="GSTIN (GST Number)"
        type="text"
        value={gstNumber}
        onChange={(e) => setGstNumber(e.target.value.toUpperCase())}
        placeholder="e.g. 27AAAAA1111A1Z1"
        required
      />
      {errors.gstNumber && <p className="text-[11px] text-error font-bold">{errors.gstNumber}</p>}

      {/* Business Logo simulated Drag-Drop */}
      <div className="space-y-2">
        <label className="text-[13px] font-bold tracking-wide uppercase text-secondary-text">Business Logo</label>
        <div 
          onClick={handleSimulatedLogoUpload}
          className={`h-24 rounded-[12px] border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all duration-300 ${logoName ? "border-primary/40 bg-primary/[0.01]" : "border-border hover:border-primary/20"}`}
        >
          {logoName ? (
            <div className="flex items-center gap-2 text-primary text-[13.5px] font-bold">
              <Check className="w-5 h-5" strokeWidth={3} />
              {logoName}
            </div>
          ) : (
            <div className="flex flex-col items-center gap-1 text-secondary-text">
              <UploadCloud className="w-6 h-6 text-secondary-text" />
              <span className="text-[12px] font-semibold">Click to upload brand logo</span>
            </div>
          )}
        </div>
        {errors.logo && <p className="text-[11px] text-error font-bold">{errors.logo}</p>}
      </div>

      <Input
        label="Authorized Representative / Owner Name"
        type="text"
        value={ownerName}
        onChange={(e) => setOwnerName(e.target.value)}
        placeholder="Enter representative's full name"
        required
      />
      {errors.ownerName && <p className="text-[11px] text-error font-bold">{errors.ownerName}</p>}

      <div className="space-y-2">
        <label className="text-[13px] font-bold tracking-wide uppercase text-secondary-text">Business Address</label>
        <textarea
          value={businessAddress}
          onChange={(e) => setBusinessAddress(e.target.value)}
          placeholder="Enter company registered address"
          required
          rows={2}
          className="w-full px-4 py-3 rounded-[12px] border border-border bg-surface text-[14px] focus:outline-none focus:border-primary transition-all duration-300 font-medium resize-none leading-relaxed"
        />
        {errors.businessAddress && <p className="text-[11px] text-error font-bold">{errors.businessAddress}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Input
            label="Owner Mobile"
            type="text"
            inputMode="numeric"
            value={ownerMobile}
            onChange={(e) => setOwnerMobile(e.target.value.replace(/\D/g, "").slice(0, 10))}
            placeholder="10-digit number"
            required
          />
          {errors.ownerMobile && <p className="text-[11px] text-error font-bold mt-1">{errors.ownerMobile}</p>}
        </div>
        <div>
          <Input
            label="Owner Aadhaar"
            type="text"
            inputMode="numeric"
            value={ownerAadhaar}
            onChange={(e) => setOwnerAadhaar(e.target.value.replace(/\D/g, "").slice(0, 12))}
            placeholder="12-digit Aadhaar"
            required
          />
          {errors.ownerAadhaar && <p className="text-[11px] text-error font-bold mt-1">{errors.ownerAadhaar}</p>}
        </div>
      </div>

      <Button type="submit" loading={isLoading} size="lg" className="w-full h-14 mt-4">
        Register Business (B2B)
      </Button>
    </form>
  )
}

// ==========================================
// B2C (COMMERCIAL MERCHANT REGISTRATION FORM)
// ==========================================
const B2C_CATEGORIES = [
  "Real Estate & Rental",
  "Retail & Commerce",
  "Fitness & Sports waivers",
  "Freelancer & Service SLA",
  "Consulting Contracts"
]

function B2CRegisterForm({ router, moduleType }: FormProps) {
  const [businessName, setBusinessName] = React.useState("")
  const [gstNumber, setGstNumber] = React.useState("")
  const [category, setCategory] = React.useState("")
  const [businessAddress, setBusinessAddress] = React.useState("")
  const [ownerName, setOwnerName] = React.useState("")
  const [ownerMobile, setOwnerMobile] = React.useState("")
  const [ownerAadhaar, setOwnerAadhaar] = React.useState("")
  const [logoName, setLogoName] = React.useState("")
  const [showCategoryMenu, setShowCategoryMenu] = React.useState(false)
  const [errors, setErrors] = React.useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = React.useState(false)

  const validate = () => {
    const newErrors: Record<string, string> = {}
    if (!businessName.trim()) newErrors.businessName = "Business name is required"
    if (gstNumber.trim().length !== 15) {
      newErrors.gstNumber = "GSTIN must be exactly 15 alphanumeric characters"
    }
    if (!category) newErrors.category = "Business category is required"
    if (!businessAddress.trim()) newErrors.businessAddress = "Business address is required"
    if (!ownerName.trim()) newErrors.ownerName = "Owner name is required"
    if (ownerMobile.length !== 10) newErrors.ownerMobile = "Owner mobile must be 10 digits"
    if (ownerAadhaar.length !== 12) newErrors.ownerAadhaar = "Owner Aadhaar must be 12 digits"
    if (!logoName) newErrors.logo = "Business logo is required"
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      router.push(`/verify-identity?module=${moduleType}`)
    }, 1000)
  }

  const handleSimulatedLogoUpload = () => {
    setLogoName("merchant_brand_logo.png")
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <Input
        label="Merchant Brand / Shop Name"
        type="text"
        value={businessName}
        onChange={(e) => setBusinessName(e.target.value)}
        placeholder="Enter Brand Name"
        required
      />
      {errors.businessName && <p className="text-[11px] text-error font-bold">{errors.businessName}</p>}

      <Input
        label="GSTIN (GST Number)"
        type="text"
        value={gstNumber}
        onChange={(e) => setGstNumber(e.target.value.toUpperCase())}
        placeholder="e.g. 27AAAAA1111A1Z1"
        required
      />
      {errors.gstNumber && <p className="text-[11px] text-error font-bold">{errors.gstNumber}</p>}

      {/* Business Category Custom Dropdown Selector */}
      <div className="space-y-2 relative">
        <label className="text-[13px] font-bold tracking-wide uppercase text-secondary-text">Business Category</label>
        <button
          type="button"
          onClick={() => setShowCategoryMenu(!showCategoryMenu)}
          className="w-full h-13 px-4 rounded-[12px] border border-border bg-surface flex items-center justify-between font-medium text-[14px] text-foreground hover:border-primary/20 transition-all text-left"
        >
          <span>{category || "Select commercial category"}</span>
          <ChevronDown className={`w-4.5 h-4.5 text-secondary-text transition-transform ${showCategoryMenu ? "rotate-180" : ""}`} />
        </button>
        {showCategoryMenu && (
          <div className="absolute top-[80px] left-0 right-0 z-30 bg-surface border border-border rounded-[12px] shadow-lg max-h-48 overflow-y-auto overflow-hidden divide-y divide-divider">
            {B2C_CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => {
                  setCategory(cat)
                  setShowCategoryMenu(false)
                }}
                className="w-full px-4 py-3 text-left text-[13.5px] font-semibold text-foreground hover:bg-primary/5 transition-colors"
              >
                {cat}
              </button>
            ))}
          </div>
        )}
        {errors.category && <p className="text-[11px] text-error font-bold">{errors.category}</p>}
      </div>

      {/* Business Logo simulated Drag-Drop */}
      <div className="space-y-2">
        <label className="text-[13px] font-bold tracking-wide uppercase text-secondary-text">Brand Logo</label>
        <div 
          onClick={handleSimulatedLogoUpload}
          className={`h-24 rounded-[12px] border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all duration-300 ${logoName ? "border-primary/40 bg-primary/[0.01]" : "border-border hover:border-primary/20"}`}
        >
          {logoName ? (
            <div className="flex items-center gap-2 text-primary text-[13.5px] font-bold">
              <Check className="w-5 h-5" strokeWidth={3} />
              {logoName}
            </div>
          ) : (
            <div className="flex flex-col items-center gap-1 text-secondary-text">
              <UploadCloud className="w-6 h-6 text-secondary-text" />
              <span className="text-[12px] font-semibold">Click to upload merchant logo</span>
            </div>
          )}
        </div>
        {errors.logo && <p className="text-[11px] text-error font-bold">{errors.logo}</p>}
      </div>

      <div className="space-y-2">
        <label className="text-[13px] font-bold tracking-wide uppercase text-secondary-text">Store / Business Address</label>
        <textarea
          value={businessAddress}
          onChange={(e) => setBusinessAddress(e.target.value)}
          placeholder="Enter retail registered address"
          required
          rows={2}
          className="w-full px-4 py-3 rounded-[12px] border border-border bg-surface text-[14px] focus:outline-none focus:border-primary transition-all duration-300 font-medium resize-none leading-relaxed"
        />
        {errors.businessAddress && <p className="text-[11px] text-error font-bold">{errors.businessAddress}</p>}
      </div>

      <Input
        label="Merchant Owner Full Name"
        type="text"
        value={ownerName}
        onChange={(e) => setOwnerName(e.target.value)}
        placeholder="Enter owner's full name"
        required
      />
      {errors.ownerName && <p className="text-[11px] text-error font-bold">{errors.ownerName}</p>}

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Input
            label="Owner Mobile"
            type="text"
            inputMode="numeric"
            value={ownerMobile}
            onChange={(e) => setOwnerMobile(e.target.value.replace(/\D/g, "").slice(0, 10))}
            placeholder="10-digit mobile"
            required
          />
          {errors.ownerMobile && <p className="text-[11px] text-error font-bold mt-1">{errors.ownerMobile}</p>}
        </div>
        <div>
          <Input
            label="Owner Aadhaar"
            type="text"
            inputMode="numeric"
            value={ownerAadhaar}
            onChange={(e) => setOwnerAadhaar(e.target.value.replace(/\D/g, "").slice(0, 12))}
            placeholder="12-digit Aadhaar"
            required
          />
          {errors.ownerAadhaar && <p className="text-[11px] text-error font-bold mt-1">{errors.ownerAadhaar}</p>}
        </div>
      </div>

      <Button type="submit" loading={isLoading} size="lg" className="w-full h-14 mt-4">
        Register Merchant (B2C)
      </Button>
    </form>
  )
}

// ==========================================
// CORE LAYOUT MANAGER
// ==========================================
function RegisterFormContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const moduleType = (searchParams.get("module") || "c2c").toLowerCase()

  const config = React.useMemo(() => {
    switch (moduleType) {
      case "b2b":
        return {
          title: "Business Registration",
          subheading: "Register your corporate enterprise entity on Trilok."
        }
      case "b2c":
        return {
          title: "Merchant Registration",
          subheading: "Register your commercial merchant brand shop on Trilok."
        }
      case "c2c":
      default:
        return {
          title: "Individual Registration",
          subheading: "Register your personal identity for secure covenants."
        }
    }
  }, [moduleType])

  return (
    <AppContainer centered>
      {/* Dynamic branding banner logo */}
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

      <PageHeader title={config.title} subtitle={config.subheading} className="mb-6 text-center" />

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col flex-1"
      >
        {moduleType === "b2b" && <B2BRegisterForm router={router} moduleType={moduleType} />}
        {moduleType === "b2c" && <B2CRegisterForm router={router} moduleType={moduleType} />}
        {moduleType !== "b2b" && moduleType !== "b2c" && <C2CRegisterForm router={router} moduleType={moduleType} />}
      </motion.div>
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
