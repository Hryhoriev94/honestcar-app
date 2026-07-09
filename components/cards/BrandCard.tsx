import type { BrandCardProps } from '@/interfaces/ComponentProps'

export function BrandCard({ brand }: BrandCardProps) {
  return (
    <div className="brand-card swiper-slide">
      <img src={brand.image} alt={brand.name} />
    </div>
  )
}
