"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { LucideIcon, CheckCircle2, AlertTriangle, Info, AlertOctagon } from "lucide-react"

type StatusVariant = "success" | "warning" | "info" | "error"

interface StatusCardProps {
  title: string
  description?: string
  variant?: StatusVariant
  icon?: LucideIcon
  actionNode?: React.ReactNode
  className?: string
}

export function StatusCard({ 
  title, 
  description, 
  variant = "info", 
  icon: CustomIcon, 
  actionNode,
  className = "" 
}: StatusCardProps) {
  
  const config = React.useMemo(() => {
    switch (variant) {
      case "success":
        return {
          icon: CheckCircle2,
          bgClass: "bg-verified/60 border-primary/10",
          iconClass: "text-primary",
        }
      case "warning":
        return {
          icon: AlertTriangle,
          bgClass: "bg-[#FFFDF5] border-warning/15",
          iconClass: "text-warning",
        }
      case "error":
        return {
          icon: AlertOctagon,
          bgClass: "bg-[#FDF3F3] border-error/15",
          iconClass: "text-error",
        }
      case "info":
      default:
        return {
          icon: Info,
          bgClass: "bg-divider/50 border-border/40",
          iconClass: "text-secondary-text",
        }
    }
  }, [variant])

  const Icon = CustomIcon || config.icon

  return (
    <motion.div 
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      className={`border rounded-[var(--radius-md)] p-4 flex items-start gap-4 shadow-[var(--shadow-level-1)] ${config.bgClass} ${className}`}
    >
      <Icon strokeWidth={2.4} className={`w-5 h-5 shrink-0 mt-0.5 ${config.iconClass}`} />
      <div className="flex-1 min-w-0">
        <h4 className="font-bold text-foreground text-[14.5px] leading-tight mb-0.5">{title}</h4>
        {description && (
          <p className="text-[13px] text-secondary-text leading-relaxed font-medium">
            {description}
          </p>
        )}
      </div>
      {actionNode && (
        <div className="shrink-0">
          {actionNode}
        </div>
      )}
    </motion.div>
  )
}
