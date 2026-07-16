"use client"

import * as React from "react"
import { LucideIcon } from "lucide-react"

interface SectionTitleProps {
  title: string
  icon?: LucideIcon
  actionLabel?: string
  onActionClick?: () => void
  className?: string
}

export function SectionTitle({ title, icon: Icon, actionLabel, onActionClick, className = "" }: SectionTitleProps) {
  return (
    <div className={`flex justify-between items-center py-1 ${className}`}>
      <h3 className="font-display font-bold text-[16.5px] text-foreground flex items-center gap-2 tracking-tight">
        {Icon && <Icon strokeWidth={2.2} className="w-4.5 h-4.5 text-primary" />}
        {title}
      </h3>
      {actionLabel && onActionClick && (
        <button 
          onClick={onActionClick}
          className="text-[11.5px] text-primary hover:text-[#084D2D] font-bold tracking-wider uppercase transition-colors"
        >
          {actionLabel}
        </button>
      )}
    </div>
  )
}
