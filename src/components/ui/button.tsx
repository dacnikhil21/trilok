import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-[var(--radius-sm)] text-[16px] font-semibold transition-all focus-visible:outline-none disabled:pointer-events-none disabled:bg-[#EFEFEF] disabled:text-[#A0A5AA] active:scale-96",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-surface shadow-[var(--shadow-level-2)] hover:bg-[#084D2D]",
        secondary:
          "bg-divider text-foreground hover:bg-[#EAEAEA]",
        ghost:
          "text-primary hover:bg-primary/10",
        danger:
          "bg-error text-surface shadow-sm hover:bg-[#B32626]",
      },
      size: {
        default: "h-14 px-8 py-4",
        sm: "h-10 px-4",
        lg: "h-16 px-10",
        icon: "h-12 w-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, loading, children, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={loading || props.disabled}
        {...props}
      >
        {loading ? (
          <span className="h-5 w-5 animate-spin rounded-full border-2 border-surface border-t-transparent" />
        ) : (
          children
        )}
      </button>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
