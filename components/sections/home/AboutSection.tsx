import { ButtonLink } from '@/components/ui/Button'

export function AboutSection() {
  return (
    <section className="about" id="about">
      <div className="container split-layout split-layout--equal split-layout--reverse align-center">
        <div className="split-layout__content">
          <span className="eyebrow">O nas</span>
          <h2 className="title-h2">Serwis samochodowy klasy premium z uczciwym podejściem.</h2>
          <p>
            Tworzymy usługę, w której klient otrzymuje nie tylko naprawę, ale także przejrzyste, komfortowe i wysokiej
            jakości usługi związane z konserwacją samochodu.
          </p>
          <p>
            Nasz zespół pracuje z dbałością o szczegóły, korzysta z nowoczesnego sprzętu i wyjaśnia każdy etap pracy
            przed przystąpieniem do dalszych działań.
          </p>
          <ButtonLink href="/about-us" variant="outline">
            Przeczytaj więcej
          </ButtonLink>
        </div>
        <div className="split-layout__media">
          <img className="border-rounded" src="/images/about/german-cars-specialization.jpg" alt="Honest Car Service" />
        </div>
      </div>
    </section>
  )
}
