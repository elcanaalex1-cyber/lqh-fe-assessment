import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva('inline-flex items-center justify-center rounded-md text-sm font-semibold tracking-wide transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-aqua disabled:pointer-events-none disabled:opacity-40', {
  variants: {
    variant: {
      default: 'bg-brand-aqua text-white hover:bg-[#2bb7b6]',
      outline: 'border border-brand-navy bg-white text-brand-navy hover:bg-slate-50',
      danger: 'border border-rose-500 bg-white text-rose-500 hover:bg-rose-50',
      ghost: 'text-brand-muted hover:bg-slate-100',
    },
    size: { default: 'h-11 px-5', sm: 'h-9 px-3', lg: 'h-12 px-8', icon: 'h-10 w-10' },
  },
  defaultVariants: { variant: 'default', size: 'default' },
})

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> { asChild?: boolean }
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : 'button'
  return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
})
Button.displayName = 'Button'
