import { createClient } from "@/lib/supabase/server"

/**
 * Helper functions for database operations
 */

export async function getUserProfile(userId: string) {
  const supabase = await createClient()
  const { data, error } = await supabase.from("profiles").select("*").eq("id", userId).single()

  if (error) throw error
  return data
}

export async function getHeartRateMeasurements(userId: string, limit = 100) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("heart_rate_measurements")
    .select("*")
    .eq("user_id", userId)
    .order("measured_at", { ascending: false })
    .limit(limit)

  if (error) throw error
  return data
}

export async function getRecentAlerts(userId: string, limit = 10) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("alerts")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(limit)

  if (error) throw error
  return data
}

export async function getUserSuggestions(userId: string) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("suggestions")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })

  if (error) throw error
  return data
}

export async function toggleSuggestionComplete(suggestionId: string, completed: boolean) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("suggestions")
    .update({
      completed,
      completed_at: completed ? new Date().toISOString() : null,
    })
    .eq("id", suggestionId)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function addHeartRateMeasurement(userId: string, bpm: number, status: "normal" | "warning" | "danger") {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("heart_rate_measurements")
    .insert({
      user_id: userId,
      bpm,
      status,
      measured_at: new Date().toISOString(),
    })
    .select()
    .single()

  if (error) throw error
  return data
}

export async function createAlert(
  userId: string,
  alertType: "high_bpm" | "low_bpm" | "irregular" | "emergency",
  bpm: number,
  message: string,
  severity: "low" | "medium" | "high" | "critical",
) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("alerts")
    .insert({
      user_id: userId,
      alert_type: alertType,
      bpm,
      message,
      severity,
    })
    .select()
    .single()

  if (error) throw error
  return data
}
