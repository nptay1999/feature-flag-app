import { cn } from '@renderer/utils'
import React from 'react'
import { twMerge } from 'tailwind-merge'

export type SpinProps = {
  spinning?: boolean
  size?: 'small' | 'default' | 'large'
  className?: string
  children?: React.ReactNode
}

export const Spin: React.FC<SpinProps> = ({
  spinning = true,
  size = 'default',
  className,
  children
}) => {
  return (
    <div className={twMerge('relative block', className)}>
      {/* Content Wrapper */}
      <div className={cn('relative', spinning && 'opacity-50')}>{children}</div>

      {/* Spinner Overlay */}
      {spinning && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/60 dark:bg-black/30">
          <div
            className={cn(
              'animate-spin rounded-full border-4 border-solid border-primary border-t-transparent',
              {
                'h-5 w-5 border-2': size === 'small',
                'h-8 w-8 border-4': size === 'default',
                'h-12 w-12 border-4': size === 'large'
              }
            )}
          />
        </div>
      )}
    </div>
  )
}
