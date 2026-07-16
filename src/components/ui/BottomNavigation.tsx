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
  className = ""
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
        onClick={() => isProfile ? onLogout() : onTabChange(tab.id)}
        className="flex flex-col items-center justify-center flex-1 py-2 gap-0.5 relative"
      >
        <div className={`flex items-center justify-center transition-all duration-250 ${
          isActive ? "text-primary" : "text-secondary-text"
        }`}>
          <Icon strokeWidth={isActive ? 2.4 : 1.9} className="w-[19px] h-[19px]" />
          {tab.id === "invitations" && unreadCount > 0 && (
            <span className="absolute top-0.5 right-5 w-1.5 h-1.5 rounded-full bg-primary" />
          )}
        </div>
        <span className={`text-[9.5px] font-bold transition-colors leading-none ${
          isActive ? "text-primary" : "text-secondary-text"
        }`}>
          {tab.label}
        </span>
      </button>
    )
  }

  return (
    // Floating pill container — centered exactly using left-1/2 and -translate-x-1/2
    <div className={`lg:hidden fixed bottom-3 left-1/2 -translate-x-1/2 w-[calc(100%-24px)] max-w-[390px] z-40 ${className}`}>

      {/* Floating pill nav bar — identical visual to the previous Instagram style */}
      <nav className="h-[60px] backdrop-blur-[28px] bg-surface/85 border border-border/60 rounded-[var(--radius-md)] flex items-center px-2 shadow-[var(--shadow-level-3)]">
        {/* Left two tabs */}
        <div className="flex flex-1">
          {leftTabs.map(renderTab)}
        </div>

        {/* Center Button — vertically aligned inside the nav bar */}
        <div className="flex flex-col items-center justify-center w-[64px] shrink-0">
          <motion.button
            onClick={onCreateNew}
            whileTap={{ scale: 0.88 }}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 22 }}
            className="w-11 h-11 rounded-full bg-gradient-to-br from-[#0D7343] to-[#0A5C36] text-white flex items-center justify-center shadow-[0_3px_10px_rgba(10,92,54,0.30)] border border-white/10"
            aria-label="Create Agreement"
          >
            <Plus strokeWidth={2.8} className="w-[20px] h-[20px]" />
          </motion.button>
          <span className="text-[8.5px] font-bold text-primary mt-1 leading-none tracking-wide">Create</span>
        </div>

        {/* Right two tabs */}
        <div className="flex flex-1">
          {rightTabs.map(renderTab)}
        </div>
      </nav>
    </div>
  )
}
