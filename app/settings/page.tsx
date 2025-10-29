"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/client"
import type { User } from "@supabase/supabase-js"
import { useRouter } from "next/navigation"

export default function SettingsPage() {
  const supabase = createClient()
  const router = useRouter()

  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(false)
  const [editing, setEditing] = useState(false)
  const [status, setStatus] = useState<null | { ok: boolean; message: string }>(null)

  // form fields
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [avatar, setAvatar] = useState<string | null>(null)
  const [notifications, setNotifications] = useState(false)

  useEffect(() => {
    let mounted = true
    async function loadUser() {
      const { data } = await supabase.auth.getUser()
      const u = data?.user ?? null
      if (!mounted || !u) return

      setUser(u)
      setEmail(u.email ?? "")
      const meta = (u.user_metadata ?? {}) as Record<string, any>
      setName(meta.full_name ?? "")
      setAvatar(meta.avatar_url ?? null)
      setNotifications(Boolean(meta.notifications))
    }
    loadUser()

    // subscribe to auth changes to keep UI in sync (sign-in / sign-out)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!mounted) return
      if (event === "SIGNED_OUT") {
        setUser(null)
        // refresca la página/server components
        router.refresh()
      } else if (event === "SIGNED_IN") {
        setUser(session?.user ?? null)
        router.refresh()
      }
    })

    return () => {
      mounted = false
      subscription?.unsubscribe()
    }
  }, [])

  async function handleSave(e?: React.FormEvent) {
    e?.preventDefault()
    setLoading(true)
    setStatus(null)

    try {
      const { error } = await supabase.auth.updateUser({
        data: { full_name: name, avatar_url: avatar, notifications },
      })

      if (error) {
        setStatus({ ok: false, message: error.message })
      } else {
        setStatus({ ok: true, message: "Perfil actualizado correctamente." })
        setEditing(false)
        // actualiza user local
        const { data } = await supabase.auth.getUser()
        setUser(data?.user ?? user)
      }
    } catch (err) {
      setStatus({ ok: false, message: "Error al actualizar. Inténtalo de nuevo." })
    } finally {
      setLoading(false)
    }
  }

  async function handleSignOut() {
    // cerrar sesión, limpiar estado local y forzar refresh para que la UI se actualice
    await supabase.auth.signOut()
    setUser(null)
    // refresca server components actuales para que no quede info de sesión
    router.refresh()
    // redirige al inicio
    router.push("/")
  }

  return (
    <div className="py-12 md:py-16">
      <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header: igual que en la página de profile */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-4xl font-extrabold text-white">Mi Perfil</h1>
            <p className="text-slate-400">Gestiona tu información personal y de salud</p>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="/dashboard"
              className="rounded-md bg-white/5 px-3 py-2 text-sm text-white hover:bg-white/10 cursor-pointer"
            >
              Ir al Dashboard
            </a>
            <a
              href="/profile"
              className="rounded-md bg-white/5 px-3 py-2 text-sm text-white hover:bg-white/10 cursor-pointer"
            >
              Ver perfil
            </a>
          </div>
        </div>

        <div className="rounded-2xl border border-primary/10 bg-card p-6 shadow-2xl shadow-primary/10 ring-1 ring-primary/5">
          <div className="flex items-start justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-bold">Perfil y configuración</h1>
              <p className="text-muted-foreground mt-1">
                Revisa y edita tu información de cuenta.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Button className="cursor-pointer" variant="ghost" onClick={() => setEditing((s) => !s)}>
                {editing ? "Cancelar" : "Editar perfil"}
              </Button>
              <Button className="cursor-pointer" variant="destructive" onClick={handleSignOut}>
                Cerrar sesión
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Avatar / summary */}
            <aside className="flex flex-col items-center md:items-start md:col-span-1 rounded-lg border border-border/40 bg-background/50 p-4">
              <div className="relative mb-4">
                <div className="h-24 w-24 rounded-full overflow-hidden bg-muted/5 flex items-center justify-center">
                  {avatar ? (
                    // si avatar es URL externa
                    // next/image requiere domains configurados; mostramos fallback si falla
                    // aquí se usa Image con width/height fijos
                    <Image src={avatar} alt="Avatar" width={96} height={96} className="object-cover" />
                  ) : (
                    <div className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center text-primary/70 font-bold">
                      {name ? name.charAt(0).toUpperCase() : "U"}
                    </div>
                  )}
                </div>
              </div>

              <div className="text-center md:text-left">
                <h3 className="text-lg font-semibold">{name || "Usuario"}</h3>
                <p className="text-sm text-muted-foreground">{email}</p>
              </div>
            </aside>

            {/* Form / details */}
            <main className="md:col-span-2">
              <form onSubmit={(e) => void handleSave(e)} className="grid gap-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <label className="flex flex-col">
                    <span className="text-sm font-medium mb-2">Nombre</span>
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      readOnly={!editing}
                      className={`rounded-md border border-border/40 bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 ${!editing ? "opacity-80" : ""}`}
                      placeholder="Tu nombre completo"
                    />
                  </label>

                  <label className="flex flex-col">
                    <span className="text-sm font-medium mb-2">Email</span>
                    <input
                      value={email}
                      readOnly
                      className="rounded-md border border-border/40 bg-muted/5 px-3 py-2 text-sm text-muted-foreground"
                    />
                    <span className="text-xs text-muted-foreground mt-1">El email no puede modificarse desde aquí.</span>
                  </label>
                </div>

                <label className="flex flex-col">
                  <span className="text-sm font-medium mb-2">URL de avatar (opcional)</span>
                  <input
                    value={avatar ?? ""}
                    onChange={(e) => setAvatar(e.target.value || null)}
                    readOnly={!editing}
                    className={`rounded-md border border-border/40 bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 ${!editing ? "opacity-80" : ""}`}
                    placeholder="https://..."
                  />
                </label>

                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={notifications}
                    onChange={(e) => setNotifications(e.target.checked)}
                    disabled={!editing}
                    className="h-4 w-4 rounded border-border/40 bg-background"
                  />
                  <span className="text-sm">Recibir notificaciones y alertas</span>
                </label>

                <div className="flex items-center justify-between gap-4 pt-2">
                  <div className="flex items-center gap-3">
                    <Button className="cursor-pointer" type="submit" disabled={!editing || loading}>
                      {loading ? "Guardando..." : "Guardar cambios"}
                    </Button>
                    <Button className="cursor-pointer" variant="ghost" onClick={() => router.back()}>
                      Volver
                    </Button>
                  </div>

                  {status && (
                    <p className={`text-sm ${status.ok ? "text-green-600" : "text-destructive"}`}>
                      {status.message}
                    </p>
                  )}
                </div>
              </form>
            </main>
          </div>
        </div>
      </div>
    </div>
  )
}