import Link from "next/link"
import { Mail, Phone } from "lucide-react"
import Image from "next/image"

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="flex items-center gap-3 mb-4">
              <div className="bg-white rounded-lg p-1">
                <Image src="/cardioai-logo.png" alt="CardioAI Logo" width={48} height={48} className="h-12 w-12" />
              </div>
              <span className="text-xl font-bold">CardioAI</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Tu compañero inteligente para una vida más saludable. Monitoreo cardíaco avanzado con IA.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold">Producto</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="#funcionalidades" className="text-muted-foreground hover:text-foreground transition-colors">
                  Funcionalidades
                </Link>
              </li>
              <li>
                <Link href="#dashboard" className="text-muted-foreground hover:text-foreground transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-muted-foreground hover:text-foreground transition-colors">
                  Precios
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold">Legal</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
                  Política de Privacidad
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-foreground transition-colors">
                  Términos de Uso
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-muted-foreground hover:text-foreground transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold">Contacto</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2 text-muted-foreground">
                <Mail className="h-4 w-4" />
                <a href="mailto:soporte@cardioai.com" className="hover:text-foreground transition-colors">
                  soporte@cardioai.com
                </a>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <Phone className="h-4 w-4" />
                <a href="tel:+34900123456" className="hover:text-foreground transition-colors">
                  +34 900 123 456
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} CardioAI. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
