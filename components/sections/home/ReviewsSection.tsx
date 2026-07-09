import type { ReviewsSectionProps } from '@/interfaces/ComponentProps'
import { ButtonLink } from '@/components/ui/Button'
import { ReviewCard } from '@/components/cards/ReviewCard'
import { SectionIntro } from '@/components/ui/SectionIntro'

export function ReviewsSection({ reviews }: ReviewsSectionProps) {
  return (
    <section className="reviews js-white-bg" id="reviews">
      <div className="container split-layout split-layout--media-right">
        <div className="reviews__content split-layout__content">
          <SectionIntro
            eyebrow="Opinie"
            text="Prawdziwe opinie kierowców, którzy powierzają nam swoje samochody."
            textClassName="reviews__text"
            title="Co mówią nasi klienci"
          />
          <div className="reviews__rating">
            <span>4.9</span>
            <p>★★★★★</p>
          </div>
          <p className="reviews__source">Na podstawie ponad 200 opinii w Google Maps</p>
          <ButtonLink href="#" variant="outline">
            Zobacz nas na Mapach Google
          </ButtonLink>
        </div>

        <div className="reviews-slider split-layout__media tablet-slider swiper js-tablet-slider" data-slider="reviews">
          <div className="grid grid--2 reviews-grid swiper-wrapper">
            {reviews.map((review) => (
              <ReviewCard key={`${review.author}-${review.date}-${review.text}`} review={review} />
            ))}
          </div>
          <div className="reviews-slider__pagination swiper-pagination" />
        </div>
      </div>
    </section>
  )
}
