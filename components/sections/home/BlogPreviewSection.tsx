import type { BlogPreviewSectionProps } from '@/interfaces/ComponentProps'
import { BlogCard } from '@/components/cards/BlogCard'
import { ButtonLink } from '@/components/ui/Button'
import { SectionIntro } from '@/components/ui/SectionIntro'

export function BlogPreviewSection({ posts }: BlogPreviewSectionProps) {
  return (
    <section className="blog-preview section-head" id="blog">
      <div className="container split-layout split-layout--media-left split-layout--reverse">
        <div className="split-layout__content">
          <SectionIntro eyebrow="Blog" title="Porady, wiadomości i spostrzeżenia" />
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
