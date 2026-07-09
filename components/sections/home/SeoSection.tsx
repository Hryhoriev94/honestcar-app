import { Button } from '@/components/ui/Button'

export function SeoSection() {
  return (
    <section className="section seo-block" id="seo">
      <div className="seo-block__inner">
        <div className="seo-block__card">
          <div className="seo-block__content">
            <span className="eyebrow">O naszym serwisie</span>
            <h2 className="title-h2">Profesjonalny serwis samochodowy i uczciwe podejście.</h2>
            <div className="seo-block__text is-collapsed" id="seoText">
              <p>
                Honest Car oferuje najwyższej jakości diagnostykę samochodową, naprawy i konserwację nowoczesnych
                pojazdów w Warszawie. Łączymy precyzję na poziomie dealera z przejrzystym, zorientowanym na klienta
                doświadczeniem.
              </p>
              <p>
                Nasz warsztat specjalizuje się w diagnostyce, naprawach zawieszenia, układów hamulcowych, układów
                napędowych oraz skomplikowanych naprawach silników. Każdy pojazd jest sprawdzany przy użyciu
                nowoczesnego sprzętu i zgodnie z procedurami jakości OEM.
              </p>
              <p>
                Niezależnie od tego, czy potrzebujesz rutynowej konserwacji, czy zaawansowanej diagnostyki, nasi
                doświadczeni technicy zapewnią Twojemu samochodowi opiekę, na jaką zasługuje, w warunkach warsztatu
                premium.
              </p>
            </div>
            <Button className="seo-block__toggle" id="seoToggle" variant="outline">
              Przeczytaj więcej
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
