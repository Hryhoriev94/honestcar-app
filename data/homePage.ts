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

export const siteContact: SiteContact = {
  phone: '504 367 207',
  phoneHref: 'tel:+48504367207',
  email: 'kontakt@honestcar.pl',
  emailHref: 'mailto:kontakt@honestcar.pl',
  address: 'Hetmańska 47A, 04-305 Warszawa',
  addressHref: 'https://maps.app.goo.gl/PU27N4JTdbqkwk2H9',
  hours: 'Pon–Pt: 9:00–18:00',
}

export const siteNavigation: SiteNavigation = {
  primary: [
    { label: 'Usługi', href: '/services' },
    { label: 'Promocje', href: '/special-offers' },
    { label: 'O nas', href: '/about-us' },
    { label: 'Cennik', href: '/pricing' },
    { label: 'Portfolio', href: '/portfolio' },
    { label: 'Kontakt', href: '/contact' },
  ],
  services: [
    { label: 'Diagnostyka', href: '/services/diagnostyka' },
    { label: 'Naprawa silnika', href: '/services/naprawa-silnika' },
    { label: 'Naprawa zawieszenia', href: '/services/naprawa-zawieszenia' },
    { label: 'Układ hamulcowy', href: '/services/uklad-hamulcowy' },
    { label: 'Naprawa układu napędowego', href: '/services/naprawa-ukladu-napedowego' },
    { label: 'Blacharstwo i lakiernictwo', href: '/services/blacharstwo-i-lakiernictwo' },
  ],
}

export const heroHighlights: HeroHighlight[] = [
  { value: '150+', label: 'Zadowoleni klienci' },
  { value: '10+', label: 'Lat doświadczenia' },
  { value: '24/7', label: 'Pomoc drogowa' },
]

export const reviews: ReviewItem[] = [
  {
    author: 'Artur',
    date: '2 weeks ago',
    text: 'Professional, fair prices and very good contact. The car was ready on time and everything was explained in detail.',
  },
  {
    author: 'Artur',
    date: '1 month ago',
    text: 'Honest and reliable. They diagnosed the problem quickly and fixed it the same day.',
  },
  {
    author: 'Artur',
    date: '1 month ago',
    text: 'Great experience. Transparent pricing, no hidden costs and a very professional team.',
  },
  {
    author: 'Artur',
    date: '2 months ago',
    text: 'I’ve been coming here for years. Always top quality and a friendly atmosphere.',
  },
]

export const services: ServicePreview[] = [
  { title: 'Diagnostyka', href: '/services/diagnostyka', image: '/images/services/diagnostyka.jpg' },
  { title: 'Naprawa silnika', href: '/services/naprawa-silnika', image: '/images/services/naprawa-silnika.jpg' },
  { title: 'Naprawa zawieszenia', href: '/services/naprawa-zawieszenia', image: '/images/services/naprawa-zawieszenia.jpg' },
  { title: 'Układ hamulcowy', href: '/services/uklad-hamulcowy', image: '/images/services/uklad-hamulcowy.jpg' },
  {
    title: 'Naprawa układu napędowego',
    href: '/services/naprawa-ukladu-napedowego',
    image: '/images/services/naprawa-ukladu-napedowego.jpg',
  },
  {
    title: 'Blacharstwo i lakiernictwo',
    href: '/services/blacharstwo-i-lakiernictwo',
    image: '/images/services/blacharstwo-i-lakiernictwo.jpg',
  },
]

export const serviceBenefits: BenefitItem[] = [
  {
    iconClass: 'fa-solid fa-shield-halved',
    title: 'Oryginalne części i gwarancja',
    text: 'Stosujemy wyłącznie sprawdzone komponenty OEM z gwarancją na części oraz wykonane prace serwisowe',
  },
  {
    iconClass: 'fa-solid fa-user-gear',
    title: 'Naprawy na tysiące kilometrów',
    text: 'Dbamy nie tylko o szybki efekt, ale o trwałość i bezpieczeństwo eksploatacji pojazdu.',
  },
  {
    iconClass: 'fa-regular fa-clock',
    title: 'Uczciwe podejście do klienta',
    text: 'Transparentna diagnostyka, jasna wycena i pełna kontrola nad zakresem wykonywanych prac',
  },
]

export const beforeAfterProjects: BeforeAfterProject[] = [
  {
    title: 'Korekta lakieru',
    afterImage: '/images/before-after/brake-disc-pads-after.jpg',
    beforeImage: '/images/before-after/brake-disc-pads-before.jpg',
    afterAlt: 'Brake after',
    beforeAlt: 'Brake before',
  },
  {
    title: 'Naprawy blacharskie',
    afterImage: '/images/before-after/engine-oil-leak-after.jpg',
    beforeImage: '/images/before-after/engine-oil-leak-before.jpg',
    afterAlt: 'Engine after',
    beforeAlt: 'Engine before',
  },
  {
    title: 'Czyszczenie komory silnika',
    afterImage: '/images/before-after/after-repaired-cleaned-engine-area.jpg',
    beforeImage: '/images/before-after/before-engine-oil-leak.jpg',
    afterAlt: 'Cleaned engine after',
    beforeAlt: 'Engine before',
  },
]

export const brands: BrandLogo[] = [
  { name: 'BMW', image: '/images/brands/bmw.png' },
  { name: 'Mercedes-Benz', image: '/images/brands/mercedes-benz.png' },
  { name: 'Toyota', image: '/images/brands/toyota.png' },
  { name: 'Lexus', image: '/images/brands/lexus.png' },
  { name: 'Volkswagen', image: '/images/brands/volkswagen.png' },
  { name: 'Audi', image: '/images/brands/audi.png' },
  { name: 'Mini', image: '/images/brands/mini-car.png' },
  { name: 'Porsche', image: '/images/brands/porsche.png' },
  { name: 'Volvo', image: '/images/brands/volvo.png' },
  { name: 'Land Rover', image: '/images/brands/land-rover.png' },
  { name: 'Skoda', image: '/images/brands/skoda.png' },
  { name: 'Ford', image: '/images/brands/ford.png' },
  { name: 'Kia', image: '/images/brands/kia.png' },
  { name: 'Jeep', image: '/images/brands/jeep.png' },
  { name: 'Nissan', image: '/images/brands/nissan.png' },
  { name: 'Mitsubishi', image: '/images/brands/mitsubishi.png' },
  { name: 'Suzuki', image: '/images/brands/suzuki.png' },
]

export const processSteps: ProcessStep[] = [
  { id: 'form', number: '01', title: 'Formularz', text: 'Zostaw swoje dane i opisz problem ze swoim samochodem.' },
  { id: 'diagnostics', number: '02', title: 'Diagnostyka', text: 'Dokonujemy przeglądu samochodu i informujemy o zakresie prac.' },
  { id: 'repair', number: '03', title: 'Naprawa', text: 'Zostaw swój samochód w serwisie lub poczekaj tam.' },
  { id: 'pickup', number: '04', title: 'Przyjęcie', text: 'Otrzymujesz gotowy samochód wraz z informacjami o nim.' },
]

export const faqItems: FaqItem[] = [
  {
    question: 'Ile czasu zajmuje typowa naprawa?',
    answer:
      'Czas zależy od rodzaju naprawy. Większość usług wykonujemy tego samego dnia, ale zawsze podajemy szacowany czas naprawy po diagnozie.',
    isOpen: true,
  },
  {
    question: 'Do you use OEM parts?',
    answer: 'We use OEM or high-quality equivalent parts, depending on your preference and the repair requirements.',
  },
  {
    question: 'Do you offer a warranty?',
    answer: 'Yes, most repairs are covered by warranty. We explain warranty details before starting the work.',
  },
  {
    question: 'Can I wait at your center?',
    answer: 'Yes, you can wait on site for selected. For longer repairs, you can leave the car with us.',
  },
  {
    question: 'How much will the repair cost?',
    answer: 'We provide a clear estimate after checking the car. No hidden costs — we confirm the scope before any repair.',
  },
]

export const blogPreviewPosts: BlogPreviewItem[] = [
  {
    title: 'Kiedy należy wymienić opony?',
    href: '/blog/when-change-tires',
    image: '/images/blog/pre-purchase-inspection.jpg',
    alt: 'Car tire service',
    category: 'Porady',
  },
  {
    title: '5 oznak, że samochód wymaga uwagi',
    href: '/blog/car-needs-service',
    image: '/images/blog/tow-truck-assistance.jpg',
    alt: 'Mechanic checking engine',
    category: 'Konserwacja',
  },
  {
    title: 'Jak często należy wymieniać olej?',
    href: '/blog/change-oil',
    image: '/images/blog/oil-service-periodic-maintenance-cover.jpg',
    alt: 'Oil change service',
    category: 'Serwice',
  },
]
