import {
  CreateFeatureFlag,
  DeleteFile,
  GetFeatureFlagFilePath,
  LoadCache,
  LoadFeatureFlagFile,
  SaveFeatureFlag,
  WriteCache
} from '@shared/types'
import { contextBridge, ipcRenderer } from 'electron'

if (!process.contextIsolated) {
  throw new Error('contextIsolation must be enabled in the BrowserWindow')
}

try {
  contextBridge.exposeInMainWorld('context', {
    locale: navigator.language,
    createFeatureFlag: (...args: Parameters<CreateFeatureFlag>) =>
      ipcRenderer.invoke('createFeatureFlag', ...args),
    deleteFile: (...args: Parameters<DeleteFile>) => ipcRenderer.invoke('deleteFile', ...args),
    getFeatureFlagFilePath: (...args: Parameters<GetFeatureFlagFilePath>) =>
      ipcRenderer.invoke('getFeatureFlagFilePath', ...args),
    loadFeatureFlagFile: (...args: Parameters<LoadFeatureFlagFile>) =>
      ipcRenderer.invoke('loadFeatureFlagFile', ...args),
    saveFeatureFlag: (...args: Parameters<SaveFeatureFlag>) =>
      ipcRenderer.invoke('saveFeatureFlag', ...args),
    loadCache: (...args: Parameters<LoadCache>) => ipcRenderer.invoke('loadCache', ...args),
    writeCache: (...args: Parameters<WriteCache>) => ipcRenderer.invoke('writeCache', ...args)
  })
} catch (error) {
  console.error(error)
}
