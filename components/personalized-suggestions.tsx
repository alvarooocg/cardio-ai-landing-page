"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Heart, Activity, Moon, Apple, Droplets, Wind, TrendingUp, CheckCircle2, Clock, Target } from "lucide-react"
import { useState } from "react"

type SuggestionCategory = "exercise" | "nutrition" | "sleep" | "hydration" | "breathing" | "general"

type Suggestion = {
  id: number
  category: SuggestionCategory
  title: string
  description: string
  impact: "high" | "medium" | "low"
  timeEstimate: string
  completed: boolean
  priority: number
}

const categoryConfig = {
  exercise: { icon: Activity, label: "Ejercicio", color: "text-chart-2" },
  nutrition: { icon: Apple, label: "Nutrición", color: "text-chart-3" },
  sleep: { icon: Moon, label: "Sueño", color: "text-chart-4" },
  hydration: { icon: Droplets, label: "Hidratación", color: "text-chart-1" },
  breathing: { icon: Wind, label: "Respiración", color: "text-chart-5" },
  general: { icon: Heart, label: "General", color: "text-primary" },
}

const impactConfig = {
  high: { label: "Alto impacto", color: "border-chart-3 text-chart-3" },
  medium: { label: "Impacto medio", color: "border-chart-2 text-chart-2" },
  low: { label: "Bajo impacto", color: "border-chart-1 text-chart-1" },
}

const mockSuggestions: Suggestion[] = [
  {
    id: 1,
    category: "exercise",
    title: "Caminata matutina de 20 minutos",
    description:
      "Basado en tu BPM promedio de 73, una caminata ligera por la mañana puede ayudar a mejorar tu salud cardiovascular y reducir tu frecuencia cardíaca en reposo.",
    impact: "high",
    timeEstimate: "20 min/día",
    completed: false,
    priority: 1,
  },
  {
    id: 2,
    category: "hydration",
    title: "Aumenta tu consumo de agua",
    description:
      "La hidratación adecuada puede ayudar a regular tu frecuencia cardíaca. Intenta beber 8 vasos de agua al día para mantener tu corazón saludable.",
    impact: "medium",
    timeEstimate: "Todo el día",
    completed: false,
    priority: 2,
  },
  {
    id: 3,
    category: "sleep",
    title: "Establece una rutina de sueño consistente",
    description:
      "Dormir 7-9 horas por noche puede reducir tu BPM en reposo hasta un 10%. Intenta acostarte y levantarte a la misma hora todos los días.",
    impact: "high",
    timeEstimate: "7-9 horas/noche",
    completed: false,
    priority: 3,
  },
  {
    id: 4,
    category: "breathing",
    title: "Ejercicios de respiración profunda",
    description:
      "Practica respiración diafragmática durante 5 minutos al día. Esto puede ayudar a reducir el estrés y mejorar tu variabilidad de frecuencia cardíaca.",
    impact: "medium",
    timeEstimate: "5 min/día",
    completed: false,
    priority: 4,
  },
  {
    id: 5,
    category: "nutrition",
    title: "Incorpora más omega-3 en tu dieta",
    description:
      "Alimentos ricos en omega-3 como salmón, nueces y semillas de chía pueden mejorar tu salud cardiovascular y reducir la inflamación.",
    impact: "high",
    timeEstimate: "2-3 veces/semana",
    completed: false,
    priority: 5,
  },
  {
    id: 6,
    category: "general",
    title: "Reduce el consumo de cafeína",
    description:
      "Notamos que tu BPM alcanzó 95 el 27 de enero. Limitar la cafeína a 1-2 tazas al día puede ayudar a mantener tu frecuencia cardíaca más estable.",
    impact: "medium",
    timeEstimate: "Continuo",
    completed: false,
    priority: 6,
  },
]

export function PersonalizedSuggestions() {
  const [suggestions, setSuggestions] = useState<Suggestion[]>(mockSuggestions)

  const toggleComplete = (id: number) => {
    setSuggestions((prev) =>
      prev.map((suggestion) =>
        suggestion.id === id ? { ...suggestion, completed: !suggestion.completed } : suggestion,
      ),
    )
  }

  const completedCount = suggestions.filter((s) => s.completed).length
  const totalCount = suggestions.length
  const completionPercentage = Math.round((completedCount / totalCount) * 100)

  const prioritySuggestions = suggestions.filter((s) => !s.completed).slice(0, 3)

  return (
    <div className="space-y-6">
      {/* Progress Overview */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Tu Progreso de Salud</CardTitle>
              <CardDescription>
                Has completado {completedCount} de {totalCount} sugerencias
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5 text-muted-foreground" />
              <span className="text-2xl font-bold">{completionPercentage}%</span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Progress value={completionPercentage} className="h-3" />
          <p className="text-xs text-muted-foreground mt-2">
            Sigue estas recomendaciones para mejorar tu salud cardiovascular
          </p>
        </CardContent>
      </Card>

      {/* Priority Suggestions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Sugerencias Prioritarias
          </CardTitle>
          <CardDescription>Recomendaciones personalizadas basadas en tus datos de BPM</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {prioritySuggestions.map((suggestion) => {
              const categoryInfo = categoryConfig[suggestion.category]
              const impactInfo = impactConfig[suggestion.impact]
              const CategoryIcon = categoryInfo.icon

              return (
                <div
                  key={suggestion.id}
                  className="flex items-start gap-4 rounded-lg border border-border bg-card p-4 transition-colors hover:bg-accent/5"
                >
                  <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10`}>
                    <CategoryIcon className={`h-5 w-5 ${categoryInfo.color}`} />
                  </div>

                  <div className="flex-1 space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h4 className="font-semibold leading-none">{suggestion.title}</h4>
                        <p className="text-xs text-muted-foreground mt-1">{categoryInfo.label}</p>
                      </div>
                      <Badge variant="outline" className={impactInfo.color}>
                        {impactInfo.label}
                      </Badge>
                    </div>

                    <p className="text-sm text-muted-foreground leading-relaxed">{suggestion.description}</p>

                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {suggestion.timeEstimate}
                        </span>
                      </div>

                      <Button
                        size="sm"
                        variant={suggestion.completed ? "outline" : "default"}
                        onClick={() => toggleComplete(suggestion.id)}
                        className="gap-2"
                      >
                        {suggestion.completed ? (
                          <>
                            <CheckCircle2 className="h-4 w-4" />
                            Completado
                          </>
                        ) : (
                          "Marcar como completado"
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* All Suggestions by Category */}
      <Card>
        <CardHeader>
          <CardTitle>Todas las Sugerencias</CardTitle>
          <CardDescription>Explora todas las recomendaciones personalizadas para ti</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {suggestions.map((suggestion) => {
              const categoryInfo = categoryConfig[suggestion.category]
              const CategoryIcon = categoryInfo.icon

              return (
                <div
                  key={suggestion.id}
                  className={`flex items-center gap-3 rounded-lg border p-3 transition-all ${
                    suggestion.completed
                      ? "border-chart-1/30 bg-chart-1/5 opacity-60"
                      : "border-border bg-card hover:bg-accent/5"
                  }`}
                >
                  <div
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-md ${
                      suggestion.completed ? "bg-chart-1/20" : "bg-primary/10"
                    }`}
                  >
                    {suggestion.completed ? (
                      <CheckCircle2 className="h-4 w-4 text-chart-1" />
                    ) : (
                      <CategoryIcon className={`h-4 w-4 ${categoryInfo.color}`} />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium ${suggestion.completed ? "line-through" : ""}`}>
                      {suggestion.title}
                    </p>
                    <p className="text-xs text-muted-foreground">{categoryInfo.label}</p>
                  </div>

                  <Button size="sm" variant="ghost" onClick={() => toggleComplete(suggestion.id)} className="shrink-0">
                    {suggestion.completed ? "Deshacer" : "Completar"}
                  </Button>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
