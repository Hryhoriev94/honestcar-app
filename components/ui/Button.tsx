import type { ButtonAsButtonProps, ButtonAsLinkProps } from '@/interfaces/ComponentProps'

const variantClassNames = {
  outline: 'btn--outline',
  primary: 'btn--primary',
}

const joinClassNames = (classNames: Array<string | undefined>) => classNames.filter(Boolean).join(' ')

export function Button({
  ariaLabel,
  children,
  className,
  id,
  onClickClassName,
  type = 'button',
  variant,
}: ButtonAsButtonProps) {
  return (
    <button
      aria-label={ariaLabel}
      className={joinClassNames(['btn', variantClassNames[variant], onClickClassName, className])}
      id={id}
      type={type}
    >
      {children}
    </button>
  )
}

export function ButtonLink({ children, className, href, id, variant }: ButtonAsLinkProps) {
  return (
    <a className={joinClassNames(['btn', variantClassNames[variant], className])} href={href} id={id}>
      {children}
    </a>
  )
}
