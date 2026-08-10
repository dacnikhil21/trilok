"use client"

import * as React from "react"
import { ProgressStepper, type StepIconItem } from "@/components/ui/ProgressStepper"
import { MobileAppShell } from "@/components/ui/MobileAppShell"
import { OnboardingHeader } from "@/components/layout/OnboardingHeader"
import { OnboardingFooter } from "@/components/layout/OnboardingFooter"

interface OnboardingLayoutProps {
  title: React.ReactNode
  subtitle?: React.ReactNode
  cardContent: React.ReactNode
  buttonText: string
  onButtonClick: () => void
  isButtonDisabled?: boolean
  isButtonLoading?: boolean
  bottomHelperText?: React.ReactNode
  showBackButton?: boolean
  onBackClick?: () => void
  stepperStep?: number
  stepperSteps?: (string | StepIconItem)[]
  moduleType?: "c2c" | "b2c"
  hideFooterButton?: boolean
  noCardWrapper?: boolean
}

export function OnboardingLayout({
  title,
  subtitle,
  cardContent,
  buttonText,
  onButtonClick,
  isButtonDisabled = false,
  isButtonLoading = false,
  bottomHelperText,
  onBackClick,
  stepperStep,
  stepperSteps,
  moduleType,
  hideFooterButton = false,
  noCardWrapper = false,
}: OnboardingLayoutProps) {
  return (
    <MobileAppShell
      header={<OnboardingHeader onBack={onBackClick} />}
      footer={
        hideFooterButton ? undefined : (
          <OnboardingFooter
            buttonText={buttonText}
            onButtonClick={onButtonClick}
            isButtonDisabled={isButtonDisabled}
            isButtonLoading={isButtonLoading}
            bottomHelperText={bottomHelperText}
          />
        )
      }
    >
      <div className="flex w-full flex-col space-y-3.5 pt-1">
        <div className="space-y-0.5 pt-0.5 text-center">
          <h1 className="text-[20px] font-extrabold leading-tight tracking-tight text-[#0F172A]">{title}</h1>
          {subtitle ? (
            <div className="mx-auto max-w-[320px] text-[12px] font-medium leading-snug text-slate-600">
              {subtitle}
            </div>
          ) : null}
        </div>

        {stepperStep !== undefined ? (
          <div className="w-full px-0.5 pt-0.5">
            <ProgressStepper
              currentStep={stepperStep}
              totalSteps={5}
              steps={stepperSteps}
              moduleType={moduleType}
            />
          </div>
        ) : null}

        {noCardWrapper ? (
          <div className="w-full">{cardContent}</div>
        ) : (
          <div className="w-full rounded-[20px] border border-slate-200/90 bg-white p-4 shadow-md sm:p-5">
            {cardContent}
          </div>
        )}
      </div>
    </MobileAppShell>
  )
}
