import { CreateFeatureFlag, DeleteFile } from '@shared/types'
import { contextBridge, ipcRenderer } from 'electron'

if (!process.contextIsolated) {
  throw new Error('contextIsolation must be enabled in the BrowserWindow')
}

try {
  contextBridge.exposeInMainWorld('context', {
    locale: navigator.language,
    createFeatureFlag: (...args: Parameters<CreateFeatureFlag>) =>
      ipcRenderer.invoke('createFeatureFlag', ...args),
    deleteFile: (...args: Parameters<DeleteFile>) => ipcRenderer.invoke('deleteFile', ...args)
  })
} catch (error) {
  console.error(error)
}
