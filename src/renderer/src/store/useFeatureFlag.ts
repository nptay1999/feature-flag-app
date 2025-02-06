import { ESideTab } from '@renderer/utils'
import { FeatureFlagSchema } from '@shared/schemas'
import { TFeatureFlag } from '@shared/types'
import { create } from 'zustand'

const initValues = {
  featureFlag: undefined,
  projectName: undefined,
  activeSideTab: undefined,
  featureFlagFilePath: undefined
}

type TFeatureFlagStore = {
  featureFlag?: TFeatureFlag
  projectName?: string
  setFeatureFlag: (featureFlag?: TFeatureFlag) => void

  featureFlagFilePath?: string
  setFeatureFlagFilePath: (featureFlagFilePath?: string) => void

  activeSideTab?: ESideTab
  setActiveSideTab: (activeSideTab?: ESideTab) => void

  toggleFeature: (featureKey: string) => void

  resetStore: VoidFunction
}

export const useFeatureFlagStore = create<TFeatureFlagStore>()((set, get) => ({
  ...initValues,
  setFeatureFlag: (featureFlag?: TFeatureFlag) => {
    if (!featureFlag) return set({ featureFlag: undefined, projectName: undefined })
    const featureFlagValid = FeatureFlagSchema.parse(featureFlag)
    set({ featureFlag: featureFlagValid, projectName: featureFlag.projectName })
  },

  setFeatureFlagFilePath: (featureFlagFilePath?: string) => set({ featureFlagFilePath }),

  setActiveSideTab: (activeSideTab?: ESideTab) => set({ activeSideTab }),

  toggleFeature: (featureKey: string) => {
    const featureFlag = get().featureFlag
    if (!featureFlag) return

    let isMutate = false
    const newFeatures = featureFlag.features.map((f) => {
      if (f.key !== featureKey) return f

      isMutate = true

      return { ...f, active: !f.active }
    })

    if (!isMutate) return

    return set({ featureFlag: { ...featureFlag, features: newFeatures } })
  },

  resetStore: () => set({ ...initValues })
}))
