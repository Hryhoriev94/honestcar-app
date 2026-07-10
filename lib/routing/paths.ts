import type { Locale } from '@/types/Locale'
import type { NestedRoutePathInput, RoutePathInput } from '@/types/Route'

const localePrefixes: Record<Locale, string> = {
  pl: '',
  ru: 'ru',
  uk: 'uk',
}

const normalizeSegment = (segment: string): string => segment.trim().replace(/^\/+|\/+$/g, '')

const normalizeSegments = (segments: readonly string[]): string[] =>
  segments.map(normalizeSegment).filter((segment) => segment.length > 0)

export const buildLocalizedPath = ({ locale, segments }: RoutePathInput): string => {
  const pathSegments = [localePrefixes[locale], ...normalizeSegments(segments)].filter(
    (segment) => segment.length > 0,
  )

  return pathSegments.length === 0 ? '/' : `/${pathSegments.join('/')}/`
}

export const buildNestedRoutePath = ({ locale, parentSegments = [], slug }: NestedRoutePathInput): string =>
  buildLocalizedPath({
    locale,
    segments: [...parentSegments, slug],
  })

export const getLocaleFromPathSegments = (segments: readonly string[]): Locale => {
  const [firstSegment] = normalizeSegments(segments)

  if (firstSegment === 'ru' || firstSegment === 'uk') {
    return firstSegment
  }

  return 'pl'
}

export const getContentPathSegments = (segments: readonly string[]): string[] => {
  const normalizedSegments = normalizeSegments(segments)
  const locale = getLocaleFromPathSegments(normalizedSegments)

  return locale === 'pl' ? normalizedSegments : normalizedSegments.slice(1)
}
