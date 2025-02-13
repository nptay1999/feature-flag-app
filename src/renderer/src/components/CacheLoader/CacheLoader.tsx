import { useLoadCache } from '@renderer/hooks'
import { Spin } from '@renderer/libs'
import { useFeatureFlagStore } from '@renderer/store'
import { ESideTab } from '@renderer/utils'
import { TCache } from '@shared/types'
import { ReactNode, useLayoutEffect } from 'react'
import { useShallow } from 'zustand/react/shallow'

type TCacheLoaderProps = {
  children?: ReactNode
}

export const CacheLoader = ({ children }: TCacheLoaderProps) => {
  const { data, isLoading } = useLoadCache()
  const [setFeatureFlag, setActiveSideTab, setFeatureFlagFilePath] = useFeatureFlagStore(
    useShallow((state) => [
      state.setFeatureFlag,
      state.setActiveSideTab,
      state.setFeatureFlagFilePath
    ])
  )

  const handleLoadFeature = async (filePath: string) => {
    if (!filePath) return

    const featureFlag = await window.context.loadFeatureFlagFile(filePath)
    setFeatureFlagFilePath(filePath)
    setActiveSideTab(ESideTab.FEATURE)
    setFeatureFlag(featureFlag)
  }

  useLayoutEffect(() => {
    if (!isLoading && data) {
      const activeProject = (data as TCache).find((d) => d.active)
      if (!activeProject) return

      handleLoadFeature(activeProject.path)
    }
  }, [isLoading, data])

  return <Spin spinning={isLoading}>{children}</Spin>
}
