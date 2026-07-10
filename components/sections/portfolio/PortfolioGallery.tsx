import type { PortfolioItem } from '@/payload-types'

interface PortfolioGalleryProps {
  gallery: PortfolioItem['gallery']
}

export function PortfolioGallery({ gallery }: PortfolioGalleryProps) {
  const items = (gallery ?? []).flatMap((item) => {
    const image = item.image
    const source = typeof image === 'number' ? undefined : image.url

    return typeof image === 'number' || typeof source !== 'string' ? [] : [{ id: item.id, image, source }]
  })

  if (items.length === 0) {
    return null
  }

  return (
    <section className="section portfolio-single">
      <div className="container">
        <div className="portfolio-single__gallery-main">
          {items.map(({ id, image, source }) => image.mimeType?.startsWith('video/') ? (
            <video controls key={id} src={source} />
          ) : (
            <img alt={image.alt} key={id} src={source} />
          ))}
        </div>
      </div>
    </section>
  )
}
