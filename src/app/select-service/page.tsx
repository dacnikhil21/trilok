"use client"

import * as React from "react"
import { AppContainer } from "@/components/ui/AppContainer"
import { PageHeader } from "@/components/ui/PageHeader"
import { ServiceSelectionForm } from "@/components/auth/ServiceSelectionForm"

export default function SelectServicePage() {
  return (
    <AppContainer centered>
      <PageHeader 
        title="Choose your service" 
        subtitle="Select your identity to personalize your digital agreement workspace." 
        showLogo
      />
      <ServiceSelectionForm />
    </AppContainer>
  )
}
