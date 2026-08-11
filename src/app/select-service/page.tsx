"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { User, Store, Check } from "lucide-react"
import { OnboardingLayout } from "@/components/ui/OnboardingLayout"
import { cn } from "@/lib/utils"

const SERVICES = [
  {
    id: "c2c",
    title: "C2C (Individuals)",
    description: "Buy or sell between individuals.",
    icon: User,
  },
  {
    id: "b2c",
    title: "B2C: (Shops/Business)",
    description: "Buy or sell for shop, store, or business.",
    icon: Store,
  },
]

export default function SelectServicePage() {
  const router = useRouter()
  const [selectedId, setSelectedId] = React.useState<string | null>(null)
  const [isLoading, setIsLoading] = React.useState(false)

  const handleContinue = () => {
    if (!selectedId || isLoading) return

    const path = `/register?module=${selectedId}`
    setIsLoading(true)
    router.push(path)

    window.setTimeout(() => {
      if (!window.location.pathname.startsWith("/register")) {
        window.location.assign(path)
        return
      }
      setIsLoading(false)
    }, 1200)
  }

  const cardContent = (
    <div className="space-y-4">
      <div className="flex flex-col gap-2.5">
        {SERVICES.map((srv) => {
          const Icon = srv.icon
          const isSelected = selectedId === srv.id

          return (
            <button
              key={srv.id}
              onClick={() => setSelectedId(srv.id)}
              className={cn(
                "w-full text-left p-3.5 rounded-[14px] border transition-all duration-200 flex items-center justify-between outline-none",
                isSelected
                  ? "border-primary bg-primary/5 text-primary shadow-[0_2px_12px_rgba(10,92,54,0.06)]"
                  : "border-border bg-surface text-foreground hover:border-primary/20"
              )}
            >
              <div className="flex items-center gap-3">
                <div className={cn(
                  "w-9 h-9 rounded-xl flex items-center justify-center border",
                  isSelected ? "bg-primary/10 border-primary/20 text-primary" : "bg-divider border-border text-secondary-text"
                )}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-[14.5px] leading-tight">{srv.title}</h3>
                  <p className="text-[11.5px] text-secondary-text mt-0.5 font-medium">{srv.description}</p>
                </div>
              </div>

              {isSelected && (
                <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                  <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
                </div>
              )}
            </button>
          )
        })}
      </div>

      {/* Trust & Security Banner */}
      <div className="mt-2 text-center px-3 py-2.5 rounded-xl bg-primary/5 border border-primary/10 flex items-center justify-center gap-1.5 text-[11.5px] sm:text-[12px] font-semibold text-primary">
        <span>🔒</span>
        <span>Aadhaar eKYC & eSign</span>
        <span className="opacity-40">•</span>
        <span>Secure Digital Agreements</span>
        <span className="opacity-40">•</span>
        <span>Privacy Protected</span>
      </div>
    </div>
  )

  return (
    <OnboardingLayout
        title="Account Configuration"
        subtitle="Select your identity to personalize your digital agreement workspace."
        cardContent={cardContent}
        buttonText={isLoading ? "Proceeding..." : "Continue Setup"}
        onButtonClick={handleContinue}
        isButtonDisabled={!selectedId || isLoading}
        isButtonLoading={isLoading}
        showBackButton
        onBackClick={() => router.push("/login")}
    />
  )
}
