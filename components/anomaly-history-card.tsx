"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { AlertCircle, Activity, Heart, TrendingUp } from "lucide-react"

interface Anomaly {
  id: string
  type: string
  bpm: number
  confidence: number
  description: string
  severity: "low" | "medium" | "high" | "critical"
  detectedAt: string
}

const mockAnomalies: Anomaly[] = [
  {
    id: "1",
    type: "Taquicardia",
    bpm: 125,
    confidence: 87,
    description: "Frecuencia cardíaca elevada detectada durante reposo",
    severity: "high",
    detectedAt: "2025-01-27 18:45",
  },
  {
    id: "2",
    type: "Patrón Irregular",
    bpm: 78,
    confidence: 72,
    description: "Variabilidad inusual en el ritmo cardíaco",
    severity: "medium",
    detectedAt: "2025-01-26 14:30",
  },
  {
    id: "3",
    type: "Bradicardia Leve",
    bpm: 52,
    confidence: 65,
    description: "Frecuencia cardíaca ligeramente baja durante actividad",
    severity: "low",
    detectedAt: "2025-01-25 10:15",
  },
]

const severityConfig = {
  low: { color: "text-chart-1", bgColor: "bg-chart-1/10", borderColor: "border-chart-1", label: "Leve" },
  medium: { color: "text-chart-3", bgColor: "bg-chart-3/10", borderColor: "border-chart-3", label: "Moderado" },
  high: { color: "text-orange-500", bgColor: "bg-orange-500/10", borderColor: "border-orange-500", label: "Alto" },
  critical: { color: "text-red-500", bgColor: "bg-red-500/10", borderColor: "border-red-500", label: "Crítico" },
}

const anomalyIcons = {
  Taquicardia: TrendingUp,
  "Patrón Irregular": Activity,
  "Bradicardia Leve": Heart,
}

export function AnomalyHistoryCard() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="bg-chart-4/10 p-3 rounded-lg">
            <AlertCircle className="h-6 w-6 text-chart-4" />
          </div>
          <div>
            <CardTitle>Historial de Anomalías Detectadas</CardTitle>
            <CardDescription>Patrones cardíacos inusuales identificados por la IA</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tipo</TableHead>
              <TableHead>BPM</TableHead>
              <TableHead>Confianza</TableHead>
              <TableHead>Severidad</TableHead>
              <TableHead>Fecha</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockAnomalies.map((anomaly) => {
              const Icon = anomalyIcons[anomaly.type as keyof typeof anomalyIcons] || AlertCircle
              const severityStyle = severityConfig[anomaly.severity]

              return (
                <TableRow key={anomaly.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Icon className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">{anomaly.type}</p>
                        <p className="text-xs text-muted-foreground">{anomaly.description}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="font-mono font-semibold">{anomaly.bpm}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-muted rounded-full h-2 max-w-[60px]">
                        <div className="bg-primary h-2 rounded-full" style={{ width: `${anomaly.confidence}%` }} />
                      </div>
                      <span className="text-xs text-muted-foreground">{anomaly.confidence}%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={`${severityStyle.borderColor} ${severityStyle.color}`}>
                      {severityStyle.label}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">{anomaly.detectedAt}</TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
