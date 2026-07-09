import { BenefitCard } from '@/components/cards/BenefitCard'
import { ServiceCard } from '@/components/cards/ServiceCard'
import type { ServicesSectionProps } from '@/interfaces/ComponentProps'
import { BookingButton } from '@/components/ui/BookingButton'
import { ButtonLink } from '@/components/ui/Button'
import { SectionIntro } from '@/components/ui/SectionIntro'

export function ServicesSection({ benefits, services }: ServicesSectionProps) {
  return (
    <section id="our-services" className="services js-white-bg">
      <div className="container">
        <div className="head-section">
          <SectionIntro eyebrow="Nasze usługi" title="Precyzyjna pielęgnacja Twojego samochodu" />
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

          <BookingButton variant="primary">
            Umów wizytę
          </BookingButton>
        </div>
      </div>
    </section>
  )
}
