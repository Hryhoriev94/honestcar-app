import type { CSSProperties } from 'react'
import type { RouteChildPreview } from '@/interfaces/RouteContent'

interface RouteChildCardMediaProps {
  href: string
  media: RouteChildPreview['media']
}

const fallbackMediaByPath: ReadonlyArray<{ path: string; source: string }> = [
  { path: 'serwis-i-diagnostyka', source: '/images/services/diagnostyka.jpg' },
  { path: 'naprawa-silnika', source: '/images/services/naprawa-silnika.jpg' },
  { path: 'zawieszenie-i-uklad-jezdny', source: '/images/services/naprawa-zawieszenia.jpg' },
  { path: 'uklad-hamulcowy', source: '/images/services/uklad-hamulcowy.jpg' },
  { path: 'uklad-napedowy-i-skrzynia-biegow', source: '/images/services/naprawa-ukladu-napedowego.jpg' },
  { path: 'blacharstwo-i-lakiernictwo', source: '/images/services/blacharstwo-i-lakiernictwo.jpg' },
]

export function RouteChildCardMedia({ href, media }: RouteChildCardMediaProps) {
  const fallback = fallbackMediaByPath.find(({ path }) => href.includes(path))?.source ?? '/images/services/services-overview.jpg'
  const source = media?.mimeType?.startsWith('image/') ? media.url : fallback

  if (!source) {
    return null
  }

  const style: CSSProperties & Record<'--bg-image', string> = {
    '--bg-image': `url("${source}")`,
  }

  return <div aria-hidden="true" className="card--service-category__image" style={style} />
}
