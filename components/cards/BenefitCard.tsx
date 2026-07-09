import type { BenefitCardProps } from '@/interfaces/ComponentProps'

export function BenefitCard({ benefit }: BenefitCardProps) {
  return (
    <div className="card--banner__benefit">
      <div className="card--banner__benefit-icon">
        <i className={benefit.iconClass} />
      </div>
      <div>
        <h4>{benefit.title}</h4>
        <p>{benefit.text}</p>
      </div>
    </div>
  )
}
