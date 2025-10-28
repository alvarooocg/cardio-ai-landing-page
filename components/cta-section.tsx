import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export function CTASection() {
  return (
    <section id="dashboard" className="py-20 md:py-32">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <Card className="relative overflow-hidden border-border bg-gradient-to-br from-primary/10 via-accent/10 to-primary/5">
            <div className="relative z-10 px-6 py-16 md:px-12 md:py-24">
              <div className="mx-auto max-w-3xl text-center">
                <h2 className="mb-4 text-3xl font-bold tracking-tight text-balance md:text-5xl">
                  Accede a tu Dashboard personalizado
                </h2>
                <p className="mb-8 text-lg text-muted-foreground text-balance leading-relaxed">
                  Visualiza tus datos en tiempo real, revisa tu historial de BPMS, recibe alertas y obtén sugerencias
                  personalizadas para mejorar tu salud
                </p>
                <div className="flex justify-center">
                  <Button size="lg" className="gap-2" asChild>
                    <Link href="/dashboard">
                      Acceder a mi Dashboard
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>

            {/* Background decoration */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px]" />
          </Card>
        </div>
      </div>
    </section>
  )
}
