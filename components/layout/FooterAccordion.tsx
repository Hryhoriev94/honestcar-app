import type { FooterAccordionProps, FooterContactAccordionProps } from '@/interfaces/ComponentProps'

export function FooterAccordion({ isOpen, links, title }: FooterAccordionProps) {
  return (
    <div className={`footer__column footer-accordion${isOpen ? ' is-open' : ''}`}>
      <button className="footer-accordion__trigger" type="button">
        <h5>{title}</h5>
        <span />
      </button>
      <ul className="footer-accordion__content">
        {links.map((item) => (
          <li key={item.href}>
            <a href={item.href}>{item.label}</a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function FooterContactAccordion({ contact }: FooterContactAccordionProps) {
  return (
    <div className="footer__column footer-accordion">
      <button className="footer-accordion__trigger" type="button">
        <h5>Kontakty</h5>
        <span />
      </button>
      <ul className="footer-accordion__content">
        <li>
          <span>Telefon</span>
          <a href={contact.phoneHref}>{contact.phone}</a>
        </li>
        <li>
          <span>Adres</span>
          <a href={contact.addressHref} target="_blank" rel="noopener noreferrer">
            {contact.address}
          </a>
        </li>
        <li>
          <span>E-mail</span>
          <a href={contact.emailHref}>{contact.email}</a>
        </li>
        <li>
          <span>Godziny</span>
          <p>{contact.hours}</p>
        </li>
      </ul>
    </div>
  )
}
