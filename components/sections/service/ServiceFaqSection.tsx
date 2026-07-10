import type { ServiceFaqSectionProps } from '@/interfaces/ServiceProps'

export function ServiceFaqSection({ block }: ServiceFaqSectionProps) {
  const items = block.items ?? []

  return (
    <section className="faq js-white-bg" id="faq">
      <div className="container split-layout split-layout--media-right">
        <div className="split-layout__content">
          <span className="eyebrow">{block.eyebrow}</span>
          <h2 className="title-h2">{block.title}</h2>
        </div>
        <div className="split-layout__media faq__accordion card">
          {items.map((item) => (
            <details className="faq-item" key={item.id ?? item.question} open={item.isOpen ?? false}>
              <summary>
                {item.question}
                <span />
              </summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
