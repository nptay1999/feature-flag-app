import { FeatureFlagSchema } from '@shared/schemas'
import {
  CreateFeatureFlag,
  DeleteFile,
  GetFeatureFlagFilePath,
  LoadFeatureFlagFile,
  SaveFeatureFlag,
  TFeatureFlag
} from '@shared/types'
import dayjs from 'dayjs'
import { dialog } from 'electron'
import { ensureDir, ensureFile, readJSON, remove, writeJSON } from 'fs-extra'
import { homedir } from 'os'

export const getRootDir = () => {
  return `${homedir()}/Documents`
}

export const createNewFeatureFlagFileContent = (projectName: string) => {
  const content: TFeatureFlag = {
    features: [
      {
        key: 'DASHBOARD',
        name: 'Dashboard',
        tags: 'module,page',
        createdAt: dayjs().toISOString(),
        updatedAt: dayjs().toISOString(),
        updater: 'taynguyen@fullertonhealth.com',
        active: false,
        roles: ['admin']
      }
    ],
    roles: [
      {
        role: 'admin',
        createdAt: dayjs().toISOString(),
        updatedAt: dayjs().toISOString(),
        updater: 'taynguyen@fullertonhealth.com'
      }
    ],
    createdAt: dayjs().toISOString(),
    updatedAt: dayjs().toISOString(),
    updater: 'taynguyen@fullertonhealth.com',
    projectName
  }
  return content
}

export const createFeatureFlag: CreateFeatureFlag = async (projectName: string) => {
  const rootDir = getRootDir()

  await ensureDir(rootDir)

  const { filePath, canceled } = await dialog.showSaveDialog({
    title: 'New Feature Flag',
    defaultPath: `${rootDir}/featureFlag.json`,
    buttonLabel: 'Create',
    properties: ['showOverwriteConfirmation'],
    showsTagField: false,
    filters: [{ name: 'JSON', extensions: ['json'] }]
  })

  if (canceled || !filePath) {
    console.info('Feature creation canceled')
    return ''
  }

  const newContent = createNewFeatureFlagFileContent(projectName)

  await writeJSON(filePath, newContent, {
    spaces: 2,
    encoding: 'utf-8'
  })

  return filePath
}

export const deleteFile: DeleteFile = async (path) => {
  try {
    await remove(path)
  } catch (error) {
    console.error(error)
  }
  return
}

export const getFeatureFlagFilePath: GetFeatureFlagFilePath = async () => {
  const rootDir = getRootDir()

  await ensureDir(rootDir)

  const { filePaths, canceled } = await dialog.showOpenDialog({
    title: 'Select Feature Flag',
    defaultPath: rootDir,
    buttonLabel: 'Select',
    filters: [{ name: 'JSON', extensions: ['json'] }],
    properties: ['openFile']
  })

  if (canceled) {
    return ''
  }

  return filePaths[0]
}

export const loadFeatureFlagFile: LoadFeatureFlagFile = async (path: string) => {
  await ensureFile(path)

  const data = await readJSON(path, {
    encoding: 'utf-8'
  })

  const featureFlag = await FeatureFlagSchema.parseAsync(data)

  return featureFlag
}

export const saveFeatureFlag: SaveFeatureFlag = async (
  filePath: string,
  featureFlag: TFeatureFlag
) => {
  try {
    await ensureFile(filePath)
    await writeJSON(filePath, featureFlag, {
      spaces: 2,
      encoding: 'utf-8'
    })
    return true
  } catch (error) {
    console.error(error)
    return false
  }
}
