import { PriceTableSection } from '@/components/sections/service/PriceTableSection'
import { ServiceBenefitsSection } from '@/components/sections/service/ServiceBenefitsSection'
import { ServiceFaqSection } from '@/components/sections/service/ServiceFaqSection'
import type { ServiceBlockRendererProps } from '@/interfaces/ServiceProps'

export function ServiceBlockRenderer({ layout }: ServiceBlockRendererProps) {
  return layout.map((block) => {
    if (block.blockType === 'service-benefits') {
      return <ServiceBenefitsSection block={block} key={block.id ?? block.title} />
    }

    if (block.blockType === 'price-table') {
      return <PriceTableSection block={block} key={block.id ?? block.title} />
    }

    if (block.blockType === 'service-faq') {
      return <ServiceFaqSection block={block} key={block.id ?? block.title} />
    }

    return null
  })
}
