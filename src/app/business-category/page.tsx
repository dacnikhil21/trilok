import * as React from "react"
import { BusinessCategoryScreen } from "@/components/business-category/BusinessCategoryScreen"

export default function BusinessCategoryPage() {
  return (
    <React.Suspense
      fallback={
        <div className="mobile-app-shell flex items-center justify-center bg-[#F8FAFC]">
          <span className="h-8 w-8 animate-spin rounded-full border-4 border-[#2563EB] border-t-transparent" />
        </div>
      }
    >
      <BusinessCategoryScreen />
    </React.Suspense>
  )
}
