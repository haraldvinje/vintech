import { defineConfig, devices } from '@playwright/test'

const PORT = 3199
const inCi = process.env.CI === 'true'

// Runs against the production build (`pnpm build` first), so it exercises
// what `vercel build` ships rather than the dev server.
export default defineConfig({
  testDir: '.',
  testMatch: '*.e2e.ts',
  forbidOnly: inCi,
  retries: inCi ? 1 : 0,
  reporter: inCi ? 'github' : 'list',
  use: { baseURL: `http://localhost:${PORT}`, trace: 'retain-on-failure' },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'] } },
    { name: 'phone', use: { ...devices['Pixel 7'] } }
  ],
  webServer: {
    command: `pnpm exec next start --port ${PORT}`,
    cwd: '..',
    url: `http://localhost:${PORT}`,
    reuseExistingServer: !inCi
  }
})
