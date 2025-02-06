import { useFeatureFlagStore } from '@renderer/store'
import { FeatureFlagSchema } from '@shared/schemas'
import { useMutation } from '@tanstack/react-query'

const saveFeatures = async () => {
  // load json feature flag file
  const filePath = useFeatureFlagStore.getState().featureFlagFilePath
  const newFeatures = useFeatureFlagStore.getState().featureFlag?.features
  if (!filePath || !newFeatures) return

  const oldFeatureFlag = await window.context.loadFeatureFlagFile(filePath)

  // mutate feature
  const newFeatureFlag = FeatureFlagSchema.parse({ ...oldFeatureFlag, features: newFeatures })

  // save feature flag
  await window.context.saveFeatureFlag(filePath, newFeatureFlag)
}

export const useSaveFeatures = () => {
  return useMutation({
    mutationKey: ['SAVE_FEATURES'],
    mutationFn: saveFeatures
  })
}
