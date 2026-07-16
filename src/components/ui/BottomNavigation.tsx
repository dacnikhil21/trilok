"use client"

import * as React from "react"
import { Home, FileText, Inbox, LogOut, LucideIcon } from "lucide-react"

export interface NavTabItem {
  id: string
  label: string
  icon: LucideIcon
}

interface BottomNavigationProps {
  activeTab: string
  onTabChange: (id: string) => void
  onLogout: () => void
  unreadCount?: number
  className?: string
}

export function BottomNavigation({ 
  activeTab, 
  onTabChange, 
  onLogout, 
  unreadCount = 0,
  className = "" 
}: BottomNavigationProps) {
  
  const tabs: NavTabItem[] = React.useMemo(() => [
    { id: "home", label: "Home", icon: Home },
    { id: "agreements", label: "Contracts", icon: FileText },
    { id: "invitations", label: "Inbox", icon: Inbox }
  ], [])

  return (
    <div className={`lg:hidden fixed bottom-5 left-4 right-4 z-40 ${className}`}>
      <nav className="h-16 backdrop-blur-[28px] bg-surface/75 border border-white/20 rounded-[var(--radius-md)] flex items-center justify-around px-2 shadow-[var(--shadow-level-3)]">
        {tabs.map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className="flex flex-col items-center justify-center flex-1 py-1"
            >
              <div className={`px-4 py-1.5 rounded-full transition-all duration-300 relative ${isActive ? "bg-primary/8 text-primary shadow-inner" : "text-secondary-text"}`}>
                <Icon strokeWidth={isActive ? 2.4 : 2} className="w-4.5 h-4.5 mx-auto" />
                {tab.id === "invitations" && unreadCount > 0 && (
                  <span className="absolute top-1.5 right-3.5 w-1.5 h-1.5 rounded-full bg-primary" />
                )}
              </div>
              <span className={`text-[9px] font-bold mt-0.5 transition-colors ${isActive ? "text-primary" : "text-secondary-text"}`}>
                {tab.label}
              </span>
            </button>
          )
        })}
        
        <button
          onClick={onLogout}
          className="flex flex-col items-center justify-center flex-1 py-1 text-error"
        >
          <div className="px-4 py-1.5 text-error">
            <LogOut strokeWidth={2} className="w-4.5 h-4.5 mx-auto" />
          </div>
          <span className="text-[9px] font-bold mt-0.5">Sign Out</span>
        </button>
      </nav>
    </div>
  )
}
