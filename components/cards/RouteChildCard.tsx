import Link from 'next/link'
import type { RouteChildCardProps } from '@/interfaces/PageProps'
import { RouteChildCardMedia } from '@/components/cards/RouteChildCardMedia'

export function RouteChildCard({ index, item }: RouteChildCardProps) {
  return (
    <article className="card card--service-category">
      <div className="card--service-category__content">
        <span className="card__number">{String(index + 1).padStart(2, '0')}</span>
        <h3>{item.title}</h3>
        {item.description ? <p>{item.description}</p> : null}
        <div className="card__actions">
          <Link className="btn btn--outline" href={item.href}>
            Więcej
          </Link>
        </div>
      </div>
      <RouteChildCardMedia href={item.href} media={item.media} />
    </article>
  )
}
