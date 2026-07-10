import configPromise from '@payload-config'
import { getPayload } from 'payload'
import type { Menu } from '@/payload-types'
import type { NavigationItem } from '@/interfaces/NavigationItem'
import type { SiteNavigation } from '@/interfaces/HomePageContent'
import { buildLocalizedPath } from '@/lib/routing/paths'
import { getRouteSegments } from '@/lib/routing/routeTree'
import type { Locale } from '@/types/Locale'

type MenuItem = NonNullable<Menu['items']>[number]

const getRouteId = (route: MenuItem['route']): number | null => {
  if (typeof route === 'number') {
    return route
  }

  return route?.id ?? null
}

const getMenuItems = (menu: Menu | null, routeUrls: ReadonlyMap<number, string>): NavigationItem[] => {
  if (!menu?.items) {
    return []
  }

  return menu.items.map((item) => {
    const routeId = getRouteId(item.route)
    const href = (routeId ? routeUrls.get(routeId) : undefined) ?? item.href ?? '#'
    const children = item.children?.map((child) => {
      const childRouteId = getRouteId(child.route)

      return {
        href: (childRouteId ? routeUrls.get(childRouteId) : undefined) ?? child.href ?? '#',
        label: child.label,
      }
    })

    return children && children.length > 0 ? { children, href, label: item.label } : { href, label: item.label }
  })
}

const getMenuByName = async (name: string, locale: Locale): Promise<Menu | null> => {
  const payload = await getPayload({ config: configPromise })
  const { docs } = await payload.find({
    collection: 'menus',
    depth: 0,
    fallbackLocale: false,
    limit: 1,
    locale,
    where: { name: { equals: name } },
  })

  return docs[0] ?? null
}

export const getSiteNavigation = async (locale: Locale, fallback: SiteNavigation): Promise<SiteNavigation> => {
  try {
    const payload = await getPayload({ config: configPromise })
    const { docs: routes } = await payload.find({
      collection: 'routes',
      depth: 0,
      fallbackLocale: false,
      limit: 1_000,
      locale,
      where: { status: { equals: 'published' } },
    })
    const localizedRoutes = routes.filter((route) => typeof route.slug === 'string' && route.slug.length > 0)
    const routesById = new Map(localizedRoutes.map((route) => [route.id, route]))
    const routeUrls = new Map<number, string>()

    for (const route of localizedRoutes) {
      const segments = getRouteSegments(route, routesById)

      if (segments) {
        routeUrls.set(route.id, buildLocalizedPath({ locale, segments }))
      }
    }

    const [primaryMenu, servicesMenu] = await Promise.all([getMenuByName('primary', locale), getMenuByName('services', locale)])
    const primary = getMenuItems(primaryMenu, routeUrls)
    const services = getMenuItems(servicesMenu, routeUrls)

    return {
      primary: primary.length > 0 ? primary : fallback.primary,
      services: services.length > 0 ? services : fallback.services,
    }
  } catch {
    return fallback
  }
}
