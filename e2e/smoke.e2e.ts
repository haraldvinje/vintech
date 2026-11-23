import AxeBuilder from '@axe-core/playwright'
import { expect, type Page, test } from '@playwright/test'

const pages = [
  { path: '/', heading: 'IT-tjenester for din bedrift' },
  { path: '/en', heading: 'IT services for your business' },
  { path: '/privacy-policy', heading: 'Personvernerklæring' },
  { path: '/en/privacy-policy', heading: 'Privacy Policy' },
  { path: '/nowhere', heading: '404' }
]

const themes = ['light', 'dark'] as const

// Third-party scripts (GTM, Vercel insights) are not ours to test and would
// make runs depend on the network.
async function blockThirdParties(page: Page) {
  await page.route(/googletagmanager\.com|\/_vercel\//, (route) => route.abort())
}

async function presetStorage(page: Page, values: Record<string, string>) {
  await page.addInitScript((entries) => {
    for (const [key, value] of Object.entries(entries)) localStorage.setItem(key, value)
  }, values)
}

function collectErrors(page: Page) {
  const errors: string[] = []
  page.on('pageerror', (error) => errors.push(error.message))
  return errors
}

async function expectNoAxeViolations(page: Page) {
  const { violations } = await new AxeBuilder({ page }).analyze()
  expect(
    violations.map(({ id, nodes }) => `${id}: ${nodes.map((n) => n.target).join(', ')}`)
  ).toEqual([])
}

for (const { path, heading } of pages) {
  for (const theme of themes) {
    test(`${path} in ${theme} theme renders without errors or accessibility problems`, async ({
      page
    }) => {
      const errors = collectErrors(page)
      await blockThirdParties(page)
      await presetStorage(page, { theme, 'cookie-consent': 'essential' })

      const response = await page.goto(path)
      expect(response?.status()).toBe(path === '/nowhere' ? 404 : 200)
      await expect(page.getByRole('heading', { level: 1, name: heading })).toBeVisible()

      await expectNoAxeViolations(page)
      expect(errors).toEqual([])
    })
  }
}

test('the cookie banner is accessible and remembers the choice', async ({ page }) => {
  await blockThirdParties(page)
  await page.goto('/en')

  const banner = page.getByRole('heading', { name: 'Cookie Preferences' })
  await expect(banner).toBeVisible()
  await expectNoAxeViolations(page)

  await page.getByRole('button', { name: 'Essential Only', exact: true }).click()
  await expect(banner).toBeHidden()
  expect(await page.evaluate(() => localStorage.getItem('cookie-consent'))).toBe('essential')

  await page.reload()
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  await expect(banner).toBeHidden()
})

test('the contact form can be filled in and sent with the keyboard alone', async ({ page }) => {
  await blockThirdParties(page)
  await presetStorage(page, { 'cookie-consent': 'essential' })
  let sent: unknown
  await page.route('**/api/contact', async (route) => {
    sent = route.request().postDataJSON()
    await route.fulfill({ json: { success: true } })
  })
  await page.goto('/en#contact')

  await page.getByLabel('Name').focus()
  await page.keyboard.type('Ada Lovelace')
  await page.keyboard.press('Tab')
  await page.keyboard.type('ada@example.com')
  await page.keyboard.press('Tab')
  await page.keyboard.type('Hello')
  await page.keyboard.press('Tab')
  await page.keyboard.type('A message')
  await page.keyboard.press('Tab')
  await expect(page.getByRole('button', { name: 'Send Message' })).toBeFocused()
  await page.keyboard.press('Enter')

  await expect(
    page.getByText("Thank you for your message. We'll get back to you soon.")
  ).toBeVisible()
  expect(sent).toEqual({
    name: 'Ada Lovelace',
    email: 'ada@example.com',
    subject: 'Hello',
    message: 'A message'
  })
})

test('every focusable element in the header shows a visible focus indicator', async ({ page }) => {
  await blockThirdParties(page)
  await presetStorage(page, { 'cookie-consent': 'essential' })
  await page.goto('/en')
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible()

  const header = page.locator('header')
  let checked = 0
  for (; checked < 10; checked++) {
    await page.keyboard.press('Tab')
    const focused = page.locator(':focus')
    if (!(await header.locator(':focus').count())) break
    const indicator = await focused.evaluate((el) => {
      const style = getComputedStyle(el)
      return {
        outline: style.outlineStyle,
        outlineWidth: style.outlineWidth,
        shadow: style.boxShadow
      }
    })
    const visible =
      (indicator.outline !== 'none' && indicator.outlineWidth !== '0px') ||
      indicator.shadow !== 'none'
    expect(visible, `${await focused.evaluate((el) => el.outerHTML.slice(0, 120))}`).toBe(true)
  }
  expect(checked).toBeGreaterThanOrEqual(3)
})
