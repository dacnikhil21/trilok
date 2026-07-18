"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { User, Briefcase, Store, ChevronRight, CheckCircle2 } from "lucide-react"
import { cn } from "@/lib/utils"

const SERVICES = [
  {
    id: "c2c",
    title: "C2C",
    subtitle: "Consumer to Consumer",
    description: "Peer-to-peer agreement setup.",
    icon: User,
    tag: "Personal",
  },
  {
    id: "b2b",
    title: "B2B",
    subtitle: "Business to Business",
    description: "Company-to-company contracts.",
    icon: Briefcase,
    tag: "Enterprise",
  },
  {
    id: "b2c",
    title: "B2C",
    subtitle: "Business to Customer",
    description: "Business-to-customer waivers.",
    icon: Store,
    tag: "Merchant",
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
      className="flex flex-col gap-4"
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
            whileTap={{ scale: 0.98 }}
            className={cn(
              "relative w-full text-left transition-all duration-300 rounded-[20px] border border-border bg-white outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
              isSelected
                ? "border-primary shadow-sm"
                : "hover:border-primary/30 shadow-sm",
              isDimmed ? "opacity-40 scale-[0.99]" : "opacity-100"
            )}
          >
            <div className="flex items-center gap-4 px-5 py-5">
              {/* Icon badge */}
              <div
                className={cn(
                  "w-12 h-12 rounded-full flex items-center justify-center shrink-0 transition-colors duration-300",
                  isSelected ? "bg-primary/10" : "bg-primary/5"
                )}
              >
                <Icon
                  strokeWidth={2}
                  className="w-6 h-6 text-primary"
                />
              </div>

              {/* Text block */}
              <div className="flex flex-col flex-1 min-w-0 gap-1">
                <div className="flex items-center gap-1.5">
                  <span className="text-[17px] font-display font-bold leading-none text-foreground">
                    {service.title}
                  </span>
                  <span className="text-[17px] font-display font-bold leading-none text-foreground">
                    ({service.tag})
                  </span>
                </div>
                <p className="text-[13px] leading-relaxed text-secondary-text">
                  {service.description}
                </p>
              </div>

              {/* Arrow */}
              <div className="shrink-0 flex items-center justify-center">
                <ChevronRight strokeWidth={2.5} className="w-5 h-5 text-primary" />
              </div>
            </div>
          </motion.button>
        )
      })}
    </motion.div>
  )
}
