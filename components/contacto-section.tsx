"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

export function ContactSection() {
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<null | { ok: boolean; message: string }>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setStatus(null)

    const form = new FormData(e.currentTarget)
    const payload = {
      name: String(form.get("name") || ""),
      email: String(form.get("email") || ""),
      message: String(form.get("message") || ""),
    }

    try {
      // Ajusta la ruta del API si creas /api/contact
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      if (res.ok) {
        setStatus({ ok: true, message: "Mensaje enviado correctamente. ¡Gracias!" })
        e.currentTarget.reset()
      } else {
        const json = await res.json().catch(() => ({}))
        setStatus({ ok: false, message: json?.message || "Error al enviar el mensaje." })
      }
    } catch (err) {
      setStatus({ ok: false, message: "Error de red. Inténtalo de nuevo." })
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contacto" className="py-20 md:py-28">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-2xl border border-primary/10 bg-card p-8 shadow-2xl shadow-primary/10 ring-1 ring-primary/5">
            <h2 className="text-2xl font-bold mb-2">Contacto</h2>
            <p className="text-muted-foreground mb-6">
              ¿Tienes preguntas o quieres saber más sobre CardioAI? Escríbenos y te responderemos lo antes posible.
            </p>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <label className="flex flex-col">
                  <span className="text-sm font-medium mb-2">Nombre</span>
                  <input
                    name="name"
                    required
                    className="rounded-md border border-border/40 bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                    placeholder="Tu nombre"
                  />
                </label>

                <label className="flex flex-col">
                  <span className="text-sm font-medium mb-2">Email</span>
                  <input
                    type="email"
                    name="email"
                    required
                    className="rounded-md border border-border/40 bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                    placeholder="tu@ejemplo.com"
                  />
                </label>
              </div>

              <label className="flex flex-col">
                <span className="text-sm font-medium mb-2">Mensaje</span>
                <textarea
                  name="message"
                  required
                  rows={5}
                  className="rounded-md border border-border/40 bg-transparent px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/30"
                  placeholder="Cuéntanos cómo podemos ayudarte..."
                />
              </label>

              <div className="flex items-center justify-between gap-4 pt-2">
                <Button type="submit" disabled={loading}>
                  {loading ? "Enviando..." : "Enviar mensaje"}
                </Button>

                {status && (
                  <p
                    className={`text-sm ${
                      status.ok ? "text-green-600" : "text-destructive"
                    }`}
                  >
                    {status.message}
                  </p>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}