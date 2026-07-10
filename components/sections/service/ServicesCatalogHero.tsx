import type { CSSProperties } from 'react'

interface ServicesCatalogHeroProps {
  description?: string | null
  title: string
}

const mediaStyle: CSSProperties & Record<'--bg-image', string> = {
  '--bg-image': 'url("/images/services/services-overview.jpg")',
}

export function ServicesCatalogHero({ description, title }: ServicesCatalogHeroProps) {
  return (
    <section className="pages-hero">
      <div aria-hidden="true" className="pages-hero__media" style={mediaStyle} />
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
  )
}
