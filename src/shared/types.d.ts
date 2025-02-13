import { z } from 'zod'
import { CacheSchema, FeatureFlagSchema, FeatureSchema, RoleSchema } from './schemas'

export type TRole = z.infer<typeof RoleSchema>
export type TFeature = z.infer<typeof FeatureSchema>
export type TFeatureFlag = z.infer<typeof FeatureFlagSchema>
export type TCache = z.infer<typeof CacheSchema>

export type CreateFeatureFlag = (projectName: string) => Promise<string>
export type DeleteFile = (path: string) => Promise<void>
export type GetFeatureFlagFilePath = () => Promise<string>
export type LoadFeatureFlagFile = (path: string) => Promise<TFeatureFlag>
export type SaveFeatureFlag = (filePath: string, featureFlag: TFeatureFlag) => Promise<boolean>
export type LoadCache = () => Promise<TCache>
export type WriteCache = (cache: TCache) => Promise<boolean>
