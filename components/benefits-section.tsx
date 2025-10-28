import { Card, CardContent } from "@/components/ui/card"
import { Heart, TrendingDown, Clock, Users } from "lucide-react"

const benefits = [
  {
    icon: Heart,
    stat: "95%",
    label: "Mejora en salud cardíaca",
    description: "de usuarios reportan mejoras significativas",
  },
  {
    icon: TrendingDown,
    stat: "40%",
    label: "Reducción de riesgos",
    description: "en eventos cardiovasculares",
  },
  {
    icon: Clock,
    stat: "2 min",
    label: "Tiempo de respuesta",
    description: "ante anomalías detectadas",
  },
  {
    icon: Users,
    stat: "10K+",
    label: "Usuarios activos",
    description: "confían en CardioAI diariamente",
  },
]

export function BenefitsSection() {
  return (
    <section className="py-20 md:py-32 bg-muted/30">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center mb-16">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary">
            Resultados comprobados
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-balance md:text-5xl mb-4 leading-tight">
            Impacto real en tu salud
          </h2>
          <p className="text-lg text-muted-foreground text-balance leading-relaxed">
            Miles de personas ya están mejorando su salud cardiovascular con CardioAI
          </p>
        </div>

        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon
              return (
                <Card
                  key={index}
                  className="border-border bg-card hover:border-primary/30 hover:shadow-lg transition-all duration-300"
                >
                  <CardContent className="pt-6 text-center">
                    <div className="mb-4 flex justify-center">
                      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
                        <Icon className="h-8 w-8 text-primary" />
                      </div>
                    </div>
                    <div className="text-4xl font-bold text-primary mb-2">{benefit.stat}</div>
                    <div className="text-lg font-semibold mb-1">{benefit.label}</div>
                    <div className="text-sm text-muted-foreground leading-relaxed">{benefit.description}</div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
