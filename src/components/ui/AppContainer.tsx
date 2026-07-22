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

      {/* ── DEVELOPER QUICK SKIP FAB (Top-Right to prevent bottom nav overlap) ─── */}
      <div className="fixed top-4 right-4 z-[100] flex flex-col items-end gap-2">

        {/* FAB Toggle Button */}
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          whileTap={{ scale: 0.9 }}
          className="w-8 h-8 rounded-full backdrop-blur-xl bg-slate-900/80 border border-white/20 text-white flex items-center justify-center shadow-lg hover:bg-slate-900 transition-all opacity-40 hover:opacity-100"
          title="Dev Quick Skip"
        >
          <motion.div animate={{ rotate: isOpen ? 45 : 0 }} transition={{ duration: 0.2 }}>
            <Sparkles className="w-3.5 h-3.5" />
          </motion.div>
        </motion.button>

        {/* Expanded Nav Grid */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.92 }}
              transition={{ type: "spring", stiffness: 380, damping: 28 }}
              className="backdrop-blur-xl bg-slate-900/95 border border-white/10 text-white rounded-[16px] shadow-2xl p-2.5 grid grid-cols-2 gap-1.5 w-[168px]"
            >
              <p className="col-span-2 text-[9px] font-bold uppercase tracking-widest text-slate-400 px-1 pb-0.5">Dev Navigation</p>
              {devLinks.map((link) => (
                <button
                  key={link.path}
                  onClick={() => {
                    router.push(link.path)
                    setIsOpen(false)
                  }}
                  className="px-2 py-1 rounded-[8px] text-[11px] font-bold text-slate-300 hover:text-white hover:bg-white/10 transition-all text-left"
                >
                  {link.name}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── MAIN CONTENT ─────────────────────────────────────────────────────── */}
      <div className={`relative z-10 flex-1 flex flex-col ${centered ? "items-center justify-start sm:justify-center p-0 sm:p-6 lg:p-8 min-h-screen" : "w-full"}`}>
        {centered ? (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.99 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 320, damping: 28, mass: 0.9 }}
            className={`w-full min-h-screen sm:min-h-0 flex flex-col bg-surface rounded-none border-0 shadow-none sm:rounded-[24px] sm:border sm:border-primary/10 sm:shadow-[0_12px_40px_rgba(10,92,54,0.06)] overflow-hidden sm:max-w-[440px] ${className}`}
          >
            <div className="flex flex-col flex-1 p-0 sm:p-4">
              {children}
            </div>
          </motion.div>
        ) : (
          <div className={`flex flex-col flex-1 w-full min-h-screen bg-surface ${className}`}>
            {children}
          </div>
        )}
      </div>
    </div>
  )
}
