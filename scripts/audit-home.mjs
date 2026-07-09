import { chromium } from '@playwright/test'
import fs from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

const sourceHtml = fs.readFileSync('source/index.html', 'utf8')

const sourceSections = [...sourceHtml.matchAll(/<section\s+([^>]*)>/g)].map((match, index) => {
  const attrs = match[1]
  const className = attrs.match(/class="([^"]+)"/)?.[1] ?? ''
  const id = attrs.match(/id="([^"]+)"/)?.[1] ?? ''

  return { index: index + 1, id, className }
})

const browser = await chromium.launch()
const context = await browser.newContext({ viewport: { width: 1440, height: 1400 } })
const page = await context.newPage()

await page.goto('http://127.0.0.1:3000', { waitUntil: 'networkidle' })

const nextSections = await page.locator('main > section').evaluateAll((sections) =>
  sections.map((section, index) => ({
    index: index + 1,
    id: section.id,
    className: section.className,
    text: section.textContent?.replace(/\s+/g, ' ').trim().slice(0, 240) ?? '',
    height: Math.round(section.getBoundingClientRect().height),
  })),
)

fs.mkdirSync('.audit', { recursive: true })
await page.screenshot({ path: '.audit/next-home-top.png', fullPage: false })
await page.screenshot({ path: '.audit/next-home-full.png', fullPage: true })

const sourcePage = await context.newPage()
await sourcePage.goto(pathToFileURL(path.resolve('source/index.html')).href, { waitUntil: 'networkidle' })
const sourceDomSections = await sourcePage.locator('main > section').evaluateAll((sections) =>
  sections.map((section, index) => ({
    index: index + 1,
    id: section.id,
    className: section.className,
    text: section.textContent?.replace(/\s+/g, ' ').trim().slice(0, 240) ?? '',
    height: Math.round(section.getBoundingClientRect().height),
  })),
)
await sourcePage.screenshot({ path: '.audit/source-home-top.png', fullPage: false })
await sourcePage.screenshot({ path: '.audit/source-home-full.png', fullPage: true })

for (const section of sourceDomSections) {
  await sourcePage.locator('main > section').nth(section.index - 1).screenshot({
    path: `.audit/source-section-${String(section.index).padStart(2, '0')}.png`,
  })
}

for (const section of nextSections) {
  await page.locator('main > section').nth(section.index - 1).screenshot({
    path: `.audit/next-section-${String(section.index).padStart(2, '0')}.png`,
  })
}

await browser.close()

console.log(JSON.stringify({ sourceSections, sourceDomSections, nextSections }, null, 2))
