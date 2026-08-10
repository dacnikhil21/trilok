"use client"

import * as React from "react"
import { Home, FileText, Shield, User, Plus } from "lucide-react"
import { cn } from "@/lib/utils"

export type AppBottomNavTab = "home" | "agreements" | "verification" | "profile"

interface AppBottomNavProps {
  activeTab?: AppBottomNavTab
  onCreateAgreement?: () => void
  onTabChange?: (tab: AppBottomNavTab) => void
  className?: string
}

export function AppBottomNav({
  activeTab = "home",
  onCreateAgreement,
  onTabChange,
  className,
}: AppBottomNavProps) {
  const tabs: { id: AppBottomNavTab; label: string; Icon: typeof Home }[] = [
    { id: "home", label: "Home", Icon: Home },
    { id: "agreements", label: "My Agreements", Icon: FileText },
    { id: "verification", label: "Verification", Icon: Shield },
    { id: "profile", label: "Profile", Icon: User },
  ]

  return (
    <nav
      className={cn(
        "grid h-[68px] w-full grid-cols-5 items-end border-t border-[#E2E8F0] bg-white px-1 pb-[max(8px,env(safe-area-inset-bottom))] pt-1.5",
        className
      )}
    >
      {tabs.slice(0, 2).map(({ id, label, Icon }) => {
        const isActive = activeTab === id
        return (
          <button
            key={id}
            type="button"
            onClick={() => onTabChange?.(id)}
            className="flex flex-col items-center justify-end gap-0.5 py-1"
          >
            <Icon
              className={cn("h-[22px] w-[22px]", isActive ? "text-[#2563EB]" : "text-[#94A3B8]")}
              strokeWidth={isActive ? 2.2 : 2}
            />
            <span
              className={cn(
                "max-w-[72px] truncate text-[9px] leading-tight",
                isActive ? "font-semibold text-[#2563EB]" : "font-medium text-[#94A3B8]"
              )}
            >
              {label}
            </span>
          </button>
        )
      })}

      <div className="flex flex-col items-center justify-end gap-0.5 py-0.5">
        <button
          type="button"
          aria-label="Create Agreement"
          onClick={onCreateAgreement}
          className="flex h-11 w-11 items-center justify-center rounded-full bg-[#2563EB] shadow-[0_4px_14px_rgba(37,99,235,0.32)]"
        >
          <Plus className="h-6 w-6 text-white" strokeWidth={2.5} />
        </button>
        <span className="max-w-[72px] truncate text-[9px] font-medium leading-tight text-[#64748B]">
          Create Agreement
        </span>
      </div>

      {tabs.slice(2).map(({ id, label, Icon }) => {
        const isActive = activeTab === id
        return (
          <button
            key={id}
            type="button"
            onClick={() => onTabChange?.(id)}
            className="flex flex-col items-center justify-end gap-0.5 py-1"
          >
            <Icon
              className={cn("h-[22px] w-[22px]", isActive ? "text-[#2563EB]" : "text-[#94A3B8]")}
              strokeWidth={isActive ? 2.2 : 2}
            />
            <span
              className={cn(
                "max-w-[72px] truncate text-[9px] leading-tight",
                isActive ? "font-semibold text-[#2563EB]" : "font-medium text-[#94A3B8]"
              )}
            >
              {label}
            </span>
          </button>
        )
      })}
    </nav>
  )
}
