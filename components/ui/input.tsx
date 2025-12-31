import * as React from 'react'
import { cva, type VariantProps } from '@/lib/utils'
import { cn } from '@/lib/utils'

const inputVariants = cva(
  'placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input w-full min-w-0 rounded-md border bg-transparent text-base shadow-xs transition-all duration-200 outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'h-9 px-3 py-1 focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
        admin: 'min-h-12 px-4 py-2 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

function Input({ className, type, variant, ...props }: React.ComponentProps<'input'> & VariantProps<typeof inputVariants>) {
  const fileClasses = type === 'file'
    ? 'file:inline-flex file:h-9 file:px-3 file:rounded-md file:border file:border-input file:bg-background file:text-sm file:font-medium file:hover:bg-accent file:hover:text-accent-foreground'
    : ''
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(inputVariants({ variant }), fileClasses, className)}
      {...props}
    />
  )
}

export { Input, inputVariants }
