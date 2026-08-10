"use client"

import * as React from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { OnboardingLayout } from "@/components/ui/OnboardingLayout"
import { CheckCircle2 } from "lucide-react"

function VerificationSuccessForm() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const moduleType = (searchParams.get("module") || "c2c").toLowerCase()

  const handleContinue = () => {
    router.push(`/dashboard?module=${moduleType}`)
  }

  const cardContent = (
    <div className="space-y-4 py-2 text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-primary/20 bg-verified shadow-sm">
        <CheckCircle2 strokeWidth={2.4} className="h-9 w-9 animate-pulse text-primary" />
      </div>

      <div className="space-y-1">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#EAF7EE] px-3.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-[#1A8A3C]">
          Verified Account
        </span>
        <p className="mx-auto max-w-xs pt-2 text-[13px] font-medium leading-relaxed text-secondary-text">
          Your identity has been verified. You can now create and eSign agreements securely.
        </p>
      </div>
    </div>
  )

  return (
    <OnboardingLayout
      title="Identity Verified"
      subtitle="Verification Success"
      cardContent={cardContent}
      buttonText="Continue to Dashboard"
      onButtonClick={handleContinue}
    />
  )
}

export default function VerificationSuccessPage() {
  return (
    <React.Suspense
      fallback={
        <div className="mobile-app-shell flex items-center justify-center bg-background">
          <span className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        </div>
      }
    >
      <VerificationSuccessForm />
    </React.Suspense>
  )
}
