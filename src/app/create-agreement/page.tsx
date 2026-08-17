"use client"

import * as React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { AppShell } from "@/components/layout/AppShell"
import { RoleSelectionStep } from "@/components/agreement/RoleSelectionStep"
import { ProductDetailsStep } from "@/components/agreement/ProductDetailsStep"
import { BuyerReviewStep } from "@/components/agreement/BuyerReviewStep"
import { PaymentStep } from "@/components/agreement/PaymentStep"
import { AadhaarConsentStep } from "@/components/agreement/AadhaarConsentStep"
import { AadhaarEsignSetupStep } from "@/components/agreement/AadhaarEsignSetupStep"
import { CreatorEsignStep } from "@/components/agreement/CreatorEsignStep"
import { ShareLinkStep } from "@/components/agreement/ShareLinkStep"
import { WaitingForResponseStep } from "@/components/agreement/WaitingForResponseStep"
import { AgreementCompletedStep } from "@/components/agreement/AgreementCompletedStep"
import {
  AgreementFlowHeader,
  AgreementCategoryPicker,
  AgreementCategoryIntro,
  AgreementIntroFooter,
  AgreementTypePicker,
} from "@/components/agreement/AgreementFlowScreens"
import {
  type AgreementType,
  findCategory,
  getCategoriesForType,
  getTypeTitle,
  getTypeConfig,
} from "@/lib/c2c-config"
import {
  isC2CFromDashboard,
  clearC2CFromDashboard,
} from "@/lib/c2c-session"
import {
  getB2CReturnPath,
  getB2CProductLabel,
  B2C_DASHBOARD_DEFAULTS,
} from "@/lib/b2c-dashboard-routes"
import { resolveAppModule, type AppModule } from "@/lib/app-module"
import { saveAgreementFromWizard } from "@/lib/b2c-agreements"

export type AgreementData = {
  role: "seller" | "buyer" | null
  productName: string
  brand: string
  model: string
  serialNumber: string
  quantity: string
  saleAmount: string
  condition: string
  warranty: string
  paymentTerms: string
  returnPolicy: string
  deliveryDate: string
  deliveryLocation: string
  deliveryTime: string
  transportMode: string
  transitInsurance: boolean
  customerMobile: string
  customerName: string
  customerAadhaar: string
  customerOtp: string
  category: string
  description: string
  photos: {
    front: string | null
    back: string | null
    imei: string | null
    bill: string | null
  }
  invitedPartyName: string
  invitedPartyMobile: string
  invitedPartyAadhaar: string
  invitedPartyOtp: string
  aadhaarNumber: string
  buyerName?: string
  buyerMobile?: string
  buyerAadhaar?: string
  buyerOtp?: string
  creatorLocation?: string
  invitedPartyLocation?: string
  creatorSelfie?: string | null
  invitedPartySelfie?: string | null
  warrantyTerms?: string
  additionalClauses?: string
  eSignStatus?: string
  dpdpConsent?: boolean
  // Category-specific item/property fields
  material: string
  vehicleType: string
  registrationNumber: string
  modelYear: string
  color: string
  fuelType: string
  dailyRent: string
  extraCharges: string
  propertyType: string
  roomType: string
  address: string
  monthlyRent: string
  securityDeposit: string
  amenities: string
  rulesRegulations: string
  itemType: string
  accessoriesIncluded: string
  usagePurpose: string
  serviceType: string
  serviceName: string
  serviceDescription: string
  durationType: string
  startDate: string
  endDate: string
  totalCharges: string
  specialInstructions: string
  othersCategory: string
}

function parseAgreementType(val: string | null): AgreementType | null {
  if (val === "sale" || val === "rental" || val === "service") return val
  return null
}

function getB2CCategoryId(templateParam: string | null, dashboardParam: string | null): string | null {
  if (dashboardParam && B2C_DASHBOARD_DEFAULTS[dashboardParam]?.category) {
    return B2C_DASHBOARD_DEFAULTS[dashboardParam].category!
  }
  return "mobile-electronics"
}

type FlowPhase = "type" | "category" | "intro" | "wizard"

function determineInitialPhase(
  moduleType: AppModule,
  type: AgreementType | null,
  catId: string | null,
  dashboardParam: string | null,
  templateParam: string | null
): FlowPhase {
  if (moduleType === "b2c") {
    if (dashboardParam || templateParam) return "wizard"
    return "wizard"
  }
  if (isC2CFromDashboard() && type) {
    if (catId) return "wizard"
    return "category"
  }
  if (!type) return "type"
  if (!catId) return "category"
  return "intro"
}

const INITIAL_FORM: AgreementData = {
  role: "seller",
  productName: "",
  brand: "",
  model: "",
  serialNumber: "",
  quantity: "1",
  saleAmount: "",
  condition: "New",
  warranty: "None",
  paymentTerms: "100% on Delivery",
  returnPolicy: "No Returns",
  deliveryDate: "",
  deliveryLocation: "",
  deliveryTime: "Flexible",
  transportMode: "Direct Handover",
  transitInsurance: false,
  customerMobile: "9876543210",
  customerName: "Ravi Kumar",
  customerAadhaar: "",
  customerOtp: "",
  category: "",
  description: "",
  photos: {
    front: null,
    back: null,
    imei: null,
    bill: null,
  },
  invitedPartyName: "Rajesh Kumar",
  invitedPartyMobile: "9123456700",
  invitedPartyAadhaar: "",
  invitedPartyOtp: "",
  aadhaarNumber: "554433221100",
  buyerName: "Rajesh Kumar",
  buyerMobile: "9123456700",
  buyerAadhaar: "",
  buyerOtp: "",
  creatorLocation: "",
  invitedPartyLocation: "",
  creatorSelfie: null,
  invitedPartySelfie: null,
  warrantyTerms: "",
  additionalClauses: "",
  eSignStatus: "pending",
  dpdpConsent: true,
  material: "",
  vehicleType: "",
  registrationNumber: "",
  modelYear: "",
  color: "",
  fuelType: "",
  dailyRent: "",
  extraCharges: "",
  propertyType: "",
  roomType: "",
  address: "",
  monthlyRent: "",
  securityDeposit: "",
  amenities: "",
  rulesRegulations: "",
  itemType: "",
  accessoriesIncluded: "",
  usagePurpose: "",
  serviceType: "",
  serviceName: "",
  serviceDescription: "",
  durationType: "",
  startDate: "",
  endDate: "",
  totalCharges: "",
  specialInstructions: "",
  othersCategory: "",
}

function CreateAgreementContent() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const moduleType: AppModule = resolveAppModule(searchParams.get("module"))
  const isB2C = moduleType === "b2c"

  const dashboardParam = searchParams.get("dashboard")
  const templateParam = searchParams.get("template")

  const b2cCategoryId = getB2CCategoryId(templateParam, dashboardParam)
  const b2cReturnPath = getB2CReturnPath(dashboardParam)
  const c2cHomePath = `/dashboard?module=${moduleType}`

  const rawType = searchParams.get("type")
  const initialType: AgreementType | null = isB2C
    ? "sale"
    : parseAgreementType(rawType)
  const initialCategory: string | null = isB2C
    ? b2cCategoryId
    : searchParams.get("category")

  const [agreementType, setAgreementType] = React.useState<AgreementType | null>(initialType)
  const [categoryId, setCategoryId] = React.useState<string | null>(initialCategory)
  const [phase, setPhase] = React.useState<FlowPhase>(() =>
    determineInitialPhase(moduleType, initialType, initialCategory, dashboardParam, templateParam)
  )

  const inWizardRef = React.useRef(
    isB2C ||
      (typeof window !== "undefined" &&
        new URLSearchParams(window.location.search).get("inWizard") === "true")
  )

  const [currentStep, setCurrentStep] = React.useState(1)
  const [formData, setFormData] = React.useState<AgreementData>(INITIAL_FORM)
  const savedAgreementRef = React.useRef(false)

  const buildFlowUrl = React.useCallback(
    (opts: { type?: AgreementType | null; category?: string | null }) => {
      const p = new URLSearchParams()
      p.set("module", moduleType)
      const t = opts.type !== undefined ? opts.type : agreementType
      if (t) p.set("type", t)
      const c = opts.category !== undefined ? opts.category : categoryId
      if (c) p.set("category", c)
      return `/create-agreement?${p.toString()}`
    },
    [moduleType, agreementType, categoryId]
  )

  React.useEffect(() => {
    if (isB2C) {
      setAgreementType("sale")
      setCategoryId(b2cCategoryId)
      setPhase("wizard")
      inWizardRef.current = true
      return
    }

    const t = parseAgreementType(searchParams.get("type"))
    const c = searchParams.get("category")

    setAgreementType(t)
    setCategoryId(c)

    if (!t) {
      setPhase("type")
      inWizardRef.current = false
    } else if (!c) {
      setPhase("category")
      inWizardRef.current = false
    } else {
      setPhase("wizard")
      inWizardRef.current = true
    }
  }, [searchParams, isB2C, b2cCategoryId])

  const updateData = (updates: Partial<AgreementData>) => {
    setFormData((prev) => ({ ...prev, ...updates }))
  }

  const nextStep = () => setCurrentStep((prev) => prev + 1)
  const prevStep = () => setCurrentStep((prev) => Math.max(1, prev - 1))

  const selectedCategory =
    agreementType && categoryId ? findCategory(agreementType, categoryId) : undefined

  const productLabel = getB2CProductLabel(templateParam, dashboardParam)

  // B2C / C2C: keep category in sync
  React.useEffect(() => {
    if (phase !== "wizard" || !selectedCategory) return
    setFormData((prev) =>
      prev.category === selectedCategory.title ? prev : { ...prev, category: selectedCategory.title }
    )
  }, [phase, selectedCategory])

  // Save completed agreement when reaching final step
  React.useEffect(() => {
    if (currentStep !== 10 || savedAgreementRef.current) return
    savedAgreementRef.current = true
    saveAgreementFromWizard(
      {
        productName: formData.productName || formData.model || "Mobile Phone",
        category: formData.category || selectedCategory?.title || "Mobile Phone & Electronics",
        role: formData.role,
        saleAmount: formData.saleAmount || formData.monthlyRent || formData.totalCharges || "45,000",
        brand: formData.brand,
        model: formData.model,
        serialNumber: formData.serialNumber,
        paymentTerms: formData.paymentTerms,
        deliveryDate: formData.deliveryDate,
        deliveryLocation: formData.deliveryLocation,
        invitedPartyName: formData.invitedPartyName,
      },
      moduleType
    )
  }, [currentStep, formData, selectedCategory, moduleType])

  const handleBack = () => {
    if (phase === "wizard") {
      if (currentStep > 1) {
        prevStep()
        return
      }
      // currentStep === 1 (Select Your Role)
      if (isB2C) {
        router.push(b2cReturnPath)
        return
      }
      inWizardRef.current = false
      setCategoryId(null)
      setCurrentStep(1)
      setPhase("category")
      if (agreementType) {
        router.replace(`/create-agreement?module=${moduleType}&type=${agreementType}`)
      } else {
        router.replace(`/create-agreement?module=${moduleType}`)
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
      if (agreementType) {
        router.replace(`/create-agreement?module=${moduleType}&type=${agreementType}`)
      } else {
        router.replace(`/create-agreement?module=${moduleType}`)
      }
      return
    }

    if (phase === "category") {
      if (isB2C) {
        router.push(b2cReturnPath)
        return
      }
      clearC2CFromDashboard()
      setAgreementType(null)
      setCategoryId(null)
      setPhase("type")
      router.replace(`/create-agreement?module=${moduleType}`)
      return
    }

    if (phase === "type") {
      router.push(isB2C ? b2cReturnPath : c2cHomePath)
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

  // Exact 10-step wizard flow as specified by user:
  // 1: Role Selection
  // 2: Product Details
  // 3: Agreement Preview / Review
  // 4: Payment ₹99
  // 5: Consent for Aadhaar Verification
  // 6: Enter Aadhaar & Generate Link
  // 7: Creator eSigns
  // 8: Share Agreement Link
  // 9: Waiting for Approval
  // 10: Agreement Completed
  const wizardSteps = [
    {
      id: 1,
      title: "Select Your Role",
      component: (
        <RoleSelectionStep
          data={formData}
          updateData={updateData}
          onNext={nextStep}
          agreementType={agreementType}
        />
      ),
    },
    {
      id: 2,
      title: selectedCategory?.title || "Product Details",
      component: (
        <ProductDetailsStep
          data={formData}
          updateData={updateData}
          onNext={nextStep}
          isB2C={isB2C}
          agreementType={agreementType}
          categoryId={categoryId}
        />
      ),
    },
    {
      id: 3,
      title: "Agreement Review",
      component: (
        <BuyerReviewStep
          data={formData}
          onNext={nextStep}
          agreementType={agreementType}
        />
      ),
    },
    {
      id: 4,
      title: "Payment",
      component: (
        <PaymentStep
          data={formData}
          onNext={nextStep}
        />
      ),
    },
    {
      id: 5,
      title: "eSign Process",
      component: (
        <AadhaarConsentStep
          onNext={nextStep}
        />
      ),
    },
    {
      id: 6,
      title: "eSign Process",
      component: (
        <AadhaarEsignSetupStep
          data={formData}
          updateData={updateData}
          onNext={nextStep}
        />
      ),
    },
    {
      id: 7,
      title: "eSign Document",
      component: (
        <CreatorEsignStep
          data={formData}
          updateData={updateData}
          onNext={nextStep}
        />
      ),
    },
    {
      id: 8,
      title: "Share Agreement Link",
      component: (
        <ShareLinkStep
          data={formData}
          onNext={nextStep}
          onGoToAgreements={() => router.push(`/agreements?module=${moduleType}`)}
        />
      ),
    },
    {
      id: 9,
      title: "Agreement Status",
      component: (
        <WaitingForResponseStep
          data={formData}
          onNext={nextStep}
        />
      ),
    },
    {
      id: 10,
      title: "Agreement Completed",
      component: (
        <AgreementCompletedStep
          data={formData}
          onHome={() => router.push(isB2C ? b2cReturnPath : `/dashboard?module=${moduleType}`)}
          onViewAgreements={() => router.push(`/agreements?module=${moduleType}`)}
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
        : phase === "wizard" && currentStep === 2 && selectedCategory
          ? selectedCategory.title
          : phase === "wizard"
            ? currentStepData?.title ?? "Create Agreement"
            : "Create Agreement"

  const headerType = agreementType ?? "sale"
  const showIntroFooter = phase === "intro" && agreementType && selectedCategory

  return (
    <AppShell
      backgroundClassName="bg-white"
      header={
        <AgreementFlowHeader
          type={headerType}
          title={headerTitle}
          onBack={handleBack}
        />
      }
      footer={
        showIntroFooter ? (
          <AgreementIntroFooter type={headerType} onCreate={startWizard} />
        ) : undefined
      }
      contentClassName={phase === "wizard" ? "px-4 py-4" : "p-0"}
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
          {!isB2C && phase === "type" && !isC2CFromDashboard() && (
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
                const selectedCat = findCategory(agreementType, id)
                if (selectedCat) {
                  updateData({ category: selectedCat.title })
                }
                setPhase("wizard")
                inWizardRef.current = true
                setCurrentStep(1)
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
