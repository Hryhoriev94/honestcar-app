import nextEnv from '@next/env'
import { getPayload } from 'payload'
import type { Menu, Page, Route, Service } from '@/payload-types'

nextEnv.loadEnvConfig(process.cwd())
process.env.PAYLOAD_SECRET ??= 'change-me'

interface PageSeed {
  slug: string
  text: string
  title: string
}

interface ServiceSeed {
  children?: ServiceSeed[]
  slug: string
  title: string
}

interface MenuSeedItem {
  children?: MenuSeedItem[]
  label: string
  route: number
}

const pageSeeds: PageSeed[] = [
  { slug: 'uslugi', title: 'Usługi', text: 'Kompleksowa obsługa samochodów w Warszawie.' },
  { slug: 'cennik', title: 'Cennik usług samochodowych', text: 'Poznaj zakres usług i zapytaj o indywidualną wycenę.' },
  { slug: 'portfolio', title: 'Portfolio', text: 'Zobacz przykłady wykonanych napraw i realizacji.' },
  { slug: 'promocje', title: 'Promocje', text: 'Aktualne promocje i specjalne oferty Honest Car.' },
  { slug: 'o-nas', title: 'O nas', text: 'Profesjonalny serwis samochodowy w Warszawie.' },
  { slug: 'kontakt', title: 'Kontakt', text: 'Umów wizytę lub skontaktuj się z Honest Car.' },
  { slug: 'blog', title: 'Blog', text: 'Porady i aktualności motoryzacyjne.' },
]

const serviceSeeds: ServiceSeed[] = [
  {
    slug: 'blacharstwo-i-lakiernictwo',
    title: 'Blacharstwo i lakiernictwo',
    children: [{ slug: 'naprawa-powypadkowa', title: 'Naprawa powypadkowa' }],
  },
  { slug: 'uklad-hamulcowy', title: 'Układ hamulcowy' },
  {
    slug: 'naprawa-silnika',
    title: 'Naprawa silnika',
    children: [
      { slug: 'naprawa-i-obsluga-turbosprezarek', title: 'Naprawa i obsługa turbosprężarek' },
      { slug: 'wymiana-alternatora', title: 'Wymiana alternatora' },
      { slug: 'wymiana-paskow-osprzetu', title: 'Wymiana pasków osprzętu' },
      { slug: 'wymiana-rozrusznika', title: 'Wymiana rozrusznika' },
      { slug: 'wymiana-rozrzadu', title: 'Wymiana rozrządu' },
    ],
  },
  {
    slug: 'uklad-napedowy-i-skrzynia-biegow',
    title: 'Układ napędowy i skrzynia biegów',
    children: [
      { slug: 'wymiana-sprzegla', title: 'Wymiana sprzęgła' },
      { slug: 'wymiana-oleju-w-automatycznej-skrzyni-biegow', title: 'Wymiana oleju w automatycznej skrzyni biegów' },
    ],
  },
  { slug: 'elektronika-samochodowa', title: 'Elektronika samochodowa' },
  { slug: 'uklad-kierowniczy', title: 'Układ kierowniczy' },
  { slug: 'klimatyzacja-samochodowa', title: 'Klimatyzacja samochodowa' },
  {
    slug: 'zawieszenie-i-uklad-jezdny',
    title: 'Zawieszenie i układ jezdny',
    children: [
      { slug: 'naprawa-i-obsluga-napedu-4x4', title: 'Naprawa i obsługa napędu 4x4' },
      { slug: 'wymiana-wahaczy', title: 'Wymiana wahaczy' },
    ],
  },
  { slug: 'opony-i-wulkanizacja', title: 'Opony i wulkanizacja' },
  { slug: 'pomoc-drogowa-i-laweta', title: 'Pomoc drogowa i laweta' },
  {
    slug: 'serwis-i-diagnostyka',
    title: 'Serwis i diagnostyka',
    children: [
      { slug: 'kompleksowa-diagnostyka-samochodu', title: 'Kompleksowa diagnostyka samochodu' },
      { slug: 'diagnostyka-komputerowa', title: 'Diagnostyka komputerowa' },
      { slug: 'diagnostyka-zawieszenia', title: 'Diagnostyka zawieszenia' },
      { slug: 'sprawdzenie-samochodu-przed-zakupem', title: 'Sprawdzenie samochodu przed zakupem' },
      { slug: 'przeglad-okresowy', title: 'Przegląd okresowy' },
      { slug: 'czyszczenie-silnika-i-lokalizacja-wyciekow', title: 'Czyszczenie silnika i lokalizacja wycieków' },
      { slug: 'sprawdzenie-szczelnosci-ukladu-chlodzenia', title: 'Sprawdzenie szczelności układu chłodzenia' },
      {
        slug: 'sprawdzanie-szczelnosci-ukladu-dolotowego-generatorem-dymu',
        title: 'Sprawdzanie szczelności układu dolotowego za pomocą generatora dymu',
      },
    ],
  },
  {
    slug: 'wymiana-plynow-i-filtrow',
    title: 'Wymiana płynów i filtrów',
    children: [{ slug: 'wymiana-oleju-silnikowego-i-filtra', title: 'Wymiana oleju silnikowego i filtra' }],
  },
  { slug: 'uslugi-dodatkowe', title: 'Usługi dodatkowe' },
]

const seedRoutes = async () => {
  const { default: configPromise } = await import('@payload-config')
  const payload = await getPayload({ config: configPromise })

  const ensurePage = async ({ slug, text, title }: PageSeed): Promise<Page> => {
    const { docs } = await payload.find({ collection: 'pages', limit: 1, where: { slug: { equals: slug } } })
    const [existingPage] = docs

    if (existingPage) {
      return existingPage
    }

    return payload.create({
      collection: 'pages',
      locale: 'pl',
      data: {
        slug,
        title,
        layout: [{ blockType: 'hero', title, text }],
      },
    })
  }

  const ensureService = async ({ slug, title }: ServiceSeed): Promise<Service> => {
    const { docs } = await payload.find({ collection: 'services', limit: 1, where: { slug: { equals: slug } } })
    const [existingService] = docs

    if (existingService) {
      return existingService
    }

    return payload.create({
      collection: 'services',
      locale: 'pl',
      data: { slug, title },
    })
  }

  const ensureRoute = async (
    slug: string,
    parentId: number | null,
    target: Route['target'],
  ): Promise<Route> => {
    const { docs } = await payload.find({
      collection: 'routes',
      fallbackLocale: false,
      limit: 1,
      locale: 'pl',
      where: {
        and: [
          { slug: { equals: slug } },
          parentId === null ? { parent: { exists: false } } : { parent: { equals: parentId } },
        ],
      },
    })
    const [existingRoute] = docs

    if (existingRoute) {
      return existingRoute
    }

    return payload.create({
      collection: 'routes',
      locale: 'pl',
      data: {
        slug,
        parent: parentId,
        target,
        status: 'published',
        showInSitemap: true,
      },
    })
  }

  const ensureMenu = async (name: string, items: MenuSeedItem[]): Promise<Menu> => {
    const { docs } = await payload.find({ collection: 'menus', limit: 1, where: { name: { equals: name } } })
    const [existingMenu] = docs

    if (existingMenu) {
      return existingMenu
    }

    return payload.create({
      collection: 'menus',
      locale: 'pl',
      data: { items, name },
    })
  }

  const pages = await Promise.all(pageSeeds.map(ensurePage))
  const pagesBySlug = new Map(pages.map((page) => [page.slug, page]))
  const pageRoutes = new Map<string, Route>()

  for (const pageSeed of pageSeeds) {
    const page = pagesBySlug.get(pageSeed.slug)

    if (!page) {
      throw new Error(`Page '${pageSeed.slug}' was not created.`)
    }

    const route = await ensureRoute(pageSeed.slug, null, { relationTo: 'pages', value: page.id })
    pageRoutes.set(pageSeed.slug, route)
  }

  const servicesPageRoute = pageRoutes.get('uslugi')

  if (!servicesPageRoute) {
    throw new Error("Route 'uslugi' was not created.")
  }

  const serviceRoutes = new Map<string, Route>()

  for (const serviceSeed of serviceSeeds) {
    const service = await ensureService(serviceSeed)
    const serviceRoute = await ensureRoute(serviceSeed.slug, servicesPageRoute.id, {
      relationTo: 'services',
      value: service.id,
    })
    serviceRoutes.set(serviceSeed.slug, serviceRoute)

    for (const childSeed of serviceSeed.children ?? []) {
      const childService = await ensureService(childSeed)

      const childRoute = await ensureRoute(childSeed.slug, serviceRoute.id, {
        relationTo: 'services',
        value: childService.id,
      })
      serviceRoutes.set(childSeed.slug, childRoute)
    }
  }

  const requireRoute = (routes: ReadonlyMap<string, Route>, slug: string): Route => {
    const route = routes.get(slug)

    if (!route) {
      throw new Error(`Route '${slug}' was not created.`)
    }

    return route
  }

  await ensureMenu('primary', [
    { label: 'Usługi', route: requireRoute(pageRoutes, 'uslugi').id },
    { label: 'Promocje', route: requireRoute(pageRoutes, 'promocje').id },
    { label: 'O nas', route: requireRoute(pageRoutes, 'o-nas').id },
    { label: 'Cennik', route: requireRoute(pageRoutes, 'cennik').id },
    { label: 'Portfolio', route: requireRoute(pageRoutes, 'portfolio').id },
    { label: 'Kontakt', route: requireRoute(pageRoutes, 'kontakt').id },
    { label: 'Blog', route: requireRoute(pageRoutes, 'blog').id },
  ])

  await ensureMenu(
    'services',
    serviceSeeds.map((serviceSeed) => ({
      label: serviceSeed.title,
      route: requireRoute(serviceRoutes, serviceSeed.slug).id,
      children: serviceSeed.children?.map((childSeed) => ({
        label: childSeed.title,
        route: requireRoute(serviceRoutes, childSeed.slug).id,
      })),
    })),
  )

  payload.logger.info('Seeded Polish pages, services, route hierarchy, and menus.')
}

seedRoutes()
  .then(() => process.exit(0))
  .catch((error: unknown) => {
    console.error(error)
    process.exit(1)
  })
