import {
  CreateFeatureFlag,
  DeleteFile,
  GetFeatureFlagFilePath,
  LoadFeatureFlagFile
} from '@shared/types'

declare global {
  interface Window {
    context: {
      createFeatureFlag: CreateFeatureFlag
      deleteFile: DeleteFile
      getFeatureFlagFilePath: GetFeatureFlagFilePath
      loadFeatureFlagFile: LoadFeatureFlagFile
    }
  }
}
