import type { FaqSectionProps } from '@/interfaces/ComponentProps'
import { FaqItemCard } from '@/components/cards/FaqItemCard'
import { SectionIntro } from '@/components/ui/SectionIntro'

export function FaqSection({ items }: FaqSectionProps) {
  return (
    <section className="faq js-white-bg" id="faq">
      <div className="container split-layout split-layout--media-right">
        <div className="split-layout__content">
          <SectionIntro eyebrow="FAQ" title="Często zadawane pytania" />
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
