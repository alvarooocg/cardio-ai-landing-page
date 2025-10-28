"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { AlertTriangle, TrendingUp, TrendingDown, Activity } from "lucide-react"

type RiskLevel = "low" | "medium" | "high" | "critical"

interface RiskFactor {
  name: string
  impact: "positive" | "negative"
  description: string
}

interface RiskPredictionCardProps {
  riskLevel: RiskLevel
  riskPercentage: number
  factors: RiskFactor[]
  recommendations: string[]
}

const riskConfig = {
  low: {
    color: "text-chart-1",
    bgColor: "bg-chart-1/10",
    borderColor: "border-chart-1",
    label: "Riesgo Bajo",
    icon: TrendingDown,
  },
  medium: {
    color: "text-chart-3",
    bgColor: "bg-chart-3/10",
    borderColor: "border-chart-3",
    label: "Riesgo Moderado",
    icon: Activity,
  },
  high: {
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
    borderColor: "border-orange-500",
    label: "Riesgo Alto",
    icon: TrendingUp,
  },
  critical: {
    color: "text-red-500",
    bgColor: "bg-red-500/10",
    borderColor: "border-red-500",
    label: "Riesgo Crítico",
    icon: AlertTriangle,
  },
}

export function RiskPredictionCard({ riskLevel, riskPercentage, factors, recommendations }: RiskPredictionCardProps) {
  const config = riskConfig[riskLevel]
  const Icon = config.icon

  return (
    <Card className={`${config.borderColor} border-2`}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`${config.bgColor} p-3 rounded-lg`}>
              <Icon className={`h-6 w-6 ${config.color}`} />
            </div>
            <div>
              <CardTitle>Predicción de Riesgo Cardíaco</CardTitle>
              <CardDescription>Análisis basado en IA de tus datos de salud</CardDescription>
            </div>
          </div>
          <Badge variant="outline" className={`${config.borderColor} ${config.color}`}>
            {config.label}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Risk Percentage */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Probabilidad de Riesgo</span>
            <span className={`text-2xl font-bold ${config.color}`}>{riskPercentage}%</span>
          </div>
          <Progress value={riskPercentage} className="h-3" />
          <p className="text-xs text-muted-foreground">Basado en tus pulsaciones, edad, hábitos y factores de riesgo</p>
        </div>

        {/* Risk Factors */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold">Factores Analizados</h4>
          <div className="space-y-2">
            {factors.map((factor, index) => (
              <div key={index} className="flex items-start gap-3 rounded-lg border border-border p-3">
                <div
                  className={`mt-0.5 h-2 w-2 rounded-full ${
                    factor.impact === "positive" ? "bg-chart-1" : "bg-chart-4"
                  }`}
                />
                <div className="flex-1">
                  <p className="text-sm font-medium">{factor.name}</p>
                  <p className="text-xs text-muted-foreground mt-1">{factor.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recommendations */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold">Recomendaciones de la IA</h4>
          <div className="space-y-2">
            {recommendations.map((recommendation, index) => (
              <div key={index} className="flex items-start gap-3 rounded-lg bg-muted p-3">
                <div className="mt-0.5 h-1.5 w-1.5 rounded-full bg-primary" />
                <p className="text-sm flex-1">{recommendation}</p>
              </div>
            ))}
          </div>
        </div>

        {riskLevel === "high" || riskLevel === "critical" ? (
          <div className={`${config.bgColor} ${config.borderColor} border rounded-lg p-4`}>
            <div className="flex items-start gap-3">
              <AlertTriangle className={`h-5 w-5 ${config.color} mt-0.5`} />
              <div>
                <p className={`text-sm font-semibold ${config.color}`}>Acción Recomendada</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Se han detectado patrones que requieren atención médica. Te recomendamos consultar con un cardiólogo
                  para una evaluación completa.
                </p>
              </div>
            </div>
          </div>
        ) : null}
      </CardContent>
    </Card>
  )
}
