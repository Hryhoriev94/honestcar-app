import type { SpecialOffer } from '@/payload-types'

interface SpecialOfferDetailsProps {
  details: SpecialOffer['details']
  prices: SpecialOffer['prices']
}

export function SpecialOfferDetails({ details, prices }: SpecialOfferDetailsProps) {
  if (!details && !prices?.length) return null

  return <section className="white-section"><div className="container split-layout split-layout--equal">
    <div className="split-layout__content">
      {details?.eyebrow ? <span className="eyebrow">{details.eyebrow}</span> : null}
      {details?.badgeValue ? <h2 className="title-h2">{details.badgeValue}</h2> : null}
      {details?.itemsTitle ? <h3>{details.itemsTitle}</h3> : null}
      {details?.itemsText ? <p>{details.itemsText}</p> : null}
    </div>
    {prices?.length ? <div className="price-table"><ul className="price-table__list">{prices.map((item) => <li className="price-table__row" key={item.id}><span>{item.name}</span><strong>{item.promo}</strong></li>)}</ul></div> : null}
  </div></section>
}
