'use client'
import '@/app/globals.css'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <html suppressHydrationWarning lang="no">
      <body>
        <main className="flex min-h-screen flex-col items-center justify-center gap-6 p-4">
          <div className="space-y-4 text-center">
            <h1 className="text-primary text-7xl font-bold">404</h1>
            <h2 className="text-2xl font-semibold">Siden finnes ikke</h2>
            <p className="text-muted-foreground max-w-md">Siden du leter etter eksisterer ikke.</p>
          </div>

          <div className="mt-4 flex flex-wrap gap-4">
            <Button asChild variant="default">
              <Link href="/">Gå til Forsiden</Link>
            </Button>

            <Button asChild variant="outline">
              <Link href="/en">Go Home</Link>
            </Button>
          </div>
        </main>
      </body>
    </html>
  )
}
