import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"

const testimonials = [
  {
    name: "María González",
    role: "Atleta profesional",
    content:
      "CardioAI me ha ayudado a optimizar mis entrenamientos y prevenir lesiones. El monitoreo en tiempo real es increíble.",
    rating: 5,
    avatar: "/woman-athlete.jpg",
  },
  {
    name: "Dr. Carlos Ruiz",
    role: "Cardiólogo",
    content: "Recomiendo CardioAI a mis pacientes. La precisión de los datos y las alertas tempranas son invaluables.",
    rating: 5,
    avatar: "/male-doctor.png",
  },
  {
    name: "Ana Martínez",
    role: "Ejecutiva",
    content: "Gracias a CardioAI pude detectar una arritmia a tiempo. Literalmente me salvó la vida.",
    rating: 5,
    avatar: "/confident-business-woman.png",
  },
]

export function TestimonialsSection() {
  return (
    <section className="py-20 md:py-32 bg-muted/30">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center mb-16">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary">
            Testimonios
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-balance md:text-5xl mb-4 leading-tight">
            Lo que dicen nuestros usuarios
          </h2>
          <p className="text-lg text-muted-foreground text-balance leading-relaxed">
            Miles de personas confían en CardioAI para cuidar su salud cardíaca
          </p>
        </div>

        <div className="mx-auto max-w-6xl">
          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="border-border bg-card hover:border-primary/30 hover:shadow-lg transition-all duration-300"
              >
                <CardContent className="pt-6">
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-base leading-relaxed mb-6 text-foreground">"{testimonial.content}"</p>
                  <div className="flex items-center gap-3">
                    <img
                      src={testimonial.avatar || "/placeholder.svg"}
                      alt={testimonial.name}
                      className="h-12 w-12 rounded-full object-cover"
                    />
                    <div>
                      <div className="font-semibold">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
