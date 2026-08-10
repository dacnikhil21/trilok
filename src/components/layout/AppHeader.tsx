"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Bell } from "lucide-react"
import { BrandLogo } from "@/components/ui/BrandLogo"
import { AppHeaderBar } from "@/components/layout/AppHeaderBar"

interface AppHeaderProps {
  showBack?: boolean
  onBack?: () => void
  notificationCount?: number
}

export function AppHeader({
  showBack = true,
  onBack,
  notificationCount = 3,
}: AppHeaderProps) {
  const router = useRouter()

  const handleBack = () => {
    if (onBack) {
      onBack()
      return
    }
    router.back()
  }

  return (
    <AppHeaderBar>
      <div className="flex h-[56px] items-center justify-between px-4">
        <div className="flex w-10 items-center justify-start">
          {showBack ? (
            <button
              type="button"
              onClick={handleBack}
              aria-label="Go back"
              className="flex h-10 w-10 items-center justify-center rounded-full text-[#334155] active:bg-[#F1F5F9]"
            >
              <ArrowLeft className="h-[22px] w-[22px]" strokeWidth={2} />
            </button>
          ) : (
            <button
              type="button"
              aria-label="Open menu"
              className="flex h-10 w-10 items-center justify-center rounded-full text-[#334155] active:bg-[#F1F5F9]"
            >
              <svg width="22" height="16" viewBox="0 0 22 16" fill="none" aria-hidden="true">
                <path d="M0 1H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M0 8H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M0 15H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          )}
        </div>

        <BrandLogo variant="headerCompact" />

        <div className="flex w-10 items-center justify-end">
          <button
            type="button"
            aria-label={`Notifications, ${notificationCount} unread`}
            className="relative flex h-10 w-10 items-center justify-center rounded-full text-[#334155] active:bg-[#F1F5F9]"
          >
            <Bell className="h-[22px] w-[22px]" strokeWidth={2} />
            {notificationCount > 0 && (
              <span className="absolute right-1 top-1 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-[#EF4444] px-1 text-[10px] font-bold leading-none text-white">
                {notificationCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </AppHeaderBar>
  )
}
