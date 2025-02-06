import {
  CreateFeatureFlag,
  DeleteFile,
  GetFeatureFlagFilePath,
  LoadFeatureFlagFile,
  SaveFeatureFlag
} from '@shared/types'

declare global {
  interface Window {
    context: {
      createFeatureFlag: CreateFeatureFlag
      deleteFile: DeleteFile
      getFeatureFlagFilePath: GetFeatureFlagFilePath
      loadFeatureFlagFile: LoadFeatureFlagFile
      saveFeatureFlag: SaveFeatureFlag
    }
  }
}
