"use client"

import * as React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft } from "lucide-react"
import { AppContainer } from "@/components/ui/AppContainer"

// Import steps
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
}

function CreateAgreementContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const moduleType = searchParams.get("module") || "c2c"
  
  const [currentStep, setCurrentStep] = React.useState(1)
  const [formData, setFormData] = React.useState<AgreementData>({
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
    eSignStatus: ""
  })

  const updateData = (updates: Partial<AgreementData>) => {
    setFormData(prev => ({ ...prev, ...updates }))
  }

  const nextStep = () => setCurrentStep(prev => prev + 1)
  const prevStep = () => setCurrentStep(prev => Math.max(1, prev - 1))

  const handleBack = () => {
    if (currentStep === 1) {
      router.push(`/dashboard?module=${moduleType}`)
    } else if (currentStep < 10) {
      prevStep()
    }
  }

  const steps = [
    { id: 1, title: "Select Your Role", component: <RoleSelectionStep data={formData} updateData={updateData} onNext={nextStep} /> },
    { id: 2, title: "Product Details", component: <ProductDetailsStep data={formData} updateData={updateData} onNext={nextStep} /> },
    { id: 3, title: "Terms & Conditions", component: <PaymentDeliveryStep data={formData} updateData={updateData} onNext={nextStep} /> },
    { id: 4, title: "Agreement Review", component: <BuyerReviewStep data={formData} onNext={nextStep} /> },
    { id: 5, title: "Other Party Details", component: <WhatsAppInviteStep data={formData} updateData={updateData} onNext={nextStep} /> },
    { id: 6, title: "Waiting For Response", component: <WaitingForResponseStep onNext={nextStep} /> },
    { id: 7, title: "Acceptance Success", component: <AcceptanceSuccessStep data={formData} onNext={nextStep} /> },
    { id: 8, title: "Final Review", component: <ReviewSignStep data={formData} updateData={updateData} onNext={nextStep} /> },
    { id: 9, title: "Agreement Fee", component: <PaymentStep data={formData} onNext={nextStep} /> },
    { id: 10, title: "", component: <FinalAgreementNote data={formData} onHome={() => router.push(`/dashboard?module=${moduleType}`)} /> },
  ]

  const currentStepData = steps.find(s => s.id === currentStep)

  return (
    <AppContainer>
      <div className="flex flex-col h-[100dvh] bg-[#fcfcfc] overflow-hidden">
        {/* Header (Hidden on final success step) */}
        {currentStep < 10 && (
          <header className="flex items-center h-[60px] px-4 shrink-0 bg-white sticky top-0 z-10 shadow-sm border-b border-border/50">
            <button 
              onClick={handleBack}
              className="w-10 h-10 -ml-2 rounded-full flex items-center justify-center hover:bg-black/5 active:bg-black/10 transition-colors"
            >
              <ChevronLeft strokeWidth={2.5} className="w-[26px] h-[26px] text-[#041B4A]" />
            </button>
            <h1 className="font-semibold text-[17.5px] text-[#041B4A] tracking-tight ml-2">{currentStepData?.title}</h1>
          </header>
        )}

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="absolute inset-0 p-5 pb-24 flex flex-col"
            >
              {currentStepData?.component}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </AppContainer>
  )
}

export default function CreateAgreementPage() {
  return (
    <React.Suspense fallback={
      <div className="flex min-h-[100dvh] items-center justify-center bg-[#FBFBFA]">
        <span className="h-8 w-8 animate-spin rounded-full border-4 border-[#0033A0] border-t-transparent" />
      </div>
    }>
      <CreateAgreementContent />
    </React.Suspense>
  )
}
