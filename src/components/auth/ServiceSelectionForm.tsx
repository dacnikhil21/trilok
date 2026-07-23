"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { User, Store, ArrowRight, Star, ShoppingBag, ShieldCheck } from "lucide-react"
import { cn } from "@/lib/utils"

const SERVICES = [
  {
    id: "c2c",
    title: "C2C (Individuals)",
    description: "Buy or sell between individuals.",
    details: "Used Mobiles, Bikes, Electronics & more.",
    icon: User,
    badgeText: "Most Popular",
    badgeIcon: Star,
    badgeBg: "bg-blue-100/90 text-[#0052CC]",
    iconBg: "bg-blue-100/80 text-[#0052CC]",
    activeBorder: "border-2 border-[#0052CC] bg-blue-50/20 shadow-xs",
  },
  {
    id: "b2c",
    title: "B2B (Businesses)",
    description: "Buy/sell for shop or business.",
    details: "Dealers, Retailers & Companies.",
    icon: Store,
    badgeText: "For Businesses",
    badgeIcon: ShoppingBag,
    badgeBg: "bg-emerald-100/90 text-[#10B981]",
    iconBg: "bg-emerald-100/80 text-[#10B981]",
    activeBorder: "border-2 border-[#10B981] bg-emerald-50/20 shadow-xs",
  },
]

export function ServiceSelectionForm() {
  const router = useRouter()
  const [selectedId, setSelectedId] = React.useState<string>("c2c")
  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  const handleContinue = () => {
    if (!selectedId) return
    setIsLoading(true)
    setTimeout(() => {
      router.push(`/register?module=${selectedId}`)
    }, 350)
  }

  return (
    <div className="flex flex-col space-y-3.5">
      {/* ── Choose Account Type Header ─────────────────────────────────────────── */}
      <label className="block text-[13.5px] font-bold text-[#0F172A] px-0.5">
        Choose Account Type
      </label>

      {/* ── Cards Stack ────────────────────────────────────────────────────────── */}
      <div className="flex flex-col space-y-3">
        {SERVICES.map((service) => {
          const Icon = service.icon
          const BadgeIcon = service.badgeIcon
          const isSelected = selectedId === service.id

          return (
            <div
              key={service.id}
              onClick={() => setSelectedId(service.id)}
              className={cn(
                "relative w-full text-left transition-all duration-200 rounded-[18px] p-3.5 cursor-pointer select-none",
                isSelected
                  ? service.activeBorder
                  : "border border-slate-200/90 bg-white hover:border-slate-300 shadow-2xs"
              )}
            >
              <div className="flex items-start gap-3">
                {/* Icon Box */}
                <div className={cn(
                  "w-11 h-11 rounded-[14px] flex items-center justify-center shrink-0 mt-0.5",
                  service.iconBg
                )}>
                  <Icon className="w-5.5 h-5.5" />
                </div>

                {/* Content Block */}
                <div className="flex flex-col flex-1 min-w-0 pr-2">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[15px] font-bold text-[#0F172A] leading-tight">
                      {service.title}
                    </span>
                  </div>

                  <p className="text-[12px] font-medium text-slate-600 leading-snug mt-0.5">
                    {service.description}
                  </p>

                  <p className="text-[11.5px] text-slate-500 font-normal leading-snug mt-0.5">
                    {service.details}
                  </p>

                  {/* Pill Badge */}
                  <div className="pt-2">
                    <span className={cn(
                      "inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold",
                      service.badgeBg
                    )}>
                      <BadgeIcon className="w-3 h-3 fill-current" />
                      <span>{service.badgeText}</span>
                    </span>
                  </div>
                </div>

                {/* Custom Radio Circle */}
                <div className="shrink-0 pt-1">
                  <div className={cn(
                    "w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all",
                    isSelected 
                      ? "border-[#0052CC] bg-[#0052CC]" 
                      : "border-slate-300 bg-white"
                  )}>
                    {isSelected && (
                      <div className="w-2 h-2 rounded-full bg-white" />
                    )}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* ── 52px Gradient Action Button ────────────────────────────────────────── */}
      <button
        type="button"
        onClick={handleContinue}
        disabled={isLoading}
        className="w-full h-[52px] rounded-[18px] bg-gradient-to-r from-[#0052CC] via-[#0077B6] to-[#10B981] text-white font-bold text-[15.5px] flex items-center justify-center gap-2 transition-all shadow-[0_6px_20px_rgba(0,82,204,0.35)] active:scale-[0.985] hover:opacity-95 mt-1"
      >
        <span className="tracking-wide font-extrabold text-[15.5px] text-white drop-shadow-xs">
          {isLoading ? "Proceeding..." : "Continue"}
        </span>
        <ArrowRight className="w-5 h-5 text-white shrink-0 stroke-[2.5]" />
      </button>

    </div>
  )
}
