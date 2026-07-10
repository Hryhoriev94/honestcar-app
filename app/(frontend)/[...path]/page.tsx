import { notFound } from 'next/navigation'
import { HomePageView } from '@/components/pages/HomePageView'
import { SiteFooter } from '@/components/layout/SiteFooter'
import { SiteHeader } from '@/components/layout/SiteHeader'
import { RouteContentSection } from '@/components/sections/content/RouteContentSection'
import { getHomePageData } from '@/data/getHomePageData'
import { getRouteByPath } from '@/data/getRouteByPath'
import { getSiteNavigation } from '@/data/getSiteNavigation'
import { getContentPathSegments, getLocaleFromPathSegments } from '@/lib/routing/paths'

interface ContentRoutePageProps {
  params: Promise<{ path: string[] }>
}

export const dynamic = 'force-dynamic'

export default async function ContentRoutePage({ params }: ContentRoutePageProps) {
  const { path } = await params
  const locale = getLocaleFromPathSegments(path)
  const contentSegments = getContentPathSegments(path)

  if (contentSegments.length === 0 && locale !== 'pl') {
    return <HomePageView locale={locale} />
  }

  const route = await getRouteByPath(locale, contentSegments)

  if (!route) {
    notFound()
  }

  const { siteContact, siteNavigation } = await getHomePageData(locale)
  const navigation = await getSiteNavigation(locale, siteNavigation)

  return (
    <>
      <SiteHeader contact={siteContact} navigation={navigation} />
      <main>
        <RouteContentSection locale={locale} route={route} />
      </main>
      <SiteFooter contact={siteContact} navigation={navigation} />
    </>
  )
}
