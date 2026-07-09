import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { fallbackHomePageData } from '@/data/homePage'
import type { Locale } from '@/types/Locale'
import type {
  BenefitItem,
  BlogPreviewItem,
  BrandLogo,
  BeforeAfterProject,
  FaqItem,
  HeroHighlight,
  HomePageData,
  ProcessStep,
  ReviewItem,
  ServicePreview,
  SiteContact,
  SiteNavigation,
} from '@/interfaces/HomePageContent'

type HomePagePayloadData = Partial<HomePageData>

const hasItems = <T>(items: T[] | undefined): items is T[] => Array.isArray(items) && items.length > 0

const mergeArray = <T>(cmsItems: T[] | undefined, fallbackItems: T[]): T[] =>
  hasItems(cmsItems) ? cmsItems : fallbackItems

const mergeSiteContact = (contact: Partial<SiteContact> | undefined): SiteContact => ({
  ...fallbackHomePageData.siteContact,
  ...contact,
})

const mergeSiteNavigation = (navigation: Partial<SiteNavigation> | undefined): SiteNavigation => ({
  primary: mergeArray(navigation?.primary, fallbackHomePageData.siteNavigation.primary),
  services: mergeArray(navigation?.services, fallbackHomePageData.siteNavigation.services),
})

const mergeHomePageData = (cmsData: HomePagePayloadData): HomePageData => ({
  beforeAfterProjects: mergeArray<BeforeAfterProject>(
    cmsData.beforeAfterProjects,
    fallbackHomePageData.beforeAfterProjects,
  ),
  blogPreviewPosts: mergeArray<BlogPreviewItem>(cmsData.blogPreviewPosts, fallbackHomePageData.blogPreviewPosts),
  brands: mergeArray<BrandLogo>(cmsData.brands, fallbackHomePageData.brands),
  faqItems: mergeArray<FaqItem>(cmsData.faqItems, fallbackHomePageData.faqItems),
  heroHighlights: mergeArray<HeroHighlight>(cmsData.heroHighlights, fallbackHomePageData.heroHighlights),
  processSteps: mergeArray<ProcessStep>(cmsData.processSteps, fallbackHomePageData.processSteps),
  reviews: mergeArray<ReviewItem>(cmsData.reviews, fallbackHomePageData.reviews),
  serviceBenefits: mergeArray<BenefitItem>(cmsData.serviceBenefits, fallbackHomePageData.serviceBenefits),
  services: mergeArray<ServicePreview>(cmsData.services, fallbackHomePageData.services),
  siteContact: mergeSiteContact(cmsData.siteContact),
  siteNavigation: mergeSiteNavigation(cmsData.siteNavigation),
})

export async function getHomePageData(locale: Locale = 'pl'): Promise<HomePageData> {
  try {
    const payload = await getPayload({ config: configPromise })
    const cmsData = await payload.findGlobal({
      slug: 'home-page',
      locale,
      fallbackLocale: 'pl',
      depth: 0,
    })

    return mergeHomePageData(cmsData as HomePagePayloadData)
  } catch {
    return fallbackHomePageData
  }
}
