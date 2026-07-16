"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { User, Briefcase, Store } from "lucide-react"
import { cn } from "@/lib/utils"

const SERVICES = [
  {
    id: "c2c",
    title: "C2C",
    subtitle: "Consumer to Consumer",
    description: "Secure agreements between individuals.",
    icon: User,
  },
  {
    id: "b2b",
    title: "B2B",
    subtitle: "Business to Business",
    description: "Professional agreements between companies.",
    icon: Briefcase,
  },
  {
    id: "b2c",
    title: "B2C",
    subtitle: "Business to Customer",
    description: "Businesses selling products or services to customers.",
    icon: Store,
  },
]

export function ServiceSelectionForm() {
  const router = useRouter()
  const [selectedId, setSelectedId] = React.useState<string | null>(null)

  const handleSelect = (id: string) => {
    setSelectedId(id)
    // Smooth transition delay to let user see selection
    setTimeout(() => {
      router.push(`/register?module=${id}`)
    }, 400)
  }

  const container: import("framer-motion").Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const item: import("framer-motion").Variants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  }

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="flex flex-col gap-4 mt-2"
    >
      {SERVICES.map((service) => {
        const Icon = service.icon
        const isSelected = selectedId === service.id

        return (
          <motion.button
            key={service.id}
            variants={item}
            onClick={() => handleSelect(service.id)}
            disabled={selectedId !== null}
            className={cn(
              "relative flex flex-col items-start w-full p-6 text-left transition-all duration-300 rounded-[var(--radius-md)] border-2 outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
              isSelected 
                ? "border-primary bg-primary/5 shadow-[var(--shadow-level-1)]"
                : "border-border bg-surface hover:border-primary/40 hover:shadow-[var(--shadow-level-1)]",
              selectedId && !isSelected ? "opacity-40 scale-[0.98]" : "opacity-100 scale-100"
            )}
          >
            <div className="flex items-center gap-4 w-full mb-2">
              <div className={cn(
                "flex items-center justify-center w-12 h-12 rounded-full transition-colors duration-300",
                isSelected ? "bg-primary text-surface" : "bg-[#F4F4F4] text-foreground"
              )}>
                <Icon strokeWidth={2} className="w-6 h-6" />
              </div>
              <div className="flex flex-col">
                <span className="text-[20px] font-display font-bold text-foreground leading-tight">
                  {service.title}
                </span>
                <span className="text-[13px] font-semibold tracking-wide uppercase text-primary">
                  {service.subtitle}
                </span>
              </div>
            </div>
            
            <p className="text-[15px] text-secondary-text mt-2 leading-relaxed">
              {service.description}
            </p>
          </motion.button>
        )
      })}
    </motion.div>
  )
}
