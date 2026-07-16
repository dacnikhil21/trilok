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
    <main className="flex min-h-screen w-full flex-col bg-background">
      {/* 
        Enterprise radial background layer.
      */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-background to-background opacity-70 pointer-events-none" />
      
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center p-0 sm:p-6 lg:p-8">
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="w-full h-full sm:h-auto sm:max-w-[480px] flex flex-col bg-transparent sm:bg-surface sm:rounded-[var(--radius-xl)] sm:shadow-[var(--shadow-level-2)] sm:border sm:border-border/50 overflow-hidden"
        >
          {/* Header & Body Area */}
          <div className="flex flex-col flex-1 px-6 pt-8 pb-10 sm:p-10 lg:p-12">
            <div className="flex flex-col items-center justify-center space-y-1.5 mb-10">
              <h1 className="text-[22px] font-display font-bold tracking-tight text-foreground flex items-center gap-2">
                <ShieldCheck strokeWidth={2.5} className="h-6 w-6 text-primary" />
                eSaleAgreement
              </h1>
              <p className="text-[11px] font-bold tracking-widest uppercase text-secondary-text">
                Secure • Verified • Trusted
              </p>
            </div>

            {(heading || subheading) && (
              <div className="mb-8 space-y-2.5">
                {heading && (
                  <h2 className="text-[28px] font-display font-bold leading-tight text-foreground tracking-tight">
                    {heading}
                  </h2>
                )}
                {subheading && (
                  <p className="text-[15px] text-secondary-text leading-relaxed">
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
