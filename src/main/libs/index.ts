import { CreateFeatureFlag, DeleteFile } from '@shared/types'
import dayjs from 'dayjs'
import { dialog } from 'electron'
import { ensureDir, remove, writeJSON } from 'fs-extra'
import { homedir } from 'os'

export const getRootDir = () => {
  return `${homedir()}/Documents`
}

export const createNewFeatureFlagFileContent = () => {
  const content = {
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
    updater: 'taynguyen@fullertonhealth.com'
  }
  return content
}

export const createFeatureFlag: CreateFeatureFlag = async () => {
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

  const newContent = createNewFeatureFlagFileContent()

  await writeJSON(filePath, newContent, {
    spaces: 2
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
