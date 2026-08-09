"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"
import { Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

interface AppContainerProps {
  children: React.ReactNode
  className?: string
  centered?: boolean
}

/** Thin wrapper for dev tools only. App shell lives in MobileAppShell / MobileScreen. */
export function AppContainer({ children, className = "" }: AppContainerProps) {
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
    <>
      {process.env.NODE_ENV === "development" && (
        <div className="fixed bottom-4 right-4 z-[100] flex flex-col items-end gap-2">
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            whileTap={{ scale: 0.9 }}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-slate-900/80 text-white opacity-40 shadow-lg backdrop-blur-xl transition-all hover:bg-slate-900 hover:opacity-100"
            title="Dev Quick Skip"
          >
            <motion.div animate={{ rotate: isOpen ? 45 : 0 }} transition={{ duration: 0.2 }}>
              <Sparkles className="h-3.5 w-3.5" />
            </motion.div>
          </motion.button>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: -8, scale: 0.92 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.92 }}
                transition={{ type: "spring", stiffness: 380, damping: 28 }}
                className="grid w-[168px] grid-cols-2 gap-1.5 rounded-[16px] border border-white/10 bg-slate-900/95 p-2.5 text-white shadow-2xl backdrop-blur-xl"
              >
                <p className="col-span-2 px-1 pb-0.5 text-[9px] font-bold uppercase tracking-widest text-slate-400">
                  Dev Navigation
                </p>
                {devLinks.map((link) => (
                  <button
                    key={link.path}
                    onClick={() => {
                      router.push(link.path)
                      setIsOpen(false)
                    }}
                    className="rounded-[8px] px-2 py-1 text-left text-[11px] font-bold text-slate-300 transition-all hover:bg-white/10 hover:text-white"
                  >
                    {link.name}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      <div className={cn("h-full w-full", className)}>{children}</div>
    </>
  )
}
