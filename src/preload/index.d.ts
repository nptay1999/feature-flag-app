import {
  CreateFeatureFlag,
  DeleteFile,
  GetFeatureFlagFilePath,
  LoadCache,
  LoadFeatureFlagFile,
  SaveFeatureFlag,
  WriteCache
} from '@shared/types'

declare global {
  interface Window {
    context: {
      createFeatureFlag: CreateFeatureFlag
      deleteFile: DeleteFile
      getFeatureFlagFilePath: GetFeatureFlagFilePath
      loadFeatureFlagFile: LoadFeatureFlagFile
      saveFeatureFlag: SaveFeatureFlag
      loadCache: LoadCache
      writeCache: WriteCache
    }
  }
}
