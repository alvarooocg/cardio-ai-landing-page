import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, Heart } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default async function ErrorPage({
  searchParams,
}: {
  searchParams: Promise<{ error: string }>
}) {
  const params = await searchParams

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
                <div className="rounded-full bg-red-500/10 p-3">
                  <AlertCircle className="h-8 w-8 text-red-400" />
                </div>
              </div>
              <CardTitle className="text-2xl text-center text-white">Algo salió mal</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {params?.error ? (
                <p className="text-sm text-slate-300 text-center">Error: {params.error}</p>
              ) : (
                <p className="text-sm text-slate-300 text-center">Ocurrió un error inesperado.</p>
              )}
              <div className="pt-4">
                <Link href="/auth/login">
                  <Button className="w-full bg-cyan-500 hover:bg-cyan-600 text-white">Volver a Iniciar Sesión</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
