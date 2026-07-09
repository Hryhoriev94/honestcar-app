import type { LanguageSwitcherProps } from '@/interfaces/ComponentProps'

export function LanguageSwitcher({ activeLanguage, languages }: LanguageSwitcherProps) {
  return (
    <div className="lang-switcher">
      <button className="lang-switcher__current" type="button">
        {activeLanguage}
      </button>
      <div className="lang-switcher__dropdown">
        {languages.map((language) => (
          <a className={language === activeLanguage ? 'is-active' : undefined} href="#" key={language}>
            {language}
          </a>
        ))}
      </div>
    </div>
  )
}
