import type { Route } from '@/payload-types'
import { getRouteSegments } from '@/lib/routing/routeTree'

const createRoute = (id: number, slug: string, parent?: number): Route => ({
  id,
  slug,
  parent,
  target: { relationTo: 'pages', value: id },
  status: 'published',
  showInSitemap: true,
  createdAt: '2026-01-01T00:00:00.000Z',
  updatedAt: '2026-01-01T00:00:00.000Z',
})

describe('route tree', () => {
  it('collects all parent slugs for a nested route', () => {
    const routes = [
      createRoute(1, 'uslugi'),
      createRoute(2, 'blacharstwo-i-lakiernictwo', 1),
      createRoute(3, 'naprawa-powypadkowa', 2),
    ]

    expect(getRouteSegments(routes[2], new Map(routes.map((route) => [route.id, route])))).toEqual([
      'uslugi',
      'blacharstwo-i-lakiernictwo',
      'naprawa-powypadkowa',
    ])
  })

  it('rejects a cyclic route hierarchy', () => {
    const routes = [createRoute(1, 'first', 2), createRoute(2, 'second', 1)]

    expect(getRouteSegments(routes[0], new Map(routes.map((route) => [route.id, route])))).toBeNull()
  })
})
