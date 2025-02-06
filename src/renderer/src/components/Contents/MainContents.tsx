import { Features, Roles } from '@renderer/components'
import { useFeatureFlagStore } from '@renderer/store'
import { ESideTab } from '@renderer/utils'
import { Suspense } from 'react'
import { RiLoader4Line } from 'react-icons/ri'
import { useShallow } from 'zustand/react/shallow'

export const MainContents = () => {
  const [activeSideTab] = useFeatureFlagStore(useShallow((state) => [state.activeSideTab]))

  return (
    <div className="min-h-[calc(100%-3rem)]">
      <Suspense fallback={<Spin />}>
        {activeSideTab === ESideTab.FEATURE && <Features />}
        {activeSideTab === ESideTab.ROLE && <Roles />}
      </Suspense>
    </div>
  )
}

const Spin = () => {
  return (
    <div className="flex min-h-full items-center justify-center pt-3.5">
      <RiLoader4Line className="h-6 w-6 animate-spin text-primary-foreground" />
    </div>
  )
}
