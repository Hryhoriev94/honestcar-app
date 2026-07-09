import type { FaqItemProps } from '@/interfaces/ComponentProps'

export function FaqItemCard({ item }: FaqItemProps) {
  return (
    <details className="faq-item" open={item.isOpen}>
      <summary>
        {item.question}
        <span />
      </summary>
      <p>{item.answer}</p>
    </details>
  )
}
