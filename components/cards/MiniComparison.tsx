import type { MiniComparisonProps } from '@/interfaces/ComponentProps'

export function MiniComparison({ project }: MiniComparisonProps) {
  return (
    <div className="project-card">
      <div className="project-card__media comparison-mini">
        <img className="comparison-mini__image comparison-mini__image--after" src={project.afterImage} alt={project.afterAlt} />
        <img className="comparison-mini__image comparison-mini__image--before" src={project.beforeImage} alt={project.beforeAlt} />
        <div className="comparison-mini__line" />
        <button className="comparison-mini__handle" type="button" aria-label="Drag comparison">
          ‹ ›
        </button>
      </div>
      <h4>{project.title}</h4>
    </div>
  )
}
