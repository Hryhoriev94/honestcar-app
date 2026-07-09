import type {
  BenefitItem,
  BlogPreviewItem,
  BrandLogo,
  BeforeAfterProject,
  FaqItem,
  HeroHighlight,
  ProcessStep,
  ReviewItem,
  ServicePreview,
  SiteContact,
  SiteNavigation,
} from '@/interfaces/HomePageContent'

export type ButtonVariant = 'primary' | 'outline'

interface BaseButtonProps {
  children: React.ReactNode
  className?: string
  id?: string
  variant: ButtonVariant
}

export interface ButtonAsButtonProps extends BaseButtonProps {
  ariaLabel?: string
  onClickClassName?: string
  type?: 'button' | 'submit' | 'reset'
}

export interface ButtonAsLinkProps extends BaseButtonProps {
  href: string
}

export interface SiteHeaderProps {
  contact: SiteContact
  navigation: SiteNavigation
}

export interface SiteFooterProps {
  contact: SiteContact
  navigation: SiteNavigation
}

export interface HomeHeroSectionProps {
  highlights: HeroHighlight[]
}

export interface ReviewsSectionProps {
  reviews: ReviewItem[]
}

export interface ServicesSectionProps {
  benefits: BenefitItem[]
  services: ServicePreview[]
}

export interface ServiceCardProps {
  service: ServicePreview
}

export interface LanguageSwitcherProps {
  activeLanguage: string
  languages: string[]
}

export interface SocialLinkItem {
  ariaLabel: string
  href: string
  iconClass: string
}

export interface SocialLinksProps {
  className: string
  iconClassName?: string
  links: SocialLinkItem[]
}

export interface IconRoundProps {
  children: React.ReactNode
  className?: string
}

export interface ReviewCardProps {
  review: ReviewItem
}

export interface BenefitCardProps {
  benefit: BenefitItem
}

export interface BrandCardProps {
  brand: BrandLogo
}

export interface BlogCardProps {
  post: BlogPreviewItem
}

export interface FaqItemProps {
  item: FaqItem
}

export interface ProcessStepCardProps {
  isActive: boolean
  step: ProcessStep
}

export interface ContactItemProps {
  href?: string
  label: string
  value: string
}

export interface FormFieldProps {
  className?: string
  name?: string
  placeholder: string
  required?: boolean
  type?: 'email' | 'tel' | 'text'
}

export interface TextareaFieldProps {
  placeholder: string
}

export interface RadioOptionProps {
  checked?: boolean
  label: string
  name: string
  value: string
}

export interface MiniComparisonProps {
  project: BeforeAfterProject
}

export interface FooterAccordionLink {
  href: string
  label: string
}

export interface FooterAccordionProps {
  isOpen?: boolean
  links: FooterAccordionLink[]
  title: string
}

export interface FooterContactAccordionProps {
  contact: SiteContact
}

export interface BeforeAfterSectionProps {
  projects: BeforeAfterProject[]
}

export interface BrandsSectionProps {
  brands: BrandLogo[]
}

export interface ProcessSectionProps {
  steps: ProcessStep[]
}

export interface FaqSectionProps {
  items: FaqItem[]
}

export interface BlogPreviewSectionProps {
  posts: BlogPreviewItem[]
}

export interface ContactSectionProps {
  contact: SiteContact
}
