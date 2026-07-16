"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { User, Briefcase, Store, ChevronRight } from "lucide-react"
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
    description: "Professional contracts between companies.",
    icon: Briefcase,
  },
  {
    id: "b2c",
    title: "B2C",
    subtitle: "Business to Customer",
    description: "Sell products or services to customers.",
    icon: Store,
  },
]

export function ServiceSelectionForm() {
  const router = useRouter()
  const [selectedId, setSelectedId] = React.useState<string | null>(null)

  const handleSelect = (id: string) => {
    setSelectedId(id)
    setTimeout(() => {
      router.push(`/register?module=${id}`)
    }, 350)
  }

  const container: import("framer-motion").Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08 }
    }
  }

  const item: import("framer-motion").Variants = {
    hidden: { opacity: 0, y: 12 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 320, damping: 26 } }
  }

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="flex flex-col gap-3 mt-1"
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
              "relative flex items-center w-full px-4 py-3.5 text-left transition-all duration-300 rounded-[var(--radius-md)] border-2 outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
              isSelected
                ? "border-primary bg-primary/5 shadow-[var(--shadow-level-1)]"
                : "border-border bg-surface hover:border-primary/30 hover:shadow-[var(--shadow-level-1)]",
              selectedId && !isSelected ? "opacity-40 scale-[0.98]" : "opacity-100 scale-100"
            )}
          >
            {/* Icon */}
            <div className={cn(
              "flex items-center justify-center w-10 h-10 rounded-full transition-colors duration-300 shrink-0 mr-3.5",
              isSelected ? "bg-primary text-surface" : "bg-[#F4F4F4] text-foreground"
            )}>
              <Icon strokeWidth={2} className="w-5 h-5" />
            </div>

            {/* Label block */}
            <div className="flex flex-col flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-[17px] font-display font-bold text-foreground leading-tight">
                  {service.title}
                </span>
                <span className="text-[10.5px] font-bold tracking-wide uppercase text-primary">
                  {service.subtitle}
                </span>
              </div>
              <p className="text-[12.5px] text-secondary-text mt-0.5 leading-snug truncate">
                {service.description}
              </p>
            </div>

            {/* Arrow */}
            <ChevronRight
              strokeWidth={2.5}
              className={cn(
                "w-4 h-4 shrink-0 ml-2 transition-colors",
                isSelected ? "text-primary" : "text-secondary-text"
              )}
            />
          </motion.button>
        )
      })}
    </motion.div>
  )
}
