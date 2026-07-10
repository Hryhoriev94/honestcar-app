import nextEnv from '@next/env'
import { getPayload } from 'payload'

nextEnv.loadEnvConfig(process.cwd())
process.env.PAYLOAD_SECRET ??= 'change-me'

const seedServiceContent = async () => {
  const { default: configPromise } = await import('@payload-config')
  const payload = await getPayload({ config: configPromise })
  const { docs } = await payload.find({
    collection: 'services',
    limit: 1,
    locale: 'pl',
    where: { slug: { equals: 'serwis-i-diagnostyka' } },
  })
  const [service] = docs

  if (!service) {
    throw new Error("Service 'serwis-i-diagnostyka' was not found. Run seed:routes first.")
  }

  if (service.layout && service.layout.length > 0) {
    payload.logger.info('Service content already exists. Nothing to seed.')
  } else {
    await payload.update({
    collection: 'services',
    id: service.id,
    locale: 'pl',
    data: {
      summary: 'Kompleksowa diagnostyka samochodowa - od odczytu błędów po szczegółową analizę elektroniki, silnika i stanu technicznego pojazdu.',
      layout: [
        {
          blockType: 'service-benefits',
          eyebrow: 'Dlaczego warto',
          title: 'Dlaczego warto wykonać diagnostykę samochodową?',
          text: 'Regularna diagnostyka pozwala szybko wykryć usterki, uniknąć kosztownych napraw i utrzymać auto w pełnej sprawności.',
          items: [
            {
              title: 'Wczesne wykrywanie usterek',
              text: 'Diagnostyka pozwala wykryć problemy zanim doprowadzą do poważnej awarii lub kosztownej naprawy silnika i elektroniki.',
            },
            {
              title: 'Oszczędność czasu i pieniędzy',
              text: 'Szybka analiza błędów i parametrów auta pozwala uniknąć wymiany sprawnych części i skraca czas naprawy.',
            },
            {
              title: 'Dokładna analiza pojazdu',
              text: 'Sprawdzamy elektronikę, silnik, czujniki oraz parametry pracy układów, aby precyzyjnie określić źródło problemu.',
            },
            {
              title: 'Większe bezpieczeństwo jazdy',
              text: 'Regularna kontrola techniczna zwiększa niezawodność auta i pomaga uniknąć niespodziewanych usterek podczas jazdy.',
            },
          ],
        },
        {
          blockType: 'price-table',
          eyebrow: 'Cennik',
          title: 'Przejrzyste ceny bez niespodzianek',
          text: 'Finalna cena zależy od modelu auta, zakresu prac i wybranych części. Po diagnostyce zawsze przedstawiamy wycenę przed rozpoczęciem naprawy.',
          items: [
            { name: 'Diagnostyka komputerowa', price: 'od 150 zł' },
            { name: 'Kasowanie błędów', price: 'od 80 zł' },
            { name: 'Diagnostyka silnika', price: 'od 200 zł' },
            { name: 'Diagnostyka elektroniki', price: 'od 250 zł' },
            { name: 'Diagnostyka przed zakupem', price: 'od 350 zł' },
            { name: 'Kontrola kontrolek i czujników', price: 'od 120 zł' },
          ],
        },
        {
          blockType: 'service-faq',
          eyebrow: 'FAQ',
          title: 'Często zadawane pytania',
          items: [
            {
              isOpen: true,
              question: 'Ile czasu zajmuje typowa diagnostyka?',
              answer: 'Czas zależy od rodzaju problemu. Po wstępnej rozmowie i podłączeniu diagnostyki podajemy przewidywany zakres oraz czas potrzebny na dalsze sprawdzenie auta.',
            },
            {
              question: 'Czy po diagnostyce otrzymam wycenę?',
              answer: 'Tak. Po sprawdzeniu auta omawiamy wykryte usterki, możliwe rozwiązania i koszt prac przed rozpoczęciem naprawy.',
            },
            {
              question: 'Czy diagnostyka komputerowa wykryje każdą usterkę?',
              answer: 'Komputer pomaga odczytać błędy i parametry, ale w razie potrzeby łączymy go z oględzinami oraz pomiarami mechanicznymi.',
            },
          ],
        },
      ],
    },
    })
  }

  const { docs: diagnosticDocs } = await payload.find({
    collection: 'services',
    limit: 1,
    locale: 'pl',
    where: { slug: { equals: 'diagnostyka-komputerowa' } },
  })
  const [diagnosticService] = diagnosticDocs

  if (diagnosticService && (!diagnosticService.layout || diagnosticService.layout.length === 0)) {
    await payload.update({
      collection: 'services',
      id: diagnosticService.id,
      locale: 'pl',
      data: {
        summary: 'Kompleksowa diagnostyka komputerowa auta. Sprawdzamy błędy, parametry pracy podzespołów i rzeczywisty stan samochodu przed naprawą lub zakupem.',
        layout: [
          {
            blockType: 'service-benefits',
            eyebrow: 'Dlaczego warto',
            title: 'Precyzyjna diagnostyka bez zgadywania',
            text: 'Odczytujemy błędy sterowników i analizujemy parametry pracy auta, aby ustalić rzeczywistą przyczynę problemu.',
            items: [
              { title: 'Odczyt błędów', text: 'Sprawdzamy zapisane kody usterek oraz dane z kluczowych sterowników pojazdu.' },
              { title: 'Analiza parametrów', text: 'Porównujemy parametry pracy silnika, elektroniki i czujników z wartościami oczekiwanymi.' },
              { title: 'Jasny zakres naprawy', text: 'Po diagnostyce przedstawiamy wynik, możliwe rozwiązania i dalsze kroki.' },
              { title: 'Kontrola po naprawie', text: 'Weryfikujemy, czy po wykonanych pracach systemy działają prawidłowo.' },
            ],
          },
          {
            blockType: 'price-table',
            eyebrow: 'Cennik',
            title: 'Diagnostyka komputerowa i kontrola systemów',
            text: 'Cena zależy od zakresu problemu i liczby systemów wymagających sprawdzenia. Przed dalszą naprawą potwierdzamy zakres prac.',
            items: [
              { name: 'Diagnostyka komputerowa', price: 'od 150 zł' },
              { name: 'Kasowanie błędów po naprawie', price: 'od 80 zł' },
              { name: 'Analiza parametrów pracy silnika', price: 'od 200 zł' },
              { name: 'Kontrola elektroniki i czujników', price: 'od 250 zł' },
            ],
          },
          {
            blockType: 'service-faq',
            eyebrow: 'FAQ',
            title: 'Pytania o diagnostykę komputerową',
            items: [
              {
                isOpen: true,
                question: 'Czy diagnostyka komputerowa wystarczy do znalezienia usterki?',
                answer: 'Komputer jest punktem wyjścia. Gdy dane wskazują na problem mechaniczny lub elektryczny, wykonujemy dodatkowe pomiary i oględziny.',
              },
              {
                question: 'Czy można skasować błąd bez naprawy?',
                answer: 'Można usunąć zapis błędu, ale jeśli przyczyna pozostanie, komunikat zwykle wróci. Najpierw wyjaśniamy, co oznacza błąd.',
              },
              {
                question: 'Ile trwa diagnostyka komputerowa?',
                answer: 'Podstawowy odczyt trwa krótko, ale czas pełnej diagnozy zależy od objawów, historii błędów i potrzeby dodatkowych testów.',
              },
            ],
          },
        ],
      },
    })
  }

  payload.logger.info('Seeded service content for diagnostic category and detail page.')
}

seedServiceContent()
  .then(() => process.exit(0))
  .catch((error: unknown) => {
    console.error(error)
    process.exit(1)
  })
