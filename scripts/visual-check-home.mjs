import { chromium } from '@playwright/test'
import fs from 'node:fs'

/* global document, getComputedStyle, window */

const viewports = [
  { name: 'desktop', width: 1920, height: 1400 },
  { name: 'tablet', width: 1024, height: 1200 },
  { name: 'mobile', width: 390, height: 1200 },
]

fs.mkdirSync('.audit', { recursive: true })

const browser = await chromium.launch()
const results = []

for (const viewport of viewports) {
  const page = await browser.newPage({ viewport })
  const consoleErrors = []

  page.on('console', (message) => {
    if (message.type() === 'error') {
      consoleErrors.push(message.text())
    }
  })

  page.on('pageerror', (error) => {
    consoleErrors.push(error.message)
  })

  await page.goto('http://127.0.0.1:3000', { waitUntil: 'networkidle' })
  await page.screenshot({ path: `.audit/home-${viewport.name}-full.png`, fullPage: true })
  await page.screenshot({ path: `.audit/home-${viewport.name}-top.png`, fullPage: false })

  const data = await page.evaluate(() => {
    const rectFor = (selector) => {
      const element = document.querySelector(selector)

      if (!element) {
        return null
      }

      const rect = element.getBoundingClientRect()

      return {
        height: Math.round(rect.height),
        width: Math.round(rect.width),
        x: Math.round(rect.x),
        y: Math.round(rect.y),
      }
    }

    return {
      bodyWidth: document.body.scrollWidth,
      viewportWidth: window.innerWidth,
      horizontalOverflow: document.body.scrollWidth > window.innerWidth,
      reviews: {
        display: getComputedStyle(document.querySelector('.reviews-grid')).display,
        initialized: document.querySelector('[data-slider="reviews"]')?.classList.contains('swiper-initialized') ?? false,
        cards: [...document.querySelectorAll('.review-card')].map((card) => {
          const rect = card.getBoundingClientRect()
          return {
            height: Math.round(rect.height),
            width: Math.round(rect.width),
            x: Math.round(rect.x),
            y: Math.round(rect.y),
          }
        }),
      },
      sliders: [...document.querySelectorAll('[data-slider]')].map((slider) => ({
        className: slider.className,
        initialized: slider.classList.contains('swiper-initialized'),
        name: slider.getAttribute('data-slider'),
        slides: slider.querySelectorAll('.swiper-slide').length,
      })),
      sections: [...document.querySelectorAll('main > section')].map((section) => ({
        className: section.className,
        height: Math.round(section.getBoundingClientRect().height),
        id: section.id,
      })),
      keyRects: {
        header: rectFor('.header'),
        hero: rectFor('.hero'),
        floatingBooking: rectFor('#bookingPanel'),
        stickyCallback: rectFor('.sticky-callback'),
      },
    }
  })

  results.push({
    consoleErrors,
    data,
    viewport,
  })

  await page.close()
}

await browser.close()

fs.writeFileSync('.audit/home-visual-check.json', JSON.stringify(results, null, 2))
console.log(JSON.stringify(results, null, 2))
