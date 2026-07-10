import { HeroBlockSection } from '@/components/sections/content/HeroBlockSection'
import { AboutBlockSection } from '@/components/sections/content/AboutBlockSection'
import { ContactBlockSection } from '@/components/sections/content/ContactBlockSection'
import { PriceTableSection } from '@/components/sections/service/PriceTableSection'
import type { PageBlockRendererProps } from '@/interfaces/PageProps'

export function PageBlockRenderer({ layout }: PageBlockRendererProps) {
  return layout.map((block) => {
    if (block.blockType === 'hero') {
      return <HeroBlockSection block={block} key={block.id ?? block.title} />
    }

    if (block.blockType === 'about') return <AboutBlockSection block={block} key={block.id ?? block.title} />
    if (block.blockType === 'contact') return <ContactBlockSection block={block} key={block.id ?? block.title} />
    if (block.blockType === 'price-table') return <PriceTableSection block={block} key={block.id ?? block.title} />

    return null
  })
}
