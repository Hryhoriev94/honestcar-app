import { RouteChildCard } from '@/components/cards/RouteChildCard'
import { SectionIntro } from '@/components/ui/SectionIntro'
import type { RouteChildrenSectionProps } from '@/interfaces/PageProps'

export function RouteChildrenSection({ items }: RouteChildrenSectionProps) {
  if (items.length === 0) {
    return null
  }

  return (
    <section className="section">
      <div className="container">
        <SectionIntro eyebrow="Nasze usługi" title="Co możemy zrobić dla Twojego auta" />
        <div className="grid grid--2">
          {items.map((item, index) => (
            <RouteChildCard index={index} item={item} key={item.href} />
          ))}
        </div>
      </div>
    </section>
  )
}
