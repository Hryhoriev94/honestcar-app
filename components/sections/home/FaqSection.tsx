import type { FaqSectionProps } from '@/interfaces/ComponentProps'
import { FaqItemCard } from '@/components/cards/FaqItemCard'

export function FaqSection({ items }: FaqSectionProps) {
  return (
    <section className="faq js-white-bg" id="faq">
      <div className="container split-layout split-layout--media-right">
        <div className="split-layout__content">
          <span className="eyebrow">FAQ</span>
          <h2 className="title-h2">Często zadawane pytania</h2>
        </div>

        <div className="split-layout__media faq__accordion card">
          {items.map((item) => (
            <FaqItemCard item={item} key={item.question} />
          ))}
        </div>
      </div>
    </section>
  )
}
