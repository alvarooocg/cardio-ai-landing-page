"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { createClient } from "@/lib/supabase/client" // Cambiado a cliente
import { UserNav } from "@/components/user-nav"
import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import type { User } from "@supabase/supabase-js"

export function Header() {
  const [user, setUser] = useState<User | null>(null)
  const supabase = createClient()
  const pathname = usePathname()
  const hideNav = pathname?.startsWith("/dashboard") ?? false

  useEffect(() => {
    async function getUser() {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
    }
    getUser()
  }, [])

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container max-w-7xl mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <div className="rounded-lg p-1">
            <Image src="/cardioai-logo.png" alt="CardioAI Logo" width={48} height={48} className="h-12 w-12" />
          </div>
          <span className="text-xl font-bold">CardioAI</span>
        </Link>

        {!hideNav && (
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/#funcionalidades"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Funcionalidades
            </Link>
            <Link
              href="/dashboard"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Dashboard
            </Link>
            <Link
              href="/#contacto"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Contacto
            </Link>
          </nav>
        )}

        <div className="flex items-center gap-4">
          {user ? (
            <UserNav user={user} />
          ) : (
            <>
              <Button variant="ghost" asChild>
                <Link href="/auth/login">Iniciar Sesión</Link>
              </Button>
              <Button asChild>
                <Link href="/auth/sign-up">Comienza Ahora</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  )
}