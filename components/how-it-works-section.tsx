import { Card, CardContent } from "@/components/ui/card"
import { Smartphone, Activity, Brain, TrendingUp } from "lucide-react"

const steps = [
  {
    icon: Smartphone,
    step: "01",
    title: "Conecta tu dispositivo",
    description: "Sincroniza tu pulsera CardioAI con la aplicación en segundos",
  },
  {
    icon: Activity,
    step: "02",
    title: "Monitoreo continuo",
    description: "Tu frecuencia cardíaca se registra automáticamente 24/7",
  },
  {
    icon: Brain,
    step: "03",
    title: "Análisis con IA",
    description: "Nuestra inteligencia artificial analiza tus patrones de salud",
  },
  {
    icon: TrendingUp,
    step: "04",
    title: "Mejora continua",
    description: "Recibe recomendaciones personalizadas para optimizar tu salud",
  },
]

export function HowItWorksSection() {
  return (
    <section className="py-20 md:py-32">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center mb-16">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-4 py-1.5 text-sm font-medium text-accent">
            Proceso simple
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-balance md:text-5xl mb-4 leading-tight">
            Cómo funciona CardioAI
          </h2>
          <p className="text-lg text-muted-foreground text-balance leading-relaxed">
            Cuatro pasos simples para comenzar a cuidar tu salud cardiovascular
          </p>
        </div>

        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => {
              const Icon = step.icon
              return (
                <div key={index} className="relative">
                  {/* Connection line */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-16 left-[calc(50%+2rem)] w-[calc(100%-4rem)] h-0.5 bg-gradient-to-r from-primary/50 to-accent/50" />
                  )}

                  <Card className="relative border-border bg-card hover:border-primary/30 hover:shadow-lg transition-all duration-300">
                    <CardContent className="pt-6 text-center">
                      <div className="mb-4 flex justify-center relative">
                        <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 relative z-10">
                          <Icon className="h-10 w-10 text-primary" />
                        </div>
                        <div className="absolute -top-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-accent text-accent-foreground text-sm font-bold">
                          {step.step}
                        </div>
                      </div>
                      <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                    </CardContent>
                  </Card>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
