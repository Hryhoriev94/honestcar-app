import configPromise from '@payload-config'
import { getPayload } from 'payload'
import type { Route } from '@/payload-types'
import type { Locale } from '@/types/Locale'

const findRouteSegment = async (locale: Locale, slug: string, parentId: number | null): Promise<Route | null> => {
  const payload = await getPayload({ config: configPromise })
  const { docs } = await payload.find({
    collection: 'routes',
    depth: 3,
    fallbackLocale: false,
    limit: 2,
    locale,
    where: {
      and: [
        { slug: { equals: slug } },
        { status: { equals: 'published' } },
        parentId === null ? { parent: { exists: false } } : { parent: { equals: parentId } },
      ],
    },
  })

  return docs.length === 1 ? docs[0] : null
}

export const getRouteByPath = async (locale: Locale, segments: readonly string[]): Promise<Route | null> => {
  let parentId: number | null = null
  let route: Route | null = null

  for (const segment of segments) {
    route = await findRouteSegment(locale, segment, parentId)

    if (!route) {
      return null
    }

    parentId = route.id
  }

  return route
}
