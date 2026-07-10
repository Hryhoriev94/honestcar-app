import { expect, test } from '@playwright/test'

test('home page renders initial shell', async ({ page }) => {
  await page.goto('/')

  await expect(page.getByRole('heading', { name: 'Serwis samochodowy, któremu możesz zaufać' })).toBeVisible()
})

test('Ukrainian locale prefix renders the localized home route', async ({ page }) => {
  await page.goto('/uk/')

  await expect(page.getByRole('heading', { name: 'Serwis samochodowy, któremu możesz zaufać' })).toBeVisible()
})

test('sitemap exposes locale root URLs', async ({ request }) => {
  const response = await request.get('/sitemap.xml')

  expect(response.ok()).toBeTruthy()

  const sitemap = await response.text()

  expect(sitemap).toMatch(/<loc>https?:\/\/[^/]+\/<\/loc>/)
  expect(sitemap).toMatch(/<loc>https?:\/\/[^/]+\/uk\/<\/loc>/)
  expect(sitemap).toMatch(/<loc>https?:\/\/[^/]+\/ru\/<\/loc>/)
  expect(sitemap).toMatch(/<loc>https?:\/\/[^/]+\/uslugi\/blacharstwo-i-lakiernictwo\/naprawa-powypadkowa\/<\/loc>/)
})

test('nested service route resolves its CMS target', async ({ page }) => {
  await page.goto('/uslugi/blacharstwo-i-lakiernictwo/naprawa-powypadkowa/')

  await expect(page.getByRole('heading', { name: 'Naprawa powypadkowa' })).toBeVisible()
})

test('footer navigation resolves URLs from CMS routes', async ({ page }) => {
  await page.goto('/')

  await expect(page.locator('.footer__nav a[href="/uslugi/"]')).toHaveCount(1)
  await expect(page.locator('.footer__nav a[href="/uslugi/blacharstwo-i-lakiernictwo/"]')).toHaveCount(1)
})

test('route hierarchy renders service catalogs from CMS children', async ({ page }) => {
  await page.goto('/uslugi/')
  await expect(page.locator('.card--service-category a[href="/uslugi/blacharstwo-i-lakiernictwo"]')).toHaveCount(1)
  expect(await page.locator('.card--service-category__image').count()).toBeGreaterThan(0)

  await page.goto('/uslugi/blacharstwo-i-lakiernictwo/')
  await expect(
    page.locator('.card--service-category a[href="/uslugi/blacharstwo-i-lakiernictwo/naprawa-powypadkowa"]'),
  ).toHaveCount(1)
})

test('service category renders imported CMS content', async ({ page }) => {
  await page.goto('/uslugi/serwis-i-diagnostyka/')

  await expect(page.getByRole('heading', { name: 'Serwis i diagnostyka' })).toBeVisible()
  await expect(page.getByRole('link', { name: 'Więcej' }).first()).toBeVisible()
})

test('service detail renders imported CMS content', async ({ page }) => {
  await page.goto('/uslugi/serwis-i-diagnostyka/diagnostyka-komputerowa/')

  await expect(page.getByRole('heading', { name: 'Diagnostyka komputerowa' })).toBeVisible()
  await expect(page.getByText('Kompleksowa diagnostyka komputerowa i techniczna auta.')).toBeVisible()
})
