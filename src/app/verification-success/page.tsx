"use client"

import * as React from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { AuthLayout } from "@/components/layout/AuthLayout"
import { Button } from "@/components/ui/button"
import { ShieldCheck, ArrowRight, Sparkles } from "lucide-react"

function VerificationSuccessForm() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const moduleType = searchParams.get("module") || "c2c"

  const handleContinue = () => {
    router.push(`/dashboard?module=${moduleType}`)
  }

  return (
    <AuthLayout>
      <div className="flex flex-col items-center justify-center flex-1 py-6 text-center">
        {/* Animated Checked Circle and Verified Badge */}
        <div className="relative mb-8">
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: [0.6, 1.1, 1], opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="w-24 h-24 rounded-full bg-verified flex items-center justify-center border-2 border-primary/20 shadow-[0_0_30px_rgba(40,167,69,0.15)]"
          >
            <ShieldCheck className="w-12 h-12 text-primary" />
          </motion.div>

          {/* Sparkles effect */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="absolute -top-2 -right-2 text-primary"
          >
            <Sparkles className="w-6 h-6 animate-pulse" />
          </motion.div>
        </div>

        {/* Messaging */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="space-y-3"
        >
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-verified text-success text-[12px] font-bold uppercase tracking-wider mb-2">
            Verified Account
          </div>
          
          <h2 className="text-[28px] font-display font-bold leading-tight text-foreground">
            Identity Verified
          </h2>
          
          <p className="text-[15px] text-secondary-text max-w-sm mx-auto leading-relaxed">
            Institutional-grade eKYC check complete. Your digital signature authority is successfully active on the network.
          </p>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="w-full mt-12 pt-4"
        >
          <Button
            onClick={handleContinue}
            size="lg"
            className="w-full h-14 text-[16px] flex items-center justify-center gap-2 group"
          >
            Continue to Dashboard
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Button>
        </motion.div>
      </div>
    </AuthLayout>
  )
}

export default function VerificationSuccessPage() {
  return (
    <React.Suspense fallback={
      <div className="flex min-h-screen items-center justify-center bg-background">
        <span className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    }>
      <VerificationSuccessForm />
    </React.Suspense>
  )
}
