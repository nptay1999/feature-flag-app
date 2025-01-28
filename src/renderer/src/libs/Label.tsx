import * as LabelPrimitive from '@radix-ui/react-label'
import { cn } from '@renderer/utils'
import { cva, type VariantProps } from 'class-variance-authority'
import React from 'react'

type TLabelProps = React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
  VariantProps<typeof labelVariants> & {
    required?: boolean
  }

const labelVariants = cva(
  'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center gap-1'
)

const Label = React.forwardRef<React.ElementRef<typeof LabelPrimitive.Root>, TLabelProps>(
  ({ className, children, required = false, ...props }, ref) => (
    <LabelPrimitive.Root ref={ref} className={cn(labelVariants(), className)} {...props}>
      {children} {required && <span className="inline-block h-1 w-1 rounded-full bg-red-500" />}
    </LabelPrimitive.Root>
  )
)
Label.displayName = LabelPrimitive.Root.displayName

export { Label }
