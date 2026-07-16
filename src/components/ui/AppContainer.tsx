"use client"

import * as React from "react"
import { motion } from "framer-motion"

interface AppContainerProps {
  children: React.ReactNode
  className?: string
  centered?: boolean
}

export function AppContainer({ children, className = "", centered = false }: AppContainerProps) {
  return (
    <div className="min-h-screen w-full bg-background relative overflow-hidden flex flex-col">
      {/* Premium ambient glows */}
      <div className="absolute top-[-15%] left-[-10%] w-[55%] h-[45%] bg-primary/[0.04] rounded-full blur-[110px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[45%] bg-[#D4AF37]/[0.02] rounded-full blur-[110px] pointer-events-none" />
      
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
