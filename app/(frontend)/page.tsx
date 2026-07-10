import { HomePageView } from '@/components/pages/HomePageView'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  return <HomePageView locale="pl" />
}
