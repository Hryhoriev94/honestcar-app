import configPromise from '@payload-config'
import { getPayload } from 'payload'
import type { Route } from '@/payload-types'
import type { RouteChildPreview } from '@/interfaces/RouteContent'
import { buildLocalizedPath } from '@/lib/routing/paths'
import { getRouteSegments } from '@/lib/routing/routeTree'
import type { Locale } from '@/types/Locale'

const getTargetDescription = (route: Route): string | undefined => {
  const target = route.target.value

  if (typeof target === 'number') {
    return undefined
  }

  if ('summary' in target) {
    return target.summary ?? undefined
  }

  if ('description' in target) {
    return target.description ?? undefined
  }

  return undefined
}

const getTargetTitle = (route: Route): string => {
  const target = route.target.value

  return typeof target === 'number' ? route.slug : target.title
}

const getTargetMedia = async (
  route: Route,
  payload: Awaited<ReturnType<typeof getPayload>>,
  locale: Locale,
): Promise<RouteChildPreview['media'] | undefined> => {
  if (route.target.relationTo !== 'services') {
    return undefined
  }

  const target = route.target.value

  if (typeof target === 'number' || !('featuredImage' in target) || !target.featuredImage) {
    return undefined
  }

  if (typeof target.featuredImage !== 'number') {
    return target.featuredImage
  }

  return payload.findByID({
    collection: 'media',
    depth: 1,
    id: target.featuredImage,
    locale,
  })
}

export const getRouteChildren = async (parentRouteId: number, locale: Locale): Promise<RouteChildPreview[]> => {
  const payload = await getPayload({ config: configPromise })
  const { docs: routes } = await payload.find({
    collection: 'routes',
    depth: 1,
    fallbackLocale: false,
    limit: 1_000,
    locale,
    where: { status: { equals: 'published' } },
  })
  const localizedRoutes = routes.filter((route) => typeof route.slug === 'string' && route.slug.length > 0)
  const routesById = new Map(localizedRoutes.map((route) => [route.id, route]))

  const childRoutes = localizedRoutes.flatMap((route) => {
    const parentId = typeof route.parent === 'number' ? route.parent : route.parent?.id

    if (parentId !== parentRouteId) {
      return []
    }

    const segments = getRouteSegments(route, routesById)

    if (!segments) {
      return []
    }

    return [
      {
        preview: {
          description: getTargetDescription(route),
          href: buildLocalizedPath({ locale, segments }),
          title: getTargetTitle(route),
        },
        route,
      },
    ]
  })

  return Promise.all(childRoutes.map(async ({ preview, route }) => {
    return {
      ...preview,
      media: await getTargetMedia(route, payload, locale),
    }
  }))
}
