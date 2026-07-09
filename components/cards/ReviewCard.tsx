import type { ReviewCardProps } from '@/interfaces/ComponentProps'

export function ReviewCard({ review }: ReviewCardProps) {
  return (
    <article className="card review-card swiper-slide">
      <div className="review-card__stars">★★★★★</div>
      <p>{review.text}</p>
      <div className="review-card__footer">
        <span>{review.author}</span>
        <span>{review.date}</span>
      </div>
    </article>
  )
}
