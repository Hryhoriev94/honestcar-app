import type { Locale } from '@/types/Locale'

export interface RoutePathInput {
  locale: Locale
  segments: readonly string[]
}

export interface NestedRoutePathInput {
  locale: Locale
  parentSegments?: readonly string[]
  slug: string
}
