import Image from 'next/image'
import Link from 'next/link'
import type { SiteHeaderProps } from '@/interfaces/ComponentProps'
import { Button, ButtonLink } from '@/components/ui/Button'
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher'
import { SocialLinks } from '@/components/ui/SocialLinks'

const languages = ['PL', 'RU', 'UA']
const socialLinks = [
  { ariaLabel: 'Telegram', href: '#', iconClass: 'fa-brands fa-telegram icon-md' },
  { ariaLabel: 'Whatsapp', href: '#', iconClass: 'fa-brands fa-whatsapp icon-md' },
  { ariaLabel: 'Instagram', href: '#', iconClass: 'fa-brands fa-instagram icon-md' },
]

export function SiteHeader({ contact, navigation }: SiteHeaderProps) {
  return (
    <>
      <div className="topbar">
        <div className="topbar__inner">
          <div className="topbar__contacts">
            <a className="topbar__link" href={contact.phoneHref}>
              <i className="fa-solid fa-phone icon-sm" />
              <span>{contact.phone}</span>
            </a>
            <a className="topbar__link" href={contact.addressHref} target="_blank" rel="noopener noreferrer">
              <i className="fa-solid fa-location-dot icon-sm" />
              <span>{contact.address}</span>
            </a>
          </div>
          <div className="topbar__actions">
            <SocialLinks className="topbar__socials" links={socialLinks} />
            <LanguageSwitcher activeLanguage="PL" languages={languages} />
            <Button className="topbar__booking" onClickClassName="js-open-booking" variant="outline">
              Umów wizytę
            </Button>
          </div>
        </div>
      </div>

      <header className="header">
        <div className="header__wrapper">
          <Link href="/" className="header__logo">
            <Image src="/images/logo.png" alt="Logo" width={100} height={87} priority />
          </Link>

          <div className="header__actions">
            <a href={contact.phoneHref}>
              <i className="fa-solid fa-phone icon-md" />
            </a>
            <LanguageSwitcher activeLanguage="PL" languages={languages} />
          </div>

          <button className="header__burger" type="button" aria-label="Otwórz menu">
            <span />
            <span />
            <span />
          </button>

          <div className="header__mobile">
            <nav className="header__nav">
              {navigation.primary.map((item) => (
                <a href={item.href} key={item.href}>
                  {item.label}
                </a>
              ))}
            </nav>

            <SocialLinks className="header__mobile-social" iconClassName="icon-round" links={socialLinks} />

            <ButtonLink href={contact.phoneHref} variant="primary">
              Laweta 24/7
            </ButtonLink>
          </div>
        </div>
      </header>
    </>
  )
}
