import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

type TSidebarProps = ComponentProps<'aside'>

export const Sidebar = ({ className, children, ...props }: TSidebarProps) => {
  return (
    <aside
      className={twMerge('w-[250px] mt-10 h-[100vh + 10px] overflow-auto', className)}
      {...props}
    >
      {children}
    </aside>
  )
}
