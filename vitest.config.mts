import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    include: ['src/**/*.test.{ts,tsx}'],
    coverage: {
      provider: 'v8',
      include: ['src/app/api/**/*.ts'],
      exclude: ['**/*.test.ts'],
      reporter: ['text-summary'],
      // The contact route is the only code that handles untrusted input on
      // the server, so it must stay fully covered.
      thresholds: { 'src/app/api/contact/route.ts': { 100: true } }
    }
  }
})
