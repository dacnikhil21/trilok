import type { VerificationServiceIcon } from "@/lib/dashboard-configs"

export type VerificationFlowStep =
  | "aadhaar"
  | "otp"
  | "upload-ekyc"
  | "consent"
  | "permissions"
  | "liveness"
  | "location"
  | "payment"
  | "success"

export type VerificationServiceConfig = {
  id: VerificationServiceIcon
  label: string
  fieldLabel: string
  placeholder: string
  helperText: string
  securityNote: string
  inputMode: "numeric" | "text"
  formatValue: (raw: string) => string
  isValid: (value: string) => boolean
  otpHint: string
  primaryButtonText: string
  steps: VerificationFlowStep[]
  uploadFrontLabel?: string
  uploadBackLabel?: string
  showSelfieUpload?: boolean
  secondaryField?: {
    label: string
    placeholder: string
    inputMode: "numeric" | "text"
    formatValue: (raw: string) => string
    isValid: (value: string) => boolean
  }
}

const AADHAAR_FULL_FLOW: VerificationFlowStep[] = [
  "aadhaar",
  "otp",
  "upload-ekyc",
  "consent",
  "permissions",
  "liveness",
  "location",
  "success",
]

const STANDARD_ID_FLOW: VerificationFlowStep[] = [
  "aadhaar",
  "consent",
  "payment",
  "success",
]

const DL_FLOW: VerificationFlowStep[] = [
  "aadhaar",
  "consent",
  "payment",
  "success",
]

export const VERIFICATION_SERVICE_CONFIG: Record<VerificationServiceIcon, VerificationServiceConfig> = {
  aadhaar: {
    id: "aadhaar",
    label: "Aadhaar",
    fieldLabel: "Aadhaar Number",
    placeholder: "XXXX - XXXX - XXXX",
    helperText: "Your Aadhaar number is securely transmitted directly to UIDAI.",
    securityNote:
      "Secured with AES-256 bit encryption. eSaleAgreement does not store your Aadhaar number.",
    inputMode: "numeric",
    formatValue: (raw) => raw.replace(/\D/g, "").slice(0, 12),
    isValid: (v) => v.length === 12,
    otpHint: "Enter the 6-digit OTP sent to your Aadhaar-linked mobile number.",
    primaryButtonText: "Verify Aadhaar",
    steps: STANDARD_ID_FLOW,
    uploadFrontLabel: "Upload Front",
    uploadBackLabel: "Upload Back",
    showSelfieUpload: true,
  },
  pan: {
    id: "pan",
    label: "PAN",
    fieldLabel: "PAN Number",
    placeholder: "ABCDE1234F",
    helperText: "Enter your 10-character Permanent Account Number issued by the Income Tax Department.",
    securityNote: "Your PAN is verified securely via authorized government APIs. We do not store your PAN.",
    inputMode: "text",
    formatValue: (raw) => raw.replace(/[^A-Za-z0-9]/g, "").toUpperCase().slice(0, 10),
    isValid: (v) => /^[A-Z]{5}\d{4}[A-Z]$/.test(v),
    otpHint: "Enter the 6-digit OTP sent to your PAN-linked mobile number.",
    primaryButtonText: "Verify PAN",
    steps: STANDARD_ID_FLOW,
  },
  gstin: {
    id: "gstin",
    label: "GSTIN",
    fieldLabel: "GSTIN Number",
    placeholder: "22AAAAA0000A1Z5",
    helperText: "Enter your 15-digit GST Identification Number registered with the GST portal.",
    securityNote: "GSTIN is verified against the official GST database. Your number is encrypted in transit.",
    inputMode: "text",
    formatValue: (raw) => raw.replace(/[^A-Za-z0-9]/g, "").toUpperCase().slice(0, 15),
    isValid: (v) =>
      /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{1}Z[A-Z0-9]{1}$/.test(v) ||
      (v.length === 15 && /^[0-9]{2}/.test(v)),
    otpHint: "Enter the 6-digit OTP sent to your GST-registered mobile number.",
    primaryButtonText: "Verify GSTIN",
    steps: STANDARD_ID_FLOW,
  },
  "driving-licence": {
    id: "driving-licence",
    label: "Driving Licence",
    fieldLabel: "Driving Licence Number",
    placeholder: "TS09 20200001234",
    helperText: "Enter your driving licence number as printed on your DL card.",
    securityNote: "DL details are verified via Parivahan / RTO databases. Data is encrypted end-to-end.",
    inputMode: "text",
    formatValue: (raw) => raw.replace(/[^A-Za-z0-9\s-]/g, "").toUpperCase().slice(0, 20),
    isValid: (v) => v.replace(/\s/g, "").length >= 10,
    otpHint: "Enter the 6-digit OTP sent to your DL-registered mobile number.",
    primaryButtonText: "Verify Driving Licence",
    steps: DL_FLOW,
    uploadFrontLabel: "Upload DL Front",
    uploadBackLabel: "Upload DL Back",
    showSelfieUpload: false,
    secondaryField: {
      label: "Date of Birth",
      placeholder: "DD / MM / YYYY",
      inputMode: "numeric",
      formatValue: (raw) => {
        const d = raw.replace(/\D/g, "").slice(0, 8)
        if (d.length <= 2) return d
        if (d.length <= 4) return `${d.slice(0, 2)} / ${d.slice(2)}`
        return `${d.slice(0, 2)} / ${d.slice(2, 4)} / ${d.slice(4)}`
      },
      isValid: (v) => v.replace(/\D/g, "").length === 8,
    },
  },
  udyam: {
    id: "udyam",
    label: "Udyam",
    fieldLabel: "Udyam Registration Number",
    placeholder: "UDYAM-TS-00-1234567",
    helperText: "Enter your Udyam MSME registration number issued by the Ministry of MSME.",
    securityNote: "Udyam details are verified against the official Udyam portal. Your data stays private.",
    inputMode: "text",
    formatValue: (raw) => raw.replace(/[^A-Za-z0-9-]/g, "").toUpperCase().slice(0, 25),
    isValid: (v) => v.includes("UDYAM") || v.replace(/[^A-Z0-9]/g, "").length >= 12,
    otpHint: "Enter the 6-digit OTP sent to your Udyam-registered mobile number.",
    primaryButtonText: "Verify Udyam",
    steps: STANDARD_ID_FLOW,
  },
  rc: {
    id: "rc",
    label: "RC",
    fieldLabel: "Vehicle Registration Number",
    placeholder: "TS09 AB 1234",
    helperText: "Enter your vehicle registration number as on the RC (Registration Certificate).",
    securityNote: "RC is verified via Parivahan / VAHAN. Vehicle details are used only for verification.",
    inputMode: "text",
    formatValue: (raw) => raw.replace(/[^A-Za-z0-9\s-]/g, "").toUpperCase().slice(0, 15),
    isValid: (v) => v.replace(/\s/g, "").length >= 6,
    otpHint: "Enter the 6-digit OTP sent to the RC-linked mobile number.",
    primaryButtonText: "Verify RC",
    steps: STANDARD_ID_FLOW,
  },
  utilities: {
    id: "utilities",
    label: "Utilities",
    fieldLabel: "Utility Account / Consumer Number",
    placeholder: "Enter consumer number",
    helperText: "Enter your electricity, water, or gas consumer account number for address verification.",
    securityNote: "Utility records are used only to confirm your registered address for agreements.",
    inputMode: "text",
    formatValue: (raw) => raw.replace(/[^A-Za-z0-9/-]/g, "").slice(0, 20),
    isValid: (v) => v.length >= 6,
    otpHint: "Enter the 6-digit OTP sent to your utility-registered mobile number.",
    primaryButtonText: "Verify Utilities",
    steps: ["aadhaar", "consent", "payment", "success"],
  },
  more: {
    id: "more",
    label: "Other Services",
    fieldLabel: "Reference / ID Number",
    placeholder: "Enter ID or reference number",
    helperText: "Select a specific verification service from the list, or contact support for other IDs.",
    securityNote: "For additional verification types, our support team will guide you through the process.",
    inputMode: "text",
    formatValue: (raw) => raw.trim().slice(0, 30),
    isValid: (v) => v.length >= 4,
    otpHint: "Enter the 6-digit OTP sent to your registered mobile number.",
    primaryButtonText: "Continue",
    steps: ["aadhaar", "consent", "payment", "success"],
  },
}

export function getVerificationServiceConfig(
  serviceId: string | null | undefined
): VerificationServiceConfig {
  const id = (serviceId ?? "aadhaar") as VerificationServiceIcon
  return VERIFICATION_SERVICE_CONFIG[id] ?? VERIFICATION_SERVICE_CONFIG.aadhaar
}

export function getServiceFlowSteps(
  config: VerificationServiceConfig,
  isB2C: boolean
): VerificationFlowStep[] {
  return [...config.steps]
}

export function getNextFlowStep(
  current: VerificationFlowStep,
  flow: VerificationFlowStep[]
): VerificationFlowStep | null {
  const idx = flow.indexOf(current)
  if (idx < 0 || idx >= flow.length - 1) return null
  return flow[idx + 1] ?? null
}

export function getPrevFlowStep(
  current: VerificationFlowStep,
  flow: VerificationFlowStep[]
): VerificationFlowStep | null {
  const idx = flow.indexOf(current)
  if (idx <= 0) return null
  return flow[idx - 1] ?? null
}
