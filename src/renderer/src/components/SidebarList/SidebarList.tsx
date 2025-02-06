import { useFeatureFlagStore } from '@renderer/store'
import { cn, ESideTab } from '@renderer/utils'
import { ComponentProps, useMemo } from 'react'
import { RiFlagLine, RiUserSettingsLine } from 'react-icons/ri'
import { twMerge } from 'tailwind-merge'
import { useShallow } from 'zustand/react/shallow'

export const SidebarWrapper = ({ className, ...props }: ComponentProps<'ul'>) => {
  return <ul className={twMerge('flex w-full min-w-0 flex-col gap-1', className)} {...props} />
}

export const SidebarItem = ({ className, ...props }: ComponentProps<'li'>) => {
  return <li className={twMerge('relative', className)} {...props} />
}

export const SidebarButton = ({
  className,
  active = false,
  ...props
}: ComponentProps<'button'> & { active?: boolean }) => {
  return (
    <button
      className={cn(
        'flex h-12 w-full items-center gap-2 overflow-hidden rounded-md px-4 text-left text-sm outline-none transition-[width,height,padding,background] hover:bg-accent hover:text-accent-foreground focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0',
        active && 'bg-accent text-accent-foreground',
        className
      )}
      {...props}
    />
  )
}

export const SidebarList = () => {
  const [activeSideTab, setActiveSideTab, projectName] = useFeatureFlagStore(
    useShallow((state) => [state.activeSideTab, state.setActiveSideTab, state.projectName])
  )

  const items = useMemo(
    () => [
      {
        title: 'Feature Flags',
        icon: <RiFlagLine />,
        key: ESideTab.FEATURE
      },
      {
        title: 'Roles',
        icon: <RiUserSettingsLine />,
        key: ESideTab.ROLE
      }
    ],
    []
  )
  return (
    <SidebarWrapper>
      {items.map(({ key, title, icon }) => (
        <SidebarItem key={key}>
          <SidebarButton
            active={activeSideTab === key}
            onClick={() => setActiveSideTab(projectName ? key : undefined)}
          >
            {icon}
            <span>{title}</span>
          </SidebarButton>
        </SidebarItem>
      ))}
    </SidebarWrapper>
  )
}
