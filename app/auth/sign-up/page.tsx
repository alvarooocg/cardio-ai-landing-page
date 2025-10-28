"use client"

import type React from "react"

import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Heart } from "lucide-react"

export default function SignUpPage() {
  const [step, setStep] = useState(1)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [fullName, setFullName] = useState("")
  const [repeatPassword, setRepeatPassword] = useState("")

  const [sex, setSex] = useState<string>("")
  const [age, setAge] = useState<string>("")
  const [smoker, setSmoker] = useState<string>("")
  const [hypertension, setHypertension] = useState<string>("")
  const [familyHistory, setFamilyHistory] = useState<string>("")
  const [medicalHistory, setMedicalHistory] = useState("")

  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault()

    if (password !== repeatPassword) {
      setError("Las contraseñas no coinciden")
      return
    }

    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres")
      return
    }

    setError(null)
    setStep(2)
  }

  const handleStep2Submit = async (e: React.FormEvent) => {
    e.preventDefault()
    const supabase = createClient()
    setIsLoading(true)
    setError(null)

    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL || `${window.location.origin}/dashboard`,
          data: {
            full_name: fullName,
          },
        },
      })

      if (authError) throw authError

      if (authData.user) {
        const { error: profileError } = await supabase
          .from("profiles")
          .update({
            sex,
            age: Number.parseInt(age),
            smoker: smoker === "yes",
            hypertension: hypertension === "yes",
            family_history: familyHistory === "yes" ? true : familyHistory === "no" ? false : null,
            medical_history: medicalHistory || null,
          })
          .eq("id", authData.user.id)

        if (profileError) {
          console.error("Error updating profile:", profileError)
        }
      }

      router.push("/auth/sign-up-success")
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "Ocurrió un error")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center p-6 md:p-10 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="w-full max-w-2xl">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center gap-2 text-center">
            <div className="flex items-center gap-2">
              <Heart className="h-8 w-8 text-cyan-400" />
              <span className="text-2xl font-bold text-white">CardioAI</span>
            </div>
            <p className="text-sm text-slate-400">
              {step === 1 ? "Comienza a monitorear tu salud cardíaca" : "Completa tu perfil de salud"}
            </p>
          </div>

          <div className="flex items-center justify-center gap-2">
            <div className={`h-2 w-16 rounded-full ${step >= 1 ? "bg-cyan-500" : "bg-slate-700"}`} />
            <div className={`h-2 w-16 rounded-full ${step >= 2 ? "bg-cyan-500" : "bg-slate-700"}`} />
          </div>

          <Card className="bg-slate-900/50 border-slate-800">
            <CardHeader>
              <CardTitle className="text-2xl text-white">{step === 1 ? "Crear Cuenta" : "Perfil de Salud"}</CardTitle>
              <CardDescription className="text-slate-400">
                {step === 1 ? "Paso 1 de 2: Información básica" : "Paso 2 de 2: Ayúdanos a personalizar tu experiencia"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {step === 1 ? (
                <form onSubmit={handleStep1Submit}>
                  <div className="flex flex-col gap-6">
                    <div className="grid gap-2">
                      <Label htmlFor="fullName" className="text-slate-200">
                        Nombre Completo
                      </Label>
                      <Input
                        id="fullName"
                        type="text"
                        placeholder="Juan Pérez"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="email" className="text-slate-200">
                        Correo Electrónico
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="tu@ejemplo.com"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="password" className="text-slate-200">
                        Contraseña
                      </Label>
                      <Input
                        id="password"
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="bg-slate-800/50 border-slate-700 text-white"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="repeat-password" className="text-slate-200">
                        Repetir Contraseña
                      </Label>
                      <Input
                        id="repeat-password"
                        type="password"
                        required
                        value={repeatPassword}
                        onChange={(e) => setRepeatPassword(e.target.value)}
                        className="bg-slate-800/50 border-slate-700 text-white"
                      />
                    </div>
                    {error && <p className="text-sm text-red-400">{error}</p>}
                    <Button type="submit" className="w-full bg-cyan-500 hover:bg-cyan-600 text-white">
                      Continuar
                    </Button>
                  </div>
                  <div className="mt-4 text-center text-sm text-slate-400">
                    ¿Ya tienes una cuenta?{" "}
                    <Link href="/auth/login" className="text-cyan-400 hover:text-cyan-300 underline underline-offset-4">
                      Inicia Sesión
                    </Link>
                  </div>
                </form>
              ) : (
                <form onSubmit={handleStep2Submit}>
                  <div className="flex flex-col gap-6">
                    <div className="grid gap-2">
                      <Label className="text-slate-200">Sexo</Label>
                      <RadioGroup value={sex} onValueChange={setSex} required>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="male" id="male" />
                          <Label htmlFor="male" className="text-slate-300 font-normal cursor-pointer">
                            Masculino
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="female" id="female" />
                          <Label htmlFor="female" className="text-slate-300 font-normal cursor-pointer">
                            Femenino
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="other" id="other" />
                          <Label htmlFor="other" className="text-slate-300 font-normal cursor-pointer">
                            Otro
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="age" className="text-slate-200">
                        Edad
                      </Label>
                      <Input
                        id="age"
                        type="number"
                        min="18"
                        max="120"
                        placeholder="30"
                        required
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500"
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label className="text-slate-200">¿Fumas?</Label>
                      <RadioGroup value={smoker} onValueChange={setSmoker} required>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="yes" id="smoker-yes" />
                          <Label htmlFor="smoker-yes" className="text-slate-300 font-normal cursor-pointer">
                            Sí
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="no" id="smoker-no" />
                          <Label htmlFor="smoker-no" className="text-slate-300 font-normal cursor-pointer">
                            No
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="grid gap-2">
                      <Label className="text-slate-200">¿Tienes hipertensión?</Label>
                      <RadioGroup value={hypertension} onValueChange={setHypertension} required>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="yes" id="hypertension-yes" />
                          <Label htmlFor="hypertension-yes" className="text-slate-300 font-normal cursor-pointer">
                            Sí
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="no" id="hypertension-no" />
                          <Label htmlFor="hypertension-no" className="text-slate-300 font-normal cursor-pointer">
                            No
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="grid gap-2">
                      <Label className="text-slate-200">
                        ¿Tienes antecedentes familiares de enfermedades cardíacas?
                      </Label>
                      <RadioGroup value={familyHistory} onValueChange={setFamilyHistory} required>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="yes" id="family-yes" />
                          <Label htmlFor="family-yes" className="text-slate-300 font-normal cursor-pointer">
                            Sí
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="no" id="family-no" />
                          <Label htmlFor="family-no" className="text-slate-300 font-normal cursor-pointer">
                            No
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="unknown" id="family-unknown" />
                          <Label htmlFor="family-unknown" className="text-slate-300 font-normal cursor-pointer">
                            No sé
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="medical-history" className="text-slate-200">
                        Historial Médico (Opcional)
                      </Label>
                      <Textarea
                        id="medical-history"
                        placeholder="Describe cualquier condición médica relevante, medicamentos que tomas, o cirugías previas..."
                        value={medicalHistory}
                        onChange={(e) => setMedicalHistory(e.target.value)}
                        className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 min-h-[100px]"
                      />
                    </div>

                    {error && <p className="text-sm text-red-400">{error}</p>}

                    <div className="flex gap-3">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setStep(1)}
                        className="flex-1 bg-transparent border-slate-700 text-slate-300 hover:bg-slate-800"
                      >
                        Atrás
                      </Button>
                      <Button
                        type="submit"
                        className="flex-1 bg-cyan-500 hover:bg-cyan-600 text-white"
                        disabled={isLoading}
                      >
                        {isLoading ? "Creando cuenta..." : "Crear Cuenta"}
                      </Button>
                    </div>
                  </div>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
