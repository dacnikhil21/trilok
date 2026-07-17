import * as React from "react"
import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  prefixNode?: React.ReactNode
  suffixNode?: React.ReactNode
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, prefixNode, suffixNode, type, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-[14px] font-semibold text-primary-text mb-2">
            {label}
          </label>
        )}
        <div
          className={cn(
            "relative flex items-center w-full min-h-[56px] rounded-[12px] border bg-surface px-4 transition-all duration-200",
            "focus-within:border-primary focus-within:ring-1 focus-within:ring-primary/20",
            error ? "border-error text-error focus-within:border-error focus-within:ring-error/20" : "border-border",
            className
          )}
        >
          {prefixNode && (
            <div className="mr-3 flex items-center text-primary-text font-semibold">
              {prefixNode}
            </div>
          )}
          
          <input
            type={type}
            className={cn(
              "w-full bg-transparent p-0 text-[16px] font-medium text-foreground outline-none placeholder:text-secondary-text/50",
            )}
            ref={ref}
            {...props}
          />

          {suffixNode && (
            <div className="ml-3 flex items-center text-primary-text">
              {suffixNode}
            </div>
          )}
        </div>
        {error && (
          <p className="mt-2 text-xs font-medium text-error flex items-center animate-in slide-in-from-top-1">
            {error}
          </p>
        )}
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input }
