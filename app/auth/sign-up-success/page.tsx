import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, Mail } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function SignUpSuccessPage() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center p-6 md:p-10 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center gap-2 text-center">
            <div className="flex items-center gap-2">
              <Heart className="h-8 w-8 text-cyan-400" />
              <span className="text-2xl font-bold text-white">CardioAI</span>
            </div>
          </div>
          <Card className="bg-slate-900/50 border-slate-800">
            <CardHeader>
              <div className="flex justify-center mb-4">
                <div className="rounded-full bg-cyan-500/10 p-3">
                  <Mail className="h-8 w-8 text-cyan-400" />
                </div>
              </div>
              <CardTitle className="text-2xl text-center text-white">¡Gracias por registrarte!</CardTitle>
              <CardDescription className="text-center text-slate-400">Verifica tu correo electrónico</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-slate-300 text-center">
                Te hemos enviado un correo de confirmación. Por favor, revisa tu bandeja de entrada y haz clic en el
                enlace para activar tu cuenta.
              </p>
              <div className="pt-4">
                <Link href="/auth/login">
                  <Button className="w-full bg-cyan-500 hover:bg-cyan-600 text-white">Ir a Iniciar Sesión</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
