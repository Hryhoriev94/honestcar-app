import type { RouteContentSectionProps } from '@/interfaces/PageProps'
import { PageBlockRenderer } from '@/components/sections/content/PageBlockRenderer'
import { RouteChildrenSection } from '@/components/sections/content/RouteChildrenSection'
import { ServiceBlockRenderer } from '@/components/sections/service/ServiceBlockRenderer'
import { ServicesCatalogHero } from '@/components/sections/service/ServicesCatalogHero'
import { PortfolioGallery } from '@/components/sections/portfolio/PortfolioGallery'
import { PortfolioDetails } from '@/components/sections/portfolio/PortfolioDetails'
import { SpecialOfferDetails } from '@/components/sections/special-offers/SpecialOfferDetails'
import { HeroMedia } from '@/components/sections/content/HeroMedia'
import { getRouteChildren } from '@/data/getRouteChildren'
import type { HeroBlock, Page } from '@/payload-types'

const isPageTarget = (target: RouteContentSectionProps['route']['target']['value']): target is Page =>
  typeof target !== 'number' && 'seo' in target

const getTargetDescription = (route: RouteContentSectionProps['route']): string | null => {
  const value = route.target.value

  if (typeof value === 'number') {
    return null
  }

  if ('summary' in value) {
    return value.summary ?? null
  }

  if ('description' in value) {
    return value.description ?? null
  }

  return null
}

export async function RouteContentSection({ locale, route }: RouteContentSectionProps) {
  const target = route.target.value
  const children = await getRouteChildren(route.id, locale)

  if (isPageTarget(target)) {
    if (route.slug === 'uslugi') {
      const hero = target.layout.find((block): block is HeroBlock => block.blockType === 'hero')

      return (
        <>
          <ServicesCatalogHero description={hero?.text} title={hero?.title ?? target.title} />
          <RouteChildrenSection items={children} />
        </>
      )
    }

    return (
      <>
        <PageBlockRenderer layout={target.layout} />
        <RouteChildrenSection items={children} />
      </>
    )
  }

  const title = typeof target === 'number' ? route.slug : target.title
  const description = getTargetDescription(route)

  return (
    <>
      <section className="pages-hero">
        {typeof target !== 'number' && 'featuredImage' in target ? <HeroMedia media={target.featuredImage} /> : null}
        <div className="container">
          <div className="breadcrumbs" aria-label="Breadcrumb">
            <ol className="breadcrumbs__list">
              <li className="breadcrumbs__item">
                <span className="breadcrumbs__current">{title}</span>
              </li>
            </ol>
          </div>
          <div className="pages-hero__wrapper">
            <div className="pages-hero__wrapper--desc">
              <p className="eyebrow">Honest Car</p>
              <h1 className="section-title">{title}</h1>
              {description ? <p>{description}</p> : null}
            </div>
          </div>
        </div>
      </section>
      {typeof target !== 'number' && 'gallery' in target ? <PortfolioGallery gallery={target.gallery} /> : null}
      {typeof target !== 'number' && 'story' in target ? <PortfolioDetails facts={target.facts} sidebar={target.sidebar} story={target.story} /> : null}
      {typeof target !== 'number' && 'prices' in target ? <SpecialOfferDetails details={target.details} prices={target.prices} /> : null}
      {typeof target !== 'number' && 'summary' in target && target.layout ? <ServiceBlockRenderer layout={target.layout} /> : null}
      <RouteChildrenSection items={children} />
    </>
  )
}
