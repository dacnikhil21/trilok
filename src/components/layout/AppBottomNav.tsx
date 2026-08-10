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

type NavItem = {
  id: AppBottomNavTab | "create"
  label: string
  Icon?: typeof Home
  isFab?: boolean
}

const NAV_ITEMS: NavItem[] = [
  { id: "home", label: "Home", Icon: Home },
  { id: "agreements", label: "Agreements", Icon: FileText },
  { id: "create", label: "Create", isFab: true },
  { id: "verification", label: "Verify", Icon: Shield },
  { id: "profile", label: "Profile", Icon: User },
]

function NavSlot({
  item,
  isActive,
  onPress,
}: {
  item: NavItem
  isActive: boolean
  onPress: () => void
}) {
  if (item.isFab) {
    return (
      <div className="relative flex min-w-0 flex-col items-center">
        <button
          type="button"
          aria-label="Create Agreement"
          onClick={onPress}
          className="absolute left-1/2 top-0 z-10 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#2563EB] shadow-[0_4px_14px_rgba(37,99,235,0.35)] active:scale-95"
        >
          <Plus className="h-[22px] w-[22px] text-white" strokeWidth={2.5} />
        </button>
        <span className="mt-6 w-full min-h-[18px] px-0.5 text-center text-[9px] font-semibold leading-[1.15] text-[#64748B]">
          {item.label}
        </span>
      </div>
    )
  }

  const Icon = item.Icon!
  return (
    <button
      type="button"
      onClick={onPress}
      className="flex min-w-0 w-full flex-col items-center justify-end pb-0.5 active:opacity-80"
    >
      <Icon
        className={cn("h-[21px] w-[21px] shrink-0", isActive ? "text-[#2563EB]" : "text-[#94A3B8]")}
        strokeWidth={isActive ? 2.2 : 2}
      />
      <span
        className={cn(
          "mt-1 w-full min-h-[18px] px-0.5 text-center text-[9px] leading-[1.15]",
          isActive ? "font-semibold text-[#2563EB]" : "font-medium text-[#94A3B8]"
        )}
      >
        {item.label}
      </span>
    </button>
  )
}

export function AppBottomNav({
  activeTab = "home",
  onCreateAgreement,
  onTabChange,
  className,
}: AppBottomNavProps) {
  return (
    <nav
      className={cn(
        "relative w-full border-t border-[#E2E8F0] bg-white",
        "pb-[max(6px,env(safe-area-inset-bottom,0px))] pt-5",
        className
      )}
    >
      <div className="grid h-[44px] w-full grid-cols-5 items-end px-1">
        {NAV_ITEMS.map((item) => (
          <NavSlot
            key={item.id}
            item={item}
            isActive={item.id === activeTab}
            onPress={() => {
              if (item.isFab) {
                onCreateAgreement?.()
                return
              }
              onTabChange?.(item.id as AppBottomNavTab)
            }}
          />
        ))}
      </div>
    </nav>
  )
}
