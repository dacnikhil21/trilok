"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { ShieldCheck, Lock, Award, Download } from "lucide-react"
import { AppShell } from "@/components/layout/AppShell"
import { BrandLogo } from "@/components/ui/BrandLogo"

export default function Home() {
  const router = useRouter()
  const [isMounted, setIsMounted] = React.useState(false)

  React.useEffect(() => {
    setIsMounted(true)
    const timer = setTimeout(() => {
      router.push("/login")
    }, 3000)
    return () => clearTimeout(timer)
  }, [router])

  if (!isMounted) return null

  return (
    <AppShell
      backgroundClassName="bg-[#fcfcfc]"
      contentClassName="flex min-h-full flex-col px-5 py-2"
      footer={
        <div className="px-5">
          <button
            type="button"
            onClick={() => router.push("/login")}
            className="flex h-[52px] w-full items-center justify-center gap-2.5 rounded-[14px] bg-[#0033A0] text-white shadow-lg transition-transform active:scale-[0.98]"
          >
            <Download className="h-5 w-5" strokeWidth={2.5} />
            <span className="text-[17px] font-bold tracking-wide">Get Started</span>
          </button>
        </div>
      }
    >
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mt-2 flex w-full shrink-0 flex-col items-center"
      >
        <BrandLogo variant="splash" priority className="w-full max-w-[300px]" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="my-auto flex w-full flex-1 items-center justify-center"
      >
        <div className="aspect-[1.52] w-full max-w-[340px] flex-shrink-0 overflow-hidden rounded-[20px] border border-gray-100 bg-white shadow-sm">
        <video
          autoPlay
          muted
          playsInline
          // Redirect when the video naturally finishes playing!
          onEnded={() => router.push("/login")}
          // scale-[1.18] pushes the right-side black border completely outside the hidden overflow
          className="w-full h-full object-cover scale-[1.18]"
          src="/splash%20screen.jpg%20(2).mp4"
        />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mb-2 flex w-full shrink-0 flex-col items-center text-center"
      >
        {/* Headlines */}
        <h1 className="text-[28px] font-display font-extrabold leading-[1.15] text-[#041B4A] tracking-tight">
          Secure Every Sale<br/>
          <span className="text-[#1E9E40]">Digitally</span>
        </h1>
        
        <p className="mt-2.5 text-[14px] font-medium text-[#041B4A]/80 max-w-[280px] leading-relaxed">
          India's Trusted Platform for<br/>Secure <span className="text-[#1E9E40] font-bold">Digital</span> Agreements
        </p>

        {/* Trust Badges */}
        <div className="flex items-center justify-center gap-3 w-full mt-5 mb-5">
          <div className="flex items-center gap-1">
            <ShieldCheck className="w-4.5 h-4.5 text-[#0033A0]" strokeWidth={2.2} />
            <span className="text-[11.5px] font-bold text-[#041B4A]">100% Legal</span>
          </div>
          <div className="w-[1px] h-5 bg-gray-200" />
          <div className="flex items-center gap-1">
            <Lock className="w-4.5 h-4.5 text-[#0033A0]" strokeWidth={2.2} />
            <span className="text-[11.5px] font-bold text-[#041B4A]">Secure</span>
          </div>
          <div className="w-[1px] h-5 bg-gray-200" />
          <div className="flex items-center gap-1">
            <Award className="w-4.5 h-4.5 text-[#0033A0]" strokeWidth={2.2} />
            <span className="text-[11.5px] font-bold text-[#041B4A]">Trusted</span>
          </div>
        </div>

        {/* Call to Action moved to AppShell footer */}
      </motion.div>
    </AppShell>
  )
}
