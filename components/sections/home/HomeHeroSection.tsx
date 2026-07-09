import type { HomeHeroSectionProps } from '@/interfaces/ComponentProps'
import { Button, ButtonLink } from '@/components/ui/Button'

export function HomeHeroSection({ highlights }: HomeHeroSectionProps) {
  return (
    <section className="hero">
      <video className="hero__video" autoPlay muted loop playsInline>
        <source src="/videos/hero.mov" media="(max-width: 1024px)" type="video/mp4" />
        <source src="/videos/hero-video.mp4" type="video/mp4" />
      </video>

      <div className="hero__overlay" />

      <div className="hero__wrapper">
        <div className="hero__content">
          <h1>Serwis samochodowy, któremu możesz zaufać</h1>
          <p>
            Dbamy o Twój samochód kompleksowo - od diagnostyki po profesjonalne naprawy i regularny serwis. Terminowo,
            uczciwie i bez zbędnych problemów.
          </p>
        </div>
        <div>
          <div className="hero__highlights">
            {highlights.map((item) => (
              <div className="hero__highlight" key={item.value}>
                <span className="hero__highlight-number">{item.value}</span>
                <p>{item.label}</p>
              </div>
            ))}
          </div>
          <div className="hero__actions">
            <Button onClickClassName="js-open-booking" variant="primary">
              Umów wizytę
            </Button>
            <ButtonLink href="#our-services" variant="outline">
              Poznaj usługi
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  )
}
