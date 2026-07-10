import { buildLocalizedPath, buildNestedRoutePath, getContentPathSegments, getLocaleFromPathSegments } from '@/lib/routing/paths'

describe('routing paths', () => {
  it('uses the root path for Polish and locale prefixes for Ukrainian and Russian', () => {
    expect(buildLocalizedPath({ locale: 'pl', segments: ['uslugi'] })).toBe('/uslugi/')
    expect(buildLocalizedPath({ locale: 'uk', segments: ['poslugy'] })).toBe('/uk/poslugy/')
    expect(buildLocalizedPath({ locale: 'ru', segments: ['uslugi'] })).toBe('/ru/uslugi/')
  })

  it('builds a nested service URL from configurable segments', () => {
    expect(
      buildNestedRoutePath({
        locale: 'pl',
        parentSegments: ['uslugi', 'blacharstwo-i-lakiernictwo'],
        slug: 'naprawa-powypadkowa',
      }),
    ).toBe('/uslugi/blacharstwo-i-lakiernictwo/naprawa-powypadkowa/')
  })

  it('extracts a locale and content segments from an incoming path', () => {
    expect(getLocaleFromPathSegments(['uk', 'poslugy'])).toBe('uk')
    expect(getContentPathSegments(['ru', 'uslugi', 'diagnostika'])).toEqual(['uslugi', 'diagnostika'])
    expect(getContentPathSegments(['uslugi', 'diagnostyka'])).toEqual(['uslugi', 'diagnostyka'])
  })
})
