"use client"

import * as React from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { AppContainer } from "@/components/ui/AppContainer"
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
    <div className="space-y-4 text-center py-2">
      <div className="mx-auto w-16 h-16 rounded-full bg-verified flex items-center justify-center border border-primary/20 shadow-sm">
        <CheckCircle2 strokeWidth={2.4} className="w-9 h-9 text-primary animate-pulse" />
      </div>

      <div className="space-y-1">
        <span className="inline-flex items-center gap-1.5 px-3.5 py-0.5 rounded-full bg-[#EAF7EE] text-[#1A8A3C] text-[11px] font-bold uppercase tracking-wider">
          Verified Account
        </span>
        <p className="text-[13px] text-secondary-text font-medium leading-relaxed max-w-xs mx-auto pt-2">
          Institutional-grade eKYC validation complete. Your cryptographic signature authority is fully active on the network.
        </p>
      </div>

      <div className="p-4 bg-[#FBFBFA] border border-border/40 rounded-[14px] text-left space-y-2.5 text-[12.5px] font-semibold text-secondary-text">
        <div className="flex justify-between border-b border-divider pb-2.5">
          <span>Security Protocol</span>
          <span className="text-foreground text-[11px] px-2 py-0.5 bg-[#EAF7EE] text-[#1A8A3C] rounded-full">AES-256</span>
        </div>
        <div className="flex justify-between">
          <span>Signature Authority</span>
          <span className="text-foreground text-success flex items-center gap-1 text-[12px]"><span className="w-1.5 h-1.5 rounded-full bg-success" /> Active</span>
        </div>
      </div>
    </div>
  )

  return (
    <AppContainer centered>
      <OnboardingLayout
        title="Identity Verified"
        subtitle="Verification Success"
        cardContent={cardContent}
        buttonText="Continue to Dashboard"
        onButtonClick={handleContinue}
      />
    </AppContainer>
  )
}

export default function VerificationSuccessPage() {
  return (
    <React.Suspense fallback={
      <div className="flex min-h-screen items-center justify-center bg-background">
        <span className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    }>
      <VerificationSuccessForm />
    </React.Suspense>
  )
}
