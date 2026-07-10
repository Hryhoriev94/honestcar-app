import { ServiceBenefitCard } from '@/components/cards/ServiceBenefitCard'
import { SectionIntro } from '@/components/ui/SectionIntro'
import type { ServiceBenefitsSectionProps } from '@/interfaces/ServiceProps'

export function ServiceBenefitsSection({ block }: ServiceBenefitsSectionProps) {
  const items = block.items ?? []

  return (
    <section className="white-section">
      <div className="container">
        <SectionIntro eyebrow={block.eyebrow} text={block.text ?? undefined} title={block.title} />
        <div className="grid grid--2">
          {items.map((item) => (
            <ServiceBenefitCard item={item} key={item.id ?? item.title} />
          ))}
        </div>
      </div>
    </section>
  )
}
