"use client"

import { AuthLayout } from "@/components/layout/AuthLayout"
import { LoginForm } from "@/components/auth/LoginForm"

export default function LoginPage() {
  return (
    <AuthLayout
      heading="Welcome back"
      subheading="Enter your mobile number to access your secure digital agreements."
    >
      <LoginForm />
    </AuthLayout>
  )
}
