import { ComponentProps, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

export const SidebarWrapper = ({ className, ...props }: ComponentProps<'ul'>) => {
  return <ul className={twMerge('flex w-full min-w-0 flex-col gap-1', className)} {...props} />
}

export const SidebarItem = ({ className, ...props }: ComponentProps<'li'>) => {
  return <li className={twMerge('relative', className)} {...props} />
}

export const SidebarButton = ({ className, ...props }: ComponentProps<'button'>) => {
  return (
    <button
      className={twMerge(
        'flex w-full items-center gap-2 overflow-hidden rounded-md px-4 text-left outline-none transition-[width,height,padding,background] focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0 hover:bg-accent hover:text-accent-foreground h-12 text-sm',
        className
      )}
      {...props}
    />
  )
}

type TSidebarItem = {
  title: string
  icon?: ReactNode
  key: string
}

type TSidebarListProps = {
  items: TSidebarItem[]
}

export const SidebarList = ({ items }: TSidebarListProps) => {
  return (
    <SidebarWrapper>
      {items.map(({ key, title, icon }) => (
        <SidebarItem key={key}>
          <SidebarButton>
            {icon}
            <span>{title}</span>
          </SidebarButton>
        </SidebarItem>
      ))}
    </SidebarWrapper>
  )
}
