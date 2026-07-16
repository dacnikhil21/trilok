"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Home, FileText, Inbox, LogOut, Plus, LucideIcon } from "lucide-react"

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
    { id: "agreements", label: "Contracts", icon: FileText },
  ]

  const rightTabs: NavTabItem[] = [
    { id: "invitations", label: "Inbox", icon: Inbox },
    { id: "signout", label: "Sign Out", icon: LogOut },
  ]

  const renderTab = (tab: NavTabItem) => {
    const Icon = tab.icon
    const isActive = activeTab === tab.id
    const isSignOut = tab.id === "signout"

    return (
      <button
        key={tab.id}
        onClick={() => isSignOut ? onLogout() : onTabChange(tab.id)}
        className="flex flex-col items-center justify-center flex-1 py-2 gap-0.5 relative"
      >
        <div className={`flex items-center justify-center transition-all duration-250 ${
          isSignOut ? "text-error" : isActive ? "text-primary" : "text-secondary-text"
        }`}>
          <Icon strokeWidth={isActive ? 2.4 : 1.9} className="w-[19px] h-[19px]" />
          {tab.id === "invitations" && unreadCount > 0 && (
            <span className="absolute top-0.5 right-5 w-1.5 h-1.5 rounded-full bg-primary" />
          )}
        </div>
        <span className={`text-[9.5px] font-bold transition-colors leading-none ${
          isSignOut ? "text-error" : isActive ? "text-primary" : "text-secondary-text"
        }`}>
          {tab.label}
        </span>
      </button>
    )
  }

  return (
    // Floating pill container — `bottom-5 left-4 right-4` gives the Instagram-style lift
    <div className={`lg:hidden fixed bottom-5 left-4 right-4 z-40 ${className}`}>

      {/* Center elevated Create FAB — sits above the floating pill */}
      <div className="absolute left-1/2 -translate-x-1/2 -top-[26px] z-50 flex flex-col items-center">
        <motion.button
          onClick={onCreateNew}
          whileTap={{ scale: 0.86 }}
          whileHover={{ scale: 1.08, y: -2 }}
          transition={{ type: "spring", stiffness: 420, damping: 20 }}
          className="w-[52px] h-[52px] rounded-full bg-gradient-to-br from-[#0D7343] to-[#0A5C36] text-white flex items-center justify-center shadow-[0_6px_20px_rgba(10,92,54,0.45)] border-[3px] border-background"
          aria-label="Create Agreement"
        >
          <Plus strokeWidth={2.8} className="w-[22px] h-[22px]" />
        </motion.button>
        <span className="text-[8.5px] font-bold text-primary mt-[3px] leading-none tracking-wide">Create</span>
      </div>

      {/* Floating pill nav bar — identical visual to the previous Instagram style */}
      <nav className="h-[60px] backdrop-blur-[28px] bg-surface/80 border border-white/25 rounded-[var(--radius-md)] flex items-center px-2 shadow-[var(--shadow-level-3)]">
        {/* Left two tabs */}
        <div className="flex flex-1">
          {leftTabs.map(renderTab)}
        </div>

        {/* Center gap reserved for the elevated FAB */}
        <div className="w-[60px] shrink-0" />

        {/* Right two tabs */}
        <div className="flex flex-1">
          {rightTabs.map(renderTab)}
        </div>
      </nav>
    </div>
  )
}
