import type { BeforeAfterSectionProps } from '@/interfaces/ComponentProps'
import { MiniComparison } from '@/components/cards/MiniComparison'
import { ButtonLink } from '@/components/ui/Button'
import { SectionIntro } from '@/components/ui/SectionIntro'

export function BeforeAfterSection({ projects }: BeforeAfterSectionProps) {
  return (
    <section className="before-after white-section" id="before-after">
      <div className="container">
        <div className="split-layout split-layout--media-right">
          <div className="split-layout__content">
            <SectionIntro
              eyebrow="Przed / Po"
              text="Od zużytych detali po fabryczne wykończenie - każdy samochód otrzymuje uwagę, na jaką zasługuje."
              textClassName="before-after__text"
              title="Prawdziwe transformacje. Profesjonalne rezultaty."
            />
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
          <SectionIntro
            className="before-after__projects-head"
            eyebrow="Więcej transformacji"
            text="Oto kilka realizacji, z których jesteśmy dumni."
            title="Każdy samochód ma swoją historię."
            titleAs="h3"
            titleClassName=""
          />
          {projects.map((project) => (
            <MiniComparison key={project.title} project={project} />
          ))}
        </div>
      </div>
    </section>
  )
}
