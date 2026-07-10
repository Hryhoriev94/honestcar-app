import type { HeroBlock, Page, Route } from '@/payload-types'
import type { RouteChildPreview } from '@/interfaces/RouteContent'
import type { Locale } from '@/types/Locale'

export interface HomePageViewProps {
  locale: Locale
}

export interface RouteContentSectionProps {
  locale: Locale
  route: Route
}

export interface HeroBlockSectionProps {
  block: HeroBlock
}

export interface PageBlockRendererProps {
  layout: Page['layout']
}

export interface RouteChildCardProps {
  index: number
  item: RouteChildPreview
}

export interface RouteChildrenSectionProps {
  items: RouteChildPreview[]
}
