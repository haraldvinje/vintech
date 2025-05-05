"use client";
import "@/app/globals.css";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <html suppressHydrationWarning lang="no">
      <body>
        <main className="min-h-screen items-center justify-center flex flex-col gap-6 p-4">
          <div className="text-center space-y-4">
            <h1 className="text-7xl font-bold text-primary">404</h1>
            <h2 className="text-2xl font-semibold">Side ikke funnet</h2>
            <p className="text-muted-foreground max-w-md">
              Siden du leter etter eksisterer ikke.
            </p>
          </div>
          
          <div className="flex flex-wrap gap-4 mt-4">
            <Button asChild variant="default">
              <Link href="/">
                Gå til Forsiden
              </Link>
            </Button>
            
            <Button asChild variant="outline">
              <Link href="/en">
                Go Home
              </Link>
            </Button>
          </div>
        </main>
      </body>
    </html>
  );
}
