"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"
import { Sparkles, ChevronRight, Layers } from "lucide-react"

interface AppContainerProps {
  children: React.ReactNode
  className?: string
  centered?: boolean
}

export function AppContainer({ children, className = "", centered = false }: AppContainerProps) {
  const router = useRouter()
  const [isOpen, setIsOpen] = React.useState(false)

  const devLinks = [
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
      
      {/* FLOATING DEVELOPER QUICK BYPASS PANEL */}
      <div className="fixed top-4 right-4 z-50 flex items-center gap-2">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="h-8 px-3 rounded-full backdrop-blur-md bg-primary/10 border border-primary/20 text-primary font-bold text-[11px] uppercase tracking-wider flex items-center gap-1.5 shadow-sm hover:bg-primary/15 transition-all"
        >
          <Sparkles className="w-3.5 h-3.5" />
          Quick Skip
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, x: 10, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 10, scale: 0.95 }}
              className="backdrop-blur-xl bg-surface/80 border border-border p-1.5 rounded-full shadow-lg flex items-center gap-1"
            >
              {devLinks.map((link) => (
                <button
                  key={link.path}
                  onClick={() => {
                    router.push(link.path)
                    setIsOpen(false)
                  }}
                  className="px-2.5 py-1 rounded-full text-[10px] font-bold text-secondary-text hover:text-primary hover:bg-primary/5 transition-all"
                >
                  {link.name}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className={`relative z-10 flex-1 flex flex-col ${centered ? "items-center justify-center p-0 sm:p-6 lg:p-8" : "w-full"}`}>
        {centered ? (
          <motion.div
            initial={{ opacity: 0, y: 25, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 320, damping: 28, mass: 0.9 }}
            className={`w-full h-full sm:h-auto sm:max-w-[480px] flex flex-col bg-transparent sm:bg-surface/50 sm:backdrop-blur-[24px] sm:rounded-[var(--radius-xl)] sm:shadow-[var(--shadow-level-2)] sm:border sm:border-white/20 overflow-hidden ${className}`}
          >
            <div className="flex flex-col flex-1 px-6 pt-10 pb-10 sm:p-10 lg:p-12">
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
