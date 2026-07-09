import type { IconRoundProps } from '@/interfaces/ComponentProps'

const joinClassNames = (classNames: Array<string | undefined>) => classNames.filter(Boolean).join(' ')

export function IconRound({ children, className }: IconRoundProps) {
  return <div className={joinClassNames(['icon-round', className])}>{children}</div>
}
