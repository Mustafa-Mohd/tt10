import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 transform active:translate-y-0 active:shadow-sm",
  {
    variants: {
      variant: {
        default: "hero-gradient text-primary-foreground shadow-travel-lg hover:shadow-ocean hover:-translate-y-1 border border-primary/20",
        destructive:
          "bg-destructive text-destructive-foreground shadow-travel-lg hover:shadow-xl hover:-translate-y-1 border border-destructive/20",
        outline:
          "border-2 border-primary bg-background text-primary hover:bg-primary hover:text-primary-foreground shadow-travel hover:shadow-travel-lg hover:-translate-y-1",
        secondary:
          "bg-secondary text-secondary-foreground shadow-travel-lg hover:shadow-xl hover:-translate-y-1 border border-secondary/20",
        ghost: "hover:bg-accent hover:text-accent-foreground shadow-none hover:shadow-travel hover:-translate-y-0.5",
        link: "text-primary underline-offset-4 hover:underline shadow-none",
        hero: "hero-gradient text-white font-bold shadow-travel-lg hover:shadow-sunset hover:-translate-y-1 border border-primary/30",
        ocean: "ocean-gradient text-white font-bold shadow-ocean hover:shadow-travel-lg hover:-translate-y-1 border border-primary/30",
        sunset: "sunset-gradient text-white font-bold shadow-sunset hover:shadow-travel-lg hover:-translate-y-1 border border-accent/30",
        success: "bg-success text-success-foreground shadow-travel-lg hover:shadow-xl hover:-translate-y-1 border border-success/20",
        glass: "glass text-foreground hover:bg-background/90 border border-border/50 shadow-travel hover:shadow-travel-lg hover:-translate-y-0.5",
      },
      size: {
        default: "h-11 px-6 py-3",
        sm: "h-9 rounded-md px-4 py-2",
        lg: "h-14 rounded-xl px-10 py-4 text-base",
        xl: "h-16 rounded-xl px-12 py-5 text-lg",
        icon: "h-10 w-10",
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
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
