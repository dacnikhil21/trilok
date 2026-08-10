export type AgreementType = "sale" | "rental" | "service"

export interface AgreementTypeConfig {
  id: AgreementType
  title: string
  description: string
  color: string
  colorLight: string
  buttonClass: string
}

export interface AgreementCategory {
  id: string
  title: string
  description: string
  introTitle: string
  introItems: string[]
  icon: "mobile" | "vehicle" | "furniture" | "other" | "pg" | "electronics-rental" | "freelance" | "maid" | "repair"
}

export const AGREEMENT_TYPES: AgreementTypeConfig[] = [
  {
    id: "sale",
    title: "Sale Agreement",
    description: "Create agreement for buying & selling items",
    color: "#2563EB",
    colorLight: "#EFF6FF",
    buttonClass: "bg-[#2563EB] hover:bg-[#1D4ED8]",
  },
  {
    id: "rental",
    title: "Rental Agreement",
    description: "Create agreement for renting property or items",
    color: "#10B981",
    colorLight: "#ECFDF5",
    buttonClass: "bg-[#10B981] hover:bg-[#059669]",
  },
  {
    id: "service",
    title: "Service Agreement",
    description: "Create agreement for services & contracts",
    color: "#9333EA",
    colorLight: "#F5F3FF",
    buttonClass: "bg-[#9333EA] hover:bg-[#7E22CE]",
  },
]

export const SALE_CATEGORIES: AgreementCategory[] = [
  {
    id: "mobile-electronics",
    title: "Mobile Phone & Electronics Sale",
    description: "For selling mobile phones, laptops, tablets, cameras and other electronic items.",
    introTitle: "Create Agreement for Mobile & Electronics Sale",
    introItems: ["Mobile Phones", "Laptops / Desktops", "Tablets", "Smartwatches", "Cameras", "TV & Home Appliances", "Other Electronic Items"],
    icon: "mobile",
  },
  {
    id: "bike-car",
    title: "Bike or Car Sale",
    description: "For selling bikes, scooters or cars (used or new).",
    introTitle: "Create Agreement for Bike or Car Sale",
    introItems: ["Bike Sale", "Scooter Sale", "Car Sale", "Used Vehicle Sale", "Commercial Vehicle Sale"],
    icon: "vehicle",
  },
  {
    id: "furniture",
    title: "Furniture Sale",
    description: "For selling furniture, home decor and furnishing items.",
    introTitle: "Create Agreement for Furniture Sale",
    introItems: ["Home Furniture", "Office Furniture", "Used Furniture", "Custom Furniture", "Bulk Furniture Sale"],
    icon: "furniture",
  },
  {
    id: "others-sale",
    title: "Others Sale",
    description: "For all other items and products.",
    introTitle: "Create Agreement for Other Items Sale",
    introItems: ["General Items", "Personal Property", "Collectibles", "Miscellaneous Products"],
    icon: "other",
  },
]

export const RENTAL_CATEGORIES: AgreementCategory[] = [
  {
    id: "pg-rental",
    title: "PG Rental",
    description: "Agreement for paying guests, rooms or sharing basis.",
    introTitle: "Create Agreement for PG Rental",
    introItems: ["PG / Hostel Rooms", "Shared Accommodation", "Monthly Rent Terms", "Security Deposit"],
    icon: "pg",
  },
  {
    id: "vehicle-rental",
    title: "Vehicle Rental",
    description: "Agreement for renting cars, bikes or scooters.",
    introTitle: "Create Agreement for Vehicle Rental",
    introItems: ["Car Rental", "Bike Rental", "Scooter Rental", "Commercial Vehicle Rental"],
    icon: "vehicle",
  },
  {
    id: "electronics-rental",
    title: "Electronic Rentals",
    description: "Agreement for renting laptops, cameras and electronics.",
    introTitle: "Create Agreement for Electronic Rentals",
    introItems: ["Laptop Rental", "Camera Rental", "Projector Rental", "Other Electronics"],
    icon: "electronics-rental",
  },
  {
    id: "other-rental",
    title: "Other Services Rental",
    description: "Agreement for other rental services.",
    introTitle: "Create Agreement for Other Rentals",
    introItems: ["Equipment Rental", "Tool Rental", "Event Equipment", "Other Rental Services"],
    icon: "other",
  },
]

export const SERVICE_CATEGORIES: AgreementCategory[] = [
  {
    id: "freelance",
    title: "Freelance Contracts",
    description: "Agreement for freelance and project-based work.",
    introTitle: "Create Agreement for Freelance Contracts",
    introItems: ["Project based work", "Content writing", "Design services", "Consulting", "Software development"],
    icon: "freelance",
  },
  {
    id: "maid",
    title: "Maid Agreements",
    description: "Agreement for domestic help and maid services.",
    introTitle: "Create Agreement for Maid Agreements",
    introItems: ["Full time maid", "Part time maid", "Salary & payment terms", "Work responsibilities"],
    icon: "maid",
  },
  {
    id: "home-repair",
    title: "Home Repair Services",
    description: "Agreement for plumbing, electrical and repair work.",
    introTitle: "Create Agreement for Home Repair Services",
    introItems: ["Plumbing", "Electrical work", "Carpentry", "Appliance repair", "General maintenance"],
    icon: "repair",
  },
  {
    id: "others-service",
    title: "Other's",
    description: "Agreement for other service types.",
    introTitle: "Create Agreement for Other Services",
    introItems: ["Coaching / Training", "Legal Services", "Event Services", "Custom Services"],
    icon: "other",
  },
]

export function getCategoriesForType(type: AgreementType): AgreementCategory[] {
  switch (type) {
    case "sale":
      return SALE_CATEGORIES
    case "rental":
      return RENTAL_CATEGORIES
    case "service":
      return SERVICE_CATEGORIES
  }
}

export function getTypeConfig(type: AgreementType): AgreementTypeConfig {
  return AGREEMENT_TYPES.find((t) => t.id === type) ?? AGREEMENT_TYPES[0]
}

export function findCategory(type: AgreementType, categoryId: string): AgreementCategory | undefined {
  return getCategoriesForType(type).find((c) => c.id === categoryId)
}

export const C2C_VERIFICATION_SERVICES = [
  { label: "Aadhaar Verification", description: "Verify Aadhaar instantly", color: "#2563EB", icon: "aadhaar" as const },
  { label: "PAN Verification", description: "Check PAN details", color: "#10B981", icon: "pan" as const },
  { label: "GSTIN Verification", description: "Verify GSTIN", color: "#9333EA", icon: "gstin" as const },
  { label: "Driving Licence Verification", description: "Verify DL", color: "#2563EB", icon: "driving-licence" as const },
  { label: "Udyam Verification", description: "Verify Udyam", color: "#F97316", icon: "udyam" as const },
  { label: "RC Verification", description: "Verify RC", color: "#14B8A6", icon: "rc" as const },
]

export function getTypeTitle(type: AgreementType): string {
  return `${type.charAt(0).toUpperCase()}${type.slice(1)} Agreement`
}
