import { PriceRow } from '@/components/cards/PriceRow'
import { SectionIntro } from '@/components/ui/SectionIntro'
import type { PriceTableSectionProps } from '@/interfaces/ServiceProps'

export function PriceTableSection({ block }: PriceTableSectionProps) {
  const items = block.items ?? []

  return (
    <section className="price white-section">
      <div className="container split-layout split-layout--equal split-layout--reverse">
        <div className="split-layout__content">
          <SectionIntro eyebrow={block.eyebrow} text={block.text ?? undefined} title={block.title} />
        </div>
        <div className="split-layout__media">
          <div className="price-table">
            <ul className="price-table__list">
              <li className="price-table__head">
                <span>Nazwa usługi</span>
                <span>Cena</span>
              </li>
              {items.map((item) => (
                <PriceRow item={item} key={item.id ?? item.name} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
