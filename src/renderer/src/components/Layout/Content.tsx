import { ComponentProps, forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'

type TContentProps = ComponentProps<'div'>

export const Content = forwardRef<HTMLDivElement, TContentProps>(
  ({ children, className, ...props }, ref) => (
    <div
      ref={ref}
      className={twMerge('flex-1 bg-card text-card-foreground overflow-auto', className)}
      {...props}
    >
      {children}
    </div>
  )
)

Content.displayName = 'Content'
