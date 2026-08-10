export interface DashboardTemplate {
  label: string
  icon: "phone" | "laptop" | "tablet" | "watch" | "camera" | "tv" | "appliance" | "console" | "accessories" | "more"
  | "bike" | "car" | "scooter" | "commercial" | "bike-loan" | "car-loan" | "used-vehicle"
  | "furniture" | "office-furniture" | "custom-furniture" | "used-furniture" | "bulk-furniture" | "warranty" | "delivery"
  | "freelance" | "it-services" | "cleaning" | "maintenance" | "installation"
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
  templatesTitle?: string
  templates?: DashboardTemplate[]
  templateLayout?: "grid" | "scroll"
  templateGridCols?: 3 | 4
  rentalCategories?: RentalCategory[]
  rentalCategoriesTitle?: string
  verificationServices?: VerificationService[]
}

export const DEFAULT_VERIFICATION_SERVICES: VerificationService[] = [
  { icon: "aadhaar", label: "Aadhaar Verification", color: "#2563EB" },
  { icon: "pan", label: "PAN Verification", color: "#22C55E" },
  { icon: "gstin", label: "GSTIN Verification", color: "#A855F7" },
  { icon: "driving-licence", label: "Driving Licence Verification", color: "#2563EB" },
  { icon: "udyam", label: "Udyam Verification", color: "#F97316" },
  { icon: "rc", label: "RC Verification", color: "#14B8A6" },
  { icon: "more", label: "More", color: "#2563EB" },
]

export const FURNITURE_VERIFICATION_SERVICES: VerificationService[] = [
  { icon: "aadhaar", label: "Aadhaar Verification", color: "#2563EB" },
  { icon: "pan", label: "PAN Verification", color: "#22C55E" },
  { icon: "gstin", label: "GSTIN Verification", color: "#A855F7" },
  { icon: "driving-licence", label: "Driving Licence Verification", color: "#2563EB" },
  { icon: "utilities", label: "Utilities Verification", color: "#F97316" },
  { icon: "more", label: "More", color: "#2563EB" },
]

export const RENTAL_VERIFICATION_SERVICES = FURNITURE_VERIFICATION_SERVICES

export const SERVICE_VERIFICATION_SERVICES: VerificationService[] = [
  { icon: "aadhaar", label: "Aadhaar Verification", color: "#2563EB" },
  { icon: "pan", label: "PAN Verification", color: "#22C55E" },
  { icon: "gstin", label: "GSTIN Verification", color: "#A855F7" },
  { icon: "driving-licence", label: "Driving Licence Verification", color: "#2563EB" },
  { icon: "udyam", label: "Udyam Verification", color: "#F97316" },
  { icon: "more", label: "More", color: "#2563EB" },
]

export const DASHBOARD_CONFIGS: Record<string, DashboardConfig> = {
  mobile: {
    id: "mobile",
    greeting: "Hello, Ravi Mobiles 👋",
    headlinePrefix: "Manage your",
    headlineHighlight: "Mobile & Electronics",
    headlineSuffix: "agreements easily",
    subtext: "Create, eSign and manage your Mobile & Electronics agreements securely.",
    highlightColor: "#2563EB",
    heroGradient: "from-[#EFF6FF] to-[#F8FAFC]",
    templateLayout: "grid",
    templateGridCols: 3,
    templatesTitle: "Mobile & Electronics Agreement Templates",
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
    heroGradient: "from-[#EFF6FF] to-[#F8FAFC]",
    templateLayout: "grid",
    templateGridCols: 4,
    templatesTitle: "Bikes & Cars Agreement Templates",
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
    heroGradient: "from-[#ECFDF5] to-[#F8FAFC]",
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
    heroGradient: "from-[#EFF6FF] to-[#F8FAFC]",
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
    heroGradient: "from-[#EFF6FF] to-[#F8FAFC]",
    templateLayout: "scroll",
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
    heroGradient: "from-[#FFF7ED] to-[#F8FAFC]",
  },
}

export const AGREEMENT_STATS = [
  { label: "Total Agreements", value: "128", subtext: "All time", color: "#2563EB", icon: "total" as const },
  { label: "Pending", value: "18", subtext: "Action required", color: "#F59E0B", icon: "pending" as const },
  { label: "Completed", value: "92", subtext: "All time", color: "#22C55E", icon: "completed" as const },
  { label: "Draft", value: "18", subtext: "Not submitted", color: "#A855F7", icon: "draft" as const },
]

/** @deprecated Use DEFAULT_VERIFICATION_SERVICES */
export const VERIFICATION_SERVICES = DEFAULT_VERIFICATION_SERVICES
