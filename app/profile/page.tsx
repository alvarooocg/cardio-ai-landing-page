import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { User, Mail, Calendar, Heart, Activity, Cigarette, AlertCircle, Users } from "lucide-react"

export default async function ProfilePage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  // Fetch user profile data
  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single()

  const getSexLabel = (sex: string | null) => {
    if (!sex) return "No especificado"
    if (sex === "male") return "Masculino"
    if (sex === "female") return "Femenino"
    return "Otro"
  }

  const getFamilyHistoryLabel = (history: boolean | null) => {
    if (history === null) return "No sé"
    return history ? "Sí" : "No"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 py-12">
      <div className="container max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8">
          {/* Header */}
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl font-bold text-white">Mi Perfil</h1>
            <p className="text-slate-400">Gestiona tu información personal y de salud</p>
          </div>

          {/* Personal Information Card */}
          <Card className="bg-slate-900/50 border-slate-800">
            <CardHeader>
              <CardTitle className="text-2xl text-white flex items-center gap-2">
                <User className="h-6 w-6 text-cyan-400" />
                Información Personal
              </CardTitle>
              <CardDescription className="text-slate-400">Tu información básica de cuenta</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="flex items-start gap-3">
                  <User className="h-5 w-5 text-slate-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-slate-400">Nombre Completo</p>
                    <p className="text-lg text-white font-medium">
                      {user.user_metadata?.full_name || "No especificado"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-slate-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-slate-400">Correo Electrónico</p>
                    <p className="text-lg text-white font-medium">{user.email}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-slate-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-slate-400">Miembro desde</p>
                    <p className="text-lg text-white font-medium">
                      {new Date(user.created_at).toLocaleDateString("es-ES", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Activity className="h-5 w-5 text-slate-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-slate-400">Estado de Cuenta</p>
                    <Badge className="mt-1 bg-green-500/10 text-green-400 border-green-500/20">Activa</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Health Profile Card */}
          <Card className="bg-slate-900/50 border-slate-800">
            <CardHeader>
              <CardTitle className="text-2xl text-white flex items-center gap-2">
                <Heart className="h-6 w-6 text-cyan-400" />
                Perfil de Salud
              </CardTitle>
              <CardDescription className="text-slate-400">
                Información utilizada para personalizar tu análisis cardíaco
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {profile ? (
                <>
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="flex items-start gap-3">
                      <User className="h-5 w-5 text-slate-400 mt-0.5" />
                      <div>
                        <p className="text-sm text-slate-400">Sexo</p>
                        <p className="text-lg text-white font-medium">{getSexLabel(profile.sex)}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Calendar className="h-5 w-5 text-slate-400 mt-0.5" />
                      <div>
                        <p className="text-sm text-slate-400">Edad</p>
                        <p className="text-lg text-white font-medium">{profile.age || "No especificado"} años</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Cigarette className="h-5 w-5 text-slate-400 mt-0.5" />
                      <div>
                        <p className="text-sm text-slate-400">Fumador</p>
                        <Badge
                          className={`mt-1 ${
                            profile.smoker
                              ? "bg-red-500/10 text-red-400 border-red-500/20"
                              : "bg-green-500/10 text-green-400 border-green-500/20"
                          }`}
                        >
                          {profile.smoker ? "Sí" : "No"}
                        </Badge>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <AlertCircle className="h-5 w-5 text-slate-400 mt-0.5" />
                      <div>
                        <p className="text-sm text-slate-400">Hipertensión</p>
                        <Badge
                          className={`mt-1 ${
                            profile.hypertension
                              ? "bg-orange-500/10 text-orange-400 border-orange-500/20"
                              : "bg-green-500/10 text-green-400 border-green-500/20"
                          }`}
                        >
                          {profile.hypertension ? "Sí" : "No"}
                        </Badge>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Users className="h-5 w-5 text-slate-400 mt-0.5" />
                      <div>
                        <p className="text-sm text-slate-400">Antecedentes Familiares</p>
                        <p className="text-lg text-white font-medium">
                          {getFamilyHistoryLabel(profile.family_history)}
                        </p>
                      </div>
                    </div>
                  </div>

                  {profile.medical_history && (
                    <>
                      <Separator className="bg-slate-800" />
                      <div>
                        <p className="text-sm text-slate-400 mb-2">Historial Médico</p>
                        <p className="text-white leading-relaxed">{profile.medical_history}</p>
                      </div>
                    </>
                  )}
                </>
              ) : (
                <div className="text-center py-8">
                  <p className="text-slate-400">No se ha completado el perfil de salud</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Risk Factors Summary */}
          <Card className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border-cyan-500/20">
            <CardHeader>
              <CardTitle className="text-xl text-white flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-cyan-400" />
                Resumen de Factores de Riesgo
              </CardTitle>
            </CardHeader>
            <CardContent>
              {profile ? (
                <div className="flex flex-wrap gap-2">
                  {profile.age && profile.age > 45 && (
                    <Badge className="bg-yellow-500/10 text-yellow-400 border-yellow-500/20">Edad &gt; 45</Badge>
                  )}
                  {profile.smoker && <Badge className="bg-red-500/10 text-red-400 border-red-500/20">Fumador</Badge>}
                  {profile.hypertension && (
                    <Badge className="bg-orange-500/10 text-orange-400 border-orange-500/20">Hipertensión</Badge>
                  )}
                  {profile.family_history && (
                    <Badge className="bg-purple-500/10 text-purple-400 border-purple-500/20">
                      Antecedentes Familiares
                    </Badge>
                  )}
                  {!profile.smoker && !profile.hypertension && !profile.family_history && (
                    <Badge className="bg-green-500/10 text-green-400 border-green-500/20">
                      Sin factores de riesgo identificados
                    </Badge>
                  )}
                </div>
              ) : (
                <p className="text-slate-400">Completa tu perfil de salud para ver tus factores de riesgo</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
