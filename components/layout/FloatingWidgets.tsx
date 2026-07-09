import { Button } from '@/components/ui/Button'
import { FormField, RadioOption, TextareaField } from '@/components/ui/FormFields'

export function FloatingWidgets() {
  return (
    <>
      <button className="scroll-top js-scroll-top" type="button" aria-label="Scroll Top">
        <i className="fa-solid fa-arrow-up" />
      </button>

      <button className="js-sticky-callback sticky-callback tooltip" type="button" aria-label="Zamów lawetę">
        <span className="tooltip__content">
          <strong>Zamów lawetę</strong>
          <small>Kliknij, aby zamówić lawete</small>
        </span>
        <img className="sticky-callback__icon" src="/images/icons/truck.png" alt="Icon Truck" />
      </button>

      <div className="modal" id="callbackModal">
        <div className="modal__overlay" />
        <div className="modal__content">
          <button className="modal__close" type="button">
            ×
          </button>
          <h3 className="modal__title">Zostaw numer</h3>
          <p className="modal__desc">Podaj imię i telefon, a skontaktujemy się z Tobą jak najszybciej.</p>
          <form className="grid">
            <FormField name="name" placeholder="Twoje imię" required />
            <FormField name="phone" placeholder="Numer telefonu" required type="tel" />
            <Button type="submit" variant="primary">
              Zamów kontakt
            </Button>
          </form>
        </div>
      </div>

      <div className="floating-booking is-scroll-hidden" id="bookingPanel">
        <div className="floating-booking__inner">
          <div className="floating-booking__intro">
            <p>Zaplanuj wizytę</p>
            <span>lub zadaj pytanie</span>
          </div>
          <form className="floating-booking__form">
            <div className="floating-booking__compact">
              <FormField className="floating-booking__email js-expand-booking" placeholder="Twój email" required type="email" />
              <button className="floating-booking__close js-close-booking" type="button" aria-label="Закрити форму">
                ×
              </button>
            </div>
            <div className="floating-booking__full">
              <div className="floating-booking__head">
                <span className="eyebrow">Szybka rezerwacja</span>
                <h2>Umów się na wizytę lub uzyskaj ocenę usługi</h2>
                <p>Wypełnij krótki formularz, a skontaktujemy się z Tobą w celu wyjaśnienia szczegółów.</p>
              </div>
              <div className="floating-booking__purpose">
                <p>W jakim celu chcesz się skontaktować?</p>
                <RadioOption checked label="Zarezerwuj wizytę" name="purpose" value="visit" />
                <RadioOption label="Masz pytanie" name="purpose" value="question" />
              </div>
              <div className="floating-booking__fields">
                <FormField placeholder="Twoje imię" required />
                <FormField placeholder="Telefon" required type="tel" />
                <FormField placeholder="E-mail" type="email" />
                <TextareaField placeholder="Wiadomość" />
              </div>
              <div className="floating-booking__actions">
                <Button type="submit" variant="primary">
                  Wyślij
                </Button>
                <Button onClickClassName="js-collapse-booking" variant="outline">
                  Wróć
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
