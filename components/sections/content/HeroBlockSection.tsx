import type { HeroBlockSectionProps } from '@/interfaces/PageProps'
import { HeroMedia } from '@/components/sections/content/HeroMedia'

export function HeroBlockSection({ block }: HeroBlockSectionProps) {
  return (
    <section className="pages-hero">
      <HeroMedia media={block.media} />
      <div className="container">
        <div className="pages-hero__wrapper">
          <div className="pages-hero__wrapper--desc">
            {block.eyebrow ? <p className="eyebrow">{block.eyebrow}</p> : null}
            <h1 className="section-title">{block.title}</h1>
            {block.text ? <p>{block.text}</p> : null}
          </div>
        </div>
      </div>
    </section>
  )
}
