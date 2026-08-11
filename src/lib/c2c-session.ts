const C2C_FROM_DASHBOARD_KEY = "c2c-from-dashboard"

/** Mark that the user entered create flow from the C2C home dashboard (not the FAB). */
export function setC2CFromDashboard(): void {
  if (typeof window === "undefined") return
  sessionStorage.setItem(C2C_FROM_DASHBOARD_KEY, "true")
}

export function clearC2CFromDashboard(): void {
  if (typeof window === "undefined") return
  sessionStorage.removeItem(C2C_FROM_DASHBOARD_KEY)
}

export function isC2CFromDashboard(): boolean {
  if (typeof window === "undefined") return false
  return sessionStorage.getItem(C2C_FROM_DASHBOARD_KEY) === "true"
}

/** Floating hero PNG per agreement category — transparent, no white tile */
export const C2C_CATEGORY_HERO: Record<string, string> = {
  "mobile-electronics": "/assets/dashboards/heroes/mobile-hero.png",
  "bike-car": "/assets/dashboards/heroes/vehicle-hero.png",
  furniture: "/assets/dashboards/heroes/furniture-hero.png",
  "others-sale": "/assets/dashboards/heroes/others-hero.png",
  "pg-rental": "/assets/dashboards/heroes/rental-hero.png",
  "vehicle-rental": "/assets/dashboards/heroes/vehicle-hero.png",
  "electronics-rental": "/assets/dashboards/heroes/mobile-hero.png",
  "other-rental": "/assets/dashboards/heroes/rental-hero.png",
  freelance: "/assets/dashboards/heroes/service-hero.png",
  maid: "/assets/dashboards/heroes/service-hero.png",
  "home-repair": "/assets/dashboards/heroes/service-hero.png",
  "others-service": "/assets/dashboards/heroes/others-hero.png",
}

export function getC2CCategoryHero(categoryId: string): string {
  return C2C_CATEGORY_HERO[categoryId] ?? "/assets/dashboards/heroes/c2c-hero.png"
}
