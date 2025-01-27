import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

type TMainLayoutProps = ComponentProps<'main'>

export const MainLayout = ({ children, className, ...props }: TMainLayoutProps) => {
  return (
    <main className={twMerge('flex flex-row h-screen', className)} {...props}>
      {children}
    </main>
  )
}
