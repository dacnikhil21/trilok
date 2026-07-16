import * as React from "react"
import { ShieldCheck } from "lucide-react"
import { motion } from "framer-motion"

interface AuthLayoutProps {
  children: React.ReactNode
  heading?: string
  subheading?: string
}

export function AuthLayout({ children, heading, subheading }: AuthLayoutProps) {
  return (
    <main className="flex min-h-screen w-full flex-col bg-background relative overflow-hidden">
      {/* 
        High-fidelity ambient lighting canvas
      */}
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[50%] bg-primary/[0.05] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#D4AF37]/[0.03] rounded-full blur-[100px] pointer-events-none" />
      
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center p-0 sm:p-6 lg:p-8">
        <motion.div 
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: "spring", stiffness: 320, damping: 28, mass: 0.9 }}
          className="w-full h-full sm:h-auto sm:max-w-[480px] flex flex-col bg-transparent sm:bg-surface/50 sm:backdrop-blur-[24px] sm:rounded-[var(--radius-xl)] sm:shadow-[var(--shadow-level-2)] sm:border sm:border-white/20 overflow-hidden"
        >
          {/* Header & Body Content */}
          <div className="flex flex-col flex-1 px-6 pt-10 pb-10 sm:p-10 lg:p-12">
            <div className="flex flex-col items-center justify-center space-y-2 mb-10">
              <div className="w-10 h-10 rounded-full bg-primary/8 flex items-center justify-center border border-primary/10 shadow-[var(--shadow-level-1)]">
                <ShieldCheck strokeWidth={2.2} className="h-5.5 w-5.5 text-primary" />
              </div>
              <div className="flex flex-col items-center">
                <h1 className="text-[20px] font-display font-bold tracking-tight text-foreground leading-none">
                  eSaleAgreement
                </h1>
                <p className="text-[10px] font-bold tracking-widest uppercase text-secondary-text mt-1.5">
                  Secure • Verified • Trusted
                </p>
              </div>
            </div>

            {(heading || subheading) && (
              <div className="mb-8 space-y-2.5">
                {heading && (
                  <h2 className="text-[28px] font-display font-bold leading-tight text-foreground tracking-tight">
                    {heading}
                  </h2>
                )}
                {subheading && (
                  <p className="text-[14.5px] text-secondary-text leading-relaxed font-medium">
                    {subheading}
                  </p>
                )}
              </div>
            )}

            <div className="flex flex-col flex-1">
              {children}
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  )
}
