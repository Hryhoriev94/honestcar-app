import type { BrandsSectionProps } from '@/interfaces/ComponentProps'
import { BrandCard } from '@/components/cards/BrandCard'

export function BrandsSection({ brands }: BrandsSectionProps) {
  return (
    <section className="brands white-section" id="brands">
      <div className="container split-layout split-layout--media-left split-layout split-layout--reverse">
        <div className="split-layout__content">
          <span className="eyebrow">Marki, które obsługujemy</span>
          <h2 className="title-h2">Współpracujemy ze wszystkimi głównymi markami</h2>
          <p>Nasi specjaliści mają doświadczenie w pracy z szeroką gamą marek i modeli.</p>
        </div>
        <div className="split-layout__media brands-slider always-slider" data-slider="brands">
          <div className="brands__grid swiper-wrapper">
            {brands.map((brand) => (
              <BrandCard brand={brand} key={brand.name} />
            ))}
          </div>
          <div className="brands-slider__pagination swiper-pagination" />
        </div>
      </div>
    </section>
  )
}
