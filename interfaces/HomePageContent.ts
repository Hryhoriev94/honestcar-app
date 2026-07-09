import type { NavigationItem } from '@/interfaces/NavigationItem'

export interface HeroHighlight {
  value: string
  label: string
}

export interface ReviewItem {
  author: string
  date: string
  text: string
}

export interface ServicePreview {
  title: string
  href: string
  image: string
}

export interface BenefitItem {
  iconClass: string
  title: string
  text: string
}

export interface BeforeAfterProject {
  title: string
  beforeImage: string
  afterImage: string
  beforeAlt: string
  afterAlt: string
}

export interface BrandLogo {
  name: string
  image: string
}

export interface ProcessStep {
  id: string
  number: string
  title: string
  text: string
}

export interface FaqItem {
  question: string
  answer: string
  isOpen?: boolean
}

export interface BlogPreviewItem {
  title: string
  href: string
  image: string
  alt: string
  category: string
}

export interface SiteContact {
  phone: string
  phoneHref: string
  email: string
  emailHref: string
  address: string
  addressHref: string
  hours: string
}

export interface SiteNavigation {
  primary: NavigationItem[]
  services: NavigationItem[]
}

export interface HomePageData {
  beforeAfterProjects: BeforeAfterProject[]
  blogPreviewPosts: BlogPreviewItem[]
  brands: BrandLogo[]
  faqItems: FaqItem[]
  heroHighlights: HeroHighlight[]
  processSteps: ProcessStep[]
  reviews: ReviewItem[]
  serviceBenefits: BenefitItem[]
  services: ServicePreview[]
  siteContact: SiteContact
  siteNavigation: SiteNavigation
}
