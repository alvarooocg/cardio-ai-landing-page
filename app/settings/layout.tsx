import type React from "react"
import Link from "next/link"

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="py-8 md:py-12">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <aside className="md:col-span-1 rounded-2xl border border-primary/10 bg-card p-4">
            <nav className="flex flex-col space-y-1">
              <Link
                href="/profile"
                className="block rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-primary/5 hover:text-foreground transition-colors"
              >
                Perfil
              </Link>
              <Link
                href="/dashboard/settings"
                className="block rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-primary/5 hover:text-foreground transition-colors"
              >
                Configuración
              </Link>
            </nav>
          </aside>

          <main className="md:col-span-3 rounded-2xl border border-primary/10 bg-card p-6">
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}