import * as React from "react"
import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
  prefixNode?: React.ReactNode
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, prefixNode, type, value, defaultValue, ...props }, ref) => {
    const [focused, setFocused] = React.useState(false)
    
    // Determine if we should float the label
    // It floats if it's focused, or if it has a controlled value, or uncontrolled defaultValue
    const hasValue = value !== undefined && value !== "" || defaultValue !== undefined && defaultValue !== ""
    const isFloating = focused || hasValue || props.placeholder

    return (
      <div className="relative w-full">
        <div
          className={cn(
            "relative flex items-center w-full h-[56px] rounded-[16px] border bg-surface px-4 transition-all duration-200",
            focused ? "border-primary shadow-sm ring-1 ring-primary/20" : "border-border",
            error ? "border-error text-error" : "",
            className
          )}
        >
          {prefixNode && (
            <div className="mr-3 flex items-center text-foreground font-medium pt-3">
              {prefixNode}
            </div>
          )}
          
          <div className="relative flex-1 flex flex-col justify-center h-full pt-4 pb-1">
            <label
              className={cn(
                "absolute left-0 transition-all duration-200 pointer-events-none text-secondary-text",
                isFloating
                  ? "-translate-y-3 text-[12px] font-medium"
                  : "translate-y-0 text-[16px] font-normal"
              )}
            >
              {label}
            </label>
            <input
              type={type}
              value={value}
              defaultValue={defaultValue}
              className={cn(
                "w-full bg-transparent p-0 text-[16px] font-medium text-foreground outline-none placeholder:text-transparent focus:placeholder:text-secondary-text/50",
                isFloating ? "opacity-100" : "opacity-0 focus:opacity-100"
              )}
              ref={ref}
              onFocus={(e) => {
                setFocused(true)
                props.onFocus?.(e)
              }}
              onBlur={(e) => {
                setFocused(false)
                // If it's uncontrolled, we need to check if there's a value on blur
                // To keep it simple, we check e.target.value
                if (e.target.value) {
                  e.target.setAttribute('data-has-value', 'true')
                } else {
                  e.target.removeAttribute('data-has-value')
                }
                props.onBlur?.(e)
              }}
              {...props}
            />
          </div>
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
