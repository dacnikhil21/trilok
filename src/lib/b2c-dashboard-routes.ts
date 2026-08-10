import type { AgreementType } from "@/lib/c2c-config"

/** B2C dashboard defaults for create-agreement flow */
export const B2C_DASHBOARD_DEFAULTS: Record<
  string,
  { type: AgreementType; category?: string }
> = {
  mobile: { type: "sale", category: "mobile-electronics" },
  vehicle: { type: "sale", category: "bike-car" },
  furniture: { type: "sale", category: "furniture" },
  rental: { type: "rental", category: "pg-rental" },
  service: { type: "service", category: "freelance" },
  others: { type: "sale", category: "others-sale" },
}

/** Reverse map: agreement category id → B2C dashboard route */
export const B2C_CATEGORY_TO_DASHBOARD: Record<string, string> = {
  "mobile-electronics": "mobile",
  "bike-car": "vehicle",
  furniture: "furniture",
  "others-sale": "others",
  "pg-rental": "rental",
  "vehicle-rental": "rental",
  "electronics-rental": "rental",
  "other-rental": "rental",
  freelance: "service",
  maid: "service",
  "home-repair": "service",
  "others-service": "service",
}

/** Template icon → product label for intro / wizard prefill */
export const B2C_TEMPLATE_PRODUCT: Record<string, string> = {
  phone: "Mobile Phone",
  laptop: "Laptop / Desktop",
  tablet: "Tablet",
  watch: "Smartwatch",
  camera: "Camera",
  tv: "Television",
  appliance: "Home Appliance",
  console: "Gaming Console",
  accessories: "Electronic Accessories",
  bike: "Bike",
  car: "Car",
  scooter: "Scooter",
  commercial: "Commercial Vehicle",
  "bike-loan": "Bike Loan",
  "car-loan": "Car Loan",
  "used-vehicle": "Used Vehicle",
  furniture: "Furniture",
  "office-furniture": "Office Furniture",
  "custom-furniture": "Custom Furniture",
  "used-furniture": "Used Furniture",
  "bulk-furniture": "Bulk Furniture",
  warranty: "Furniture Warranty",
  delivery: "Furniture Delivery",
  pg: "PG Rental",
  vehicle: "Vehicle Rental",
  electronics: "Electronics Rental",
  other: "Other Rentals",
  freelance: "Freelance",
  "it-services": "IT Services",
  cleaning: "Cleaning Services",
  maintenance: "Maintenance",
  installation: "Installation",
  more: "",
}

/** Dashboard-specific product labels when icon keys overlap across dashboards */
export const B2C_TEMPLATE_PRODUCT_BY_DASHBOARD: Record<string, Record<string, string>> = {
  others: {
    accessories: "General Items",
    appliance: "Equipment",
    furniture: "Miscellaneous Items",
    console: "Custom Agreement",
  },
}

/** Template icon → agreement type + category for B2C dashboards */
export const B2C_TEMPLATE_ROUTE: Record<string, Record<string, { type: AgreementType; category: string }>> = {
  mobile: {
    phone: { type: "sale", category: "mobile-electronics" },
    laptop: { type: "sale", category: "mobile-electronics" },
    tablet: { type: "sale", category: "mobile-electronics" },
    watch: { type: "sale", category: "mobile-electronics" },
    camera: { type: "sale", category: "mobile-electronics" },
    tv: { type: "sale", category: "mobile-electronics" },
    appliance: { type: "sale", category: "mobile-electronics" },
    console: { type: "sale", category: "mobile-electronics" },
    accessories: { type: "sale", category: "mobile-electronics" },
    more: { type: "sale", category: "mobile-electronics" },
  },
  vehicle: {
    bike: { type: "sale", category: "bike-car" },
    car: { type: "sale", category: "bike-car" },
    scooter: { type: "sale", category: "bike-car" },
    commercial: { type: "sale", category: "bike-car" },
    "bike-loan": { type: "sale", category: "bike-car" },
    "car-loan": { type: "sale", category: "bike-car" },
    "used-vehicle": { type: "sale", category: "bike-car" },
    more: { type: "sale", category: "bike-car" },
  },
  furniture: {
    furniture: { type: "sale", category: "furniture" },
    "office-furniture": { type: "sale", category: "furniture" },
    "custom-furniture": { type: "sale", category: "furniture" },
    "used-furniture": { type: "sale", category: "furniture" },
    "bulk-furniture": { type: "sale", category: "furniture" },
    warranty: { type: "sale", category: "furniture" },
    delivery: { type: "sale", category: "furniture" },
    more: { type: "sale", category: "furniture" },
  },
  rental: {
    pg: { type: "rental", category: "pg-rental" },
    vehicle: { type: "rental", category: "vehicle-rental" },
    electronics: { type: "rental", category: "electronics-rental" },
    other: { type: "rental", category: "other-rental" },
  },
  service: {
    freelance: { type: "service", category: "freelance" },
    "it-services": { type: "service", category: "freelance" },
    cleaning: { type: "service", category: "maid" },
    maintenance: { type: "service", category: "home-repair" },
    installation: { type: "service", category: "home-repair" },
    more: { type: "service", category: "others-service" },
  },
  others: {
    accessories: { type: "sale", category: "others-sale" },
    appliance: { type: "sale", category: "others-sale" },
    furniture: { type: "sale", category: "others-sale" },
    console: { type: "sale", category: "others-sale" },
    more: { type: "sale", category: "others-sale" },
  },
}

export function getB2CDashboardPath(dashboardId: string): string {
  return `/dashboard/${dashboardId}`
}

export function getB2CReturnPath(dashboardId?: string | null, categoryId?: string | null): string {
  if (dashboardId) return getB2CDashboardPath(dashboardId)
  if (categoryId && B2C_CATEGORY_TO_DASHBOARD[categoryId]) {
    return getB2CDashboardPath(B2C_CATEGORY_TO_DASHBOARD[categoryId])
  }
  return "/dashboard/mobile"
}

function buildCreateUrl(dashboardId: string, type: AgreementType, category: string, template?: string) {
  const params = new URLSearchParams({
    module: "b2c",
    dashboard: dashboardId,
    type,
    category,
  })
  if (template) params.set("template", template)
  return `/create-agreement?${params.toString()}`
}

export function getB2CTemplateCreateUrl(dashboardId: string, templateIcon: string): string {
  const mapped = B2C_TEMPLATE_ROUTE[dashboardId]?.[templateIcon]
  const defaults = B2C_DASHBOARD_DEFAULTS[dashboardId]
  const template = templateIcon !== "more" ? templateIcon : undefined

  if (mapped) {
    return buildCreateUrl(dashboardId, mapped.type, mapped.category, template)
  }

  if (defaults?.category) {
    return buildCreateUrl(dashboardId, defaults.type, defaults.category, template)
  }

  return buildCreateUrl("mobile", "sale", "mobile-electronics", template)
}

export function getB2CCreateUrl(dashboardId: string): string {
  const defaults = B2C_DASHBOARD_DEFAULTS[dashboardId]
  if (!defaults?.category) {
    return `/create-agreement?module=b2c&dashboard=${dashboardId}&type=${defaults?.type ?? "sale"}`
  }
  return buildCreateUrl(dashboardId, defaults.type, defaults.category)
}

export function getB2CProductLabel(
  templateKey?: string | null,
  dashboardId?: string | null
): string | null {
  if (!templateKey) return null
  if (dashboardId && B2C_TEMPLATE_PRODUCT_BY_DASHBOARD[dashboardId]?.[templateKey]) {
    return B2C_TEMPLATE_PRODUCT_BY_DASHBOARD[dashboardId][templateKey]
  }
  if (!B2C_TEMPLATE_PRODUCT[templateKey]) return null
  const label = B2C_TEMPLATE_PRODUCT[templateKey]
  return label || null
}
