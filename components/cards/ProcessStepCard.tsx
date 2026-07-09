import type { ProcessStepCardProps } from '@/interfaces/ComponentProps'

export function ProcessStepCard({ isActive, step }: ProcessStepCardProps) {
  return (
    <article className={`process-step${isActive ? ' is-active' : ''}`} data-step={step.id}>
      <span className="process-step__number">{step.number}</span>
      <div>
        <h3>{step.title}</h3>
        <p>{step.text}</p>
      </div>
    </article>
  )
}
