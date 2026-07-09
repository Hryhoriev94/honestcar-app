import { chromium } from '@playwright/test'

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 390, height: 900 } })
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

await page.locator('.header__burger').click()
const menuOpen = await page.locator('.header').evaluate((element) => element.classList.contains('is-open'))
await page.locator('.header__burger').click()

await page.locator('.js-open-booking').filter({ visible: true }).first().click()
const bookingExpanded = await page.locator('#bookingPanel').evaluate((element) => element.classList.contains('is-expanded'))

await page.locator('.js-collapse-booking').click()
const bookingCollapsed = await page.locator('#bookingPanel').evaluate((element) => !element.classList.contains('is-expanded'))

await page.locator('.js-sticky-callback').click()
const modalActive = await page.locator('#callbackModal').evaluate((element) => element.classList.contains('is-active'))
await page.locator('#callbackModal .modal__close').click()
const modalClosed = await page.locator('#callbackModal').evaluate((element) => !element.classList.contains('is-active'))

await page.locator('#seoToggle').click()
const seoExpanded = await page.locator('#seoText').evaluate((element) => !element.classList.contains('is-collapsed'))

await page.locator('[data-step="repair"]').first().click()
const processStep = await page.locator('.process').evaluate((element) => element.getAttribute('data-step'))

const comparison = page.locator('.comparison').first()
await comparison.scrollIntoViewIfNeeded()
const beforeAfter = await comparison.boundingBox()
if (beforeAfter) {
  await page.mouse.move(beforeAfter.x + beforeAfter.width * 0.25, beforeAfter.y + beforeAfter.height * 0.5)
  await page.mouse.down()
  await page.mouse.move(beforeAfter.x + beforeAfter.width * 0.75, beforeAfter.y + beforeAfter.height * 0.5)
  await page.mouse.up()
}

const comparisonHandleLeft = await page.locator('.comparison__handle').first().evaluate((element) => element.style.left)

await browser.close()

console.log(
  JSON.stringify(
    {
      bookingCollapsed,
      bookingExpanded,
      comparisonHandleLeft,
      consoleErrors,
      menuOpen,
      modalActive,
      modalClosed,
      processStep,
      seoExpanded,
    },
    null,
    2,
  ),
)
