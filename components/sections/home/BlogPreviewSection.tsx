import type { BlogPreviewSectionProps } from '@/interfaces/ComponentProps'
import { BlogCard } from '@/components/cards/BlogCard'
import { ButtonLink } from '@/components/ui/Button'

export function BlogPreviewSection({ posts }: BlogPreviewSectionProps) {
  return (
    <section className="blog-preview section-head" id="blog">
      <div className="container split-layout split-layout--media-left split-layout--reverse">
        <div className="split-layout__content">
          <span className="eyebrow">Blog</span>
          <h2 className="title-h2">Porady, wiadomości i spostrzeżenia</h2>
          <ButtonLink href="/blog" variant="outline">
            Zobacz wszystkie
          </ButtonLink>
        </div>
        <div className="split-layout__media blog-slider tablet-slider swiper js-tablet-slider" data-slider="blog">
          <div className="swiper-wrapper grid grid--3">
            {posts.map((post) => (
              <BlogCard key={post.href} post={post} />
            ))}
          </div>
          <div className="blog-slider__pagination swiper-pagination" />
        </div>
      </div>
    </section>
  )
}
