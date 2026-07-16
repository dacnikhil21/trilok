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
    <main className="flex min-h-screen w-full flex-col bg-background lg:bg-[#F9F9F7]">
      {/* 
        Desktop: Enterprise workspace feel with subtle radial gradient.
        Mobile: Clean Soft Ivory canvas.
      */}
      <div className="absolute inset-0 z-0 hidden lg:block bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-surface via-background to-background opacity-80" />
      
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center p-0 lg:p-8">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="w-full h-full lg:h-auto lg:max-w-[480px] flex flex-col bg-surface lg:rounded-[var(--radius-xl)] lg:shadow-[var(--shadow-level-2)] overflow-hidden"
        >
          {/* Header Area */}
          <div className="flex flex-col flex-1 px-6 pt-safe-top pb-safe-bottom lg:p-12">
            <div className="flex flex-col items-center justify-center space-y-2 mb-12 mt-10 lg:mt-0">
              <h1 className="text-[20px] font-display font-bold tracking-tight text-foreground flex items-center gap-2">
                <ShieldCheck className="h-6 w-6 text-primary" />
                eSaleAgreement
              </h1>
              <p className="text-[12px] font-medium tracking-widest uppercase text-secondary-text">
                Secure • Verified • Trusted
              </p>
            </div>

            {(heading || subheading) && (
              <div className="mb-10 space-y-3">
                {heading && (
                  <h2 className="text-[32px] font-display font-bold leading-tight text-foreground">
                    {heading}
                  </h2>
                )}
                {subheading && (
                  <p className="text-[16px] text-secondary-text leading-relaxed">
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
