import type { PriceRowProps } from '@/interfaces/ServiceProps'

export function PriceRow({ item }: PriceRowProps) {
  return (
    <li className="price-table__row">
      <span>{item.name}</span>
      <strong>{item.price}</strong>
    </li>
  )
}
