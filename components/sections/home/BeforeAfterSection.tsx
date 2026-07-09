import type { BeforeAfterSectionProps } from '@/interfaces/ComponentProps'
import { MiniComparison } from '@/components/cards/MiniComparison'
import { ButtonLink } from '@/components/ui/Button'

export function BeforeAfterSection({ projects }: BeforeAfterSectionProps) {
  return (
    <section className="before-after white-section" id="before-after">
      <div className="container">
        <div className="split-layout split-layout--media-right">
          <div className="split-layout__content">
            <span className="eyebrow">Przed / Po</span>
            <h2 className="title-h2">Prawdziwe transformacje. Profesjonalne rezultaty.</h2>
            <p className="before-after__text">
              Od zużytych detali po fabryczne wykończenie - każdy samochód otrzymuje uwagę, na jaką zasługuje.
            </p>
            <ButtonLink href="/portfolio" variant="outline">
              Portfolio
            </ButtonLink>
          </div>

          <div className="split-layout__media comparison">
            <img
              className="comparison__image comparison__image--after"
              src="/images/before-after/headlight-restoration-after.jpg"
              alt="After"
            />
            <img
              className="comparison__image comparison__image--before"
              src="/images/before-after/headlight-restoration-before.jpg"
              alt="Before"
            />
            <div className="comparison__line" />
            <button className="comparison__handle" type="button" aria-label="Drag comparison">
              ‹ ›
            </button>
            <span className="comparison__label comparison__label--before">Przed</span>
            <span className="comparison__label comparison__label--after">Po</span>
          </div>
        </div>

        <div className="before-after__projects card">
          <div className="before-after__projects-head">
            <span className="eyebrow">Więcej transformacji</span>
            <h3>Każdy samochód ma swoją historię.</h3>
            <p>Here are a few we’re proud of.</p>
          </div>
          {projects.map((project) => (
            <MiniComparison key={project.title} project={project} />
          ))}
        </div>
      </div>
    </section>
  )
}
