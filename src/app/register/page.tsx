"use client"

import * as React from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { AuthLayout } from "@/components/layout/AuthLayout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

function RegisterForm() {
  const searchParams = useSearchParams()
  const router = useRouter()
  
  const moduleType = (searchParams.get("module") || "c2c").toLowerCase()
  
  // Adapt configuration based on module
  const config = React.useMemo(() => {
    switch (moduleType) {
      case "b2b":
        return {
          title: "Business Registration",
          subheading: "Register your business entity to construct professional enterprise agreements.",
          nameLabel: "Company / Authorized Signatory Name",
          namePlaceholder: "e.g. Acme Corp / Jane Doe",
        }
      case "b2c":
        return {
          title: "Seller Registration",
          subheading: "Set up your commercial vendor profile to generate buyer agreements.",
          nameLabel: "Merchant / Brand Name",
          namePlaceholder: "e.g. Desert Oasis Retail / John Smith",
        }
      case "c2c":
      default:
        return {
          title: "Individual Registration",
          subheading: "Create your personal profile to construct secure peer-to-peer agreements.",
          nameLabel: "Full Name (As per Aadhaar)",
          namePlaceholder: "e.g. Aarav Sharma",
        }
    }
  }, [moduleType])

  // Form states
  const [name, setName] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [address, setAddress] = React.useState("")
  const [mobileNumber, setMobileNumber] = React.useState("")
  const [isLoading, setIsLoading] = React.useState(false)

  React.useEffect(() => {
    // Read the mobile number stored during login or use a fallback
    const stored = typeof window !== "undefined" ? sessionStorage.getItem("user_mobile") : ""
    setMobileNumber(stored || "9876543210")
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !address) return

    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      router.push(`/verify-identity?module=${moduleType}`)
    }, 1000)
  }

  return (
    <AuthLayout heading={config.title} subheading={config.subheading}>
      <form onSubmit={handleSubmit} className="flex flex-col flex-1">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <Input
            label={config.nameLabel}
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={config.namePlaceholder}
            required
            autoFocus
          />

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
            placeholder="e.g. name@domain.com"
          />

          <Input
            label="Current Address"
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="e.g. Flat 402, Green Glen Layout, Bengaluru"
            required
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="mt-auto pt-10 flex flex-col gap-6 lg:mt-12"
        >
          <Button
            type="submit"
            size="lg"
            className="w-full h-14 text-[16px]"
            loading={isLoading}
            disabled={!name || !address}
          >
            Continue
          </Button>
        </motion.div>
      </form>
    </AuthLayout>
  )
}

export default function RegisterPage() {
  return (
    <React.Suspense fallback={
      <div className="flex min-h-screen items-center justify-center bg-background">
        <span className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    }>
      <RegisterForm />
    </React.Suspense>
  )
}
