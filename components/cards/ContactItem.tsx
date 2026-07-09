import type { ContactItemProps } from '@/interfaces/ComponentProps'

export function ContactItem({ href, label, value }: ContactItemProps) {
  const content = (
    <>
      <span>{label}</span>
      <strong>{value}</strong>
    </>
  )

  if (href) {
    return (
      <a href={href} className="contact__item">
        {content}
      </a>
    )
  }

  return <div className="contact__item">{content}</div>
}
