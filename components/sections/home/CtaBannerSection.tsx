import { BookingButton } from '@/components/ui/BookingButton'
import { SectionIntro } from '@/components/ui/SectionIntro'

export function CtaBannerSection() {
  return (
    <section className="cta-banner js-white-bg">
      <div className="cta-banner__inner">
        <SectionIntro
          className="cta-banner__content"
          eyebrow="Zarezerwuj usługę"
          text="Umów wizytę w naszym serwisie i ciesz się spokojem, wiedząc, że jesteś w dobrych rękach."
          textClassName="cta-banner__text"
          title="Twój samochód zasługuje na najlepszą opiekę."
        >
          <BookingButton variant="primary">
            Zarezerwuj wizytę
          </BookingButton>
        </SectionIntro>
      </div>
      <div className="cta-banner__image" />
    </section>
  )
}
