import { Button } from "@/components/ui/button"
import Image from "next/image"

export function PulseraSection() {
	return (
		<div className="mx-auto max-w-6xl mt-30">
			<div className="rounded-2xl border border-primary/10 bg-card shadow-2xl shadow-primary/10 ring-1 ring-primary/5 p-4">
				<div className="flex flex-col md:flex-row items-center gap-6">
					{/* Imagen: más compacta para reducir altura total */}
					<div className="flex-shrink-0 w-full md:w-[200px] lg:w-[240px] aspect-[3/4] rounded-lg overflow-hidden relative bg-muted/5">
						<Image
							src="/smartwatch.jpeg"
							alt="Pulsera CardioAI en uso mostrando monitoreo de frecuencia cardíaca"
							fill
							className="object-cover"
							sizes="(max-width: 768px) 100vw, (max-width: 1024px) 35vw, 240px"
							priority
						/>
					</div>

					{/* Información relevante: badges + detalles extras para equilibrar visualmente */}
					<div className="flex-1">
						<div className="flex items-start justify-center gap-4">
							<div>
								<h3 className="text-5xl font-semibold text-white">CardioAI SmartBand</h3>
								<p className="text-sm text-muted-foreground mt-1 mb-3">
									Pulsera inteligente para monitoreo cardíaco con IA y alertas en tiempo real.
								</p>
							</div>
						</div>

						<div className="flex flex-wrap items-center justify-center gap-2 mb-3">
							<span className="px-2 py-1 rounded bg-primary/10 text-xs text-primary">Nuevo</span>
							<span className="px-2 py-1 rounded bg-accent/10 text-xs text-accent">iOS • Android</span>
							<span className="px-2 py-1 rounded bg-foreground/5 text-xs text-foreground">Bluetooth 5.0</span>
						</div>

						<ul className="grid grid-cols-1 sm:grid-cols-2 gap-1 mb-3 text-sm text-slate-300">
							<li>- Precisión de latidos: 99.9%</li>
							<li>- Monitor 24/7 y detección de arritmias</li>
							<li>- Batería: hasta 7 días</li>
							<li>- Sincronización en la nube</li>
						</ul>
						<p className="mt-3 text-xs text-slate-400">Incluye 6 meses de pruebas ilimitadas de análisis cardiaco con IA.</p>
					</div>
				</div>
			</div>
		</div>
	)
}
