import type { AboutBlock } from '@/payload-types'

interface AboutBlockSectionProps { block: AboutBlock }

export function AboutBlockSection({ block }: AboutBlockSectionProps) {
  const media = typeof block.media === 'number' ? undefined : block.media

  return <section className="white-section"><div className="container split-layout split-layout--media-right">
    <div className="split-layout__content"><span className="eyebrow">{block.eyebrow}</span><h2 className="title-h2">{block.title}</h2>{block.text ? <p>{block.text}</p> : null}{block.textSecond ? <p>{block.textSecond}</p> : null}</div>
    {media?.url ? <div className="split-layout__media"><img alt={media.alt} src={media.url} /></div> : null}
  </div></section>
}
