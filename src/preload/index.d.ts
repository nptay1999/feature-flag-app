import { CreateFeatureFlag, DeleteFile } from '@shared/types'

declare global {
  interface Window {
    context: {
      createFeatureFlag: CreateFeatureFlag
      deleteFile: DeleteFile
    }
  }
}
