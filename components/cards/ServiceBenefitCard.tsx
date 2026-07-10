import type { ServiceBenefitCardProps } from '@/interfaces/ServiceProps'

export function ServiceBenefitCard({ item }: ServiceBenefitCardProps) {
  return (
    <article className="benefit-card">
      <h3>{item.title}</h3>
      <p>{item.text}</p>
    </article>
  )
}
