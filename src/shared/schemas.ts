import dayjs from 'dayjs'
import { z } from 'zod'

export const FeatureSchema = z.object({
  key: z.string(),
  name: z.string(),
  tags: z.string(),
  createdAt: z.string().refine((date) => dayjs(date).isValid(), {
    message: 'Invalid date format'
  }),
  updatedAt: z.string().refine((date) => dayjs(date).isValid(), {
    message: 'Invalid date format'
  }),
  updater: z.string().email(),
  active: z.boolean(),
  roles: z.array(z.string())
})

export const RoleSchema = z.object({
  role: z.string(),
  createdAt: z.string().refine((date) => dayjs(date).isValid(), {
    message: 'Invalid date format'
  }),
  updatedAt: z.string().refine((date) => dayjs(date).isValid(), {
    message: 'Invalid date format'
  }),
  updater: z.string().email()
})

export const FeatureFlagSchema = z.object({
  features: z.array(FeatureSchema),
  roles: z.array(RoleSchema),
  createdAt: z.string().refine((date) => dayjs(date).isValid(), {
    message: 'Invalid date format'
  }),
  updatedAt: z.string().refine((date) => dayjs(date).isValid(), {
    message: 'Invalid date format'
  }),
  updater: z.string().email(),
  projectName: z.string().max(255)
})

export const CacheSchema = z.array(
  z.object({
    path: z.string(),
    name: z.string(),
    active: z.boolean()
  })
)
