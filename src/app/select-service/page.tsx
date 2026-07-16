"use client"

import { AuthLayout } from "@/components/layout/AuthLayout"
import { ServiceSelectionForm } from "@/components/auth/ServiceSelectionForm"

export default function SelectServicePage() {
  return (
    <AuthLayout
      heading="Choose your service"
      subheading="Select your identity to personalize your digital agreement workspace."
    >
      <ServiceSelectionForm />
    </AuthLayout>
  )
}
