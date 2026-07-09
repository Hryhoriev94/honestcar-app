import { expect, test } from '@playwright/test'

test('home page renders initial shell', async ({ page }) => {
  await page.goto('/')

  await expect(page.getByRole('heading', { name: 'Serwis samochodowy, któremu możesz zaufać' })).toBeVisible()
})
