"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { User, Briefcase, Store, ArrowUpRight, CheckCircle2 } from "lucide-react"
import { cn } from "@/lib/utils"

const SERVICES = [
  {
    id: "c2c",
    title: "C2C",
    subtitle: "Consumer to Consumer",
    description: "Peer-to-peer agreements between individuals. Verified, legally binding.",
    icon: User,
    tag: "Personal",
    accent: "#0A5C36",
  },
  {
    id: "b2b",
    title: "B2B",
    subtitle: "Business to Business",
    description: "Enterprise-grade contracts between companies. GST-compliant & audited.",
    icon: Briefcase,
    tag: "Enterprise",
    accent: "#0A5C36",
  },
  {
    id: "b2c",
    title: "B2C",
    subtitle: "Business to Customer",
    description: "Merchant agreements with customers. Built for scale & compliance.",
    icon: Store,
    tag: "Merchant",
    accent: "#0A5C36",
  },
]

export function ServiceSelectionForm() {
  const router = useRouter()
  const [selectedId, setSelectedId] = React.useState<string | null>(null)

  const handleSelect = (id: string) => {
    setSelectedId(id)
    setTimeout(() => {
      router.push(`/register?module=${id}`)
    }, 420)
  }

  const container: import("framer-motion").Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.05 }
    }
  }

  const item: import("framer-motion").Variants = {
    hidden: { opacity: 0, y: 18, scale: 0.97 },
    show: {
      opacity: 1, y: 0, scale: 1,
      transition: { type: "spring", stiffness: 300, damping: 26 }
    }
  }

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="flex flex-col gap-3"
    >
      {SERVICES.map((service) => {
        const Icon = service.icon
        const isSelected = selectedId === service.id
        const isDimmed = selectedId !== null && !isSelected

        return (
          <motion.button
            key={service.id}
            variants={item}
            onClick={() => handleSelect(service.id)}
            disabled={selectedId !== null}
            whileTap={{ scale: 0.975 }}
            whileHover={{ y: -2 }}
            transition={{ type: "spring", stiffness: 400, damping: 28 }}
            className={cn(
              "relative w-full text-left transition-all duration-300 rounded-[20px] border-2 overflow-hidden outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
              isSelected
                ? "border-primary bg-primary shadow-[0_8px_32px_-4px_rgba(10,92,54,0.35)]"
                : "border-border bg-surface hover:border-primary/30 hover:shadow-[0_4px_20px_rgba(10,92,54,0.08)]",
              isDimmed ? "opacity-35 scale-[0.98]" : "opacity-100"
            )}
          >
            {/* Selection glow overlay */}
            {isSelected && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 bg-gradient-to-br from-white/[0.07] to-transparent pointer-events-none"
              />
            )}

            <div className="flex items-center gap-4 px-5 py-4">
              {/* Icon badge */}
              <motion.div
                animate={{
                  backgroundColor: isSelected ? "rgba(255,255,255,0.15)" : "#F4F4F2",
                }}
                transition={{ duration: 0.2 }}
                className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border border-white/10"
              >
                <Icon
                  strokeWidth={2}
                  className={cn("w-6 h-6 transition-colors duration-300", isSelected ? "text-white" : "text-primary")}
                />
              </motion.div>

              {/* Text block */}
              <div className="flex flex-col flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className={cn(
                    "text-[19px] font-display font-bold leading-none transition-colors duration-300",
                    isSelected ? "text-white" : "text-foreground"
                  )}>
                    {service.title}
                  </span>
                  <span className={cn(
                    "px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider border transition-all duration-300",
                    isSelected
                      ? "bg-white/15 text-white border-white/20"
                      : "bg-primary/5 text-primary border-primary/10"
                  )}>
                    {service.tag}
                  </span>
                </div>
                <p className={cn(
                  "text-[12px] leading-relaxed transition-colors duration-300",
                  isSelected ? "text-white/80" : "text-secondary-text"
                )}>
                  {service.description}
                </p>
              </div>

              {/* Arrow / Check */}
              <div className={cn(
                "shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300",
                isSelected ? "bg-white/15" : "bg-primary/5"
              )}>
                {isSelected ? (
                  <CheckCircle2 strokeWidth={2.5} className="w-4.5 h-4.5 text-white" />
                ) : (
                  <ArrowUpRight strokeWidth={2.5} className="w-4 h-4 text-primary" />
                )}
              </div>
            </div>
          </motion.button>
        )
      })}

      <p className="text-center text-[11.5px] text-secondary-text/70 font-medium mt-1">
        Select your account type to begin setup
      </p>
    </motion.div>
  )
}
