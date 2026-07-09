import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import Script from 'next/script'
import { SwiperInitializer } from '@/components/client/SwiperInitializer'
import '@/app/globals.css'
import 'swiper/css'
import 'swiper/css/pagination'
import '@fortawesome/fontawesome-free/css/all.min.css'
import '@/app/source.css'

export const metadata: Metadata = {
  title: 'HonestCar',
  description: 'HonestCar website powered by Next.js and Payload CMS',
}

interface RootLayoutProps {
  children: ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="pl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Red+Hat+Display:wght@400;500;600;700&display=swap"
        />
      </head>
      <body>
        {children}
        <SwiperInitializer />
        <Script src="/js/main.js" strategy="afterInteractive" />
      </body>
    </html>
  )
}
