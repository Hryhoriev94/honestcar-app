import type { CSSProperties } from 'react'
import type { Media } from '@/payload-types'

interface HeroMediaProps {
  media: Media | number | null | undefined
}

export function HeroMedia({ media }: HeroMediaProps) {
  if (typeof media === 'number' || !media?.url) {
    return null
  }

  if (media.mimeType?.startsWith('video/')) {
    return (
      <div aria-hidden="true" className="pages-hero__media pages-hero__media--video">
        <video autoPlay loop muted playsInline src={media.url} />
      </div>
    )
  }

  const style: CSSProperties & Record<'--bg-image', string> = {
    '--bg-image': `url("${media.url}")`,
  }

  return <div aria-hidden="true" className="pages-hero__media" style={style} />
}
