import { CacheSchema, FeatureFlagSchema } from '@shared/schemas'
import {
  CreateFeatureFlag,
  DeleteFile,
  GetFeatureFlagFilePath,
  LoadFeatureFlagFile,
  SaveFeatureFlag,
  TCache,
  TFeatureFlag,
  WriteCache
} from '@shared/types'
import dayjs from 'dayjs'
import { dialog } from 'electron'
import {
  ensureDir,
  ensureFile,
  pathExists,
  readJson,
  readJSON,
  remove,
  writeJson,
  writeJSON
} from 'fs-extra'
import { homedir } from 'os'
import path from 'path'
import { LoadCache } from './../../shared/types.d'

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

  // Read and validate feature flag file
  const data = await readJSON(path, {
    encoding: 'utf-8'
  })
  const featureFlag = await FeatureFlagSchema.parseAsync(data)

  const cache = await loadCache()

  // Check if the file already exists in cache
  const existingEntry = cache.find((item) => item.path === path)

  // If it exists and is already active, return immediately (no cache update needed)
  if (existingEntry?.active) return featureFlag

  // Otherwise, update the cache:
  // - If the file exists, update its active status
  // - Otherwise, add a new entry and deactivate others
  let updatedCache: TCache
  if (existingEntry) {
    // Update the existing entry's active status
    updatedCache = cache.map((item) => ({
      ...item,
      active: item.path === path // Only activate the matched entry
    }))
  } else {
    // Add new entry and deactivate others
    updatedCache = [
      { path, name: featureFlag.projectName, active: true },
      ...cache.map((item) => ({ ...item, active: false }))
    ]
  }

  // Save only if an update is needed
  await writeCache(updatedCache)

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

export const loadCache: LoadCache = async () => {
  // Get home directory and construct the cache file path
  const cacheDir = path.join(homedir(), '.cache', 'feature-flag')
  const cacheFile = path.join(cacheDir, 'cache.json')

  try {
    // Ensure the cache directory exists
    await ensureDir(cacheDir)

    // Check if cache file exists, if not create with empty array
    if (!(await pathExists(cacheFile))) {
      await writeJson(cacheFile, [])
    }

    // Load JSON data
    const rawData = await readJson(cacheFile)

    // Validate data with Zod
    return CacheSchema.parse(rawData)
  } catch (error) {
    console.error('Failed to load cache:', error)
    return []
  }
}

export const writeCache: WriteCache = async (cache) => {
  const cacheDir = path.join(homedir(), '.cache', 'feature-flag')
  const cacheFile = path.join(cacheDir, 'cache.json')

  try {
    // Ensure the cache directory exists
    await ensureDir(cacheDir)

    // Validate cache data before writing
    const validatedCache = CacheSchema.parse(cache)

    // Write to JSON file
    await writeJson(cacheFile, validatedCache, { spaces: 2 })

    return true
  } catch (error) {
    console.error('Failed to write cache:', error)
    return false
  }
}
