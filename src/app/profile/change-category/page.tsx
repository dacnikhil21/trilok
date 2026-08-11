"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

/** Redirect to business category picker in profile/settings mode */
export default function ChangeCategoryPage() {
  const router = useRouter()

  useEffect(() => {
    router.replace("/business-category?from=profile")
  }, [router])

  return null
}
