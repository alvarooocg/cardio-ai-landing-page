import { Button } from "@/components/ui/button"
import { ArrowRight, Heart, Activity } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden py-20 md:py-32 lg:py-40">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px]" />
        <div className="absolute left-1/2 top-0 -z-10 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute right-0 top-1/2 -z-10 h-[400px] w-[400px] -translate-y-1/2 rounded-full bg-accent/5 blur-3xl" />
      </div>

      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mx-auto max-w-5xl text-center">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-sm backdrop-blur-sm">
            <Heart className="h-4 w-4 text-primary animate-pulse-glow" />
            <span className="font-medium text-foreground">Monitoreo cardíaco inteligente con IA</span>
          </div>

          <h1 className="mb-6 text-4xl font-bold tracking-tight text-balance md:text-6xl lg:text-7xl leading-tight">
            Tu compañero para una{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              vida más saludable
            </span>
          </h1>

          <p className="mb-10 text-lg text-muted-foreground text-balance md:text-xl leading-relaxed max-w-3xl mx-auto">
            Monitorea tu salud cardíaca en tiempo real, recibe alertas inteligentes y obtén consejos personalizados
            respaldados por inteligencia artificial
          </p>

          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center mb-16">
            <Button
              size="lg"
              className="gap-2 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all"
              asChild
            >
              <Link href="/auth/sign-up">
                Comienza ahora
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="gap-2 border-primary/20 hover:bg-primary/5 bg-transparent"
              asChild
            >
              <Link href="#funcionalidades">
                <Activity className="h-4 w-4" />
                Conoce más
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-8 mb-16 max-w-3xl mx-auto">
            <div className="flex flex-col items-center justify-center text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-1">99.9%</div>
              <div className="text-sm text-muted-foreground">Precisión</div>
            </div>
            <div className="flex flex-col items-center justify-center text-center">
              <div className="text-3xl md:text-4xl font-bold text-accent mb-1">24/7</div>
              <div className="text-sm text-muted-foreground">Monitoreo</div>
            </div>
            <div className="flex flex-col items-center justify-center text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-1">10K+</div>
              <div className="text-sm text-muted-foreground">Usuarios</div>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-6xl">
          <div className="relative aspect-video overflow-hidden rounded-2xl border border-primary/10 bg-card shadow-2xl shadow-primary/10 ring-1 ring-primary/5">
            <img
              src="/smartwatch-showing-heart-rate-monitor-on-wrist-wit.jpg"
              alt="Pulsera CardioAI en uso mostrando monitoreo de frecuencia cardíaca"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  )
}
