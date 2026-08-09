export type BusinessCategoryId =
  | "mobile-electronics"
  | "bikes-cars"
  | "furniture-sale"
  | "rental-services"
  | "service-agreement"
  | "others"

export interface BusinessCategory {
  id: BusinessCategoryId
  title: string
  description: string
  dashboardRoute: string
}

export const BUSINESS_CATEGORIES: BusinessCategory[] = [
  {
    id: "mobile-electronics",
    title: "Mobile & Electronics",
    description: "Mobiles, laptops, tablets, accessories & other electronics.",
    dashboardRoute: "/dashboard/mobile",
  },
  {
    id: "bikes-cars",
    title: "Bikes or Cars",
    description: "Bikes, scooters, cars & automobile accessories.",
    dashboardRoute: "/dashboard/vehicle",
  },
  {
    id: "furniture-sale",
    title: "Furniture Sale",
    description: "Furniture and home decorative items.",
    dashboardRoute: "/dashboard/furniture",
  },
  {
    id: "rental-services",
    title: "Rental Services",
    description: "Property, PG, vehicle & other rental services.",
    dashboardRoute: "/dashboard/rental",
  },
  {
    id: "service-agreement",
    title: "Service Agreement",
    description: "Service contracts & agreement templates.",
    dashboardRoute: "/dashboard/service",
  },
  {
    id: "others",
    title: "Other's",
    description: "Other products and miscellaneous items.",
    dashboardRoute: "/dashboard/others",
  },
]

export function getCategoryById(id: BusinessCategoryId): BusinessCategory | undefined {
  return BUSINESS_CATEGORIES.find((category) => category.id === id)
}
