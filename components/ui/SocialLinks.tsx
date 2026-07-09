import type { SocialLinksProps } from '@/interfaces/ComponentProps'

export function SocialLinks({ className, iconClassName, links }: SocialLinksProps) {
  return (
    <div className={className}>
      {links.map((link) => (
        <a className={iconClassName} href={link.href} aria-label={link.ariaLabel} key={link.ariaLabel}>
          <i className={link.iconClass} />
        </a>
      ))}
    </div>
  )
}
