import type { SectionIntroProps } from '@/interfaces/ComponentProps'

export function SectionIntro({
  action,
  children,
  className,
  eyebrow,
  text,
  textClassName,
  title,
  titleAs = 'h2',
  titleClassName = 'title-h2',
}: SectionIntroProps) {
  const TitleTag = titleAs

  return (
    <div className={className}>
      <span className="eyebrow">{eyebrow}</span>
      <TitleTag className={titleClassName}>{title}</TitleTag>
      {text ? <p className={textClassName}>{text}</p> : null}
      {children}
      {action}
    </div>
  )
}
