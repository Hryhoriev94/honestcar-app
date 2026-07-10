import type { Media } from '@/payload-types'

export interface RouteChildPreview {
  description?: string
  href: string
  media?: Media
  title: string
}
