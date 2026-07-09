import type { CSSProperties } from 'react'
import type { ServiceCardProps } from '@/interfaces/ComponentProps'
import { IconRound } from '@/components/ui/IconRound'

export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <a
      href={service.href}
      className="card card--service"
      style={{ '--bg-image': `url("${service.image}")` } as CSSProperties}
    >
      <div className="card--service__content">
        <h3>{service.title}</h3>
        <IconRound>
          <i className="fa-solid fa-arrow-right" />
        </IconRound>
      </div>
    </a>
  )
}
