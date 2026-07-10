import type { Route } from '@/payload-types'

type RouteParent = Route['parent']

const getParentId = (parent: RouteParent): number | null => {
  if (typeof parent === 'number') {
    return parent
  }

  return parent?.id ?? null
}

export const getRouteSegments = (route: Route, routesById: ReadonlyMap<number, Route>): string[] | null => {
  const segments = [route.slug]
  const visitedRouteIds = new Set<number>([route.id])
  let parentId = getParentId(route.parent)

  while (parentId !== null) {
    if (visitedRouteIds.has(parentId)) {
      return null
    }

    const parent = routesById.get(parentId)

    if (!parent) {
      return null
    }

    visitedRouteIds.add(parent.id)
    segments.unshift(parent.slug)
    parentId = getParentId(parent.parent)
  }

  return segments
}
