import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity, LineChart, MessageSquare, Sparkles, Shield, Zap } from "lucide-react"

const features = [
  {
    icon: Activity,
    title: "Monitoreo en tiempo real",
    description:
      "Visualiza tu frecuencia cardíaca en tiempo real y recibe alertas instantáneas si hay anomalías detectadas por nuestro sistema inteligente.",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: LineChart,
    title: "Trackeo de BPMS",
    description:
      "Accede al historial completo de tus mediciones y visualiza las tendencias de tu salud cardiovascular a lo largo del tiempo.",
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
  {
    icon: MessageSquare,
    title: "Asistente Chatbot IA",
    description:
      "Un chatbot inteligente te ayuda a interpretar tus datos y te da sugerencias personalizadas basadas en tu historial de salud.",
    color: "text-chart-3",
    bgColor: "bg-chart-3/10",
  },
  {
    icon: Sparkles,
    title: "Sugerencias personalizadas",
    description:
      "Recibe recomendaciones sobre ejercicio, dieta y descanso para cuidar tu salud cardiovascular de manera efectiva.",
    color: "text-chart-4",
    bgColor: "bg-chart-4/10",
  },
  {
    icon: Shield,
    title: "Seguridad garantizada",
    description:
      "Tus datos de salud están protegidos con cifrado de nivel médico y cumplimiento total de normativas de privacidad.",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: Zap,
    title: "Alertas inteligentes",
    description:
      "Sistema de notificaciones que aprende de tus patrones y solo te alerta cuando es realmente necesario.",
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
]

export function FeaturesSection() {
  return (
    <section id="funcionalidades" className="py-20 md:py-5">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center mb-16">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-4 py-1.5 text-sm font-medium text-accent">
            Funcionalidades
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-balance md:text-5xl mb-4 leading-tight">
            Todo lo que necesitas para cuidar tu corazón
          </h2>
          <p className="text-lg text-muted-foreground text-balance leading-relaxed">
            Tecnología avanzada de inteligencia artificial al servicio de tu salud cardiovascular
          </p>
        </div>

        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <Card
                  key={index}
                  className="group relative overflow-hidden border-border bg-card hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-accent/0 group-hover:from-primary/5 group-hover:to-accent/5 transition-all duration-300" />

                  <CardHeader className="relative">
                    <div
                      className={`mb-4 flex h-14 w-14 items-center justify-center rounded-xl ${feature.bgColor} group-hover:scale-110 transition-transform duration-300`}
                    >
                      <Icon className={`h-7 w-7 ${feature.color}`} />
                    </div>
                    <CardTitle className="text-xl leading-tight">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="relative">
                    <CardDescription className="text-base leading-relaxed">{feature.description}</CardDescription>
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
