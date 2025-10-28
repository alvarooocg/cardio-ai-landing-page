"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart"
import { Activity, Heart, TrendingUp, TrendingDown, AlertCircle, Download, Calendar } from "lucide-react"
import { Line, LineChart, Bar, BarChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ChatbotWidget } from "@/components/chatbot-widget"
import { PersonalizedSuggestions } from "@/components/personalized-suggestions"

// Mock data for BPM trends (last 7 days)
const bpmTrendData = [
  { time: "Lun", bpm: 72, max: 85, min: 65 },
  { time: "Mar", bpm: 75, max: 88, min: 68 },
  { time: "Mié", bpm: 70, max: 82, min: 63 },
  { time: "Jue", bpm: 73, max: 86, min: 66 },
  { time: "Vie", bpm: 78, max: 92, min: 70 },
  { time: "Sáb", bpm: 68, max: 80, min: 62 },
  { time: "Dom", bpm: 71, max: 83, min: 64 },
]

// Mock data for hourly BPM (today)
const hourlyBpmData = [
  { hour: "00:00", bpm: 65 },
  { hour: "03:00", bpm: 62 },
  { hour: "06:00", bpm: 68 },
  { hour: "09:00", bpm: 75 },
  { hour: "12:00", bpm: 82 },
  { hour: "15:00", bpm: 78 },
  { hour: "18:00", bpm: 73 },
  { hour: "21:00", bpm: 70 },
]

// Mock data for heart rate zones
const heartRateZones = [
  { zone: "Reposo", range: "60-70 BPM", percentage: 45, color: "hsl(var(--chart-1))" },
  { zone: "Ligero", range: "70-100 BPM", percentage: 30, color: "hsl(var(--chart-2))" },
  { zone: "Moderado", range: "100-130 BPM", percentage: 20, color: "hsl(var(--chart-3))" },
  { zone: "Intenso", range: "130-160 BPM", percentage: 5, color: "hsl(var(--chart-4))" },
]

// Mock data for recent measurements
const recentMeasurements = [
  { id: 1, date: "2025-01-28", time: "14:30", bpm: 78, status: "normal" },
  { id: 2, date: "2025-01-28", time: "10:15", bpm: 82, status: "normal" },
  { id: 3, date: "2025-01-27", time: "18:45", bpm: 95, status: "elevado" },
  { id: 4, date: "2025-01-27", time: "12:00", bpm: 73, status: "normal" },
  { id: 5, date: "2025-01-26", time: "16:20", bpm: 70, status: "normal" },
  { id: 6, date: "2025-01-26", time: "09:30", bpm: 68, status: "normal" },
]

export default function DashboardPage() {
  const currentBpm = 75
  const avgBpm = 73
  const maxBpm = 95
  const minBpm = 62

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-background">
        <div className="container py-8">
          {/* Page Header */}
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Dashboard de Salud Cardíaca</h1>
              <p className="text-muted-foreground mt-2">Monitorea tu frecuencia cardíaca y tendencias de salud</p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="gap-2 bg-transparent">
                <Calendar className="h-4 w-4" />
                Últimos 7 días
              </Button>
              <Button variant="outline" className="gap-2 bg-transparent">
                <Download className="h-4 w-4" />
                Exportar
              </Button>
            </div>
          </div>

          {/* Key Metrics Cards */}
          <div className="mb-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">BPM Actual</CardTitle>
                <Heart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{currentBpm} BPM</div>
                <p className="text-xs text-muted-foreground mt-1">
                  <span className="inline-flex items-center gap-1 text-chart-1">
                    <TrendingDown className="h-3 w-3" />
                    2% menos que ayer
                  </span>
                </p>
                <Badge variant="outline" className="mt-2 border-chart-1 text-chart-1">
                  Normal
                </Badge>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Promedio Semanal</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{avgBpm} BPM</div>
                <p className="text-xs text-muted-foreground mt-1">
                  <span className="inline-flex items-center gap-1 text-chart-2">
                    <TrendingUp className="h-3 w-3" />
                    1% más que la semana pasada
                  </span>
                </p>
                <Progress value={65} className="mt-2" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">BPM Máximo</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{maxBpm} BPM</div>
                <p className="text-xs text-muted-foreground mt-1">Registrado el 27 Ene, 18:45</p>
                <Badge variant="outline" className="mt-2 border-chart-3 text-chart-3">
                  Elevado
                </Badge>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">BPM Mínimo</CardTitle>
                <TrendingDown className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{minBpm} BPM</div>
                <p className="text-xs text-muted-foreground mt-1">Registrado el 26 Ene, 03:00</p>
                <Badge variant="outline" className="mt-2 border-chart-1 text-chart-1">
                  Reposo
                </Badge>
              </CardContent>
            </Card>
          </div>

          {/* Charts Section */}
          <div className="mb-8 grid gap-6 lg:grid-cols-2">
            {/* Weekly Trend Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Tendencia Semanal de BPM</CardTitle>
                <CardDescription>Promedio, máximo y mínimo diario de los últimos 7 días</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    bpm: {
                      label: "BPM Promedio",
                      color: "hsl(var(--chart-2))",
                    },
                    max: {
                      label: "BPM Máximo",
                      color: "hsl(var(--chart-4))",
                    },
                    min: {
                      label: "BPM Mínimo",
                      color: "hsl(var(--chart-1))",
                    },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={bpmTrendData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" />
                      <YAxis domain={[50, 100]} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <ChartLegend content={<ChartLegendContent />} />
                      <Line type="monotone" dataKey="bpm" stroke="var(--color-bpm)" strokeWidth={2} />
                      <Line type="monotone" dataKey="max" stroke="var(--color-max)" strokeWidth={2} />
                      <Line type="monotone" dataKey="min" stroke="var(--color-min)" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Hourly BPM Chart */}
            <Card>
              <CardHeader>
                <CardTitle>BPM por Hora (Hoy)</CardTitle>
                <CardDescription>Frecuencia cardíaca registrada cada 3 horas</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    bpm: {
                      label: "BPM",
                      color: "hsl(var(--chart-2))",
                    },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={hourlyBpmData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="hour" />
                      <YAxis domain={[50, 100]} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="bpm" fill="var(--color-bpm)" radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>

          {/* Tabs Section */}
          <Tabs defaultValue="zones" className="mb-8">
            <TabsList>
              <TabsTrigger value="zones">Zonas de Frecuencia</TabsTrigger>
              <TabsTrigger value="history">Historial</TabsTrigger>
              <TabsTrigger value="alerts">Alertas</TabsTrigger>
              <TabsTrigger value="suggestions">Sugerencias</TabsTrigger>
            </TabsList>

            {/* Heart Rate Zones Tab */}
            <TabsContent value="zones" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Distribución de Zonas de Frecuencia Cardíaca</CardTitle>
                  <CardDescription>Tiempo pasado en cada zona durante los últimos 7 días</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {heartRateZones.map((zone, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="h-3 w-3 rounded-full" style={{ backgroundColor: zone.color }} />
                            <div>
                              <p className="text-sm font-medium">{zone.zone}</p>
                              <p className="text-xs text-muted-foreground">{zone.range}</p>
                            </div>
                          </div>
                          <span className="text-sm font-medium">{zone.percentage}%</span>
                        </div>
                        <Progress value={zone.percentage} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* History Tab */}
            <TabsContent value="history" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Historial de Mediciones</CardTitle>
                  <CardDescription>Registro completo de tus mediciones recientes</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Fecha</TableHead>
                        <TableHead>Hora</TableHead>
                        <TableHead>BPM</TableHead>
                        <TableHead>Estado</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {recentMeasurements.map((measurement) => (
                        <TableRow key={measurement.id}>
                          <TableCell className="font-medium">{measurement.date}</TableCell>
                          <TableCell>{measurement.time}</TableCell>
                          <TableCell className="font-mono">{measurement.bpm}</TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className={
                                measurement.status === "normal"
                                  ? "border-chart-1 text-chart-1"
                                  : "border-chart-3 text-chart-3"
                              }
                            >
                              {measurement.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Alerts Tab */}
            <TabsContent value="alerts" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Alertas y Notificaciones</CardTitle>
                  <CardDescription>Eventos importantes detectados en tu salud cardíaca</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4 rounded-lg border border-chart-3/30 bg-chart-3/5 p-4">
                      <AlertCircle className="h-5 w-5 text-chart-3 mt-0.5" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">BPM elevado detectado</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          27 Ene, 18:45 - Se registró un BPM de 95, por encima de tu promedio habitual
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 rounded-lg border border-chart-1/30 bg-chart-1/5 p-4">
                      <Heart className="h-5 w-5 text-chart-1 mt-0.5" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">Excelente semana de salud cardíaca</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Tu BPM promedio se mantuvo en zona saludable durante 6 de 7 días
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 rounded-lg border border-chart-2/30 bg-chart-2/5 p-4">
                      <Activity className="h-5 w-5 text-chart-2 mt-0.5" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">Sugerencia: Aumenta tu actividad física</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Basado en tus datos, 30 minutos de ejercicio moderado podrían mejorar tu salud cardiovascular
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="suggestions" className="mt-6">
              <PersonalizedSuggestions />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
      <ChatbotWidget />
    </div>
  )
}
