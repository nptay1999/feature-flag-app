import { useFeatureFlagStore } from '@renderer/store'
import { FeatureFlagSchema } from '@shared/schemas'
import { useMutation } from '@tanstack/react-query'

const saveRoles = async () => {
  // Load JSON feature flag file
  const filePath = useFeatureFlagStore.getState().featureFlagFilePath
  const newRoles = useFeatureFlagStore.getState().featureFlag?.roles
  const newFeatures = useFeatureFlagStore.getState().featureFlag?.features
  if (!filePath || !newRoles || !newFeatures) return

  const oldFeatureFlag = await window.context.loadFeatureFlagFile(filePath)

  // Mutate roles
  const newFeatureFlag = FeatureFlagSchema.parse({
    ...oldFeatureFlag,
    features: newFeatures,
    roles: newRoles
  })

  // Save feature flag with updated roles
  await window.context.saveFeatureFlag(filePath, newFeatureFlag)
}

export const useSaveRoles = () => {
  return useMutation({
    mutationKey: ['SAVE_ROLES'],
    mutationFn: saveRoles
  })
}
