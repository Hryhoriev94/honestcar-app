import Image from 'next/image'
import Link from 'next/link'
import type { SiteFooterProps } from '@/interfaces/ComponentProps'
import { FooterAccordion, FooterContactAccordion } from '@/components/layout/FooterAccordion'
import { Button } from '@/components/ui/Button'
import { SocialLinks } from '@/components/ui/SocialLinks'

const socialLinks = [
  { ariaLabel: 'Telegram', href: '#', iconClass: 'fa-brands fa-telegram icon-md' },
  { ariaLabel: 'Whatsapp', href: '#', iconClass: 'fa-brands fa-whatsapp icon-md' },
  { ariaLabel: 'Instagram', href: '#', iconClass: 'fa-brands fa-instagram icon-md' },
]

export function SiteFooter({ contact, navigation }: SiteFooterProps) {
  return (
    <footer className="footer" id="contact">
      <div className="container">
        <div className="footer__top">
          <div className="footer__brand">
            <Link href="/" className="footer__logo">
              <Image src="/images/logo.png" alt="Honest Car" width={150} height={130} />
            </Link>
            <p>Profesjonalny serwis samochodowy w Warszawie. Uczciwe podejście, jakość, której możesz zaufać.</p>
            <SocialLinks className="footer__socials" iconClassName="icon-round" links={socialLinks} />
            <Button onClickClassName="js-open-booking" variant="primary">
              Umów wizytę
            </Button>
          </div>

          <nav className="footer__nav" aria-label="Footer navigation">
            <FooterAccordion isOpen links={navigation.primary} title="Nawigacja" />
            <FooterAccordion links={navigation.services} title="Usługi" />
          </nav>

          <div className="footer__contact">
            <FooterContactAccordion contact={contact} />
          </div>
        </div>

        <div className="footer__bottom">
          <p>© 2026 Honest Car. All rights reserved.</p>
          <div>
            <a href="/privacy-policy">Privacy Policy</a>
            <a href="/terms">Terms & Conditions</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
