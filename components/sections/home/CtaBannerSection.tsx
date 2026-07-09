import { Button } from '@/components/ui/Button'

export function CtaBannerSection() {
  return (
    <section className="cta-banner js-white-bg">
      <div className="cta-banner__inner">
        <div className="cta-banner__content">
          <span className="eyebrow">Zarezerwuj usługę</span>
          <h2 className="title-h2">Twój samochód zasługuje na najlepszą opiekę.</h2>
          <p className="cta-banner__text">
            Umów wizytę w naszym serwisie i ciesz się spokojem, wiedząc, że jesteś w dobrych rękach.
          </p>
          <Button onClickClassName="js-open-booking" variant="primary">
            Zarezerwuj wizytę
          </Button>
        </div>
      </div>
      <div className="cta-banner__image" />
    </section>
  )
}
