"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { User, Briefcase, Store, Check } from "lucide-react"
import { OnboardingLayout } from "@/components/ui/OnboardingLayout"
import { AppContainer } from "@/components/ui/AppContainer"
import { cn } from "@/lib/utils"

const SERVICES = [
  {
    id: "c2c",
    title: "C2C (Personal)",
    description: "Peer-to-peer agreement setup.",
    icon: User,
  },
  {
    id: "b2b",
    title: "B2B (Enterprise)",
    description: "Company-to-company contracts.",
    icon: Briefcase,
  },
  {
    id: "b2c",
    title: "B2C (Merchant)",
    description: "Business-to-customer waivers.",
    icon: Store,
  },
]

export default function SelectServicePage() {
  const router = useRouter()
  const [selectedId, setSelectedId] = React.useState<string | null>(null)

  const handleContinue = () => {
    if (!selectedId) return
    router.push(`/register?module=${selectedId}`)
  }

  const cardContent = (
    <div className="space-y-3">
      <p className="text-[13px] text-secondary-text font-medium text-center leading-relaxed mb-1">
        Select the configuration type that fits your workspace requirements.
      </p>

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
    </div>
  )

  return (
    <AppContainer centered>
      <OnboardingLayout
        title="Account Configuration"
        subtitle="Select your identity to personalize your digital agreement workspace."
        cardContent={cardContent}
        buttonText="Continue Setup"
        onButtonClick={handleContinue}
        isButtonDisabled={!selectedId}
        showBackButton
        onBackClick={() => router.push("/login")}
      />
    </AppContainer>
  )
}
