"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"
import { Sparkles } from "lucide-react"

interface AppContainerProps {
  children: React.ReactNode
  className?: string
  centered?: boolean
}

export function AppContainer({ children, className = "", centered = false }: AppContainerProps) {
  const router = useRouter()
  const [isOpen, setIsOpen] = React.useState(false)

  const devLinks = [
    { name: "Splash", path: "/splash" },
    { name: "Login", path: "/login" },
    { name: "Service", path: "/select-service" },
    { name: "Register", path: "/register?module=c2c" },
    { name: "Verify", path: "/verify-identity?module=c2c" },
    { name: "Success", path: "/verification-success?module=c2c" },
    { name: "Dashboard", path: "/dashboard?module=c2c" },
  ]

  return (
    <div className="min-h-screen w-full bg-background relative overflow-hidden flex flex-col">
      {/* Premium ambient glows */}
      <div className="absolute top-[-15%] left-[-10%] w-[55%] h-[45%] bg-primary/[0.04] rounded-full blur-[110px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[45%] bg-[#D4AF37]/[0.02] rounded-full blur-[110px] pointer-events-none" />

      {/* ── DEVELOPER QUICK SKIP FAB ──────────────────────────────────────────── */}
      {/* Compact round FAB that expands UPWARD — never overflows the screen */}
      <div className="fixed bottom-5 right-4 z-50 flex flex-col-reverse items-end gap-2">

        {/* FAB Toggle Button */}
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          whileTap={{ scale: 0.9 }}
          className="w-10 h-10 rounded-full backdrop-blur-xl bg-primary/12 border border-primary/20 text-primary flex items-center justify-center shadow-[0_4px_16px_rgba(10,92,54,0.15)] hover:bg-primary/18 transition-all"
          title="Dev Quick Skip"
        >
          <motion.div animate={{ rotate: isOpen ? 45 : 0 }} transition={{ duration: 0.2 }}>
            <Sparkles className="w-4 h-4" />
          </motion.div>
        </motion.button>

        {/* Expanded Nav Grid — opens upward, 2 columns, max-width 180px stays within right edge */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.92 }}
              transition={{ type: "spring", stiffness: 380, damping: 28 }}
              className="backdrop-blur-xl bg-surface/90 border border-border rounded-[16px] shadow-[0_8px_32px_rgba(0,0,0,0.1)] p-2.5 grid grid-cols-2 gap-1.5 w-[168px]"
            >
              <p className="col-span-2 text-[9px] font-bold uppercase tracking-widest text-secondary-text/60 px-1 pb-0.5">Dev Navigation</p>
              {devLinks.map((link) => (
                <button
                  key={link.path}
                  onClick={() => {
                    router.push(link.path)
                    setIsOpen(false)
                  }}
                  className="px-2.5 py-1.5 rounded-[10px] text-[11px] font-bold text-secondary-text hover:text-primary hover:bg-primary/6 transition-all text-left"
                >
                  {link.name}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── MAIN CONTENT ─────────────────────────────────────────────────────── */}
      {/* 
        Mobile: top-aligned (justify-start) so content flows from top, no floating effect
        Desktop (sm+): centered card layout (sm:justify-center)
      */}
      <div className={`relative z-10 flex-1 flex flex-col ${centered ? "items-center justify-start sm:justify-center p-0 sm:p-6 lg:p-8" : "w-full"}`}>
        {centered ? (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 320, damping: 28, mass: 0.9 }}
            className={`w-full flex flex-col bg-transparent sm:h-auto sm:max-w-[480px] sm:bg-surface/50 sm:backdrop-blur-[24px] sm:rounded-[var(--radius-xl)] sm:shadow-[var(--shadow-level-2)] sm:border sm:border-white/20 overflow-hidden ${className}`}
          >
            {/* Mobile: pt-10 gives comfortable breathing room from phone status bar */}
            {/* Desktop (sm+): generous symmetric padding for the floating card */}
            <div className="flex flex-col flex-1 px-5 pt-10 pb-8 sm:p-10 lg:p-12">
              {children}
            </div>
          </motion.div>
        ) : (
          <div className={`flex flex-col flex-1 w-full ${className}`}>
            {children}
          </div>
        )}
      </div>
    </div>
  )
}
