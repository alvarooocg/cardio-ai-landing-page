import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

/**
 * API route to seed sample data for authenticated users
 * This should only be used for testing purposes
 */
export async function POST() {
  try {
    const supabase = await createClient()

    // Get the current user
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser()

    if (userError || !user) {
      return NextResponse.json({ error: "User not authenticated" }, { status: 401 })
    }

    // Seed heart rate measurements for the last 7 days
    const measurements = []
    for (let i = 7; i >= 0; i--) {
      const date = new Date()
      date.setDate(date.getDate() - i)

      // Generate 8 measurements per day (every 3 hours)
      for (let hour = 0; hour < 24; hour += 3) {
        const measurementDate = new Date(date)
        measurementDate.setHours(hour, 0, 0, 0)

        const bpm = Math.floor(Math.random() * 40) + 60 // 60-100 BPM
        const status = bpm > 90 ? "warning" : bpm < 60 ? "warning" : "normal"

        measurements.push({
          user_id: user.id,
          bpm,
          measured_at: measurementDate.toISOString(),
          status,
        })
      }
    }

    const { error: measurementsError } = await supabase.from("heart_rate_measurements").insert(measurements)

    if (measurementsError) throw measurementsError

    // Seed some alerts
    const alerts = [
      {
        user_id: user.id,
        alert_type: "high_bpm",
        bpm: 125,
        message: "Frecuencia cardíaca elevada detectada durante ejercicio",
        severity: "medium",
      },
      {
        user_id: user.id,
        alert_type: "low_bpm",
        bpm: 52,
        message: "Frecuencia cardíaca baja detectada durante el sueño",
        severity: "low",
      },
    ]

    const { error: alertsError } = await supabase.from("alerts").insert(alerts)

    if (alertsError) throw alertsError

    // Seed suggestions
    const suggestions = [
      {
        user_id: user.id,
        category: "exercise",
        title: "Caminata Matutina",
        description: "Comienza tu día con una caminata de 20 minutos para mejorar tu salud cardiovascular",
        impact: "high",
        time_estimate: "20 min",
      },
      {
        user_id: user.id,
        category: "nutrition",
        title: "Aumentar Fibra",
        description: "Agrega más granos enteros y vegetales a tu dieta",
        impact: "medium",
        time_estimate: "5 min",
      },
      {
        user_id: user.id,
        category: "sleep",
        title: "Horario de Sueño Consistente",
        description: "Acuéstate y levántate a la misma hora todos los días",
        impact: "high",
        time_estimate: "0 min",
      },
      {
        user_id: user.id,
        category: "hydration",
        title: "Beber Más Agua",
        description: "Intenta tomar 8 vasos de agua durante el día",
        impact: "medium",
        time_estimate: "2 min",
      },
    ]

    const { error: suggestionsError } = await supabase.from("suggestions").insert(suggestions)

    if (suggestionsError) throw suggestionsError

    return NextResponse.json({
      success: true,
      message: "Sample data seeded successfully",
    })
  } catch (error) {
    console.error("[v0] Error seeding data:", error)
    return NextResponse.json({ error: "Failed to seed data" }, { status: 500 })
  }
}
