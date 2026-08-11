export interface DashboardTemplate {
  label: string
  icon: "phone" | "laptop" | "tablet" | "watch" | "camera" | "tv" | "appliance" | "console" | "accessories" | "more"
  | "bike" | "car" | "scooter" | "commercial" | "bike-loan" | "car-loan" | "used-vehicle"
  | "furniture" | "office-furniture" | "custom-furniture" | "used-furniture" | "bulk-furniture" | "warranty" | "delivery"
  | "freelance" | "it-services" | "cleaning" | "maintenance" | "installation"
  | "pg" | "vehicle" | "electronics" | "other"
}

export interface RentalCategory {
  label: string
  description: string
  icon: "pg" | "vehicle" | "electronics" | "other"
  categoryId: string
}

export type VerificationServiceIcon =
  | "aadhaar"
  | "pan"
  | "gstin"
  | "driving-licence"
  | "udyam"
  | "rc"
  | "utilities"
  | "more"

export interface VerificationService {
  label: string
  shortLabel?: string
  description?: string
  color: string
  icon: VerificationServiceIcon
}

export interface DashboardConfig {
  id: string
  greeting: string
  headlinePrefix: string
  headlineHighlight: string
  headlineSuffix: string
  subtext: string
  highlightColor: string
  heroGradient: string
  /** PNG hero illustration in /public — overrides SVG fallback */
  heroImage?: string
  templatesTitle?: string
  templates?: DashboardTemplate[]
  templateLayout?: "grid" | "scroll"
  templateGridCols?: 3 | 4
  rentalCategories?: RentalCategory[]
  rentalCategoriesTitle?: string
  verificationServices?: VerificationService[]
}

export const DEFAULT_VERIFICATION_SERVICES: VerificationService[] = [
  { icon: "aadhaar", label: "Aadhaar Verification", shortLabel: "Aadhaar", description: "Verify Aadhaar", color: "#2563EB" },
  { icon: "pan", label: "PAN Verification", shortLabel: "PAN", description: "Verify PAN", color: "#22C55E" },
  { icon: "gstin", label: "GSTIN Verification", shortLabel: "GSTIN", description: "Verify GSTIN", color: "#A855F7" },
  { icon: "driving-licence", label: "Driving Licence Verification", shortLabel: "Driving Licence", description: "Verify DL", color: "#2563EB" },
  { icon: "udyam", label: "Udyam Verification", shortLabel: "Udyam", description: "Verify Udyam", color: "#F97316" },
  { icon: "rc", label: "RC Verification", shortLabel: "RC", description: "Verify RC", color: "#14B8A6" },
  { icon: "more", label: "More", shortLabel: "More", description: "Other services", color: "#2563EB" },
]

export const FURNITURE_VERIFICATION_SERVICES: VerificationService[] = [
  { icon: "aadhaar", label: "Aadhaar Verification", shortLabel: "Aadhaar", description: "Verify Aadhaar", color: "#2563EB" },
  { icon: "pan", label: "PAN Verification", shortLabel: "PAN", description: "Verify PAN", color: "#22C55E" },
  { icon: "gstin", label: "GSTIN Verification", shortLabel: "GSTIN", description: "Verify GSTIN", color: "#A855F7" },
  { icon: "driving-licence", label: "Driving Licence Verification", shortLabel: "Driving Licence", description: "Verify DL", color: "#2563EB" },
  { icon: "utilities", label: "Utilities Verification", shortLabel: "Utilities", description: "Verify utilities", color: "#F97316" },
  { icon: "more", label: "More", shortLabel: "More", description: "Other services", color: "#2563EB" },
]

export const RENTAL_VERIFICATION_SERVICES = DEFAULT_VERIFICATION_SERVICES

export const SERVICE_VERIFICATION_SERVICES: VerificationService[] = [
  { icon: "aadhaar", label: "Aadhaar Verification", shortLabel: "Aadhaar", description: "Verify Aadhaar", color: "#2563EB" },
  { icon: "pan", label: "PAN Verification", shortLabel: "PAN", description: "Verify PAN", color: "#22C55E" },
  { icon: "gstin", label: "GSTIN Verification", shortLabel: "GSTIN", description: "Verify GSTIN", color: "#A855F7" },
  { icon: "driving-licence", label: "Driving Licence Verification", shortLabel: "Driving Licence", description: "Verify DL", color: "#2563EB" },
  { icon: "udyam", label: "Udyam Verification", shortLabel: "Udyam", description: "Verify Udyam", color: "#F97316" },
  { icon: "more", label: "More", shortLabel: "More", description: "Other services", color: "#2563EB" },
]

const MOBILE_GRADIENT = "from-[#DFEAFF] via-[#EBF2FF] to-white"
const VEHICLE_GRADIENT = "from-[#DFEAFF] via-[#E8F0FF] to-white"
const FURNITURE_GRADIENT = "from-[#D9F5E4] via-[#ECFDF5] to-white"
const RENTAL_GRADIENT = "from-[#DCE8FF] via-[#EDF3FF] to-white"
const SERVICE_GRADIENT = "from-[#E9E0FF] via-[#F3EEFF] to-white"
const OTHERS_GRADIENT = "from-[#FFE8CC] via-[#FFF4E8] to-white"

export const DASHBOARD_CONFIGS: Record<string, DashboardConfig> = {
  mobile: {
    id: "mobile",
    greeting: "Hello, Ravi Mobiles 👋",
    headlinePrefix: "Manage your",
    headlineHighlight: "Mobile & Electronics",
    headlineSuffix: "agreements easily",
    subtext: "Create, eSign and manage your Mobile & Electronics agreements securely.",
    highlightColor: "#2563EB",
    heroGradient: MOBILE_GRADIENT,
    heroImage: "/assets/dashboards/heroes/mobile-hero.png",
    templateLayout: "grid",
    templateGridCols: 4,
    templatesTitle: "Mobile & Electronics Agreement Templates",
    verificationServices: DEFAULT_VERIFICATION_SERVICES,
    templates: [
      { label: "Mobile Phone Sale", icon: "phone" },
      { label: "Laptop/Desktop Sale", icon: "laptop" },
      { label: "Tablet Sale", icon: "tablet" },
      { label: "Smartwatch Sale", icon: "watch" },
      { label: "Camera Sale", icon: "camera" },
      { label: "Television Sale", icon: "tv" },
      { label: "Home Appliance Sale", icon: "appliance" },
      { label: "Gaming Console Sale", icon: "console" },
      { label: "Electronic Accessories", icon: "accessories" },
      { label: "Others", icon: "more" },
    ],
  },
  vehicle: {
    id: "vehicle",
    greeting: "Hello, Ravi Motors 👋",
    headlinePrefix: "Manage your",
    headlineHighlight: "Bikes & Cars",
    headlineSuffix: "agreements easily",
    subtext: "Create, eSign and manage your Bikes & Cars sale agreements securely.",
    highlightColor: "#2563EB",
    heroGradient: VEHICLE_GRADIENT,
    heroImage: "/assets/dashboards/heroes/vehicle-hero.png",
    templateLayout: "grid",
    templateGridCols: 4,
    templatesTitle: "Bikes & Cars Agreement Templates",
    verificationServices: DEFAULT_VERIFICATION_SERVICES,
    templates: [
      { label: "Bike Sale Agreement", icon: "bike" },
      { label: "Car Sale Agreement", icon: "car" },
      { label: "Scooter Sale Agreement", icon: "scooter" },
      { label: "Commercial Vehicle Sale", icon: "commercial" },
      { label: "Bike Loan Agreement", icon: "bike-loan" },
      { label: "Car Loan Agreement", icon: "car-loan" },
      { label: "Used Vehicle Sale Agreement", icon: "used-vehicle" },
      { label: "Others", icon: "more" },
    ],
  },
  furniture: {
    id: "furniture",
    greeting: "Hello, Ravi Furniture 👋",
    headlinePrefix: "Manage your",
    headlineHighlight: "Furniture Sale",
    headlineSuffix: "agreements easily",
    subtext: "Create, eSign and manage your furniture sale agreements securely.",
    highlightColor: "#16A34A",
    heroGradient: FURNITURE_GRADIENT,
    heroImage: "/assets/dashboards/heroes/furniture-hero.png",
    templateLayout: "grid",
    templateGridCols: 4,
    templatesTitle: "Furniture Sale Agreement Templates",
    verificationServices: FURNITURE_VERIFICATION_SERVICES,
    templates: [
      { label: "Furniture Sale Agreement", icon: "furniture" },
      { label: "Office Furniture Sale Agreement", icon: "office-furniture" },
      { label: "Custom Furniture Agreement", icon: "custom-furniture" },
      { label: "Used Furniture Sale Agreement", icon: "used-furniture" },
      { label: "Bulk Furniture Sale Agreement", icon: "bulk-furniture" },
      { label: "Furniture Warranty Agreement", icon: "warranty" },
      { label: "Furniture Delivery Agreement", icon: "delivery" },
      { label: "Others", icon: "more" },
    ],
  },
  rental: {
    id: "rental",
    greeting: "Hello, Ravi Rentals 👋",
    headlinePrefix: "Manage your",
    headlineHighlight: "Rental Services",
    headlineSuffix: "agreements easily",
    subtext: "Create, eSign and manage your rental service agreements securely.",
    highlightColor: "#2563EB",
    heroGradient: RENTAL_GRADIENT,
    heroImage: "/assets/dashboards/heroes/rental-hero.png",
    rentalCategoriesTitle: "Rental Service Categories",
    verificationServices: RENTAL_VERIFICATION_SERVICES,
    rentalCategories: [
      { label: "PG Rental", description: "Create agreements for PG rentals", icon: "pg", categoryId: "pg-rental" },
      { label: "Vehicle Rental", description: "Create agreements for vehicle rentals", icon: "vehicle", categoryId: "vehicle-rental" },
      { label: "Electronics Rental", description: "Create agreements for electronics rentals", icon: "electronics", categoryId: "electronics-rental" },
      { label: "Other Rentals", description: "Create agreements for other rentals", icon: "other", categoryId: "other-rental" },
    ],
  },
  service: {
    id: "service",
    greeting: "Hello, Ravi Services 👋",
    headlinePrefix: "Manage your",
    headlineHighlight: "Service Agreements",
    headlineSuffix: "easily",
    subtext: "Create, eSign and manage your service agreements securely.",
    highlightColor: "#2563EB",
    heroGradient: SERVICE_GRADIENT,
    heroImage: "/assets/dashboards/heroes/service-hero.png",
    templateLayout: "grid",
    templateGridCols: 4,
    templatesTitle: "Service Agreement Templates",
    verificationServices: SERVICE_VERIFICATION_SERVICES,
    templates: [
      { label: "Freelance Agreement", icon: "freelance" },
      { label: "IT Services Agreement", icon: "it-services" },
      { label: "Cleaning Services Agreement", icon: "cleaning" },
      { label: "Maintenance Agreement", icon: "maintenance" },
      { label: "Installation Services Agreement", icon: "installation" },
      { label: "Others", icon: "more" },
    ],
  },
  others: {
    id: "others",
    greeting: "Hello, Business Owner 👋",
    headlinePrefix: "Manage your",
    headlineHighlight: "Other Agreements",
    headlineSuffix: "easily",
    subtext: "Create, eSign and manage your agreements securely.",
    highlightColor: "#F97316",
    heroGradient: OTHERS_GRADIENT,
    heroImage: "/assets/dashboards/heroes/others-hero.png",
    templateLayout: "grid",
    templateGridCols: 4,
    templatesTitle: "Other Agreement Templates",
    verificationServices: DEFAULT_VERIFICATION_SERVICES,
    templates: [
      { label: "General Items Sale", icon: "accessories" },
      { label: "Equipment Sale", icon: "appliance" },
      { label: "Miscellaneous Sale", icon: "furniture" },
      { label: "Custom Agreement", icon: "console" },
      { label: "Others", icon: "more" },
    ],
  },
}

export const AGREEMENT_STATS = [
  { label: "Total Agreements", value: "128", subtext: "All time", color: "#2563EB", icon: "total" as const },
  { label: "Pending", value: "18", subtext: "Action required", color: "#F59E0B", icon: "pending" as const },
  { label: "Completed", value: "92", subtext: "All time", color: "#22C55E", icon: "completed" as const },
  { label: "Draft", value: "18", subtext: "Continue editing", color: "#A855F7", icon: "draft" as const },
]

/** Strip redundant suffixes from category display labels */
export function formatTemplateLabel(label: string): string {
  return label
    .replace(/\s+Sale(?:\s+Agreement)?$/i, "")
    .replace(/\s+Agreement$/i, "")
    .replace(/\s+Rental$/i, " Rental")
    .trim()
}

/** Show up to 8 templates in 4×2 grid; More/Others always last when truncating */
export function getTemplateGridItems(templates: DashboardTemplate[]): DashboardTemplate[] {
  const moreIndex = templates.findIndex(
    (t) => t.icon === "more" || /^others?$/i.test(t.label.trim())
  )
  const more: DashboardTemplate =
    moreIndex >= 0 ? templates[moreIndex] : { label: "More", icon: "more" }
  const rest = templates.filter((_, i) => i !== moreIndex)

  let items: DashboardTemplate[]
  if (templates.length <= 8) {
    items = moreIndex >= 0 ? [...rest, more] : templates.slice(0, 8)
  } else {
    items = [...rest.slice(0, 7), { label: "More", icon: "more" }]
  }

  return normalizeMoreLabel(items).map((t) => ({
    ...t,
    label: t.icon === "more" ? t.label : formatTemplateLabel(t.label),
  }))
}

function normalizeMoreLabel(items: DashboardTemplate[]): DashboardTemplate[] {
  return items.map((t, i) =>
    i === items.length - 1 && t.icon === "more" ? { ...t, label: "More" } : t
  )
}

/** @deprecated Use DEFAULT_VERIFICATION_SERVICES */
export const VERIFICATION_SERVICES = DEFAULT_VERIFICATION_SERVICES
