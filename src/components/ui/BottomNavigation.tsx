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
        <div className={`flex items-center justify-center w-8 h-6 rounded-full transition-all duration-250 ${
          isSignOut ? "text-error" : isActive ? "text-primary" : "text-secondary-text"
        }`}>
          <Icon
            strokeWidth={isActive ? 2.4 : 2}
            className="w-[18px] h-[18px]"
          />
          {tab.id === "invitations" && unreadCount > 0 && (
            <span className="absolute top-1 right-5 w-1.5 h-1.5 rounded-full bg-primary" />
          )}
        </div>
        <span className={`text-[9px] font-bold transition-colors leading-none ${
          isSignOut ? "text-error" : isActive ? "text-primary" : "text-secondary-text"
        }`}>
          {tab.label}
        </span>
      </button>
    )
  }

  return (
    // The outer wrapper positions both the nav bar and the elevated center FAB
    <div className={`lg:hidden fixed bottom-0 left-0 right-0 z-40 ${className}`}>

      {/* Center elevated Create button — sits above the nav bar */}
      <div className="absolute left-1/2 -translate-x-1/2 -top-[26px] z-50">
        <motion.button
          onClick={onCreateNew}
          whileTap={{ scale: 0.88 }}
          whileHover={{ scale: 1.06 }}
          transition={{ type: "spring", stiffness: 400, damping: 22 }}
          className="w-[52px] h-[52px] rounded-full bg-gradient-to-br from-[#0D7343] to-[#0A5C36] text-white flex items-center justify-center shadow-[0_6px_24px_rgba(10,92,54,0.40)] border-[3px] border-background"
          aria-label="Create Agreement"
        >
          <Plus strokeWidth={2.8} className="w-6 h-6" />
        </motion.button>
        <p className="text-center text-[8.5px] font-bold text-primary mt-0.5 leading-none">Create</p>
      </div>

      {/* Nav bar */}
      <nav className="h-[58px] backdrop-blur-[28px] bg-surface/88 border-t border-border/40 flex items-center px-2 shadow-[0_-6px_24px_rgba(0,0,0,0.04)]">
        {/* Left tabs */}
        <div className="flex flex-1">
          {leftTabs.map(renderTab)}
        </div>

        {/* Center gap for the elevated button */}
        <div className="w-[64px] shrink-0" />

        {/* Right tabs */}
        <div className="flex flex-1">
          {rightTabs.map(renderTab)}
        </div>
      </nav>
    </div>
  )
}
