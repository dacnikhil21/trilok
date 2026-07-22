"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { ShieldCheck, Lock, Award, Download } from "lucide-react"

export default function Home() {
  const router = useRouter()
  const [isMounted, setIsMounted] = React.useState(false)

  React.useEffect(() => {
    setIsMounted(true)
    // Splash screen timer set to 3 seconds
    const timer = setTimeout(() => {
      router.push("/login")
    }, 3000)
    return () => clearTimeout(timer)
  }, [])

  if (!isMounted) return null

  return (
    <div className="h-[100dvh] w-full bg-[#fcfcfc] flex flex-col items-center justify-between px-5 py-6 overflow-hidden">
      
      {/* Top Logo Section */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center shrink-0 w-full mt-2"
      >
        <div className="w-[320px] h-[105px] overflow-hidden relative flex justify-center">
          <img 
            src="/logo.png" 
            alt="eSaleAgreement Logo" 
            className="absolute top-0 w-full max-w-none h-auto object-contain"
          />
        </div>
      </motion.div>

      {/* Central Video Section */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="w-full max-w-[340px] aspect-[1.52] rounded-[20px] overflow-hidden bg-white shadow-sm border border-gray-100 flex-shrink-0 my-auto"
      >
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
      </motion.div>

      {/* Bottom Content Section */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="w-full flex flex-col items-center text-center shrink-0 mb-2"
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

        {/* Call to Action Button */}
        <button
          onClick={() => router.push("/login")}
          className="w-full h-[52px] bg-[#0033A0] text-white rounded-[14px] flex items-center justify-center gap-2.5 shadow-lg active:scale-[0.98] transition-transform"
        >
          <Download className="w-5 h-5" strokeWidth={2.5} />
          <span className="text-[17px] font-bold tracking-wide">Get Started</span>
        </button>
      </motion.div>
    </div>
  )
}
