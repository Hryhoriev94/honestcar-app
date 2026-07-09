import type { BlogCardProps } from '@/interfaces/ComponentProps'

export function BlogCard({ post }: BlogCardProps) {
  return (
    <article className="card--main swiper-slide">
      <a href={post.href}>
        <img src={post.image} alt={post.alt} />
      </a>
      <div className="card--main__content">
        <span className="card--main__category">{post.category}</span>
        <h5>
          <a href={post.href}>{post.title}</a>
        </h5>
        <a href={post.href} className="card--main__link">
          Więcej
          <i className="fa-solid fa-angle-right" />
        </a>
      </div>
    </article>
  )
}
