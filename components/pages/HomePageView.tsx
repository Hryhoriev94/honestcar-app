import { FloatingWidgets } from '@/components/layout/FloatingWidgets'
import { SiteFooter } from '@/components/layout/SiteFooter'
import { SiteHeader } from '@/components/layout/SiteHeader'
import { AboutSection } from '@/components/sections/home/AboutSection'
import { BeforeAfterSection } from '@/components/sections/home/BeforeAfterSection'
import { BlogPreviewSection } from '@/components/sections/home/BlogPreviewSection'
import { BrandsSection } from '@/components/sections/home/BrandsSection'
import { ContactSection } from '@/components/sections/home/ContactSection'
import { CtaBannerSection } from '@/components/sections/home/CtaBannerSection'
import { FaqSection } from '@/components/sections/home/FaqSection'
import { HomeHeroSection } from '@/components/sections/home/HomeHeroSection'
import { ProcessSection } from '@/components/sections/home/ProcessSection'
import { ReviewsSection } from '@/components/sections/home/ReviewsSection'
import { SeoSection } from '@/components/sections/home/SeoSection'
import { ServicesSection } from '@/components/sections/home/ServicesSection'
import { getHomePageData } from '@/data/getHomePageData'
import { getSiteNavigation } from '@/data/getSiteNavigation'
import type { HomePageViewProps } from '@/interfaces/PageProps'

export async function HomePageView({ locale }: HomePageViewProps) {
  const {
    beforeAfterProjects,
    blogPreviewPosts,
    brands,
    faqItems,
    heroHighlights,
    processSteps,
    reviews,
    serviceBenefits,
    services,
    siteContact,
    siteNavigation,
  } = await getHomePageData(locale)
  const navigation = await getSiteNavigation(locale, siteNavigation)

  return (
    <>
      <SiteHeader contact={siteContact} navigation={navigation} />
      <main>
        <HomeHeroSection highlights={heroHighlights} />
        <ReviewsSection reviews={reviews} />
        <ServicesSection benefits={serviceBenefits} services={services} />
        <BeforeAfterSection projects={beforeAfterProjects} />
        <AboutSection />
        <CtaBannerSection />
        <BrandsSection brands={brands} />
        <ProcessSection steps={processSteps} />
        <FaqSection items={faqItems} />
        <SeoSection />
        <BlogPreviewSection posts={blogPreviewPosts} />
        <ContactSection contact={siteContact} />
      </main>
      <SiteFooter contact={siteContact} navigation={navigation} />
      <FloatingWidgets />
    </>
  )
}
