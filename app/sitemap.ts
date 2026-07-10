import type { MetadataRoute } from 'next'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { buildLocalizedPath } from '@/lib/routing/paths'
import { getRouteSegments } from '@/lib/routing/routeTree'
import type { Route } from '@/payload-types'
import type { Locale } from '@/types/Locale'

const locales: readonly Locale[] = ['pl', 'ru', 'uk']
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'

const toAbsoluteUrl = (path: string): string => new URL(path, siteUrl).toString()

const hasLocalizedSlug = (route: Route): boolean => typeof route.slug === 'string' && route.slug.length > 0

const getLocalizedRoutes = async (locale: Locale): Promise<Route[]> => {
  const payload = await getPayload({ config: configPromise })
  const { docs } = await payload.find({
    collection: 'routes',
    depth: 0,
    fallbackLocale: false,
    limit: 1_000,
    locale,
    where: {
      and: [{ status: { equals: 'published' } }, { showInSitemap: { equals: true } }],
    },
  })

  return docs.filter(hasLocalizedSlug)
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const urls: MetadataRoute.Sitemap = locales.map((locale) => ({
    url: toAbsoluteUrl(buildLocalizedPath({ locale, segments: [] })),
  }))

  try {
    for (const locale of locales) {
      const routes = await getLocalizedRoutes(locale)
      const routesById = new Map(routes.map((route) => [route.id, route]))

      for (const route of routes) {
        const segments = getRouteSegments(route, routesById)

        if (segments) {
          urls.push({ url: toAbsoluteUrl(buildLocalizedPath({ locale, segments })) })
        }
      }
    }
  } catch {
    return urls
  }

  return urls
}
