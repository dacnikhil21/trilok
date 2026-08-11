"use client"

import * as React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { AppShell } from "@/components/layout/AppShell"
import {
  AgreementCategoryIntro,
  AgreementCategoryPicker,
  AgreementFlowHeader,
  AgreementIntroFooter,
  AgreementTypePicker,
} from "@/components/agreement/AgreementFlowScreens"
import {
  type AgreementType,
  findCategory,
  getCategoriesForType,
  getTypeTitle,
} from "@/lib/c2c-config"
import {
  clearC2CFromDashboard,
  isC2CFromDashboard,
  setC2CFromDashboard,
} from "@/lib/c2c-session"
import {
  B2C_CATEGORY_TO_DASHBOARD,
  B2C_DASHBOARD_DEFAULTS,
  B2C_TEMPLATE_PRODUCT,
  getB2CProductLabel,
  getB2CReturnPath,
} from "@/lib/b2c-dashboard-routes"
import { setB2CDashboard } from "@/lib/b2c-session"
import { saveAgreementFromWizard } from "@/lib/b2c-agreements"
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
  const isB2C = moduleType === "b2c"
  const dashboardParam = searchParams.get("dashboard")
  const typeParam =
    (searchParams.get("type") as AgreementType | null) ??
    (isB2C && dashboardParam ? (B2C_DASHBOARD_DEFAULTS[dashboardParam]?.type ?? "sale") : null)
  const categoryParam = searchParams.get("category")
  const templateParam = searchParams.get("template")

  const b2cReturnPath = getB2CReturnPath(dashboardParam, categoryParam)
  const c2cHomePath = `/dashboard?module=${moduleType}`
  const fromDashboardRef = React.useRef(
    searchParams.get("from") === "dashboard" || isC2CFromDashboard()
  )

  const isFromDashboard = () =>
    fromDashboardRef.current ||
    searchParams.get("from") === "dashboard" ||
    isC2CFromDashboard()

  const buildFlowUrl = React.useCallback(
    (params: { type?: AgreementType | null; category?: string | null }) => {
      const qs = new URLSearchParams({ module: moduleType })
      if (params.type) qs.set("type", params.type)
      if (params.category) qs.set("category", params.category)
      if (fromDashboardRef.current) qs.set("from", "dashboard")
      return `/create-agreement?${qs.toString()}`
    },
    [moduleType]
  )

  // Keep from-dashboard flag in sync with URL + sessionStorage
  React.useEffect(() => {
    if (isB2C) return
    const fromUrl = searchParams.get("from") === "dashboard"
    const fromSession = isC2CFromDashboard()
    if (fromUrl || fromSession) {
      fromDashboardRef.current = true
      if (!fromSession) setC2CFromDashboard()
    }
    if (!typeParam && !categoryParam && searchParams.get("from") !== "dashboard") {
      clearC2CFromDashboard()
      fromDashboardRef.current = false
    }
  }, [isB2C, searchParams, typeParam, categoryParam])

  const b2cInitialCategory =
    isB2C && categoryParam && typeParam ? findCategory(typeParam, categoryParam) : undefined

  const [phase, setPhase] = React.useState<FlowPhase>(() => {
    if (isB2C && categoryParam && typeParam) return "wizard"
    if (categoryParam && typeParam) return "intro"
    if (typeParam) return "category"
    return "type"
  })
  const [agreementType, setAgreementType] = React.useState<AgreementType | null>(typeParam)
  const [categoryId, setCategoryId] = React.useState<string | null>(categoryParam)
  const [currentStep, setCurrentStep] = React.useState(1)
  const inWizardRef = React.useRef(false)
  const savedAgreementRef = React.useRef(false)
  const [formData, setFormData] = React.useState<AgreementData>(() => {
    const next: AgreementData = { ...INITIAL_FORM }
    const label = getB2CProductLabel(templateParam, dashboardParam)
    if (label) {
      next.productName = label
    } else if (templateParam && B2C_TEMPLATE_PRODUCT[templateParam]) {
      next.productName = B2C_TEMPLATE_PRODUCT[templateParam]
    }
    if (b2cInitialCategory) {
      next.category = b2cInitialCategory.title
    }
    return next
  })

  // Sync flow phase when URL changes (browser back/forward) — never override wizard
  React.useEffect(() => {
    if (isB2C || inWizardRef.current) return
    const type = searchParams.get("type") as AgreementType | null
    const category = searchParams.get("category")

    if (category && type) {
      setPhase("intro")
      setAgreementType(type)
      setCategoryId(category)
    } else if (type) {
      setPhase("category")
      setAgreementType(type)
      setCategoryId(null)
    } else if (!isFromDashboard()) {
      setPhase("type")
      setAgreementType(null)
      setCategoryId(null)
    }
  }, [isB2C, searchParams])

  // B2C: lock to merchant dashboard — never show C2C type/category pickers
  React.useEffect(() => {
    if (isB2C && dashboardParam) {
      setB2CDashboard(dashboardParam)
    }
  }, [isB2C, dashboardParam])

  React.useEffect(() => {
    if (!isB2C || !dashboardParam) return
    const defaults = B2C_DASHBOARD_DEFAULTS[dashboardParam]
    if (!defaults) return

    const params = new URLSearchParams(searchParams.toString())
    let needsReplace = false

    if (params.get("type") !== defaults.type) {
      params.set("type", defaults.type)
      needsReplace = true
    }

    const currentCategory = params.get("category")
    const currentType = params.get("type") as AgreementType | null

    if (
      currentCategory &&
      currentType &&
      B2C_CATEGORY_TO_DASHBOARD[currentCategory] === dashboardParam
    ) {
      if (phase !== "wizard") {
        setPhase("wizard")
        setAgreementType(currentType)
        setCategoryId(currentCategory)
      }
      return
    }

    if (defaults.category && currentCategory !== defaults.category) {
      params.set("category", defaults.category)
      needsReplace = true
    }

    if (needsReplace) {
      router.replace(`/create-agreement?${params.toString()}`)
      return
    }

    if (currentCategory && currentType && phase !== "wizard") {
      setPhase("wizard")
      setAgreementType(currentType)
      setCategoryId(currentCategory)
    }
  }, [isB2C, dashboardParam, categoryParam, phase, router, searchParams])

  const updateData = (updates: Partial<AgreementData>) => {
    setFormData((prev) => ({ ...prev, ...updates }))
  }

  const nextStep = () => setCurrentStep((prev) => prev + 1)
  const prevStep = () => setCurrentStep((prev) => Math.max(1, prev - 1))

  const selectedCategory =
    agreementType && categoryId ? findCategory(agreementType, categoryId) : undefined

  const productLabel = getB2CProductLabel(templateParam, dashboardParam)

  // B2C: keep category in sync when URL params are normalized
  React.useEffect(() => {
    if (!isB2C || phase !== "wizard" || !selectedCategory) return
    setFormData((prev) =>
      prev.category === selectedCategory.title ? prev : { ...prev, category: selectedCategory.title }
    )
  }, [isB2C, phase, selectedCategory])

  React.useEffect(() => {
    if (!isB2C || currentStep !== 10 || savedAgreementRef.current) return
    savedAgreementRef.current = true
    saveAgreementFromWizard({
      productName: formData.productName || "Product",
      category: formData.category || selectedCategory?.title || "General",
      role: formData.role,
      saleAmount: formData.saleAmount,
      brand: formData.brand,
      model: formData.model,
      serialNumber: formData.serialNumber,
      paymentTerms: formData.paymentTerms,
      deliveryDate: formData.deliveryDate,
      deliveryLocation: formData.deliveryLocation,
      invitedPartyName: formData.invitedPartyName,
    })
  }, [isB2C, currentStep, formData, selectedCategory])

  const handleBack = () => {
    if (phase === "wizard") {
      if (currentStep === 1) {
        if (isB2C) {
          router.push(b2cReturnPath)
          return
        }
        inWizardRef.current = false
        setPhase("intro")
      } else if (currentStep < 10) {
        prevStep()
      }
      return
    }

    if (phase === "intro") {
      if (isB2C) {
        router.push(b2cReturnPath)
        return
      }
      setPhase("category")
      setCategoryId(null)
      router.replace(buildFlowUrl({ type: agreementType }))
      return
    }

    if (phase === "category") {
      if (isB2C) {
        router.push(b2cReturnPath)
        return
      }
      if (isFromDashboard()) {
        clearC2CFromDashboard()
        router.push(c2cHomePath)
        return
      }
      setAgreementType(null)
      setCategoryId(null)
      setPhase("type")
      router.replace(`/create-agreement?module=${moduleType}`)
      return
    }

    router.push(isB2C ? b2cReturnPath : c2cHomePath)
  }

  const startWizard = () => {
    if (selectedCategory) {
      updateData({ category: selectedCategory.title })
    }
    inWizardRef.current = true
    setCurrentStep(1)
    setPhase("wizard")
  }

  const wizardSteps = [
    { id: 1, title: "Select Your Role", component: <RoleSelectionStep data={formData} updateData={updateData} onNext={nextStep} /> },
    {
      id: 2,
      title: "Product Details",
      component: (
        <ProductDetailsStep
          data={formData}
          updateData={updateData}
          onNext={nextStep}
          isB2C={isB2C}
        />
      ),
    },
    { id: 3, title: "Terms & Conditions", component: <PaymentDeliveryStep data={formData} updateData={updateData} onNext={nextStep} /> },
    { id: 4, title: "Agreement Review", component: <BuyerReviewStep data={formData} onNext={nextStep} /> },
    { id: 5, title: "Other Party Details", component: <WhatsAppInviteStep data={formData} updateData={updateData} onNext={nextStep} /> },
    { id: 6, title: "Waiting For Response", component: <WaitingForResponseStep onNext={nextStep} /> },
    { id: 7, title: "Acceptance Success", component: <AcceptanceSuccessStep data={formData} onNext={nextStep} /> },
    { id: 8, title: "Final Review", component: <ReviewSignStep data={formData} updateData={updateData} onNext={nextStep} /> },
    { id: 9, title: "Agreement Fee", component: <PaymentStep data={formData} onNext={nextStep} /> },
    {
      id: 10,
      title: "",
      component: (
        <FinalAgreementNote
          data={formData}
          onHome={() => router.push(isB2C ? b2cReturnPath : `/dashboard?module=${moduleType}`)}
        />
      ),
    },
  ]

  const currentStepData = wizardSteps.find((s) => s.id === currentStep)

  const headerTitle =
    phase === "category" && agreementType
      ? getTypeTitle(agreementType)
      : phase === "intro" && selectedCategory
        ? productLabel ?? selectedCategory.title
        : phase === "wizard" && currentStep < 10
          ? currentStepData?.title ?? "Create Agreement"
          : "Create Agreement"

  const showColoredHeader = phase !== "wizard" || currentStep < 10
  const headerType = agreementType ?? "sale"

  const showIntroFooter = phase === "intro" && agreementType && selectedCategory

  return (
    <AppShell
      backgroundClassName="bg-white"
      header={
        showColoredHeader ? (
          phase === "wizard" ? (
            <div className="border-b border-[#E2E8F0] bg-white px-4">
              <div className="flex h-[52px] items-center gap-2">
                <button
                  type="button"
                  onClick={handleBack}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M19 12H5M12 19l-7-7 7-7" />
                  </svg>
                </button>
                <h1 className="truncate text-[16px] font-extrabold text-[#0F172A]">{headerTitle}</h1>
              </div>
            </div>
          ) : (
            <AgreementFlowHeader type={headerType} title={headerTitle} onBack={handleBack} />
          )
        ) : undefined
      }
      footer={
        showIntroFooter ? (
          <AgreementIntroFooter type={headerType} onCreate={startWizard} />
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
          {!isB2C && phase === "type" && !isFromDashboard() && (
            <AgreementTypePicker
              onSelect={(type) => {
                setAgreementType(type)
                setPhase("category")
                router.replace(buildFlowUrl({ type }))
              }}
            />
          )}
          {!isB2C && phase === "category" && agreementType && (
            <AgreementCategoryPicker
              type={agreementType}
              categories={getCategoriesForType(agreementType)}
              onSelect={(id) => {
                setCategoryId(id)
                setPhase("intro")
                router.replace(buildFlowUrl({ type: agreementType, category: id }))
              }}
            />
          )}
          {phase === "intro" && !isB2C && agreementType && selectedCategory && (
            <AgreementCategoryIntro
              type={agreementType}
              category={selectedCategory}
              productLabel={productLabel}
            />
          )}
          {phase === "wizard" && currentStepData?.component}
        </motion.div>
      </AnimatePresence>
    </AppShell>
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
