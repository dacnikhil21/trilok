"use client"

import * as React from "react"
import { AppContainer } from "@/components/ui/AppContainer"
import { PageHeader } from "@/components/ui/PageHeader"
import { LoginForm } from "@/components/auth/LoginForm"

export default function LoginPage() {
  return (
    <AppContainer centered>
      <PageHeader 
        title="Welcome back" 
        subtitle="Enter your mobile number to access your secure digital agreements." 
        showLogo
      />
      <LoginForm />
    </AppContainer>
  )
}
