import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        outline:
          'border-2 border-primary text-primary shadow-[0_3px_0_0_hsl(var(--primary))] hover:translate-y-[-2px] hover:shadow-[0_5px_0_0_hsl(var(--primary))] active:translate-y-[2px] active:shadow-[0_1px_0_0_hsl(var(--primary))]',
        primary:
          'bg-primary text-primary-foreground border-2 border-primary shadow-[0_3px_0_0_hsl(var(--primary)/0.6)]',
        ghost: 'border border-dashed border-primary text-primary bg-transparent',
      },
      size: {
        sm: 'px-2.5 py-1.5 text-xs',
        md: 'px-4 py-2.5 text-sm',
        lg: 'px-5 py-3 text-base',
      },
    },
    defaultVariants: {
      variant: 'outline',
      size: 'md',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)

Button.displayName = 'Button'

export { Button, buttonVariants }
