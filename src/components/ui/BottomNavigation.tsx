"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Home, FileText, Inbox, User, Plus, LucideIcon } from "lucide-react"

export interface NavTabItem {
  id: string
  label: string
  icon: LucideIcon
}

interface BottomNavigationProps {
  activeTab: string
  onTabChange: (id: string) => void
  onLogout: () => void
  onCreateNew?: () => void
  unreadCount?: number
  className?: string
}

export function BottomNavigation({
  activeTab,
  onTabChange,
  onLogout,
  onCreateNew,
  unreadCount = 0,
  className = "",
}: BottomNavigationProps) {
  const leftTabs: NavTabItem[] = [
    { id: "home", label: "Home", icon: Home },
    { id: "agreements", label: "Agreements", icon: FileText },
  ]

  const rightTabs: NavTabItem[] = [
    { id: "invitations", label: "Inbox", icon: Inbox },
    { id: "profile", label: "Profile", icon: User },
  ]

  const renderTab = (tab: NavTabItem) => {
    const Icon = tab.icon
    const isActive = activeTab === tab.id
    const isProfile = tab.id === "profile"

    return (
      <button
        key={tab.id}
        onClick={() => (isProfile ? onLogout() : onTabChange(tab.id))}
        className="relative flex flex-1 flex-col items-center justify-center gap-0.5 py-2"
      >
        <div
          className={`flex items-center justify-center transition-all duration-250 ${
            isActive ? "text-primary" : "text-secondary-text"
          }`}
        >
          <Icon strokeWidth={isActive ? 2.4 : 1.9} className="h-[19px] w-[19px]" />
          {tab.id === "invitations" && unreadCount > 0 && (
            <span className="absolute right-5 top-0.5 h-1.5 w-1.5 rounded-full bg-primary" />
          )}
        </div>
        <span
          className={`text-[9.5px] font-bold leading-none transition-colors ${
            isActive ? "text-primary" : "text-secondary-text"
          }`}
        >
          {tab.label}
        </span>
      </button>
    )
  }

  return (
    <nav
      className={`flex h-[68px] w-full items-center border-t border-border/60 bg-white px-2 pb-[max(8px,env(safe-area-inset-bottom))] pt-1.5 ${className}`}
    >
      <div className="flex flex-1">{leftTabs.map(renderTab)}</div>

      <div className="flex w-[64px] shrink-0 flex-col items-center justify-center">
        <motion.button
          onClick={onCreateNew}
          whileTap={{ scale: 0.88 }}
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 22 }}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-gradient-to-br from-[#0033A0] to-[#041B4A] text-white shadow-[0_3px_10px_rgba(0,51,160,0.30)]"
          aria-label="Create Agreement"
        >
          <Plus strokeWidth={2.8} className="h-5 w-5" />
        </motion.button>
        <span className="mt-1 text-[8.5px] font-bold leading-none tracking-wide text-primary">Create</span>
      </div>

      <div className="flex flex-1">{rightTabs.map(renderTab)}</div>
    </nav>
  )
}
