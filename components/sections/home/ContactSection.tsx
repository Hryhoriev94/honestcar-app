import type { ContactSectionProps } from '@/interfaces/ComponentProps'
import { Button } from '@/components/ui/Button'
import { ContactItem } from '@/components/cards/ContactItem'
import { FormField, TextareaField } from '@/components/ui/FormFields'

export function ContactSection({ contact }: ContactSectionProps) {
  return (
    <section className="white-section contact">
      <div className="container">
        <div className="contact__wrapper">
          <div className="contact__content card">
            <span className="eyebrow">Kontakt</span>
            <h2>Umów wizytę lub skontaktuj się z nami</h2>
            <div className="contact__list">
              <ContactItem href={contact.phoneHref} label="Telefon" value={`+48 ${contact.phone}`} />
              <ContactItem href={contact.emailHref} label="E-mail" value={contact.email} />
              <ContactItem label="Godziny pracy" value={contact.hours} />
            </div>
            <div className="contact__map">
              <iframe
                src="https://www.google.com/maps?q=Hetma%C5%84ska%2047A%2C%2004-305%20Warszawa&output=embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
          <div className="contact__form white-form">
            <span className="eyebrow">Formularz kontaktowy</span>
            <h3>Napisz do nas</h3>
            <form>
              <FormField placeholder="Imię i nazwisko" required />
              <FormField placeholder="Telefon" required type="tel" />
              <TextareaField placeholder="Opisz problem lub napisz, jak możemy pomóc" />
              <Button type="submit" variant="primary">
                Wyślij wiadomość
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
