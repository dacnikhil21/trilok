"use client"

import * as React from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { C2CDashboardScreen } from "@/components/dashboard/C2CDashboardScreen"

function DashboardContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const moduleType = (searchParams.get("module") || "c2c").toLowerCase()

  React.useEffect(() => {
    if (moduleType === "b2c") {
      router.replace("/business-category")
    }
  }, [moduleType, router])

  if (moduleType === "b2c") {
    return (
      <div className="mobile-app-shell flex items-center justify-center bg-white">
        <span className="h-8 w-8 animate-spin rounded-full border-4 border-[#2563EB] border-t-transparent" />
      </div>
    )
  }

  return <C2CDashboardScreen />
}

export default function DashboardPage() {
  return (
    <React.Suspense
      fallback={
        <div className="mobile-app-shell flex items-center justify-center bg-[#F8FAFC]">
          <span className="h-8 w-8 animate-spin rounded-full border-4 border-[#2563EB] border-t-transparent" />
        </div>
      }
    >
      <DashboardContent />
    </React.Suspense>
  )
}
