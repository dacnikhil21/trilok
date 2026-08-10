"use client"

import * as React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { AppShell } from "@/components/layout/AppShell"
import {
  AgreementCategoryIntro,
  AgreementCategoryPicker,
  AgreementFlowHeader,
  AgreementTypePicker,
} from "@/components/agreement/AgreementFlowScreens"
import {
  type AgreementType,
  findCategory,
  getCategoriesForType,
  getTypeTitle,
} from "@/lib/c2c-config"
import { RoleSelectionStep } from "@/components/agreement/RoleSelectionStep"
import { ProductDetailsStep } from "@/components/agreement/ProductDetailsStep"
import { PaymentDeliveryStep } from "@/components/agreement/PaymentDeliveryStep"
import { BuyerReviewStep } from "@/components/agreement/BuyerReviewStep"
import { WhatsAppInviteStep } from "@/components/agreement/WhatsAppInviteStep"
import { WaitingForResponseStep } from "@/components/agreement/WaitingForResponseStep"
import { AcceptanceSuccessStep } from "@/components/agreement/AcceptanceSuccessStep"
import { ReviewSignStep } from "@/components/agreement/ReviewSignStep"
import { PaymentStep } from "@/components/agreement/PaymentStep"
import { FinalAgreementNote } from "@/components/agreement/FinalAgreementNote"
import { DeveloperSettingsModal } from "@/components/ui/DeveloperSettingsModal"

export type AgreementData = {
  role: "buyer" | "seller" | null
  customerMobile: string
  customerName: string
  aadhaarNumber: string
  otp: string
  category: string
  productName: string
  brand: string
  model: string
  quantity: string
  buyerMobile: string
  buyerName: string
  buyerAadhaar: string
  buyerOtp: string
  saleAmount: string
  paymentMethod: string
  advancePaid: string
  balance: string
  deliveryDate: string
  deliveryLocation: string
  serialNumber: string
  warranty: string
  condition: string
  description: string
  productPhotos: string[]
  returnPolicy: string
  warrantyTerms: string
  additionalClauses: string
  paymentTerms: string
  creatorSelfie: string
  invitedPartySelfie: string
  creatorLocation: string
  invitedPartyLocation: string
  dpdpConsent: boolean
  eSignStatus: string
  invitedPartyName: string
  invitedPartyMobile: string
  invitedPartyAadhaar: string
  invitedPartyOtp: string
}

type FlowPhase = "type" | "category" | "intro" | "wizard"

const INITIAL_FORM: AgreementData = {
  role: null,
  customerMobile: "",
  customerName: "",
  aadhaarNumber: "",
  otp: "",
  category: "",
  productName: "",
  brand: "",
  model: "",
  quantity: "",
  buyerMobile: "",
  buyerName: "",
  buyerAadhaar: "",
  buyerOtp: "",
  saleAmount: "",
  paymentMethod: "",
  advancePaid: "",
  balance: "",
  deliveryDate: "",
  deliveryLocation: "",
  serialNumber: "",
  warranty: "",
  condition: "",
  description: "",
  productPhotos: [],
  returnPolicy: "",
  warrantyTerms: "",
  additionalClauses: "",
  paymentTerms: "",
  creatorSelfie: "",
  invitedPartySelfie: "",
  creatorLocation: "",
  invitedPartyLocation: "",
  dpdpConsent: false,
  eSignStatus: "",
  invitedPartyName: "",
  invitedPartyMobile: "",
  invitedPartyAadhaar: "",
  invitedPartyOtp: "",
}

function CreateAgreementContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const moduleType = searchParams.get("module") || "c2c"
  const typeParam = searchParams.get("type") as AgreementType | null
  const categoryParam = searchParams.get("category")

  const [phase, setPhase] = React.useState<FlowPhase>(() => {
    if (categoryParam && typeParam) return "intro"
    if (typeParam) return "category"
    return "type"
  })
  const [agreementType, setAgreementType] = React.useState<AgreementType | null>(typeParam)
  const [categoryId, setCategoryId] = React.useState<string | null>(categoryParam)
  const [currentStep, setCurrentStep] = React.useState(1)
  const [formData, setFormData] = React.useState<AgreementData>(INITIAL_FORM)

  const updateData = (updates: Partial<AgreementData>) => {
    setFormData((prev) => ({ ...prev, ...updates }))
  }

  const nextStep = () => setCurrentStep((prev) => prev + 1)
  const prevStep = () => setCurrentStep((prev) => Math.max(1, prev - 1))

  const selectedCategory =
    agreementType && categoryId ? findCategory(agreementType, categoryId) : undefined

  const handleBack = () => {
    if (phase === "wizard") {
      if (currentStep === 1) {
        setPhase("intro")
      } else if (currentStep < 10) {
        prevStep()
      }
      return
    }
    if (phase === "intro") {
      setPhase("category")
      return
    }
    if (phase === "category") {
      if (agreementType) {
        setAgreementType(null)
        setCategoryId(null)
        setPhase("type")
        router.replace(`/create-agreement?module=${moduleType}`)
      } else {
        router.push(`/dashboard?module=${moduleType}`)
      }
      return
    }
    router.push(`/dashboard?module=${moduleType}`)
  }

  const startWizard = () => {
    if (selectedCategory) {
      updateData({ category: selectedCategory.title })
    }
    setCurrentStep(1)
    setPhase("wizard")
  }

  const wizardSteps = [
    { id: 1, title: "Select Your Role", component: <RoleSelectionStep data={formData} updateData={updateData} onNext={nextStep} /> },
    { id: 2, title: "Product Details", component: <ProductDetailsStep data={formData} updateData={updateData} onNext={() => {}} /> },
    { id: 3, title: "Terms & Conditions", component: <PaymentDeliveryStep data={formData} updateData={updateData} onNext={nextStep} /> },
    { id: 4, title: "Agreement Review", component: <BuyerReviewStep data={formData} onNext={nextStep} /> },
    { id: 5, title: "Other Party Details", component: <WhatsAppInviteStep data={formData} updateData={updateData} onNext={nextStep} /> },
    { id: 6, title: "Waiting For Response", component: <WaitingForResponseStep onNext={nextStep} /> },
    { id: 7, title: "Acceptance Success", component: <AcceptanceSuccessStep data={formData} onNext={nextStep} /> },
    { id: 8, title: "Final Review", component: <ReviewSignStep data={formData} updateData={updateData} onNext={nextStep} /> },
    { id: 9, title: "Agreement Fee", component: <PaymentStep data={formData} onNext={nextStep} /> },
    { id: 10, title: "", component: <FinalAgreementNote data={formData} onHome={() => router.push(`/dashboard?module=${moduleType}`)} /> },
  ]

  const currentStepData = wizardSteps.find((s) => s.id === currentStep)

  const headerTitle =
    phase === "category" && agreementType
      ? getTypeTitle(agreementType)
      : phase === "intro" && selectedCategory
        ? selectedCategory.title
        : phase === "wizard" && currentStep < 10
          ? currentStepData?.title ?? "Create Agreement"
          : "Create Agreement"

  const showColoredHeader = phase !== "wizard" || currentStep < 10
  const headerType = agreementType ?? "sale"

  return (
    <>
      <AppShell
        backgroundClassName="bg-white"
        header={
          showColoredHeader ? (
            phase === "wizard" ? (
              <div className="border-b border-[#E2E8F0] bg-white px-4">
                <div className="flex h-[52px] items-center gap-2">
                  <button type="button" onClick={handleBack} className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                  </button>
                  <h1 className="truncate text-[16px] font-extrabold text-[#0F172A]">{headerTitle}</h1>
                </div>
              </div>
            ) : (
              <AgreementFlowHeader type={headerType} title={headerTitle} onBack={handleBack} />
            )
          ) : undefined
        }
        contentClassName={phase === "wizard" ? "px-4 py-3" : "p-0"}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={`${phase}-${currentStep}-${categoryId}`}
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -12 }}
            transition={{ duration: 0.2 }}
            className="w-full"
          >
            {phase === "type" && (
              <AgreementTypePicker
                onSelect={(type) => {
                  setAgreementType(type)
                  setPhase("category")
                  router.replace(`/create-agreement?module=${moduleType}&type=${type}`)
                }}
              />
            )}
            {phase === "category" && agreementType && (
              <AgreementCategoryPicker
                type={agreementType}
                categories={getCategoriesForType(agreementType)}
                onSelect={(id) => {
                  setCategoryId(id)
                  setPhase("intro")
                  router.replace(`/create-agreement?module=${moduleType}&type=${agreementType}&category=${id}`)
                }}
              />
            )}
            {phase === "intro" && agreementType && selectedCategory && (
              <AgreementCategoryIntro type={agreementType} category={selectedCategory} onCreate={startWizard} />
            )}
            {phase === "wizard" && currentStepData?.component}
          </motion.div>
        </AnimatePresence>
      </AppShell>
      <DeveloperSettingsModal />
    </>
  )
}

export default function CreateAgreementPage() {
  return (
    <React.Suspense
      fallback={
        <div className="mobile-app-shell flex items-center justify-center bg-[#FBFBFA]">
          <span className="h-8 w-8 animate-spin rounded-full border-4 border-[#0033A0] border-t-transparent" />
        </div>
      }
    >
      <CreateAgreementContent />
    </React.Suspense>
  )
}
