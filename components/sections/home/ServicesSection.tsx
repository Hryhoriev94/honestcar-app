import type { CSSProperties } from 'react'
import type { ServiceCardProps, ServicesSectionProps } from '@/interfaces/ComponentProps'
import { BenefitCard } from '@/components/cards/BenefitCard'
import { Button, ButtonLink } from '@/components/ui/Button'
import { IconRound } from '@/components/ui/IconRound'

function ServiceCard({ service }: ServiceCardProps) {
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

export function ServicesSection({ benefits, services }: ServicesSectionProps) {
  return (
    <section id="our-services" className="services js-white-bg">
      <div className="container">
        <div className="head-section">
          <div>
            <span className="eyebrow">Nasze usługi</span>
            <h2 className="title-h2">Precyzyjna pielęgnacja Twojego samochodu</h2>
          </div>
          <div>
            <p>
              Od diagnostyki po skomplikowane naprawy - zapewniamy jakość na poziomie dealerskim z indywidualnym
              podejściem.
            </p>
            <ButtonLink href="/services" variant="primary">
              Wszystkie Usługi
            </ButtonLink>
          </div>
        </div>

        <div className="grid grid--3">
          {services.map((service) => (
            <ServiceCard key={service.title} service={service} />
          ))}
        </div>

        <div className="card card--banner card--banner__benefits">
          {benefits.map((benefit) => (
            <BenefitCard benefit={benefit} key={benefit.title} />
          ))}

          <Button onClickClassName="js-open-booking" variant="primary">
            Umów wizytę
          </Button>
        </div>
      </div>
    </section>
  )
}
